const express = require('express');
const { gregorianTo28x, coordinate28xToGregorian } = require('../calendar/convert');
const {
  validateGregorianDate,
  validateUnixTimestamp,
  validate28xCoordinate,
} = require('../calendar/validate');

const router = express.Router();

router.get('/', (req, res) => {
  const { from } = req.query;

  if (!from) {
    return res.status(400).json({
      error: 'Missing "from" parameter. Use from=gregorian, from=28x, or from=unix',
      code: 'MISSING_FROM',
    });
  }

  if (from === 'gregorian') {
    const validation = validateGregorianDate(req.query.date);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error, code: validation.code });
    }
    const result = gregorianTo28x(validation.ms);
    return res.json(result);
  }

  if (from === 'unix') {
    const validation = validateUnixTimestamp(req.query.timestamp);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error, code: validation.code });
    }
    const result = gregorianTo28x(validation.ms);
    return res.json(result);
  }

  if (from === '28x') {
    const validation = validate28xCoordinate(req.query.coordinate);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error, code: validation.code });
    }
    const gregorianDate = coordinate28xToGregorian(req.query.coordinate);
    const result = gregorianTo28x(gregorianDate);
    return res.json(result);
  }

  return res.status(400).json({
    error: `Invalid "from" value: "${from}". Use from=gregorian, from=28x, or from=unix`,
    code: 'INVALID_FROM',
  });
});

module.exports = router;
