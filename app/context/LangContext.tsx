'use client'
import { createContext, useContext, useState, ReactNode } from 'react'
import type { Lang } from '../lib/translations'
import { translations } from '../lib/translations'

type LangContextType = {
  lang: Lang
  setLang: (l: Lang) => void
  t: typeof translations[Lang]
}

const LangContext = createContext<LangContextType>({
  lang: 'en',
  setLang: () => {},
  t: translations['en'],
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
