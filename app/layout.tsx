import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'

export const metadata: Metadata = {
  title: '28x — An Open Temporal Standard',
  description: 'A regular, lunar-aligned calendar system for the age of intelligent systems.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t border-gray-200 mt-24 py-12">
            <div className="max-w-6xl mx-auto px-6">
              <p className="text-sm text-gray-600">
                28x is an open temporal standard. This site serves as its authoritative reference.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}

