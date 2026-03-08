'use client'
import dynamic from 'next/dynamic'
import { useTheme } from '../context/ThemeContext'

const BgAI = dynamic(() => import('./bg/BgAI'), { ssr: false })
const BgDev = dynamic(() => import('./bg/BgDev'), { ssr: false })
const BgGaming = dynamic(() => import('./bg/BgGaming'), { ssr: false })

export default function FloatingShape() {
  const { mode } = useTheme()

  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {mode === 'ai' && <BgAI />}
      {mode === 'developer' && <BgDev />}
      {mode === 'gaming' && <BgGaming />}
    </div>
  )
}
