'use client'

import { Language } from '../types'
import { Globe, Heart, Search } from 'lucide-react'
import Link from 'next/link'

interface HeaderProps {
  language: Language
  onLanguageChange: (language: Language) => void
  showFavoritesLink?: boolean
}

export default function Header({ language, onLanguageChange, showFavoritesLink = true }: HeaderProps) {
  const translations = {
    en: {
      title: 'Motiva',
      switchTo: 'العربية',
      favorites: 'Favorites'
    },
    ar: {
      title: 'موتيفا',
      switchTo: 'English',
      favorites: 'المفضلة'
    }
  }

  const t = translations[language]

  return (
    <header className="w-full px-4 py-3 sm:py-4 glass border-b border-white border-opacity-20 sticky top-0 z-50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="hover:opacity-80 transition-all duration-300 hover:scale-105">
          <h1 className={`text-2xl sm:text-3xl font-extrabold text-white tracking-tight ${language === 'ar' ? 'font-cairo' : ''}`} style={{
            fontFamily: language === 'ar' ? 'Cairo, system-ui, sans-serif' : 'system-ui, -apple-system, sans-serif',
            letterSpacing: '-0.02em'
          }}>
            {t.title}
          </h1>
        </Link>
        
        <div className="flex items-center space-x-2 sm:space-x-3 rtl:space-x-reverse">
          <Link
            href="/search"
            className="flex items-center justify-center p-2 glass hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-300 border border-white border-opacity-30"
            aria-label="Search quotes"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-cambridge-blue" />
          </Link>

          {showFavoritesLink && (
            <Link
              href="/favorites"
              className="flex items-center space-x-2 rtl:space-x-reverse px-3 sm:px-4 py-2 glass hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-300 border border-white border-opacity-30"
              aria-label={t.favorites}
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-jungle-green" />
              <span className="text-white font-medium text-sm sm:text-base hidden sm:inline">
                {t.favorites}
              </span>
            </Link>
          )}
          
          <button
            onClick={() => onLanguageChange(language === 'en' ? 'ar' : 'en')}
            className="flex items-center space-x-2 rtl:space-x-reverse px-3 sm:px-4 py-2 glass hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-300 border border-white border-opacity-30"
            aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
          >
            <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-cambridge-blue" />
            <span className="text-white font-medium text-sm sm:text-base">
              {t.switchTo}
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}

