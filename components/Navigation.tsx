'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  const links = [
    { href: '/standard', label: 'Standard' },
    { href: '/why-now', label: 'Why Now' },
    { href: '/time-literacy', label: 'Time Literacy' },
    { href: '/governance', label: 'Governance' },
    { href: '/afn', label: 'AFN' },
    { href: '/xero-reset', label: 'XERO Reset' },
    { href: '/convert', label: 'Convert' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-bg border-b border-border">
      <div className="max-w-nav mx-auto px-6 md:px-12 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/"
            className="font-display text-xl text-primary no-underline hover:no-underline"
            style={{ fontWeight: 600 }}
          >
            28x
          </Link>
          <div className="flex items-center gap-5 flex-wrap">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-label uppercase transition-colors no-underline ${
                  pathname === link.href
                    ? 'text-accent'
                    : 'text-secondary hover:text-accent'
                }`}
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
