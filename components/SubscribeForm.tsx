import { useState } from 'react'

type SubscribeFormProps = {
  variant?: 'default' | 'compact'
}

export default function SubscribeForm({ variant = 'default' }: SubscribeFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!email || status === 'submitting') return

    setStatus('submitting')
    setMessage(null)

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) {
        throw new Error('Subscription failed')
      }

      setStatus('success')
      setMessage('Subscribed. Watch your inbox as 28x unfolds.')
      setEmail('')
    } catch (err) {
      setStatus('error')
      setMessage('Something went wrong. Please try again in a moment.')
    }
  }

  const isSubmitting = status === 'submitting'

  return (
    <section className="border border-border bg-bg-surface/80 backdrop-blur rounded-2xl px-6 py-6 md:px-8 md:py-7 shadow-[0_18px_60px_rgba(0,0,0,0.3)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h2 className="text-base md:text-lg font-semibold tracking-tight">
            Stay in sync with 28x
          </h2>
          <p className="text-sm text-text-muted max-w-xl">
            Get brief updates on the standard, AFN drops, and tools for humans and agents. No spam, just time.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-full md:w-auto flex flex-col gap-2 md:flex-row md:items-center">
          <div className="flex-1 min-w-[220px]">
            <label className="sr-only" htmlFor="subscribe-email">
              Email
            </label>
            <input
              id="subscribe-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain or agent://endpoint"
              className="w-full rounded-full border border-border bg-bg-elevated px-4 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-purple-light/70 focus-visible:border-purple-light transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-full bg-purple-light px-5 py-2.5 text-sm font-medium text-bg-surface whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed hover:bg-purple-400 transition-colors"
          >
            {isSubmitting ? 'Subscribing…' : 'Subscribe'}
          </button>
        </form>
      </div>
      {message && (
        <p
          className={`mt-3 text-xs ${
            status === 'error' ? 'text-red-400' : 'text-text-muted'
          }`}
        >
          {message}
        </p>
      )}
    </section>
  )

