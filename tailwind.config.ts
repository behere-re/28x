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
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: '#1a1a1a',
            fontSize: '1.125rem',
            lineHeight: '1.75',
            '--tw-prose-headings': '#0a0a0a',
            '--tw-prose-links': '#0066cc',
            '--tw-prose-bold': '#0a0a0a',
            '--tw-prose-code': '#0a0a0a',
            '--tw-prose-pre-code': '#e5e5e5',
            '--tw-prose-pre-bg': '#1a1a1a',
            '--tw-prose-quotes': '#1a1a1a',
          },
        },
      },
    },
  },
  plugins: [],
}
export default config

