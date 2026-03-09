import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Time Literacy: Why Education Must Teach Rhythm Before Schedules',
  description: 'A case for temporal literacy in education.',
  openGraph: {
    title: 'Time Literacy: Why Education Must Teach Rhythm Before Schedules',
    description: 'A case for temporal literacy in education.',
    url: 'https://28x.org/time-literacy',
    type: 'article',
  },
  alternates: {
    canonical: 'https://28x.org/time-literacy',
  },
}

export default function TimeLiteracyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="max-w-content mx-auto px-6 md:px-12 py-16 md:py-24">
      <div className="prose">
        {children}
      </div>
    </div>
  )
}

