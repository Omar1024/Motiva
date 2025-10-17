'use client'

import Link from 'next/link'
import { ArrowLeft, Mail, MessageSquare, Github } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header language="en" onLanguageChange={() => {}} showFavoritesLink={false} />
      
      <main className="flex-1 px-4 py-8 sm:py-12 max-w-4xl mx-auto">
        <Link 
          href="/"
          className="inline-flex items-center space-x-2 text-cambridge-blue hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>

        <div className="space-y-6">
          {/* Hero */}
          <div className="card p-6 sm:p-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Get in Touch
            </h1>
            <p className="text-cambridge-blue">
              We'd love to hear from you!
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="card p-6">
              <div className="bg-caribbean-current w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Email</h3>
              <p className="text-white text-opacity-80 mb-3">
                For general inquiries, feedback, or support
              </p>
              <a 
                href="mailto:hello@motiva.app"
                className="text-caribbean-blue hover:text-white transition-colors font-semibold"
              >
                hello@motiva.app
              </a>
            </div>

            <div className="card p-6">
              <div className="bg-jungle-green w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Feedback</h3>
              <p className="text-white text-opacity-80 mb-3">
                Share your thoughts and suggestions
              </p>
              <a 
                href="mailto:feedback@motiva.app"
                className="text-caribbean-blue hover:text-white transition-colors font-semibold"
              >
                feedback@motiva.app
              </a>
            </div>
          </div>

          {/* What to Contact About */}
          <div className="card p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white mb-4">How Can We Help?</h2>
            <div className="space-y-4 text-white text-opacity-90">
              <div>
                <h3 className="font-bold text-white mb-1">💡 Suggestions & Ideas</h3>
                <p className="text-sm">
                  Have an idea for a new feature? We're always looking to improve Motiva based on user feedback.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-white mb-1">🐛 Bug Reports</h3>
                <p className="text-sm">
                  Found a bug or issue? Let us know so we can fix it quickly.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-white mb-1">📝 Quote Submissions</h3>
                <p className="text-sm">
                  Have a favorite quote you'd like to see added? Send it our way with proper attribution.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-white mb-1">⚖️ Copyright Concerns</h3>
                <p className="text-sm">
                  If you believe any content infringes on copyright, please contact us immediately.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-white mb-1">🤝 Partnerships</h3>
                <p className="text-sm">
                  Interested in collaborating or partnering with Motiva? We'd love to hear from you.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-white mb-1">❓ General Questions</h3>
                <p className="text-sm">
                  Any other questions or comments? Don't hesitate to reach out!
                </p>
              </div>
            </div>
          </div>

          {/* Response Time */}
          <div className="card p-6 sm:p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-2">Response Time</h2>
            <p className="text-white text-opacity-80">
              We typically respond within 24-48 hours during weekdays.
              <br />
              Thank you for your patience!
            </p>
          </div>

          {/* Social Links (Optional) */}
          <div className="card p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Follow Us</h2>
            <div className="flex justify-center gap-4">
              <a
                href="https://twitter.com/motiva"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm p-3 rounded-lg transition-all hover:scale-110"
              >
                <svg className="w-6 h-6 text-white" viewBox="0 0 1200 1227" fill="currentColor">
                  <path d="M714.163 519.284 1165.89 0H1057.8L667.137 450.887 357.202 0H0L472.339 681.821 0 1226.37H108.086L521.756 748.273 857.8 1226.37H1215L714.137 519.284h.026ZM570.16 690.43 527.69 631.561 147.118 79.694h170.753l307.508 442.954 42.47 58.869 403.134 580.052H900.68L570.16 690.43Z"/>
                </svg>
              </a>
              <a
                href="https://github.com/motiva"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm p-3 rounded-lg transition-all hover:scale-110"
              >
                <Github className="w-6 h-6 text-white" />
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer language="en" />
    </div>
  )
}

