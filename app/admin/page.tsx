type CountItem = {
  key: string
  count: number
}

export const dynamic = 'force-dynamic'

type EndpointMetric = {
  endpoint: string
  requests: number
  errors: number
  errorRate: number
  latencyMs: {
    p50: number
    p95: number
    max: number
  }
  statuses: Record<string, number>
}

type RecentRequest = {
  at: string
  endpoint: string
  status: number
  latencyMs: number
  origin: string
  userAgentClass: string
  clientHash: string
}

type MetricsSnapshot = {
  generatedAt: string
  startedAt: string
  uptimeSeconds: number
  requests: {
    total: number
    errors: number
    errorRate: number
    latencyMs: {
      p50: number
      p95: number
      max: number
    }
  }
  endpoints: EndpointMetric[]
  statuses: Record<string, number>
  origins: CountItem[]
  userAgents: CountItem[]
  clients: {
    unique: number
    top: CountItem[]
  }
  recentRequests: RecentRequest[]
  x402: {
    events: Record<string, number>
    byEndpoint: Array<{
      endpoint: string
      events: Record<string, number>
    }>
  }
}

async function getMetrics() {
  const token = process.env.API_ADMIN_TOKEN || process.env.ADMIN_TOKEN
  const apiBase = (process.env.TWENTY_EIGHT_X_API_BASE || 'https://api.28x.org').replace(/\/$/, '')

  if (!token) {
    return {
      data: null,
      error: 'ADMIN_TOKEN is not configured for the dashboard.',
    }
  }

  try {
    const res = await fetch(`${apiBase}/admin/metrics`, {
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) {
      return {
        data: null,
        error: `Metrics API returned ${res.status}.`,
      }
    }

    return {
      data: (await res.json()) as MetricsSnapshot,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unable to load metrics.',
    }
  }
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(value)
}

function formatPercent(value: number) {
  return `${(value * 100).toFixed(1)}%`
}

function formatDuration(seconds: number) {
  if (seconds < 60) return `${seconds}s`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`
  return `${Math.floor(seconds / 86400)}d`
}

function StatCard({
  label,
  value,
  detail,
}: {
  label: string
  value: string
  detail?: string
}) {
  return (
    <div className="card">
      <p className="section-label !mb-2">{label}</p>
      <p className="text-text-primary" style={{ fontSize: '28px', lineHeight: 1.1, fontWeight: 600 }}>
        {value}
      </p>
      {detail ? (
        <p className="text-text-muted mt-2" style={{ fontSize: '13px' }}>
          {detail}
        </p>
      ) : null}
    </div>
  )
}

export default async function AdminPage() {
  const { data, error } = await getMetrics()

  if (error || !data) {
    return (
      <main>
        <span className="section-label">Admin</span>
        <h1 className="text-h2-mobile md:text-h2 text-text-primary mb-4">Metrics unavailable</h1>
        <p className="text-text-secondary max-w-2xl">
          {error}
        </p>
      </main>
    )
  }

  const x402Events = Object.entries(data.x402.events)

  return (
    <main>
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between mb-8">
        <div>
          <span className="section-label">Admin</span>
          <h1 className="text-h2-mobile md:text-h2 text-text-primary">API Metrics</h1>
        </div>
        <p className="text-text-muted" style={{ fontSize: '13px' }}>
          Updated {new Date(data.generatedAt).toLocaleString('en-US', { timeZone: 'UTC' })} UTC
        </p>
      </div>

      <section className="grid md:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Requests"
          value={formatNumber(data.requests.total)}
          detail={`Uptime ${formatDuration(data.uptimeSeconds)}`}
        />
        <StatCard
          label="Errors"
          value={formatNumber(data.requests.errors)}
          detail={`${formatPercent(data.requests.errorRate)} error rate`}
        />
        <StatCard
          label="Latency p95"
          value={`${data.requests.latencyMs.p95}ms`}
          detail={`p50 ${data.requests.latencyMs.p50}ms`}
        />
        <StatCard
          label="Clients"
          value={formatNumber(data.clients.unique)}
          detail="Hashed, privacy-safe"
        />
      </section>

      <section className="grid lg:grid-cols-[1.4fr_0.8fr] gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h2 className="text-h3 text-text-primary" style={{ fontWeight: 500 }}>Endpoints</h2>
            <span className="text-text-muted" style={{ fontSize: '12px' }}>status / p95</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse" style={{ fontSize: '13px' }}>
              <thead>
                <tr className="text-text-muted">
                  <th className="text-left py-2 pr-4">Endpoint</th>
                  <th className="text-right py-2 px-4">Requests</th>
                  <th className="text-right py-2 px-4">Errors</th>
                  <th className="text-right py-2 pl-4">p95</th>
                </tr>
              </thead>
              <tbody>
                {data.endpoints.slice(0, 10).map((endpoint) => (
                  <tr key={endpoint.endpoint} className="border-t border-border-subtle">
                    <td className="py-3 pr-4 text-text-primary">{endpoint.endpoint}</td>
                    <td className="py-3 px-4 text-right">{formatNumber(endpoint.requests)}</td>
                    <td className="py-3 px-4 text-right">{formatNumber(endpoint.errors)}</td>
                    <td className="py-3 pl-4 text-right">{endpoint.latencyMs.p95}ms</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <h2 className="text-h3 text-text-primary mb-4" style={{ fontWeight: 500 }}>x402 Funnel</h2>
          <div className="space-y-3">
            {x402Events.map(([event, count]) => (
              <div key={event} className="flex items-center justify-between gap-4">
                <span className="text-text-secondary" style={{ fontSize: '13px' }}>{event}</span>
                <code>{formatNumber(count)}</code>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-3 gap-6">
        <div className="card">
          <h2 className="text-h3 text-text-primary mb-4" style={{ fontWeight: 500 }}>Origins</h2>
          <div className="space-y-3">
            {data.origins.slice(0, 8).map((origin) => (
              <div key={origin.key} className="flex items-center justify-between gap-4">
                <span className="truncate" style={{ fontSize: '13px' }}>{origin.key}</span>
                <span className="text-text-primary">{formatNumber(origin.count)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-h3 text-text-primary mb-4" style={{ fontWeight: 500 }}>User Agents</h2>
          <div className="space-y-3">
            {data.userAgents.map((agent) => (
              <div key={agent.key} className="flex items-center justify-between gap-4">
                <span style={{ fontSize: '13px' }}>{agent.key}</span>
                <span className="text-text-primary">{formatNumber(agent.count)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-h3 text-text-primary mb-4" style={{ fontWeight: 500 }}>Recent</h2>
          <div className="space-y-3">
            {data.recentRequests.slice(0, 6).map((request) => (
              <div key={`${request.at}-${request.clientHash}-${request.endpoint}`}>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-text-primary" style={{ fontSize: '13px' }}>{request.endpoint}</span>
                  <span style={{ fontSize: '12px', color: request.status >= 400 ? '#F87171' : 'var(--color-text-muted)' }}>
                    {request.status}
                  </span>
                </div>
                <p className="text-text-muted" style={{ fontSize: '12px' }}>
                  {request.latencyMs.toFixed(0)}ms · {request.userAgentClass} · {request.clientHash}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
