'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Instagram, Facebook, Phone, Mail, MapPin, ChevronUp, ExternalLink } from 'lucide-react'

// Custom TikTok icon component
const TikTok = ({ size, className }: { size: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.36-4.08-1.1-2.03-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.69 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
)

const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/khaliid_gomeri?igsh=cXJqeGVvdGlpb2dh&utm_source=qr', icon: Instagram },
  { name: 'Facebook', href: 'https://www.facebook.com/share/1D1pAmG9CK/?mibextid=wwXIfr', icon: Facebook },
]

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Shop Now', href: '/products' },
  { name: 'Payment Methods', href: '/payment-method' },
  { name: 'About Us', href: '/about' }
]

const businessInfo = [
  { name: 'Business Hours', content: 'Mon-Fri: 9AM-6PM' },
  { name: 'Support', content: '24/7 Online Support' },
  { name: 'Shipping', content: 'Fast Delivery UAE' },
  { name: 'Payment', content: 'Secure Payment' }
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const currentYear = new Date().getFullYear()

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email)
    setEmail('')
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Main Footer */}
      <footer className="bg-gradient-to-tr from-[#fcb24b] to-yellow-200
 backdrop-blur-sm border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="py-8 md:py-12 lg:py-16">
            {/* Mobile Layout - Compact */}
            <div className="md:hidden">
              {/* Logo and Social */}
              <div className="flex flex-col items-center space-y-4 mb-6">
                <Image
                  src="/assets/logoclean2.png"
                  alt="Omex Logo"
                  width={120}
                  height={35}
                  className="h-8 w-auto"
                />
                <div className="flex items-center space-x-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center mx-2 justify-center w-8 h-8 rounded-full bg-[#A38151]/10 hover:bg-[#A38151] text-[#A38151] hover:text-white transition-all duration-300 border border-[#A38151]/20"
                        aria-label={social.name}
                      >
                        <Icon size={14} />
                      </a>
                    )
                  })}
                </div>
              </div>

              {/* Quick Links Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6 text-center">
                <div>
                  <h4 className="text-gray-900 font-semibold text-sm mb-3">Quick Links</h4>
                  <div className="space-y-2 ">
                    {quickLinks.slice(0, 2).map((link) => (
                      <a key={link.name} href={link.href} className="text-gray-600 hover:text-[#A38151] text-xs block transition-colors">
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-gray-900 font-semibold text-sm mb-3">Business Info</h4>
                  <div className="space-y-2">
                    {businessInfo.slice(0, 2).map((info) => (
                      <div key={info.name} className="text-gray-600 hover:text-[#A38151] text-xs block transition-colors">
                        <div className="font-medium">{info.name}</div>
                        <div className="text-xs">{info.content}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <Phone size={12} className="text-[#A38151]" />
                  <span className="text-gray-600 text-xs">+971 55 840 6027</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Mail size={12} className="text-[#A38151]" />
                  <span className="text-gray-600 text-xs">tnshopping16@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Desktop Layout - Original */}
            <div className="hidden md:block">
              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
                
                {/* Brand Area */}
                <div className="lg:col-span-1">
                  <div className="space-y-6">
                    {/* Logo */}
                    <div className="flex items-center">
                      <Image
                        src="/assets/logoclean2.png"
                        alt="Omex Logo"
                        width={140}
                        height={40}
                        className="h-10 w-auto transition-all duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Crafting exceptional digital experiences with innovative design and cutting-edge technology solutions.
                    </p>
                    
                    {/* Premium Slogan */}
                    <div className="border-l-4 border-[#906E40] pl-3">
                      <p className="text-[#906E40] font-medium text-sm italic">
                        Excellence in Every Pixel
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="text-center sm:text-left">
                  <h3 className="text-gray-900 font-semibold text-lg mb-6 sm:mb-8">Quick Links</h3>
                  <ul className="space-y-3 sm:space-y-4">
                    {quickLinks.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-white sm:text-gray-600 hover:text-[#906E40] transition-all duration-300 text-sm flex items-center group py-2 sm:py-1 px-4 sm:px-0 rounded-lg sm:rounded-none hover:bg-white/10 sm:hover:bg-transparent justify-center sm:justify-start transform hover:scale-105 sm:hover:scale-100"
                        >
                          <ChevronUp 
                            size={14} 
                            className="mr-2 rotate-90 opacity-0 group-hover:opacity-100 transition-all duration-300" 
                          />
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Business Info */}
                <div className="text-center sm:text-left">
                  <h3 className="text-gray-900 font-semibold text-lg mb-6 sm:mb-8">Business Info</h3>
                  <div className="space-y-3 sm:space-y-4">
                    {businessInfo.map((info) => (
                      <div key={info.name} className="text-white sm:text-gray-600 transition-all duration-300 text-sm py-2 sm:py-1 px-4 sm:px-0 rounded-lg sm:rounded-none hover:bg-white/10 sm:hover:bg-transparent justify-center sm:justify-start">
                        <div className="font-medium group-hover:text-[#906E40] transition-colors duration-300">
                          {info.name}
                        </div>
                        <div className="text-xs opacity-80">
                          {info.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact & Newsletter */}
                <div className="space-y-8">
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-gray-900 font-semibold text-lg mb-8">Contact Us</h3>
                    <div className="space-y-4">
                      <div className="flex items-start group">
                        <Phone size={16} className="text-[#906E40] mr-4 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-gray-600 text-sm group-hover:text-gray-900 transition-colors duration-300">
                            +971 55 840 6027
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start group">
                        <Mail size={16} className="text-[#906E40] mr-4 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-gray-600 text-sm group-hover:text-gray-900 transition-colors duration-300">
                            Omex@gmail.com
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start group">
                        <MapPin size={16} className="text-[#906E40] mr-4 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-gray-600 text-sm group-hover:text-gray-900 transition-colors duration-300">
                            <a href="" target="_blank" rel="noopener noreferrer" className="hover:text-[#906E40] underline">
                              View Location
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div>
                    <h3 className="text-gray-900 font-semibold text-lg mb-6">Follow Us</h3>
                    <div className="flex items-center space-x-4">
                    {socialLinks.map((social) => {
                      const Icon = social.icon
                      return (
                        <a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex mx-2 items-center justify-center w-10 h-10 rounded-full bg-gray-50 hover:bg-[#906E40] text-gray-600 hover:text-white transition-all duration-300 hover:scale-110 border border-gray-200 hover:border-[#906E40]"
                          aria-label={social.name}
                        >
                          <Icon size={16} />
                        </a>
                      )
                    })}
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div className="bg-brown-200 backdrop-blur-sm border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-8">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-8 text-center sm:text-left">
                {/* Copyright */}
                <div className="text-gray-600 text-sm">
                  <p>© {currentYear} Omex. All rights reserved.</p>
                </div>

                {/* Bottom Links */}
                <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-8 space-y-3 sm:space-y-0">
                  <a 
                    href="/privacy" 
                    className="text-white hover:text-[#906E40] transition-all duration-300 text-sm font-medium py-2 px-4 rounded-lg hover:bg-white/10 transform hover:scale-105"
                  >
                    Privacy Policy
                  </a>
                  <a 
                    href="/terms" 
                    className="text-white hover:text-[#906E40] transition-all duration-300 text-sm font-medium py-2 px-4 rounded-lg hover:bg-white/10 transform hover:scale-105"
                  >
                    Terms of Service
                  </a>
                </div>

                {/* Scroll to Top Button */}
                <button
                  onClick={scrollToTop}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white hover:bg-[#906E40] text-gray-600 hover:text-white transition-all duration-300 hover:scale-110 border border-gray-200 hover:border-[#906E40] shadow-sm"
                  aria-label="Scroll to top"
                >
                  <ChevronUp size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
