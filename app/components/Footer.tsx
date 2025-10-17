'use client'

import { Language } from '../types'

interface FooterProps {
  language: Language
}

export default function Footer({ language }: FooterProps) {
  const translations = {
    en: {
      text: 'Motiva – Daily Motivation in Arabic & English',
      made: 'Made with',
      by: 'for motivation seekers'
    },
    ar: {
      text: 'موتيفا – تحفيز يومي بالعربية والإنجليزية',
      made: 'صُنع بـ',
      by: 'لباحثي التحفيز'
    }
  }

  const t = translations[language]

  return (
    <footer className="w-full px-4 py-6 sm:py-8 border-t border-white border-opacity-20 glass">
      <div className="max-w-7xl mx-auto text-center">
        <p 
          className="text-white text-sm sm:text-base mb-2 font-semibold"
        >
          {t.text}
        </p>
        <p 
          className="text-white text-xs sm:text-sm font-medium"
        >
          {t.made} ❤️ {t.by}
        </p>
      </div>
    </footer>
  )
}

