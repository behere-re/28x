import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Why Now: Temporal Integrity in the Age of Intelligent Systems',
  description: 'Why a new time standard matters in the age of intelligent systems.',
  openGraph: {
    title: 'Why Now: Temporal Integrity in the Age of Intelligent Systems',
    description: 'Why a new time standard matters in the age of intelligent systems.',
    url: 'https://28x.org/why-now',
    type: 'article',
  },
  alternates: {
    canonical: 'https://28x.org/why-now',
  },
}

export default function WhyNowLayout({
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

