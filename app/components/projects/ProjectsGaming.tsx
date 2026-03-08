'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

function BlinkText({ children }: { children: React.ReactNode }) {
  const [on, setOn] = useState(true)
  useEffect(() => {
    const t = setInterval(() => setOn(v => !v), 700)
    return () => clearInterval(t)
  }, [])
  return <span style={{ opacity: on ? 1 : 0, transition: 'opacity 0.1s' }}>{children}</span>
}

function XPBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.round((value / max) * 100)
  const filled = Math.round(pct / 5)
  const empty = 20 - filled
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
      <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', color, whiteSpace: 'nowrap' }}>XP</span>
      <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color, letterSpacing: '0px' }}>
        {'█'.repeat(filled)}
        <span style={{ opacity: 0.2 }}>{'░'.repeat(empty)}</span>
      </span>
      <span style={{ fontFamily: 'monospace', fontSize: '0.62rem', color: 'rgba(224,122,63,0.6)' }}>{pct}%</span>
    </div>
  )
}

export default function ProjectsGaming() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [forgixHovered, setForgixHovered] = useState(false)
  const accent = '#e07a3f'
  const accentDim = 'rgba(224,122,63,0.35)'
  const accentFaint = 'rgba(224,122,63,0.12)'

  return (
    <div ref={ref}>
      {/* Status bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
          padding: '0.65rem 1rem',
          border: `1px solid ${accentDim}`,
          borderRadius: '3px',
          marginBottom: '1.5rem',
          background: accentFaint,
          fontFamily: 'monospace',
          fontSize: '0.68rem',
          color: accent,
        }}
      >
        <span>▶ LVL 01</span>
        <span style={{ color: 'rgba(224,122,63,0.5)' }}>·</span>
        <span>MARCH 2026</span>
        <span style={{ color: 'rgba(224,122,63,0.5)' }}>·</span>
        <span>CLASS: <strong style={{ color: '#fff' }}>GAME DEV</strong></span>
        <span style={{ marginLeft: 'auto' }}>
          STATUS: <BlinkText>■ ACTIVE</BlinkText>
        </span>
      </motion.div>

      {/* Quest log box */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          border: `1px solid ${accentDim}`,
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        {/* Box header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.65rem 1.25rem',
          background: accentFaint,
          borderBottom: `1px solid ${accentDim}`,
        }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: accent, letterSpacing: '0.12em' }}>
            ╔══ QUEST LOG ══╗
          </span>
          <div style={{ flex: 1, height: '1px', background: accentDim }} />
          <span style={{ fontFamily: 'monospace', fontSize: '0.62rem', color: 'rgba(224,122,63,0.5)' }}>1/2 ACTIVE</span>
        </div>

        {/* MAIN QUEST — Forgix */}
        <div
          onMouseEnter={() => setForgixHovered(true)}
          onMouseLeave={() => setForgixHovered(false)}
          style={{
            padding: '1.5rem 1.25rem',
            borderBottom: `1px solid ${accentDim}`,
            background: forgixHovered ? 'rgba(224,122,63,0.07)' : 'transparent',
            transition: 'background 0.25s',
            cursor: 'pointer',
          }}
        >
          <a href="https://forgix.xyz" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
            {/* Quest header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.75rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.62rem', color: accent, letterSpacing: '0.1em' }}>► MAIN QUEST</span>
                  <span style={{
                    padding: '0.1rem 0.45rem',
                    border: '1px solid rgba(40,200,64,0.5)',
                    borderRadius: '2px',
                    fontSize: '0.55rem',
                    letterSpacing: '0.12em',
                    color: '#28c840',
                    fontFamily: 'monospace',
                    background: 'rgba(40,200,64,0.08)',
                  }}>LIVE</span>
                </div>
                <h3 style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                  color: forgixHovered ? accent : '#ffffff',
                  letterSpacing: '0.04em',
                  lineHeight: 1,
                  transition: 'color 0.2s',
                  margin: 0,
                }}>
                  FORGIX
                </h3>
                <p style={{ fontFamily: 'monospace', fontSize: '0.68rem', color: 'rgba(224,122,63,0.7)', marginTop: '0.25rem', letterSpacing: '0.06em' }}>
                  MULTIPLAYER AI BROWSER GAME
                </p>
              </div>
              <span style={{
                fontFamily: 'monospace', fontSize: '1rem',
                color: forgixHovered ? accent : 'rgba(224,122,63,0.4)',
                transform: forgixHovered ? 'rotate(-45deg)' : 'none',
                transition: 'all 0.2s', flexShrink: 0,
              }}>↗</span>
            </div>

            {/* XP bar */}
            <div style={{ marginBottom: '1rem' }}>
              <XPBar value={80} max={100} color={accent} />
            </div>

            {/* Description */}
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '0.88rem',
              color: '#c0b8a8', lineHeight: 1.65, marginBottom: '1.1rem', maxWidth: '520px',
            }}>
              Real-time multiplayer game where players operate AI agents to compete.
              Next.js 14, Supabase, Claude API and Stripe. ~19k lines of TypeScript.
            </p>

            {/* Stack as items */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {['Next.js 14', 'Supabase', 'Claude API', 'Stripe', 'TypeScript'].map(t => (
                <span key={t} style={{
                  fontFamily: 'monospace', fontSize: '0.62rem',
                  padding: '0.18rem 0.6rem',
                  border: `1px solid ${forgixHovered ? accentDim : 'rgba(224,122,63,0.15)'}`,
                  borderRadius: '2px',
                  color: forgixHovered ? accent : 'rgba(224,122,63,0.55)',
                  background: forgixHovered ? accentFaint : 'transparent',
                  transition: 'all 0.2s',
                  letterSpacing: '0.04em',
                }}>{t}</span>
              ))}
            </div>
          </a>
        </div>

        {/* CHAPTER 02 — locked */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{
            padding: '1.1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            opacity: 0.5,
          }}
        >
          <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'rgba(224,122,63,0.4)' }}>○</span>
          <div>
            <div style={{ fontFamily: 'monospace', fontSize: '0.62rem', color: 'rgba(224,122,63,0.4)', letterSpacing: '0.1em', marginBottom: '0.15rem' }}>
              SIDE QUEST
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'rgba(224,122,63,0.35)', letterSpacing: '0.06em' }}>
              CHAPTER 02 · <BlinkText>???</BlinkText>
            </div>
          </div>
          <span style={{ marginLeft: 'auto', fontFamily: 'monospace', fontSize: '0.62rem', color: 'rgba(224,122,63,0.3)', border: '1px solid rgba(224,122,63,0.15)', padding: '0.15rem 0.5rem', borderRadius: '2px' }}>
            LOCKED
          </span>
        </motion.div>
      </motion.div>
    </div>
  )
}
