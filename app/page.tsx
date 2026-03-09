import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '28x — An Open Temporal Standard',
  description: 'A regular, lunar-aligned calendar system for the age of intelligent systems. 13 × 28 days + 1 intercalary day, beginning on Gregorian 2026-03-20 (28X-0000-01-01).',
  openGraph: {
    title: '28x — An Open Temporal Standard',
    description: 'A regular, lunar-aligned calendar system for the age of intelligent systems.',
    url: 'https://28x.org',
  },
  alternates: {
    canonical: 'https://28x.org',
  },
}

export default function Home() {
  return (
    <div className="max-w-content mx-auto px-6 md:px-12 py-16 md:py-24">
      <div className="mb-section">
        <h1 className="font-display text-h1-mobile md:text-h1 tracking-tight mb-6 text-primary">
          28x is a regular, lunar-aligned calendar system for the age of intelligent systems.
        </h1>
        <p className="text-xl text-secondary max-w-paragraph" style={{ fontSize: '20px' }}>
          An open standard for time. Year 0000 begins March 20, 2026.
        </p>
        <Link
          href="/afn"
          className="inline-block mt-4 text-accent hover:text-accent-hover transition-colors no-underline"
          style={{ fontSize: '15px' }}
        >
          See the AFN standard — provable private presence, built on 28x time →
        </Link>
      </div>

      <div className="mb-section">
        <span className="section-label">Explore</span>
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/standard" className="bg-card border border-border rounded-lg p-6 hover:border-secondary transition-colors block no-underline group">
            <h2 className="font-display text-h3 mb-3 text-primary group-hover:text-accent transition-colors">
              The Standard
            </h2>
            <p className="text-secondary mb-4" style={{ lineHeight: '1.65' }}>
              Read the complete 28x Time Standard v0.1: specification, epoch, cycle structure, and formal definitions.
            </p>
            <span className="text-sm text-accent">
              Read the standard →
            </span>
          </Link>

          <Link href="/why-now" className="bg-card border border-border rounded-lg p-6 hover:border-secondary transition-colors block no-underline group">
            <h2 className="font-display text-h3 mb-3 text-primary group-hover:text-accent transition-colors">
              Why Now
            </h2>
            <p className="text-secondary mb-4" style={{ lineHeight: '1.65' }}>
              Temporal integrity in the age of intelligent systems: why a new time standard matters now.
            </p>
            <span className="text-sm text-accent">
              Read essay →
            </span>
          </Link>

          <Link href="/time-literacy" className="bg-card border border-border rounded-lg p-6 hover:border-secondary transition-colors block no-underline group">
            <h2 className="font-display text-h3 mb-3 text-primary group-hover:text-accent transition-colors">
              Time Literacy
            </h2>
            <p className="text-secondary mb-4" style={{ lineHeight: '1.65' }}>
              Why education must teach rhythm before schedules: a case for temporal literacy.
            </p>
            <span className="text-sm text-accent">
              Read essay →
            </span>
          </Link>

          <Link href="/governance" className="bg-card border border-border rounded-lg p-6 hover:border-secondary transition-colors block no-underline group">
            <h2 className="font-display text-h3 mb-3 text-primary group-hover:text-accent transition-colors">
              Governance
            </h2>
            <p className="text-secondary mb-4" style={{ lineHeight: '1.65' }}>
              Stewardship, versioning, and openness: how the 28x standard is maintained and evolved.
            </p>
            <span className="text-sm text-accent">
              Learn more →
            </span>
          </Link>
        </div>
      </div>

      <div>
        <span className="section-label">The Standard</span>
        <h2 className="font-display text-h2-mobile md:text-h2 mb-8 text-primary">Key Properties</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-lg p-6 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
            <h3 className="font-display text-h3 mb-2 text-primary">Regular</h3>
            <p className="text-secondary text-sm" style={{ lineHeight: '1.65' }}>
              Fixed 28-day months with predictable structure across all cycles.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
            <h3 className="font-display text-h3 mb-2 text-primary">Lunar-Aligned</h3>
            <p className="text-secondary text-sm" style={{ lineHeight: '1.65' }}>
              Aligned with the natural rhythm of approximately 29.5-day lunar months.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
            <h3 className="font-display text-h3 mb-2 text-primary">Fixed Epoch</h3>
            <p className="text-secondary text-sm" style={{ lineHeight: '1.65' }}>
              Gregorian 2026-03-20 (UTC) = 28X-0000-01-01. Year 0000 is the first 28x year.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
