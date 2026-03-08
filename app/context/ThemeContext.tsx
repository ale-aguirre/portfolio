'use client'
import { createContext, useContext, useState, useEffect } from 'react'

export type ThemeMode = 'gaming' | 'ai' | 'developer'

export const modeOrder: ThemeMode[] = ['ai', 'developer', 'gaming']

export const themeConfig: Record<ThemeMode, {
  label: string
  tagline: string
  description: string
  accent: string
  accentRgb: string
  bg: string
  bgCard: string
  bgHover: string
  text: string
  textMuted: string
  textGhost: string
  border: string
  tags: string[]
  fontDisplay: string
  fontBody: string
}> = {
  ai: {
    label: 'AI & Agents',
    tagline: 'Automation, LLMs and intelligent systems',
    description: 'LLM pipelines, autonomous agents, RAG systems and AI-powered SaaS products.',
    accent: '#9e7adf',
    accentRgb: '158,122,223',
    bg: '#0d0d16',
    bgCard: '#131322',
    bgHover: '#1a1a2e',
    text: '#ffffff',
    textMuted: '#a8a5c8',
    textGhost: '#4a4870',
    border: '#2a2848',
    tags: ['Claude API', 'OpenAI', 'Groq', 'LanceDB'],
    fontDisplay: "'Space Mono', monospace",
    fontBody: "'DM Sans', sans-serif",
  },
  developer: {
    label: 'Developer',
    tagline: 'Web platforms & production apps',
    description: 'E-commerce, SaaS tools, internal systems and everything that ships to real users.',
    accent: '#5a9e6a',
    accentRgb: '90,158,106',
    bg: '#0a100b',
    bgCard: '#111814',
    bgHover: '#182119',
    text: '#ffffff',
    textMuted: '#8ab898',
    textGhost: '#2a3a2e',
    border: '#1e2d22',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Vercel'],
    fontDisplay: "'Space Grotesk', sans-serif",
    fontBody: "'Space Grotesk', sans-serif",
  },
  gaming: {
    label: 'Gaming',
    tagline: 'New domain — started March 2026',
    description: 'Just entered the gaming space. Building multiplayer browser experiences with AI at the core.',
    accent: '#e07a3f',
    accentRgb: '224,122,63',
    bg: '#0f0c09',
    bgCard: '#181310',
    bgHover: '#1e1a14',
    text: '#ffffff',
    textMuted: '#c4b8a8',
    textGhost: '#4a4030',
    border: '#2a2318',
    tags: ['Next.js', 'Three.js', 'Supabase', 'Stripe'],
    fontDisplay: "'Bebas Neue', sans-serif",
    fontBody: "'DM Sans', sans-serif",
  },
}

const ThemeContext = createContext<{
  mode: ThemeMode
  setMode: (m: ThemeMode) => void
  cfg: typeof themeConfig['ai']
}>({
  mode: 'ai',
  setMode: () => {},
  cfg: themeConfig.ai,
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('ai')
  const cfg = themeConfig[mode]

  useEffect(() => {
    const r = document.documentElement
    r.style.setProperty('--bg', cfg.bg)
    r.style.setProperty('--bg-card', cfg.bgCard)
    r.style.setProperty('--bg-hover', cfg.bgHover)
    r.style.setProperty('--text', cfg.text)
    r.style.setProperty('--text-muted', cfg.textMuted)
    r.style.setProperty('--text-ghost', cfg.textGhost)
    r.style.setProperty('--accent', cfg.accent)
    r.style.setProperty('--border', cfg.border)
    r.style.setProperty('--accent-rgb', cfg.accentRgb)
    r.style.setProperty('--font-display', cfg.fontDisplay)
    r.style.setProperty('--font-body', cfg.fontBody)
  }, [mode, cfg])

  return (
    <ThemeContext.Provider value={{ mode, setMode, cfg }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
