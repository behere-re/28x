const express = require('express');
const { gregorianTo28x } = require('../calendar/convert');

const router = express.Router();

router.get('/', (req, res) => {
  const result = gregorianTo28x(new Date());
  res.json(result);
});

module.exports = router;
