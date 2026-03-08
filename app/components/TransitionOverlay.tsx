'use client'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../context/ThemeContext'

type Phase = 'idle' | 'sweep-in' | 'sweep-out'

export default function TransitionOverlay() {
  const { cfg } = useTheme()
  const [phase, setPhase] = useState<Phase>('idle')
  const prevAccent = useRef(cfg.accent)
  const color = useRef(cfg.accent)

  useEffect(() => {
    if (prevAccent.current === cfg.accent) return
    color.current = cfg.accent
    prevAccent.current = cfg.accent

    setPhase('sweep-in')
    const t1 = setTimeout(() => setPhase('sweep-out'), 220)
    const t2 = setTimeout(() => setPhase('idle'), 600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [cfg.accent])

  if (phase === 'idle') return null

  return (
    <>
      {/* Horizontal scan bar */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9998,
          pointerEvents: 'none',
          transformOrigin: phase === 'sweep-in' ? 'left center' : 'right center',
          transform: phase === 'sweep-in' ? 'scaleX(1)' : 'scaleX(0)',
          background: `linear-gradient(90deg, ${color.current}00, ${color.current}22 30%, ${color.current}18 70%, ${color.current}00)`,
          transition: phase === 'sweep-in'
            ? 'transform 0.2s cubic-bezier(0.4,0,0.2,1)'
            : 'transform 0.32s cubic-bezier(0.4,0,0.2,1)',
        }}
      />

      {/* Thin leading edge line */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          top: 0, bottom: 0,
          width: '2px',
          zIndex: 9999,
          pointerEvents: 'none',
          background: color.current,
          boxShadow: `0 0 12px ${color.current}, 0 0 30px ${color.current}88`,
          left: phase === 'sweep-in' ? '100%' : '0%',
          transition: phase === 'sweep-in'
            ? 'left 0.2s cubic-bezier(0.4,0,0.2,1)'
            : 'left 0.32s cubic-bezier(0.4,0,0.2,1)',
          opacity: phase === 'sweep-out' ? 0 : 1,
        }}
      />
    </>
  )
}
