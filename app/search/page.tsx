'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Search, X } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Quote, Language } from '../types'
import { quotes } from '../data/quotes'

export default function SearchPage() {
  const [language, setLanguage] = useState<Language>('en')
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<Quote[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const translations = {
    en: {
      title: 'Search Quotes',
      placeholder: 'Search by quote text or author...',
      results: 'results found',
      noResults: 'No quotes found',
      tryDifferent: 'Try a different search term',
      categories: {
        all: 'All',
        motivation: 'Motivation',
        success: 'Success',
        wisdom: 'Wisdom',
        study: 'Study',
        life_lessons: 'Life Lessons'
      }
    },
    ar: {
      title: 'البحث في الاقتباسات',
      placeholder: 'البحث بنص الاقتباس أو المؤلف...',
      results: 'نتيجة',
      noResults: 'لم يتم العثور على اقتباسات',
      tryDifferent: 'جرب مصطلح بحث مختلف',
      categories: {
        all: 'الكل',
        motivation: 'تحفيز',
        success: 'نجاح',
        wisdom: 'حكمة',
        study: 'دراسة',
        life_lessons: 'دروس الحياة'
      }
    }
  }

  const t = translations[language]

  useEffect(() => {
    const savedLanguage = localStorage.getItem('motiva-language') || localStorage.getItem('inspireme-language')
    if (savedLanguage) {
      setLanguage(savedLanguage as Language)
    }
  }, [])

  useEffect(() => {
    if (searchTerm.trim().length < 2) {
      setResults([])
      return
    }

    setIsSearching(true)
    const timer = setTimeout(() => {
      const searchLower = searchTerm.toLowerCase()
      const filteredQuotes = quotes[language].filter(
        quote =>
          quote.text.toLowerCase().includes(searchLower) ||
          quote.author.toLowerCase().includes(searchLower)
      )
      setResults(filteredQuotes)
      setIsSearching(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm, language])

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem('motiva-language', newLanguage)
    setSearchTerm('')
    setResults([])
  }

  return (
    <div className="min-h-screen flex flex-col" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header language={language} onLanguageChange={handleLanguageChange} />
      
      <main className="flex-1 px-4 py-6 sm:py-8 max-w-4xl mx-auto w-full">
        <Link 
          href="/"
          className="inline-flex items-center space-x-2 rtl:space-x-reverse text-cambridge-blue hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>

        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{t.title}</h1>
          
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cambridge-blue" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.placeholder}
              className="w-full pl-12 rtl:pl-4 rtl:pr-12 pr-12 py-4 glass rounded-2xl text-white placeholder-cambridge-blue focus:outline-none focus:ring-2 focus:ring-caribbean-current text-lg"
              autoFocus
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 rtl:right-auto rtl:left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-cambridge-blue transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {searchTerm && (
            <p className="text-cambridge-blue mt-3 text-sm">
              {isSearching ? 'Searching...' : `${results.length} ${t.results}`}
            </p>
          )}
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <div className="space-y-4">
            {results.map((quote) => (
              <div key={quote.id} className="card p-5 sm:p-6 hover:shadow-2xl transition-shadow">
                <blockquote className={`text-lg text-white mb-3 leading-relaxed ${language === 'ar' ? 'font-cairo' : 'quote-text'}`}>
                  "{quote.text}"
                </blockquote>
                <p className={`text-sm text-cambridge-blue font-semibold mb-2 ${language === 'ar' ? 'font-cairo' : 'author-text'}`}>
                  — {quote.author}
                </p>
                <span className="text-xs bg-caribbean-current text-white px-3 py-1 rounded-full">
                  {t.categories[quote.category]}
                </span>
              </div>
            ))}
          </div>
        ) : searchTerm.trim().length >= 2 && !isSearching ? (
          <div className="card p-8 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-white mb-2">{t.noResults}</h3>
            <p className="text-cambridge-blue">{t.tryDifferent}</p>
          </div>
        ) : null}
      </main>

      <Footer language={language} />
    </div>
  )
}


