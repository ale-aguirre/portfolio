'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section style={{
      padding: 'clamp(5rem,10vw,9rem) clamp(1.5rem,6vw,5rem)',
      borderTop: '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p style={{
            fontSize: '0.72rem', letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'var(--accent)',
            marginBottom: '1rem', fontFamily: 'var(--font-body)',
          }}>
            Contact
          </p>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.01em',
            color: 'var(--text)', marginBottom: '2rem',
          }}>
            Let&apos;s work<br />
            <em style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>together</em>
          </h2>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem', fontWeight: 300,
            color: 'var(--text-muted)', lineHeight: 1.65,
            maxWidth: '440px', marginBottom: '2.5rem',
          }}>
            Open to full-time remote roles and interesting freelance projects.
            I respond to every message.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a
              href="mailto:aguirrealexis.cba@gmail.com"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                color: 'var(--text)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--accent)',
                paddingBottom: '2px',
                transition: 'color .2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text)')}
            >
              aguirrealexis.cba@gmail.com
            </a>

            <span style={{ color: 'var(--text-ghost)' }}>·</span>

            <a
              href="https://linkedin.com/in/alexisaguirre-reactdev"
              target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem', color: 'var(--text-muted)',
                textDecoration: 'none', transition: 'color .2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              LinkedIn
            </a>

            <a
              href="https://github.com/ale-aguirre"
              target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem', color: 'var(--text-muted)',
                textDecoration: 'none', transition: 'color .2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              GitHub
            </a>
          </div>
        </motion.div>

        {/* Footer */}
        <div style={{
          marginTop: '6rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '1rem',
          borderTop: '1px solid var(--border)', paddingTop: '1.5rem',
        }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
            Alexis Aguirre · Córdoba, Argentina
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {/* CV Download */}
            <a
              href="/Alexis_Aguirre_CV.pdf"
              download
              style={{
                fontFamily: 'var(--font-body)', fontSize: '0.72rem',
                color: 'var(--text-muted)', textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                border: '1px solid var(--border)', padding: '0.35rem 0.75rem',
                borderRadius: '3px', transition: 'color .2s, border-color .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download CV
            </a>

            {/* Social icons */}
            {[
              { href: 'https://linkedin.com/in/alexisaguirre-reactdev', label: 'LinkedIn', d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
              { href: 'https://github.com/ale-aguirre', label: 'GitHub', d: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22' },
            ].map(({ href, label, d }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={d} />
                </svg>
              </a>
            ))}

            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
              {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
