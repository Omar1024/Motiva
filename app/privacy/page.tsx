'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Language } from '../types'

export default function PrivacyPolicy() {
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

        <div className="card p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">Privacy Policy</h1>
          <div className="space-y-6 text-white text-opacity-90">
            <p className="text-sm text-cambridge-blue">Last updated: October 17, 2025</p>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">1. Introduction</h2>
              <p className="leading-relaxed">
                Welcome to Motiva. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy explains how we handle your information when you use our motivational quote application.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">2. Data We Collect</h2>
              <p className="leading-relaxed mb-3">
                Motiva is designed with privacy in mind. We collect minimal data:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Local Storage Data:</strong> Your favorites, ratings, language preference, and Quote of the Day are stored locally in your browser using IndexedDB and localStorage.</li>
                <li><strong>Anonymous Analytics:</strong> We may collect anonymous usage statistics (page views, feature usage) to improve the app.</li>
                <li><strong>No Personal Information:</strong> We do not collect names, email addresses, or any personally identifiable information unless you explicitly provide it.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">3. How We Use Your Data</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>To provide and maintain the Motiva service</li>
                <li>To remember your preferences and favorites</li>
                <li>To improve user experience through analytics</li>
                <li>To display your Quote of the Day</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">4. Data Storage</h2>
              <p className="leading-relaxed">
                All your personal data (favorites, ratings, preferences) is stored locally on your device using:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li><strong>IndexedDB:</strong> For favorites and ratings</li>
                <li><strong>localStorage:</strong> For language preference, statistics, and Quote of the Day</li>
              </ul>
              <p className="leading-relaxed mt-3">
                This data never leaves your device and is not transmitted to our servers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">5. Cookies</h2>
              <p className="leading-relaxed">
                Motiva does not use traditional cookies. We use browser storage APIs (localStorage and IndexedDB) 
                for essential functionality only.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">6. Third-Party Services</h2>
              <p className="leading-relaxed">
                We may use third-party services for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li><strong>Analytics:</strong> To understand how users interact with Motiva (anonymous data only)</li>
                <li><strong>Hosting:</strong> To deliver the application to you</li>
              </ul>
              <p className="leading-relaxed mt-3">
                These services have their own privacy policies and we encourage you to review them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">7. Your Rights</h2>
              <p className="leading-relaxed">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Clear all your data by clearing your browser's storage</li>
                <li>Export your favorites using the export feature</li>
                <li>Delete individual favorites or ratings at any time</li>
                <li>Stop using Motiva at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">8. Data Security</h2>
              <p className="leading-relaxed">
                Since your data is stored locally on your device, it is as secure as your device. 
                We recommend using device security features like passwords, biometric authentication, and encryption.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">9. Children's Privacy</h2>
              <p className="leading-relaxed">
                Motiva is suitable for all ages. We do not knowingly collect personal information from anyone, 
                including children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">10. Changes to This Policy</h2>
              <p className="leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any changes by 
                posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">11. Contact Us</h2>
              <p className="leading-relaxed">
                If you have any questions about this privacy policy, please contact us through the 
                <Link href="/contact" className="text-caribbean-blue hover:text-white ml-1">Contact page</Link>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer language={language} />
    </div>
  )
}

