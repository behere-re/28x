import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Governance',
  description: 'Stewardship, versioning, and openness of the 28x standard.',
}

export default function GovernancePage() {
  return (
    <div className="prose">
      <h1>Governance</h1>

      <h2>Principles</h2>
      <p>The 28x standard is maintained according to principles of:</p>
      <ul>
        <li><strong>Clarity:</strong> Changes must improve precision or remove ambiguity</li>
        <li><strong>Stability:</strong> Version increments are reserved for substantive changes</li>
        <li><strong>Openness:</strong> The standard remains free to use, modify, and implement</li>
        <li><strong>Neutrality:</strong> The standard does not encode cultural, religious, or ideological preferences</li>
      </ul>

      <h2>Versioning</h2>
      <p>The standard follows semantic versioning (vMAJOR.MINOR.PATCH):</p>
      <ul>
        <li><strong>Major version:</strong> Changes that break backward compatibility or fundamentally alter the specification</li>
        <li><strong>Minor version:</strong> Additions that extend the standard without breaking existing implementations</li>
        <li><strong>Patch version:</strong> Corrections, clarifications, or typographical fixes</li>
      </ul>
      <p>Current version: <strong>v0.1</strong></p>

      <h2>Stewardship</h2>
      <p>
        The 28x standard is maintained as an open specification. Decisions about changes, extensions, and clarifications are made through:
      </p>
      <ol>
        <li><strong>Documentation:</strong> All changes are documented in version history</li>
        <li><strong>Rationale:</strong> Changes must be justified in terms of clarity, necessity, or correctness</li>
        <li><strong>Review:</strong> Proposals are open to review before adoption</li>
      </ol>

      <h2>Openness</h2>
      <p>This standard is published for public use. Anyone may:</p>
      <ul>
        <li>Implement the standard in software or systems</li>
        <li>Reference the standard in documentation or research</li>
        <li>Propose modifications or extensions</li>
        <li>Create derivative works</li>
      </ul>
      <p>Attribution to the standard is appreciated but not required for use.</p>

      <h2>Future Development</h2>
      <p>Potential areas for future versions:</p>
      <ul>
        <li>Detailed conversion algorithms between 28x and other calendars</li>
        <li>Week definitions and naming conventions</li>
        <li>Regional or cultural naming variations</li>
        <li>Integration protocols with existing temporal standards</li>
      </ul>
      <p>
        These extensions will be developed with the same principles: clarity over completeness, stability over novelty.
      </p>

      <h2>Contributions</h2>
      <p>
        While the standard is open, contributions and proposals should align with the core principles: regularity, computational clarity, and neutrality. Proposals that introduce irregularity, cultural specificity, or unnecessary complexity will not be accepted.
      </p>

      <h2>Longevity</h2>
      <p>
        This standard is designed for long-term stability. Changes will be conservative and well-justified. The goal is to create a temporal reference that remains reliable and useful for decades, not to evolve constantly.
      </p>
      <p>
        If you have questions, proposals, or need clarification on the standard, the specification itself serves as the primary reference. This site will be updated as the standard evolves, maintaining backward compatibility wherever possible.
      </p>
    </div>
  )
}

