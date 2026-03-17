import type { Metadata } from 'next'
import './globals.css'
import { CSPostHogProvider } from './providers'

export const metadata: Metadata = {
  title: 'Alexis Aguirre — AI Frontend Engineer',
  description: 'Frontend engineer building AI agents, SaaS products and browser experiences. 5+ years shipping production software. Based in Córdoba, Argentina. Available for remote work.',
  keywords: ['frontend engineer', 'AI agents', 'React', 'Next.js', 'TypeScript', 'Claude API', 'Supabase'],
  openGraph: {
    title: 'Alexis Aguirre — AI Frontend Engineer',
    description: 'Frontend engineer building AI agents, SaaS products and browser experiences.',
    url: 'https://ale-aguirre.vercel.app',
    siteName: 'Alexis Aguirre',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alexis Aguirre — AI Frontend Engineer',
    description: 'Frontend engineer building AI agents, SaaS products and browser experiences.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CSPostHogProvider>
          {children}
        </CSPostHogProvider>
      </body>
    </html>
  )
}
