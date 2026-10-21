import type { Config } from 'tailwindcss'
export default { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: { colors: { clay: '#9A6434', gold: '#D4A15A', navy: '#10263F', ink: '#0A1A2D', sand: '#FBF7F0' }, fontFamily: { head: ['var(--f-head)'], body: ['var(--f-body)'] } } }, plugins: [] } satisfies Config
