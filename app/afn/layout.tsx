import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AFN — A Field Note',
  description: 'A two-layer architecture for provable private presence — public proof on Algorand, private content owned by the family.',
  openGraph: {
    title: 'AFN — A Field Note',
    description: 'A two-layer architecture for provable private presence — public proof on Algorand, private content owned by the family.',
    url: 'https://28x.org/afn',
    type: 'article',
  },
  alternates: {
    canonical: 'https://28x.org/afn',
  },
}

export default function AFNLayout({
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
