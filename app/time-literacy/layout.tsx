import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Time Literacy: Why Education Must Teach Rhythm Before Schedules',
  description: 'A case for temporal literacy in education.',
}

export default function TimeLiteracyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="prose">
        {children}
      </div>
    </div>
  )
}

