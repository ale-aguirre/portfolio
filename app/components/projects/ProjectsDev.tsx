'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const repos = [
  {
    id: 'saku-store',
    slug: 'ale-aguirre/saku-store',
    name: 'Saku Store',
    url: 'https://saku-store.vercel.app',
    desc: 'Complete e-commerce with cart, auth, orders and admin panel. Next.js 15 with Supabase backend.',
    lang: 'TypeScript',
    langColor: '#3178c6',
    stack: ['Next.js 15', 'Supabase', 'TypeScript', 'Tailwind'],
    year: '2024',
    tag: 'E-commerce',
  },
  {
    id: 'total-limpieza',
    slug: 'ale-aguirre/total-limpieza-stock',
    name: 'Total Limpieza',
    url: 'https://total-limpieza-stock.vercel.app',
    desc: 'Stock management system with real-time barcode scanning, product tracking and sales reports.',
    lang: 'TypeScript',
    langColor: '#3178c6',
    stack: ['Next.js', 'Supabase', 'Barcode API'],
    year: '2024',
    tag: 'Internal tool',
  },
  {
    id: 'calibre',
    slug: 'ale-aguirre/calibre-studio',
    name: 'Calibre Studio',
    url: 'https://thecalibre.studio',
    desc: 'High-end landing page with internationalization (i18n), smooth animations and refined editorial design.',
    lang: 'TypeScript',
    langColor: '#3178c6',
    stack: ['Next.js', 'Framer Motion', 'i18n', 'Tailwind'],
    year: '2023',
    tag: 'Landing page',
  },
]

function RepoCard({ r, index, inView }: { r: typeof repos[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.12 + 0.2 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? 'rgba(90,158,106,0.5)' : 'var(--border)'}`,
        borderRadius: '6px',
        padding: '1.25rem 1.5rem',
        background: hovered ? 'rgba(90,158,106,0.04)' : 'var(--bg-card)',
        transition: 'all 0.25s',
        cursor: 'pointer',
      }}
    >
      <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.6rem', gap: '0.75rem' }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.02em',
              }}>
                {r.slug.split('/')[0]} /
              </span>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: hovered ? '#5a9e6a' : 'var(--text)',
                transition: 'color 0.2s',
              }}>
                {r.slug.split('/')[1]}
              </span>
            </div>
            <span style={{
              display: 'inline-block',
              padding: '0.1rem 0.5rem',
              border: '1px solid var(--border)',
              borderRadius: '20px',
              fontSize: '0.55rem',
              letterSpacing: '0.08em',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-body)',
            }}>{r.tag}</span>
          </div>
          <span style={{
            fontSize: '1rem',
            color: hovered ? '#5a9e6a' : 'var(--text-muted)',
            transition: 'color 0.2s, transform 0.2s',
            transform: hovered ? 'rotate(-45deg)' : 'none',
            flexShrink: 0,
          }}>↗</span>
        </div>

        {/* Description */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.82rem',
          color: 'var(--text-muted)',
          lineHeight: 1.6,
          marginBottom: '1rem',
        }}>{r.desc}</p>

        {/* Stack */}
        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          {r.stack.map(t => (
            <span key={t} style={{
              fontSize: '0.6rem',
              padding: '0.18rem 0.55rem',
              borderRadius: '3px',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.03em',
              background: hovered ? 'rgba(90,158,106,0.06)' : 'transparent',
              transition: 'background 0.2s',
            }}>{t}</span>
          ))}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: r.langColor }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>{r.lang}</span>
          </div>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>{r.year}</span>
        </div>
      </a>
    </motion.div>
  )
}

export default function ProjectsDev() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '2rem',
          padding: '0.75rem 1rem',
          background: 'rgba(90,158,106,0.06)',
          border: '1px solid rgba(90,158,106,0.15)',
          borderRadius: '4px',
        }}
      >
        <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#5a9e6a' }}>ale-aguirre</span>
        <span style={{ color: 'var(--text-muted)', fontFamily: 'monospace', fontSize: '0.75rem' }}>/</span>
        <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--text-muted)' }}>repositories</span>
        <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
          3 public · TypeScript
        </span>
      </motion.div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1rem',
      }}>
        {repos.map((r, i) => (
          <RepoCard key={r.id} r={r} index={i} inView={inView} />
        ))}
      </div>
    </div>
  )
}
