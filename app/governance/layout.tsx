import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Governance',
  description: 'Stewardship, versioning, and openness of the 28x standard.',
  openGraph: {
    title: 'Governance',
    description: 'Stewardship, versioning, and openness of the 28x standard.',
    url: 'https://28x.org/governance',
    type: 'article',
  },
  alternates: {
    canonical: 'https://28x.org/governance',
  },
}

export default function GovernanceLayout({
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

