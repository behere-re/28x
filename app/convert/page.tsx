import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Convert',
  description: 'Date conversion tools for the 28x standard.',
  openGraph: {
    title: 'Convert',
    description: 'Date conversion tools for the 28x standard.',
    url: 'https://28x.org/convert',
  },
  alternates: {
    canonical: 'https://28x.org/convert',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function ConvertPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="prose">
        <h1>Date Conversion</h1>
        <p>
          Conversion tools between 28x dates and other calendar systems will be available here in a future release.
        </p>
        <p>
          The conversion algorithms are defined by the 28x Time Standard v0.1: the fixed epoch
          (Gregorian 2026-03-20 UTC = 28X-0000-01-01), the regular cycle structure
          (13 × 28 days + 1 intercalary day), and the 28x leap-year rule.
        </p>
        <p>
          The <a href="https://api.28x.org" target="_blank" rel="noopener noreferrer">28x Time API</a> is
          live at <code>api.28x.org</code> — convert dates, query the current 28x coordinate, and generate
          AFN minting metadata programmatically.
        </p>
      </div>
    </div>
  )
}
