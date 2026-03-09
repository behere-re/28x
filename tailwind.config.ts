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
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
      },
      colors: {
        bg: '#F8F6F1',
        primary: '#1A1A1A',
        secondary: '#6B6B6B',
        accent: {
          DEFAULT: '#0D9B82',
          hover: '#0A7D6A',
        },
        border: '#E2DDD6',
        card: '#FFFFFF',
      },
      fontSize: {
        'h1': ['3.25rem', { lineHeight: '1.15', fontWeight: '600' }],
        'h1-mobile': ['2.25rem', { lineHeight: '1.15', fontWeight: '600' }],
        'h2': ['2.25rem', { lineHeight: '1.2', fontWeight: '400' }],
        'h2-mobile': ['1.75rem', { lineHeight: '1.2', fontWeight: '400' }],
        'h3': ['1.375rem', { lineHeight: '1.3', fontWeight: '400' }],
        'body': ['1.0625rem', { lineHeight: '1.75', fontWeight: '400' }],
        'label': ['0.8125rem', { lineHeight: '1.4', fontWeight: '500', letterSpacing: '0.08em' }],
        'section-label': ['0.75rem', { lineHeight: '1.4', fontWeight: '500', letterSpacing: '0.12em' }],
      },
      maxWidth: {
        'content': '720px',
        'nav': '960px',
        'paragraph': '640px',
      },
      spacing: {
        'section': '96px',
      },
    },
  },
  plugins: [],
}
export default config
