const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const {
  gregorianTo28x,
  coordinate28xToGregorian,
  formatCoordinate,
  formatCanonicalCoordinate,
} = require('../src/calendar/convert');
const { isLeapYear, yearLength, EPOCH_MS, MS_PER_DAY } = require('../src/calendar/constants');
const { validate28xCoordinate } = require('../src/calendar/validate');

describe('28x Calendar Conversion', () => {

  // Test 1: Epoch itself
  it('Test 1: Epoch date converts to Year 0, Month 1, Day 1, Spring', () => {
    const result = gregorianTo28x(Date.parse('2026-03-20T00:00:00.000Z'));
    const t = result['28x'];
    assert.equal(t.year, 0);
    assert.equal(t.month, 1);
    assert.equal(t.day, 1);
    assert.equal(t.season, 'Spring');
    assert.equal(t.coordinate, '28X-0000-01-01');
    assert.equal(t.isIntercalary, false);
  });

  // Test 2: One day after epoch
  it('Test 2: One day after epoch is Month 1 Day 2', () => {
    const result = gregorianTo28x(Date.parse('2026-03-21T00:00:00.000Z'));
    const t = result['28x'];
    assert.equal(t.year, 0);
    assert.equal(t.month, 1);
    assert.equal(t.day, 2);
  });

  // Test 3: Last day of Month 1
  // Epoch + 27 days = 2026-04-16 (day index 27, which is Month 1 Day 28)
  it('Test 3: Last day of Month 1 (epoch + 27 days)', () => {
    const result = gregorianTo28x(Date.parse('2026-04-16T00:00:00.000Z'));
    const t = result['28x'];
    assert.equal(t.year, 0);
    assert.equal(t.month, 1);
    assert.equal(t.day, 28);
  });

  // Test 4: First day of Month 2
  // Epoch + 28 days = 2026-04-17
  it('Test 4: First day of Month 2 (epoch + 28 days)', () => {
    const result = gregorianTo28x(Date.parse('2026-04-17T00:00:00.000Z'));
    const t = result['28x'];
    assert.equal(t.year, 0);
    assert.equal(t.month, 2);
    assert.equal(t.day, 1);
  });

  // Test 5: 2026-06-20 is 92 days after epoch
  // Day index 92: month = floor(92/28)+1 = 4, day = (92%28)+1 = 9
  // Month 4 = Summer
  it('Test 5: 2026-06-20 (92 days after epoch) is Month 4 Day 9 Summer', () => {
    const result = gregorianTo28x(Date.parse('2026-06-20T00:00:00.000Z'));
    const t = result['28x'];
    assert.equal(t.year, 0);
    assert.equal(t.month, 4);
    assert.equal(t.day, 9);
    assert.equal(t.season, 'Summer');
  });

  // Test 6: Last named day of Year 0000
  // Day index 363 = Month 13 Day 28
  // Epoch + 363 days
  it('Test 6: Last named day of Year 0000 (epoch + 363 days)', () => {
    const dateMs = EPOCH_MS + 363 * MS_PER_DAY;
    const result = gregorianTo28x(dateMs);
    const t = result['28x'];
    assert.equal(t.year, 0);
    assert.equal(t.month, 13);
    assert.equal(t.day, 28);
    assert.equal(t.isIntercalary, false);
  });

  // Test 7: Intercalary day of Year 0000
  // Day index 364 = intercalary day
  it('Test 7: Intercalary day of Year 0000 (epoch + 364 days)', () => {
    const dateMs = EPOCH_MS + 364 * MS_PER_DAY;
    const result = gregorianTo28x(dateMs);
    const t = result['28x'];
    assert.equal(t.year, 0);
    assert.equal(t.month, 0);
    assert.equal(t.day, 0);
    assert.equal(t.coordinate, '28X-0000-00-00');
    assert.equal(t.canonicalCoordinate, '28X-0000-ID');
    assert.equal(t.isIntercalary, true);
    assert.equal(t.season, null);
  });

  // Test 8: First day of Year 0001
  // Year 0000 has 365 days (not a leap year), so epoch + 365 days
  it('Test 8: First day of Year 0001 (epoch + 365 days)', () => {
    const dateMs = EPOCH_MS + 365 * MS_PER_DAY;
    const result = gregorianTo28x(dateMs);
    const t = result['28x'];
    assert.equal(t.year, 1);
    assert.equal(t.month, 1);
    assert.equal(t.day, 1);
    assert.equal(t.season, 'Spring');
  });

  // Test 9: Pre-epoch date
  it('Test 9: Pre-epoch date (2026-03-19) is transition day', () => {
    const result = gregorianTo28x(Date.parse('2026-03-19T00:00:00.000Z'));
    const t = result['28x'];
    assert.equal(t.preEpoch, true);
    assert.equal(t.daysBeforeEpoch, 1);
    assert.equal(t.isTransitionDay, true);
  });

  // Test 10: Leap year — first day of Year 0004
  // Years 0-3: Year 0 = 365, Year 1 = 365, Year 2 = 365, Year 3 = 365
  // Total days before Year 4: 4 * 365 = 1460
  // Year 4 is first leap year (4 % 4 === 0 && year !== 0)
  it('Test 10: First day of Year 0004 (first leap year)', () => {
    const totalDaysBefore = 4 * 365; // 1460
    const dateMs = EPOCH_MS + totalDaysBefore * MS_PER_DAY;
    const result = gregorianTo28x(dateMs);
    const t = result['28x'];
    assert.equal(t.year, 4);
    assert.equal(t.month, 1);
    assert.equal(t.day, 1);
    assert.equal(t.isLeapYear, true);
  });

  // Test 11: /afn-coordinate style check
  it('Test 11: AFN coordinate for epoch timestamp', () => {
    const result = gregorianTo28x(Date.parse('2026-03-20T00:00:00.000Z'));
    assert.equal(result['28x'].coordinate, '28X-0000-01-01');

    // Verify season identifier format
    const season = result['28x'].season.toLowerCase();
    const yearPadded = String(result['28x'].year).padStart(4, '0');
    const seasonIdentifier = `behere-${season}-${yearPadded}`;
    assert.equal(seasonIdentifier, 'behere-spring-0000');
  });

  // Test 12: Round-trip conversion
  it('Test 12: Round-trip Gregorian -> 28x -> Gregorian for 2026-05-01', () => {
    const originalDate = '2026-05-01';
    const originalMs = Date.parse(`${originalDate}T00:00:00.000Z`);

    const to28x = gregorianTo28x(originalMs);
    const coordinate = to28x['28x'].coordinate;

    const backToGregorian = coordinate28xToGregorian(coordinate);
    const resultDate = backToGregorian.toISOString().split('T')[0];

    assert.equal(resultDate, originalDate);
  });

});

describe('Intercalary Coordinates', () => {
  it('formats canonical ID/LID coordinates', () => {
    assert.equal(formatCanonicalCoordinate(0, 0, 0), '28X-0000-ID');
    assert.equal(formatCanonicalCoordinate(4, 0, 1), '28X-0004-LID');
    assert.equal(formatCanonicalCoordinate(-4, 0, 1), '28X--0004-LID');
    assert.equal(formatCanonicalCoordinate(0, 3, 14), formatCoordinate(0, 3, 14));
  });

  it('accepts canonical and legacy intercalary coordinates', () => {
    const canonical = coordinate28xToGregorian('28X-0000-ID').toISOString();
    const legacy = coordinate28xToGregorian('28X-0000-00-00').toISOString();
    assert.equal(canonical, legacy);
  });

  it('round-trips a leap intercalary day with canonical output', () => {
    const date = coordinate28xToGregorian('28X-0004-LID');
    const result = gregorianTo28x(date);
    assert.equal(result['28x'].coordinate, '28X-0004-00-01');
    assert.equal(result['28x'].canonicalCoordinate, '28X-0004-LID');
  });

  it('rejects LID for non-leap years', () => {
    const validation = validate28xCoordinate('28X-0001-LID');
    assert.equal(validation.valid, false);
    assert.equal(validation.code, 'INVALID_LEAP_INTERCALARY');
    assert.throws(() => coordinate28xToGregorian('28X-0001-LID'));
  });
});

describe('Leap Year Logic', () => {
  it('Year 0 is NOT a leap year', () => {
    assert.equal(isLeapYear(0), false);
    assert.equal(yearLength(0), 365);
  });

  it('Year 4 IS a leap year', () => {
    assert.equal(isLeapYear(4), true);
    assert.equal(yearLength(4), 366);
  });

  it('Year 1 is NOT a leap year', () => {
    assert.equal(isLeapYear(1), false);
  });

  it('Year 8 IS a leap year', () => {
    assert.equal(isLeapYear(8), true);
  });

  it('Year 100 IS a leap year under the 28x rule', () => {
    assert.equal(isLeapYear(100), true);
    assert.equal(yearLength(100), 366);
  });

  it('Year -4 IS a leap year under the 28x rule', () => {
    assert.equal(isLeapYear(-4), true);
    assert.equal(yearLength(-4), 366);
  });
});
