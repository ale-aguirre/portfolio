'use client'
import { useEffect, useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const IconLinkedIn = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)

const IconGitHub = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
)

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { cfg } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '1.1rem clamp(1.5rem,6vw,5rem)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: scrolled ? 'rgba(13,13,22,0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'background .4s, backdrop-filter .4s, border-color .4s',
    }}>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 400, color: '#ffffff', letterSpacing: '-0.01em' }}>
        Alexis Aguirre
      </span>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        {[['#projects', 'Work'], ['#stack', 'Stack'], ['#contact', 'Contact']].map(([href, label]) => (
          <a key={label} href={href} className="nav-link" style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color .2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
            {label}
          </a>
        ))}

        <div className="nav-sep" style={{ width: '1px', height: '16px', background: 'var(--border)' }} />

        {[
          { href: 'https://linkedin.com/in/alexisaguirre-reactdev', label: 'LinkedIn', Icon: IconLinkedIn },
          { href: 'https://github.com/ale-aguirre', label: 'GitHub', Icon: IconGitHub },
        ].map(({ href, label, Icon }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
            style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', transition: 'color .2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = cfg.accent)}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
            <Icon />
          </a>
        ))}
      </div>
    </nav>
    <style>{`
      @media (max-width: 560px) {
        .nav-link { display: none !important; }
        .nav-sep { display: none !important; }
      }
    `}</style>
    </>
  )
}
