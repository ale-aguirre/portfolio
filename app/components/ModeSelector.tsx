'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme, ThemeMode, themeConfig, modeOrder } from '../context/ThemeContext'

const icons: Record<ThemeMode, string> = {
  gaming: '⬡',
  ai: '◎',
  developer: '◆',
}

export default function ModeSelector() {
  const { mode, setMode } = useTheme()
  const [hovered, setHovered] = useState<ThemeMode | null>(null)

  return (
    <>
    <div className="mode-selector-grid" style={{
      gap: '1px',
      background: 'var(--border)',
      border: '1px solid var(--border)',
      borderRadius: '4px',
      overflow: 'hidden',
      width: '100%',
      maxWidth: '760px',
      margin: '0 auto',
    }}>
      {modeOrder.map(m => {
        const cfg = themeConfig[m]
        const isActive = mode === m
        const isHovered = hovered === m

        return (
          <motion.button
            key={m}
            onClick={() => setMode(m)}
            onMouseEnter={() => setHovered(m)}
            onMouseLeave={() => setHovered(null)}
            whileTap={{ scale: 0.98 }}
            style={{
              all: 'unset',
              cursor: 'pointer',
              padding: '1.4rem 1.4rem 1.3rem',
              background: isActive ? cfg.accent + '12' : isHovered ? cfg.accent + '07' : 'var(--bg)',
              borderBottom: `2px solid ${isActive ? cfg.accent : 'transparent'}`,
              transition: 'background 0.3s, border-color 0.3s',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.55rem',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '120px',
            }}
          >
            {/* Glow */}
            {isActive && (
              <div style={{
                position: 'absolute', top: '-40%', left: '50%',
                transform: 'translateX(-50%)',
                width: '80%', height: '80px',
                background: `radial-gradient(ellipse, ${cfg.accent}1a 0%, transparent 70%)`,
                pointerEvents: 'none',
              }} />
            )}

            {/* Active dot indicator — replaces "active" badge */}
            {isActive && (
              <div style={{
                position: 'absolute', top: '1rem', right: '1rem',
                width: '6px', height: '6px', borderRadius: '50%',
                background: cfg.accent,
                boxShadow: `0 0 6px ${cfg.accent}`,
                animation: 'pulse-dot 2s ease-in-out infinite',
              }} />
            )}

            {/* Icon + label — no badge, no overflow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <span style={{ fontSize: '0.85rem', color: isActive || isHovered ? cfg.accent : 'var(--text-muted)', transition: 'color 0.2s' }}>
                {icons[m]}
              </span>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1rem',
                fontWeight: 400,
                color: isActive ? cfg.accent : isHovered ? cfg.accent + 'cc' : '#ffffff',
                transition: 'color 0.2s',
                letterSpacing: '-0.01em',
                whiteSpace: 'nowrap',
              }}>
                {cfg.label}
              </span>
            </div>

            {/* Tagline */}
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              lineHeight: 1.4,
              margin: 0,
            }}>
              {cfg.tagline}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginTop: 'auto' }}>
              {cfg.tags.slice(0, 3).map(t => (
                <span key={t} style={{
                  fontSize: '0.58rem',
                  padding: '0.12rem 0.45rem',
                  border: `1px solid ${isActive ? cfg.accent + '35' : 'var(--border)'}`,
                  borderRadius: '2px',
                  color: isActive ? cfg.accent + 'bb' : 'var(--text-muted)',
                  fontFamily: 'var(--font-body)',
                  letterSpacing: '0.03em',
                  background: isActive ? cfg.accent + '08' : 'transparent',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}>
                  {t}
                </span>
              ))}
            </div>
          </motion.button>
        )
      })}
    </div>
    <style>{`
      .mode-selector-grid { display: grid; grid-template-columns: repeat(3, 1fr); }
      @media (max-width: 520px) {
        .mode-selector-grid { grid-template-columns: 1fr; }
      }
    `}</style>
    </>
  )
}
