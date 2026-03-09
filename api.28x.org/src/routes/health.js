const express = require('express');
const { gregorianTo28x } = require('../calendar/convert');

const router = express.Router();

router.get('/', (req, res) => {
  const now = gregorianTo28x(new Date());
  res.json({
    status: 'ok',
    time28x: now['28x'].coordinate,
  });
});

module.exports = router;
