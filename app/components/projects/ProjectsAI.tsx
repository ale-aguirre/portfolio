'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const projects = [
  {
    id: 'skuscribe',
    name: 'SKUSCRIBE',
    path: 'skuscribe.com',
    url: 'https://skuscribe.com',
    status: 'LIVE',
    role: 'AI listing generator — SaaS',
    desc: 'Generates optimized product listings for Amazon and Etsy sellers using AI. Production users, subscription model, automated LLM pipelines.',
    stack: ['Next.js', 'OpenAI', 'Stripe', 'Supabase'],
    year: '2024',
    metric: 'Production · Subscription model',
  },
  {
    id: 'calibre',
    name: 'CALIBRE STUDIO',
    path: 'thecalibre.studio',
    url: 'https://thecalibre.studio',
    status: 'LIVE',
    role: 'Premium editorial landing page',
    desc: 'High-end landing page with internationalization (i18n), smooth AI-assisted design system, and refined editorial aesthetics.',
    stack: ['Next.js', 'Framer Motion', 'i18n', 'Tailwind'],
    year: '2023',
    metric: 'Production · International',
  },
]

function TypingText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let i = 0
    const t = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1))
        i++
        if (i >= text.length) clearInterval(interval)
      }, 18)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(t)
  }, [inView, text, delay])

  return <span ref={ref}>{displayed}<span style={{ opacity: 0.5, animation: 'blink 1s step-end infinite' }}>_</span></span>
}

export default function ProjectsAI() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div>
      {/* Terminal header */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: '2.5rem' }}
      >
        {/* Window bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.6rem 1rem',
          background: 'rgba(158,122,223,0.08)',
          border: '1px solid rgba(158,122,223,0.2)',
          borderBottom: 'none',
          borderRadius: '4px 4px 0 0',
        }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#28c840' }} />
          <span style={{ marginLeft: '0.5rem', fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'rgba(158,122,223,0.6)' }}>
            agent_registry — bash
          </span>
        </div>
        <div style={{
          padding: '1.25rem 1.25rem 1.5rem',
          background: 'rgba(158,122,223,0.04)',
          border: '1px solid rgba(158,122,223,0.2)',
          borderRadius: '0 0 4px 4px',
          fontFamily: 'monospace',
          fontSize: '0.82rem',
          lineHeight: 2,
        }}>
          <div style={{ color: 'rgba(158,122,223,0.5)' }}>$ agent_registry --list --status=production</div>
          <div style={{ color: '#9e7adf' }}>
            <TypingText text="→ Fetching deployed agents..." delay={300} />
          </div>
          <div style={{ color: 'rgba(226,229,248,0.5)', marginTop: '0.25rem' }}>
            Found <span style={{ color: '#9e7adf' }}>1 production agent</span> · 1 in development
          </div>
        </div>
      </motion.div>

      {/* Project cards — agent style */}
      {projects.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.15 + 0.4 }}
          onMouseEnter={() => setHovered(p.id)}
          onMouseLeave={() => setHovered(null)}
          style={{
            border: `1px solid ${hovered === p.id ? 'rgba(158,122,223,0.5)' : 'rgba(158,122,223,0.15)'}`,
            borderLeft: `3px solid ${hovered === p.id ? '#9e7adf' : 'rgba(158,122,223,0.3)'}`,
            borderRadius: '4px',
            padding: '1.5rem',
            marginBottom: '1rem',
            background: hovered === p.id ? 'rgba(158,122,223,0.06)' : 'transparent',
            transition: 'all 0.3s',
          }}
        >
          <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.3rem' }}>
                  <span style={{
                    fontFamily: 'monospace',
                    fontSize: '1.1rem',
                    color: hovered === p.id ? '#9e7adf' : 'var(--text)',
                    letterSpacing: '0.05em',
                    transition: 'color 0.2s',
                  }}>{p.name}</span>
                  <span style={{
                    padding: '0.15rem 0.5rem',
                    border: '1px solid #28c840',
                    borderRadius: '2px',
                    fontSize: '0.55rem',
                    letterSpacing: '0.14em',
                    color: '#28c840',
                    fontFamily: 'var(--font-body)',
                    background: 'rgba(40,200,64,0.08)',
                  }}>{p.status}</span>
                </div>
                <div style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: 'rgba(158,122,223,0.5)' }}>
                  → {p.path}
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.06em', flexShrink: 0 }}>
                {p.year}
              </div>
            </div>

            {/* Metric bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 0.75rem',
              background: 'rgba(158,122,223,0.06)',
              borderRadius: '2px',
              marginBottom: '1rem',
              fontFamily: 'monospace',
              fontSize: '0.68rem',
              color: 'rgba(158,122,223,0.7)',
            }}>
              <span style={{ color: '#9e7adf' }}>●</span>
              {p.metric}
            </div>

            {/* Description */}
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.88rem',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              marginBottom: '1rem',
            }}>{p.desc}</p>

            {/* Stack */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {p.stack.map(t => (
                <span key={t} style={{
                  fontFamily: 'monospace',
                  fontSize: '0.65rem',
                  padding: '0.2rem 0.6rem',
                  border: '1px solid rgba(158,122,223,0.2)',
                  borderRadius: '2px',
                  color: 'rgba(158,122,223,0.7)',
                  background: 'rgba(158,122,223,0.05)',
                }}>{t}</span>
              ))}
            </div>
          </a>
        </motion.div>
      ))}

      {/* Coming soon */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8, duration: 0.5 }}
        style={{
          padding: '1rem 1.25rem',
          border: '1px dashed rgba(158,122,223,0.2)',
          borderRadius: '4px',
          fontFamily: 'monospace',
          fontSize: '0.72rem',
          color: 'rgba(158,122,223,0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <span style={{ color: 'rgba(158,122,223,0.3)' }}>◌</span>
        agent_002 · in development · ETA unknown
      </motion.div>

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  )
}
