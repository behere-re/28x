'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavLink = {
  href: string
  label: string
  external?: boolean
}

export default function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const links: NavLink[] = [
    { href: '/standard', label: 'Standard' },
    { href: '/why-now', label: 'Why Now' },
    { href: '/time-literacy', label: 'Time Literacy' },
    { href: '/governance', label: 'Governance' },
    { href: '/afn', label: 'AFN' },
    { href: '/xero-reset', label: 'XERO Reset' },
    { href: '/convert', label: 'Convert' },
    { href: 'https://api.28x.org', label: 'API', external: true },
  ]

  const linkStyle = (link: NavLink) => ({
    color: !link.external && pathname === link.href
      ? 'var(--color-purple)'
      : 'var(--color-text-secondary)',
    border: 'none' as const,
    fontSize: '13px',
    fontWeight: 500,
    letterSpacing: '0.08em',
  })

  const mobileLinkStyle = (link: NavLink) => ({
    color: !link.external && pathname === link.href
      ? 'var(--color-purple)'
      : 'var(--color-text-secondary)',
    border: 'none' as const,
    borderBottom: '1px solid var(--color-border-subtle)',
    fontSize: '14px',
    fontWeight: 500,
    letterSpacing: '0.08em',
  })

  return (
    <>
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
              style={{ fontWeight: 700, border: 'none' }}
            >
              28x
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-5">
              {links.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="uppercase no-underline transition-colors"
                    style={linkStyle(link)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-purple-light)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--color-text-secondary)'
                    }}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="uppercase no-underline transition-colors"
                    style={linkStyle(link)}
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
                )
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              style={{ border: 'none', background: 'none' }}
            >
              <span
                className="block w-5 h-[1.5px] transition-all duration-200"
                style={{
                  backgroundColor: 'var(--color-text-secondary)',
                  transform: isOpen ? 'rotate(45deg) translateY(3.25px)' : 'none',
                }}
              />
              <span
                className="block w-5 h-[1.5px] transition-all duration-200"
                style={{
                  backgroundColor: 'var(--color-text-secondary)',
                  opacity: isOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-5 h-[1.5px] transition-all duration-200"
                style={{
                  backgroundColor: 'var(--color-text-secondary)',
                  transform: isOpen ? 'rotate(-45deg) translateY(-3.25px)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay — hidden and non-interactive when closed so it never captures taps */}
      <div
        className="fixed inset-0 z-40 md:hidden flex flex-col transition-all duration-300"
        style={{
          backgroundColor: 'var(--color-bg-deep)',
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden',
          pointerEvents: isOpen ? 'auto' : 'none',
          paddingTop: '60px',
        }}
      >
        <div className="flex flex-col items-start px-8 pt-10 gap-1">
          {links.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="uppercase no-underline py-3 block w-full transition-colors"
                style={mobileLinkStyle(link)}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="uppercase no-underline py-3 block w-full transition-colors"
                style={mobileLinkStyle(link)}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        <div className="mt-auto px-8 pb-10">
          <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
            An open temporal standard
          </p>
        </div>
      </div>
    </>
  )
}
