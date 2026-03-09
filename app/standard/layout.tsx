import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '28x Time Standard v0.1',
  description: 'The complete specification for the 28x temporal standard.',
  openGraph: {
    title: '28x Time Standard v0.1',
    description: 'The complete specification for the 28x temporal standard.',
    url: 'https://28x.org/standard',
  },
  alternates: {
    canonical: 'https://28x.org/standard',
  },
}

export default function StandardLayout({
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

