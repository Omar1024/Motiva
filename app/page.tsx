'use client'

import { ToastProvider } from './components/ToastProvider'
import HomeContent from './components/HomeContent'

export default function Home() {
  return (
    <ToastProvider>
      <HomeContent />
    </ToastProvider>
  )
}
