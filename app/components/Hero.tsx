'use client'
import { useEffect, useRef } from 'react'
import { usePostHog } from 'posthog-js/react'

const marqueeItems = [
  'Claude API', '·', 'Next.js 16', '·', 'AI Agents', '·', 'TypeScript', '·',
  'Supabase', '·', 'LanceDB', '·', 'Playwright', '·', 'Groq', '·',
  'RunPod', '·', 'React Three Fiber', '·', 'Node.js', '·', 'Vercel', '·',
  'Claude API', '·', 'Next.js 16', '·', 'AI Agents', '·', 'TypeScript', '·',
  'Supabase', '·', 'LanceDB', '·', 'Playwright', '·', 'Groq', '·',
  'RunPod', '·', 'React Three Fiber', '·', 'Node.js', '·', 'Vercel', '·',
]

const stats = [
  { value: '5+', label: 'years shipping' },
  { value: '6',  label: 'AI projects in prod' },
  { value: '3',  label: 'autonomous agents' },
]

export default function Hero() {
  const posthog = usePostHog()
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!glowRef.current) return
      const rect = glowRef.current.closest('section')!.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      glowRef.current.style.background =
        `radial-gradient(600px circle at ${x}% ${y}%, rgba(0,217,255,0.06) 0%, transparent 60%)`
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

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
    }}>
      {/* Mouse-follow glow */}
      <div ref={glowRef} aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        transition: 'background .1s',
      }} />

      {/* Hero glow center */}
      <div aria-hidden style={{
        position: 'absolute', top: '30%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px', height: '300px',
        background: 'radial-gradient(ellipse, rgba(0,217,255,0.07) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        padding: 'clamp(7rem,14vw,11rem) clamp(1.5rem,6vw,5rem) 5rem',
        width: '100%', maxWidth: '860px', margin: '0 auto',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0',
      }}>

        {/* Availability badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.35rem 0.9rem',
          border: '1px solid var(--accent-20)',
          borderRadius: '2px',
          background: 'var(--accent-10)',
          marginBottom: '2.5rem',
          animation: 'fade-up 0.5s .1s both',
        }}>
          <div style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: '#22c55e',
            animation: 'pulse-dot 2s ease-in-out infinite',
            color: '#22c55e',
          }} />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}>
            Open to remote work
          </span>
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(5rem, 18vw, 13rem)',
          fontWeight: 400,
          lineHeight: 0.9,
          letterSpacing: '-0.01em',
          marginBottom: '2rem',
          animation: 'fade-up 0.8s .2s both',
        }}>
          <span style={{ display: 'block', color: 'var(--text)' }}>Alexis</span>
          <span style={{
            display: 'block',
            color: 'transparent',
            WebkitTextStroke: '1.5px var(--accent)',
          }}>
            Aguirre
          </span>
        </h1>

        {/* Tagline */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
          color: 'var(--text-muted)',
          fontWeight: 300,
          lineHeight: 1.65,
          maxWidth: '520px',
          marginBottom: '2.5rem',
          animation: 'fade-up 0.6s .35s both',
        }}>
          Frontend engineer building <strong style={{ color: 'var(--text)', fontWeight: 500 }}>AI agents</strong>,
          SaaS products and browser experiences.<br />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-ghost)' }}>
            Córdoba, Argentina · Remote-first
          </span>
        </p>

        {/* Stats */}
        <div style={{
          display: 'flex', gap: '0', marginBottom: '3rem',
          border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden',
          animation: 'fade-up 0.6s .45s both',
        }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{
              padding: '0.85rem 1.75rem',
              borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none',
              textAlign: 'center',
              background: 'var(--bg-card)',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.4rem',
                fontWeight: 500,
                color: 'var(--accent)',
                lineHeight: 1,
                marginBottom: '0.25rem',
              }}>
                {s.value}
              </div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.62rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{
          display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap',
          animation: 'fade-up 0.6s .55s both',
        }}>
          <a
            href="#projects"
            onClick={() => posthog?.capture('click_cta_work')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.85rem 2rem',
              background: 'var(--accent)',
              color: '#000',
              borderRadius: '3px',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 600,
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.02em',
              transition: 'opacity .2s, box-shadow .3s',
              animation: 'glow-pulse 3s ease-in-out infinite',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            View work
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
          <a
            href="mailto:aguirrealexis.cba@gmail.com"
            onClick={() => posthog?.capture('click_cta_contact')}
            style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '0.85rem 2rem',
              background: 'transparent',
              color: 'var(--text)',
              border: '1px solid var(--border)',
              borderRadius: '3px',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.02em',
              transition: 'border-color .2s, color .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-40)'; e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)' }}
          >
            Get in touch
          </a>
        </div>
      </div>

      {/* Marquee */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        borderTop: '1px solid var(--border)',
        overflow: 'hidden', padding: '0.7rem 0',
        animation: 'fade-in 1s 1s both',
      }}>
        <div style={{
          display: 'flex', gap: '2rem', width: 'max-content',
          animation: 'marquee 40s linear infinite',
        }}>
          {marqueeItems.map((item, i) => (
            <span key={i} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: item === '·' ? 'var(--accent)' : 'var(--text-ghost)',
              whiteSpace: 'nowrap',
            }}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
