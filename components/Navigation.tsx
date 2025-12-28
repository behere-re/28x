'use client'

import Link from 'next/link'

export default function Navigation() {
  const links = [
    { href: '/', label: '28x' },
    { href: '/standard', label: 'Standard' },
    { href: '/why-now', label: 'Why Now' },
    { href: '/time-literacy', label: 'Time Literacy' },
    { href: '/governance', label: 'Governance' },
    { href: '/convert', label: 'Convert' },
  ]

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <Link href="/" className="text-xl font-light tracking-tight text-gray-900 hover:text-gray-700">
            28x
          </Link>
          <div className="flex items-center gap-6 flex-wrap">
            {links.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

