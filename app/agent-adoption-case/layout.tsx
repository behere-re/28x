import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agent Adoption Case',
  description: '28x and agent adoption: use cases and rationale for the temporal standard in the age of intelligent systems.',
  openGraph: {
    title: 'Agent Adoption Case | 28x',
    description: '28x and agent adoption: use cases and rationale for the temporal standard in the age of intelligent systems.',
    url: 'https://28x.org/agent-adoption-case',
    type: 'article',
  },
  alternates: {
    canonical: 'https://28x.org/agent-adoption-case',
  },
}

export default function AgentAdoptionCaseLayout({
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
