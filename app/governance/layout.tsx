import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Governance',
  description: 'Stewardship, versioning, and openness of the 28x standard.',
}

export default function GovernanceLayout({
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

