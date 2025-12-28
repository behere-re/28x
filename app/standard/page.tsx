import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '28x Time Standard v0.1',
  description: 'The complete specification for the 28x temporal standard.',
}

export default function StandardPage() {
  return (
    <div className="prose">
      <h1>28x Time Standard v0.1</h1>

      <h2>Overview</h2>
      <p>
        28x is a regular, lunar-aligned calendar system designed for computational clarity and natural rhythm. The system is defined by fixed cycles, a precise epoch, and deterministic conversion rules.
      </p>

      <h2>Epoch</h2>
      <p>
        <strong>28X-0001-01-01</strong> begins on the first 28-day New Year following the March equinox of 2026 (Gregorian calendar).
      </p>
      <p>
        The March equinox is defined as the moment when the apparent ecliptic longitude of the Sun is 0° (the vernal equinox in the Northern Hemisphere). The epoch date is determined by finding the first day following the equinox that aligns with the beginning of a 28-day cycle.
      </p>

      <h2>Cycle Structure</h2>
      <h3>Year</h3>
      <p>A 28x year consists of 13 months, each containing 28 days, plus one intercalary day.</p>
      <ul>
        <li><strong>Total days per year:</strong> 365 (13 × 28 + 1)</li>
        <li><strong>Months:</strong> 13, numbered 01 through 13</li>
        <li><strong>Days per month:</strong> 28, numbered 01 through 28</li>
        <li><strong>Intercalary day:</strong> Year-Day, occurring after the 13th month</li>
      </ul>

      <h3>Month</h3>
      <p>Each month is exactly 28 days, numbered 01 through 28.</p>

      <h3>Intercalary Day</h3>
      <p>
        The intercalary day (Year-Day) occurs once per year, immediately following the last day of the 13th month. It is designated as the final day of the year and does not belong to any month.
      </p>

      <h2>Date Format</h2>
      <p>Dates are written in the format: <strong>28X-YYYY-MM-DD</strong></p>
      <ul>
        <li><strong>28X:</strong> Standard identifier prefix</li>
        <li><strong>YYYY:</strong> Year number (4 digits, zero-padded, starting from 0001)</li>
        <li><strong>MM:</strong> Month number (2 digits, 01-13)</li>
        <li><strong>DD:</strong> Day number (2 digits, 01-28)</li>
      </ul>
      <p>The intercalary day is written as: <strong>28X-YYYY-00-00</strong></p>

      <h2>Computational Properties</h2>
      <h3>Regularity</h3>
      <p>All months except the intercalary period are identical in length. This regularity enables:</p>
      <ul>
        <li>Simple arithmetic for date calculations</li>
        <li>Predictable week patterns (if weeks are adopted)</li>
        <li>Straightforward indexing and storage</li>
      </ul>

      <h3>Alignment</h3>
      <p>The system maintains approximate alignment with:</p>
      <ul>
        <li>The lunar cycle (~29.5 days)</li>
        <li>The solar year (365.2425 days average)</li>
        <li>The March equinox as a seasonal anchor</li>
      </ul>

      <h3>Determinism</h3>
      <p>All date conversions and calculations are deterministic and do not require lookup tables for basic operations.</p>

      <h2>Conversion Principles</h2>
      <p>Conversion between 28x and other calendar systems (particularly Gregorian) is defined by:</p>
      <ol>
        <li>The fixed epoch date</li>
        <li>The regular cycle structure</li>
        <li>Astronomical observations for the equinox reference</li>
      </ol>
      <p>Detailed conversion algorithms will be published in future versions of this standard.</p>

      <h2>Version History</h2>
      <ul>
        <li><strong>v0.1</strong> (Initial publication): Core specification, epoch definition, cycle structure</li>
      </ul>

      <h2>Notes</h2>
      <p>This standard is designed to be extended with:</p>
      <ul>
        <li>Week definitions (if desired)</li>
        <li>Naming conventions for months and days</li>
        <li>Cultural or regional variations</li>
        <li>Integration with existing temporal standards</li>
      </ul>
      <p>
        The standard remains neutral on implementation details not specified here, allowing for flexibility in adoption while maintaining core temporal integrity.
      </p>
    </div>
  )
}

