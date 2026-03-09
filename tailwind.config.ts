import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
      },
      colors: {
        bg: {
          deep: '#05050F',
          surface: '#0F0F1A',
          card: '#16162A',
          'card-hover': '#1E1E35',
        },
        border: {
          DEFAULT: '#2A2A45',
          subtle: '#1A1A30',
        },
        text: {
          primary: '#F0EEF8',
          secondary: '#9B96B8',
          muted: '#5C5875',
        },
        purple: {
          DEFAULT: '#8B6FFF',
          light: '#A992FF',
          dim: '#4A3A8A',
        },
      },
      fontSize: {
        'h1': ['3.5rem', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' }],
        'h1-mobile': ['2.375rem', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' }],
        'h2': ['2.375rem', { lineHeight: '1.2', fontWeight: '600', letterSpacing: '-0.015em' }],
        'h2-mobile': ['1.75rem', { lineHeight: '1.2', fontWeight: '600', letterSpacing: '-0.015em' }],
        'h3': ['1.375rem', { lineHeight: '1.3', fontWeight: '500' }],
        'body': ['1.0625rem', { lineHeight: '1.75', fontWeight: '400' }],
        'label': ['0.8125rem', { lineHeight: '1.4', fontWeight: '500', letterSpacing: '0.08em' }],
        'section-label': ['0.6875rem', { lineHeight: '1.4', fontWeight: '500', letterSpacing: '0.15em' }],
      },
      maxWidth: {
        content: '760px',
        nav: '1100px',
      },
      spacing: {
        section: '96px',
      },
    },
  },
  plugins: [],
}
export default config
