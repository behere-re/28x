const DEFAULT_API_BASE = 'https://api.28x.org'

export type TwentyEightXNowPayload = {
  gregorian: {
    iso: string
    unix: number
    date: string
    time: string
  }
  '28x': {
    coordinate: string
    humanReadable?: string
  }
}

function getApiBase(): string {
  const raw = process.env.TWENTY_EIGHT_X_API_BASE?.trim()
  if (!raw) return DEFAULT_API_BASE
  return raw.replace(/\/$/, '')
}

/**
 * Fetches the current moment from the 28x Time API (GET /now).
 * Returns null if the request fails or the payload is invalid.
 */
export async function getNow(): Promise<TwentyEightXNowPayload | null> {
  const base = getApiBase()
  try {
    const res = await fetch(`${base}/now`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    const data: unknown = await res.json()
    if (!data || typeof data !== 'object') return null
    const record = data as Record<string, unknown>
    const block = record['28x']
    if (!block || typeof block !== 'object') return null
    const x = block as Record<string, unknown>
    if (typeof x.coordinate !== 'string' || !x.coordinate.startsWith('28X-')) {
      return null
    }
    const gregorian = record.gregorian
    if (!gregorian || typeof gregorian !== 'object') return null
    const g = gregorian as Record<string, unknown>
    if (
      typeof g.iso !== 'string' ||
      typeof g.date !== 'string' ||
      typeof g.time !== 'string' ||
      typeof g.unix !== 'number'
    ) {
      return null
    }
    return {
      gregorian: {
        iso: g.iso,
        unix: g.unix,
        date: g.date,
        time: g.time,
      },
      '28x': {
        coordinate: x.coordinate,
        humanReadable:
          typeof x.humanReadable === 'string' ? x.humanReadable : undefined,
      },
    }
  } catch {
    return null
  }
}
