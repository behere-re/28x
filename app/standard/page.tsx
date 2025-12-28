import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '28x Time Standard v0.1',
  description: 'The complete specification for the 28x temporal standard.',
}

export default function StandardPage() {
  return (
    <div className="prose">
      <h1>28x Time Standard</h1>

      <p>
        <strong>Draft v0.1</strong>
      </p>

      <p>
        <strong>Status:</strong> Draft (public)
      </p>
      <p>
        <strong>Canonical Home:</strong> 28x.org
      </p>
      <p>
        <strong>Scope:</strong> Calendar structure, epoch, date format, and normative rules for representation
      </p>

      <h2>1. Purpose</h2>

      <p>
        The 28x Time Standard defines a regular, lunar-inspired calendar system intended for clarity, predictability, and long-horizon coordination across human and computational systems.
      </p>

      <p>The standard provides:</p>
      <ul>
        <li>A uniform calendar lattice (13 × 28 days)</li>
        <li>A single Intercalary Day to complete the year</li>
        <li>A fixed epoch for absolute date representation</li>
        <li>A stable, machine-readable date format</li>
        <li>A basis for deterministic mapping between Gregorian and 28x dates</li>
      </ul>

      <p>
        28x is designed to coexist with the Gregorian calendar. It does not require cultural replacement to be useful.
      </p>

      <h2>2. Terms and Definitions</h2>

      <p>
        <strong>28x Year:</strong> A year consisting of 13 moons of 28 days each, plus one Intercalary Day.
      </p>

      <p>
        <strong>Moon:</strong> A fixed-length month-like unit of 28 consecutive days.
      </p>

      <p>
        <strong>Week:</strong> A 7-day subdivision of a moon.
      </p>

      <p>
        <strong>Intercalary Day:</strong> A single day outside the moon/week lattice used to complete the year.
      </p>

      <p>
        <strong>Day Out of Time (DOOT):</strong> A cultural alias for the Intercalary Day (non-normative).
      </p>

      <p>
        <strong>Epoch:</strong> The reference point from which all 28x dates are computed.
      </p>

      <h2>3. Calendar Structure</h2>

      <p>Each 28x year consists of:</p>
      <ul>
        <li>13 moons</li>
        <li>28 days per moon</li>
        <li>7-day weeks</li>
        <li>364 structured days</li>
        <li>1 Intercalary Day</li>
      </ul>

      <p>
        <strong>Total: 365 days per 28x year</strong>
      </p>

      <h3>3.1 Regularity properties</h3>

      <ul>
        <li>All moons are identical in length.</li>
        <li>The internal lattice is stable: moon boundaries and weekdays do not drift within the 28x system.</li>
        <li>No leap-year mechanism exists in the core standard.</li>
      </ul>

      <h2>4. Epoch</h2>

      <h3>4.1 Epoch statement (normative)</h3>

      <p>
        <strong>28X-0001-01-01</strong> begins on the first 28-day New Year occurring after the March equinox of 2026 (Gregorian).
      </p>

      <p>
        This epoch SHALL be treated as fixed and SHALL NOT be altered in future versions of the standard.
      </p>

      <h3>4.2 Meaning of the epoch</h3>

      <p>
        The epoch establishes a stable, absolute coordinate system for dates. Once the epoch is fixed, any date—past or future—may be expressed in 28x coordinates via deterministic computation.
      </p>

      <h2>5. Intercalary Day</h2>

      <h3>5.1 Placement (normative)</h3>

      <p>The Intercalary Day occurs after:</p>
      <ul>
        <li>Moon 13, Day 28</li>
      </ul>

      <p>and before:</p>
      <ul>
        <li>Moon 1, Day 1 of the following year.</li>
      </ul>

      <p>
        It is not assigned to any moon or week.
      </p>

      <h3>5.2 Naming (normative and non-normative)</h3>

      <p>
        <strong>Canonical name:</strong> Intercalary Day (normative)
      </p>

      <p>
        <strong>Cultural alias:</strong> Day Out of Time (DOOT) (non-normative)
      </p>

      <p>
        Implementations MAY display the cultural alias, but MUST preserve the canonical meaning and computational handling.
      </p>

      <h2>6. Date Representation</h2>

      <h3>6.1 Canonical date format (normative)</h3>

      <p>Structured days SHALL be represented as:</p>

      <p>
        <strong>28X-YYYY-MM-DD</strong>
      </p>

      <p>Where:</p>
      <ul>
        <li>YYYY is a signed integer year in zero-padded form (see §6.4)</li>
        <li>MM is the moon number 01–13</li>
        <li>DD is the day number 01–28</li>
      </ul>

      <p>Example:</p>
      <p>
        <code>28X-0001-03-14</code>
      </p>

      <h3>6.2 Intercalary Day representation (normative)</h3>

      <p>Intercalary Day SHALL be represented as:</p>

      <p>
        <strong>28X-YYYY-ID</strong>
      </p>

      <p>Example:</p>
      <p>
        <code>28X-0001-ID</code>
      </p>

      <p>
        Implementations MUST treat ID as outside the moon/week lattice.
      </p>

      <h3>6.3 Validation rules (normative)</h3>

      <ul>
        <li>MM MUST be between 01 and 13 inclusive.</li>
        <li>DD MUST be between 01 and 28 inclusive.</li>
        <li>28X-YYYY-ID MUST NOT include MM or DD.</li>
        <li>Intercalary Day MUST occur exactly once per 28x year.</li>
      </ul>

      <h3>6.4 Year numbering and backdating (normative)</h3>

      <p>
        28x supports representation of dates before the epoch.
      </p>

      <p>
        Year numbering includes Year 0000.
      </p>

      <p>
        Years prior to Year 0001 SHALL be represented using a leading minus sign.
      </p>

      <p>Examples:</p>
      <ul>
        <li><code>28X-0000-01-01</code></li>
        <li><code>28X--0001-13-28</code></li>
      </ul>

      <p>
        (Exact formatting for negative years MAY follow ISO-8601 conventions; implementations SHOULD document their formatting choice consistently.)
      </p>

      <h2>7. Mapping to Gregorian Dates</h2>

      <p>
        28x is an epoch-based calendar. Given the epoch, mapping between Gregorian dates and 28x dates is computed by counting whole days forward or backward.
      </p>

      <h3>7.1 Determinism (normative)</h3>

      <p>
        Given a specific Gregorian date and a fixed epoch, conversion results MUST be deterministic.
      </p>

      <h3>7.2 Reversibility (normative)</h3>

      <p>
        Implementations SHOULD ensure conversions are reversible such that:
      </p>

      <p>
        Gregorian → 28x → Gregorian returns the original day (date) value, assuming consistent day-boundary conventions.
      </p>

      <h3>7.3 Algorithm status (non-normative)</h3>

      <p>
        This version defines the calendar structure, epoch, and date formats. A fully specified reference conversion algorithm and test vectors are planned for a subsequent version.
      </p>

      <h2>8. Retrospective Mapping</h2>

      <p>
        Dates prior to the epoch may be expressed in 28x coordinates using negative year values and the same structural rules.
      </p>

      <p>
        Such mappings are mathematical coordinate assignments and do not imply historical usage of the 28x calendar.
      </p>

      <h2>9. Cultural Observances (Non-normative)</h2>

      <p>
        The following observances MAY be associated with 28x cultural practice. They are outside the canonical computation rules.
      </p>

      <h3>9.1 Day Out of Time (DOOT)</h3>

      <p>
        DOOT is a cultural name for the Intercalary Day.
      </p>

      <h3>9.2 TAO Day</h3>

      <p>
        TAO Day MAY be observed on Gregorian June 28 (6/28). This observance is purely symbolic and non-normative.
      </p>

      <p>Properties (non-normative):</p>
      <ul>
        <li>Numerically harmonic: 6 × 28 = 168 (six complete 28-day cycles)</li>
        <li>Provides a convenient symbolic moment for reflection or recalibration</li>
        <li>Not mathematically tied to the midpoint of the 28x year lattice</li>
      </ul>

      <p>
        TAO Day is excluded from 28x date computation and does not affect conversions or the canonical calendar structure.
      </p>

      <h2>10. Versioning and Stability</h2>

      <h3>10.1 Versioning model</h3>

      <p>The standard uses semantic versioning:</p>
      <ul>
        <li><strong>MAJOR:</strong> backward-incompatible changes (expected to be rare)</li>
        <li><strong>MINOR:</strong> additive features that preserve compatibility</li>
        <li><strong>PATCH:</strong> clarifications and error corrections</li>
      </ul>

      <h3>10.2 Stability commitments (normative intent)</h3>

      <p>Future versions SHALL preserve:</p>
      <ul>
        <li>The epoch definition</li>
        <li>The 13 × 28 lattice</li>
        <li>The single Intercalary Day concept</li>
        <li>Backward compatibility for date representations</li>
      </ul>

      <h2>11. Governance (Summary)</h2>

      <p>
        28x is stewarded as an open standard with conservative evolution. Governance details, proposal process, and stewardship roles are described on the <a href="/governance">Governance</a> page.
      </p>

      <h2>Notes for Implementers (Non-normative)</h2>

      <p>28x is intended to be:</p>
      <ul>
        <li>easy to represent</li>
        <li>easy to validate</li>
        <li>easy to compute against once the conversion algorithm is implemented</li>
        <li>stable across decades</li>
      </ul>
    </div>
  )
}
