const crypto = require('crypto');
const express = require('express');
const { gregorianTo28x, coordinate28xToGregorian } = require('../calendar/convert');
const {
  validateGregorianDate,
  validateUnixTimestamp,
  validate28xCoordinate,
} = require('../calendar/validate');
const { recordX402Event } = require('../metrics/store');
const { getX402Config } = require('../x402/config');

const router = express.Router();

function buildAttestation(input, result) {
  const issuedAt = new Date().toISOString();
  const payload = {
    input,
    gregorian: result.gregorian.iso,
    coordinate: result['28x'].canonicalCoordinate,
    issuedAt,
    apiVersion: result.meta.apiVersion,
  };
  const id = crypto
    .createHash('sha256')
    .update(JSON.stringify(payload))
    .digest('hex')
    .slice(0, 32);

  return {
    id,
    issuedAt,
    source: '28x Time API',
    standard: '28x Time Standard v0.1',
    hashAlgorithm: 'sha256',
  };
}

function convertQuery(query) {
  const { from } = query;

  if (!from) {
    return {
      error: {
        status: 400,
        body: {
          error: 'Missing "from" parameter. Use from=gregorian, from=28x, or from=unix',
          code: 'MISSING_FROM',
        },
      },
    };
  }

  if (from === 'gregorian') {
    const validation = validateGregorianDate(query.date);
    if (!validation.valid) {
      return { error: { status: 400, body: { error: validation.error, code: validation.code } } };
    }
    return {
      input: { from, value: query.date },
      result: gregorianTo28x(validation.ms),
    };
  }

  if (from === 'unix') {
    const validation = validateUnixTimestamp(query.timestamp);
    if (!validation.valid) {
      return { error: { status: 400, body: { error: validation.error, code: validation.code } } };
    }
    return {
      input: { from, value: query.timestamp },
      result: gregorianTo28x(validation.ms),
    };
  }

  if (from === '28x') {
    const validation = validate28xCoordinate(query.coordinate);
    if (!validation.valid) {
      return { error: { status: 400, body: { error: validation.error, code: validation.code } } };
    }
    const gregorianDate = coordinate28xToGregorian(query.coordinate);
    return {
      input: { from, value: query.coordinate },
      result: gregorianTo28x(gregorianDate),
    };
  }

  return {
    error: {
      status: 400,
      body: {
        error: `Invalid "from" value: "${from}". Use from=gregorian, from=28x, or from=unix`,
        code: 'INVALID_FROM',
      },
    },
  };
}

router.get('/', (req, res) => {
  const conversion = convertQuery(req.query);
  if (conversion.error) {
    return res.status(conversion.error.status).json(conversion.error.body);
  }

  recordX402Event('fulfilled', { method: req.method, path: req.originalUrl || req.path });

  const x402 = getX402Config();
  return res.json({
    premium: true,
    product: '28x-premium-convert',
    conversion: conversion.result,
    attestation: buildAttestation(conversion.input, conversion.result),
    payment: {
      scheme: 'exact',
      network: x402.network,
      price: x402.price,
    },
  });
});

module.exports = router;
