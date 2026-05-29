import { NextRequest, NextResponse } from 'next/server'

function getBasicPassword(header: string) {
  if (!header.startsWith('Basic ')) return null
  try {
    const decoded = atob(header.slice('Basic '.length))
    const separator = decoded.indexOf(':')
    if (separator === -1) return null
    return decoded.slice(separator + 1)
  } catch {
    return null
  }
}

function getBearerToken(header: string) {
  if (!header.startsWith('Bearer ')) return null
  return header.slice('Bearer '.length).trim()
}

export function middleware(req: NextRequest) {
  const expected = process.env.ADMIN_TOKEN
  if (!expected) {
    return NextResponse.json(
      { error: 'Admin dashboard disabled. Set ADMIN_TOKEN to enable it.' },
      { status: 503 },
    )
  }

  const auth = req.headers.get('authorization') || ''
  const provided = getBearerToken(auth) || getBasicPassword(auth)
  if (provided === expected) {
    return NextResponse.next()
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="28x Admin", charset="UTF-8"',
    },
  })
}

export const config = {
  matcher: ['/admin/:path*'],
}
