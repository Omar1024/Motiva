'use client'

import { useEffect } from 'react'
import { Check, X, Info, AlertCircle } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

interface ToastProps {
  message: string
  type?: ToastType
  onClose: () => void
  duration?: number
}

export default function Toast({ message, type = 'info', onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const icons = {
    success: <Check className="w-5 h-5" />,
    error: <X className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />
  }

  const colors = {
    success: 'bg-jungle-green',
    error: 'bg-red-500',
    info: 'bg-caribbean-current',
    warning: 'bg-yellow-500'
  }

  return (
    <div 
      className={`fixed bottom-4 right-4 ${colors[type]} text-white px-4 py-3 rounded-xl shadow-2xl z-50 animate-slide-up flex items-center gap-3 max-w-sm`}
      role="alert"
    >
      <div className="flex-shrink-0">
        {icons[type]}
      </div>
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="ml-auto flex-shrink-0 hover:opacity-70 transition-opacity"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}


