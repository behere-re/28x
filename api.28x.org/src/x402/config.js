const { paymentMiddleware, x402ResourceServer } = require('@x402-avm/express');
const { HTTPFacilitatorClient } = require('@x402-avm/core/server');
const { ExactAvmScheme } = require('@x402-avm/avm/exact/server');
const { recordX402Event } = require('../metrics/store');

const ALGORAND_TESTNET = 'algorand:SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=';
const DEFAULT_FACILITATOR_URL = 'https://facilitator.goplausible.xyz';

function getX402Config() {
  const payTo = process.env.X402_PAY_TO || process.env.AVM_ADDRESS || '';
  return {
    enabled: process.env.X402_ENABLED !== 'false' && Boolean(payTo),
    facilitatorUrl: process.env.X402_FACILITATOR_URL || DEFAULT_FACILITATOR_URL,
    network: process.env.X402_NETWORK || ALGORAND_TESTNET,
    payTo,
    price: process.env.X402_PRICE || '$0.001',
    maxTimeoutSeconds: Number(process.env.X402_MAX_TIMEOUT_SECONDS || 60),
  };
}

function createX402ResponseMetricsMiddleware() {
  return (req, res, next) => {
    if (!req.path.startsWith('/premium/')) {
      next();
      return;
    }

    res.on('finish', () => {
      if (res.statusCode === 402) {
        recordX402Event('paymentRequired', {
          method: req.method,
          path: req.originalUrl || req.path,
        });
      }
    });
    next();
  };
}

function createX402PaymentMiddleware() {
  const config = getX402Config();

  if (!config.enabled) {
    return (req, res, next) => {
      if (!req.path.startsWith('/premium/')) {
        next();
        return;
      }

      res.status(503).json({
        error: 'x402 payments are disabled. Set X402_PAY_TO to enable premium endpoints.',
        code: 'X402_DISABLED',
        requiredEnv: ['X402_PAY_TO'],
      });
    };
  }

  const facilitatorClient = new HTTPFacilitatorClient({
    url: config.facilitatorUrl,
  });

  const resourceServer = new x402ResourceServer(facilitatorClient)
    .register('algorand:*', new ExactAvmScheme())
    .onBeforeVerify(async () => {
      recordX402Event('paymentSubmitted', { method: 'GET', path: '/premium/convert' });
    })
    .onAfterVerify(async ({ result }) => {
      recordX402Event(result.isValid ? 'verified' : 'failed', { method: 'GET', path: '/premium/convert' });
    })
    .onVerifyFailure(async () => {
      recordX402Event('failed', { method: 'GET', path: '/premium/convert' });
    })
    .onAfterSettle(async ({ result }) => {
      recordX402Event(result.success ? 'settled' : 'failed', { method: 'GET', path: '/premium/convert' });
    })
    .onSettleFailure(async () => {
      recordX402Event('failed', { method: 'GET', path: '/premium/convert' });
    });

  return paymentMiddleware(
    {
      'GET /premium/convert': {
        accepts: {
          scheme: 'exact',
          price: config.price,
          network: config.network,
          payTo: config.payTo,
          maxTimeoutSeconds: config.maxTimeoutSeconds,
        },
        description: 'Premium 28x conversion with canonical coordinates and deterministic attestation.',
        mimeType: 'application/json',
      },
    },
    resourceServer,
    {
      appName: '28x Time API',
      testnet: config.network.includes('SGO1GKSzyE7IEPItTxCByw9x8FmnrCDe'),
    },
  );
}

module.exports = {
  ALGORAND_TESTNET,
  DEFAULT_FACILITATOR_URL,
  createX402PaymentMiddleware,
  createX402ResponseMetricsMiddleware,
  getX402Config,
};
