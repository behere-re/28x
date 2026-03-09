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
          The conversion algorithms are defined by the 28x Time Standard v0.1: the fixed epoch (28X-0001-01-01 
          corresponding to the first 28-day New Year following the March equinox of 2026) and the regular cycle 
          structure (13 × 28 days + 1 intercalary day per year).
        </p>
        <p>
          For now, reference implementations are being developed and tested. When ready, conversion tools will be 
          provided both as web interfaces and as programmatic APIs.
        </p>
      </div>
    </div>
  )
}

