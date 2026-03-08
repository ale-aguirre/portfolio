import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from './context/ThemeContext'

export const metadata: Metadata = {
  title: 'Alexis Aguirre — Frontend Engineer',
  description: 'React & Next.js developer building production SaaS and AI products. Based in Córdoba, Argentina. Available for remote work.',
  openGraph: {
    title: 'Alexis Aguirre — Frontend Engineer',
    description: 'React & Next.js developer building production SaaS and AI products.',
    url: 'https://ale-aguirre.vercel.app',
    siteName: 'Alexis Aguirre',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body><ThemeProvider>{children}</ThemeProvider></body>
    </html>
  )
}
