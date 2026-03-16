'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { usePostHog } from 'posthog-js/react'

type Tag = 'AI Agent' | 'SaaS' | 'Browser Game' | 'Image Pipeline' | 'Dashboard'

const TAG_COLORS: Record<Tag, string> = {
  'AI Agent':       '#00d9ff',
  'SaaS':           '#a855f7',
  'Browser Game':   '#f59e0b',
  'Image Pipeline': '#ec4899',
  'Dashboard':      '#22c55e',
}

type Project = {
  id: string
  name: string
  tag: Tag
  desc: string
  detail: string
  stack: string[]
  url?: string
  repo?: string
  year: string
  status: 'production' | 'active dev' | 'beta'
}

const projects: Project[] = [
  {
    id: 'cortex',
    name: 'CORTEX',
    tag: 'Dashboard',
    desc: 'AI agent orchestration hub. Classifies intents via Groq, routes to 147 agency agents, streams responses via SSE.',
    detail: 'SQLite WAL pipeline · 14 DB tables · 6 active scheduler jobs · Next.js 16 + TypeScript',
    stack: ['Next.js 16', 'TypeScript', 'Groq', 'SQLite', 'SSE', 'Tailwind'],
    year: '2025',
    status: 'active dev',
  },
  {
    id: 'job-hunter',
    name: 'job-hunter',
    tag: 'AI Agent',
    desc: 'Autonomous job application agent. Discovers listings, fills forms, runs QA — fully headless with Playwright + Chrome CDP.',
    detail: 'daemon → scout → apply → Nanami QA. Claude Haiku for form inference. 74 → 32 relevant listings via LLM filter.',
    stack: ['Node.js', 'Playwright', 'Claude Haiku', 'Chrome CDP', 'Supabase'],
    year: '2025',
    status: 'active dev',
  },
  {
    id: 'forgix',
    name: 'Forgix',
    tag: 'Browser Game',
    desc: 'Browser-based strategy game with AI-driven NPC dialogs and real-time physics. Vertical slice: Operator League.',
    detail: 'React Three Fiber + Rapier physics · Groq SDK for in-game dialogs · Supabase realtime matchmaking',
    stack: ['Next.js 14', 'Three.js', 'React Three Fiber', 'Groq SDK', 'Supabase', 'Zustand'],
    url: 'https://forgix.vercel.app',
    year: '2024',
    status: 'active dev',
  },
  {
    id: 'ladymanager',
    name: 'LadyManager',
    tag: 'Image Pipeline',
    desc: 'Anime image generation pipeline. LLM prompt engineering → RunPod Forge serverless → Stable Diffusion XL.',
    detail: 'WAI-Illustrious-SDXL · ADetailer face inpainting · LoRA training on kohya_ss · RunPod endpoint management',
    stack: ['Next.js 14', 'FastAPI', 'RunPod', 'Stable Diffusion XL', 'Python'],
    year: '2024',
    status: 'production',
  },
  {
    id: 'skuscribe',
    name: 'SKUscribe',
    tag: 'SaaS',
    desc: 'AI-powered Amazon listing generator. Turns raw product data into SEO-optimized titles, bullets and descriptions.',
    detail: 'Amazon SP-API integration · Claude API for copy generation · Stripe subscriptions · Vercel deploy',
    stack: ['Next.js', 'TypeScript', 'Claude API', 'Amazon SP-API', 'Stripe', 'Supabase'],
    year: '2024',
    status: 'beta',
  },
  {
    id: 'nuggets-core',
    name: 'nuggets-core',
    tag: 'AI Agent',
    desc: 'Core AI business logic layer. Semantic memory with LanceDB, Telegram bot interface, multi-agent task routing.',
    detail: 'LanceDB vector store · OpenRouter multi-model · nomic-embed-text embeddings · Node.js runtime',
    stack: ['Node.js', 'LanceDB', 'OpenRouter', 'Telegram Bot API', 'TypeScript'],
    year: '2025',
    status: 'active dev',
  },
]

const STATUS_COLORS = {
  'production':  { bg: 'rgba(34,197,94,0.1)', text: '#22c55e', dot: '#22c55e' },
  'active dev':  { bg: 'rgba(0,217,255,0.08)', text: 'var(--accent)', dot: 'var(--accent)' },
  'beta':        { bg: 'rgba(245,158,11,0.1)', text: '#f59e0b', dot: '#f59e0b' },
}

function ProjectCard({ p, index, inView }: { p: Project; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false)
  const posthog = usePostHog()
  const tagColor = TAG_COLORS[p.tag]
  const statusStyle = STATUS_COLORS[p.status]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? tagColor + '35' : 'var(--border)'}`,
        borderRadius: '6px',
        padding: '1.5rem',
        background: hovered ? tagColor + '06' : 'var(--bg-card)',
        transition: 'all 0.25s',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: tagColor,
        opacity: hovered ? 0.9 : 0.4,
        transition: 'opacity 0.25s',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1rem',
            fontWeight: 500,
            color: hovered ? tagColor : 'var(--text)',
            transition: 'color 0.2s',
          }}>
            {p.name}
          </span>
          {/* Tag */}
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
            padding: '0.12rem 0.55rem',
            border: `1px solid ${tagColor}30`,
            borderRadius: '2px',
            fontSize: '0.58rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: tagColor,
            fontFamily: 'var(--font-mono)',
            background: tagColor + '10',
            width: 'fit-content',
          }}>
            {p.tag}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Status badge */}
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
            padding: '0.2rem 0.55rem',
            borderRadius: '20px',
            fontSize: '0.58rem',
            letterSpacing: '0.06em',
            color: statusStyle.text,
            background: statusStyle.bg,
            fontFamily: 'var(--font-mono)',
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: statusStyle.dot, flexShrink: 0 }} />
            {p.status}
          </span>

          {/* Arrow */}
          {(p.url || p.repo) && (
            <a
              href={p.url ?? p.repo}
              target="_blank" rel="noopener noreferrer"
              onClick={() => posthog?.capture('view_project', { project: p.id })}
              style={{
                color: hovered ? tagColor : 'var(--text-ghost)',
                textDecoration: 'none',
                transition: 'color 0.2s, transform 0.2s',
                transform: hovered ? 'rotate(-45deg)' : 'none',
                display: 'flex', flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.85rem',
        color: 'var(--text-muted)',
        lineHeight: 1.65,
      }}>
        {p.desc}
      </p>

      {/* Detail — monospace technical line */}
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.68rem',
        color: 'var(--text-ghost)',
        lineHeight: 1.5,
        borderLeft: `2px solid ${tagColor}30`,
        paddingLeft: '0.65rem',
      }}>
        {p.detail}
      </p>

      {/* Stack */}
      <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: 'auto' }}>
        {p.stack.map(t => (
          <span key={t} style={{
            fontSize: '0.6rem',
            padding: '0.15rem 0.5rem',
            borderRadius: '2px',
            border: '1px solid var(--border)',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            background: 'transparent',
          }}>
            {t}
          </span>
        ))}
        <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-ghost)' }}>
          {p.year}
        </span>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="projects" style={{
      padding: 'clamp(4rem,8vw,7rem) clamp(1.5rem,6vw,5rem)',
      borderTop: '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '3rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
              letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)',
            }}>
              Selected work
            </span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
              color: 'var(--text-ghost)', letterSpacing: '0.06em',
            }}>
              {projects.length} projects
            </span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-head)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 500,
            color: 'var(--text)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}>
            AI projects & agents
          </h2>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1rem',
        }}>
          {projects.map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
