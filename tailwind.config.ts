import type { Config } from 'tailwindcss'
export default { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: { colors: { gold: '#B8941F', ink: '#111113', sand: '#F6F3EC' }, fontFamily: { head: ['var(--f-head)'], body: ['var(--f-body)'] } } }, plugins: [] } satisfies Config
