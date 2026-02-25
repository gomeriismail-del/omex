'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '@/contexts/LanguageContext'

type Language = 'ar' | 'fr' | 'en'

interface ReelContent {
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

interface FeaturedContent {
  title: {
    ar: string
    fr: string
    en: string
  }
  videoUnavailable: {
    ar: string
    fr: string
    en: string
  }
}

interface Reel {
  id: number
  src: string
  content: ReelContent
}

const featuredContent: FeaturedContent = {
  title: {
    ar: 'أبرز المقاطع من العملاء',
    fr: 'Vidéos en vedette des clients',
    en: 'Featured reels by customers'
  },
  videoUnavailable: {
    ar: 'الفيديو غير متوفر',
    fr: 'Vidéo indisponible',
    en: 'Video unavailable'
  }
}

const reels: Reel[] = [
  {
    id: 1,
    src: '/assets/reels/play1.mp4',
    content: {
      title: {
        ar: 'استكشاف المجهر',
        fr: 'Exploration du Microscope',
        en: 'Microscope Exploration'
      },
      description: {
        ar: 'اكتشف عالم الخلايا والميكروبات',
        fr: 'Découvrez le monde des cellules et des microbes',
        en: 'Discover the world of cells and microorganisms'
      }
    }
  },
  {
    id: 2,
    src: '/assets/reels/play2.mp4',
    content: {
      title: {
        ar: 'تجارب علمية',
        fr: 'Expériences Scientifiques',
        en: 'Science Experiments'
      },
      description: {
        ar: 'تعلم العلوم بطريقة عملية',
        fr: 'Apprenez les sciences de manière pratique',
        en: 'Learn science in a practical way'
      }
    }
  },
  {
    id: 3,
    src: '/assets/reels/play3.mp4',
    content: {
      title: {
        ar: 'مغامرات علمية',
        fr: 'Aventures Scientifiques',
        en: 'Science Adventures'
      },
      description: {
        ar: 'مغامرات تعليمية ممتعة',
        fr: 'Aventures éducatives amusantes',
        en: 'Fun educational adventures'
      }
    }
  },
  {
    id: 4,
    src: '/assets/reels/play4.mp4',
    content: {
      title: {
        ar: 'التعلم بالاستكشاف',
        fr: 'Apprentissage par l\'Exploration',
        en: 'Learning by Exploration'
      },
      description: {
        ar: 'اكتشف وتعلم في نفس الوقت',
        fr: 'Découvrez et apprenez en même temps',
        en: 'Discover and learn at the same time'
      }
    }
  },
  {
    id: 5,
    src: '/assets/reels/play5.mp4',
    content: {
      title: {
        ar: 'العلم للأطفال',
        fr: 'La Science pour les Enfants',
        en: 'Science for Kids'
      },
      description: {
        ar: 'جعل العلوم ممتعة ومثيرة',
        fr: 'Rendre la science amusante et excitante',
        en: 'Making science fun and exciting'
      }
    }
  },
  {
    id: 6,
    src: '/assets/reels/play6.mp4',
    content: {
      title: {
        ar: 'اكتشافات جديدة',
        fr: 'Nouvelles Découvertes',
        en: 'New Discoveries'
      },
      description: {
        ar: 'استكشف عوالم جديدة',
        fr: 'Explorez de nouveaux mondes',
        en: 'Explore new worlds'
      }
    }
  },
  {
    id: 7,
    src: '/assets/reels/play7.mp4',
    content: {
      title: {
        ar: 'الابتكار العلمي',
        fr: 'Innovation Scientifique',
        en: 'Scientific Innovation'
      },
      description: {
        ar: 'حلول مبتكرة للعلم',
        fr: 'Solutions innovantes pour la science',
        en: 'Innovative solutions for science'
      }
    }
  }
]

export default function FeaturedReels() {
  const { currentLang } = useLanguage()
  const [currentPosition, setCurrentPosition] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [playingVideos, setPlayingVideos] = useState<Set<number>>(new Set())
  const carouselRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({})

  // Fallback to Arabic if currentLang is null
  const lang = currentLang || 'ar'
  const isRTL = currentLang === 'ar'

  // Sync currentPosition with actual scroll position
  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    const handleScroll = () => {
      setCurrentPosition(carousel.scrollLeft)
    }

    carousel.addEventListener('scroll', handleScroll)
    return () => carousel.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return
    
    const scrollAmount = 280 // Width of reel card + gap (reduced from 320)
    
    // Check if page is in RTL mode (Arabic)
    const isRTL = document.documentElement.dir === 'rtl' || document.documentElement.lang === 'ar'
    
    let newPosition: number
    
    if (isRTL) {
      // In RTL: left button scrolls right (increases scrollLeft), right button scrolls left (decreases scrollLeft)
      newPosition = direction === 'left' 
        ? Math.min(carouselRef.current.scrollWidth - carouselRef.current.clientWidth, currentPosition + scrollAmount)
        : Math.max(0, currentPosition - scrollAmount)
    } else {
      // In LTR: left button scrolls left (decreases scrollLeft), right button scrolls right (increases scrollLeft)
      newPosition = direction === 'left' 
        ? Math.max(0, currentPosition - scrollAmount)
        : Math.min(carouselRef.current.scrollWidth - carouselRef.current.clientWidth, currentPosition + scrollAmount)
    }
    
    setCurrentPosition(newPosition)
    carouselRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - carouselRef.current.offsetLeft)
    setScrollLeft(carouselRef.current.scrollLeft)
    // Prevent text selection during drag
    e.preventDefault()
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return
    e.preventDefault()
    const x = e.pageX - carouselRef.current.offsetLeft
    const walk = (x - startX) * 1.5 // Reduced multiplier for smoother scrolling
    carouselRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!carouselRef.current) return
    setIsDragging(true)
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft)
    setScrollLeft(carouselRef.current.scrollLeft)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft
    const walk = (x - startX) * 1.5 // Reduced multiplier for smoother scrolling
    carouselRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const toggleVideoPlay = (reelId: number) => {
    const video = videoRefs.current[reelId]
    if (!video) return

    if (video.paused) {
      // Ensure video is loaded before playing
      if (video.readyState < 2) {
        video.load()
      }
      video.play().catch(error => {
        console.error('Video play error:', error)
        // Try muted play as fallback
        video.muted = true
        video.play().catch(e => console.error('Muted video play error:', e))
      })
      setPlayingVideos(prev => new Set(prev).add(reelId))
    } else {
      video.pause()
      setPlayingVideos(prev => {
        const newSet = new Set(prev)
        newSet.delete(reelId)
        return newSet
      })
    }
  }

  const handleVideoVisibility = (reelId: number, inView: boolean) => {
    const video = videoRefs.current[reelId]
    if (!video) return

    if (inView && !video.paused) {
      // Video is already playing, just ensure it's in the playing set
      setPlayingVideos(prev => new Set(prev).add(reelId))
    } else if (!inView && !video.paused) {
      // Pause video when out of view
      video.pause()
      setPlayingVideos(prev => {
        const newSet = new Set(prev)
        newSet.delete(reelId)
        return newSet
      })
    } else if (inView && video.paused && !playingVideos.has(reelId)) {
      // Auto-play video when in view (only if not manually paused)
      if (video.readyState < 2) {
        video.load()
      }
      video.play().catch(error => {
        console.error('Auto-play video error:', error)
      })
      setPlayingVideos(prev => new Set(prev).add(reelId))
    }
  }

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false)
    window.addEventListener('mouseup', handleGlobalMouseUp)
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp)
  }, [])

  return (
    <section className="w-full bg-white py-12 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-center text-gray-900 mb-8 tracking-wide">
          {featuredContent.title[lang]}
        </h2>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Left Navigation Button */}
          <button
            onClick={() => scrollCarousel('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-white hover:shadow-xl"
            aria-label="Previous reels"
          >
            <ChevronLeft size={20} className="text-gray-700" />
          </button>

          {/* Right Navigation Button */}
          <button
            onClick={() => scrollCarousel('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-white hover:shadow-xl"
            aria-label="Next reels"
          >
            <ChevronRight size={20} className="text-gray-700" />
          </button>

          {/* Reels Carousel */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              scrollBehavior: isDragging ? 'auto' : 'smooth'
            }}
          >
            {reels.map((reel) => (
              <ReelCard
                key={reel.id}
                reel={reel}
                isPlaying={playingVideos.has(reel.id)}
                onTogglePlay={() => toggleVideoPlay(reel.id)}
                onVisibilityChange={(inView) => handleVideoVisibility(reel.id, inView)}
                videoRef={(el) => videoRefs.current[reel.id] = el}
                currentLang={lang}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface ReelCardProps {
  reel: Reel
  isPlaying: boolean
  onTogglePlay: () => void
  onVisibilityChange: (inView: boolean) => void
  videoRef: (el: HTMLVideoElement | null) => void
  currentLang: Language
}

function ReelCard({ reel, isPlaying, onTogglePlay, onVisibilityChange, videoRef, currentLang }: ReelCardProps) {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false
  })

  // Fallback to Arabic if currentLang is null
  const lang = currentLang || 'ar'

  const [videoError, setVideoError] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [actualPlayingState, setActualPlayingState] = useState(false)
  const videoElementRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    onVisibilityChange(inView)
  }, [inView, onVisibilityChange])

  useEffect(() => {
    const video = videoElementRef.current
    if (!video) return

    const handlePlay = () => setActualPlayingState(true)
    const handlePause = () => setActualPlayingState(false)

    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)

    return () => {
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
    }
  }, [])

  const handleVideoError = () => {
    console.error(`Failed to load video: ${reel.src}`)
    setVideoError(true)
  }

  const handleVideoLoad = () => {
    console.log(`Video loaded successfully: ${reel.src}`)
    setVideoLoaded(true)
    setVideoError(false)
  }

  const handleCanPlay = () => {
    console.log(`Video can play: ${reel.src}`)
    setVideoLoaded(true)
    setVideoError(false)
  }

  const handleClick = () => {
    onTogglePlay()
  }

  return (
    <div className="flex-none w-64">
      <div
        ref={ref}
        className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 group cursor-pointer"
        onClick={handleClick}
      >
        {videoError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <div className="text-center p-4">
              <p className="text-gray-500 text-sm">{featuredContent.videoUnavailable[lang]}</p>
              <p className="text-gray-400 text-xs mt-1">{reel.content.title[lang]}</p>
              <p className="text-gray-400 text-xs mt-2">{reel.src}</p>
            </div>
          </div>
        ) : (
          <>
            {/* Video Element */}
            <video
              ref={(el) => {
                videoElementRef.current = el
                videoRef(el)
              }}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
              preload="auto"
              onError={handleVideoError}
              onLoadStart={handleVideoLoad}
              onCanPlay={handleCanPlay}
              onLoadedData={handleVideoLoad}
              controls
              style={{ display: 'block' }}
            >
              <source src={reel.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Reel Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
              <h3 className="text-white font-medium text-sm mb-1">{reel.content.title[lang]}</h3>
              <p className="text-white/80 text-xs">{reel.content.description[lang]}</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
