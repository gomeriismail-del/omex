'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import LoadingSpinner from '@/components/LoadingSpinner'
import ProductSuggestions from '@/components/products/ProductSuggestions'
import { useLanguage } from '@/contexts/LanguageContext'
import Wilaya from '@/data/Wilaya'
import Baladiya from '@/data/Baladiya'
import { deliveryService } from '@/services/deliveryService'
import { facebookConversions } from '@/services/facebookConversions'

interface Product {
  id: string
  properties: {
    name?: {
      title: Array<{ plain_text: string }>
    }
    "Description-en"?: {
      rich_text: Array<{ plain_text: string }>
    }
    "Description-ar"?: {
      rich_text: Array<{ plain_text: string }>
    }
    "Description-fr"?: {
      rich_text: Array<{ plain_text: string }>
    }
    "Usage-en"?: {
      rich_text: Array<{ plain_text: string }>
    }
    "Usage-ar"?: {
      rich_text: Array<{ plain_text: string }>
    }
    "Usage-fr"?: {
      rich_text: Array<{ plain_text: string }>
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
    image2?: {
      url: string
    }
    rating?: {
      number: number
    }
    ID?: {
      unique_id: {
        number: number
      }
    }
  }
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const { currentLang } = useLanguage()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showMobileBottomBar, setShowMobileBottomBar] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    nameClient: '',
    phone: '',
    address: '',
    city: '',
    notes: '',
    description: '',
    additionalInfo: '',
    color: ''
  })

  useEffect(() => {
    fetchProduct()
  }, [params.id])

  useEffect(() => {
    if (product) {
      // Send Facebook ViewContent event when product page loads
      try {
        facebookConversions.sendViewContent({
          id: product.id,
          name: getProductName(product),
          price: product.properties.price?.number || 0,
          currency: 'AED'
        })
      } catch (fbError) {
        console.warn('⚠️ Facebook ViewContent event failed:', fbError)
      }
    }
  }, [product])

  useEffect(() => {
    const handleScroll = () => {
      const orderForm = document.getElementById('order-form')
      if (orderForm) {
        const rect = orderForm.getBoundingClientRect()
        setShowMobileBottomBar(rect.top < 0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToForm = () => {
    const orderForm = document.getElementById('order-form')
    if (orderForm) {
      orderForm.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const fetchProduct = async () => {
    try {
      const response = await fetch('/api/notion')
      if (!response.ok) {
        throw new Error('Failed to fetch product')
      }
      const data = await response.json()
      const foundProduct = data.find((p: Product) => p.id === params.id)
      
      if (!foundProduct) {
        setError('Product not found')
      } else {
        setProduct(foundProduct)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
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

  const getProductDescription = (product: Product) => {
    const getRichText = (field: any) => {
      if (!field?.rich_text) return ''
      return field.rich_text.map((item: any) => item.plain_text).join('')
    }
    
    // Get descriptions based on current language priority
    if (currentLang === 'ar') {
      const arDesc = getRichText(product.properties["Description-ar"])
      if (arDesc) return arDesc
    } else if (currentLang === 'fr') {
      const frDesc = getRichText(product.properties["Description-fr"])
      if (frDesc) return frDesc
    } else if (currentLang === 'en') {
      const enDesc = getRichText(product.properties["Description-en"])
      if (enDesc) return enDesc
    }
    
    // Fallback to other languages if current language is not available
    const arDesc = getRichText(product.properties["Description-ar"])
    const frDesc = getRichText(product.properties["Description-fr"])
    const enDesc = getRichText(product.properties["Description-en"])
    
    return arDesc || frDesc || enDesc || ''
  }

  const getProductUsage = (product: Product) => {
    const getRichText = (field: any) => {
      if (!field?.rich_text) return ''
      return field.rich_text.map((item: any) => item.plain_text).join('')
    }
    
    // Get usage instructions based on current language priority
    if (currentLang === 'ar') {
      const arUsage = getRichText(product.properties["Usage-ar"])
      if (arUsage) return arUsage
    } else if (currentLang === 'fr') {
      const frUsage = getRichText(product.properties["Usage-fr"])
      if (frUsage) return frUsage
    } else if (currentLang === 'en') {
      const enUsage = getRichText(product.properties["Usage-en"])
      if (enUsage) return enUsage
    }
    
    // Fallback to other languages if current language is not available
    const arUsage = getRichText(product.properties["Usage-ar"])
    const frUsage = getRichText(product.properties["Usage-fr"])
    const enUsage = getRichText(product.properties["Usage-en"])
    
    return arUsage || frUsage || enUsage || ''
  }

  const getSectionLabel = (section: string) => {
    const labels = {
      description: {
        ar: 'الوصف',
        fr: 'Description',
        en: 'Description'
      },
      usage: {
        ar: 'طريقة الاستخدام',
        fr: 'Usage Instructions',
        en: 'Usage Instructions'
      },
      orderNow: {
        ar: 'اطلب الآن',
        fr: 'Order Now',
        en: 'Order Now'
      },
      fullName: {
        ar: 'الاسم الكامل *',
        fr: 'Full Name *',
        en: 'Full Name *'
      },
      phoneNumber: {
        ar: 'رقم الهاتف *',
        fr: 'Phone Number *',
        en: 'Phone Number *'
      },
      address: {
        ar: 'العنوان *',
        fr: 'Address *',
        en: 'Address *'
      },
      city: {
        ar: 'المدينة *',
        fr: 'City *',
        en: 'City *'
      },
      selectCity: {
        ar: 'اختر الولاية',
        fr: 'Select State',
        en: 'Select State'
      },
      quantity: {
        ar: 'الكمية',
        fr: 'Quantity',
        en: 'Quantity'
      },
      pricePerUnit: {
        ar: 'السعر للوحدة:',
        fr: 'Price per unit:',
        en: 'Price per unit:'
      },
      total: {
        ar: 'المجموع:',
        fr: 'Total:',
        en: 'Total:'
      },
      placeOrder: {
        ar: 'تأكيد الطلب',
        fr: 'Place Order',
        en: 'Place Order'
      },
      backToHome: {
        ar: 'العودة للرئيسية',
        fr: 'Back to Home',
        en: 'Back to Home'
      },
      productNotFound: {
        ar: 'المنتج غير موجود',
        fr: 'Product Not Found',
        en: 'Product Not Found'
      },
      productNotExist: {
        ar: 'المنتج الذي تبحث عنه غير موجود.',
        fr: 'The product you are looking for does not exist.',
        en: 'The product you are looking for does not exist.'
      },
      backToOrderForm: {
        ar: 'العودة إلى نموذج الطلب',
        fr: 'Back to Order Form',
        en: 'Back to Order Form'
      },
      keyFeatures: {
        ar: 'المميزات الرئيسية',
        fr: 'Caractéristiques Principales',
        en: 'Key Features'
      },
      forProfessionals: {
        ar: 'للمحترفين',
        fr: 'Pour les Professionnels',
        en: 'For Professionals'
      },
      authenticBrazilian: {
        ar: 'أصلي 100% من البرازيل',
        fr: '100% Authentique du Brésil',
        en: '100% Authentic from Brazil'
      },
      safeForAllHair: {
        ar: 'آمن لجميع أنواع الشعر',
        fr: 'Sûr pour tous les types de cheveux',
        en: 'Safe for all hair types'
      },
      guaranteedResults: {
        ar: 'نتائج مضمونة',
        fr: 'Résultats Garantis',
        en: 'Guaranteed Results'
      },
      deliveryAllStates: {
        ar: 'توصيل لجميع الولايات',
        fr: 'Livraison dans tous les États',
        en: 'Delivery to all states'
      },
      idealForSalons: {
        ar: 'مثالي لصالونات التجميل',
        fr: 'Idéal pour les salons de beauté',
        en: 'Ideal for beauty salons'
      },
      increaseRevenue: {
        ar: 'زيادة الإيرادات',
        fr: 'Augmenter les Revenus',
        en: 'Increase Revenue'
      },
      fastEffectiveResults: {
        ar: 'نتائج سريعة وفعالة',
        fr: 'Résultats Rapides et Efficaces',
        en: 'Fast and Effective Results'
      }
    }
    
    return labels[section as keyof typeof labels]?.[currentLang as 'ar' | 'fr' | 'en'] || labels[section as keyof typeof labels]?.en || section
  }

  const getLocalImages = (product: Product) => {
    const images = []
    const productName = getProductName(product).toLowerCase()
    
    // Define folder mappings for products
    const folderMappings: { [key: string]: string[] } = {
      'la cystéine gold thérapie': [
        '/assets/products/la cystéine gold thérapie/20250426_113930.jpg',
        '/assets/products/la cystéine gold thérapie/WhatsApp Image 2026-01-04 at 11.03.55asdasdas AM.jpeg',
        '/assets/products/la cystéine gold thérapie/WhatsApp Image 2026-01-04 at 11.04.11sss AM.jpeg',
        '/assets/products/la cystéine gold thérapie/WhatsApp Image 2026-01-04 at ssadasd11.03.56 AM.jpeg',
        '/assets/products/la cystéine gold thérapie/afb11d12-7a5d-40d9-bb16-435d7a625948.png',
        '/assets/products/la cystéine gold thérapie/file_000000004b8c61f8ada1ecf1ddd64ebe.png',
        '/assets/products/la cystéine gold thérapie/heropart.jpeg'
      ],
      'luxury therapie': [
        '/assets/products/luxury therapie/1000082172.jpg',
        '/assets/products/luxury therapie/WhatsApp Image 2026-01-04 at 11.03.56 AM.jpeg',
        '/assets/products/luxury therapie/WhatsApp Image 2026-01-04 at 11.03.58 AM.jpeg',
        '/assets/products/luxury therapie/WhatsApp Image 2026-01-04 fffffaaa11.04.09 AM.jpeg',
        '/assets/products/luxury therapie/WhatsApp-Image-2025-04-24-at-23.01.49.jpeg'
      ]
    }
    
    // Try to match product name with folder names
    for (const [folderName, folderImages] of Object.entries(folderMappings)) {
      if (productName.includes(folderName.toLowerCase()) || folderName.toLowerCase().includes(productName)) {
        images.push(...folderImages)
        break
      }
    }
    
    return images
  }

  const getLandingPagePhotos = (product: Product) => {
    const images = []
    const productId = product.id
    
    // Define landing page photos for specific products
    const landingPageMappings: { [key: string]: string[] } = {
      'product-2': [
        '/assets/landingpages/product2/Group 222.png'
      ],
      'product-3': [
        '/assets/landingpages/product3/product1.jpg'
      ]
    }
    
    if (landingPageMappings[productId]) {
      images.push(...landingPageMappings[productId])
    }
    
    return images
  }

  const getImages = (product: Product) => {
    const images = []
    if (product.properties.image1?.url) images.push(product.properties.image1.url)
    if (product.properties.image2?.url) images.push(product.properties.image2.url)
    
    // Add local images
    const localImages = getLocalImages(product)
    images.push(...localImages)
    
    return images
  }

  // Mapping from website product IDs to codtoop.com product IDs
  const getCodtoopProductId = (websiteProductId: string): string => {
    const productMapping: { [key: string]: string } = {
      // Use the exact SKU from CODTOOP website
      'CTNSPY68EC': 'CTNSPY68EC', // The correct CODTOOP SKU
      'pocket-explorer': 'CTNSPY68EC', // Map pocket explorer to the correct CODTOOP SKU
      'CTNPEAXSP': 'CTNSPY68EC', // Map old ID to correct CODTOOP SKU
    }
    
    return productMapping[websiteProductId] || 'CTNSPY68EC' // Default to the correct CODTOOP SKU
  }

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!product) {
      alert('Product information is missing')
      return
    }

    setIsSubmitting(true)
    console.log('Form submission started')

    const orderData = {
      nameOfProduct: getProductName(product),
      productId: getCodtoopProductId(product.id), // Use codtoop.com product ID
      nameClient: formData.nameClient || formData.name, // Add nameClient field
      priceOfProduct: product.properties.price?.number || 0,
      quantity,
      address: formData.address,
      city: formData.city,
      color: formData.color || 'default',
      status: 'pending'
    }

    console.log('Submitting order with data:', orderData)

    try {
      // Send Facebook InitiateCheckout event
      try {
        await facebookConversions.sendInitiateCheckout({
          customerName: formData.name || formData.nameClient || 'Customer',
          customerPhone: formData.phone || '',
          products: [{
            id: product.id,
            name: getProductName(product),
            quantity: quantity,
            price: product.properties.price?.number || 0
          }],
          totalAmount: (product.properties.price?.number || 0) * quantity,
          currency: 'AED'
        })
      } catch (fbError) {
        console.warn('⚠️ Facebook InitiateCheckout event failed:', fbError)
      }

      const response = await fetch('https://dmtart.pro/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(orderData)
      })

      console.log('Response status:', response.status)
      console.log('Response headers:', response.headers)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Error response:', errorText)
        throw new Error(`Failed to submit order: ${response.statusText} - ${errorText}`)
      }

      const result = await response.json()
      console.log('Order submitted successfully:', result)

      // Send Facebook Purchase event after successful order
      try {
        await facebookConversions.sendPurchase({
          customerName: formData.name || formData.nameClient || 'Customer',
          customerPhone: formData.phone || '',
          products: [{
            id: product.id,
            name: getProductName(product),
            quantity: quantity,
            price: product.properties.price?.number || 0
          }],
          totalAmount: (product.properties.price?.number || 0) * quantity,
          orderId: result._id || result.id,
          currency: 'AED'
        })
      } catch (fbError) {
        console.warn('⚠️ Facebook Purchase event failed:', fbError)
      }
      
      // Send to delivery agency
      try {
        console.log('🚚 Sending new order to delivery agency...')
        const deliveryOrderData = {
          orderId: result._id || result.id,
          customerName: formData.name || 'Customer',
          customerEmail: '', // You may want to add email field to form
          customerPhone: formData.phone || '',
          address: formData.address,
          city: formData.city,
          products: [{
            id: getCodtoopProductId(product.id), // Use codtoop.com product ID
            name: getProductName(product),
            quantity: quantity,
            price: product.properties.price?.number || 0,
            color: formData.color || 'default'
          }],
          totalAmount: (product.properties.price?.number || 0) * quantity,
          status: 'pending',
          createdAt: new Date().toISOString()
        }

        const deliveryResponse = await deliveryService.sendOrderToDelivery(deliveryOrderData)
        
        if (deliveryResponse.success) {
          console.log('✅ Order sent to delivery agency successfully:', deliveryResponse)
          // You could store the tracking number or show it to the user
        } else {
          console.error('❌ Failed to send to delivery agency:', deliveryResponse.error)
          // Order was created but delivery notification failed - still proceed
        }
      } catch (deliveryError) {
        console.error('💥 Delivery service error:', deliveryError)
        // Order was created but delivery service failed - still proceed
      }
      
      // Redirect to thank you page
      router.push('/thank-you')
      
    } catch (error) {
      console.error('Error submitting order:', error)
      alert(`Error submitting order: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (error || !product) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{getSectionLabel('productNotFound')}</h1>
          <p className="text-gray-600 mb-8">{error || getSectionLabel('productNotExist')}</p>
          <a href="/" className="inline-block bg-[#A38151] text-white px-6 py-3 rounded-lg hover:bg-[#8B6F47] transition-colors">
            {getSectionLabel('backToHome')}
          </a>
        </div>
      </div>
    )
  }

  const images = getImages(product)
  const discount = product.properties["old price"]?.number && product.properties.price?.number
    ? Math.round(((1 - product.properties.price.number / product.properties["old price"].number) * 100))
    : 0

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 mt-12">
          <nav className="flex items-center space-x-2 text-sm">
            <a href="/" className="text-gray-500 hover:text-[#A38151]">Home</a>
            <span className="text-gray-400">/</span>
            <a href="/products" className="text-gray-500 hover:text-[#A38151]">Products</a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{getProductName(product)}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Mobile: Form First */}
        <div className="xl:hidden mb-6">
          <div id="order-form" className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{getSectionLabel('orderNow')}</h2>
            
            <form onSubmit={handleOrderSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">{getSectionLabel('fullName')}</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A38151] focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">{getSectionLabel('phoneNumber')}</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A38151] focus:border-transparent"
                    placeholder="+213 XXX XXX XXXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">{getSectionLabel('address')}</label>
                <textarea
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  rows={2}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A38151] focus:border-transparent"
                  placeholder="Enter your complete address"
                />
              </div>

              <Wilaya 
                value={formData.city}
                onChange={(value) => setFormData({...formData, city: value})}
                placeholder={getSectionLabel('selectCity')}
                required
              />
              <Baladiya 
                wilaya={formData.city}
                value={formData.additionalInfo}
                onChange={(value) => setFormData({...formData, additionalInfo: value})}
                required
              />

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Color</label>
                <input
                  type="text"
                  required
                  value={formData.color}
                  onChange={(e) => setFormData({...formData, color: e.target.value})}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A38151] focus:border-transparent"
                  placeholder="Enter color preference"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">{getSectionLabel('quantity')}</label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-sm"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 text-center border border-gray-300 rounded-lg px-2 py-1 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">{getSectionLabel('total')}</label>
                  <div className="text-lg font-bold text-[#A38151] py-1">
                    {((product.properties.price?.number || 0) * quantity).toLocaleString()} DA
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#A38151] to-[#8B6F47] text-white py-3 rounded-xl font-semibold hover:from-[#8B6F47] hover:to-[#7A5E3F] transition-all duration-300 transform hover:scale-105 shadow-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? 'Submitting...' : getSectionLabel('placeOrder')}
              </button>
            </form>
          </div>
        </div>

        {/* Mobile: Content After Form */}
        <div className="xl:hidden space-y-6">
          {/* Product Images */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="aspect-square overflow-hidden rounded-xl mb-4">
              <img
                src={images[selectedImage]}
                alt={getProductName(product)}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImage === index ? 'border-[#A38151]' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${getProductName(product)} ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-3">{getProductName(product)}</h1>
            
            {/* Rating */}
            {product.properties.rating?.number && (
              <div className="flex items-center mb-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < product.properties.rating!.number ? 'fill-current' : 'fill-gray-300'}`} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.783-1.838 0-2.408l2.8-2.034a1 1 0 00.364-1.118L4.974 1.867c.3-.921-.62-1.54-1.539-1.81z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-600 text-sm">({product.properties.rating.number}.0)</span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#A38151]">
                  {product.properties.price?.number?.toLocaleString()} DA
                </span>
                {product.properties["old price"]?.number && (
                  <span className="text-lg text-gray-400 line-through">
                    {product.properties["old price"].number.toLocaleString()} DA
                  </span>
                )}
              </div>
              {discount > 0 && (
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-semibold">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Description */}
            {getProductDescription(product) && (
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">{getSectionLabel('description')}</h3>
                <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                  {getProductDescription(product)}
                </div>
              </div>
            )}

            {/* Key Features */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">{getSectionLabel('keyFeatures')}</h3>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600">{getSectionLabel('authenticBrazilian')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600">{getSectionLabel('safeForAllHair')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600">{getSectionLabel('guaranteedResults')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600">{getSectionLabel('deliveryAllStates')}</span>
                </div>
              </div>
            </div>

            {/* Professional Benefits */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">{getSectionLabel('forProfessionals')}</h3>
              <div className="bg-gradient-to-r from-[#A38151]/10 to-[#8B6F47]/10 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#A38151]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-gray-700">{getSectionLabel('idealForSalons')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#A38151]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-gray-700">{getSectionLabel('increaseRevenue')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#A38151]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-gray-700">{getSectionLabel('fastEffectiveResults')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Usage Instructions */}
            {getProductUsage(product) && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">{getSectionLabel('usage')}</h3>
                <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                  {getProductUsage(product)}
                </div>
              </div>
            )}
          </div>

          {/* Landing Page Photos Section */}
          {getLandingPagePhotos(product).length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full">
                {getLandingPagePhotos(product).map((photo, index) => (
                  <div key={index} className="relative overflow-hidden rounded-lg shadow-md md:col-span-2 lg:col-span-2 max-w-2xl mx-auto">
                    <img
                      src={photo}
                      alt={`Product photo ${index + 1}`}
                      className="w-full h-auto object-cover"
                      style={{
                        display: 'block',
                        width: '100%',
                        height: 'auto'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Bottom Bar */}
        {showMobileBottomBar && (
          <div className="xl:hidden sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4">
            <button
              onClick={scrollToForm}
              className="w-full bg-gradient-to-r from-[#A38151] to-[#8B6F47] text-white py-3 rounded-xl font-semibold hover:from-[#8B6F47] hover:to-[#7A5E3F] transition-all duration-300 transform hover:scale-105 shadow-lg text-sm"
            >
              {getSectionLabel('orderNow')}
            </button>
          </div>
        )}

        {/* Desktop Layout */}
        <div className="hidden xl:grid xl:grid-cols-3 gap-6">
          {/* Left Column - All Content */}
          <div className="xl:col-span-2 space-y-6">
            {/* Product Images */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="aspect-square overflow-hidden rounded-xl mb-4">
                <img
                  src={images[selectedImage]}
                  alt={getProductName(product)}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                        selectedImage === index ? 'border-[#A38151]' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${getProductName(product)} ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-3">{getProductName(product)}</h1>
              
              {/* Rating */}
              {product.properties.rating?.number && (
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < product.properties.rating!.number ? 'fill-current' : 'fill-gray-300'}`} viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.783-1.838 0-2.408l2.8-2.034a1 1 0 00.364-1.118L4.974 1.867c.3-.921-.62-1.54-1.539-1.81z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600 text-sm">({product.properties.rating.number}.0)</span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#A38151]">
                    {product.properties.price?.number?.toLocaleString()} DA
                  </span>
                  {product.properties["old price"]?.number && (
                    <span className="text-lg text-gray-400 line-through">
                      {product.properties["old price"].number.toLocaleString()} DA
                    </span>
                  )}
                </div>
                {discount > 0 && (
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-semibold">
                    -{discount}%
                  </span>
                )}
              </div>

              {/* Description */}
              {getProductDescription(product) && (
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">{getSectionLabel('description')}</h3>
                  <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                    {getProductDescription(product)}
                  </div>
                </div>
              )}

              {/* Key Features */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">{getSectionLabel('keyFeatures')}</h3>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-600">{getSectionLabel('authenticBrazilian')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-600">{getSectionLabel('safeForAllHair')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-600">{getSectionLabel('guaranteedResults')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-600">{getSectionLabel('deliveryAllStates')}</span>
                  </div>
                </div>
              </div>

              {/* Professional Benefits */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">{getSectionLabel('forProfessionals')}</h3>
                <div className="bg-gradient-to-r from-[#A38151]/10 to-[#8B6F47]/10 rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#A38151]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-gray-700">{getSectionLabel('idealForSalons')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#A38151]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-gray-700">{getSectionLabel('increaseRevenue')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#A38151]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-gray-700">{getSectionLabel('fastEffectiveResults')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Usage Instructions */}
              {getProductUsage(product) && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">{getSectionLabel('usage')}</h3>
                  <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                    {getProductUsage(product)}
                  </div>
                </div>
              )}
            </div>

            {/* Landing Page Photos Section */}
            {getLandingPagePhotos(product).length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Product Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full">
                  {getLandingPagePhotos(product).map((photo, index) => (
                    <div key={index} className="relative overflow-hidden rounded-lg shadow-md md:col-span-2 lg:col-span-2 max-w-2xl mx-auto">
                      <img
                        src={photo}
                        alt={`Product photo ${index + 1}`}
                        className="w-full h-auto object-cover"
                        style={{
                          display: 'block',
                          width: '100%',
                          height: 'auto'
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sticky Order Form */}
          <div className="xl:col-span-1">
            <div className="xl:sticky xl:top-2 xl:h-fit">
              <div id="order-form" className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">{getSectionLabel('orderNow')}</h2>
                
                <form onSubmit={handleOrderSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">{getSectionLabel('fullName')}</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A38151] focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">{getSectionLabel('phoneNumber')}</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A38151] focus:border-transparent"
                        placeholder="+213 XXX XXX XXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">{getSectionLabel('address')}</label>
                    <textarea
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      rows={2}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A38151] focus:border-transparent"
                      placeholder="Enter your complete address"
                    />
                  </div>

<Wilaya 
  value={formData.city}
  onChange={(value) => setFormData({...formData, city: value})}
  placeholder={getSectionLabel('selectCity')}
  required
/>
 <Baladiya 
  wilaya={formData.city}
  value={formData.additionalInfo}
  onChange={(value) => setFormData({...formData, additionalInfo: value})}
  required
/>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Color</label>
                    <input
                      type="text"
                      required
                      value={formData.color}
                      onChange={(e) => setFormData({...formData, color: e.target.value})}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A38151] focus:border-transparent"
                      placeholder="Enter color preference"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">{getSectionLabel('quantity')}</label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-sm"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-16 text-center border border-gray-300 rounded-lg px-2 py-1 text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">{getSectionLabel('total')}</label>
                      <div className="text-lg font-bold text-[#A38151] py-1">
                        {((product.properties.price?.number || 0) * quantity).toLocaleString()} DA
                      </div>
                    </div>
                  </div>


                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#A38151] to-[#8B6F47] text-white py-3 rounded-xl font-semibold hover:from-[#8B6F47] hover:to-[#7A5E3F] transition-all duration-300 transform hover:scale-105 shadow-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? 'Submitting...' : getSectionLabel('placeOrder')}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Suggestions */}
      <ProductSuggestions currentProductId={params.id as string} />
    </div>
  )
}
