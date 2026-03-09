import type { Metadata } from 'next'
import Link from 'next/link'
import { Inter, Fraunces } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-fraunces',
  display: 'swap',
})

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
      <body className={`${inter.variable} ${fraunces.variable} font-sans`}>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t border-border mt-section pt-12 pb-16">
            <div className="max-w-content mx-auto px-6 md:px-12">
              <p className="text-sm text-secondary mb-3">
                28x is an open standard. Year 0000 begins 28X-0000-01-01.
              </p>
              <div className="flex items-center gap-3 text-sm text-secondary">
                <Link href="/acknowledgements" className="hover:text-accent transition-colors">
                  Acknowledgements
                </Link>
                <span>·</span>
                <Link href="/afn" className="hover:text-accent transition-colors">
                  AFN Standard
                </Link>
                <span>·</span>
                <a href="https://mjl.re" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
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
