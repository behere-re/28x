import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Why Now: Temporal Integrity in the Age of Intelligent Systems',
  description: 'Why a new time standard matters in the age of intelligent systems.',
}

export default function WhyNowLayout({
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

