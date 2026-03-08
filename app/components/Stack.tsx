'use client'
import { useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useTheme, ThemeMode } from '../context/ThemeContext'

const stacks: Record<ThemeMode, Array<{ index: string; cat: string; items: string[] }>> = {
  ai: [
    { index: '01', cat: 'LLMs', items: ['Claude API', 'OpenAI', 'Groq', 'Ollama', 'OpenRouter'] },
    { index: '02', cat: 'Frameworks', items: ['Next.js', 'Node.js', 'Supabase', 'PostgreSQL'] },
    { index: '03', cat: 'Agent Tools', items: ['LanceDB', 'Playwright', 'Puppeteer', 'Zod'] },
    { index: '04', cat: 'Deploy', items: ['Vercel', 'Stripe', 'Git', 'TypeScript'] },
  ],
  developer: [
    { index: '01', cat: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
    { index: '02', cat: 'Backend', items: ['Node.js', 'Supabase', 'PostgreSQL', 'Prisma', 'REST APIs'] },
    { index: '03', cat: 'Tooling', items: ['Vercel', 'Git', 'Figma', 'Zustand', 'Zod'] },
    { index: '04', cat: 'Payments', items: ['Stripe', 'Webhooks', 'Subscriptions', 'One-time'] },
  ],
  gaming: [
    { index: '01', cat: 'Rendering', items: ['Three.js', 'React Three Fiber', 'Drei', 'WebGL'] },
    { index: '02', cat: 'Game Logic', items: ['Rapier Physics', 'Zustand', 'WebSockets', 'Supabase Realtime'] },
    { index: '03', cat: 'AI in Game', items: ['Claude API', 'OpenAI', 'Groq', 'LLM Agents'] },
    { index: '04', cat: 'Infrastructure', items: ['Next.js 14', 'Supabase', 'Stripe', 'TypeScript'] },
  ],
}

export default function Stack() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { mode, cfg } = useTheme()
  const skills = stacks[mode]

  return (
    <section
      id="stack"
      style={{
        padding: 'clamp(4rem,8vw,7rem) clamp(1.5rem,6vw,5rem)',
        borderTop: '1px solid var(--border)',
        transition: 'border-color 0.5s',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: cfg.accent, transition: 'color 0.5s' }}>
              Tech stack
            </span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: '#ffffff', lineHeight: 1.1 }}>
            What I work with
          </h2>
        </motion.div>

        {/* Cards — animated on mode change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5px',
              background: 'var(--border)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              overflow: 'hidden',
            }}
          >
            {skills.map((group, gi) => (
              <div
                key={group.cat}
                style={{
                  background: 'var(--bg)',
                  padding: '1.75rem 1.5rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Top accent */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: cfg.accent, opacity: 0.8, transition: 'background 0.5s' }} />

                {/* Index */}
                <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '0.12em', color: cfg.accent, marginBottom: '0.75rem', opacity: 0.7, transition: 'color 0.5s' }}>
                  {group.index}
                </span>

                {/* Category */}
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 400, color: '#ffffff', marginBottom: '1.25rem', letterSpacing: mode === 'gaming' ? '0.05em' : '-0.01em' }}>
                  {group.cat}
                </p>

                {/* Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {group.items.map(item => (
                    <div key={item} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: cfg.accent, opacity: 0.55, flexShrink: 0, transition: 'background 0.5s' }} />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 300 }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Glow */}
                <div style={{ position: 'absolute', bottom: '-30%', right: '-20%', width: '100px', height: '100px', borderRadius: '50%', background: `radial-gradient(circle, ${cfg.accent}15 0%, transparent 70%)`, pointerEvents: 'none', transition: 'background 0.5s' }} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
