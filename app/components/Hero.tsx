'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { usePostHog } from 'posthog-js/react'
import { useLang } from '../context/LangContext'

const marqueeItems = [
  'Claude API', '·', 'Next.js 16', '·', 'AI Agents', '·', 'TypeScript', '·',
  'Supabase', '·', 'LanceDB', '·', 'Playwright', '·', 'Groq', '·',
  'RunPod', '·', 'React Three Fiber', '·', 'Node.js', '·', 'Vercel', '·',
  'Claude API', '·', 'Next.js 16', '·', 'AI Agents', '·', 'TypeScript', '·',
  'Supabase', '·', 'LanceDB', '·', 'Playwright', '·', 'Groq', '·',
  'RunPod', '·', 'React Three Fiber', '·', 'Node.js', '·', 'Vercel', '·',
]

const clipReveal = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] as const },
  },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: { duration: 0.5, delay, ease: 'easeOut' as const },
  }),
}

const slideUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: [0.33, 1, 0.68, 1] as const },
  }),
}

export default function Hero() {
  const posthog = usePostHog()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useLang()

  return (
    <section
      ref={ref}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        paddingBottom: '4rem',
      }}
    >
      <motion.div
        custom={0.6}
        variants={fadeIn}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="hero-year"
        style={{
          position: 'absolute',
          top: 'clamp(2rem, 4vw, 3rem)',
          right: 'clamp(1.5rem, 6vw, 5rem)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          color: 'var(--text-ghost)',
          textTransform: 'uppercase',
          zIndex: 2,
        }}
        aria-hidden
      >
        2026
      </motion.div>

      <motion.div
        custom={1.0}
        variants={fadeIn}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="hero-rotated"
        style={{
          position: 'absolute',
          left: 'clamp(0.5rem, 1.5vw, 1.5rem)',
          top: '50%',
          transform: 'translateY(-50%) rotate(-90deg)',
          transformOrigin: 'center center',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.58rem',
          letterSpacing: '0.25em',
          color: 'var(--text-ghost)',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          zIndex: 2,
        }}
        aria-hidden
      >
        Frontend · AI · Browser
      </motion.div>

      <div
        className="hero-main-grid"
        style={{ position: 'relative', zIndex: 2 }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          <motion.div
            variants={clipReveal}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{ overflow: 'hidden', lineHeight: 0.88 }}
          >
            <h1
              className="hero-display-name"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(5.5rem, 16vw, 14rem)',
                fontWeight: 400,
                letterSpacing: '-0.01em',
                color: 'var(--text)',
                lineHeight: 0.88,
                display: 'block',
              }}
            >
              ALEXIS
            </h1>
          </motion.div>

          <motion.div
            variants={clipReveal}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ delay: 0.08 }}
            style={{ overflow: 'hidden', lineHeight: 0.88, marginBottom: '0.6rem' }}
          >
            <h1
              className="hero-display-name"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(5.5rem, 16vw, 14rem)',
                fontWeight: 400,
                letterSpacing: '-0.01em',
                color: 'transparent',
                WebkitTextStroke: '1.5px var(--text-ghost)',
                lineHeight: 0.88,
                display: 'block',
              }}
            >
              AGUIRRE
            </h1>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.76, 0, 0.24, 1] as const }}
            style={{
              height: '1px',
              background: 'linear-gradient(90deg, var(--accent) 0%, var(--text-ghost) 40%, transparent 100%)',
              transformOrigin: 'left center',
              marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
            }}
          />

          <motion.p
            custom={0.65}
            variants={slideUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{
              fontFamily: 'var(--font-head)',
              fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
              color: 'var(--text-muted)',
              fontWeight: 300,
              lineHeight: 1.6,
              maxWidth: '42ch',
              marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
            }}
          >
            {t.hero.tagline1}{' '}
            <span style={{ color: 'var(--text)', fontWeight: 500 }}>{t.hero.taglineHighlight}</span>
            {t.hero.tagline2}
          </motion.p>

          <motion.span
            custom={0.8}
            variants={fadeIn}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--text-ghost)',
            }}
          >
            {t.hero.location}
          </motion.span>
        </div>

        <div className="hero-right-col" style={{}}>
          <motion.div
            custom={0.7}
            variants={fadeIn}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="hero-stats-list"
            style={{}}
          >
            {t.hero.stats.map((s, i) => (
              <div
                key={s.label}
                className="hero-stat-item"
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '0.75rem',
                  padding: '0.7rem 0',
                  borderBottom: i < t.hero.stats.length - 1 ? '1px solid var(--border)' : 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                    fontWeight: 500,
                    color: 'var(--text)',
                    lineHeight: 1,
                    minWidth: '2.5ch',
                  }}
                >
                  {s.value}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div
            custom={0.9}
            variants={slideUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="hero-ctas-list"
            style={{}}
          >
            <motion.a
              href="#projects"
              onClick={() => posthog?.capture('click_cta_work')}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem',
                padding: '0.8rem 1.2rem',
                background: 'var(--accent)',
                color: '#000',
                borderRadius: '2px',
                textDecoration: 'none',
                fontSize: '0.8rem',
                fontWeight: 600,
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              <span>{t.hero.ctaWork}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </motion.a>

            <motion.a
              href="mailto:aguirrealexis.cba@gmail.com"
              onClick={() => posthog?.capture('click_cta_contact')}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem',
                padding: '0.8rem 1.2rem',
                background: 'transparent',
                color: 'var(--text-muted)',
                border: '1px solid var(--border)',
                borderRadius: '2px',
                textDecoration: 'none',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.borderColor = 'var(--border-hover)'
                e.currentTarget.style.color = 'var(--text)'
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.color = 'var(--text-muted)'
              }}
            >
              <span>{t.hero.ctaContact}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.7 }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: '1px solid var(--border)',
          overflow: 'hidden',
          padding: '0.65rem 0',
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            width: 'max-content',
            animation: 'marquee 40s linear infinite',
          }}
        >
          {marqueeItems.map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.58rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: item === '·' ? 'var(--accent)' : 'var(--text-ghost)',
                whiteSpace: 'nowrap',
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>

    </section>
  )
}
