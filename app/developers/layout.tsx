import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Developer documentation',
  description: '28x Time API: endpoints, parameters, and examples for the 28x temporal standard.',
  openGraph: {
    title: 'Developer documentation | 28x',
    description: '28x Time API: endpoints, parameters, and examples for the 28x temporal standard.',
    url: 'https://28x.org/developers',
    type: 'article',
  },
  alternates: {
    canonical: 'https://28x.org/developers',
  },
}

export default function DevelopersLayout({
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
