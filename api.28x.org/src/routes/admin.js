const express = require('express');
const { requireAdmin } = require('../middleware/adminAuth');
const { getMetricsSnapshot } = require('../metrics/store');

const router = express.Router();

router.get('/metrics', requireAdmin, (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.json(getMetricsSnapshot());
});

module.exports = router;
