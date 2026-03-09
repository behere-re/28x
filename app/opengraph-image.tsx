import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = '28x — An Open Temporal Standard'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          fontSize: 64,
          fontWeight: 300,
          letterSpacing: '-0.02em',
          color: '#111827',
          padding: 80,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 72,
            marginBottom: 20,
            letterSpacing: '-0.05em',
          }}
        >
          28x
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 32,
            color: '#6b7280',
            textAlign: 'center',
            maxWidth: 800,
            lineHeight: 1.4,
            marginTop: 20,
          }}
        >
          An Open Temporal Standard
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 20,
            color: '#9ca3af',
            marginTop: 40,
            textAlign: 'center',
            maxWidth: 900,
            lineHeight: 1.5,
          }}
        >
          A regular, lunar-aligned calendar system for the age of intelligent systems
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

