import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'
import Navigation from '@/components/Navigation'

export const metadata: Metadata = {
  metadataBase: new URL('https://28x.org'),
  title: {
    default: '28x — An Open Temporal Standard',
    template: '%s | 28x',
  },
  description: 'A regular, lunar-aligned calendar system for the age of intelligent systems.',
  keywords: ['28x', 'calendar', 'temporal standard', 'lunar calendar', 'time standard', 'calendar system'],
  authors: [{ name: '28x Standard' }],
  creator: '28x Standard',
  openGraph: {
    title: '28x — An Open Temporal Standard',
    description: 'A regular, lunar-aligned calendar system for the age of intelligent systems.',
    type: 'website',
    url: 'https://28x.org',
    siteName: '28x',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: '28x — An Open Temporal Standard',
    description: 'A regular, lunar-aligned calendar system for the age of intelligent systems.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://28x.org',
  },
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
              <p className="text-sm text-gray-600 mb-4">
                28x is an open temporal standard. This site serves as its authoritative reference.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <Link href="/acknowledgements" className="hover:text-gray-700 transition-colors">
                  Acknowledgements
                </Link>
                <span>•</span>
                <a href="https://mjl.re" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700 transition-colors">
                  by mjl.re
                </a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}

