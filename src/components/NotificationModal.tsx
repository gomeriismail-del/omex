'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'

interface NotificationModalProps {
  show: boolean
  message: string
  isError?: boolean
  autoClose?: boolean
  duration?: number
  onClose?: () => void
}

export default function NotificationModal({ 
  show, 
  message, 
  isError = false, 
  autoClose = true,
  duration = 1000,
  onClose
}: NotificationModalProps) {
  useEffect(() => {
    if (show && autoClose && onClose) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      
      return () => clearTimeout(timer)
    }
  }, [show, autoClose, duration, onClose])

  if (!show) return null

  return createPortal(
    <div className="fixed inset-0 w-screen h-screen z-[9999] flex items-center justify-center">
      {/* Animated Backdrop */}
      <div 
        className={`absolute inset-0 w-screen h-screen backdrop-blur-sm transition-all duration-500 ${
          show ? 'bg-black bg-opacity-40' : 'bg-opacity-0'
        }`}
      />
      
      {/* Modal Container */}
      <div 
        className={`relative transform transition-all duration-500 ease-out ${
          show 
            ? 'scale-100 opacity-100 translate-y-0' 
            : 'scale-90 opacity-0 translate-y-8'
        }`}
      >
        {/* Modal Card */}
        <div className={`relative bg-white rounded-3xl shadow-2xl p-8 mx-4 max-w-sm w-full border ${
          isError 
            ? 'border-red-200 bg-gradient-to-br from-red-50 to-white' 
            : 'border-green-200 bg-gradient-to-br from-green-50 to-white'
        }`}>
          {/* Decorative Background Pattern */}
          <div className={`absolute inset-0 rounded-3xl opacity-5 ${
            isError ? 'bg-red-500' : 'bg-green-500'
          }`} />
          
          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Icon Container */}
            <div className={`mx-auto flex items-center justify-center h-20 w-20 rounded-full mb-6 shadow-lg transform transition-transform duration-300 hover:scale-110 ${
              isError 
                ? 'bg-gradient-to-br from-red-400 to-red-600 ring-4 ring-red-100' 
                : 'bg-gradient-to-br from-green-400 to-green-600 ring-4 ring-green-100'
            }`}>
              {isError ? (
                <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            
            {/* Title */}
            <h3 className={`text-xl font-bold mb-3 ${
              isError ? 'text-red-800' : 'text-green-800'
            }`}>
              {isError ? 'Error' : 'Success'}
            </h3>
            
            {/* Message */}
            <p className="text-gray-700 text-base leading-relaxed mb-6">
              {message}
            </p>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ease-out ${
                  isError ? 'bg-red-500' : 'bg-green-500'
                }`}
                style={{
                  animation: 'shrink 1s ease-out forwards'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>,
    document.body
  )
}
