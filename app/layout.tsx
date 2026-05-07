import type { Metadata } from 'next'
import './globals.css'
import { CSPostHogProvider } from './providers'

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-aguirre-alexis.vercel.app'),
  title: 'Alexis Aguirre — AI Agentic Developer',
  description: 'AI agentic developer building autonomous systems, SaaS products and browser experiences. 5+ years shipping TypeScript. Based in Argentina. Available for remote work.',
  keywords: ['AI agentic developer', 'autonomous agents', 'React', 'Next.js', 'TypeScript', 'Claude API', 'Supabase'],
  openGraph: {
    title: 'Alexis Aguirre — AI Agentic Developer',
    description: 'AI agentic developer building autonomous systems, SaaS products and browser experiences.',
    url: 'https://portfolio-aguirre-alexis.vercel.app',
    siteName: 'Alexis Aguirre',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alexis Aguirre — AI Agentic Developer',
    description: 'AI agentic developer building autonomous systems, SaaS products and browser experiences.',
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
