'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

type Language = 'ar' | 'fr' | 'en'

interface ProductContent {
  title: {
    ar: string
    fr: string
    en: string
  }
  description: {
    ar: string
    fr: string
    en: string
  }
}

const product: ProductContent = {
  title: {
    ar: 'مجهر الأطفال الرقمي باكت إكسبلورر',
    fr: 'Microscope Numérique Pocket Explorer pour Enfants',
    en: 'Pocket Explorer Kids Digital Microscope'
  },
  description: {
    ar: 'جهاز تعليمي متقدم للأطفال مع صور عالية الدقة وقابلية إعادة الشحن',
    fr: 'Appareil éducatif avancé pour enfants avec images haute définition et rechargeable',
    en: 'Advanced educational device for kids with HD images and rechargeable battery'
  }
}

const productImages = [
  '/assets/suggest/71--+HeIQkL._AC_SL1500_.jpg',
  '/assets/suggest/71G2hYXNKcL._AC_SL1500_.jpg',
  '/assets/suggest/71J81b5oHkL._AC_SX425_.jpg',
  '/assets/suggest/71dXO6hQYHL._AC_SX425_.jpg',
  '/assets/suggest/71nAdBWxtdL._AC_SX425_.jpg',
  '/assets/suggest/81hjNUS9HpL._AC_SX425_.jpg',
  '/assets/suggest/81ix6dD2ftL._AC_SX425_.jpg'
]

export default function SuggestedProducts() {
  const { currentLang } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const content = {
    ar: {
      title: 'المنتج المقترح',
      subtitle: 'جهاز تعليمي متقدم للأطفال',
      orderNow: 'اطلب الآن',
      viewDetails: 'عرض التفاصيل',
      prevImage: 'الصورة السابقة',
      nextImage: 'الصورة التالية'
    },
    fr: {
      title: 'Produit Suggéré',
      subtitle: 'Appareil éducatif avancé pour enfants',
      orderNow: 'Commander Maintenant',
      viewDetails: 'Voir les Détails',
      prevImage: 'Image Précédente',
      nextImage: 'Image Suivante'
    },
    en: {
      title: 'Featured Product',
      subtitle: 'Advanced educational device for kids',
      orderNow: 'Order Now',
      viewDetails: 'View Details',
      prevImage: 'Previous Image',
      nextImage: 'Next Image'
    }
  }

  const currentContent = content[currentLang as keyof typeof content] || content.en

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1))
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {currentContent.title}
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#fcb24bff] to-[#8B6F47] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Horizontal Product Carousel */}
        <div className="relative">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              
              {/* Product Image Side */}
              <div className="relative aspect-square lg:aspect-auto lg:h-[600px] overflow-hidden bg-gradient-to-br from-[#fcb24bff] to-[#F5F0E8]">
                <div className="relative w-full h-full">
                  <Image 
                    src={productImages[currentIndex]}
                    alt={product.title[currentLang || 'en']}
                    fill
                    className="object-cover animate-fadeIn"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent animate-fadeIn"></div>
                </div>
                
                {/* Navigation Arrows */}
                <button
                  onClick={goToPrevious}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-20 backdrop-blur-sm"
                  aria-label={currentContent.prevImage}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-20 backdrop-blur-sm"
                  aria-label={currentContent.nextImage}
                >
                  <ChevronRight size={20} />
                </button>

                {/* Image Indicators */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 lg:hidden">
                  {productImages.map((_: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? 'bg-[#fcb24bff] scale-125' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Product Details Side */}
              <div className="p-8 lg:p-12 flex flex-col justify-center transition-all duration-500">
                <div className="mb-8">
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 transition-all duration-500">
                    {product.title[currentLang || 'en']}
                  </h3>
                  
                  <p className="text-gray-600 text-lg leading-relaxed mb-8 transition-all duration-500">
                    {product.description[currentLang || 'en']}
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/products"
                      className="px-8 py-3 bg-gradient-to-r from-[#fcb24bff] to-[#8B6F47] text-white font-medium rounded-lg hover:from-[#8B6F47] hover:to-[#fcb24bff] transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                    >
                      {currentContent.orderNow}
                    </Link>
                    <Link
                      href="/about"
                      className="px-8 py-3 border-2 border-[#fcb24bff] text-[#A38151] font-medium rounded-lg hover:bg-[#A38151] hover:text-white transition-all duration-300"
                    >
                      {currentContent.viewDetails}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {productImages.map((_: string, index: number) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-[#fcb24bff] w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All Products Button */}
        <div className="text-center mt-12">
          <Link 
            href="/products"
            className="inline-flex items-center px-8 py-4 bg-white text-[#A38151] font-semibold rounded-full border-2 border-[#fcb24bff] hover:bg-[#fcb24bff] hover:text-white transition-all duration-300 text-lg hover:shadow-xl hover:scale-105 transform"
          >
            {currentLang === 'ar' ? 'عرض جميع المنتجات' : 
             currentLang === 'fr' ? 'Voir Tous les Produits' : 
             'View All Products'}
            <svg className="w-5 h-5 ml-2 transform -rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
