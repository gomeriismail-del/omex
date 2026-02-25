'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Slide {
  id: number
  image: string
  titles: {
    ar: string
    fr: string
    en: string
  }
  subtitles: {
    ar: string
    fr: string
    en: string
  }
  descriptions: {
    ar: string
    fr: string
    en: string
  }
  buttonTexts?: {
    ar?: string
    fr?: string
    en?: string
  }
  buttonLink?: string
  showCertificationButton?: boolean
  showExploreButton?: boolean
  showDiscoverButton?: boolean
}

const slides: Slide[] = [
  {
    id: 1,
    image: '/assets/heroparts/one.jpg',
    titles: {
      ar: 'مجهر رقمي محمول للأطفال',
      fr: 'Microscope Numérique Portable pour Enfants',
      en: 'Handheld Digital Microscope for Kids'
    },
    subtitles: {
      ar: 'اكتشف عالماً من الدقة والمغامرة',
      fr: 'Découvrez un Monde de Précision et d\'Aventure',
      en: 'Discover a World of Precision and Adventure'
    },
    descriptions: {
      ar: 'مجهر رقمي محمول بتكبير 1000X وشاشة 2.0 بوصة، مثالي للأطفال الاستكشافيين. مصمم لتطوير المهارات العلمية والتفكير النقدي من خلال اللعب التعليمي الممتع.',
      fr: 'Microscope numérique portable avec grossissement 1000X et écran 2.0 pouces, parfait pour les enfants explorateurs. Conçu pour développer les compétences scientifiques et la pensée critique grâce à un jeu éducatif amusant.',
      en: 'Handheld digital microscope with 1000X magnification and 2.0-inch screen, perfect for young explorers. Designed to develop scientific skills and critical thinking through fun educational play.'
    },
    buttonTexts: {
      ar: 'اكتشف المجهر',
      fr: 'Découvrir le Microscope',
      en: 'Discover the Microscope'
    },
    buttonLink: '/products/pocket-explorer'
  },
  {
    id: 2,
    image: '/assets/heroparts/two.jpg',
    titles: {
      ar: 'تعليم STEM متقدم',
      fr: 'Apprentissage STEM Avancé',
      en: 'Advanced STEM Learning'
    },
    subtitles: {
      ar: 'علم في متناول يدك',
      fr: 'La Science à Portée de Main',
      en: 'Science at Your Fingertips'
    },
    descriptions: {
      ar: 'حول الفضول الطبيعي لطفلك إلى استكشاف علمي حقيقي. مع شاشة 4K و12 شرائح مجهرية، يصبح التعلم التفاعلي مغامرة مثيرة.',
      fr: 'Transformez la curiosité naturelle de votre enfant en une véritable exploration scientifique. Avec un écran 4K et 12 lames de microscope, l\'apprentissage interactif devient une aventure passionnante.',
      en: 'Turn your child\'s natural curiosity into real scientific exploration. With 4K screen and 12 microscope slides, interactive learning becomes an exciting adventure.'
    },
    buttonTexts: {
      ar: 'ابدأ الرحلة العلمية',
      fr: 'Commencer l\'Aventure Scientifique',
      en: 'Start Scientific Journey'
    },
    buttonLink: '/products/pocket-explorer',
    showCertificationButton: true
  },
  {
    id: 3,
    image: '/assets/heroparts/three.jpg',
    titles: {
      ar: 'تصميم محمول وقابل لإعادة الشحن',
      fr: 'Design Portable et Rechargeable',
      en: 'Portable & Rechargeable Design'
    },
    subtitles: {
      ar: 'استكشف في أي مكان وفي أي وقت',
      fr: 'Explorez N\'importe Où, N\'importe Quand',
      en: 'Explore Anywhere, Anytime'
    },
    descriptions: {
      ar: 'خفيف الوزن وسهل الحمل، مع بطارية قابلة لإعادة الشحن تدعم الاستكشافات الممتدة. مثالي للرحلات الميدانية والدراسة المنزلية والمغامرات الخارجية.',
      fr: 'Léger et facile à transporter, avec une batterie rechargeable pour des explorations prolongées. Parfait pour les excursions sur le terrain, les études à domicile et les aventures en plein air.',
      en: 'Lightweight and easy to carry, with rechargeable battery for extended exploration sessions. Perfect for field trips, home studies, and outdoor adventures.'
    },
    buttonTexts: {
      ar: 'استكشف الميزات',
      fr: 'Explorer les Caractéristiques',
      en: 'Explore Features'
    },
    buttonLink: '/products/pocket-explorer',
    showExploreButton: true
  },
  {
    id: 4,
    image: '/assets/heroparts/foor.jpg',
    titles: {
      ar: 'هدية تعليمية مثالية',
      fr: 'Cadeau Éducatif Parfait',
      en: 'Perfect Educational Gift'
    },
    subtitles: {
      ar: 'مناسب للأعمار 3-12 سنة',
      fr: 'Adapté pour les Âges 3-12 Ans',
      en: 'Suitable for Ages 3-12'
    },
    descriptions: {
      ar: 'هدي مثالية للعيد وميلاد طفلك! طور المهارات العلمية والتفكير النقدي وحب الاستكشاف من خلال اللعب التفاعلي الآمن والممتع.',
      fr: 'Le cadeau parfait pour les fêtes et l\'anniversaire de votre enfant ! Développez les compétences scientifiques, la pensée critique et l\'amour de l\'exploration grâce à un jeu interactif sûr et amusant.',
      en: 'Perfect holiday and birthday gift for your child! Develop scientific skills, critical thinking, and love for exploration through safe, fun interactive play.'
    },
    buttonTexts: {
      ar: 'اطلب الآن',
      fr: 'Commander Maintenant',
      en: 'Order Now'
    },
    buttonLink: '/products/pocket-explorer'
  },
  {
    id: 5,
    image: '/assets/heroparts/five.jpg',
    titles: {
      ar: 'مواصفات فائقة وتقنية متقدمة',
      fr: 'Spécifications Supérieures et Technologie Avancée',
      en: 'Superior Specs & Advanced Technology'
    },
    subtitles: {
      ar: 'تكبير 1000X وجودة 4K',
      fr: 'Grossissement 1000X et Qualité 4K',
      en: '1000X Magnification & 4K Quality'
    },
    descriptions: {
      ar: 'تكبير رقمي قوي 1000X مع شاشة عالية الدقة 4K و6 مصابيح LED. يتضمن 12 شريحة مجهرية جاهزة وبطارية طويلة الأمد للاستكشافات غير المحدودة.',
      fr: 'Grossissement numérique puissant 1000X avec écran haute définition 4K et 6 LED. Inclus 12 lames de microscope prêtes à l\'emploi et batterie longue durée pour des explorations illimitées.',
      en: 'Powerful 1000X digital magnification with 4K high-definition screen and 6 LED lights. Includes 12 ready-to-use microscope slides and long-lasting battery for unlimited exploration.'
    },
    buttonTexts: {
      ar: 'اكتشف المواصفات الكاملة',
      fr: 'Découvrir les Spécifications Complètes',
      en: 'Discover Full Specifications'
    },
    buttonLink: '/products/pocket-explorer',
    showDiscoverButton: true
  }
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [currentLang, setCurrentLang] = useState<'ar' | 'fr' | 'en'>('ar')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionDirection, setTransitionDirection] = useState<'next' | 'prev'>('next')

  useEffect(() => {
    // Get current language from HTML document
    const lang = document.documentElement.lang as 'ar' | 'fr' | 'en'
    if (lang && ['ar', 'fr', 'en'].includes(lang)) {
      setCurrentLang(lang)
    }

    // Listen for language changes
    const handleLanguageChange = () => {
      const newLang = document.documentElement.lang as 'ar' | 'fr' | 'en'
      if (newLang && ['ar', 'fr', 'en'].includes(newLang)) {
        setCurrentLang(newLang)
      }
    }

    // Create a MutationObserver to detect language changes
    const observer = new MutationObserver(handleLanguageChange)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang']
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTransitionDirection('next')
      setCurrentSlide((prev) => (prev + 1) % slides.length)
      setTimeout(() => setIsTransitioning(false), 100)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTransitionDirection(index > currentSlide ? 'next' : 'prev')
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsTransitioning(false), 100)
  }

  const goToPrevious = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTransitionDirection('prev')
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsTransitioning(false), 100)
  }

  const goToNext = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTransitionDirection('next')
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsTransitioning(false), 100)
  }

  const currentSlideData = slides[currentSlide]

  return (
    <div className="relative w-full h-[70vh] overflow-hidden bg-black md:mt-10 lg:mt-12 mt-8 " >
      {/* Slide Images */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide
          const isPrev = index === (currentSlide - 1 + slides.length) % slides.length
          const isNext = index === (currentSlide + 1) % slides.length
          
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-700 ease-out ${
                isActive
                  ? 'opacity-100 scale-100 translate-x-0'
                  : isPrev && transitionDirection === 'next'
                  ? 'opacity-0 scale-95 -translate-x-full'
                  : isNext && transitionDirection === 'prev'
                  ? 'opacity-0 scale-95 translate-x-full'
                  : transitionDirection === 'next'
                  ? 'opacity-0 scale-105 translate-x-full'
                  : 'opacity-0 scale-105 -translate-x-full'
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.titles[currentLang]}
                fill
                loading={index === 0 ? "eager" : "lazy"}
                priority={index === 0}
                className={`object-cover transition-transform duration-[8000ms] ease-out w-full h-full ${
                  isActive ? 'scale-110' : 'scale-100'
                }`}
                style={{ 
                  filter: isActive ? 'blur(0px) brightness(1)' : 'blur(2px) brightness(0.7)',
                  transition: 'filter 0.5s ease-out, transform 8s ease-out',
                  objectPosition: 'center'
                }}
              />
              {/* Enhanced dark overlay with gradient - now sticks with image */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"
                style={{ 
                  opacity: isActive ? 1 : 0,
                  transition: 'opacity 0.5s ease-out'
                }}
              />
            </div>
          )
        })}
      </div>

      {/* Content Overlay */}
      <div className="absolute  inset-0 flex items-center justify-start px-24">
        <div className="container -mt- mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mt-8 md:mt-12 lg:mt-16">
            {/* Animated Title */}
            <h1 
              className={`hero-title text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 transition-opacity duration-600 ease-out ${
                isTransitioning 
                  ? 'opacity-0' 
                  : 'opacity-100'
              }`}
              style={{ 
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}
            >
              {currentSlideData.titles[currentLang]}
            </h1>

            {/* Animated Subtitle */}
            <h2 
              className={`hero-subtitle text-lg md:text-xl lg:text-2xl text-white/90 mb-4 transition-opacity duration-600 ease-out delay-75 ${
                isTransitioning 
                  ? 'opacity-0' 
                  : 'opacity-100'
              }`}
              style={{ 
                textShadow: '1px 1px 3px rgba(0,0,0,0.4)'
              }}
            >
              {currentSlideData.subtitles[currentLang]}
            </h2>

            {/* Animated Description */}
            <p 
              className={`hero-description text-sm md:text-base text-white/80 mb-6 leading-relaxed transition-opacity duration-600 ease-out delay-150 max-w-lg ${
                isTransitioning 
                  ? 'opacity-0' 
                  : 'opacity-100'
              }`}
              style={{ 
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
              }}
            >
              {currentSlideData.descriptions[currentLang]}
            </p>

            {/* Buttons */}
            <div 
              className={`hero-buttons flex flex-wrap gap-4 transition-opacity duration-600 ease-out delay-225 ${
                isTransitioning 
                  ? 'opacity-0' 
                  : 'opacity-100'
              }`}
            >
              {/* Certification Button - Hidden on first slide */}
              {currentSlideData.showCertificationButton && (
                <a
                  href={currentSlideData.buttonLink}
                  className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-white/20"
                >
                  {currentSlideData.buttonTexts?.[currentLang]}
                </a>
              )}

              {/* Explore Button - Only on third slide */}
              {currentSlideData.showExploreButton && (
                <a
                  href={currentSlideData.buttonLink}
                  className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-white/20"
                >
                  {currentSlideData.buttonTexts?.[currentLang]}
                </a>
              )}

              {/* Discover Button - Only on fifth slide */}
              {currentSlideData.showDiscoverButton && (
                <a
                  href={currentSlideData.buttonLink}
                  className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-white/20"
                >
                  {currentSlideData.buttonTexts?.[currentLang]}
                </a>
              )}

              {/* Default button for other slides */}
              {!currentSlideData.showCertificationButton && 
               !currentSlideData.showExploreButton && 
               !currentSlideData.showDiscoverButton && 
               currentSlideData.buttonTexts && (
                <a
                  href={currentSlideData.buttonLink}
                  className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-white/20"
                >
                  {currentSlideData.buttonTexts?.[currentLang]}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute bg-yellow-200/50  left-4 md:left-8 lg:left-12 top-1/2 transform -translate-y-1/2 p-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full transition-all duration-300 hover:bg-white/20 hover:scale-110 z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 bg-yellow-200/50 md:right-8 lg:right-12 top-1/2 transform -translate-y-1/2 p-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full transition-all duration-300 hover:bg-white/20 hover:scale-110 z-10"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white w-6'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

     
    </div>
  )
}
