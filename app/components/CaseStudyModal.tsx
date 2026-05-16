'use client'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useInView, animate } from 'framer-motion'
import type { Lang } from '../lib/translations'

export type CaseStudy = {
  client: string
  industry: { en: string; es: string }
  tagline: { en: string; es: string }
  challenge: { en: string; es: string }
  solution: { en: string; es: string }
  pipeline: Array<{ step: string; desc: { en: string; es: string } }>
  metrics: Array<{ value: string; label: { en: string; es: string } }>
  stackGrouped: { label: { en: string; es: string }; items: string[] }[]
  learnings: { en: string[]; es: string[] }
  beforeAfter?: {
    before: { title: { en: string; es: string }; items: { en: string; es: string }[] }
    after: { title: { en: string; es: string }; items: { en: string; es: string }[] }
  }
  heroSplit?: {
    left: { value: string; label: { en: string; es: string } }
    right: { value: string; label: { en: string; es: string } }
    ratio: number  // 0..1, portion taken by LEFT
  }
}

type LenisLike = { stop: () => void; start: () => void }

const COPY = {
  en: {
    caseStudy: 'Case study',
    client: 'Client',
    industry: 'Industry',
    pipeline: 'How it works',
    stack: 'Stack',
    learnings: 'What I learned',
    close: 'Close',
    before: 'Before',
    after: 'After',
  },
  es: {
    caseStudy: 'Case study',
    client: 'Cliente',
    industry: 'Industria',
    pipeline: 'Cómo funciona',
    stack: 'Stack',
    learnings: 'Lo que aprendí',
    close: 'Cerrar',
    before: 'Antes',
    after: 'Después',
  },
}

type Props = {
  open: boolean
  onClose: () => void
  caseStudy: CaseStudy
  projectName: string
  tagColor: string
  lang: Lang
}

export default function CaseStudyModal({ open, onClose, caseStudy, projectName, tagColor, lang }: Props) {
  const c = COPY[lang]
  const scrollRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!open) return
    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis
    lenis?.stop()
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      lenis?.start()
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!mounted) return null

  const tree = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: `radial-gradient(circle at 50% 0%, ${tagColor}22 0%, rgba(5,5,8,0.93) 55%)`,
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: 'clamp(1rem,3vw,2rem)',
            overflow: 'hidden',
          }}
        >
          <motion.div
            ref={scrollRef}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
            onWheelCapture={(e) => e.stopPropagation()}
            onTouchMoveCapture={(e) => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: '960px',
              maxHeight: 'calc(100vh - clamp(2rem,6vw,4rem))',
              marginTop: 'clamp(2vh, 4vh, 6vh)',
              overflowY: 'auto',
              overflowX: 'hidden',
              overscrollBehavior: 'contain',
              background: 'linear-gradient(180deg, rgba(13,13,18,0.97) 0%, rgba(8,8,12,0.99) 100%)',
              border: `1px solid ${tagColor}60`,
              borderRadius: '12px',
              boxShadow: `
                0 0 0 1px ${tagColor}30,
                0 50px 120px rgba(0,0,0,0.85),
                0 0 140px ${tagColor}25
              `,
              position: 'relative',
            }}
          >
            <TopBar tagColor={tagColor} label={c.close} onClose={onClose} />

            <div style={{
              padding: 'clamp(1.75rem,4vw,3rem) clamp(1.25rem,4vw,2.5rem) clamp(2.5rem,6vw,4rem)',
              display: 'flex', flexDirection: 'column',
              gap: 'clamp(2.5rem,5vw,3.5rem)',
            }}>

              <Header projectName={projectName} caseStudy={caseStudy} c={c} lang={lang} tagColor={tagColor} />

              {caseStudy.heroSplit && (
                <StaggerIn delay={0.25}>
                  <HeroSplit data={caseStudy.heroSplit} lang={lang} tagColor={tagColor} />
                </StaggerIn>
              )}

              {caseStudy.beforeAfter && (
                <StaggerIn delay={0.4}>
                  <BeforeAfter data={caseStudy.beforeAfter} lang={lang} tagColor={tagColor} c={c} />
                </StaggerIn>
              )}

              {caseStudy.metrics.length > 0 && (
                <StaggerIn delay={0.55}>
                  <MetricsGrid metrics={caseStudy.metrics} lang={lang} tagColor={tagColor} />
                </StaggerIn>
              )}

              <StaggerIn delay={0.7}>
                <PipelineStepper steps={caseStudy.pipeline} lang={lang} tagColor={tagColor} title={c.pipeline} />
              </StaggerIn>

              <StaggerIn delay={0.85}>
                <StackBlock groups={caseStudy.stackGrouped} lang={lang} tagColor={tagColor} title={c.stack} />
              </StaggerIn>

              <StaggerIn delay={1.0}>
                <LearningsGrid items={caseStudy.learnings[lang]} tagColor={tagColor} title={c.learnings} />
              </StaggerIn>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return createPortal(tree, document.body)
}

// --- Top bar -----------------------------------------------------------

function TopBar({ tagColor, label, onClose }: { tagColor: string; label: string; onClose: () => void }) {
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 5,
      height: 'clamp(2.6rem, 5vw, 3rem)',
      background: 'linear-gradient(180deg, rgba(9,9,13,0.96) 0%, rgba(9,9,13,0.65) 100%)',
      backdropFilter: 'blur(10px)',
      borderBottom: `1px solid ${tagColor}25`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 clamp(0.75rem,2vw,1.25rem)',
    }}>
      <div style={{
        flex: 1, height: '2px', marginRight: '1rem',
        background: `linear-gradient(90deg, ${tagColor} 0%, ${tagColor}80 40%, transparent 100%)`,
      }} />
      <button
        onClick={onClose}
        aria-label={label}
        style={{
          width: 'clamp(32px, 4vw, 36px)',
          height: 'clamp(32px, 4vw, 36px)',
          background: 'rgba(255,255,255,0.04)',
          border: `1px solid ${tagColor}50`,
          borderRadius: '6px',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-mono)', fontSize: '1.15rem',
          transition: 'color .15s, border-color .15s, background .15s, transform .15s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = tagColor; e.currentTarget.style.borderColor = tagColor; e.currentTarget.style.background = `${tagColor}18`; e.currentTarget.style.transform = 'scale(1.05)' }}
        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = `${tagColor}50`; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.transform = 'scale(1)' }}
      >
        ×
      </button>
    </div>
  )
}

// --- Header ------------------------------------------------------------

function Header({ projectName, caseStudy, c, lang, tagColor }: {
  projectName: string
  caseStudy: CaseStudy
  c: typeof COPY['en']
  lang: Lang
  tagColor: string
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}
    >
      <span style={{
        display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: '0.45rem',
        padding: '0.3rem 0.75rem',
        background: `${tagColor}18`,
        border: `1px solid ${tagColor}50`,
        borderRadius: '20px',
        fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
        letterSpacing: '0.22em', textTransform: 'uppercase',
        color: tagColor,
      }}>
        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: tagColor, boxShadow: `0 0 8px ${tagColor}` }} />
        {c.caseStudy}
      </span>
      <h2 style={{
        fontFamily: 'var(--font-head)',
        fontSize: 'clamp(2rem, 5vw, 3.2rem)',
        fontWeight: 500, color: 'var(--text)',
        lineHeight: 1.02, letterSpacing: '-0.025em',
      }}>
        {projectName}
      </h2>
      <p style={{
        fontFamily: 'var(--font-head)',
        fontSize: 'clamp(1rem, 2.1vw, 1.25rem)',
        fontWeight: 300, color: 'var(--text-muted)',
        lineHeight: 1.4, letterSpacing: '-0.01em',
        maxWidth: '52ch',
      }}>
        {caseStudy.tagline[lang]}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.4rem' }}>
        <Pill label={c.client} value={caseStudy.client} tagColor={tagColor} />
        <Pill label={c.industry} value={caseStudy.industry[lang]} tagColor={tagColor} />
      </div>
    </motion.header>
  )
}

// --- HeroSplit: animated 99/1 bar -------------------------------------

function HeroSplit({ data, lang, tagColor }: { data: NonNullable<CaseStudy['heroSplit']>; lang: Lang; tagColor: string }) {
  const ratio = data.ratio
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <div ref={ref} style={{
      position: 'relative',
      padding: 'clamp(1.5rem,3vw,2rem)',
      border: `1px solid ${tagColor}30`,
      borderRadius: '10px',
      background: `linear-gradient(135deg, ${tagColor}10 0%, rgba(255,255,255,0.01) 60%)`,
      overflow: 'hidden',
    }}>
      {/* decorative glow */}
      <div style={{
        position: 'absolute', top: '-40%', right: '-10%',
        width: '300px', height: '300px',
        background: `radial-gradient(circle, ${tagColor}20 0%, transparent 65%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.25rem', gap: '1rem', position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <CountUp from={0} to={parseFloat(data.left.value)} suffix={data.left.value.replace(/[0-9.]/g, '')} start={inView} style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 7vw, 5rem)',
            fontWeight: 400, color: tagColor, lineHeight: 0.9,
            letterSpacing: '-0.04em',
            textShadow: `0 0 50px ${tagColor}50`,
          }} />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
            color: 'var(--text-muted)', letterSpacing: '0.04em',
          }}>{data.left.label[lang]}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: 'flex-end', textAlign: 'right' }}>
          <CountUp from={0} to={parseFloat(data.right.value)} suffix={data.right.value.replace(/[0-9.]/g, '')} start={inView} style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 400, color: 'var(--text-muted)', lineHeight: 0.9,
            letterSpacing: '-0.03em',
          }} />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
            color: 'var(--text-ghost)', letterSpacing: '0.04em',
          }}>{data.right.label[lang]}</span>
        </div>
      </div>

      {/* Split bar */}
      <div style={{
        position: 'relative',
        width: '100%', height: '14px',
        background: 'rgba(255,255,255,0.04)',
        borderRadius: '7px',
        overflow: 'hidden',
        border: `1px solid ${tagColor}20`,
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${ratio * 100}%` } : { width: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          style={{
            height: '100%',
            background: `linear-gradient(90deg, ${tagColor} 0%, ${tagColor}cc 100%)`,
            boxShadow: `0 0 20px ${tagColor}80, inset 0 1px 0 rgba(255,255,255,0.2)`,
            position: 'relative',
          }}
        >
          {/* Animated shine */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={inView ? { x: '100%' } : { x: '-100%' }}
            transition={{ duration: 1.6, ease: 'easeOut', delay: 0.4 }}
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}

// --- CountUp animated number ------------------------------------------

function CountUp({ from, to, suffix, start, style }: { from: number; to: number; suffix?: string; start: boolean; style: React.CSSProperties }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    if (!start || !ref.current) return
    const controls = animate(from, to, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) {
          const rounded = Number.isInteger(to) ? Math.round(v) : v.toFixed(1)
          ref.current.textContent = `${rounded}${suffix ?? ''}`
        }
      },
    })
    return () => controls.stop()
  }, [start, from, to, suffix])
  return <span ref={ref} style={style}>{`${from}${suffix ?? ''}`}</span>
}

// --- Before / After ----------------------------------------------------

function BeforeAfter({ data, lang, tagColor, c }: { data: NonNullable<CaseStudy['beforeAfter']>; lang: Lang; tagColor: string; c: typeof COPY['en'] }) {
  return (
    <div className="case-ba-grid" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '1rem',
      position: 'relative',
    }}>
      <BACard
        kind="before"
        label={c.before}
        title={data.before.title[lang]}
        items={data.before.items.map(i => i[lang])}
        tagColor={tagColor}
      />

      {/* Animated transformation glyph */}
      <FlowGlyph tagColor={tagColor} />

      <BACard
        kind="after"
        label={c.after}
        title={data.after.title[lang]}
        items={data.after.items.map(i => i[lang])}
        tagColor={tagColor}
      />

      <style jsx>{`
        @media (min-width: 580px) {
          .case-ba-grid {
            grid-template-columns: 1fr auto 1fr;
            align-items: center;
          }
        }
      `}</style>
    </div>
  )
}

function FlowGlyph({ tagColor }: { tagColor: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  return (
    <div ref={ref} style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '0.5rem 0.25rem',
      minWidth: '48px',
    }}>
      <svg width="62" height="32" viewBox="0 0 62 32" fill="none" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="flowGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={tagColor} stopOpacity="0" />
            <stop offset="40%" stopColor={tagColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={tagColor} stopOpacity="1" />
          </linearGradient>
          <filter id="flowGlow">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Draw line */}
        <motion.line
          x1="2" y1="16" x2="50" y2="16"
          stroke="url(#flowGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#flowGlow)"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Arrowhead */}
        <motion.polyline
          points="44,10 52,16 44,22"
          stroke={tagColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#flowGlow)"
          initial={{ opacity: 0, x: -4 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -4 }}
          transition={{ duration: 0.35, delay: 0.7, ease: 'easeOut' }}
        />
        {/* Particle that travels along */}
        <motion.circle
          cx="2" cy="16" r="2.5"
          fill={tagColor}
          filter="url(#flowGlow)"
          initial={{ cx: 2, opacity: 0 }}
          animate={inView ? { cx: [2, 50, 50], opacity: [0, 1, 0] } : { cx: 2, opacity: 0 }}
          transition={{ duration: 1.2, delay: 1.0, repeat: Infinity, repeatDelay: 1.4, times: [0, 0.7, 1], ease: 'easeInOut' }}
        />
      </svg>
    </div>
  )
}

function BACard({ kind, label, title, items, tagColor }: { kind: 'before' | 'after'; label: string; title: string; items: string[]; tagColor: string }) {
  const isAfter = kind === 'after'
  const cardColor = isAfter ? tagColor : '#475569'
  return (
    <div style={{
      padding: 'clamp(1.1rem,2.5vw,1.6rem)',
      border: `1px solid ${cardColor}40`,
      borderRadius: '8px',
      background: isAfter
        ? `linear-gradient(160deg, ${tagColor}12 0%, rgba(255,255,255,0.01) 70%)`
        : 'linear-gradient(160deg, rgba(71,85,105,0.08) 0%, rgba(255,255,255,0.01) 70%)',
      display: 'flex', flexDirection: 'column', gap: '0.85rem',
      position: 'relative',
      filter: isAfter ? 'none' : 'saturate(0.5)',
      opacity: isAfter ? 1 : 0.85,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: cardColor, opacity: 0.9,
        }}>{label}</span>
        <BAIcon kind={kind} color={cardColor} />
      </div>
      <h4 style={{
        fontFamily: 'var(--font-head)', fontSize: '1.05rem',
        fontWeight: 500, color: 'var(--text)', letterSpacing: '-0.01em',
        lineHeight: 1.3,
      }}>{title}</h4>
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.1rem' }}>
        {items.map((item, i) => (
          <li key={i} style={{
            display: 'flex', gap: '0.55rem', alignItems: 'flex-start',
            fontFamily: 'var(--font-body)', fontSize: '0.82rem',
            color: isAfter ? 'var(--text)' : 'var(--text-muted)',
            fontWeight: 300, lineHeight: 1.5,
          }}>
            <span style={{
              width: '4px', height: '4px', borderRadius: '50%',
              background: cardColor, opacity: 0.7, flexShrink: 0,
              marginTop: '0.55em',
            }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function BAIcon({ kind, color }: { kind: 'before' | 'after'; color: string }) {
  if (kind === 'before') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <rect x="3" y="4" width="8" height="10" rx="1" transform="rotate(-6 7 9)" />
        <rect x="13" y="7" width="8" height="10" rx="1" transform="rotate(8 17 12)" />
        <rect x="6" y="11" width="8" height="10" rx="1" transform="rotate(-3 10 16)" />
      </svg>
    )
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <rect x="7" y="3" width="11" height="18" rx="1.5" />
      <line x1="10" y1="8" x2="15" y2="8" />
      <line x1="10" y1="12" x2="15" y2="12" />
      <line x1="10" y1="16" x2="13" y2="16" />
    </svg>
  )
}

// --- Metrics grid ------------------------------------------------------

function MetricsGrid({ metrics, lang, tagColor }: { metrics: CaseStudy['metrics']; lang: Lang; tagColor: string }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fit, minmax(165px, 1fr))`,
      gap: '0.75rem',
    }}>
      {metrics.map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            padding: '1.1rem 1.2rem',
            border: `1px solid ${tagColor}30`,
            borderRadius: '6px',
            background: `linear-gradient(135deg, ${tagColor}10 0%, ${tagColor}03 100%)`,
            display: 'flex', flexDirection: 'column', gap: '0.4rem',
            position: 'relative', overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute', top: 0, right: 0, width: '90px', height: '90px',
            background: `radial-gradient(circle, ${tagColor}28 0%, transparent 70%)`,
            transform: 'translate(30%,-30%)',
            pointerEvents: 'none',
          }} />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(1.15rem, 2.2vw, 1.55rem)',
            fontWeight: 500, color: tagColor, lineHeight: 1,
            textShadow: `0 0 25px ${tagColor}40`,
            position: 'relative', zIndex: 1,
          }}>{m.value}</span>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '0.74rem',
            color: 'var(--text-muted)', lineHeight: 1.4, fontWeight: 300,
            position: 'relative', zIndex: 1,
          }}>{m.label[lang]}</span>
        </motion.div>
      ))}
    </div>
  )
}

// --- Pipeline horizontal stepper --------------------------------------

const STEP_ICONS = [
  // 01 Ingest
  (color: string) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v12" /><polyline points="7 10 12 15 17 10" /><line x1="4" y1="20" x2="20" y2="20" />
    </svg>
  ),
  // 02 Extract
  (color: string) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="6" /><line x1="16" y1="16" x2="21" y2="21" /><line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  ),
  // 03 Match
  (color: string) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a4 4 0 0 0 5.66 0l3-3a4 4 0 1 0-5.66-5.66l-1.5 1.5" />
      <path d="M14 11a4 4 0 0 0-5.66 0l-3 3a4 4 0 1 0 5.66 5.66l1.5-1.5" />
    </svg>
  ),
  // 04 Compare
  (color: string) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="3" x2="12" y2="21" />
      <path d="M5 8h4l-2 5 5-5 4 6h3" />
    </svg>
  ),
  // 05 Generate
  (color: string) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="13" y2="17" />
    </svg>
  ),
]

function PipelineStepper({ steps, lang, tagColor, title }: { steps: CaseStudy['pipeline']; lang: Lang; tagColor: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const [activeIdx, setActiveIdx] = useState(0)

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <SectionTitle title={title} tagColor={tagColor} />

      <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Track + dots */}
        <div style={{ position: 'relative', padding: '0.5rem 0' }}>
          {/* Background line */}
          <div style={{
            position: 'absolute', top: '50%', left: '5%', right: '5%',
            height: '2px',
            background: 'rgba(255,255,255,0.05)',
            transform: 'translateY(-50%)',
          }} />
          {/* Animated fill */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute', top: '50%', left: '5%', right: '5%',
              height: '2px',
              background: `linear-gradient(90deg, ${tagColor} 0%, ${tagColor}80 100%)`,
              boxShadow: `0 0 12px ${tagColor}80`,
              transform: 'translateY(-50%)',
              transformOrigin: 'left center',
            }}
          />

          {/* Step nodes */}
          <div style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
            gap: '0.5rem',
          }}>
            {steps.map((s, i) => {
              const IconRenderer = STEP_ICONS[i] ?? STEP_ICONS[0]
              const isActive = i === activeIdx
              return (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  onMouseEnter={() => setActiveIdx(i)}
                  style={{
                    background: 'transparent', border: 'none',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                    cursor: 'pointer', padding: 0,
                  }}
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ delay: 0.3 + i * 0.18, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      width: 'clamp(38px,5vw,46px)', height: 'clamp(38px,5vw,46px)',
                      borderRadius: '50%',
                      background: isActive
                        ? `radial-gradient(circle, ${tagColor} 0%, ${tagColor}cc 100%)`
                        : 'rgba(9,9,13,0.95)',
                      border: `2px solid ${tagColor}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: isActive
                        ? `0 0 0 5px rgba(9,9,13,0.95), 0 0 24px ${tagColor}90, inset 0 0 8px rgba(255,255,255,0.2)`
                        : `0 0 0 4px rgba(9,9,13,0.95)`,
                      transition: 'background .25s, box-shadow .25s',
                      position: 'relative', zIndex: 1,
                    }}
                  >
                    <div style={{ width: '18px', height: '18px', color: isActive ? '#000' : tagColor }}>
                      {IconRenderer(isActive ? '#000' : tagColor)}
                    </div>
                  </motion.div>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    color: isActive ? tagColor : 'var(--text-ghost)',
                    transition: 'color .25s',
                    fontWeight: isActive ? 500 : 400,
                  }}>{s.step}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Active step description */}
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            padding: '1.1rem 1.25rem',
            border: `1px solid ${tagColor}30`,
            borderRadius: '6px',
            background: `${tagColor}06`,
            display: 'flex', gap: '0.85rem', alignItems: 'flex-start',
          }}
        >
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            color: tagColor, fontWeight: 500,
            padding: '0.18rem 0.45rem',
            background: `${tagColor}18`,
            borderRadius: '3px',
            flexShrink: 0,
          }}>0{activeIdx + 1}</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.85rem',
              color: 'var(--text)', fontWeight: 500,
            }}>{steps[activeIdx].step}</span>
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '0.88rem',
              color: 'var(--text-muted)', lineHeight: 1.6, fontWeight: 300,
            }}>{steps[activeIdx].desc[lang]}</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// --- Stack -------------------------------------------------------------

function StackBlock({ groups, lang, tagColor, title }: { groups: CaseStudy['stackGrouped']; lang: Lang; tagColor: string; title: string }) {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
      <SectionTitle title={title} tagColor={tagColor} />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '0.6rem',
      }}>
        {groups.map((g, i) => (
          <div key={i} style={{
            padding: '0.85rem 1rem',
            border: '1px solid var(--border)',
            borderRadius: '5px',
            background: 'rgba(255,255,255,0.015)',
            display: 'flex', flexDirection: 'column', gap: '0.55rem',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: tagColor,
            }}>{g.label[lang]}</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
              {g.items.map(s => (
                <span key={s} style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                  padding: '0.2rem 0.55rem', borderRadius: '3px',
                  border: `1px solid ${tagColor}25`,
                  color: 'var(--text)',
                  background: `${tagColor}08`,
                }}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// --- Learnings grid ----------------------------------------------------

function LearningsGrid({ items, tagColor, title }: { items: string[]; tagColor: string; title: string }) {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <SectionTitle title={title} tagColor={tagColor} />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(255px, 1fr))',
        gap: '0.65rem',
      }}>
        {items.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              padding: '0.95rem 1.05rem',
              border: `1px solid ${tagColor}25`,
              borderRadius: '6px',
              background: `linear-gradient(160deg, ${tagColor}08 0%, rgba(255,255,255,0.01) 60%)`,
              display: 'flex', gap: '0.7rem', alignItems: 'flex-start',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={tagColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '3px', flexShrink: 0 }}>
              <path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 2a7 7 0 0 0-4 12.5V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.5A7 7 0 0 0 12 2z" />
            </svg>
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '0.84rem',
              color: 'var(--text)', fontWeight: 300, lineHeight: 1.55,
            }}>{l}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// --- Shared --------------------------------------------------------------

function SectionTitle({ title, tagColor }: { title: string; tagColor: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
      <h3 style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
        letterSpacing: '0.24em', textTransform: 'uppercase',
        color: tagColor, fontWeight: 500,
      }}>{title}</h3>
      <div style={{
        flex: 1, height: '1px',
        background: `linear-gradient(90deg, ${tagColor}80, ${tagColor}10 50%, transparent 100%)`,
      }} />
    </div>
  )
}

function Pill({ label, value, tagColor }: { label: string; value: string; tagColor: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
      padding: '0.4rem 0.75rem',
      background: 'rgba(255,255,255,0.025)',
      border: '1px solid var(--border)',
      borderRadius: '4px',
      fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
    }}>
      <span style={{ color: tagColor, opacity: 0.85, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.58rem' }}>{label}</span>
      <span style={{ color: 'var(--text)', fontWeight: 400 }}>{value}</span>
    </span>
  )
}

// --- StaggerIn wrapper: cascade entrance on modal open ----------------

function StaggerIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
