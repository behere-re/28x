const {
  EPOCH_MS,
  MS_PER_DAY,
  DAYS_PER_MONTH,
  MONTHS_PER_YEAR,
  DAYS_PER_YEAR,
  SEASON_BOUNDARIES,
  isLeapYear,
  yearLength,
  getSeason,
  getSeasonKey,
} = require('./constants');

/**
 * Convert a JS Date or Unix ms timestamp to a 28x coordinate object.
 */
function gregorianTo28x(input) {
  const inputMs = typeof input === 'number' ? input : input.getTime();
  const elapsedMs = inputMs - EPOCH_MS;
  let totalDays = Math.floor(elapsedMs / MS_PER_DAY);

  const gregorianDate = new Date(inputMs);
  const gregorian = buildGregorianBlock(gregorianDate, inputMs);

  // Pre-epoch
  if (totalDays < 0) {
    const daysBeforeEpoch = Math.abs(totalDays); // 1 => day immediately before epoch
    const preEpochYearLength = (y) => DAYS_PER_YEAR + (isLeapYear(y) ? 1 : 0);

    // Walk backwards through negative years to locate the target year.
    // remaining is 1..yearLength(year), counting back from the epoch boundary.
    let year = -1;
    let remaining = daysBeforeEpoch;
    while (remaining > preEpochYearLength(year)) {
      remaining -= preEpochYearLength(year);
      year--;
    }

    // Convert to a 0-indexed day-of-year from the *start* of that year.
    // Example: remaining=1 => last day of the year => dayInYear=yearLength-1
    const totalDaysInYear = preEpochYearLength(year);
    const dayInYear = totalDaysInYear - remaining;

    let month, day, isIntercalary;
    if (dayInYear < DAYS_PER_YEAR) {
      month = Math.floor(dayInYear / DAYS_PER_MONTH) + 1;
      day = (dayInYear % DAYS_PER_MONTH) + 1;
      isIntercalary = false;
    } else {
      // Intercalary day at end of leap year (only possible in leap years)
      month = 0;
      day = dayInYear - DAYS_PER_YEAR; // 0 for intercalary
      isIntercalary = true;
    }

    const coordinate = formatCoordinate(year, month, day);
    return {
      gregorian,
      '28x': {
        coordinate,
        year,
        month,
        day,
        preEpoch: true,
        daysBeforeEpoch,
        isTransitionDay: daysBeforeEpoch === 1,
        isIntercalary,
        isLeapYear: isLeapYear(year),
      },
      meta: buildMeta(totalDays),
    };
  }

  // Walk through years to find which 28x year this day falls in
  let year = 0;
  let remaining = totalDays;
  while (true) {
    const yLen = yearLength(year);
    if (remaining < yLen) break;
    remaining -= yLen;
    year++;
  }

  let month, day, isIntercalary;

  if (remaining < DAYS_PER_YEAR) {
    // Named day within the 13-month lattice
    month = Math.floor(remaining / DAYS_PER_MONTH) + 1;
    day = (remaining % DAYS_PER_MONTH) + 1;
    isIntercalary = false;
  } else {
    // Intercalary day(s) at end of year (remaining === 364 or 365)
    month = 0;
    day = remaining - DAYS_PER_YEAR; // 0 for first intercalary, 1 for second (leap)
    isIntercalary = true;
  }

  const season = getSeason(month);
  const dayOfYear = remaining + 1; // 1-indexed
  const leap = isLeapYear(year);
  const totalDaysInYear = yearLength(year);

  // Season day: which day within the current season (1-indexed)
  let seasonDay = null;
  let daysRemainingInSeason = null;
  if (season) {
    const seasonKey = getSeasonKey(month);
    const seasonStartMonth = SEASON_BOUNDARIES[seasonKey].start;
    const seasonEndMonth = SEASON_BOUNDARIES[seasonKey].end;
    const seasonStartDayOfYear = (seasonStartMonth - 1) * DAYS_PER_MONTH; // 0-indexed
    const seasonDurationDays = (seasonEndMonth - seasonStartMonth + 1) * DAYS_PER_MONTH;
    seasonDay = remaining - seasonStartDayOfYear + 1;
    daysRemainingInSeason = seasonDurationDays - seasonDay;
  }

  const coordinate = formatCoordinate(year, month, day);

  return {
    gregorian,
    '28x': {
      coordinate,
      year,
      month,
      day,
      season,
      seasonDay,
      humanReadable: formatHumanReadable(year, month, day, season),
      isIntercalary,
      isLeapYear: leap,
      dayOfYear,
      daysRemainingInYear: totalDaysInYear - dayOfYear,
      daysRemainingInMonth: isIntercalary ? 0 : DAYS_PER_MONTH - day,
      daysRemainingInSeason,
    },
    meta: buildMeta(totalDays),
  };
}

/**
 * Convert a 28x coordinate string back to a Gregorian date.
 * Accepts "28X-YYYY-MM-DD" format.
 */
function coordinate28xToGregorian(coordinateStr) {
  const parsed = parseCoordinate(coordinateStr);
  if (!parsed) {
    throw new Error(`Invalid 28x coordinate: ${coordinateStr}`);
  }

  const { year, month, day } = parsed;
  const preEpochYearLength = (y) => DAYS_PER_YEAR + (isLeapYear(y) ? 1 : 0);

  // Sum days for all complete years before this one
  let totalDays = 0;
  if (year >= 0) {
    for (let y = 0; y < year; y++) {
      totalDays += yearLength(y);
    }
  } else {
    // Walk backwards from year 0 into negative years.
    // Example: year=-1 => subtract yearLength(-1) once.
    for (let y = -1; y >= year; y--) {
      totalDays -= preEpochYearLength(y);
    }
  }

  if (month === 0) {
    // Intercalary day
    totalDays += DAYS_PER_YEAR + day; // day is 0 or 1
  } else {
    totalDays += (month - 1) * DAYS_PER_MONTH + (day - 1);
  }

  const resultMs = EPOCH_MS + totalDays * MS_PER_DAY;
  return new Date(resultMs);
}

/**
 * Parse a 28x coordinate string into { year, month, day }.
 */
function parseCoordinate(str) {
  if (!str || typeof str !== 'string') return null;

  const match = str.match(/^28X-(-\d{4}|\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;

  return {
    year: parseInt(match[1], 10),
    month: parseInt(match[2], 10),
    day: parseInt(match[3], 10),
  };
}

/**
 * Format a 28x coordinate string from components.
 */
function formatCoordinate(year, month, day) {
  const yy = year < 0
    ? `-${String(Math.abs(year)).padStart(4, '0')}`
    : String(year).padStart(4, '0');
  const mm = String(month).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  return `28X-${yy}-${mm}-${dd}`;
}

/**
 * Format a human-readable 28x date string.
 */
function formatHumanReadable(year, month, day, season) {
  const yy = year < 0
    ? `-${String(Math.abs(year)).padStart(4, '0')}`
    : String(year).padStart(4, '0');
  if (month === 0) {
    const label = day === 0 ? 'Day Out of Time' : 'Leap Day Out of Time';
    return `Year ${yy} · ${label}`;
  }
  return `Year ${yy} · ${season} · Month ${month} · Day ${day}`;
}

function buildGregorianBlock(date, inputMs) {
  return {
    iso: date.toISOString(),
    unix: Math.floor(inputMs / 1000),
    date: date.toISOString().split('T')[0],
    time: date.toISOString().split('T')[1].replace('Z', '').split('.')[0],
  };
}

function buildMeta(totalDaysSinceEpoch) {
  return {
    epochGregorian: '2026-03-20T00:00:00.000Z',
    totalDaysSinceEpoch,
    apiVersion: '0.1',
  };
}

module.exports = {
  gregorianTo28x,
  coordinate28xToGregorian,
  parseCoordinate,
  formatCoordinate,
};
