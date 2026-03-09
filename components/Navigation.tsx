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
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: 'rgba(15, 15, 26, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderColor: 'var(--color-border-subtle)',
        height: '60px',
      }}
    >
      <div className="max-w-nav mx-auto px-6 md:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <Link
            href="/"
            className="gradient-text text-xl no-underline hover:no-underline"
            style={{
              fontWeight: 700,
              border: 'none',
            }}
          >
            28x
          </Link>
          <div className="flex items-center gap-5 flex-wrap">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-label uppercase no-underline transition-colors"
                style={{
                  color: pathname === link.href
                    ? 'var(--color-purple)'
                    : 'var(--color-text-secondary)',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                }}
                onMouseEnter={(e) => {
                  if (pathname !== link.href) {
                    e.currentTarget.style.color = 'var(--color-purple-light)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (pathname !== link.href) {
                    e.currentTarget.style.color = 'var(--color-text-secondary)'
                  }
                }}
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
