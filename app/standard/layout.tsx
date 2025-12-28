import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '28x Time Standard v0.1',
  description: 'The complete specification for the 28x temporal standard.',
}

export default function StandardLayout({
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

