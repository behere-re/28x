const EPOCH_ISO = '2026-03-20T00:00:00.000Z';
const EPOCH_MS = Date.parse(EPOCH_ISO);

const MS_PER_DAY = 86_400_000;
const DAYS_PER_MONTH = 28;
const MONTHS_PER_YEAR = 13;
const DAYS_PER_YEAR = DAYS_PER_MONTH * MONTHS_PER_YEAR; // 364 named days
const INTERCALARY_DAYS_NORMAL = 1;
const INTERCALARY_DAYS_LEAP = 2;
const TOTAL_DAYS_NORMAL = DAYS_PER_YEAR + INTERCALARY_DAYS_NORMAL; // 365
const TOTAL_DAYS_LEAP = DAYS_PER_YEAR + INTERCALARY_DAYS_LEAP; // 366

const SEASON_BOUNDARIES = {
  spring: { name: 'Spring', start: 1, end: 3 },
  summer: { name: 'Summer', start: 4, end: 6 },
  autumn: { name: 'Autumn', start: 7, end: 9 },
  winter: { name: 'Winter', start: 10, end: 13 },
};

const SEASON_DAY_RANGES = {
  spring: { startDay: 1, endDay: 84 },
  summer: { startDay: 85, endDay: 168 },
  autumn: { startDay: 169, endDay: 252 },
  winter: { startDay: 253, endDay: 364 },
};

function isLeapYear(year) {
  if (year === 0) return false;
  return year % 4 === 0;
}

function yearLength(year) {
  return isLeapYear(year) ? TOTAL_DAYS_LEAP : TOTAL_DAYS_NORMAL;
}

function getSeason(month) {
  if (month === 0) return null;
  for (const [key, bounds] of Object.entries(SEASON_BOUNDARIES)) {
    if (month >= bounds.start && month <= bounds.end) {
      return bounds.name;
    }
  }
  return null;
}

function getSeasonKey(month) {
  if (month === 0) return null;
  for (const [key, bounds] of Object.entries(SEASON_BOUNDARIES)) {
    if (month >= bounds.start && month <= bounds.end) {
      return key;
    }
  }
  return null;
}

module.exports = {
  EPOCH_ISO,
  EPOCH_MS,
  MS_PER_DAY,
  DAYS_PER_MONTH,
  MONTHS_PER_YEAR,
  DAYS_PER_YEAR,
  INTERCALARY_DAYS_NORMAL,
  INTERCALARY_DAYS_LEAP,
  TOTAL_DAYS_NORMAL,
  TOTAL_DAYS_LEAP,
  SEASON_BOUNDARIES,
  SEASON_DAY_RANGES,
  isLeapYear,
  yearLength,
  getSeason,
  getSeasonKey,
};
