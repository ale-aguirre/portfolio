'use client'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import FloatingShape from './FloatingShape'
import ModeSelector from './ModeSelector'
import { useTheme } from '../context/ThemeContext'

const HeroGaming = dynamic(() => import('./HeroGaming'), { ssr: false })

const marqueeItems = [
  'Forgix', '·', 'Skuscribe', '·', 'React', '·', 'Next.js', '·',
  'TypeScript', '·', 'Claude API', '·', 'Supabase', '·', 'Framer Motion', '·',
  'Node.js', '·', 'Stripe', '·', 'OpenAI', '·', 'Playwright', '·',
  'Forgix', '·', 'Skuscribe', '·', 'React', '·', 'Next.js', '·',
  'TypeScript', '·', 'Claude API', '·', 'Supabase', '·', 'Framer Motion', '·',
  'Node.js', '·', 'Stripe', '·', 'OpenAI', '·', 'Playwright', '·',
]

export default function Hero() {
  const { cfg, mode } = useTheme()

  if (mode === 'gaming') return <HeroGaming />

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      textAlign: 'center',
      transition: 'background 0.6s',
    }}>
      <FloatingShape />

      <div style={{
        position: 'relative',
        zIndex: 1,
        padding: 'clamp(6rem,12vw,10rem) clamp(1.5rem,6vw,5rem) 5rem',
        width: '100%',
        maxWidth: '860px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0',
      }}>

        {/* Availability */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.4rem 1rem',
          border: `1px solid ${cfg.accent}44`,
          borderRadius: '2px',
          marginBottom: '2.5rem',
          animation: 'fade-up 0.6s .1s both',
          opacity: 0,
        }}>
          <div style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: cfg.accent,
            boxShadow: `0 0 8px ${cfg.accent}`,
            animation: 'pulse-dot 2s ease-in-out infinite',
          }} />
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.68rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}>
            Available for remote work
          </span>
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(5rem, 16vw, 12rem)',
          fontWeight: 400,
          lineHeight: 0.92,
          letterSpacing: '-0.03em',
          marginBottom: '2.5rem',
          animation: 'fade-up 0.9s .2s both',
          opacity: 0,
        }}>
          <span style={{ display: 'block', color: 'var(--text)' }}>Alexis</span>
          <span style={{
            display: 'block',
            color: 'transparent',
            WebkitTextStroke: `1.5px ${cfg.accent}`,
            transition: '-webkit-text-stroke-color 0.5s',
          }}>
            Aguirre
          </span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
          color: 'var(--text-muted)',
          fontWeight: 300,
          lineHeight: 1.6,
          marginBottom: '3rem',
          animation: 'fade-up 0.7s .35s both',
          opacity: 0,
        }}>
          Frontend engineer · 4+ years shipping games, AI agents & SaaS products to production.
        </p>

        {/* Mode selector — the main element */}
        <div style={{
          width: '100%',
          marginBottom: '3rem',
          animation: 'fade-up 0.7s .5s both',
          opacity: 0,
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.65rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: '1rem',
          }}>
            Select a domain
          </p>
          <ModeSelector />
        </div>

        {/* CTAs */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          animation: 'fade-up 0.7s .65s both',
          opacity: 0,
        }}>
          <a
            href="#projects"
            style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '0.85rem 2.2rem',
              background: cfg.accent,
              color: '#fff',
              borderRadius: '3px',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 500,
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.04em',
              transition: 'opacity .2s, background .5s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            View projects
          </a>
          <a
            href="mailto:aguirrealexis.cba@gmail.com"
            style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '0.85rem 2.2rem',
              background: 'transparent',
              color: 'var(--text)',
              border: '1px solid var(--border)',
              borderRadius: '3px',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.04em',
              transition: 'border-color .2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = cfg.accent + '66')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            Get in touch
          </a>
        </div>
      </div>

      {/* Marquee */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: '1px solid var(--border)',
        overflow: 'hidden',
        padding: '0.75rem 0',
        animation: 'fade-in 1s 1.2s both',
        opacity: 0,
      }}>
        <div style={{
          display: 'flex',
          gap: '2rem',
          width: 'max-content',
          animation: 'marquee 34s linear infinite',
        }}>
          {marqueeItems.map((item, i) => (
            <span key={i} style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: item === '·' ? cfg.accent : 'var(--text-muted)',
              whiteSpace: 'nowrap',
              transition: 'color 0.5s',
            }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes pulse-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </section>
  )
}
