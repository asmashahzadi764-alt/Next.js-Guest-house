import './globals.css'
import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
const head = Playfair_Display({ subsets: ['latin'], variable: '--f-head' })
const body = DM_Sans({ subsets: ['latin'], variable: '--f-body' })
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Sundus Guest House Skardu | Rooms, Restaurant & Mountain Stay',
  description: 'Family-friendly guest house in Skardu, Gilgit-Baltistan with a restaurant, parking and WiFi, close to Chunda and Soq valleys.',
  openGraph: { title: 'Sundus Guest House Skardu', description: 'Stay in Skardu with comfort, food and mountain views nearby.', type: 'website', images: ['/images/hero.jpg'] },
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${head.variable} ${body.variable}`}><body>{children}</body></html>
}
