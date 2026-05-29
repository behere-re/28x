const crypto = require('crypto');

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  if (leftBuffer.length !== rightBuffer.length) return false;
  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function getProvidedToken(req) {
  const auth = req.headers.authorization;
  if (typeof auth === 'string' && auth.startsWith('Bearer ')) {
    return auth.slice('Bearer '.length).trim();
  }
  const headerToken = req.headers['x-admin-token'];
  return typeof headerToken === 'string' ? headerToken.trim() : '';
}

function requireAdmin(req, res, next) {
  const expected = process.env.ADMIN_TOKEN || process.env.API_ADMIN_TOKEN;
  if (!expected) {
    return res.status(503).json({
      error: 'Admin metrics are disabled. Set ADMIN_TOKEN to enable this endpoint.',
      code: 'ADMIN_DISABLED',
    });
  }

  const provided = getProvidedToken(req);
  if (!provided || !safeEqual(provided, expected)) {
    return res.status(401).json({
      error: 'Unauthorized',
      code: 'UNAUTHORIZED',
    });
  }

  return next();
}

module.exports = { requireAdmin };
