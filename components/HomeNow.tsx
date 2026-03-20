import { getNow } from '@/lib/28x-api'

export default async function HomeNow() {
  const data = await getNow()

  if (!data) {
    return (
      <p className="mb-6 text-text-muted" style={{ fontSize: '14px' }}>
        Live date unavailable.
      </p>
    )
  }

  const x = data['28x']

  return (
    <div className="mb-6">
      <p className="text-text-muted mb-2" style={{ fontSize: '11px', letterSpacing: '0.08em' }}>
        NOW (UTC)
      </p>
      <div className="flex flex-col gap-2">
        <code className="whitespace-nowrap w-fit" style={{ fontSize: '14px' }}>
          {x.coordinate}
        </code>
        {x.humanReadable ? (
          <p className="text-text-secondary" style={{ fontSize: '14px', lineHeight: '1.6' }}>
            {x.humanReadable}
          </p>
        ) : null}
        <p className="text-text-muted" style={{ fontSize: '12px', lineHeight: '1.5' }}>
          As of {data.gregorian.iso}
        </p>
      </div>
    </div>
  )
}
