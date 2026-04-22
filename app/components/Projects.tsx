'use client'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { usePostHog } from 'posthog-js/react'
import { useLang } from '../context/LangContext'

type Tag = 'AI Agent' | 'SaaS' | 'Browser Game' | 'Image Pipeline' | 'Dashboard' | 'E-commerce' | 'Landing' | 'Frontend'

const TAG_COLORS: Record<Tag, string> = {
  'AI Agent':       '#00d9ff',
  'SaaS':           '#a855f7',
  'Browser Game':   '#f59e0b',
  'Image Pipeline': '#ec4899',
  'Dashboard':      '#22c55e',
  'E-commerce':     '#f97316',
  'Landing':        '#6366f1',
  'Frontend':       '#e879f9',
}

type Project = {
  id: string
  name: string
  tag: Tag
  stack: string[]
  url?: string
  year: string
  status: 'production' | 'active dev' | 'beta' | 'demo'
  image?: string
  client?: boolean
}

const projects: Project[] = [
  {
    id: 'kitsuflow',
    name: 'Kitsuflow',
    tag: 'SaaS',
    stack: ['Next.js 16', 'TypeScript', 'Supabase', 'Stripe', 'RunPod'],
    url: 'https://kitsuflow.vercel.app',
    year: '2026',
    status: 'active dev',
    image: '/projects/kitsuflow.jpg',
  },
  {
    id: 'calibre',
    name: 'Calibre Studio',
    tag: 'SaaS',
    stack: ['Next.js', 'TypeScript', 'Framer Motion', 'Vercel'],
    url: 'https://thecalibre.studio',
    year: '2025',
    status: 'production',
    image: '/projects/calibre.jpg',
  },
  {
    id: 'docunify',
    name: 'DocUnify',
    tag: 'SaaS',
    stack: ['Next.js', 'TypeScript', 'Railway', 'Python'],
    year: '2025',
    status: 'beta',
    image: '/projects/docunify.jpg',
    client: true,
  },
  {
    id: 'cortex',
    name: 'CORTEX',
    tag: 'Dashboard',
    stack: ['Next.js 16', 'Claude Agent SDK', 'TypeScript', 'Chrome CDP', 'Telegram'],
    year: '2025',
    status: 'active dev',
    image: '/projects/cortex.jpg',
  },
  {
    id: 'total-limpieza',
    name: 'Total Limpieza',
    tag: 'Dashboard',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Vercel'],
    year: '2024',
    status: 'production',
    image: '/projects/total-limpieza.jpg',
    client: true,
  },
  {
    id: 'cadete',
    name: 'CadeteApp',
    tag: 'Dashboard',
    stack: ['Next.js', 'TypeScript', 'Vercel'],
    year: '2025',
    status: 'demo',
    image: '/projects/cadete.jpg',
    client: true,
  },
  {
    id: 'ladymanager',
    name: 'LadyManager',
    tag: 'Image Pipeline',
    stack: ['Next.js 14', 'FastAPI', 'RunPod', 'Stable Diffusion XL', 'Python'],
    year: '2024',
    status: 'production',
    image: '/projects/ladymanager.jpg',
  },
  {
    id: 'job-hunter',
    name: 'job-hunter',
    tag: 'AI Agent',
    stack: ['Node.js', 'Playwright', 'Claude Haiku', 'Chrome CDP', 'Supabase'],
    url: 'https://github.com/ale-aguirre/claude-job-hunter',
    year: '2025',
    status: 'active dev',
    image: '/projects/job-hunter.jpg',
  },
  {
    id: 'nuggets-core',
    name: 'nuggets-core',
    tag: 'AI Agent',
    stack: ['Node.js', 'LanceDB', 'OpenRouter', 'Telegram Bot API', 'TypeScript'],
    year: '2025',
    status: 'active dev',
  },
  {
    id: 'waifu',
    name: 'MyAiko',
    tag: 'AI Agent',
    stack: ['Next.js', 'TypeScript', 'OpenAI', 'Vercel'],
    url: 'https://waifu-assistant.vercel.app',
    year: '2024',
    status: 'demo',
    image: '/projects/waifu.jpg',
  },
  {
    id: 'saku',
    name: 'Sakú Store',
    tag: 'E-commerce',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'MercadoPago'],
    year: '2025',
    status: 'production',
    image: '/projects/saku.jpg',
    client: true,
  },
  {
    id: 'distribuidora',
    name: 'Aguirre Comercial',
    tag: 'E-commerce',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'MercadoPago'],
    year: '2025',
    status: 'production',
    image: '/projects/distribuidora.jpg',
    client: true,
  },
  {
    id: 'gr',
    name: 'GR Servicios',
    tag: 'Landing',
    stack: ['Next.js 14', 'TypeScript', 'Framer Motion', 'Vercel'],
    year: '2026',
    status: 'production',
    image: '/projects/gr.jpg',
    client: true,
  },
  {
    id: 'portfolio',
    name: 'Este portfolio',
    tag: 'Frontend',
    stack: ['Next.js 16', 'TypeScript', 'Framer Motion', 'PostHog', 'Playwright'],
    url: 'https://portfolio-aguirre-alexis.vercel.app',
    year: '2026',
    status: 'production',
    image: '/projects/portfolio.jpg',
  },
  {
    id: 'forgix',
    name: 'Forgix',
    tag: 'Browser Game',
    stack: ['Next.js 14', 'Three.js', 'React Three Fiber', 'Groq SDK', 'Supabase'],
    url: 'https://www.forgix.xyz/',
    year: '2024',
    status: 'active dev',
    image: '/projects/forgix.jpg',
  },
  {
    id: 'kage',
    name: 'Kage Legacy',
    tag: 'Browser Game',
    stack: ['Next.js', 'Gemini AI', 'Supabase', 'TypeScript'],
    url: 'https://kage-legacy.vercel.app',
    year: '2024',
    status: 'demo',
    image: '/projects/kage.jpg',
  },
]

const STATUS_COLORS = {
  'production': { bg: 'rgba(34,197,94,0.1)',   text: '#22c55e',      dot: '#22c55e' },
  'active dev': { bg: 'rgba(0,217,255,0.08)',   text: 'var(--accent)', dot: 'var(--accent)' },
  'beta':       { bg: 'rgba(245,158,11,0.1)',   text: '#f59e0b',      dot: '#f59e0b' },
  'demo':       { bg: 'rgba(99,102,241,0.1)',   text: '#6366f1',      dot: '#6366f1' },
}

const ALL_TAGS = Array.from(new Set(projects.map(p => p.tag))) as Tag[]

function ProjectCard({ p, index, inView }: { p: Project; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false)
  const posthog = usePostHog()
  const { t } = useLang()
  const tagColor = TAG_COLORS[p.tag]
  const statusStyle = STATUS_COLORS[p.status]
  const tr = t.projects.items[p.id as keyof typeof t.projects.items]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? tagColor + '40' : 'var(--border)'}`,
        borderRadius: '6px',
        background: hovered ? tagColor + '06' : 'var(--bg-card)',
        transition: 'border-color 0.25s, background 0.25s',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Screenshot — always reserves space, only opacity changes to avoid layout shift */}
      {p.image && (
        <div style={{
          height: '150px',
          overflow: 'hidden',
          flexShrink: 0,
          position: 'relative',
        }}>
          <img
            src={p.image}
            alt={p.name}
            style={{
              width: '100%',
              height: '150px',
              objectFit: 'cover',
              objectPosition: 'top',
              display: 'block',
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '60px',
            background: 'linear-gradient(to bottom, transparent, var(--bg-card))',
          }} />
        </div>
      )}

      <div style={{ padding: '1.4rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
        {/* Top accent */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: tagColor, opacity: hovered ? 0.9 : 0.35,
          transition: 'opacity 0.25s',
        }} />

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 500,
              color: hovered ? tagColor : 'var(--text)', transition: 'color 0.2s',
            }}>
              {p.name}
            </span>
            <span style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '0.1rem 0.5rem',
              border: `1px solid ${tagColor}30`,
              borderRadius: '2px',
              fontSize: '0.57rem', letterSpacing: '0.08em', textTransform: 'uppercase',
              color: tagColor, fontFamily: 'var(--font-mono)',
              background: tagColor + '10', width: 'fit-content',
            }}>
              {p.tag}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexShrink: 0 }}>
            {p.client && (
              <span style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '0.18rem 0.5rem', borderRadius: '20px',
                fontSize: '0.57rem', letterSpacing: '0.06em', textTransform: 'uppercase',
                color: 'var(--text-ghost)', background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--border)',
                fontFamily: 'var(--font-mono)',
              }}
              title="Client project — demo data, real deployment in production"
              >
                client
              </span>
            )}
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
              padding: '0.18rem 0.5rem', borderRadius: '20px',
              fontSize: '0.57rem', letterSpacing: '0.06em',
              color: statusStyle.text, background: statusStyle.bg,
              fontFamily: 'var(--font-mono)',
            }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: statusStyle.dot, flexShrink: 0 }} />
              {p.status}
            </span>
            {p.url && (
              <a
                href={p.url} target="_blank" rel="noopener noreferrer"
                onClick={() => posthog?.capture('view_project', { project: p.id })}
                style={{
                  color: hovered ? tagColor : 'var(--text-ghost)',
                  textDecoration: 'none',
                  transition: 'color 0.2s, transform 0.2s',
                  transform: hovered ? 'rotate(-45deg)' : 'none',
                  display: 'flex', flexShrink: 0,
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                </svg>
              </a>
            )}
          </div>
        </div>

        {tr && (
          <>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.83rem', color: 'var(--text)', lineHeight: 1.65, fontWeight: 300 }}>
              {tr.desc}
            </p>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--text-muted)',
              lineHeight: 1.5, borderLeft: `2px solid ${tagColor}30`, paddingLeft: '0.6rem',
            }}>
              {tr.detail}
            </p>
          </>
        )}

        <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginTop: 'auto', paddingTop: '0.25rem' }}>
          {p.stack.map(s => (
            <span key={s} style={{
              fontSize: '0.58rem', padding: '0.12rem 0.45rem', borderRadius: '2px',
              border: '1px solid var(--border)', color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)', background: 'transparent',
            }}>{s}</span>
          ))}
          <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-ghost)' }}>
            {p.year}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { t } = useLang()
  const [activeTag, setActiveTag] = useState<Tag | null>(null)

  const filtered = activeTag ? projects.filter(p => p.tag === activeTag) : projects

  return (
    <section id="projects" style={{
      padding: 'clamp(4rem,8vw,7rem) clamp(1.5rem,6vw,5rem)',
      borderTop: '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '2rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
              letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)',
            }}>
              {t.projects.sectionLabel}
            </span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-ghost)' }}>
              {filtered.length} {t.projects.countSuffix}
            </span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-head)', fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 500, color: 'var(--text)', lineHeight: 1.1, letterSpacing: '-0.02em',
          }}>
            {t.projects.sectionTitle}
          </h2>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.15 }}
          style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}
        >
          {/* All */}
          <button
            onClick={() => setActiveTag(null)}
            style={{
              padding: '0.3rem 0.85rem',
              borderRadius: '3px',
              border: `1px solid ${activeTag === null ? 'var(--accent)' : 'var(--border)'}`,
              background: activeTag === null ? 'rgba(0,217,255,0.1)' : 'transparent',
              color: activeTag === null ? 'var(--accent)' : 'var(--text-muted)',
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
              letterSpacing: '0.06em', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            {t.projects.filterAll}
          </button>

          {ALL_TAGS.map(tag => {
            const color = TAG_COLORS[tag]
            const active = activeTag === tag
            return (
              <button
                key={tag}
                onClick={() => setActiveTag(active ? null : tag)}
                style={{
                  padding: '0.3rem 0.85rem',
                  borderRadius: '3px',
                  border: `1px solid ${active ? color + '80' : 'var(--border)'}`,
                  background: active ? color + '15' : 'transparent',
                  color: active ? color : 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                {tag}
              </button>
            )
          })}
        </motion.div>

        {/* Grid */}
        <motion.div layout style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
          gap: '1rem',
        }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} p={p} index={i} inView={inView} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
