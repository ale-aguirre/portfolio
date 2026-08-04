'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { usePostHog } from 'posthog-js/react'
import { useLang } from '../context/LangContext'
import ScrambleText from './ScrambleText'

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const posthog = usePostHog()
  const { t } = useLang()

  return (
    <section id="contact" style={{
      padding: 'clamp(5rem,10vw,9rem) clamp(1.5rem,6vw,5rem)',
      borderTop: '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span style={{
            display: 'block',
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--accent)', marginBottom: '1rem',
          }}>
            <ScrambleText>{t.contact.label}</ScrambleText>
          </span>

          <h2 style={{
            fontFamily: 'var(--font-head)',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            color: 'var(--text)',
            marginBottom: '1.5rem',
          }}>
            <ScrambleText>{t.contact.title1}</ScrambleText><br />
            <em style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontWeight: 300 }}>
              <ScrambleText>{t.contact.title2}</ScrambleText>
            </em>
          </h2>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem', fontWeight: 300,
            color: 'var(--text-muted)', lineHeight: 1.65,
            maxWidth: '420px', marginBottom: '2.5rem',
          }}>
            <ScrambleText duration={700}>{t.contact.body}</ScrambleText>
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a
              href="mailto:aguirrealexis.cba@gmail.com"
              onClick={() => posthog?.capture('click_email')}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                color: 'var(--text)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--accent-40)',
                paddingBottom: '2px',
                transition: 'color .2s, border-color .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderBottomColor = 'var(--accent)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderBottomColor = 'var(--accent-40)' }}
            >
              aguirrealexis.cba@gmail.com
            </a>

            <span style={{ color: 'var(--text-ghost)' }}>·</span>

            <a
              href="https://linkedin.com/in/alexisaguirre-aideveloper"
              target="_blank" rel="noopener noreferrer"
              onClick={() => posthog?.capture('click_social', { platform: 'linkedin' })}
              style={{
                fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                color: 'var(--text-muted)', textDecoration: 'none', transition: 'color .2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              LinkedIn
            </a>

            <a
              href="https://github.com/ale-aguirre"
              target="_blank" rel="noopener noreferrer"
              onClick={() => posthog?.capture('click_social', { platform: 'github' })}
              style={{
                fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                color: 'var(--text-muted)', textDecoration: 'none', transition: 'color .2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              GitHub
            </a>
          </div>
        </motion.div>

        <div style={{
          marginTop: '5rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '1rem',
          borderTop: '1px solid var(--border)', paddingTop: '1.5rem',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            color: 'var(--text-ghost)',
          }}>
            Alexis Aguirre · Córdoba, Argentina
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <a
              href="/Alexis_Aguirre_CV.pdf"
              download
              onClick={() => posthog?.capture('click_cv_download')}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                color: 'var(--text-muted)', textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: '0.35rem',
                border: '1px solid var(--border)', padding: '0.35rem 0.75rem',
                borderRadius: '3px', transition: 'color .2s, border-color .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent-20)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              <ScrambleText>{t.contact.downloadCV}</ScrambleText>
            </a>

            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
              color: 'var(--text-ghost)',
            }}>
              {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
