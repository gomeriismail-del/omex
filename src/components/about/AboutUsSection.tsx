'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'

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
}

const content: Content = {
  title: {
    ar: 'من نحن',
    fr: 'À propos de nous',
    en: 'About Us'
  },
  subtitle: {
    ar: 'OMEX هو الموقع الرسمي لمنتجات التعليم العلمي للأطفال',
    fr: 'OMEX est le site officiel des produits éducatifs scientifiques pour enfants',
    en: 'OMEX is the official website for educational science products for kids'
  },
  description: {
    ar: 'الرائدة في تقديم حلول تعليمية مبتكرة وآمنة للأطفال. نؤمن بأن التعليم الممتع يبدأ من الاستكشاف العملي، ولهذا نحرص على توفير منتجات أصلية، مجرّبة ومصممة لتعزيز الفضول العلمي وتنمية المهارات لدى الأطفال.',
    fr: 'Leader dans la fourniture de solutions éducatives innovantes et sûres pour les enfants. Nous croyons que l\'apprentissage amusant commence par l\'exploration pratique, c\'est pourquoi nous nous efforçons de fournir des produits authentiques, testés et conçus pour stimuler la curiosité scientifique et développer les compétences chez les enfants.',
    en: 'The leader in providing innovative and safe educational solutions for kids. We believe that fun learning starts with hands-on exploration, which is why we strive to provide authentic, tested products designed to spark scientific curiosity and develop skills in children.'
  },
  features: {
    title: {
      ar: 'لماذا تختار OMEX؟',
      fr: 'Pourquoi choisir OMEX ?',
      en: 'Why Choose OMEX?'
    },
    items: {
      ar: [
        'منتجات تعليمية أصلية ومجربة',
        'جودة عالية وتصميم آمن للأطفال',
        'للأعمار المناسبة والمراحل التعليمية',
        'نتائج تعليمية ملموسة',
        'توصيل سريع لجميع الولايات',
        'خدمة عملاء متوفرة 24/7'
      ],
      fr: [
        'Produits éducatifs authentiques et testés',
        'Haute qualité et conception sécurisée pour enfants',
        'Adapté aux âges et niveaux éducatifs',
        'Résultats d\'apprentissage visibles',
        'Livraison rapide dans tous les États',
        'Service client disponible 24/7'
      ],
      en: [
        'Authentic and tested educational products',
        'High quality and child-safe design',
        'Suitable for appropriate ages and learning stages',
        'Tangible educational results',
        'Fast delivery to all states',
        'Customer service available 24/7'
      ]
    }
  }
}

const images = [
  {
    src: '/assets/about us/71Vmn9Yq3XL._AC_SL1500_.jpg',
    alt: 'Pocket Explorer Kids Digital Microscope',
    title: {
      ar: 'مجهر الأطفال الرقمي',
      fr: 'Microscope Numérique pour Enfants',
      en: 'Kids Digital Microscope'
    },
    description: {
      ar: 'جهاز متطور لاكتشاف عالم الخلايا والميكروبات',
      fr: 'Appareil avancé pour découvrir le monde des cellules et des microbes',
      en: 'Advanced device for discovering the world of cells and microorganisms'
    }
  },
  {
    src: '/assets/about us/foor.jpg',
    alt: 'Educational Science Tool',
    title: {
      ar: 'أداة علمية تعليمية',
      fr: 'Outil Scientifique Éducatif',
      en: 'Educational Science Tool'
    },
    description: {
      ar: 'تعلم العلوم بطريقة عملية وممتعة',
      fr: 'Apprenez les sciences de manière pratique et amusante',
      en: 'Learn science in a practical and fun way'
    }
  },
  {
    src: '/assets/about us/two.jpg',
    alt: 'STEM Learning Device',
    title: {
      ar: 'جهاز تعلم العلوم والتكنولوجيا',
      fr: 'Appareil d\'Apprentissage STEM',
      en: 'STEM Learning Device'
    },
    description: {
      ar: 'نحن ملتزمون بتوفير تجربة تعليمية سهلة وآمنة',
      fr: 'Nous nous engageons à fournir une expérience d\'apprentissage facile et sécurisée',
      en: 'We are committed to providing an easy and safe learning experience'
    }
  }
]

function AnimatedImage({ image, index, currentLang }: { image: typeof images[0]; index: number; currentLang: Language }) {
  const [hasAnimated, setHasAnimated] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: '-50px 0px'
  })

  const delay = index * 200

  useEffect(() => {
    // Reset animation when scrolling back to top
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setHasAnimated(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [inView, hasAnimated])

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-1000 ease-out ${
        hasAnimated 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-20'
      }`}
      style={{ 
        transitionDelay: `${delay}ms`
      }}
    >
      <div className="aspect-w-16 aspect-h-12 relative h-64 md:h-80">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <h3 className="text-white text-xl md:text-2xl font-bold mb-2">
            {image.title[currentLang]}
          </h3>
          <p className="text-white/90 text-sm md:text-base">
            {image.description[currentLang]}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function AboutUsSection() {
  const [currentLang, setCurrentLang] = useState<Language>('ar')
  const { ref: headerRef, inView: headerInView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  })
  const { ref: featuresRef, inView: featuresInView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  })
  const { ref: ctaRef, inView: ctaInView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  })

  useEffect(() => {
    // Get current language from HTML document
    const lang = document.documentElement.lang as Language
    if (lang && ['ar', 'fr', 'en'].includes(lang)) {
      setCurrentLang(lang)
    }

    // Listen for language changes
    const handleLanguageChange = () => {
      const newLang = document.documentElement.lang as Language
      if (newLang && ['ar', 'fr', 'en'].includes(newLang)) {
        setCurrentLang(newLang)
      }
    }

    const observer = new MutationObserver(handleLanguageChange)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang']
    })

    return () => observer.disconnect()
  }, [])

  const isRTL = currentLang === 'ar'

  return (
    <section 
      className={`py-12 md:py-16 bg-gradient-to-br from-gray-50 to-white ${isRTL ? 'rtl' : 'ltr'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {content.title[currentLang]}
          </h2>
          <p className="text-lg md:text-xl text-[#fcb24bff] font-medium mb-6 max-w-4xl mx-auto">
            {content.subtitle[currentLang]}
          </p>
          <div className="max-w-4xl mx-auto">
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              {content.description[currentLang]}
            </p>
          </div>
        </div>

        {/* Images Grid - Creative Mobile Layout */}
        <div className="mb-12 md:mb-16">
          {/* Mobile Layout - Creative Design */}
          <div className="md:hidden">
            {/* First image - Full width with special treatment */}
            <div className="mb-4">
              <AnimatedImage 
                image={images[0]} 
                index={0} 
                currentLang={currentLang}
              />
            </div>
            
            {/* Second and Third images - Side by side with staggered layout */}
            <div className="grid grid-cols-2 gap-3">
              <div className="transform -rotate-2">
                <AnimatedImage 
                  image={images[1]} 
                  index={1} 
                  currentLang={currentLang}
                />
              </div>
              <div className="transform rotate-2">
                <AnimatedImage 
                  image={images[2]} 
                  index={2} 
                  currentLang={currentLang}
                />
              </div>
            </div>
          </div>

          {/* Desktop Layout - Keep original */}
          <div className="hidden md:grid grid-cols-3 gap-6">
            {images.map((image, index) => (
              <AnimatedImage 
                key={index} 
                image={image} 
                index={index} 
                currentLang={currentLang}
              />
            ))}
          </div>
        </div>

        {/* Features */}
        <div ref={featuresRef} className="bg-gradient-to-r from-[#A38151]/10 to-[#8B6F47]/10 rounded-3xl p-6 md:p-8">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 text-center">
            {content.features.title[currentLang]}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.features.items[currentLang].map((item, index) => (
              <div 
                key={index}
                className="flex items-start space-x-3 space-x-reverse"
              >
                <div className="flex-shrink-0 w-6 h-6 bg-[#fcb24bff] rounded-full flex items-center justify-center mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div ref={ctaRef} className="text-center mt-12">
          <p className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
            {currentLang === 'ar' ? 'اكتشف عالم العلوم مع OMEX… لأن تعليم طفلك يستحق الأفضل.' : 
             currentLang === 'fr' ? 'Découvrez le monde des sciences avec OMEX… parce que l\'éducation de votre enfant mérite le meilleur.' :
             'Discover the world of science with OMEX… because your child\'s education deserves the best.'}
          </p>
          <a
            href="/products"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#fcb24bff] to-[#8B6F47] text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:from-[#8B6F47] hover:to-[#A38151]"
          >
            {currentLang === 'ar' ? 'تسوق الآن' : 
             currentLang === 'fr' ? 'Boutiquer maintenant' :
             'Shop Now'}
          </a>
        </div>
      </div>
    </section>
  )
}
