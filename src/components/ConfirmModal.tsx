'use client'

import { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText: string
  cancelText: string
  isLoading?: boolean
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
  isLoading = false
}: ConfirmModalProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY
      
      // Add styles to prevent scrolling
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      
      // Trigger animation
      setTimeout(() => setIsAnimating(true), 10)
      
      return () => {
        // Restore scroll position and styles
        const scrollY = document.body.style.top
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
        setIsAnimating(false)
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-out"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative bg-white rounded-lg shadow-2xl max-w-lg w-full sm:max-w-xl lg:max-w-2xl p-6 sm:p-8 transform transition-all duration-300 ease-out z-10 ${
        isAnimating 
          ? 'scale-100 opacity-100' 
          : 'scale-95 opacity-0'
      }`} onClick={(e) => e.stopPropagation()}>
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isLoading}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Icon */}
          <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-red-100 rounded-full mb-6">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          
          {/* Content */}
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              {title}
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-8">
              {message}
            </p>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  {confirmText}
                </>
              ) : (
                confirmText
              )}
            </button>
          </div>
        </div>
    </div>,
    document.body
  )
}
