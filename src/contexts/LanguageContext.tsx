'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner'

export type Language = 'ar' | 'fr' | 'en'
export type Direction = 'rtl' | 'ltr'

export interface LanguageConfig {
  code: Language
  name: string
  dir: Direction
  flag: string
}

interface LanguageContextType {
  currentLang: Language | null
  currentLangConfig: LanguageConfig | null
  setLanguage: (lang: Language) => void
}

export const languages: LanguageConfig[] = [
  { code: 'ar', name: 'العربية', dir: 'rtl', flag: '🇩🇿' },
  { code: 'fr', name: 'Français', dir: 'ltr', flag: '🇫🇷' },
  { code: 'en', name: 'English', dir: 'ltr', flag: '🇬🇧' }
]

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLang, setCurrentLang] = useState<Language | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)
  const [shouldFadeOut, setShouldFadeOut] = useState(false)

  // Handle hydration and load language
  useEffect(() => {
    const loadLanguage = () => {
      try {
        const savedLanguage = localStorage.getItem('tnfront-language') as Language
        console.log('Loading saved language from localStorage:', savedLanguage)
        if (savedLanguage && languages.find(lang => lang.code === savedLanguage)) {
          setCurrentLang(savedLanguage)
          console.log('Language loaded successfully:', savedLanguage)
        } else {
          setCurrentLang('en')
          console.log('No valid saved language found, using default')
        }
      } catch (error) {
        console.error('Failed to load language from localStorage:', error)
        setCurrentLang('en')
      } finally {
        // Check if we're on the home page to apply loading delay
        const isHomePage = window.location.pathname === '/'
        const delay = isHomePage ? 1300 : 0
        
        setTimeout(() => {
          // Start fade-out animation
          setShouldFadeOut(true)
          
          // After fade-out completes, set hydrated to true
          setTimeout(() => {
            setIsHydrated(true)
          }, 500) // Match the fade-out duration
        }, delay)
      }
    }

    loadLanguage()
  }, [])

  // Save language to localStorage whenever it changes (only after hydration)
  useEffect(() => {
    if (isHydrated && currentLang) {
      try {
        localStorage.setItem('tnfront-language', currentLang)
      } catch (error) {
        console.error('Failed to save language to localStorage:', error)
      }
    }
  }, [currentLang, isHydrated])

  // Update document language and direction (only after hydration)
  useEffect(() => {
    if (isHydrated && currentLang) {
      const langConfig = languages.find(lang => lang.code === currentLang)
      if (langConfig) {
        document.documentElement.lang = currentLang
        document.documentElement.dir = langConfig.dir
      }
    }
  }, [currentLang, isHydrated])

  const currentLangConfig = currentLang ? languages.find(lang => lang.code === currentLang) || null : null

  const setLanguage = (lang: Language) => {
    console.log('Setting language to:', lang)
    setCurrentLang(lang)
    
    // Also save immediately for better persistence
    if (isHydrated) {
      try {
        localStorage.setItem('tnfront-language', lang)
        console.log('Language saved to localStorage:', lang)
      } catch (error) {
        console.error('Failed to save language to localStorage:', error)
      }
    }
  }

  return (
    <LanguageContext.Provider value={{
      currentLang,
      currentLangConfig,
      setLanguage
    }}>
      {!isHydrated ? <LoadingSpinner shouldFadeOut={shouldFadeOut} /> : (
        <div className="fade-in-content">
          {children}
        </div>
      )}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
