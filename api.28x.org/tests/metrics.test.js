const { describe, it, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const {
  getMetricsSnapshot,
  normalizePath,
  recordRequest,
  recordX402Event,
  resetMetricsForTest,
} = require('../src/metrics/store');

describe('API metrics store', () => {
  beforeEach(() => {
    resetMetricsForTest();
  });

  it('normalizes known endpoint paths', () => {
    assert.equal(normalizePath('/convert?from=gregorian'), '/convert');
    assert.equal(normalizePath('/premium/convert?from=gregorian'), '/premium/convert');
    assert.equal(normalizePath('/admin/metrics'), '/admin/*');
  });

  it('records privacy-safe request aggregates', () => {
    recordRequest({
      method: 'GET',
      path: '/convert?from=gregorian',
      status: 200,
      latencyMs: 24,
      origin: 'https://28x.org',
      userAgent: 'curl/8.0',
      clientIp: '203.0.113.10',
      timestamp: '2026-05-29T12:00:00.000Z',
    });
    recordRequest({
      method: 'GET',
      path: '/convert?from=28x',
      status: 400,
      latencyMs: 52,
      origin: 'https://28x.org',
      userAgent: 'Mozilla/5.0',
      clientIp: '203.0.113.10',
      timestamp: '2026-05-29T12:30:00.000Z',
    });

    const snapshot = getMetricsSnapshot();
    assert.equal(snapshot.requests.total, 2);
    assert.equal(snapshot.requests.errors, 1);
    assert.equal(snapshot.clients.unique, 1);
    assert.equal(snapshot.endpoints[0].endpoint, 'GET /convert');
    assert.equal(snapshot.endpoints[0].requests, 2);
    assert.equal(snapshot.endpoints[0].errors, 1);
    assert.equal(snapshot.origins[0].key, 'https://28x.org');
    assert.equal(snapshot.recentRequests[0].clientHash.length, 16);
    assert.equal(JSON.stringify(snapshot).includes('203.0.113.10'), false);
  });

  it('records x402 funnel events separately from request volume', () => {
    recordX402Event('paymentRequired', { method: 'GET', path: '/premium/convert' });
    recordX402Event('verified', { method: 'GET', path: '/premium/convert' });

    const snapshot = getMetricsSnapshot();
    assert.equal(snapshot.requests.total, 0);
    assert.equal(snapshot.x402.events.paymentRequired, 1);
    assert.equal(snapshot.x402.events.verified, 1);
    assert.equal(snapshot.x402.byEndpoint[0].endpoint, 'GET /premium/convert');
  });
});
