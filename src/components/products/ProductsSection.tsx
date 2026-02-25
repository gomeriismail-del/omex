'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'

type Language = 'ar' | 'fr' | 'en'

interface Content {
  title: {
    ar: string
    fr: string
    en: string
  }
  subtitle: {
    ar: string
    fr: string
    en: string
  }
  features: {
    ar: string[]
    fr: string[]
    en: string[]
  }
  learnMore: {
    ar: string
    fr: string
    en: string
  }
  badges: {
    fastShipping: {
      ar: string
      fr: string
      en: string
    }
    freeReturns: {
      ar: string
      fr: string
      en: string
    }
    moneyBack: {
      ar: string
      fr: string
      en: string
    }
  }
}

const content: Content = {
  title: {
    ar: 'مجهر الأطفال الرقمي باكت إكسبلورر',
    fr: 'Microscope Numérique Pocket Explorer pour Enfants',
    en: 'Pocket Explorer Kids Digital Microscope'
  },
  subtitle: {
    ar: 'اكتشاف العلوم والتكنولوجيا للأطفال بصور عالية الدقة، قابلية إعادة الشحن، وأدوات بسيطة للاستخدام في المنزل أو المدرسة',
    fr: 'Découverte STEM pratique pour les enfants avec des images HD, portabilité rechargeable et commandes simples à la maison ou à l\'école',
    en: 'Hands-on STEM discovery for kids with HD images, rechargeable portability, and simple controls at home or school'
  },
  features: {
    ar: [
      'صور عالية الوضوح للاكتشاف الواضح',
      'قابل لإعادة الشحن ومحمول',
      'أدوات بسيطة مناسبة للأطفال',
      'مثالي للمنزل والمدرسة'
    ],
    fr: [
      'Images HD pour une découverte claire',
      'Rechargeable et portable',
      'Commandes simples pour les enfants',
      'Parfait pour la maison et l\'école'
    ],
    en: [
      'HD images for clear discovery',
      'Rechargeable and portable',
      'Simple controls for kids',
      'Perfect for home and school'
    ]
  },
  learnMore: {
    ar: 'اطلب الآن',
    fr: 'Commander maintenant',
    en: 'Order Now'
  },
  badges: {
    fastShipping: {
      ar: 'شحن سريع',
      fr: 'Livraison rapide',
      en: 'Fast Shipping'
    },
    freeReturns: {
      ar: 'مرتجعات مجانية',
      fr: 'Retours gratuits',
      en: 'Free Returns'
    },
    moneyBack: {
      ar: 'ضمان استرجاع المال لمدة 30 يوم',
      fr: 'Garantie de remboursement de 30 jours',
      en: '30-Day Money Back Guarantee'
    }
  }
}

const products = [
  {
    id: 1,
    color: 'white',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    image: '/assets/variant/71Iy3vfSX+L._AC_SX425_.png'
  },
  {
    id: 2,
    color: 'purple',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
    image: '/assets/variant/71Iy3vfSX+L._AC_SX425_ (1).png'
  },
  {
    id: 3,
    color: 'orange',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    image: '/assets/variant/71Iy3vfSX+L._AC_SX425_ (2).png'
  },
  {
    id: 4,
    color: 'pink',
    bgColor: 'bg-white',
    borderColor: 'border-gray-200',
    image: '/assets/variant/71Iy3vfSX+L._AC_SX425_ (3).png'
  }
]

export default function ProductsSection() {
  const { currentLang } = useLanguage()
  const router = useRouter()
  const isRTL = currentLang === 'ar'

  // Fallback to Arabic if currentLang is null
  const lang = currentLang || 'ar'

  return (
    <section 
      className={`py-16 px-4 bg-gray-50 ${isRTL ? 'rtl' : 'ltr'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {content.title[lang]}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {content.subtitle[lang]}
          </p>
        </div>
        
        {/* Mobile Layout - Horizontal scroll */}
        <div className="md:hidden flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory">
          {products.map((product) => (
            <div
              key={product.id}
              className={`${product.bgColor} ${product.borderColor} border-2 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 flex-none w-80 snap-center`}
            >
              <div className="relative h-48 mb-4">
                <Image
                  src={product.image}
                  alt={`${product.color} Pocket Explorer Microscope`}
                  fill
                  className="object-contain"
                  loading="lazy"
                  sizes="(max-width: 768px) 320px, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {content.title[lang]}
                </h3>
                
                <div className="text-sm text-gray-600 space-y-1">
                  {content.features[lang].map((feature: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✔️</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4">
                  <button 
                    onClick={() => router.push('/products/pocket-explorer')}
                    className="w-full bg-[#fcb24bff] text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-all duration-200 transform hover:scale-105 active:scale-95"
                  >
                    {content.learnMore[lang]}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Layout - Keep original grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className={`${product.bgColor} ${product.borderColor} border-2 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300`}
            >
              <div className="relative h-48 mb-4">
                <Image
                  src={product.image}
                  alt={`${product.color} Pocket Explorer Microscope`}
                  fill
                  className="object-contain"
                  loading="lazy"
                  sizes="(max-width: 768px) 320px, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {content.title[lang]}
                </h3>
                
                <div className="text-sm text-gray-600 space-y-1">
                  {content.features[lang].map((feature: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✔️</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4">
                  <button 
                    onClick={() => router.push('/products/pocket-explorer')}
                    className="w-full bg-[#fcb24bff] text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-all duration-200 transform hover:scale-105 active:scale-95"
                  >
                    {content.learnMore[lang]}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <span className="flex items-center">
              <span className="text-green-500 mr-2">🚚</span>
              {content.badges.fastShipping[lang]}
            </span>
            <span className="flex items-center">
              <span className="text-green-500 mr-2">↩️</span>
              {content.badges.freeReturns[lang]}
            </span>
            <span className="flex items-center">
              <span className="text-green-500 mr-2">💰</span>
              {content.badges.moneyBack[lang]}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
