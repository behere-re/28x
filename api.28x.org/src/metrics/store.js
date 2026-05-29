const crypto = require('crypto');
const fs = require('fs');

const MAX_LATENCY_SAMPLES = 2000;
const MAX_RECENT_REQUESTS = 50;
const MAX_ENDPOINT_LATENCY_SAMPLES = 500;
const X402_EVENTS = [
  'paymentRequired',
  'paymentSubmitted',
  'verified',
  'settled',
  'fulfilled',
  'failed',
];

function createInitialState() {
  return {
    startedAt: new Date().toISOString(),
    requestCount: 0,
    errorCount: 0,
    statusCounts: new Map(),
    endpoints: new Map(),
    days: new Map(),
    hours: new Map(),
    origins: new Map(),
    clients: new Map(),
    userAgents: new Map(),
    latencySamples: [],
    recentRequests: [],
    x402: {
      events: Object.fromEntries(X402_EVENTS.map((event) => [event, 0])),
      byEndpoint: new Map(),
    },
  };
}

let state = createInitialState();
const hashSalt = process.env.METRICS_HASH_SALT || crypto.randomBytes(32).toString('hex');

function increment(map, key, amount = 1) {
  if (!key) return;
  map.set(key, (map.get(key) || 0) + amount);
}

function boundedPush(list, value, maxLength) {
  list.push(value);
  if (list.length > maxLength) {
    list.splice(0, list.length - maxLength);
  }
}

function hashClient(value) {
  if (!value) return 'unknown';
  return crypto.createHmac('sha256', hashSalt).update(value).digest('hex').slice(0, 16);
}

function classifyUserAgent(userAgent) {
  const raw = String(userAgent || '').toLowerCase();
  if (!raw) return 'unknown';
  if (raw.includes('bot') || raw.includes('crawler') || raw.includes('spider')) return 'bot';
  if (raw.includes('curl') || raw.includes('httpie') || raw.includes('wget')) return 'cli';
  if (raw.includes('python') || raw.includes('node') || raw.includes('go-http')) return 'script';
  if (raw.includes('mozilla')) return 'browser';
  return 'other';
}

function normalizePath(pathname) {
  if (!pathname || pathname === '/') return '/';
  const pathOnly = pathname.split('?')[0];
  if (pathOnly.startsWith('/premium/convert')) return '/premium/convert';
  if (pathOnly.startsWith('/admin/')) return '/admin/*';
  if (pathOnly.startsWith('/afn-coordinate')) return '/afn-coordinate';
  if (pathOnly.startsWith('/convert')) return '/convert';
  if (pathOnly.startsWith('/season')) return '/season';
  if (pathOnly.startsWith('/health')) return '/health';
  if (pathOnly.startsWith('/now')) return '/now';
  return pathOnly.replace(/\/\d+/g, '/:id');
}

function getOrigin(req) {
  const origin = req.headers.origin;
  if (origin) return origin;

  const referer = req.headers.referer || req.headers.referrer;
  if (!referer) return 'direct';
  try {
    return new URL(referer).origin;
  } catch {
    return 'unknown';
  }
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

function getEndpointStats(endpoint) {
  if (!state.endpoints.has(endpoint)) {
    state.endpoints.set(endpoint, {
      endpoint,
      requests: 0,
      errors: 0,
      statusCounts: new Map(),
      latencySamples: [],
    });
  }
  return state.endpoints.get(endpoint);
}

function recordRequest(details) {
  const now = details.timestamp ? new Date(details.timestamp) : new Date();
  const method = details.method || 'GET';
  const path = normalizePath(details.path || '/');
  const endpoint = `${method} ${path}`;
  const status = Number(details.status || 0);
  const latencyMs = Math.max(0, Number(details.latencyMs || 0));
  const clientHash = hashClient(details.clientIp || 'unknown');
  const origin = details.origin || 'direct';
  const userAgentClass = classifyUserAgent(details.userAgent);

  state.requestCount += 1;
  if (status >= 400) state.errorCount += 1;
  increment(state.statusCounts, String(status || 'unknown'));
  increment(state.days, now.toISOString().slice(0, 10));
  increment(state.hours, `${now.toISOString().slice(0, 13)}:00Z`);
  increment(state.origins, origin);
  increment(state.clients, clientHash);
  increment(state.userAgents, userAgentClass);
  boundedPush(state.latencySamples, latencyMs, MAX_LATENCY_SAMPLES);

  const endpointStats = getEndpointStats(endpoint);
  endpointStats.requests += 1;
  if (status >= 400) endpointStats.errors += 1;
  increment(endpointStats.statusCounts, String(status || 'unknown'));
  boundedPush(endpointStats.latencySamples, latencyMs, MAX_ENDPOINT_LATENCY_SAMPLES);

  const event = {
    at: now.toISOString(),
    method,
    path,
    endpoint,
    status,
    latencyMs,
    origin,
    userAgentClass,
    clientHash,
  };
  boundedPush(state.recentRequests, event, MAX_RECENT_REQUESTS);
  appendMetricsEvent({ type: 'request', ...event });
}

function recordX402Event(eventName, details = {}) {
  if (!X402_EVENTS.includes(eventName)) return;
  const endpoint = `${details.method || 'GET'} ${normalizePath(details.path || details.endpoint || '/premium/convert')}`;
  state.x402.events[eventName] += 1;
  if (!state.x402.byEndpoint.has(endpoint)) {
    state.x402.byEndpoint.set(endpoint, Object.fromEntries(X402_EVENTS.map((event) => [event, 0])));
  }
  state.x402.byEndpoint.get(endpoint)[eventName] += 1;
  appendMetricsEvent({
    type: 'x402',
    event: eventName,
    endpoint,
    at: new Date().toISOString(),
  });
}

function appendMetricsEvent(event) {
  const logPath = process.env.METRICS_LOG_PATH;
  if (!logPath) return;
  fs.appendFile(logPath, `${JSON.stringify(event)}\n`, () => {});
}

function percentile(values, p) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.min(sorted.length - 1, Math.ceil((p / 100) * sorted.length) - 1);
  return Math.round(sorted[index]);
}

function max(values) {
  return values.length ? Math.round(Math.max(...values)) : 0;
}

function mapToSortedArray(map, limit = 20) {
  return [...map.entries()]
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

function statusMapToObject(map) {
  return Object.fromEntries([...map.entries()].sort(([a], [b]) => a.localeCompare(b)));
}

function getMetricsSnapshot() {
  const generatedAt = new Date().toISOString();
  const uptimeSeconds = Math.round((Date.now() - Date.parse(state.startedAt)) / 1000);
  const endpoints = [...state.endpoints.values()]
    .map((endpoint) => ({
      endpoint: endpoint.endpoint,
      requests: endpoint.requests,
      errors: endpoint.errors,
      errorRate: endpoint.requests ? endpoint.errors / endpoint.requests : 0,
      latencyMs: {
        p50: percentile(endpoint.latencySamples, 50),
        p95: percentile(endpoint.latencySamples, 95),
        max: max(endpoint.latencySamples),
      },
      statuses: statusMapToObject(endpoint.statusCounts),
    }))
    .sort((a, b) => b.requests - a.requests);

  return {
    generatedAt,
    startedAt: state.startedAt,
    uptimeSeconds,
    requests: {
      total: state.requestCount,
      errors: state.errorCount,
      errorRate: state.requestCount ? state.errorCount / state.requestCount : 0,
      latencyMs: {
        p50: percentile(state.latencySamples, 50),
        p95: percentile(state.latencySamples, 95),
        max: max(state.latencySamples),
      },
    },
    statuses: statusMapToObject(state.statusCounts),
    endpoints,
    days: mapToSortedArray(state.days, 60).sort((a, b) => a.key.localeCompare(b.key)),
    hours: mapToSortedArray(state.hours, 48).sort((a, b) => a.key.localeCompare(b.key)),
    origins: mapToSortedArray(state.origins, 20),
    clients: {
      unique: state.clients.size,
      top: mapToSortedArray(state.clients, 20),
    },
    userAgents: mapToSortedArray(state.userAgents, 10),
    recentRequests: [...state.recentRequests].reverse(),
    x402: {
      events: state.x402.events,
      byEndpoint: [...state.x402.byEndpoint.entries()].map(([endpoint, events]) => ({
        endpoint,
        events,
      })),
    },
  };
}

function metricsMiddleware(req, res, next) {
  if (req.path.startsWith('/admin/')) {
    next();
    return;
  }

  const started = process.hrtime.bigint();
  res.on('finish', () => {
    const elapsedMs = Number(process.hrtime.bigint() - started) / 1_000_000;
    recordRequest({
      method: req.method,
      path: req.originalUrl || req.path,
      status: res.statusCode,
      latencyMs: elapsedMs,
      origin: getOrigin(req),
      userAgent: req.headers['user-agent'],
      clientIp: getClientIp(req),
    });
  });
  next();
}

function resetMetricsForTest() {
  state = createInitialState();
}

module.exports = {
  getMetricsSnapshot,
  metricsMiddleware,
  normalizePath,
  recordRequest,
  recordX402Event,
  resetMetricsForTest,
};
