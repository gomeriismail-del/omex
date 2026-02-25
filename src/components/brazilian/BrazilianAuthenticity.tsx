'use client'

import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
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
  description: {
    ar: string
    fr: string
    en: string
  }
  features: {
    title: {
      ar: string
      fr: string
      en: string
    }
    items: {
      ar: string[]
      fr: string[]
      en: string[]
    }
  }
  guarantee: {
    ar: string
    fr: string
    en: string
  }
}

const content: Content = {
  title: {
    ar: 'أصالة برازيلية مضمونة',
    fr: 'Authenticité Brésilienne Garantie',
    en: 'Guaranteed Brazilian Authenticity'
  },
  subtitle: {
    ar: 'منتجاتنا الأصلية مباشرة من البرازيل',
    fr: 'Nos produits originaux directement du Brésil',
    en: 'Our original products directly from Brazil'
  },
  description: {
    ar: 'نحن فخورون بتقديم منتجات العناية بالشعر البرازيلية الأصلية التي تم تطويرها وتصنيعها في البرازيل. كل منتج يحمل شهادة الأصالة وضمان الجودة العالية.',
    fr: 'Nous sommes fiers de proposer des produits de soins capillaires brésiliens authentiques développés et fabriqués au Brésil. Chaque produit porte un certificat d\'authenticité et une garantie de haute qualité.',
    en: 'We are proud to offer authentic Brazilian hair care products developed and manufactured in Brazil. Each product carries a certificate of authenticity and high quality guarantee.'
  },
  features: {
    title: {
      ar: 'لماذا تختار منتجاتنا البرازيلية؟',
      fr: 'Pourquoi choisir nos produits brésiliens ?',
      en: 'Why Choose Our Brazilian Products?'
    },
    items: {
      ar: [
        'منتجات أصلية 100% من البرازيل',
        'شهادة أصالة مع كل منتج',
        'مكونات طبيعية من غابات الأمازون',
        'تقنية برازيلية متقدمة'
      ],
      fr: [
        'Produits 100% authentiques du Brésil',
        'Certificat d\'authenticité avec chaque produit',
        'Ingrédients naturels de la forêt amazonienne',
        'Technologie brésilienne avancée'
      ],
      en: [
        '100% authentic products from Brazil',
        'Certificate of authenticity with each product',
        'Natural ingredients from Amazon rainforest',
        'Advanced Brazilian technology'
      ]
    }
  },
  guarantee: {
    ar: 'ضمان الأصالة البرازيلية',
    fr: 'Garantie d\'Authenticité Brésilienne',
    en: 'Brazilian Authenticity Guarantee'
  }
}

function FeatureCard({ icon, title, index, currentLang }: { 
  icon: string; 
  title: string; 
  index: number; 
  currentLang: Language 
}) {
  const [hasAnimated, setHasAnimated] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '-50px 0px'
  })

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [inView, hasAnimated])

  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl shadow-lg p-6 border border-[#A38151]/10 transition-all duration-700 hover:shadow-xl hover:scale-105 ${
        hasAnimated 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}
      style={{ 
        transitionDelay: `${index * 150}ms`
      }}
    >
      <div className="flex items-center space-x-4 space-x-reverse">
        <div className="flex-shrink-0 mx-2 w-16 h-16 bg-gradient-to-br from-[#D4C29A]/10 to-[#A38151]/10 rounded-xl flex items-center justify-center">
          <img 
            src={icon} 
            alt="Feature icon" 
            className="w-10 h-10 object-contain"
            style={{ filter: 'brightness(0) saturate(100%) invert(78%) sepia(31%) saturate(588%) hue-rotate(329deg) brightness(94%) contrast(92%)' }}
          />
        </div>
        <p className="text-gray-700 font-medium leading-relaxed">
          {title}
        </p>
      </div>
    </div>
  )
}

export default function BrazilianAuthenticity() {
  const { currentLang } = useLanguage()
  const lang = currentLang || 'ar'
  const [hasAnimated, setHasAnimated] = useState(false)
  const { ref: headerRef, inView: headerInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '-50px 0px'
  })

  useEffect(() => {
    if (headerInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [headerInView, hasAnimated])

  const brazilIcons = [
    '/svgsBrazil/brazil-flag-svgrepo-com.svg',
    '/svgsBrazil/brazil-map-svgrepo-com.svg',
    '/svgsBrazil/brazil-real-symbol-svgrepo-com.svg',
    '/svgsBrazil/flag-for-brazil-svgrepo-com.svg'
  ]

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-[#FAF8F5] to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            hasAnimated 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex justify-center  items-center space-x-4 space-x-reverse mb-6">
            {brazilIcons.map((icon, index) => (
              <div
                key={index}
                className="w-12 h-12 mx-2 bg-white rounded-full shadow-md p-2 border border-[#D4C29A]/20 animate-bounce-infinite"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <img 
                  src={icon} 
                  alt="Brazil icon" 
                  className="w-full h-full object-contain"
                  style={{ filter: 'brightness(0) saturate(100%) invert(78%) sepia(31%) saturate(588%) hue-rotate(329deg) brightness(94%) contrast(92%)' }}
                />
              </div>
            ))}
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {content.title[lang]}
          </h2>
          <p className="text-xl md:text-2xl text-[#A38151] font-medium mb-8">
            {content.subtitle[lang]}
          </p>
          <div className="max-w-4xl mx-auto">
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              {content.description[lang]}
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            {content.features.title[lang]}
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {content.features.items[lang].map((item: string, index: number) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#D4C29A]/5 to-[#A38151]/5 rounded-xl p-4 border border-[#D4C29A]/20 hover:border-[#A38151]/40 transition-all duration-300 hover:shadow-lg"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-white rounded-full shadow-md mx-auto mb-3 flex items-center justify-center">
                    <img 
                      src={brazilIcons[index % brazilIcons.length]}
                      alt="Feature icon" 
                      className="w-8 h-8 object-contain"
                      style={{ filter: 'brightness(0) saturate(100%) invert(78%) sepia(31%) saturate(588%) hue-rotate(329deg) brightness(94%) contrast(92%)' }}
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-700 leading-relaxed">
                    {item}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

       

        {/* Authenticity Certificate */}
        <div 
          className="bg-gradient-to-r from-[#A38151]/5 to-[#8B6F47]/5 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden backdrop-blur"
          style={{
            backgroundImage: 'url(/brazil/Brasil.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="relative z-10 bg-white/60 backdrop-blur-sm rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto ">
              <div className="w-24 h-24 bg-white rounded-full shadow-lg mx-auto mb-6 flex items-center justify-center">
                <img 
                  src="/svgsBrazil/brazil-flag-svgrepo-com.svg" 
                  alt="Brazil Flag" 
                  className="w-16 h-16 object-contain "
                  style={{ filter: 'brightness(0) saturate(100%) invert(78%) sepia(31%) saturate(588%) hue-rotate(329deg) brightness(94%) contrast(92%)' }}
                />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {content.guarantee[lang]}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                {lang === 'ar' ? 'كل منتج يأتي مع شهادة أصالة فريدة تضمن لك الحصول على منتج برازيلي أصلي 100%. نحن نعمل مباشرة مع المصنعين البرازيليين المعتمدين لضمان أعلى معايير الجودة.' :
                 lang === 'fr' ? 'Chaque produit est livré avec un certificat d\'authenticité unique garantissant que vous recevez un produit brésilien 100% authentique. Nous travaillons directement avec des fabricants brésiliens agréés pour garantir les normes de qualité les plus élevées.' :
                 'Each product comes with a unique authenticity certificate guaranteeing you receive a 100% genuine Brazilian product. We work directly with certified Brazilian manufacturers to ensure the highest quality standards.'}
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-[#A38151] to-[#8B6F47] text-white px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 text-lg font-semibold hover:scale-105 transform">
            {lang === 'ar' ? 'تحقق من أصالة منتجك' : 
             lang === 'fr' ? 'Vérifiez l\'authenticité de votre produit' : 
             'Verify Your Product Authenticity'}
          </button>
        </div>
      </div>
    </section>
  )
}
