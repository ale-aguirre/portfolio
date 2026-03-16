'use client'
import { useEffect, useState } from 'react'

const links = [
  ['#projects', 'Work'],
  ['#stack', 'Stack'],
  ['#contact', 'Contact'],
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '1rem clamp(1.5rem,6vw,5rem)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: scrolled ? 'rgba(7,7,9,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'background .4s, backdrop-filter .4s, border-color .4s',
    }}>
      <a href="/" style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.78rem',
        color: 'var(--accent)',
        textDecoration: 'none',
        letterSpacing: '0.06em',
      }}>
        ale-aguirre<span style={{ color: 'var(--text-ghost)' }}>.dev</span>
      </a>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {links.map(([href, label]) => (
          <a key={label} href={href} style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            transition: 'color .2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
            {label}
          </a>
        ))}

        <a
          href="https://github.com/ale-aguirre"
          target="_blank" rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
            color: 'var(--text-muted)', textDecoration: 'none',
            border: '1px solid var(--border)',
            padding: '0.35rem 0.85rem', borderRadius: '3px',
            transition: 'color .2s, border-color .2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent-20)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
          </svg>
          GitHub
        </a>
      </div>

      <style>{`
        @media (max-width: 560px) {
          nav a:not(:first-child):not(:last-child) { display: none !important; }
        }
      `}</style>
    </nav>
  )
}
