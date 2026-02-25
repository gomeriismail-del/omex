'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Instagram, Facebook, User, ShoppingBag, ChevronDown, Menu, X, Globe, Phone, Clock } from 'lucide-react'
import { useLanguage, languages, type LanguageConfig, type Language } from '@/contexts/LanguageContext'



const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/khaliid_gomeri?igsh=cXJqeGVvdGlpb2dh&utm_source=qr', icon: Instagram },
  { name: 'Facebook', href: 'https://www.facebook.com/share/1D1pAmG9CK/?mibextid=wwXIfr', icon: Facebook },
]

const navLinks = {
  ar: [
    { name: 'الرئيسية', href: '/' },
    { name: 'تسوق الآن', href: '/products' },
    { name: 'طرق الدفع', href: '/payment-method' },
    { name: 'من نحن', href: '/about' },
  ],
  fr: [
    { name: 'Accueil', href: '/' },
    { name: 'Boutique', href: '/products' },
    { name: 'Méthodes de Paiement', href: '/payment-method' },
    { name: 'À propos', href: '/about' },
  ],
  en: [
    { name: 'Home', href: '/' },
    { name: 'Shop Now', href: '/products' },
    { name: 'Payment Methods', href: '/payment-method' },
    { name: 'About Us', href: '/about' },
  ]
}

export default function Navbar() {
  const { currentLang, currentLangConfig, setLanguage } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false)
  const [showUpperNav, setShowUpperNav] = useState(true)

  useEffect(() => {
    if (!currentLang || !currentLangConfig) return

    const scrollHandler = () => {
      const scrollTop = window.scrollY

      setIsScrolled(scrollTop > 10)

      if (scrollTop < 80) {
        setShowUpperNav(true)
      } else {
        setShowUpperNav(false)
      }
    }

    window.addEventListener('scroll', scrollHandler, { passive: true })
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [currentLang, currentLangConfig])

  // Don't render until language is loaded
  if (!currentLang || !currentLangConfig) {
    return null
  }

  const currentNavLinks = navLinks[currentLang]


  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode)
    setIsLangDropdownOpen(false)
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Upper Navbar - Hidden on scroll */}
      <div 
        className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out transform ${
          showUpperNav ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
        dir={currentLangConfig.dir}
      >
        <div className="bg-gradient-to-tr from-[#fcb24b] to-yellow-200 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-between h-10 sm:h-11 md:h-12 lg:h-13">
              {/* Left side - Contact info */}
              <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-5 lg:space-x-6 space-x-reverse">
                <div className="flex items-center space-x-2 space-x-reverse text-white/90 text-xs sm:text-sm">
                  <Phone size={14} className="text-white" />
                  <span className="font-medium truncate hidden sm:inline">+971 55 840 6027</span>
                </div>
                <div className="h-4 w-px bg-white/30 hidden sm:block"></div>
                <div className="flex items-center space-x-1 space-x-reverse text-white/90 text-xs sm:text-sm">
                  <Clock size={12} className="text-white" />
                  <span className="font-medium">{currentLang === 'ar' ? 'خدمة 24/7' : currentLang === 'fr' ? 'Service 24/7' : '24/7 Service'}</span>
                </div>
              </div>

              {/* Right side - Social links and Account/Cart */}
              <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-5 space-x-reverse">
                {/* Social Links */}
                <div className="flex items-center space-x-1.5 sm:space-x-2 space-x-reverse">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/90 hover:bg-white/60 text-white/80 hover:text-[#e2a858]  transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/30"
                        aria-label={social.name}
                      >
                        <Icon className="text-[#e2a858] " size={14} />
                      </a>
                    )
                  })}
                </div>

                <div className="h-4 w-px bg-white/30 hidden sm:block"></div>

              
                <div className="h-3 sm:h-3.5 md:h-4 w-px bg-white/20 hidden lg:block"></div>

                {/* Language Switcher */}
                <div className="relative">
                  <button
                    onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                    className="flex items-center bg-white space-x-2 space-x-reverse text-xs sm:text-sm text-white/90 hover:text-white transition-all duration-300 px-3 py-1.5 rounded-lg hover:bg-white/60 backdrop-blur-sm border border-white/30"
                  >
                    <Globe  className="text-[#e2a858] " size={14} />
                    <span className="font-medium text-[#e2a858]  hidden sm:inline">{currentLangConfig.name}</span>
                    <ChevronDown  
                      size={12} 
                      className={`transition-transform duration-200 text-[#e2a858]  ${
                        isLangDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isLangDropdownOpen && (
                    <div className={`absolute top-full mt-1 w-28 rounded-lg shadow-lg bg-white/90 border border-gray-200 py-1 z-50 ${
                      currentLangConfig.dir === 'rtl' ? 'left-0 right-auto' : 'right-0 left-auto'
                    }`}>
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={`flex items-center space-x-2 space-x-reverse w-full px-3 py-2 text-sm text-gray-700 hover:bg-[#e2a858]/10 hover:text-[#e2a858]  transition-all duration-200 ${
                            lang.code === currentLang ? 'text-[#e2a858]  font-medium bg-[#e2a858]/5' : ''
                          }`}
                        >
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Navbar - Always visible */}
      <nav 
        className={`navbar sticky top-0 left-0 right-0 z-40 transition-all duration-300 ease-out ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20' 
            : 'bg-white/30 backdrop-blur-2xl border-b border-white/10 shadow-2xl'
        } ${showUpperNav ? 'top-8 sm:top-9 md:top-10 lg:top-11' : 'top-0'} ${
          isMobileMenuOpen ? '-translate-y-full' : 'translate-y-0'
        }`}
        dir={currentLangConfig.dir}
      >
        <div className=" mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 md:h-16 lg:h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center group">
                {currentLang === 'ar' ? (
                  <>
                    <span className="-ml-2 sm:ml-1 text-lg sm:text-xl md:text-2xl font-bold text-[#e2a858a6] opacity-100 lg:opacity-0 transition-all duration-500 translate-x-0 lg:translate-x-2 group-hover:lg:opacity-100 group-hover:lg:translate-x-0 whitespace-nowrap">
                      Mex
                    </span>
                    <Image
                      src="/assets/logoclean2.png"
                      alt="Omex Front Logo"
                      width={160}
                      height={50}
                      className="h-12 w-auto p-2 sm:h-10 md:h-12 lg:h-14 cursor-pointer transition-all duration-300 hover:scale-105 hover:drop-shadow-lg"
                    />
                  </>
                ) : (
                  <>
                    <Image
                      src="/assets/logoclean2.png"
                      alt="Omex Front Logo"
                      width={160}
                      height={50}
                      className="h-12 w-auto p-2 sm:h-10 md:h-12 lg:h-14 cursor-pointer transition-all duration-300 hover:scale-105 hover:drop-shadow-lg"
                    />
                    <span className="-ml-2 sm:ml-1 text-lg sm:text-xl md:text-2xl font-bold text-[#e2a858a6] opacity-100 lg:opacity-0 transition-all duration-500 translate-x-0 lg:translate-x-2 group-hover:lg:opacity-100 group-hover:lg:translate-x-0 whitespace-nowrap">
                      Mex
                    </span>
                  </>
                )}
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 space-x-reverse">
                {currentNavLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm sm:text-base md:text-lg font-normal text-black hover:text-[#fcb24bff] transition-all duration-300 relative group py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 md:px-5 rounded-lg hover:bg-white/60"
                  >
                    {link.name}
                    <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#A38151] to-[#8B6F47] transition-all duration-300 group-hover:w-6 sm:group-hover:w-8 rounded-full"></span>
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 sm:p-2.5 md:p-3 text-black hover:text-black transition-all duration-300 rounded-lg hover:bg-white/60"
              >
                {isMobileMenuOpen ? <X size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" /> : <Menu size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Menu */}
      <div 
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Sidebar */}
        <div 
          className={`sticky top-0 ${
            currentLangConfig.dir === 'rtl' ? 'right-0' : 'left-0'
          } h-screen w-80 max-w-[85vw] bg-white/90 backdrop-blur-sm shadow-2xl transition-all duration-300 ease-in-out transform ${
            isMobileMenuOpen 
              ? currentLangConfig.dir === 'rtl' ? 'translate-x-0' : 'translate-x-0'
              : currentLangConfig.dir === 'rtl' ? 'translate-x-full' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 md:p-6 border-b border-gray-100 bg-gradient-to-r from-[#FAF8F5] to-white">
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center group">
                  {currentLang === 'ar' ? (
                    <> <span className="-ml-2 sm:ml-1 text-lg sm:text-xl md:text-2xl font-bold text-[#e2a858a6] opacity-100 lg:opacity-0 transition-all duration-500 translate-x-0 lg:translate-x-2 group-hover:lg:opacity-100 group-hover:lg:translate-x-0 whitespace-nowrap">
                      Mex
                    </span>
                     <Image
                      src="/assets/logoclean2.png"
                      alt="Omex Front Logo"
                      width={160}
                      height={50}
                      className="h-12 w-auto p-2 sm:h-10 md:h-12 lg:h-14 cursor-pointer transition-all duration-300 hover:scale-105 hover:drop-shadow-lg"
                    /></>
                   
                  ) : (
                    <Image
                      src="/assets/logoclean2.png"
                      alt="Omex Front Logo"
                      width={160}
                      height={50}
                      className="h-12 w-auto p-2 sm:h-10 md:h-12 lg:h-14 cursor-pointer transition-all duration-300 hover:scale-105 hover:drop-shadow-lg"
                    />
                  )}
                  {currentLang !== 'ar' ? (
                    <span className="-ml-2 sm:ml-1 text-lg sm:text-xl md:text-2xl font-bold text-[#e2a858a6] opacity-100 lg:opacity-0 transition-all duration-500 translate-x-0 lg:translate-x-2 group-hover:lg:opacity-100 group-hover:lg:translate-x-0 whitespace-nowrap">
                      Mex
                    </span>
                  ) : (
                    <></>
                  )}
                </Link>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 md:p-6">
              <div className="space-y-2">
                {currentNavLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-base sm:text-lg font-medium text-gray-700 hover:text-[#A38151] transition-all duration-200 py-3 px-4 rounded-lg hover:bg-[#A38151]/5 backdrop-blur-sm border border-transparent hover:border-[#A38151]/20"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
              
            
              
              {/* Language Switcher in Mobile Menu */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-medium text-gray-500 mb-3">
                  {currentLang === 'ar' ? 'اللغة' : currentLang === 'fr' ? 'Langue' : 'Language'}
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`flex flex-col items-center space-y-1 p-3 rounded-lg border transition-all duration-200 ${
                        lang.code === currentLang 
                          ? 'bg-[#A38151]/10 border-[#A38151]/30 text-[#A38151]' 
                          : 'border-gray-200 hover:border-[#A38151]/30 hover:bg-[#A38151]/5 text-gray-700'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="text-xs font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sidebar Footer */}
            <div className="p-4 sm:p-5 md:p-6 border-t border-gray-100 bg-gradient-to-r from-[#FAF8F5] to-white">
              <div className="flex items-center justify-center space-x-4 space-x-reverse">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-[#A38151]/10 hover:bg-[#A38151]/20 text-[#A38151] hover:scale-110 transition-all duration-200"
                      aria-label={social.name}
                    >
                      <Icon size={18} />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
