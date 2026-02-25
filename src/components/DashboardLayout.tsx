'use client'

import { useState, useEffect } from 'react'
import { Menu, Bell, Search, User as UserIcon, LogOut } from 'lucide-react'
import DashboardSidebar from './DashboardSidebar'

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
    searchPlaceholder: 'Search...',
    notifications: 'Notifications',
    profile: 'Profile',
    logout: 'Logout'
  },
  fr: {
    searchPlaceholder: 'Rechercher...',
    notifications: 'Notifications',
    profile: 'Profil',
    logout: 'Déconnexion'
  },
  ar: {
    searchPlaceholder: 'البحث...',
    notifications: 'الإشعارات',
    profile: 'الملف الشخصي',
    logout: 'تسجيل الخروج'
  }
}

interface DashboardLayoutProps {
  children: React.ReactNode
  currentLang?: string
}

export default function DashboardLayout({ children, currentLang = 'fr' }: DashboardLayoutProps) {
  const [isRTL, setIsRTL] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [actualLang, setActualLang] = useState(currentLang)

  const t = (key: string) => translations[actualLang as SupportedLanguage][key] || key

  // Load saved language preference on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'fr'
    setActualLang(savedLang)
    document.documentElement.lang = savedLang
    document.documentElement.dir = (savedLang as SupportedLanguage) === 'ar' ? 'rtl' : 'ltr'
  }, [])

  // Listen for language change events
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      const { language } = event.detail
      setActualLang(language)
      // Update document language and direction
      document.documentElement.lang = language
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
      setIsRTL(language === 'ar')
    }
    
    window.addEventListener('languageChange', handleLanguageChange as EventListener)
    return () => window.removeEventListener('languageChange', handleLanguageChange as EventListener)
  }, [])

  // Update when currentLang prop changes
  useEffect(() => {
    if (currentLang !== actualLang) {
      setActualLang(currentLang)
      document.documentElement.lang = currentLang
      document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr'
      setIsRTL(currentLang === 'ar')
    }
  }, [currentLang, actualLang])

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('authToken')
    localStorage.removeItem('userInfo')
    
    // Clear cookie
    document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; secure; samesite=strict'
    
    // Redirect to login
    window.location.href = '/login'
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className={`bg-gray-50 ${isRTL ? 'rtl' : 'ltr'} overflow-x-hidden min-h-screen mt-10`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <DashboardSidebar
        isRTL={isRTL}
        currentLang={actualLang}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        isMobile={true}
      />

      {/* Fixed Top Navigation */}
      <header className="fixed md:mt-20  mt-2 top-0 left-0 right-0 bg-white shadow-sm border-b z-30">
        <div className="md:hidden md:mt-0 flex mt-20 items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                className="pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg hover:bg-gray-100 relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {showNotifications && (
                <div className="absolute top-12 left-0 w-80 bg-white rounded-lg shadow-lg border p-4 z-50">
                  <h3 className="font-semibold mb-3">{t('notifications')}</h3>
                  <div className="space-y-2">
                    <div className="p-2 hover:bg-gray-50 rounded">New order received</div>
                    <div className="p-2 hover:bg-gray-50 rounded">User registration</div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-white" />
                </div>
              </button>
              
              {showProfile && (
                <div className="absolute top-12 left-0 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2">
                    <UserIcon className="w-4 h-4" />
                    {t('profile')}
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-red-600 hover:text-red-700"
                  >
                    <LogOut className="w-4 h-4" />
                    {t('logout')}
                  </button>
                </div>
              )}
            </div>

            {/* Direct Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors"
              title={t('logout')}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">{t('logout')}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex pt-16">
        {/* Desktop Sidebar */}
        <DashboardSidebar
          isRTL={isRTL}
          currentLang={actualLang}
          isOpen={false}
          setIsOpen={() => {}}
          isMobile={false}
        />

        {/* Desktop Header */}
        <header className="hidden md:flex fixed top-0 right-0 w-screen bg-white shadow-sm border-b z-30 mt-28 ">
          <div className="flex-1 flex items-center justify-between px-6 py-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  className="pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-lg hover:bg-gray-100 relative"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                
                {showNotifications && (
                  <div className="absolute top-12 left-0 w-80 bg-white rounded-lg shadow-lg border p-4 z-50">
                    <h3 className="font-semibold mb-3">{t('notifications')}</h3>
                    <div className="space-y-2">
                      <div className="p-2 hover:bg-gray-50 rounded">New order received</div>
                      <div className="p-2 hover:bg-gray-50 rounded">User registration</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <UserIcon className="w-4 h-4 text-white" />
                  </div>
                </button>
                
                {showProfile && (
                  <div className="absolute top-12 left-0 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2">
                      <UserIcon className="w-4 h-4" />
                      {t('profile')}
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-red-600 hover:text-red-700"
                    >
                      <LogOut className="w-4 h-4" />
                      {t('logout')}
                    </button>
                  </div>
                )}
              </div>

              {/* Direct Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors"
                title={t('logout')}
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">{t('logout')}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden md:pt-2 pt-2">
          {children}
        </main>
      </div>
    </div>
  )
}
