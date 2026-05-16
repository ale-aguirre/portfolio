'use client'
import { useEffect, useRef, useState, CSSProperties } from 'react'

const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#§$%&░▒▓'

type Props = {
  children: string
  duration?: number
  className?: string
  style?: CSSProperties
}

export default function ScrambleText({ children: text, duration = 480, className, style }: Props) {
  const [display, setDisplay] = useState(text)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      setDisplay(text)
      return
    }

    const totalFrames = Math.max(text.length, 8)
    const frameDuration = Math.max(16, duration / totalFrames)
    let frame = 0

    const id = setInterval(() => {
      frame++
      const settled = Math.floor((frame / totalFrames) * text.length)
      let next = ''
      for (let i = 0; i < text.length; i++) {
        const ch = text[i]
        if (i < settled) next += ch
        else if (ch === ' ' || ch === '\n' || ch === '\t' || ch === '·') next += ch
        else next += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
      }
      setDisplay(next)
      if (frame >= totalFrames) {
        clearInterval(id)
        setDisplay(text)
      }
    }, frameDuration)

    return () => clearInterval(id)
  }, [text, duration])

  return <span className={className} style={style}>{display}</span>
}
