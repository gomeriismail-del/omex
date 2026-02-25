import HeroCarousel from '@/components/hero/HeroCarousel'
import ProductsSection from '@/components/products/ProductsSection'
import AboutUsSection from '@/components/about/AboutUsSection'
import VideoShowcase from '@/components/videos/VideoShowcase'
import SuggestedProducts from '@/components/suggested/SuggestedProducts'
import FeaturedReels from '@/components/reels'
import CommunityReviews from '@/components/reviews/CommunityReviews'
import BrazilianAuthenticity from '@/components/brazilian/BrazilianAuthenticity'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroCarousel />
      <ProductsSection />
      <AboutUsSection />
      <VideoShowcase />
      <SuggestedProducts />
      <FeaturedReels />
      <CommunityReviews />
    </main>
  )
}
