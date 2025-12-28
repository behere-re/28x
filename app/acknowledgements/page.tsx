import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Acknowledgements',
  description: 'Intellectual and cultural precursors to the 28x Time Standard.',
}

export default function AcknowledgementsPage() {
  return (
    <div className="prose">
      <h1>Acknowledgements</h1>

      <p>
        The 28x Time Standard builds on a broader history of inquiry into time, calendars, and temporal representation. This page acknowledges intellectual and cultural precursors whose work has informed or influenced the development of 28x.
      </p>

      <h2>José Argüelles and the Law of Time</h2>

      <p>
        José Argüelles (1939–2011) and the Law of Time movement preserved and reintroduced the 13 × 28 calendar structure to contemporary discourse. Through works such as <em>The Mayan Factor</em> and the establishment of the 13 Moon calendar, Argüelles and his collaborators demonstrated the practical viability of a regular, 28-day month system and maintained cultural continuity with earlier calendar traditions.
      </p>

      <p>
        The 28x Time Standard acknowledges this contribution while explicitly not adopting the metaphysical, cosmological, or prophetic frameworks associated with the Law of Time movement. 28x is a technical standard for temporal representation, not a belief system or cosmological model.
      </p>

      <p>For further reading:</p>
      <ul>
        <li>
          <a href="https://lawoftime.org" target="_blank" rel="noopener noreferrer">lawoftime.org</a> — The Foundation for the Law of Time
        </li>
        <li>
          Argüelles, José. <em>The Mayan Factor: Path Beyond Technology</em>. Bear &amp; Company, 1987.
        </li>
      </ul>

      <h2>Historical Calendar Systems</h2>

      <p>
        The 13 × 28 structure appears in various historical and cultural contexts, including certain interpretations of Mayan calendar systems. 28x does not claim historical continuity with these systems, but recognizes that the mathematical structure of 13 months of 28 days has been explored and valued across different cultures and eras.
      </p>

      <p>
        The 28x standard is an independent, epoch-based system designed for contemporary computational and coordination needs. Its value derives from its regularity and determinism, not from historical precedent or cultural authority.
      </p>
    </div>
  )
}

