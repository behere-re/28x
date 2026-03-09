import type { Metadata } from 'next'
import Link from 'next/link'
import { Space_Grotesk, Space_Mono } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: '28x — An Open Temporal Standard',
    description: 'A regular, lunar-aligned calendar system for the age of intelligent systems.',
    type: 'website',
    url: 'https://28x.org',
    siteName: '28x',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1024,
        height: 576,
        alt: '28x — An Open Temporal Standard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '28x — An Open Temporal Standard',
    description: 'A regular, lunar-aligned calendar system for the age of intelligent systems.',
    images: ['/og-image.png'],
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
      <body className={`${spaceGrotesk.variable} ${spaceMono.variable} font-sans`}>
        <div className="min-h-screen flex flex-col relative">
          <Navigation />
          <main className="flex-1 relative z-10">
            {children}
          </main>
          <footer className="relative z-10 bg-bg-surface border-t border-border">
            <div className="max-w-content mx-auto px-6 md:px-12 pt-12 pb-16">
              <p className="text-sm text-text-muted mb-3">
                28x is an open standard. Year 0000 begins{' '}
                <code>28X-0000-01-01</code>.
              </p>
              <div className="flex items-center gap-3 text-sm text-text-muted">
                <Link href="/acknowledgements" className="hover:text-purple-light transition-colors">
                  Acknowledgements
                </Link>
                <span>·</span>
                <Link href="/afn" className="hover:text-purple-light transition-colors">
                  AFN Standard
                </Link>
                <span>·</span>
                <a href="https://api.28x.org" target="_blank" rel="noopener noreferrer" className="hover:text-purple-light transition-colors">
                  API
                </a>
                <span>·</span>
                <a href="https://mjl.re" target="_blank" rel="noopener noreferrer" className="hover:text-purple-light transition-colors">
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
