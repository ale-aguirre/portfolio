'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let x = 0, y = 0, rx = 0, ry = 0, raf: number

    const move = (e: MouseEvent) => { x = e.clientX; y = e.clientY }
    window.addEventListener('mousemove', move)

    const loop = () => {
      rx += (x - rx) * 0.22
      ry += (y - ry) * 0.22
      if (dotRef.current)  { dotRef.current.style.left  = x  + 'px'; dotRef.current.style.top  = y  + 'px' }
      if (ringRef.current) { ringRef.current.style.left = rx + 'px'; ringRef.current.style.top = ry + 'px' }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf) }
  }, [])

  return (
    <div className="cursor" aria-hidden>
      <div ref={dotRef}  className="cursor-dot"  style={{ position: 'fixed' }} />
      <div ref={ringRef} className="cursor-ring" style={{ position: 'fixed' }} />
    </div>
  )
}
