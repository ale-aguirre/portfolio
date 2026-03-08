'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import FloatingShape from './FloatingShape'
import ModeSelector from './ModeSelector'

function Blink({ children }: { children: React.ReactNode }) {
  const [on, setOn] = useState(true)
  useEffect(() => {
    const t = setInterval(() => setOn(v => !v), 600)
    return () => clearInterval(t)
  }, [])
  return <span style={{ opacity: on ? 1 : 0, transition: 'opacity 0.08s' }}>{children}</span>
}

function PixelBar({ value, max, color, bg }: { value: number; max: number; color: string; bg: string }) {
  return (
    <div style={{ position: 'relative', height: '7px', background: bg, border: '1px solid rgba(255,255,255,0.06)', borderRadius: '1px', overflow: 'hidden' }}>
      <div style={{ width: `${Math.round((value / max) * 100)}%`, height: '100%', background: color, boxShadow: `0 0 6px ${color}88` }} />
    </div>
  )
}

const accent = '#e07a3f'
const accentDim = 'rgba(224,122,63,0.25)'
const accentFaint = 'rgba(224,122,63,0.07)'

const STATS = [
  { label: 'FRONTEND', value: 92 },
  { label: 'BACKEND', value: 78 },
  { label: 'AI / AGENTS', value: 88 },
  { label: 'GAME DEV', value: 75 },
]

export default function HeroGaming() {
  const [menuHover, setMenuHover] = useState<string | null>(null)

  return (
    <section className="gaming-hero">
      <FloatingShape />

      {/* vignette */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 90% at 28% 50%, rgba(15,12,9,0.5) 0%, rgba(15,12,9,0.88) 100%)',
      }} />

      <div className="gaming-grid">

        {/* ══ LEFT: CHARACTER CARD ══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          style={{ position: 'relative' }}
        >
          <div style={{
            border: `2px solid ${accent}`,
            boxShadow: `0 0 0 1px ${accentDim}, 0 0 24px rgba(224,122,63,0.15)`,
            borderRadius: '2px',
            background: 'rgba(15,12,9,0.95)',
            overflow: 'hidden',
          }}>
            {/* Header bar */}
            <div style={{
              padding: '0.45rem 1rem',
              background: accent,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.85rem', letterSpacing: '0.14em', color: '#0f0c09' }}>
                ══ CHARACTER SELECT ══
              </span>
              <span style={{ fontFamily: 'monospace', fontSize: '0.58rem', color: '#0f0c09aa', letterSpacing: '0.08em' }}>
                <Blink>■</Blink> ONLINE
              </span>
            </div>

            <div style={{ padding: '1.25rem 1.1rem' }}>

              {/* Name */}
              <div style={{ marginBottom: '1.1rem' }}>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(2.6rem, 4vw, 3.6rem)',
                  lineHeight: 0.9,
                  letterSpacing: '0.04em',
                }}>
                  <span style={{ display: 'block', color: accent, textShadow: `0 0 16px ${accent}66` }}>
                    ALEXIS
                  </span>
                  <span style={{ display: 'block', color: '#ffffff' }}>
                    AGUIRRE
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.55rem', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.58rem', color: accent, letterSpacing: '0.1em', border: `1px solid ${accentDim}`, padding: '0.1rem 0.45rem', background: accentFaint }}>
                    CLASS: GAME DEV
                  </span>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.58rem', color: 'rgba(224,122,63,0.55)', letterSpacing: '0.1em' }}>
                    LVL 04 · MAR 2026
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div style={{ borderTop: `1px solid ${accentDim}`, marginBottom: '1rem' }} />

              {/* HP / XP bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.1rem' }}>
                {[
                  { label: 'HP', cur: 92, color: '#28c840', bg: '#0a1f0e' },
                  { label: 'XP', cur: 80, color: accent, bg: '#1e1208' },
                ].map(({ label, cur, color, bg }) => (
                  <div key={label} style={{ display: 'grid', gridTemplateColumns: '24px 1fr 34px', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.58rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em' }}>{label}</span>
                    <PixelBar value={cur} max={100} color={color} bg={bg} />
                    <span style={{ fontFamily: 'monospace', fontSize: '0.52rem', color: 'rgba(255,255,255,0.3)', textAlign: 'right' }}>{cur}/100</span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div style={{ borderTop: `1px solid ${accentDim}`, marginBottom: '1rem' }} />

              {/* Stats */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.1rem' }}>
                {STATS.map(({ label, value }) => (
                  <div key={label} style={{ display: 'grid', gridTemplateColumns: '90px 1fr 28px', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.52rem', color: 'rgba(224,122,63,0.55)', letterSpacing: '0.06em' }}>{label}</span>
                    <PixelBar value={value} max={100} color={accentDim.replace('0.25', '0.6')} bg='rgba(224,122,63,0.06)' />
                    <span style={{ fontFamily: 'monospace', fontSize: '0.5rem', color: 'rgba(255,255,255,0.3)', textAlign: 'right' }}>{value}</span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div style={{ borderTop: `1px solid ${accentDim}`, marginBottom: '0.85rem' }} />

              {/* Menu */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {[
                  { label: 'VIEW QUESTS', href: '#projects' },
                  { label: 'SEND MESSAGE', href: 'mailto:aguirrealexis.cba@gmail.com' },
                ].map(({ label, href }) => {
                  const active = menuHover === label
                  return (
                    <a
                      key={label}
                      href={href}
                      onMouseEnter={() => setMenuHover(label)}
                      onMouseLeave={() => setMenuHover(null)}
                      style={{
                        display: 'block',
                        fontFamily: 'monospace',
                        fontSize: '0.68rem',
                        letterSpacing: '0.1em',
                        color: active ? '#fff' : accent,
                        background: active ? accentDim : accentFaint,
                        border: `1px solid ${active ? accent : accentDim}`,
                        borderRadius: '2px',
                        padding: '0.5rem 0.8rem',
                        textDecoration: 'none',
                        transition: 'all 0.15s',
                      }}
                    >
                      {active ? '▶' : '►'} {label}
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Footer */}
            <div style={{
              padding: '0.35rem 1rem',
              background: accentFaint,
              borderTop: `1px solid ${accentDim}`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ fontFamily: 'monospace', fontSize: '0.52rem', color: 'rgba(224,122,63,0.5)', letterSpacing: '0.08em' }}>
                CÓRDOBA, ARG · REMOTE
              </span>
              <span style={{ fontFamily: 'monospace', fontSize: '0.52rem', color: '#28c840', letterSpacing: '0.06em' }}>
                ● AVAILABLE
              </span>
            </div>
          </div>
        </motion.div>

        {/* ══ RIGHT: DOMAIN SELECTOR ══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}
        >
          <div>
            <p style={{ fontFamily: 'monospace', fontSize: '0.6rem', letterSpacing: '0.14em', color: `${accent}88`, marginBottom: '0.35rem' }}>
              ══ SELECT DOMAIN ══
            </p>
            <p style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)',
              color: '#ffffff',
              letterSpacing: '0.05em',
              lineHeight: 1.05,
            }}>
              CHOOSE YOUR PATH
            </p>
          </div>

          <ModeSelector />

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.82rem',
            color: 'rgba(255,255,255,0.4)',
            lineHeight: 1.7,
            borderLeft: `2px solid ${accentDim}`,
            paddingLeft: '0.85rem',
          }}>
            Frontend engineer · 4+ years shipping<br />
            games, AI agents &amp; SaaS to production.
          </p>
        </motion.div>
      </div>

      {/* Bottom marquee */}
      <div className="gaming-marquee-bar">
        <div style={{
          display: 'flex', gap: '2.5rem',
          width: 'max-content',
          animation: 'marquee-gaming 32s linear infinite',
          fontFamily: 'monospace', fontSize: '0.58rem', letterSpacing: '0.12em',
        }}>
          {[
            '★ FORGIX', '· GAME DEV ·', '★ NEXT.JS 14', '· THREE.JS ·',
            '★ CLAUDE API', '· SUPABASE ·', '★ TYPESCRIPT', '· STRIPE ·',
            '★ FORGIX', '· GAME DEV ·', '★ NEXT.JS 14', '· THREE.JS ·',
            '★ CLAUDE API', '· SUPABASE ·', '★ TYPESCRIPT', '· STRIPE ·',
          ].map((item, i) => (
            <span key={i} style={{ color: item.startsWith('★') ? accent : `${accent}55`, whiteSpace: 'nowrap' }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .gaming-hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          background: #0f0c09;
        }
        .gaming-grid {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1060px;
          margin: 0 auto;
          padding: clamp(5rem, 10vw, 8rem) clamp(1.25rem, 5vw, 4rem) 4rem;
          display: grid;
          grid-template-columns: minmax(0, 380px) 1fr;
          gap: 2.5rem;
          align-items: center;
        }
        .gaming-marquee-bar {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          z-index: 3;
          border-top: 1px solid rgba(224,122,63,0.18);
          overflow: hidden;
          padding: 0.55rem 0;
          background: rgba(15,12,9,0.75);
        }
        @keyframes marquee-gaming {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (max-width: 700px) {
          .gaming-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding-top: 6rem;
            padding-bottom: 3.5rem;
          }
        }
      `}</style>
    </section>
  )
}
