const express = require('express');
const {
  SEASON_BOUNDARIES,
  DAYS_PER_MONTH,
  isLeapYear,
  yearLength,
} = require('../calendar/constants');
const {
  coordinate28xToGregorian,
  formatCoordinate,
} = require('../calendar/convert');
const { validateYear } = require('../calendar/validate');
const { gregorianTo28x } = require('../calendar/convert');

const router = express.Router();

router.get('/', (req, res) => {
  const validation = validateYear(req.query.year);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error, code: validation.code });
  }

  // Default to current 28x year
  let year = validation.year;
  if (year === null) {
    const now = gregorianTo28x(new Date());
    if (now['28x'].preEpoch) {
      year = 0;
    } else {
      year = now['28x'].year;
    }
  }

  const leap = isLeapYear(year);
  const totalDays = yearLength(year);

  const seasons = {};
  for (const [key, bounds] of Object.entries(SEASON_BOUNDARIES)) {
    const startCoord = formatCoordinate(year, bounds.start, 1);
    const endCoord = formatCoordinate(year, bounds.end, DAYS_PER_MONTH);
    const startGreg = coordinate28xToGregorian(startCoord);
    const endGreg = coordinate28xToGregorian(endCoord);
    const durationDays = (bounds.end - bounds.start + 1) * DAYS_PER_MONTH;

    seasons[key] = {
      name: bounds.name,
      startGregorian: startGreg.toISOString().split('T')[0],
      endGregorian: endGreg.toISOString().split('T')[0],
      start28x: startCoord,
      end28x: endCoord,
      durationDays,
    };
  }

  const intercalaryDays = [];
  const id0Coord = formatCoordinate(year, 0, 0);
  const id0Greg = coordinate28xToGregorian(id0Coord);
  intercalaryDays.push({
    coordinate: id0Coord,
    gregorian: id0Greg.toISOString().split('T')[0],
    label: 'Day Out of Time',
  });

  if (leap) {
    const id1Coord = formatCoordinate(year, 0, 1);
    const id1Greg = coordinate28xToGregorian(id1Coord);
    intercalaryDays.push({
      coordinate: id1Coord,
      gregorian: id1Greg.toISOString().split('T')[0],
      label: 'Leap Day Out of Time',
    });
  }

  res.json({
    year,
    seasons,
    intercalaryDays,
    isLeapYear: leap,
    totalDays,
  });
});

module.exports = router;
