'use client'

import { useState, useEffect } from 'react'
import { Language, FavoriteQuote, Category } from '../types'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ToastProvider, useToast } from '../components/ToastProvider'
import { Star, Trash2, Search, ArrowLeft, Download, Heart } from 'lucide-react'
import Link from 'next/link'
import { db } from '../utils/db'

function FavoritesContent() {
  const { showToast } = useToast()

  const [language, setLanguage] = useState<Language>('en')
  const [favorites, setFavorites] = useState<FavoriteQuote[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState<Category>('all')
  const [ratings, setRatings] = useState<Map<string, number>>(new Map())
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  const translations = {
    en: {
      title: 'Your Favorite Quotes',
      empty: 'No favorites yet',
      emptyDesc: 'Start adding quotes to your favorites!',
      search: 'Search favorites...',
      clearAll: 'Clear All',
      confirmClear: 'Are you sure you want to clear all favorites?',
      cancel: 'Cancel',
      confirm: 'Yes, Clear All',
      back: 'Back to Home',
      export: 'Export',
      total: 'Total Favorites',
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
      title: 'اقتباساتك المفضلة',
      empty: 'لا توجد مفضلات بعد',
      emptyDesc: 'ابدأ بإضافة اقتباسات إلى مفضلاتك!',
      search: 'البحث في المفضلات...',
      clearAll: 'مسح الكل',
      confirmClear: 'هل أنت متأكد من حذف جميع المفضلات؟',
      cancel: 'إلغاء',
      confirm: 'نعم، امسح الكل',
      back: 'العودة للرئيسية',
      export: 'تصدير',
      total: 'إجمالي المفضلات',
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

  // Load favorites and ratings from IndexedDB
  useEffect(() => {
    const loadData = async () => {
      try {
        await db.init()
        await db.migrateFromLocalStorage()
        
        const favArray = await db.getAllFavorites()
        setFavorites(favArray)
        
        const ratingsMap = await db.getAllRatings()
        setRatings(ratingsMap)
        
        const savedLanguage = localStorage.getItem('motiva-language') || localStorage.getItem('inspireme-language')
        if (savedLanguage) {
          setLanguage(savedLanguage as Language)
        }
      } catch (error) {
        console.error('Error loading favorites:', error)
      }
    }
    
    loadData()
  }, [])

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem('motiva-language', newLanguage)
  }

  const handleClearAll = async () => {
    try {
      await db.clearAllFavorites()
      setFavorites([])
      setShowClearConfirm(false)
      showToast('All favorites cleared', 'success')
    } catch (error) {
      console.error('Error clearing favorites:', error)
      showToast('Failed to clear favorites', 'error')
    }
  }

  const handleRemoveFavorite = async (quoteId: string) => {
    try {
      await db.removeFavorite(quoteId)
      const updated = favorites.filter(fav => fav.id !== quoteId)
      setFavorites(updated)
      showToast('Removed from favorites', 'success')
    } catch (error) {
      console.error('Error removing favorite:', error)
      showToast('Failed to remove favorite', 'error')
    }
  }

  const handleExport = () => {
    try {
      const text = favorites
        .map(fav => `"${fav.text}"\n— ${fav.author}\n`)
        .join('\n')
      
      const blob = new Blob([text], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'motiva-favorites.txt'
      link.click()
      URL.revokeObjectURL(url)
      showToast('Favorites exported successfully!', 'success')
    } catch (error) {
      console.error('Export error:', error)
      showToast('Failed to export favorites', 'error')
    }
  }

  // Filter favorites
  const filteredFavorites = favorites.filter(fav => {
    const matchesSearch = 
      fav.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fav.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || fav.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const categoryButtons: Category[] = ['all', 'motivation', 'success', 'wisdom', 'study', 'life_lessons']

  return (
    <div className={`min-h-screen flex flex-col ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header 
        language={language} 
        onLanguageChange={handleLanguageChange}
        showFavoritesLink={false}
      />
      
      <main className="flex-1 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <Link 
              href="/"
              className="inline-flex items-center space-x-2 rtl:space-x-reverse text-cambridge-blue hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{t.back}</span>
            </Link>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 quote-text">
                  {t.title}
                </h1>
                <p className="text-cambridge-blue">
                  {t.total}: {favorites.length}
                </p>
              </div>
              
              <div className="flex space-x-2 rtl:space-x-reverse">
                {favorites.length > 0 && (
                  <>
                    <button
                      onClick={handleExport}
                      className="btn-icon bg-cambridge-blue text-white flex items-center space-x-2 rtl:space-x-reverse px-4"
                    >
                      <Download className="w-5 h-5" />
                      <span className="hidden sm:inline">{t.export}</span>
                    </button>
                    <button
                      onClick={() => setShowClearConfirm(true)}
                      className="btn-icon bg-tea-rose text-app-black flex items-center space-x-2 rtl:space-x-reverse px-4"
                    >
                      <Trash2 className="w-5 h-5" />
                      <span className="hidden sm:inline">{t.clearAll}</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          {favorites.length > 0 && (
            <div className="mb-6 space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cambridge-blue" />
                <input
                  type="text"
                  placeholder={t.search}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 rtl:pl-4 rtl:pr-12 pr-4 py-3 glass rounded-full text-white placeholder-cambridge-blue focus:outline-none focus:ring-2 focus:ring-cambridge-blue"
                />
              </div>

              {/* Category Filter */}
              <div className="overflow-x-auto">
                <div className="flex space-x-2 rtl:space-x-reverse pb-2 min-w-max">
                  {categoryButtons.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilterCategory(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                        filterCategory === cat
                          ? 'bg-brunswick-green text-white shadow-lg'
                          : 'glass text-cambridge-blue hover:bg-white hover:bg-opacity-20'
                      }`}
                    >
                      {t.categories[cat]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Favorites Grid */}
          {filteredFavorites.length === 0 ? (
            <div className="card text-center py-16 sm:py-20">
              <div className="mb-6">
                <Heart className="w-20 h-20 sm:w-24 sm:h-24 mx-auto text-jungle-green opacity-50 mb-4" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">{t.empty}</h3>
              <p className="text-cambridge-blue mb-8 text-lg">{t.emptyDesc}</p>
              <Link
                href="/"
                className="inline-block bg-caribbean-current hover:bg-opacity-90 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 font-semibold"
              >
                Discover Quotes
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredFavorites.map((fav) => (
                <div key={fav.id} className="card p-6 hover:shadow-2xl transition-shadow group">
                  <div className="flex justify-between items-start mb-4">
                    <span className="category-badge bg-cambridge-blue bg-opacity-30 text-cambridge-blue text-xs">
                      {t.categories[fav.category]}
                    </span>
                    <button
                      onClick={() => handleRemoveFavorite(fav.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-tea-rose hover:text-red-400"
                      aria-label="Remove from favorites"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <blockquote className="quote-text text-lg text-white mb-3">
                    "{fav.text}"
                  </blockquote>
                  
                  <p className="author-text text-sm text-khaki mb-3">
                    — {fav.author}
                  </p>
                  
                  {/* Rating Display */}
                  {ratings.has(fav.id) && (
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= (ratings.get(fav.id) || 0)
                              ? 'fill-current text-tea-rose'
                              : 'text-white text-opacity-20'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="card max-w-md w-full p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              {t.confirmClear}
            </h2>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 px-6 py-3 glass rounded-full text-white hover:bg-white hover:bg-opacity-20 transition-all"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleClearAll}
                className="flex-1 px-6 py-3 bg-tea-rose text-app-black rounded-full hover:shadow-xl transition-all"
              >
                {t.confirm}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <Footer language={language} />
    </div>
  )
}

export default function FavoritesPage() {
  return (
    <ToastProvider>
      <FavoritesContent />
    </ToastProvider>
  )
}


