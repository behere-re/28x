import Link from 'next/link'
import { Metadata } from 'next'
import HomeNow from '@/components/HomeNow'

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
    <div className="max-w-content mx-auto px-6 md:px-12">
      <section className="hero-section pt-[120px] pb-section">
        <h1 className="gradient-text text-h1-mobile md:text-h1 tracking-tight mb-6">
          28x is a regular, lunar-aligned calendar system for the age of intelligent systems.
        </h1>
        <p className="text-text-secondary mb-6" style={{ fontSize: '20px', lineHeight: '1.6' }}>
          An open standard for time. Year 0000 begins March 20, 2026.
        </p>
        <HomeNow />
        <div className="flex items-center gap-3 mb-6 text-text-muted" style={{ fontSize: '14px' }}>
          <code className="whitespace-nowrap">28X-0000-01-01</code>
          <span>·</span>
          <span>Spring Equinox 2026</span>
        </div>
        <Link
          href="/afn"
          className="inline-block no-underline transition-colors"
          style={{
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--color-purple)',
            border: 'none',
          }}
        >
          See the AFN standard — provable private presence →
        </Link>
      </section>

      <section className="mb-section">
        <span className="section-label">Explore</span>
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/standard" className="card block no-underline group" style={{ border: '1px solid var(--color-border)' }}>
            <span className="section-label !mb-2" style={{ fontSize: '10px' }}>The Standard</span>
            <h2 className="text-h3 mb-3 text-text-primary group-hover:text-purple-light transition-colors" style={{ fontWeight: 500, marginTop: 0 }}>
              The Standard
            </h2>
            <p className="text-text-secondary text-sm mb-4" style={{ lineHeight: '1.65' }}>
              Read the complete 28x Time Standard v0.1: specification, epoch, cycle structure, and formal definitions.
            </p>
            <span className="text-sm" style={{ color: 'var(--color-purple)' }}>
              Read the standard →
            </span>
          </Link>

          <Link href="/why-now" className="card block no-underline group" style={{ border: '1px solid var(--color-border)' }}>
            <span className="section-label !mb-2" style={{ fontSize: '10px' }}>Essay</span>
            <h2 className="text-h3 mb-3 text-text-primary group-hover:text-purple-light transition-colors" style={{ fontWeight: 500, marginTop: 0 }}>
              Why Now
            </h2>
            <p className="text-text-secondary text-sm mb-4" style={{ lineHeight: '1.65' }}>
              Temporal integrity in the age of intelligent systems: why a new time standard matters now.
            </p>
            <span className="text-sm" style={{ color: 'var(--color-purple)' }}>
              Read essay →
            </span>
          </Link>

          <Link href="/time-literacy" className="card block no-underline group" style={{ border: '1px solid var(--color-border)' }}>
            <span className="section-label !mb-2" style={{ fontSize: '10px' }}>Essay</span>
            <h2 className="text-h3 mb-3 text-text-primary group-hover:text-purple-light transition-colors" style={{ fontWeight: 500, marginTop: 0 }}>
              Time Literacy
            </h2>
            <p className="text-text-secondary text-sm mb-4" style={{ lineHeight: '1.65' }}>
              Why education must teach rhythm before schedules: a case for temporal literacy.
            </p>
            <span className="text-sm" style={{ color: 'var(--color-purple)' }}>
              Read essay →
            </span>
          </Link>

          <Link href="/governance" className="card block no-underline group" style={{ border: '1px solid var(--color-border)' }}>
            <span className="section-label !mb-2" style={{ fontSize: '10px' }}>Governance</span>
            <h2 className="text-h3 mb-3 text-text-primary group-hover:text-purple-light transition-colors" style={{ fontWeight: 500, marginTop: 0 }}>
              Governance
            </h2>
            <p className="text-text-secondary text-sm mb-4" style={{ lineHeight: '1.65' }}>
              Stewardship, versioning, and openness: how the 28x standard is maintained and evolved.
            </p>
            <span className="text-sm" style={{ color: 'var(--color-purple)' }}>
              Learn more →
            </span>
          </Link>

          <a href="https://api.28x.org" target="_blank" rel="noopener noreferrer" className="card block no-underline group" style={{ border: '1px solid var(--color-border)' }}>
            <span className="section-label !mb-2" style={{ fontSize: '10px' }}>Developer</span>
            <h2 className="text-h3 mb-3 text-text-primary group-hover:text-purple-light transition-colors" style={{ fontWeight: 500, marginTop: 0 }}>
              Time API
            </h2>
            <p className="text-text-secondary text-sm mb-4" style={{ lineHeight: '1.65' }}>
              Query the current 28x date, convert between calendars, and mint AFN coordinates. Live at api.28x.org.
            </p>
            <span className="text-sm" style={{ color: 'var(--color-purple)' }}>
              Explore the API →
            </span>
          </a>
        </div>
      </section>

      <section className="pb-section">
        <span className="section-label">The Standard</span>
        <h2 className="text-h2-mobile md:text-h2 mb-8 text-text-primary" style={{ fontWeight: 600 }}>Key Properties</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="text-h3 mb-2 text-text-primary" style={{ fontWeight: 500 }}>Regular</h3>
            <p className="text-text-secondary text-sm" style={{ lineHeight: '1.65' }}>
              Fixed 28-day months with predictable structure across all cycles.
            </p>
          </div>
          <div className="card">
            <h3 className="text-h3 mb-2 text-text-primary" style={{ fontWeight: 500 }}>Lunar-Aligned</h3>
            <p className="text-text-secondary text-sm" style={{ lineHeight: '1.65' }}>
              Aligned with the natural rhythm of approximately 29.5-day lunar months.
            </p>
          </div>
          <div className="card" style={{ borderColor: 'var(--color-purple-dim)' }}>
            <h3 className="text-h3 mb-2 text-text-primary" style={{ fontWeight: 500 }}>Fixed Epoch</h3>
            <p className="text-text-secondary text-sm mb-3" style={{ lineHeight: '1.65' }}>
              Gregorian 2026-03-20 (UTC) = 28X-0000-01-01. Year 0000 is the first 28x year.
            </p>
            <code className="whitespace-nowrap">28X-0000-01-01</code>
          </div>
        </div>
      </section>
    </div>
  )
}
