'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Language = 'ar' | 'fr' | 'en'

interface Product {
  id: string
  properties: {
    name?: {
      title: Array<{ plain_text: string }>
    }
    price?: {
      number: number
    }
    "old price"?: {
      number: number
    }
    image1?: {
      url: string
    }
    rating?: {
      number: number
    }
  }
}

interface ProductSuggestionsProps {
  currentProductId: string
}

export default function ProductSuggestions({ currentProductId }: ProductSuggestionsProps) {
  const { currentLang } = useLanguage()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/notion')
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      const data = await response.json()
      // Filter out current product and get suggestions
      const suggestions = data
        .filter((p: Product) => p.id !== currentProductId)
        .slice(0, 6) // Get up to 6 suggestions
      setProducts(suggestions)
    } catch (error) {
      console.error('Error fetching product suggestions:', error)
    } finally {
      setLoading(false)
    }
  }

  const getProductName = (product: Product) => {
    const titleArray = product.properties.name?.title
    if (!titleArray || titleArray.length === 0) {
      return 'Untitled Product'
    }
    
    const fullText = titleArray
      .map(item => item.plain_text)
      .join('')
      .replace(/\s+/g, ' ')
      .trim()
    
    return fullText || 'Untitled Product'
  }

  const getSectionLabel = (section: string) => {
    const labels = {
      suggestedProducts: {
        ar: 'منتجات مقترحة',
        fr: 'Produits Suggérés',
        en: 'Suggested Products'
      },
      viewDetails: {
        ar: 'عرض التفاصيل',
        fr: 'Voir les Détails',
        en: 'View Details'
      },
      outOfStock: {
        ar: 'نفد المخزون',
        fr: 'Rupture de Stock',
        en: 'Out of Stock'
      }
    }
    
    return labels[section as keyof typeof labels]?.[currentLang as 'ar' | 'fr' | 'en'] || labels[section as keyof typeof labels]?.en || section
  }

  const scrollCarousel = (direction: 'left' | 'right') => {
    const maxIndex = Math.max(0, products.length - 3)
    
    if (direction === 'left') {
      setCurrentIndex(Math.max(0, currentIndex - 1))
    } else {
      setCurrentIndex(Math.min(maxIndex, currentIndex + 1))
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-80"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        {getSectionLabel('suggestedProducts')}
      </h2>

      <div className="relative">
        {/* Left Navigation Button */}
        {currentIndex > 0 && (
          <button
            onClick={() => scrollCarousel('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
            aria-label="Previous products"
          >
            <ChevronLeft size={20} className="text-gray-700" />
          </button>
        )}

        {/* Right Navigation Button */}
        {currentIndex < products.length - 3 && (
          <button
            onClick={() => scrollCarousel('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
            aria-label="Next products"
          >
            <ChevronRight size={20} className="text-gray-700" />
          </button>
        )}

        {/* Products Carousel */}
        <div className="overflow-hidden">
          <div 
            className="flex gap-6 transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 33.333}%)` }}
          >
            {products.map((product) => (
              <div key={product.id} className="flex-none w-full md:w-1/3">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                  {/* Product Image */}
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    {product.properties.image1?.url ? (
                      <img
                        src={product.properties.image1.url}
                        alt={getProductName(product)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {getProductName(product)}
                    </h3>

                    {/* Rating */}
                    {product.properties.rating?.number && (
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-3 h-3 ${i < product.properties.rating!.number ? 'fill-current' : 'fill-gray-300'}`} viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.783-1.838 0-2.408l2.8-2.034a1 1 0 00.364-1.118L4.974 1.867c.3-.921-.62-1.54-1.539-1.81z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-1 text-gray-600 text-xs">({product.properties.rating.number}.0)</span>
                      </div>
                    )}

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-[#A38151]">
                        {product.properties.price?.number?.toLocaleString()} DA
                      </span>
                      {product.properties["old price"]?.number && (
                        <span className="text-sm text-gray-400 line-through">
                          {product.properties["old price"].number.toLocaleString()} DA
                        </span>
                      )}
                    </div>

                    {/* View Details Button */}
                    <Link
                      href={`/products/${product.id}`}
                      className="block w-full bg-gradient-to-r from-[#A38151] to-[#8B6F47] text-white py-2 rounded-lg text-center hover:from-[#8B6F47] hover:to-[#7A5E3F] transition-all duration-300 text-sm font-medium"
                    >
                      {getSectionLabel('viewDetails')}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
