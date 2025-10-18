'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Heart, Globe, Star, Share2 } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Language } from '../types'

export default function About() {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('motiva-language') || localStorage.getItem('inspireme-language')
    if (savedLanguage) {
      setLanguage(savedLanguage as Language)
    }
  }, [])

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem('motiva-language', newLanguage)
  }

  const t = {
    en: { backToHome: 'Back to Home' },
    ar: { backToHome: 'العودة للرئيسية' }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header language={language} onLanguageChange={handleLanguageChange} showFavoritesLink={false} />
      
      <main className="flex-1 px-4 py-8 sm:py-12 max-w-4xl mx-auto">
        <Link 
          href="/"
          className="inline-flex items-center space-x-2 rtl:space-x-reverse text-cambridge-blue hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t[language].backToHome}</span>
        </Link>

        <div className="space-y-6">
          {/* Hero Section */}
          <div className="card p-6 sm:p-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
              About Motiva
            </h1>
            <p className="text-xl text-cambridge-blue">
              Daily Motivation in Arabic & English
            </p>
          </div>

          {/* Mission */}
          <div className="card p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-white text-opacity-90 leading-relaxed mb-4">
              Motiva was created with a simple yet powerful goal: to inspire and motivate people 
              every single day with beautiful, meaningful quotes in both Arabic and English.
            </p>
            <p className="text-white text-opacity-90 leading-relaxed">
              We believe that a few words of wisdom at the right time can spark motivation, 
              provide comfort, or offer a fresh perspective. Whether you're starting your day, 
              taking a break, or seeking inspiration, Motiva is here to uplift you.
            </p>
          </div>

          {/* Features */}
          <div className="card p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">What We Offer</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <div className="bg-caribbean-current p-2 rounded-lg">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Bilingual Content</h3>
                  <p className="text-sm text-white text-opacity-80">
                    2000+ quotes in Arabic and English with proper RTL support
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-jungle-green p-2 rounded-lg">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Favorites System</h3>
                  <p className="text-sm text-white text-opacity-80">
                    Save and organize unlimited favorite quotes
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-caribbean-current p-2 rounded-lg">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Rating System</h3>
                  <p className="text-sm text-white text-opacity-80">
                    Rate quotes to help us understand what resonates with you
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-jungle-green p-2 rounded-lg">
                  <Share2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Share & Save</h3>
                  <p className="text-sm text-white text-opacity-80">
                    Download beautiful quote images or share on social media
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy First */}
          <div className="card p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Privacy First</h2>
            <p className="text-white text-opacity-90 leading-relaxed mb-4">
              Your privacy matters to us. Motiva stores all your data (favorites, ratings, preferences) 
              locally on your device using IndexedDB and localStorage.
            </p>
            <p className="text-white text-opacity-90 leading-relaxed">
              We don't collect personal information, and your data never leaves your device. 
              You're always in control.
            </p>
          </div>

          {/* Categories */}
          <div className="card p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Quote Categories</h2>
            <div className="flex flex-wrap gap-3">
              {['Motivation', 'Success', 'Wisdom', 'Study', 'Life Lessons'].map((cat) => (
                <span 
                  key={cat}
                  className="bg-caribbean-current text-white px-4 py-2 rounded-full font-semibold text-sm"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Technology */}
          <div className="card p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Built With Care</h2>
            <p className="text-white text-opacity-90 leading-relaxed mb-4">
              Motiva is built with modern web technologies to ensure a fast, smooth, and reliable experience:
            </p>
            <ul className="space-y-2 text-white text-opacity-80">
              <li>• <strong>Next.js 14</strong> - Lightning-fast React framework</li>
              <li>• <strong>TypeScript</strong> - Type-safe and robust code</li>
              <li>• <strong>Tailwind CSS</strong> - Beautiful, responsive design</li>
              <li>• <strong>IndexedDB</strong> - Efficient local storage</li>
              <li>• <strong>PWA</strong> - Install as an app on any device</li>
            </ul>
          </div>

          {/* Contact CTA */}
          <div className="card p-6 sm:p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Get in Touch</h2>
            <p className="text-white text-opacity-90 mb-6">
              Have feedback, suggestions, or just want to say hello?
            </p>
            <Link
              href="/contact"
              className="inline-block bg-caribbean-current hover:bg-opacity-90 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 font-semibold"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>

      <Footer language={language} />
    </div>
  )
}

