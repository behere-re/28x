const { DAYS_PER_MONTH, MONTHS_PER_YEAR, isLeapYear } = require('./constants');

function validateGregorianDate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') {
    return { valid: false, error: 'Missing date parameter', code: 'MISSING_DATE' };
  }

  const ms = Date.parse(dateStr);
  if (isNaN(ms)) {
    return { valid: false, error: `Invalid date format: "${dateStr}"`, code: 'INVALID_DATE_FORMAT' };
  }

  return { valid: true, ms };
}

function validateUnixTimestamp(timestampStr) {
  if (!timestampStr) {
    return { valid: false, error: 'Missing timestamp parameter', code: 'MISSING_TIMESTAMP' };
  }

  const num = Number(timestampStr);
  if (isNaN(num) || !isFinite(num)) {
    return { valid: false, error: `Invalid unix timestamp: "${timestampStr}"`, code: 'INVALID_TIMESTAMP' };
  }

  // Accept seconds or milliseconds — if < 1e12, treat as seconds
  const ms = num < 1e12 ? num * 1000 : num;
  return { valid: true, ms };
}

function validate28xCoordinate(coordinateStr) {
  if (!coordinateStr || typeof coordinateStr !== 'string') {
    return { valid: false, error: 'Missing coordinate parameter', code: 'MISSING_COORDINATE' };
  }

  const intercalaryMatch = coordinateStr.match(/^28X-(-\d{4}|\d{4})-(ID|LID)$/);
  if (intercalaryMatch) {
    const year = parseInt(intercalaryMatch[1], 10);
    const day = intercalaryMatch[2] === 'ID' ? 0 : 1;
    if (day === 1 && !isLeapYear(year)) {
      return {
        valid: false,
        error: `Year ${year} is not a leap year — 28X-${intercalaryMatch[1]}-LID is invalid`,
        code: 'INVALID_LEAP_INTERCALARY',
      };
    }
    return { valid: true, year, month: 0, day };
  }

  const match = coordinateStr.match(/^28X-(-\d{4}|\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return {
      valid: false,
      error: `Invalid 28x coordinate format: "${coordinateStr}". Expected 28X-YYYY-MM-DD, 28X-YYYY-ID, or 28X-YYYY-LID`,
      code: 'INVALID_COORDINATE_FORMAT',
    };
  }

  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const day = parseInt(match[3], 10);

  if (month === 0) {
    // Intercalary day
    if (day === 0) {
      return { valid: true, year, month, day };
    }
    if (day === 1) {
      if (!isLeapYear(year)) {
        return {
          valid: false,
          error: `Year ${year} is not a leap year — 28X-${String(year).padStart(4, '0')}-00-01 is invalid`,
          code: 'INVALID_LEAP_INTERCALARY',
        };
      }
      return { valid: true, year, month, day };
    }
    return {
      valid: false,
      error: `Invalid intercalary day: ${day}. Must be 0 or 1 (leap years only)`,
      code: 'INVALID_INTERCALARY_DAY',
    };
  }

  if (month < 1 || month > MONTHS_PER_YEAR) {
    return {
      valid: false,
      error: `Invalid month: ${month}. Must be 1-${MONTHS_PER_YEAR} or 0 (intercalary)`,
      code: 'INVALID_MONTH',
    };
  }

  if (day < 1 || day > DAYS_PER_MONTH) {
    return {
      valid: false,
      error: `Invalid day: ${day}. Must be 1-${DAYS_PER_MONTH}`,
      code: 'INVALID_DAY',
    };
  }

  return { valid: true, year, month, day };
}

function validateYear(yearStr) {
  if (yearStr === undefined || yearStr === null || yearStr === '') {
    return { valid: true, year: null }; // Will default to current year
  }

  const num = parseInt(yearStr, 10);
  if (isNaN(num) || num < 0) {
    return { valid: false, error: `Invalid year: "${yearStr}". Must be a non-negative integer`, code: 'INVALID_YEAR' };
  }

  return { valid: true, year: num };
}

module.exports = {
  validateGregorianDate,
  validateUnixTimestamp,
  validate28xCoordinate,
  validateYear,
};
