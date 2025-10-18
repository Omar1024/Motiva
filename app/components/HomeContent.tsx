'use client'

import { useState, useEffect } from 'react'
import Header from './Header'
import QuoteSection from './QuoteSection'
import Footer from './Footer'
import { useToast } from './ToastProvider'
import { Quote, Language, Category, FavoriteQuote } from '../types'
import { quotes } from '../data/quotes'
import { db } from '../utils/db'
import { shouldUpdateQuoteOfDay } from '../utils/time'

export default function HomeContent() {
  const [language, setLanguage] = useState<Language>('en')
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null)
  const [usedQuotes, setUsedQuotes] = useState<Set<string>>(new Set())
  const [favorites, setFavorites] = useState<Map<string, FavoriteQuote>>(new Map())
  const [ratings, setRatings] = useState<Map<string, number>>(new Map())
  const [isLoading, setIsLoading] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<Category>('all')
  const [quoteOfDay, setQuoteOfDay] = useState<Quote | null>(null)
  const [statistics, setStatistics] = useState({
    totalViewed: 0,
    totalFavorited: 0,
    totalRated: 0
  })
  
  const { showToast } = useToast()

  // Load saved data from IndexedDB and localStorage on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Initialize database without strict timeout for better mobile support
        await db.init()
        
        // Migrate from localStorage if needed
        await db.migrateFromLocalStorage()
        
        // Load favorites from IndexedDB
        const favArray = await db.getAllFavorites()
        const favMap = new Map(favArray.map(fav => [fav.id, fav]))
        setFavorites(favMap)
        
        // Load ratings from IndexedDB
        const ratingsMap = await db.getAllRatings()
        setRatings(ratingsMap)
        
        // Load language preference
        const savedLanguage = localStorage.getItem('motiva-language') || localStorage.getItem('inspireme-language')
        if (savedLanguage) {
          setLanguage(savedLanguage as Language)
        }
        
        // Load statistics
        const savedStats = localStorage.getItem('motiva-statistics') || localStorage.getItem('inspireme-statistics')
        if (savedStats) {
          setStatistics(JSON.parse(savedStats))
        }
        
        // Check if Quote of the Day needs to be updated (12 PM Egyptian time)
        const savedQuoteOfDay = localStorage.getItem('motiva-quote-of-day') || localStorage.getItem('inspireme-quote-of-day')
        const savedQuoteOfDayTimestamp = localStorage.getItem('motiva-quote-of-day-timestamp')
        
        const lastUpdateTimestamp = savedQuoteOfDayTimestamp ? parseInt(savedQuoteOfDayTimestamp) : null
        
        if (savedQuoteOfDay && !shouldUpdateQuoteOfDay(lastUpdateTimestamp)) {
          setQuoteOfDay(JSON.parse(savedQuoteOfDay))
        } else {
          // Generate new Quote of the Day (resets at 12 PM Egyptian time)
          const randomQuote = quotes[savedLanguage as Language || 'en'][
            Math.floor(Math.random() * quotes[savedLanguage as Language || 'en'].length)
          ]
          setQuoteOfDay(randomQuote)
          localStorage.setItem('motiva-quote-of-day', JSON.stringify(randomQuote))
          localStorage.setItem('motiva-quote-of-day-timestamp', Date.now().toString())
        }
      } catch (error) {
        console.error('Error loading data:', error)
        // Show toast only if showToast is available
        if (showToast) {
          showToast('Failed to load saved data. Starting fresh.', 'error')
        }
        // Continue with default state - app won't crash
      }
    }
    
    loadData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Update statistics when favorites change (no need to save, IndexedDB handles it)
  useEffect(() => {
    setStatistics(prev => ({
      ...prev,
      totalFavorited: favorites.size
    }))
  }, [favorites])

  // Update statistics when ratings change (no need to save, IndexedDB handles it)
  useEffect(() => {
    setStatistics(prev => ({
      ...prev,
      totalRated: ratings.size
    }))
  }, [ratings])

  // Save statistics to localStorage
  useEffect(() => {
    localStorage.setItem('motiva-statistics', JSON.stringify(statistics))
  }, [statistics])

  // Save language preference
  useEffect(() => {
    localStorage.setItem('motiva-language', language)
  }, [language])

  // Auto-refresh Quote of the Day at 12 PM Egyptian time
  useEffect(() => {
    const checkAndUpdateQuoteOfDay = () => {
      const savedQuoteOfDayTimestamp = localStorage.getItem('motiva-quote-of-day-timestamp')
      const lastUpdateTimestamp = savedQuoteOfDayTimestamp ? parseInt(savedQuoteOfDayTimestamp) : null
      
      if (shouldUpdateQuoteOfDay(lastUpdateTimestamp)) {
        const randomQuote = quotes[language][Math.floor(Math.random() * quotes[language].length)]
        setQuoteOfDay(randomQuote)
        localStorage.setItem('motiva-quote-of-day', JSON.stringify(randomQuote))
        localStorage.setItem('motiva-quote-of-day-timestamp', Date.now().toString())
      }
    }

    // Check every minute if we've passed 12 PM
    const interval = setInterval(checkAndUpdateQuoteOfDay, 60000)

    // Also check when page becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkAndUpdateQuoteOfDay()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      clearInterval(interval)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [language])

  // Get available quotes based on category and used quotes
  const getAvailableQuotes = (category?: Category) => {
    const allQuotes = quotes[language]
    const categoryToUse = category !== undefined ? category : currentCategory
    const filteredQuotes = categoryToUse === 'all' 
      ? allQuotes 
      : allQuotes.filter(q => q.category === categoryToUse)
    
    const availableQuotes = filteredQuotes.filter(q => !usedQuotes.has(q.id))
    
    // If all quotes in this category have been used, reset
    if (availableQuotes.length === 0) {
      const categoryQuoteIds = filteredQuotes.map(q => q.id)
      setUsedQuotes(prev => {
        const newSet = new Set(Array.from(prev).filter(id => !categoryQuoteIds.includes(id)))
        return newSet
      })
      return filteredQuotes
    }
    
    return availableQuotes
  }

  // Get random quote with optional category override
  const getRandomQuoteForCategory = (category?: Category) => {
    const availableQuotes = getAvailableQuotes(category)
    if (availableQuotes.length === 0) return null
    
    const randomIndex = Math.floor(Math.random() * availableQuotes.length)
    return availableQuotes[randomIndex]
  }

  // Get random quote (uses current category)
  const getRandomQuote = () => {
    return getRandomQuoteForCategory()
  }

  // Load initial quote
  useEffect(() => {
    // Show Quote of the Day as first quote
    if (quoteOfDay) {
      setCurrentQuote(quoteOfDay)
      setUsedQuotes(prev => new Set([...Array.from(prev), quoteOfDay.id]))
    } else {
      const quote = getRandomQuote()
      if (quote) {
        setCurrentQuote(quote)
        setUsedQuotes(prev => new Set([...Array.from(prev), quote.id]))
        setStatistics(prev => ({
          ...prev,
          totalViewed: prev.totalViewed + 1
        }))
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  // Handle new quote
  const handleNewQuote = () => {
    setIsLoading(true)
    setTimeout(() => {
      const quote = getRandomQuoteForCategory(currentCategory)
      if (quote) {
        setCurrentQuote(quote)
        setUsedQuotes(prev => new Set([...Array.from(prev), quote.id]))
        setStatistics(prev => ({
          ...prev,
          totalViewed: prev.totalViewed + 1
        }))
      }
      setIsLoading(false)
    }, 300)
  }

  // Handle category change with immediate quote update
  const handleCategoryChangeWithQuote = (category: Category) => {
    handleCategoryChange(category)
    setIsLoading(true)
    setTimeout(() => {
      const quote = getRandomQuoteForCategory(category)
      if (quote) {
        setCurrentQuote(quote)
        setUsedQuotes(prev => new Set([...Array.from(prev), quote.id]))
      }
      setIsLoading(false)
    }, 300)
  }

  // Handle favorite toggle
  const handleToggleFavorite = async () => {
    if (!currentQuote) return

    try {
      const isFavorited = favorites.has(currentQuote.id)
      
      if (isFavorited) {
        // Remove from IndexedDB (with fallback to localStorage)
        await db.removeFavorite(currentQuote.id)
        
        setFavorites(prev => {
          const newFavorites = new Map(prev)
          newFavorites.delete(currentQuote.id)
          return newFavorites
        })
        showToast('Removed from favorites', 'info')
      } else {
        // Add to IndexedDB (with fallback to localStorage)
        const favorite: FavoriteQuote = {
          id: currentQuote.id,
          text: currentQuote.text,
          author: currentQuote.author,
          category: currentQuote.category,
          language: language,
          favoritedAt: Date.now()
        }
        
        await db.addFavorite(favorite)
        
        setFavorites(prev => {
          const newFavorites = new Map(prev)
          newFavorites.set(currentQuote.id, favorite)
          return newFavorites
        })
        showToast('Added to favorites!', 'success')
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
      showToast('Failed to update favorite. Please try again.', 'error')
    }
  }

  // Handle rating
  const handleRate = async (rating: number) => {
    if (!currentQuote) return
    
    try {
      // Save rating (with fallback to localStorage)
      await db.setRating(currentQuote.id, rating)
      
      setRatings(prev => new Map(prev).set(currentQuote.id, rating))
      showToast(`Rated ${rating} stars!`, 'success')
    } catch (error) {
      console.error('Error setting rating:', error)
      showToast('Failed to save rating. Please try again.', 'error')
    }
  }

  // Handle language change
  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
    setUsedQuotes(new Set())
    setCurrentCategory('all')
    
    // Immediately show a quote in the new language
    const randomQuote = quotes[newLanguage][
      Math.floor(Math.random() * quotes[newLanguage].length)
    ]
    setCurrentQuote(randomQuote)
    
    // Update Quote of the Day for new language
    setQuoteOfDay(randomQuote)
    localStorage.setItem('motiva-quote-of-day', JSON.stringify(randomQuote))
    localStorage.setItem('motiva-quote-of-day-timestamp', Date.now().toString())
  }

  // Handle category change
  const handleCategoryChange = (category: Category) => {
    setCurrentCategory(category)
    setUsedQuotes(new Set())
  }

  // Handle showing Quote of the Day
  const handleShowQuoteOfDay = () => {
    if (quoteOfDay) {
      setIsLoading(true)
      setTimeout(() => {
        setCurrentQuote(quoteOfDay)
        setIsLoading(false)
      }, 300)
    }
  }

  const isCurrentQuoteFavorite = currentQuote ? favorites.has(currentQuote.id) : false
  const currentRating = currentQuote ? ratings.get(currentQuote.id) || 0 : 0
  const isQuoteOfDay = currentQuote?.id === quoteOfDay?.id

  return (
    <div className={`min-h-screen flex flex-col ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header 
        language={language} 
        onLanguageChange={handleLanguageChange}
      />
      
      <main className="flex-1 flex items-center justify-center py-8">
        <QuoteSection
          quote={currentQuote}
          language={language}
          isLoading={isLoading}
          isFavorite={isCurrentQuoteFavorite}
          currentRating={currentRating}
          isQuoteOfDay={isQuoteOfDay}
          onNewQuote={handleNewQuote}
          onToggleFavorite={handleToggleFavorite}
          onRate={handleRate}
          onCategoryChange={handleCategoryChangeWithQuote}
          onShowQuoteOfDay={handleShowQuoteOfDay}
          currentCategory={currentCategory}
        />
      </main>

      <Footer language={language} />
    </div>
  )
}

