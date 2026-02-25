'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '@/contexts/LanguageContext'

type Language = 'ar' | 'fr' | 'en'

interface VideoContent {
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

interface ShowcaseContent {
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
  exploreProducts: {
    ar: string
    fr: string
    en: string
  }
  learnMore: {
    ar: string
    fr: string
    en: string
  }
  hdQuality: {
    ar: string
    fr: string
    en: string
  }
  professional: {
    ar: string
    fr: string
    en: string
  }
  videoUnavailable: {
    ar: string
    fr: string
    en: string
  }
  loadingVideo: {
    ar: string
    fr: string
    en: string
  }
}

interface Video {
  id: number
  src: string
  content: VideoContent
}

const showcaseContent: ShowcaseContent = {
  title: {
    ar: 'مجموعة الفيديوهات الخاصة بنا',
    fr: 'Notre Collection de Vidéos',
    en: 'Our Video Collection'
  },
  subtitle: {
    ar: 'اكتشف علاجات العناية بالشعر المتميزة والتقنيات الاحترافية من خلال عرض الفيديو الحصري لدينا',
    fr: 'Découvrez nos traitements capillaires premium et nos techniques professionnelles grâce à notre vitrine vidéo exclusive',
    en: 'Discover our premium hair care treatments and professional techniques through our exclusive video showcase'
  },
  exploreProducts: {
    ar: 'استكشف المنتجات',
    fr: 'Explorer les Produits',
    en: 'Explore Products'
  },
  learnMore: {
    ar: 'اعرف المزيد',
    fr: 'En Savoir Plus',
    en: 'Learn More'
  },
  hdQuality: {
    ar: 'جودة عالية',
    fr: 'Haute Qualité',
    en: 'HD Quality'
  },
  professional: {
    ar: 'احترافي',
    fr: 'Professionnel',
    en: 'Professional'
  },
  videoUnavailable: {
    ar: 'الفيديو غير متوفر',
    fr: 'Vidéo indisponible',
    en: 'Video unavailable'
  },
  loadingVideo: {
    ar: 'جاري تحميل الفيديو...',
    fr: 'Chargement de la vidéo...',
    en: 'Loading video...'
  }
}

const videos: Video[] = [
  {
    id: 1,
    src: '/assets/videos/جارٍ تسجيل الشاشة 2026-01-22 122601.mp4',
    content: {
      title: {
        ar: 'استكشاف المجهر الرقمي',
        fr: 'Exploration du Microscope Numérique',
        en: 'Digital Microscope Exploration'
      },
      description: {
        ar: 'اكتشف كيفية استخدام المجهر الرقمي للأطفال لاكتشاف العالم المجهر',
        fr: 'Découvrez comment utiliser le microscope numérique pour enfants pour explorer le monde microscopique',
        en: 'Discover how to use the kids digital microscope to explore the microscopic world'
      }
    }
  },
  {
    id: 2,
    src: '/assets/videos/جارٍ تسجيل الشاشة 2026-01-22 122810.mp4',
    content: {
      title: {
        ar: 'تجارب علمية ممتعة',
        fr: 'Expériences Scientifiques Amusantes',
        en: 'Fun Science Experiments'
      },
      description: {
        ar: 'تعلم العلوم بطريقة عملية وممتعة مع المجهر التعليمي',
        fr: 'Apprenez les sciences de manière pratique et amusante avec le microscope éducatif',
        en: 'Learn science in a practical and fun way with the educational microscope'
      }
    }
  }
]

export default function VideoShowcase() {
  const { currentLang } = useLanguage()
  const [playingVideos, setPlayingVideos] = useState<Set<number>>(new Set())
  const [mutedVideos, setMutedVideos] = useState<Set<number>>(new Set())
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({})

  // Fallback to Arabic if currentLang is null
  const lang = currentLang || 'ar'
  const isRTL = currentLang === 'ar'

  const toggleVideoPlay = (videoId: number) => {
    const video = videoRefs.current[videoId]
    if (!video) return

    if (video.paused) {
      video.play().catch(error => {
        console.error('Video play error:', error)
      })
      setPlayingVideos(prev => new Set(prev).add(videoId))
    } else {
      video.pause()
      setPlayingVideos(prev => {
        const newSet = new Set(prev)
        newSet.delete(videoId)
        return newSet
      })
    }
  }

  const toggleVideoMute = (videoId: number) => {
    const video = videoRefs.current[videoId]
    if (!video) return

    video.muted = !video.muted
    if (video.muted) {
      setMutedVideos(prev => new Set(prev).add(videoId))
    } else {
      setMutedVideos(prev => {
        const newSet = new Set(prev)
        newSet.delete(videoId)
        return newSet
      })
    }
  }

  const handleVideoVisibility = (videoId: number, inView: boolean) => {
    const video = videoRefs.current[videoId]
    if (!video) return

    if (inView && !video.paused) {
      // Video is already playing, just ensure it's in the playing set
      setPlayingVideos(prev => new Set(prev).add(videoId))
    } else if (!inView && !video.paused) {
      // Pause video when out of view for performance
      video.pause()
      setPlayingVideos(prev => {
        const newSet = new Set(prev)
        newSet.delete(videoId)
        return newSet
      })
    } else if (inView && video.paused && !playingVideos.has(videoId)) {
      // Auto-play video when in view (only if not manually paused)
      video.play().catch(error => {
        console.error('Auto-play video error:', error)
        // Try muted play as fallback
        video.muted = true
        video.play().catch(e => console.error('Muted auto-play error:', e))
      })
      setPlayingVideos(prev => new Set(prev).add(videoId))
    }
  }

  const handleVideoEnded = (videoId: number) => {
    setPlayingVideos(prev => {
      const newSet = new Set(prev)
      newSet.delete(videoId)
      return newSet
    })
  }

  return (
    <section className="w-full bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
            {showcaseContent.title[lang]}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {showcaseContent.subtitle[lang]}
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              isPlaying={playingVideos.has(video.id)}
              isMuted={mutedVideos.has(video.id)}
              onTogglePlay={() => toggleVideoPlay(video.id)}
              onToggleMute={() => toggleVideoMute(video.id)}
              onVideoEnded={() => handleVideoEnded(video.id)}
              videoRef={(el) => videoRefs.current[video.id] = el}
              onVisibilityChange={(inView) => handleVideoVisibility(video.id, inView)}
              currentLang={lang}
              isRTL={isRTL}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
            <a
              href="/products"
              className="px-8 py-3 bg-[#fcb24bff] text-white hover:text-black/50 font-medium rounded-lg hover:bg-yellow-200 transition-colors duration-300"
            >
              {showcaseContent.exploreProducts[lang]}
            </a>
            <a
              href="/about"
              className="px-8 py-3 border-2 border-[#fcb24bff] text-[#fcb24bff] font-medium rounded-lg hover:bg-white hover:text-black/50 transition-colors duration-300"
            >
              {showcaseContent.learnMore[lang]}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

interface VideoCardProps {
  video: Video
  isPlaying: boolean
  isMuted: boolean
  onTogglePlay: () => void
  onToggleMute: () => void
  onVideoEnded: () => void
  videoRef: (el: HTMLVideoElement | null) => void
  onVisibilityChange: (inView: boolean) => void
  currentLang: Language
  isRTL: boolean
}

function VideoCard({ video, isPlaying, isMuted, onTogglePlay, onToggleMute, onVideoEnded, videoRef, onVisibilityChange, currentLang, isRTL }: VideoCardProps) {
  const [videoError, setVideoError] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false
  })

  // Fallback to Arabic if currentLang is null
  const lang = currentLang || 'ar'

  useEffect(() => {
    onVisibilityChange(inView)
  }, [inView, onVisibilityChange])

  const handleVideoError = () => {
    console.error(`Failed to load video: ${video.src}`)
    setVideoError(true)
  }

  const handleVideoLoad = () => {
    setVideoLoaded(true)
    setVideoError(false)
  }

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
      {/* Video Container */}
      <div 
        ref={ref}
        className="relative aspect-video bg-gray-100"
      >
        {videoError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play size={24} className="text-gray-500" />
              </div>
              <p className="text-gray-600 font-medium">{showcaseContent.videoUnavailable[lang]}</p>
              <p className="text-gray-500 text-sm mt-2">{video.content.title[lang]}</p>
            </div>
          </div>
        ) : (
          <>
            {/* Video Element */}
            <video
              ref={videoRef}
              src={video.src}
              className="w-full h-full object-cover"
              muted={isMuted}
              loop
              playsInline
              preload="metadata"
              onError={handleVideoError}
              onLoadedData={handleVideoLoad}
              onEnded={onVideoEnded}
            />

            {/* Loading Overlay */}
            {!videoLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <div className="w-12 h-12 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto mb-3"></div>
                  <p className="text-gray-500 text-sm">{showcaseContent.loadingVideo[lang]}</p>
                </div>
              </div>
            )}

            {/* Video Overlay Controls */}
            <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'} group-hover:opacity-60`}>
              {/* Play/Pause Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  className="p-4 bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 hover:bg-white/30 hover:scale-110"
                  onClick={onTogglePlay}
                >
                  {isPlaying ? (
                    <Pause size={32} className="text-white" />
                  ) : (
                    <Play size={32} className="text-white ml-1" />
                  )}
                </button>
              </div>

              {/* Mute Button */}
              <button
                className="absolute bottom-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 hover:bg-white/30 hover:scale-110"
                onClick={onToggleMute}
              >
                {isMuted ? (
                  <VolumeX size={20} className="text-white" />
                ) : (
                  <Volume2 size={20} className="text-white" />
                )}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Video Information */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{video.content.title[lang]}</h3>
        <p className="text-gray-600 leading-relaxed">{video.content.description[lang]}</p>
        
        {/* Video Stats */}
        <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>{showcaseContent.hdQuality[lang]}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>{showcaseContent.professional[lang]}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
