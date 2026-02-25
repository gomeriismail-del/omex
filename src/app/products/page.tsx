'use client'

import ProductsSection from '@/components/products/ProductsSection'
import VideoShowcase from '@/components/videos/VideoShowcase'
import FeaturedReels from '@/components/reels'
import CommunityReviews from '@/components/reviews/CommunityReviews'

export default function ProductsPage() {
  return (
    <main>
      <ProductsSection />
      <VideoShowcase />
      <FeaturedReels />
      <CommunityReviews />
    </main>
  )
}
