'use client'

import { useState, useRef } from 'react'
import { Quote, Language, Category } from '../types'
import { RefreshCw, Copy, Heart, Share2, Star, Check } from 'lucide-react'
import html2canvas from 'html2canvas'
import { useToast } from './ToastProvider'
import SkeletonLoader from './SkeletonLoader'

interface QuoteSectionProps {
  quote: Quote | null
  language: Language
  isLoading: boolean
  isFavorite: boolean
  currentRating: number
  isQuoteOfDay: boolean
  onNewQuote: () => void
  onToggleFavorite: () => void
  onRate: (rating: number) => void
  onCategoryChange: (category: Category) => void
  onShowQuoteOfDay: () => void
  currentCategory: Category
}

export default function QuoteSection({
  quote,
  language,
  isLoading,
  isFavorite,
  currentRating,
  isQuoteOfDay,
  onNewQuote,
  onToggleFavorite,
  onRate,
  onCategoryChange,
  onShowQuoteOfDay,
  currentCategory
}: QuoteSectionProps) {
  const [copied, setCopied] = useState(false)
  const [sharing, setSharing] = useState(false)
  const [hoveredStar, setHoveredStar] = useState(0)
  const quoteRef = useRef<HTMLDivElement>(null)
  const { showToast } = useToast()

  const translations = {
    en: {
      newQuote: 'New Quote',
      copy: 'Copy',
      copied: 'Copied!',
      favorite: 'Favorite',
      share: 'Save Image',
      sharing: 'Saving...',
      saved: 'Saved!',
      tweet: 'X',
      rateQuote: 'Rate this quote',
      quoteOfDay: 'Quote of the Day',
      showQuoteOfDay: 'Show Quote of the Day',
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
      newQuote: 'اقتباس جديد',
      copy: 'نسخ',
      copied: 'تم النسخ!',
      favorite: 'المفضلة',
      share: 'حفظ الصورة',
      sharing: 'جاري الحفظ...',
      saved: 'تم الحفظ!',
      tweet: 'إكس',
      rateQuote: 'قيّم هذا الاقتباس',
      quoteOfDay: 'اقتباس اليوم',
      showQuoteOfDay: 'عرض اقتباس اليوم',
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

  const handleCopy = async () => {
    if (quote) {
      try {
        await navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`)
        setCopied(true)
        showToast(t.copied || 'Quote copied to clipboard!', 'success')
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy:', err)
        showToast('Failed to copy', 'error')
      }
    }
  }

  const handleShare = async () => {
    if (!quote) return

    try {
      setSharing(true)
      
      // Create canvas
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      
      // Detect if Arabic
      const isArabic = language === 'ar'
      
      // Set canvas width (fixed) and calculate dynamic height
      canvas.width = 1200
      const maxWidth = 1000
      const padding = 100
      
      // Set text properties for quote
      ctx.fillStyle = '#ffffff'
      ctx.font = isArabic ? '900 48px "Cairo", sans-serif' : 'bold 48px "Playfair Display", serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.direction = isArabic ? 'rtl' : 'ltr'
      
      // Word wrap the quote text
      const words = quote.text.split(' ')
      const lines: string[] = []
      let currentLine = ''
      
      words.forEach(word => {
        const testLine = currentLine + (currentLine ? ' ' : '') + word
        const metrics = ctx.measureText(testLine)
        if (metrics.width > maxWidth && currentLine) {
          lines.push(currentLine)
          currentLine = word
        } else {
          currentLine = testLine
        }
      })
      if (currentLine) lines.push(currentLine)
      
      // Calculate dynamic height based on number of lines
      const lineHeight = 60
      const authorHeight = 50
      const badgeHeight = 60
      const totalContentHeight = (lines.length * lineHeight) + authorHeight + badgeHeight + (padding * 2)
      canvas.height = Math.max(630, totalContentHeight)
      
      // Create gradient background (same as website) with new height
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, '#0a0b0a')
      gradient.addColorStop(0.25, '#1f2421')
      gradient.addColorStop(0.5, '#162822')
      gradient.addColorStop(0.75, '#1f2421')
      gradient.addColorStop(1, '#0a0b0a')
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Reset text properties after gradient
      ctx.fillStyle = '#ffffff'
      ctx.font = isArabic ? '900 48px "Cairo", sans-serif' : 'bold 48px "Playfair Display", serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.direction = isArabic ? 'rtl' : 'ltr'
      
      // Draw quote text (centered vertically)
      const startY = (canvas.height - totalContentHeight) / 2 + padding
      lines.forEach((line, i) => {
        ctx.fillText(line, canvas.width / 2, startY + (i * lineHeight))
      })
      
      // Draw author
      ctx.font = isArabic ? '700 32px "Cairo", sans-serif' : 'bold 32px "Lora", serif'
      ctx.direction = isArabic ? 'rtl' : 'ltr'
      ctx.fillText(`— ${quote.author}`, canvas.width / 2, startY + (lines.length * lineHeight) + 60)
      
      // Draw category badge
      ctx.font = 'bold 24px Arial, sans-serif'
      const categoryText = t.categories[quote.category]
      const badgeWidth = ctx.measureText(categoryText).width + 40
      const badgeX = (canvas.width - badgeWidth) / 2
      const badgeY = startY + (lines.length * lineHeight) + 120
      
      ctx.fillStyle = '#1f2421'
      ctx.beginPath()
      ctx.roundRect(badgeX, badgeY, badgeWidth, 40, 20)
      ctx.fill()
      
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 2
      ctx.stroke()
      
      ctx.fillStyle = '#ffffff'
      ctx.fillText(categoryText, canvas.width / 2, badgeY + 20)
      
      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = `motiva-${quote.id}.png`
          link.click()
          URL.revokeObjectURL(url)
          showToast('Image saved successfully!', 'success')
        }
        setSharing(false)
      })
    } catch (err) {
      console.error('Failed to save image:', err)
      showToast('Failed to save image', 'error')
      setSharing(false)
    }
  }

  const handleTweet = () => {
    if (quote) {
      const tweetText = `"${quote.text}" - ${quote.author}`
      const tweetUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(tweetText)}`
      window.open(tweetUrl, '_blank')
    }
  }

  const categoryButtons: Category[] = ['all', 'motivation', 'success', 'wisdom', 'study', 'life_lessons']

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-8">
      {/* Category Filter - Mobile Optimized Grid Layout */}
      <div className="mb-4 sm:mb-6">
        <div className="grid grid-cols-3 sm:flex sm:flex-wrap gap-2 sm:gap-3 justify-center">
          {categoryButtons.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-2 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap touch-manipulation hover:scale-105 active:scale-95 ${
                currentCategory === cat
                  ? 'bg-caribbean-current text-white shadow-lg scale-105'
                  : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30 backdrop-blur-sm'
              }`}
            >
              {t.categories[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Quote Card - Improved Mobile Design */}
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <div 
          ref={quoteRef}
          className="card fade-in p-5 sm:p-8 lg:p-12 mb-5 sm:mb-6 min-h-[240px] sm:min-h-[320px] flex flex-col justify-center relative overflow-hidden rounded-2xl sm:rounded-3xl transition-all duration-300"
          style={{background: 'linear-gradient(135deg, rgba(41,82,74,0.4), rgba(148,161,135,0.4), rgba(197,175,160,0.3))'}}
          dir={language === 'ar' ? 'rtl' : 'ltr'}
        >
          {quote ? (
          <>
            <blockquote 
              className={`text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-6 text-center leading-relaxed ${language === 'ar' ? 'font-cairo' : 'quote-text'}`}
            >
              "{quote.text}"
            </blockquote>
            
            {/* Author */}
            <div className="flex justify-center mb-3 sm:mb-4">
              <p 
                className={`text-sm sm:text-lg md:text-xl text-white font-semibold text-center ${language === 'ar' ? 'font-cairo' : 'author-text'}`}
              >
                — {quote.author}
              </p>
            </div>

            {/* Category and Quote of Day badges at bottom */}
            <div className="flex justify-center items-center gap-2 flex-wrap">
              <span 
                className="text-xs sm:text-sm bg-caribbean-current text-white font-bold shadow-md px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-white border-opacity-30"
              >
                {t.categories[quote.category]}
              </span>
              {isQuoteOfDay && (
                <span 
                  className="text-xs sm:text-sm text-white font-bold shadow-md px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-white border-opacity-30"
                  style={{
                    backgroundColor: '#49a078'
                  }}
                >
                  ⭐ {t.quoteOfDay}
                </span>
              )}
            </div>
          </>
        ) : null}
        </div>
      )}

      {/* Rating Stars - Mobile Optimized */}
      {quote && (
        <div className="flex flex-col items-center gap-2 mb-4 sm:mb-5">
          <span className="text-white text-xs sm:text-sm font-medium">{t.rateQuote}</span>
          <div className="flex space-x-1 rtl:space-x-reverse">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => onRate(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                className="star transition-all duration-200 touch-manipulation hover:scale-110 active:scale-95 p-1"
                aria-label={`Rate ${star} stars`}
              >
                <Star
                  className={`w-6 h-6 sm:w-7 sm:h-7 transition-all ${
                    star <= (hoveredStar || currentRating)
                      ? 'fill-current text-jungle-green drop-shadow-lg'
                      : 'text-white text-opacity-40 hover:text-opacity-70'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons - Mobile-First Design */}
      <div className="space-y-2 sm:space-y-0 sm:flex sm:flex-wrap sm:justify-center sm:gap-2">
        {/* Primary Button - Full Width on Mobile */}
        <button
          onClick={onNewQuote}
          disabled={isLoading}
          className="w-full sm:w-auto bg-caribbean-current hover:bg-opacity-90 text-white px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 touch-manipulation font-bold"
        >
          <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{t.newQuote}</span>
        </button>

        {/* Quote of Day Button */}
        {!isQuoteOfDay && (
          <button
            onClick={onShowQuoteOfDay}
            className="w-full sm:w-auto bg-jungle-green hover:bg-opacity-90 text-white px-4 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 touch-manipulation font-semibold"
          >
            <span className="text-lg">⭐</span>
            <span>{t.showQuoteOfDay}</span>
          </button>
        )}

        {/* Secondary Actions - Grid on Mobile */}
        <div className="grid grid-cols-2 gap-2 sm:contents">
          <button
            onClick={handleCopy}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-white px-3 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 touch-manipulation"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span className="text-sm font-medium">{copied ? t.copied : t.copy}</span>
          </button>

          <button
            onClick={onToggleFavorite}
            className={`px-3 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 touch-manipulation ${
              isFavorite ? 'bg-jungle-green text-white' : 'bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">{t.favorite}</span>
          </button>

          <button
            onClick={handleTweet}
            className="bg-black hover:bg-neutral-900 text-white border border-white/20 px-3 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 touch-manipulation"
            aria-label="Share on X"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 1227"
              className="w-4 h-4 fill-current"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M714.163 519.284 1165.89 0H1057.8L667.137 450.887 357.202 0H0L472.339 681.821 0 1226.37H108.086L521.756 748.273 857.8 1226.37H1215L714.137 519.284h.026ZM570.16 690.43 527.69 631.561 147.118 79.694h170.753l307.508 442.954 42.47 58.869 403.134 580.052H900.68L570.16 690.43Z"/>
            </svg>
            <span className="text-sm font-semibold">X</span>
          </button>

          <button
            onClick={handleShare}
            disabled={sharing}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-white px-3 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 touch-manipulation border border-white border-opacity-20"
          >
            <Share2 className={`w-4 h-4 ${sharing ? 'animate-spin' : ''}`} />
            <span className="text-sm font-medium">{sharing ? t.sharing : t.share}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

