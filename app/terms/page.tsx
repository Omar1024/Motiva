'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Language } from '../types'

export default function TermsOfService() {
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
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">Terms of Service</h1>
          <div className="space-y-6 text-white text-opacity-90">
            <p className="text-sm text-cambridge-blue">Last updated: October 17, 2025</p>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
              <p className="leading-relaxed">
                By accessing and using Motiva, you accept and agree to be bound by the terms and provisions 
                of this agreement. If you do not agree to these terms, please do not use our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">2. Description of Service</h2>
              <p className="leading-relaxed">
                Motiva is a motivational quote application that provides daily inspirational quotes in 
                Arabic and English. The service includes features such as:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Viewing motivational quotes</li>
                <li>Saving favorite quotes</li>
                <li>Rating quotes</li>
                <li>Sharing quotes on social media</li>
                <li>Downloading quote images</li>
                <li>Accessing Quote of the Day</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">3. Use License</h2>
              <p className="leading-relaxed mb-3">
                Permission is granted to use Motiva for personal, non-commercial purposes. This license shall 
                automatically terminate if you violate any of these restrictions.
              </p>
              <p className="leading-relaxed font-semibold">You may:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                <li>Use the service for personal motivation and inspiration</li>
                <li>Share quotes on social media with proper attribution</li>
                <li>Save and organize your favorite quotes</li>
              </ul>
              <p className="leading-relaxed font-semibold mt-3">You may not:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                <li>Copy or reproduce the service for commercial use</li>
                <li>Scrape or extract all quotes systematically</li>
                <li>Claim authorship of quotes</li>
                <li>Remove attribution or copyright notices</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">4. Content Ownership</h2>
              <p className="leading-relaxed">
                The quotes displayed on Motiva are sourced from various authors and public domain sources. 
                We respect intellectual property rights and make every effort to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Attribute quotes to their original authors</li>
                <li>Use quotes that are in public domain or widely shared</li>
                <li>Respond to any copyright concerns promptly</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">5. User Conduct</h2>
              <p className="leading-relaxed">You agree to use Motiva in a responsible manner and not to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Attempt to hack, exploit, or damage the service</li>
                <li>Use automated tools to access the service excessively</li>
                <li>Share inappropriate or offensive content</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">6. Disclaimer</h2>
              <p className="leading-relaxed">
                Motiva is provided "as is" without any warranties, expressed or implied. We do not guarantee:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Continuous, uninterrupted access to the service</li>
                <li>Accuracy or completeness of quotes</li>
                <li>That the service will be error-free or secure</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">7. Limitation of Liability</h2>
              <p className="leading-relaxed">
                In no event shall Motiva be liable for any indirect, incidental, special, consequential, 
                or punitive damages arising out of your use of the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">8. Privacy</h2>
              <p className="leading-relaxed">
                Your use of Motiva is also governed by our 
                <Link href="/privacy" className="text-caribbean-blue hover:text-white ml-1">Privacy Policy</Link>. 
                Please review it to understand our practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">9. Changes to Terms</h2>
              <p className="leading-relaxed">
                We reserve the right to modify these terms at any time. Continued use of Motiva after 
                changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">10. Termination</h2>
              <p className="leading-relaxed">
                We may terminate or suspend access to our service immediately, without prior notice, 
                for any reason, including breach of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">11. Contact</h2>
              <p className="leading-relaxed">
                If you have any questions about these Terms of Service, please contact us through the 
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

