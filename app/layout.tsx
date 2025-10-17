import type { Metadata, Viewport } from 'next'
import './globals.css'
import RegisterServiceWorker from './register-sw'
import Analytics from './components/Analytics'

export const metadata: Metadata = {
  title: 'Motiva - Daily Motivation in Arabic & English',
  description: 'Get inspired with beautiful motivational quotes in Arabic and English. Share, favorite, and discover wisdom daily. 2000+ quotes across 5 categories.',
  keywords: 'motivation, quotes, inspiration, Arabic, English, daily quotes, wisdom, Motiva, motivational quotes, inspirational quotes, daily motivation',
  authors: [{ name: 'Motiva' }],
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://motiva.obl.ee',
    siteName: 'Motiva',
    title: 'Motiva - Daily Motivation in Arabic & English',
    description: 'Get inspired with 2000+ beautiful motivational quotes in Arabic and English. Your daily dose of wisdom and inspiration.',
    images: [
      {
        url: 'https://motiva.obl.ee/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Motiva - Daily Motivation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Motiva - Daily Motivation',
    description: 'Get inspired with beautiful motivational quotes in Arabic & English',
    images: ['https://motiva.obl.ee/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#29524a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <RegisterServiceWorker />
        <Analytics />
        {children}
      </body>
    </html>
  )
}

