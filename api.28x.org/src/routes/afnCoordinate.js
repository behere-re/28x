const express = require('express');
const { gregorianTo28x } = require('../calendar/convert');
const { validateGregorianDate } = require('../calendar/validate');

const router = express.Router();

router.get('/', (req, res) => {
  let inputMs;

  if (req.query.timestamp) {
    const validation = validateGregorianDate(req.query.timestamp);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error, code: validation.code });
    }
    inputMs = validation.ms;
  } else {
    inputMs = Date.now();
  }

  const result = gregorianTo28x(inputMs);

  const { coordinate, season, year, seasonDay, isIntercalary, preEpoch, month, day } = result['28x'];

  const yearPadded = year < 0
    ? `-${String(Math.abs(year)).padStart(4, '0')}`
    : String(year).padStart(4, '0');

  if (preEpoch) {
    const seasonIdentifier = `pre-epoch-${yearPadded}`;
    return res.json({
      afnCoordinate: coordinate,
      afnSeason: null,
      afnYear: year,
      afnSeasonLabel: `Pre-Epoch Year ${yearPadded}`,
      gregorianISO: result.gregorian.iso,
      mintRecommendation: {
        coordinate,
        season: null,
        year,
        seasonIdentifier,
        humanLabel: `Year ${yearPadded}, Moon ${month}, Day ${day}`,
        preEpoch: true,
      },
    });
  }

  const seasonLower = season ? season.toLowerCase() : 'intercalary';
  const seasonIndex = { Spring: '01', Summer: '02', Autumn: '03', Winter: '04' };
  const sIdx = season ? seasonIndex[season] : '00';

  const dayLabel = isIntercalary
    ? 'Day Out of Time'
    : `Day ${seasonDay}`;

  return res.json({
    afnCoordinate: coordinate,
    afnSeason: season,
    afnYear: year,
    afnSeasonLabel: `Season ${sIdx} · ${season || 'Intercalary'} ${yearPadded}`,
    gregorianISO: result.gregorian.iso,
    mintRecommendation: {
      coordinate,
      season: season || null,
      year,
      seasonIdentifier: `behere-${seasonLower}-${yearPadded}`,
      humanLabel: `Year ${yearPadded} · ${season || 'Intercalary'} · ${dayLabel}`,
    },
  });
});

module.exports = router;
