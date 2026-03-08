'use client'
import { useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import ProjectsAI from './projects/ProjectsAI'
import ProjectsDev from './projects/ProjectsDev'
import ProjectsGaming from './projects/ProjectsGaming'

const meta = {
  ai: {
    index: '01',
    title: 'AI & Agents',
    sub: 'Automation and intelligent systems',
  },
  developer: {
    index: '02',
    title: 'Developer',
    sub: 'Web platforms & production apps',
  },
  gaming: {
    index: '03',
    title: 'Gaming',
    sub: 'New domain — started March 2026',
  },
}

export default function Projects() {
  const { mode, cfg } = useTheme()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const m = meta[mode]

  return (
    <section
      id="projects"
      style={{
        padding: 'clamp(5rem,10vw,8rem) clamp(1.5rem,6vw,5rem)',
        borderTop: '1px solid var(--border)',
        transition: 'border-color 0.5s',
        minHeight: '60vh',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Section title */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '3.5rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.62rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}>
              {m.index}
            </span>
            <div style={{ height: '1px', flex: 1, background: cfg.accent, opacity: 0.2 }} />
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.62rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: cfg.accent,
              transition: 'color 0.5s',
            }}>
              {m.sub}
            </span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 400,
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            color: 'var(--text)',
            transition: 'color 0.5s',
          }}>
            Selected<br />
            <em style={{ color: cfg.accent, fontStyle: 'italic', transition: 'color 0.5s' }}>
              {m.title}
            </em>
          </h2>
        </motion.div>

        {/* Dynamic layout per mode */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            {mode === 'ai' && <ProjectsAI />}
            {mode === 'developer' && <ProjectsDev />}
            {mode === 'gaming' && <ProjectsGaming />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
