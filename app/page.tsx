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
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-16">
        <h1 className="text-5xl font-light tracking-tight mb-6">
          28x is a regular, lunar-aligned calendar system for the age of intelligent systems.
        </h1>
        <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
          A temporal standard that combines the regularity of fixed cycles with the natural rhythm of lunar months: 
          13 × 28 days + 1 intercalary day, beginning on Gregorian 2026-03-20 (28X-0000-01-01).
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-16">
        <Link href="/standard" className="border border-gray-200 p-8 hover:border-gray-300 transition-colors block">
          <h2 className="text-xl font-light mb-4 text-gray-900 hover:text-gray-700">
            The Standard
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Read the complete 28x Time Standard v0.1: specification, epoch, cycle structure, and formal definitions.
          </p>
          <span className="text-sm text-blue-700 hover:text-blue-900">
            Read the standard →
          </span>
        </Link>

        <Link href="/why-now" className="border border-gray-200 p-8 hover:border-gray-300 transition-colors block">
          <h2 className="text-xl font-light mb-4 text-gray-900 hover:text-gray-700">
            Why Now
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Temporal integrity in the age of intelligent systems: why a new time standard matters now.
          </p>
          <span className="text-sm text-blue-700 hover:text-blue-900">
            Read essay →
          </span>
        </Link>

        <Link href="/time-literacy" className="border border-gray-200 p-8 hover:border-gray-300 transition-colors block">
          <h2 className="text-xl font-light mb-4 text-gray-900 hover:text-gray-700">
            Time Literacy
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Why education must teach rhythm before schedules: a case for temporal literacy.
          </p>
          <span className="text-sm text-blue-700 hover:text-blue-900">
            Read essay →
          </span>
        </Link>

        <Link href="/governance" className="border border-gray-200 p-8 hover:border-gray-300 transition-colors block">
          <h2 className="text-xl font-light mb-4 text-gray-900 hover:text-gray-700">
            Governance
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Stewardship, versioning, and openness: how the 28x standard is maintained and evolved.
          </p>
          <span className="text-sm text-blue-700 hover:text-blue-900">
            Learn more →
          </span>
        </Link>
      </div>

      <div className="mt-16 pt-16 border-t border-gray-200">
        <h2 className="text-2xl font-light mb-6">Key Properties</h2>
        <div className="grid md:grid-cols-3 gap-8 text-gray-700">
          <div>
            <h3 className="font-medium mb-2 text-gray-900">Regular</h3>
            <p className="text-sm leading-relaxed">
              Fixed 28-day months with predictable structure across all cycles.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2 text-gray-900">Lunar-Aligned</h3>
            <p className="text-sm leading-relaxed">
              Aligned with the natural rhythm of approximately 29.5-day lunar months.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2 text-gray-900">Fixed Epoch</h3>
            <p className="text-sm leading-relaxed">
              Gregorian 2026-03-20 (UTC) = 28X-0000-01-01. Year 0000 is the first 28x year.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
