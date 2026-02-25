'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '@/contexts/LanguageContext'

/* From Uiverse.io by juan-sued */ 
const styles = `
.card {
  position: relative;
  width: 190px;
  height: 254px;
  background-color: #000;
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 12px;
  gap: 12px;
  border-radius: 8px;
  cursor: pointer;
}

.card::before {
  content: "";
  position: absolute;
  inset: 0;
  left: -5px;
  margin: auto;
  width: 200px;
  height: 264px;
  border-radius: 10px;
  background: linear-gradient(-45deg, red 0%, yellow 100%);
  z-index: -10;
  pointer-events: none;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.card::after {
  content: "";
  z-index: -1;
  position: absolute;
  inset: 0;
  background: linear-gradient(-45deg, red 0%, yellow 100%);
  transform: translate3d(0, 0, 0) scale(0.95);
  filter: blur(20px);
}

.heading {
  font-size: 20px;
  text-transform: capitalize;
  font-weight: 700;
}

.card p:not(.heading) {
  font-size: 14px;
}

.card p:last-child {
  color: #e81cff;
  font-weight: 600;
}

.card:hover::after {
  filter: blur(30px);
}

.card:hover::before {
  transform: rotate(-90deg) scaleX(1.34) scaleY(0.77);
}
`

// Custom hook for scroll animations
function useScrollAnimation(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { 
        threshold,
        rootMargin: '-50px 0px -50px 0px'
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

interface Review {
  id: number
  name: string
  rating: number
  comment: {
    ar: string
    fr: string
    en: string
  }
  image: string
  date: {
    ar: string
    fr: string
    en: string
  }
}

interface ReviewsContent {
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
}

const reviewsContent: ReviewsContent = {
  title: {
    ar: 'ماذا يقول مجتمعنا',
    fr: 'Ce que dit notre communauté',
    en: 'What Our Community Says'
  },
  subtitle: {
    ar: 'مراجعات حقيقية من عملاء حقيقيين حوّلوا شعرهم بمنتجاتنا',
    fr: 'De vrais avis de vrais clients qui ont transformé leurs cheveux avec nos produits',
    en: 'Real reviews from real customers who have transformed their hair with our products'
  }
}

const reviews: Review[] = [
  {
    id: 1,
    name: "SBo",
    rating: 5,
    comment: {
      ar: "مثالي للباحثين الصغار 😄",
      fr: "Parfait pour les chercheurs en herbe 😄",
      en: "Perfect for young researchers 😄"
    },
    image: "/assets/reviews/1859a5d1-c8f9-4a9e-b6e8-3798fbf2f297.webp",
    date: {
      ar: "منذ أسبوعين",
      fr: "Il y a 2 semaines",
      en: "2 weeks ago"
    }
  },
  {
    id: 2,
    name: "Massi",
    rating: 5,
    comment: {
      ar: "مذهل! مجهر للأطفال يمتع الكبار أيضاً",
      fr: "Sorprendente! Un microscopio per bambini che diverte anche i grandi",
      en: "Surprising! A microscope for kids that also entertains adults"
    },
    image: "/assets/reviews/51DndzUEI0L.jpg",
    date: {
      ar: "منذ شهر",
      fr: "Il y a 1 mois",
      en: "1 month ago"
    }
  },
  {
    id: 3,
    name: "David",
    rating: 5,
    comment: {
      ar: "مجهر مذهل - أوصي به بشدة",
      fr: "Amazing Microscope - Highly Recommend",
      en: "Amazing Microscope - Highly Recommend"
    },
    image: "/assets/reviews/61-XMVWj1xL.jpg",
    date: {
      ar: "منذ 3 أسابيع",
      fr: "Il y a 3 semaines",
      en: "3 weeks ago"
    }
  },
  {
    id: 4,
    name: "Dr.Dirk",
    rating: 5,
    comment: {
      ar: "مثالي للأطفال الفضوليين",
      fr: "Ideal für neugierige Kinder",
      en: "Ideal for curious kids"
    },
    image: "/assets/reviews/61AB1vL8dtL.jpg",
    date: {
      ar: "منذ أسبوع",
      fr: "Il y a 1 semaine",
      en: "1 week ago"
    }
  },
  {
    id: 5,
    name: "Seiki",
    rating: 5,
    comment: {
      ar: "جودة ممتازة",
      fr: "Excelente calidad",
      en: "Excellent quality"
    },
    image: "/assets/reviews/81EzmSLjTFL.jpg",
    date: {
      ar: "منذ أسبوعين",
      fr: "Il y a 2 semaines",
      en: "2 weeks ago"
    }
  },
  {
    id: 6,
    name: "Nathan Robinson",
    rating: 5,
    comment: {
      ar: "هدية رائعة للجميع حقاً",
      fr: "Great gift for anyone, truly",
      en: "Great gift for anyone, truly"
    },
    image: "/assets/reviews/81y-b29tMSL.jpg",
    date: {
      ar: "منذ شهر",
      fr: "Il y a 1 mois",
      en: "1 month ago"
    }
  },
  {
    id: 7,
    name: "Tricia S.",
    rating: 5,
    comment: {
      ar: "شراء ممتاز",
      fr: "Excellent purchase",
      en: "Excellent purchase"
    },
    image: "/assets/reviews/9661e395-0e0c-4da6-900b-d50149b01d6b.webp",
    date: {
      ar: "منذ 3 أسابيع",
      fr: "Il y a 3 semaines",
      en: "3 weeks ago"
    }
  }
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
        />
      ))}
    </div>
  )
}

function AnimatedStat({ end, duration, suffix, decimals }: { end: number; duration: number; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true)
          setHasAnimated(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    let animationId: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = decimals ? easeOutQuart * end : Math.floor(easeOutQuart * end)
      
      setCount(currentCount)

      if (progress < 1) {
        animationId = requestAnimationFrame(animate)
      }
    }

    animationId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationId)
  }, [isVisible, end, duration, decimals])

  return (
    <div 
      ref={ref} 
      className={`text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D8BA84] to-[#C4A66C] mb-3 transition-all duration-500 ${
        isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-4'
      }`}
    >
      {decimals ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}{suffix}
    </div>
  )
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const { currentLang } = useLanguage()
  const [cardInView, setCardInView] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Fallback to Arabic if currentLang is null
  const lang = currentLang || 'ar'
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setCardInView(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])
  
  return (
    <div
      ref={cardRef}
      className={`card mx-8  transition-all duration-700 ease-out ${
        cardInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
      }`}
      style={{
        transitionDelay: `${index * 150}ms`,
        flexShrink: 0
      }}
    >
      <p className="heading">{review.name}</p>
      <StarRating rating={review.rating} />
      <p className="text-sm line-clamp-2">{review.comment[lang]}</p>
      <p className="text-yellow-400 font-semibold text-sm">{review.date[lang]}</p>
      
      {/* Hover overlay with photo */}
      <div className="absolute inset-0 opacity-20 hover:opacity-100 transition-opacity duration-300 z-20 rounded-lg overflow-hidden">
        <Image
          src={review.image}
          alt={`${review.name}'s review`}
          fill
          className="object-cover "
          sizes="200px"
        />
      </div>
    </div>
  )
}

export default function CommunityReviews() {
  const { currentLang } = useLanguage()
  const [currentPosition, setCurrentPosition] = useState(0)

  // Fallback to Arabic if currentLang is null
  const lang = currentLang || 'ar'

  const { ref: reviewsRef, inView: reviewsInView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  })

  // Inject styles
  useEffect(() => {
    const styleElement = document.createElement('style')
    styleElement.textContent = styles
    document.head.appendChild(styleElement)
    
    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])

  const scrollReviews = (direction: 'left' | 'right') => {
    const innerContainer = document.getElementById('reviews-container')
    if (!innerContainer) return
    
    const container = innerContainer.parentElement
    if (!container) return
    
    const scrollAmount = 270 // Card width (190px) + gap (8px) + extra margin
    const currentScroll = container.scrollLeft
    const maxScroll = container.scrollWidth - container.clientWidth
    
    let newPosition: number
    
    if (direction === 'left') {
      newPosition = Math.max(0, currentScroll - scrollAmount)
    } else {
      newPosition = Math.min(maxScroll, currentScroll + scrollAmount)
    }
    
    setCurrentPosition(newPosition)
    container.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    })
  }


  return (
    <section className="w-full bg-gradient-to-br from-gray-50 to-white py-16 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4 tracking-wide relative">
              {reviewsContent.title[lang]}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#D8BA84] to-transparent rounded-full"></div>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto relative">
              {reviewsContent.subtitle[lang]}
            </p>
          </div>
        </div>

        {/* Reviews Carousel */}
        <div className='relative h-full w-full'>
          {/* Left Navigation Button */}
          <button
            onClick={() => scrollReviews('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-50 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Right Navigation Button */}
          <button
            onClick={() => scrollReviews('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-50 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>

          {/* Reviews Container */}
          <div className='h-full w-full overflow-x-auto scrollbar-hide'>
            <div
              id="reviews-container"
              className="flex gap-22 z-50 scroll-smooth p-14"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                width: 'max-content',
                minWidth: '100%'
              }}
            >
              {reviews.map((review, index) => (
                <ReviewCard key={review.id} review={review} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
