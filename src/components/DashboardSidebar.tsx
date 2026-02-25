'use client'

import { useState, useEffect } from 'react'
import { 
  Home, 
  Package, 
  Users, 
  Settings, 
  BarChart3, 
  X, 
  ChevronRight, 
  Lock,
  Globe,
  ShoppingCart
} from 'lucide-react'

type SupportedLanguage = 'en' | 'fr' | 'ar'

interface Translations {
  en: {
    [key: string]: string
  }
  fr: {
    [key: string]: string
  }
  ar: {
    [key: string]: string
  }
}

const translations: Translations = {
  en: {
    dashboard: 'Dashboard',
    overview: 'Overview',
    products: 'Products',
    orders: 'Orders',
    users: 'Users',
    settings: 'Settings',
    analytics: 'Analytics',
    locked: 'Locked',
    unlockRequired: 'Premium feature - Upgrade to unlock'
  },
  fr: {
    dashboard: 'Tableau de bord',
    overview: 'Aperçu',
    products: 'Produits',
    orders: 'Commandes',
    users: 'Utilisateurs',
    settings: 'Paramètres',
    analytics: 'Analytiques',
    locked: 'Verrouillé',
    unlockRequired: 'Fonctionnalité premium - Mettez à niveau pour déverrouiller'
  },
  ar: {
    dashboard: 'لوحة التحكم',
    overview: 'نظرة عامة',
    products: 'المنتجات',
    orders: 'الطلبات',
    users: 'المستخدمون',
    settings: 'الإعدادات',
    analytics: 'التحليلات',
    locked: 'مقفول',
    unlockRequired: 'ميزة متميزة - قم بالترقية للفتح'
  }
}

interface DashboardSidebarProps {
  isRTL: boolean
  currentLang: string
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  isMobile: boolean
}

export default function DashboardSidebar({ 
  isRTL, 
  currentLang, 
  isOpen, 
  setIsOpen, 
  isMobile 
}: DashboardSidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [actualLang, setActualLang] = useState(currentLang)

  const t = (key: string) => translations[actualLang as SupportedLanguage][key] || key

  // Load saved language preference on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'fr'
    setActualLang(savedLang)
  }, [])

  // Listen for language change events
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      const { language } = event.detail
      setActualLang(language)
    }
    
    window.addEventListener('languageChange', handleLanguageChange as EventListener)
    return () => window.removeEventListener('languageChange', handleLanguageChange as EventListener)
  }, [])

  // Update when currentLang prop changes
  useEffect(() => {
    if (currentLang !== actualLang) {
      setActualLang(currentLang)
    }
  }, [currentLang, actualLang])

  const menuItems = [
    { id: 'dashboard', icon: Home, label: t('dashboard'), locked: false },
    { id: 'products', icon: Package, label: t('products'), locked: true },
    { id: 'users', icon: Users, label: t('users'), locked: true },
    { id: 'settings', icon: Settings, label: t('settings'), locked: true },
    { id: 'analytics', icon: BarChart3, label: t('analytics'), locked: true }
  ]

  const handleMenuClick = (itemId: string, locked: boolean) => {
    if (locked) {
      alert(t('unlockRequired'))
      return
    }
    
    // Handle navigation
    switch (itemId) {
      case 'dashboard':
        window.location.href = '/dashboard'
        break
      case 'products':
      case 'users':
      case 'settings':
      case 'analytics':
      default:
        window.location.href = '/dashboard'
        break
    }
  }

  const toggleLanguage = () => {
    const newLang = actualLang === 'fr' ? 'en' : actualLang === 'en' ? 'ar' : 'fr'
    const newRTL = newLang === 'ar'
    document.documentElement.lang = newLang
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr'
    // Store language preference in localStorage
    localStorage.setItem('preferredLanguage', newLang)
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('languageChange', { detail: { language: newLang, rtl: newRTL } }))
    // Increased delay to ensure language change event propagates before reload
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }

  if (isMobile) {
    return (
      <aside className={`
        fixed  top-0 ${isRTL ? 'right-0' : 'left-0'} z-50 h-full bg-white shadow-xl transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : isRTL ? 'translate-x-full' : '-translate-x-full'}
        w-64
      `}>
        <div className="flex flex-col h-full pt-16">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3 ">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-gray-800">
                {t('dashboard')}
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id, item.locked)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 relative
                    ${item.locked 
                      ? 'bg-gray-50 text-gray-400 cursor-not-allowed' 
                      : 'hover:bg-blue-50 text-gray-700 hover:text-blue-600'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="whitespace-nowrap">
                    {item.label}
                  </span>
                  {item.locked && (
                    <Lock className="w-3 h-3 absolute left-3" />
                  )}
                </button>
              )
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t">
            <button
              onClick={toggleLanguage}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
            >
              <Globe className="w-5 h-5" />
              <span className="whitespace-nowrap">
                {actualLang === 'fr' ? 'English' : actualLang === 'en' ? 'العربية' : 'Français'}
              </span>
            </button>
          </div>
        </div>
      </aside>
    )
  }

  return (
    <aside className={`
      hidden md:block sticky top-16 h-[100vh] bg-white shadow-xl 
      md:hover:w-64 w-20
      group/sidebar
    `}>
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 mt-4 to-purple-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-gray-800 whitespace-nowrap opacity-0 md:group-hover/sidebar:opacity-100 transition-opacity duration-300">
              {t('dashboard')}
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id, item.locked)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 relative
                  ${item.locked 
                    ? 'bg-gray-50 text-gray-400 cursor-not-allowed' 
                    : 'hover:bg-blue-50 text-gray-700 hover:text-blue-600'
                  }
                `}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="whitespace-nowrap opacity-0 md:group-hover/sidebar:opacity-100 transition-opacity duration-300">
                  {item.label}
                </span>
                {item.locked && (
                  <Lock className="w-3 h-3 absolute left-3 md:left-auto md:right-3" />
                )}
                {hoveredItem === item.id && !item.locked && (
                  <ChevronRight className="w-4 h-4 absolute left-3 md:left-auto md:right-3 opacity-0 md:group-hover/sidebar:opacity-100 transition-opacity duration-300" />
                )}
              </button>
            )
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t pb-">
          <button
            onClick={toggleLanguage}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
          >
            <Globe className="w-5 h-5" />
            <span className="whitespace-nowrap opacity-0 md:group-hover/sidebar:opacity-100 transition-opacity duration-300">
              {actualLang === 'fr' ? 'English' : actualLang === 'en' ? 'العربية' : 'Français'}
            </span>
          </button>
        </div>
      </div>
    </aside>
  )
}
