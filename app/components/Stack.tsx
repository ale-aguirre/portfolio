'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '../context/LangContext'
import ScrambleText from './ScrambleText'

const groups = [
  {
    index: '01',
    cat: 'LLMs & AI',
    icon: '◎',
    items: ['Claude API', 'OpenAI', 'Groq', 'Ollama', 'OpenRouter', 'LanceDB'],
  },
  {
    index: '02',
    cat: 'Frontend',
    icon: '◆',
    items: ['React 19', 'Next.js 16', 'TypeScript', 'Framer Motion', 'Three.js / R3F', 'Tailwind CSS'],
  },
  {
    index: '03',
    cat: 'Backend & DB',
    icon: '▸',
    items: ['Node.js', 'FastAPI', 'Supabase', 'PostgreSQL', 'SQLite WAL', 'Prisma'],
  },
  {
    index: '04',
    cat: 'AI Infra & Tools',
    icon: '⬡',
    items: ['Playwright', 'Chrome CDP', 'RunPod', 'Vercel', 'PostHog', 'Stripe'],
  },
]

export default function Stack() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { t } = useLang()

  return (
    <section id="stack" style={{
      padding: 'clamp(4rem,8vw,7rem) clamp(1.5rem,6vw,5rem)',
      borderTop: '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
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
              <ScrambleText>{t.stack.label}</ScrambleText>
            </span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          </div>
          <h2 style={{
            fontFamily: 'var(--font-head)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 500,
            color: 'var(--text)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}>
            <ScrambleText>{t.stack.title}</ScrambleText>
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5px',
          background: 'var(--border)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          overflow: 'hidden',
        }}>
          {groups.map((g, gi) => (
            <motion.div
              key={g.cat}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: gi * 0.08 + 0.2 }}
              style={{
                background: 'var(--bg)',
                padding: '1.75rem 1.5rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: 'var(--accent)', opacity: 0.6,
              }} />
              <div style={{
                position: 'absolute', bottom: '-30%', right: '-20%',
                width: '120px', height: '120px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0,217,255,0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />

              <span style={{
                display: 'block',
                fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: '0.6rem', opacity: 0.6,
              }}>
                {g.index}
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent)', opacity: 0.7 }}>{g.icon}</span>
                <p style={{
                  fontFamily: 'var(--font-head)',
                  fontSize: '1rem', fontWeight: 500,
                  color: 'var(--text)', letterSpacing: '-0.01em',
                }}>
                  {g.cat}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {g.items.map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                      width: '4px', height: '4px', borderRadius: '50%',
                      background: 'var(--accent)', opacity: 0.45, flexShrink: 0,
                    }} />
                    <span style={{
                      fontFamily: 'var(--font-body)', fontSize: '0.83rem',
                      color: 'var(--text-muted)', fontWeight: 300,
                    }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
