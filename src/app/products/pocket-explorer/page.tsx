'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Star, Minus, Plus, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { deliveryService } from '@/services/deliveryService'
import { facebookConversions } from '@/services/facebookConversions'
import VideoShowcase from '@/components/videos/VideoShowcase'
import FeaturedReels from '@/components/reels'
import CommunityReviews from '@/components/reviews/CommunityReviews'

const productImages = [
  'https://res.cloudinary.com/dicpjm1dz/image/upload/v1769434143/71G2hYXNKcL._AC_SL1500__mwky1u.jpg',
  'https://res.cloudinary.com/dicpjm1dz/image/upload/v1769434138/81ix6dD2ftL._AC_SX425__st1w75.jpg',
  'https://res.cloudinary.com/dicpjm1dz/image/upload/v1769434138/81hjNUS9HpL._AC_SX425__civlyd.jpg',
  'https://res.cloudinary.com/dicpjm1dz/image/upload/v1769434136/71--_HeIQkL._AC_SL1500__vvuzzz.jpg',
  'https://res.cloudinary.com/dicpjm1dz/image/upload/v1769434136/71nAdBWxtdL._AC_SX425__ps00h0.jpg',
  'https://res.cloudinary.com/dicpjm1dz/image/upload/v1769434135/71J81b5oHkL._AC_SX425__i8nt7a.jpg',
  'https://res.cloudinary.com/dicpjm1dz/image/upload/v1769434134/71dXO6hQYHL._AC_SX425__vulevv.jpg',
  'https://res.cloudinary.com/dicpjm1dz/image/upload/v1769434092/five_omuiyl.jpg',
  'https://res.cloudinary.com/dicpjm1dz/image/upload/v1769434074/one_gej4ov.jpg',
  'https://res.cloudinary.com/dicpjm1dz/image/upload/v1769434046/71Vmn9Yq3XL._AC_SL1500__brpmpq.jpg',
  'https://res.cloudinary.com/dicpjm1dz/image/upload/v1769434045/foor_kvcxmt.jpg',
  'https://res.cloudinary.com/dicpjm1dz/image/upload/v1769434042/two_iti6xi.jpg'
]

const colorVariants = [
  {
    id: 'yellow',
    name: { ar: 'أصفر', fr: 'Jaune', en: 'Yellow' },
    image: '/assets/variant/71Iy3vfSX+L._AC_SX425_.png',
    color: '#F59E0B'
  },
  {
    id: 'white',
    name: { ar: 'أبيض', fr: 'Blanc', en: 'White' },
    image: '/assets/variant/71Iy3vfSX+L._AC_SX425_ (3).png',
    color: '#F3F4F6'
  }
]

const reviews = [
  {
    id: 1,
    name: 'Sarah Johnson',
    rating: 5,
    date: '2024-01-15',
    comment: {
      ar: 'منتج رائع! ابني يحبه كثيراً. جودة الصورة ممتازة وسهل الاستخدام للأطفال. أوصي به بشدة!',
      fr: 'Excellent produit ! Mon fils l\'adore. La qualité d\'image est excellente et facile à utiliser pour les enfants. Je le recommande vivement !',
      en: 'Excellent product! My son loves it. The image quality is outstanding and it\'s very easy to use for kids. Highly recommend!'
    },
    image: 'https://res.cloudinary.com/dicpjm1dz/image/upload/v1769434125/61-XMVWj1xL_snwesc.jpg'
  },
  {
    id: 2,
    name: 'Mohammed Ali',
    rating: 4,
    date: '2024-01-10',
    comment: {
      ar: 'جيد جداً ولكن البطارية لا تدوم طويلاً. بشكل عام منتج تعليمي ممتاز للأطفال.',
      fr: 'Très bon produit mais la batterie ne dure pas longtemps. Dans l\'ensemble, excellent produit éducatif pour les enfants.',
      en: 'Very good product but the battery doesn\'t last very long. Overall, an excellent educational product for kids.'
    },
    image: 'https://res.cloudinary.com/dicpjm1dz/image/upload/v1769434122/51DndzUEI0L_n1swh1.jpg'
  },
  {
    id: 3,
    name: 'Marie Dubois',
    rating: 5,
    date: '2024-01-08',
    comment: {
      ar: 'مثالي للتعليم المنزلي! استخدمناه في مشاريع العلوم وكان رائعاً. جودة بناء ممتازة.',
      fr: 'Parfait pour l\'école à la maison ! Nous l\'avons utilisé pour les projets de sciences et c\'était fantastique. Excellente qualité de fabrication.',
      en: 'Perfect for homeschooling! We used it for science projects and it was fantastic. Excellent build quality.'
    },
    image: 'https://res.cloudinary.com/dicpjm1dz/image/upload/v1769434120/61-XMVWj1xL_snwesc.jpg'
  },
  {
    id: 4,
    name: 'Ahmed Hassan',
    rating: 5,
    date: '2024-01-05',
    comment: {
      ar: 'تجاوز توقعاتي! الصورة واضحة جداً والتصميم مناسب للأيدي الصغيرة. يستحق كل ريال.',
      fr: 'Dépasse mes attentes ! L\'image est très claire et la conception est adaptée aux petites mains. Vaut chaque dirham.',
      en: 'Exceeded my expectations! The image is very clear and the design is perfect for small hands. Worth every penny.'
    },
    image: 'https://res.cloudinary.com/dicpjm1dz/image/upload/v1769434118/51DndzUEI0L_n1swh1.jpg'
  },
  {
    id: 5,
    name: 'Fatima Zahra',
    rating: 4,
    date: '2024-01-04',
    comment: {
      ar: 'منتج تعليمي رائع. ابنتي تستخدمه يومياً. فقط أتمنى لو كان معه المزيد من الملحقات.',
      fr: 'Excellent produit éducatif. Ma fille l\'utilise quotidiennement. Je souhaite juste qu\'il y ait plus d\'accessoires.',
      en: 'Great educational product. My daughter uses it daily. Just wish it came with more accessories.'
    },
    image: 'https://res.cloudinary.com/dicpjm1dz/image/upload/v1769434115/61-XMVWj1xL_snwesc.jpg'
  },
  {
    id: 6,
    name: 'Robert Taylor',
    rating: 4,
    date: '2024-01-03',
    comment: {
      ar: 'منتج جيد بشكل عام. المشكلة الطفيفة الوحيدة هي أنه يستغرق بعض الوقت للتعود على أزرار التحكم.',
      fr: 'Bon produit dans l\'ensemble. Le seul problème mineur est qu\'il faut un certain temps pour s\'habituer aux commandes.',
      en: 'Good product overall. The only minor issue is that it takes some time to get used to the controls.'
    },
    image: 'https://res.cloudinary.com/dicpjm1dz/image/upload/v1769434119/51DndzUEI0L_n1swh1.jpg'
  }
]

export default function ProductPage() {
  const { currentLang } = useLanguage()
  const router = useRouter()

  // Add CSS animation for slide-in effect
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [])
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(colorVariants[0])
  const [quantity, setQuantity] = useState(1)
  const [selectedPackage, setSelectedPackage] = useState<'single' | 'double'>('single')
  const [formData, setFormData] = useState({
    name: '',
    nameClient: '',
    phone: '',
    address: '',
    city: '',
    notes: '',
    description: '',
    additionalInfo: '',
    color: 'yellow'
  })
  const [phoneError, setPhoneError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showBackToForm, setShowBackToForm] = useState(false)

  // Currency and pricing - always use UAE Dirhams for this product
  const currency = currentLang === 'ar' ? 'درهم' : 'AED'
  const basePrice = 179
  const originalBasePrice = 290
  const doublePrice = 330
  const originalDoublePrice = 580

  // Auto-save form data to localStorage
  useEffect(() => {
    const saveFormData = () => {
      const formDataToSave = {
        ...formData,
        selectedColor: selectedColor.id,
        selectedPackage,
        quantity,
        timestamp: new Date().toISOString()
      }
      localStorage.setItem('pocketExplorer_draftOrder', JSON.stringify(formDataToSave))
    }

    // Save on form data change
    if (formData.name || formData.phone || formData.address || formData.city) {
      const timeoutId = setTimeout(saveFormData, 1000) // Debounce 1 second
      return () => clearTimeout(timeoutId)
    }
  }, [formData, selectedColor, selectedPackage, quantity])

  // Load saved form data on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('pocketExplorer_draftOrder')
      if (savedData) {
        const parsed = JSON.parse(savedData)
        // Only restore if data is less than 24 hours old
        const dataAge = new Date().getTime() - new Date(parsed.timestamp).getTime()
        if (dataAge < 24 * 60 * 60 * 1000) {
          setFormData({
            name: parsed.name || '',
            nameClient: parsed.nameClient || '',
            phone: parsed.phone || '',
            address: parsed.address || '',
            city: parsed.city || '',
            notes: parsed.notes || '',
            description: parsed.description || '',
            additionalInfo: parsed.additionalInfo || '',
            color: parsed.color || ''
          })
          if (parsed.selectedColor) {
            const color = colorVariants.find(c => c.id === parsed.selectedColor)
            if (color) setSelectedColor(color)
          }
          if (parsed.selectedPackage) setSelectedPackage(parsed.selectedPackage)
          if (parsed.quantity) setQuantity(parsed.quantity)
        }
      }
    } catch (error) {
      console.warn('⚠️ Failed to load saved form data:', error)
    }
  }, [])

  // Exit-intent detection to capture incomplete orders
  useEffect(() => {
    const handleExitIntent = (e: MouseEvent) => {
      // Check if user has meaningful data in the form
      if (formData.name || formData.phone || formData.address) {
        const exitData = {
          ...formData,
          selectedColor: getLangText(selectedColor.name),
          selectedPackage,
          quantity,
          timestamp: new Date().toISOString(),
          exitReason: 'page_exit',
          userAgent: navigator.userAgent,
          page: 'pocket-explorer'
        }
        
        // Send exit intent data
        try {
          fetch('https://dmtart.pro/api/incomplete-orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(exitData)
          }).catch(() => {
            console.log('📝 Exit intent tracked locally only')
          })
        } catch (error) {
          console.warn('⚠️ Failed to track exit intent:', error)
        }
      }
    }

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (formData.name || formData.phone || formData.address) {
        // Save data to localStorage as backup
        const formDataToSave = {
          ...formData,
          selectedColor: selectedColor.id,
          selectedPackage,
          quantity,
          timestamp: new Date().toISOString()
        }
        localStorage.setItem('pocketExplorer_draftOrder', JSON.stringify(formDataToSave))
      }
    }

    // Mouse leaving viewport (desktop)
    document.addEventListener('mouseleave', handleExitIntent)
    // Page/tab close
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      document.removeEventListener('mouseleave', handleExitIntent)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [formData, selectedColor, selectedPackage, quantity])

  // Send Facebook ViewContent event when page loads
  useEffect(() => {
    try {
      facebookConversions.sendViewContent({
        id: 'CTNSPY68EC',
        name: t('productName'),
        price: basePrice,
        currency: currentLang === 'en' ? 'USD' : currentLang === 'fr' ? 'EUR' : 'AED'
      })
    } catch (fbError) {
      console.warn('⚠️ Facebook ViewContent event failed:', fbError)
    }
  }, [])

  // Scroll detection for back to form button
  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled past 500px from top
      const scrolled = window.scrollY > 500
      setShowBackToForm(scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Safe language getter with fallback
  const getLangText = (textObj: { ar: string; fr: string; en: string }) => {
    return textObj[currentLang as keyof typeof textObj] || textObj.en || ''
  }

  // Translation function
  const t = (key: string) => {
    const translations: { [key: string]: { ar: string; fr: string; en: string } } = {
      productName: {
        ar: 'مجهر الأطفال الرقمي باكت إكسبلورر',
        fr: 'Microscope Numérique Pocket Explorer pour Enfants',
        en: 'Pocket Explorer Kids Digital Microscope'
      },
      home: {
        ar: 'الرئيسية',
        fr: 'Accueil',
        en: 'Home'
      },
      products: {
        ar: 'المنتجات',
        fr: 'Produits',
        en: 'Products'
      },
      outOf5: {
        ar: 'من 5',
        fr: 'sur 5',
        en: 'out of 5'
      },
      reviews: {
        ar: 'مراجعة',
        fr: 'avis',
        en: 'reviews'
      },
      color: {
        ar: 'اللون',
        fr: 'Couleur',
        en: 'Color'
      },
      quantity: {
        ar: 'الكمية',
        fr: 'Quantité',
        en: 'Quantity'
      },
      total: {
        ar: 'المجموع',
        fr: 'Total',
        en: 'Total'
      },
      addToCart: {
        ar: 'أضف للسلة',
        fr: 'Ajouter au panier',
        en: 'Add to Cart'
      },
      freeDelivery: {
        ar: 'توصيل مجاني',
        fr: 'Livraison gratuite',
        en: 'Free Delivery'
      },
      warranty: {
        ar: 'ضمان سنة',
        fr: 'Garantie 1 an',
        en: '1 Year Warranty'
      },
      returns: {
        ar: 'إرجاع 30 يوم',
        fr: 'Retours 30 jours',
        en: '30-Day Returns'
      },
      description: {
        ar: 'الوصف',
        fr: 'Description',
        en: 'Description'
      },
      descriptionText: {
        ar: 'مجهر الأطفال الرقمي باكت إكسبلورر هو جهاز تعليمي متقدم مصمم خصيصاً للأطفال. مع قدرات تصوير عالية الدقة وبطارية قابلة لإعادة الشحن، يفتح هذا المجهر المحمول عالمًا من الاكتشاف للعقول الشابة. مثالي للتعليم المنزلي أو الاستخدام في الفصل الدراسي أو الاستكشاف في الهواء الطلق.',
        fr: 'Le microscope numérique Pocket Explorer pour enfants est un appareil éducatif avancé conçu spécifiquement pour les enfants. Avec des capacités d\'imaging haute définition et une batterie rechargeable, ce microscope portable ouvre un monde de découverte pour les jeunes esprits. Parfait pour l\'école à la maison, l\'utilisation en classe ou l\'exploration en plein air.',
        en: 'The Pocket Explorer Kids Digital Microscope is an advanced educational device designed specifically for children. With high-definition imaging capabilities and a rechargeable battery, this portable microscope opens up a world of discovery for young minds. Perfect for homeschooling, classroom use, or outdoor exploration.'
      },
      cashOnDelivery: {
        ar: 'طلب الدفع عند الاستلام',
        fr: 'Commande Paiement à la Livraison',
        en: 'Cash on Delivery Order'
      },
      fullName: {
        ar: 'الاسم الكامل *',
        fr: 'Nom complet *',
        en: 'Full Name *'
      },
      phoneNumber: {
        ar: 'رقم الهاتف *',
        fr: 'Numéro de téléphone *',
        en: 'Phone Number *'
      },
      address: {
        ar: 'العنوان *',
        fr: 'Adresse *',
        en: 'Address *'
      },
      city: {
        ar: 'المدينة *',
        fr: 'Ville *',
        en: 'City *'
      },
      orderNotes: {
        ar: 'ملاحظات الطلب (اختياري)',
        fr: 'Notes de commande (facultatif)',
        en: 'Order Notes (Optional)'
      },
      orderSummary: {
        ar: 'ملخص الطلب',
        fr: 'Résumé de la commande',
        en: 'Order Summary'
      },
      product: {
        ar: 'المنتج',
        fr: 'Produit',
        en: 'Product'
      },
      pricePerUnit: {
        ar: 'السعر للوحدة',
        fr: 'Prix par unité',
        en: 'Price per unit'
      },
      placeOrder: {
        ar: 'تأكيد الطلب ',
        fr: 'Passer la commande ',
        en: 'Order Now'
      },
      customerReviews: {
        ar: 'مراجعات العملاء',
        fr: 'Avis des clients',
        en: 'Customer Reviews'
      },
      specialInstructions: {
        ar: 'تعليمات خاصة',
        fr: 'Instructions spéciales',
        en: 'Special instructions'
      },
      enterFullName: {
        ar: 'أدخل اسمك الكامل',
        fr: 'Entrez votre nom complet',
        en: 'Enter your full name'
      },
      enterPhone: {
        ar: '+971 XXX XXX XXXX',
        fr: '+33 X XX XX XX XX',
        en: '+1 XXX XXX XXXX'
      },
      enterAddress: {
        ar: 'أدخل عنوانك الكامل',
        fr: 'Entrez votre adresse complète',
        en: 'Enter your complete address'
      },
      singlePiece: {
        ar: 'قطعة واحدة',
        fr: 'Une pièce',
        en: 'Single piece'
      },
      doublePieces: {
        ar: 'قطعتان',
        fr: 'Deux pièces',
        en: 'Two pieces'
      },
      specialOffer: {
        ar: 'عرض خاص',
        fr: 'Offre spéciale',
        en: 'Special offer'
      },
      save: {
        ar: 'توفير',
        fr: 'Économiser',
        en: 'Save'
      },
      backToForm: {
        ar: 'العودة إلى النموذج',
        fr: 'Retour au formulaire',
        en: 'Back to Form'
      },
    }
    
    return translations[key]?.[currentLang as 'ar' | 'fr' | 'en'] || key
  }

  const handleColorChange = (color: typeof colorVariants[0]) => {
    setSelectedColor(color)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow digits
    const digitsOnly = value.replace(/\D/g, '')
    setFormData({...formData, phone: digitsOnly})
    
    // Validate phone number length
    if (digitsOnly.length > 0 && digitsOnly.length !== 9) {
      setPhoneError('يجب أن يكون رقم الهاتف 9 أرقام (مثل: 558406027)')
    } else {
      setPhoneError('')
    }
  }

  const handlePackageChange = (pkg: 'single' | 'double') => {
    setSelectedPackage(pkg)
    setQuantity(pkg === 'single' ? 1 : 2)
  }

  const scrollToForm = () => {
    const formElement = document.getElementById('order-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Prevent multiple submissions
    if (isSubmitting) {
      console.log('⚠️ Form already submitting, ignoring duplicate submission')
      return
    }
    
    // Validate phone number before submission
    if (formData.phone.length !== 9) {
      setPhoneError('يجب أن يكون رقم الهاتف 9 أرقام (مثل: 558406027)')
      return
    }
    
    setIsSubmitting(true)
    
    // Track incomplete order before submission
    const incompleteOrderData = {
      ...formData,
      selectedColor: getLangText(selectedColor.name),
      selectedPackage,
      quantity,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      page: 'pocket-explorer'
    }
    
    // Send incomplete order data to your server (optional)
    try {
      fetch('https://dmtart.pro/api/incomplete-orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(incompleteOrderData)
      }).catch(() => {
        // Silently fail if tracking endpoint doesn't exist
        console.log('📝 Incomplete order tracked locally only')
      })
    } catch (error) {
      console.warn('⚠️ Failed to track incomplete order:', error)
    }
    
    // Handle cash on delivery order submission
    const orderData = {
      nameOfProduct: t('productName'),
      priceOfProduct: selectedPackage === 'single' ? basePrice : doublePrice,
      nameClient: formData.nameClient || formData.name, // Add nameClient field
      phone: formData.phone || '', // Add phone field
      quantity,
      address: formData.address,
      city: formData.city,
      color: getLangText(selectedColor.name),
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
            id: 'CTNSPY68EC',
            name: t('productName'),
            quantity: quantity,
            price: selectedPackage === 'single' ? basePrice : doublePrice
          }],
          totalAmount: selectedPackage === 'single' ? basePrice : doublePrice,
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
            id: 'CTNSPY68EC',
            name: t('productName'),
            quantity: quantity,
            price: selectedPackage === 'single' ? basePrice : doublePrice
          }],
          totalAmount: selectedPackage === 'single' ? basePrice : doublePrice,
          orderId: result._id || result.id,
          currency: 'AED'
        })
      } catch (fbError) {
        console.warn('⚠️ Facebook Purchase event failed:', fbError)
      }
      
      // Send to delivery agency
      try {
        console.log('🚚 Sending pocket explorer order to delivery agency...')
        const deliveryOrderData = {
          orderId: result._id || result.id,
          customerName: formData.name || 'Customer',
          customerEmail: '', // You may want to add email field to form
          customerPhone: formData.phone || '',
          address: formData.address,
          city: formData.city,
          products: [{
            id: 'CTNSPY68EC', // Use the correct CODTOOP SKU from the website
            name: 'Pocket Explorer',
            quantity: quantity,
            price: selectedPackage === 'single' ? 17900 : 33000, // Price in cents for delivery service
            color: getLangText(selectedColor.name)
          }],
          totalAmount: selectedPackage === 'single' ? 17900 : 33000,
          status: 'pending',
          createdAt: new Date().toISOString()
        }

        const deliveryResponse = await deliveryService.sendOrderToDelivery(deliveryOrderData)
        
        if (deliveryResponse.success) {
          console.log('✅ Pocket explorer order sent to delivery agency successfully:', deliveryResponse)
        } else {
          console.error('❌ Failed to send pocket explorer order to delivery agency:', deliveryResponse.error)
        }
      } catch (deliveryError) {
        console.error('💥 Delivery service error for pocket explorer:', deliveryError)
      }
      
      // Clear saved form data after successful submission
      localStorage.removeItem('pocketExplorer_draftOrder')
      
      // Redirect to thank you page
      router.push('/thank-you')
      
    } catch (error) {
      console.error('Error submitting order:', error)
      alert(`Error submitting order: ${error instanceof Error ? error.message : 'Unknown error'}`)
      setIsSubmitting(false)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50 md:mt-12 mt-8" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className={`flex items-center space-x-2 text-sm ${currentLang === 'ar' ? 'space-x-reverse' : ''}`}>
            <Link href="/" className="text-gray-500 hover:text-[#fcb24b]">{t('home')}</Link>
            <span className="text-gray-400">/</span>
            <Link href="/products" className="text-gray-500 hover:text-[#fcb24b]">{t('products')}</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{t('productName')}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square overflow-hidden rounded-xl bg-white shadow-lg">
              <Image
                src={productImages[selectedImage]}
                alt="Pocket Explorer Kids Digital Microscope"
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-6 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === index ? 'border-[#fcb24b] scale-105' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Product image ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover hover:scale-110 transition-transform"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {t('productName')}
              </h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center ">
                  {renderStars(5)}
                  <span className="ml-2 text-gray-600">(4.8 {t('outOf5')})</span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-600">245 {t('reviews')}</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold mx-2 text-[#fcb24b]">{basePrice} {currency}</span>
              <span className="text-xl text-gray-400 line-through"> {originalBasePrice} {currency}</span>
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                -{Math.round(((originalBasePrice - basePrice) / originalBasePrice) * 100)}% OFF
              </span>
            </div>

            {/* Color Variants */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('color')}: {getLangText(selectedColor.name)}</h3>
              <div className="flex space-x-3">
                {colorVariants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => handleColorChange(variant)}
                    className={`relative w-16 h-16 mx-2 rounded-lg border-2 transition-all ${
                      selectedColor.id === variant.id
                        ? 'border-[#fcb24b] scale-110 shadow-lg'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Image
                      src={variant.image}
                      alt={getLangText(variant.name)}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover rounded-md"
                    />
                    {selectedColor.id === variant.id && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 bg-[#fcb24b] rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Package Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('quantity')}</h3>
              <div className="space-y-3">
                <button
                  onClick={() => handlePackageChange('single')}
                  className={`w-full p-4 border-2 rounded-lg transition-all ${
                    selectedPackage === 'single'
                      ? 'border-[#fcb24b] bg-yellow-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">{t('singlePiece')}</div>
                      <div className="text-sm text-gray-600">1 piece</div>
                      <div className="text-xs text-red-600">{t('save')} {originalBasePrice - basePrice} {currency}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-[#fcb24b]">{basePrice} {currency}</div>
                      <div className="text-sm text-gray-400 line-through">{originalBasePrice} {currency}</div>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => handlePackageChange('double')}
                  className={`w-full p-4 border-2 rounded-lg transition-all ${
                    selectedPackage === 'double'
                      ? 'border-[#fcb24b] bg-yellow-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">{t('doublePieces')}</div>
                      <div className="text-sm text-gray-600">2 pieces - {t('specialOffer')}</div>
                      <div className="text-xs text-red-600">{t('save')} {originalDoublePrice - doublePrice} {currency}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-[#fcb24b]">{doublePrice} {currency}</div>
                      <div className="text-sm text-gray-400 line-through">{originalDoublePrice} {currency}</div>
                    </div>
                  </div>
                </button>
              </div>
              <p className="mt-4 text-gray-600">
                {t('total')}: <span className="font-bold text-[#fcb24b]">{(selectedPackage === 'single' ? basePrice : doublePrice).toLocaleString()}{currency}</span>
              </p>
            </div>

        
            {/* Features */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-200">
              <div className="text-center">
                <Truck className="w-8 h-8 text-[#fcb24b] mx-auto mb-2" />
                <span className="text-sm text-gray-600">{t('freeDelivery')}</span>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-[#fcb24b] mx-auto mb-2" />
                <span className="text-sm text-gray-600">{t('warranty')}</span>
              </div>
              <div className="text-center">
                <RotateCcw className="w-8 h-8 text-[#fcb24b] mx-auto mb-2" />
                <span className="text-sm text-gray-600">{t('returns')}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('description')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('descriptionText')}
              </p>
            </div>
          </div>
        </div>

        {/* Cash on Delivery Form */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('cashOnDelivery')}</h2>
          <form id="order-form" onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('fullName')}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fcb24b] focus:border-transparent"
                  placeholder={t('enterFullName')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('phoneNumber')}
                </label>
                <div className="flex">
                  <span className="inline-flex items-center mx-2 px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                    +971
                  </span>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className={`flex-1 px-4 py-2 border rounded-r-lg focus:ring-2 focus:ring-[#fcb24b] focus:border-transparent ${
                      phoneError ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={currentLang === 'ar' ? '55 XXX XXXX' : currentLang === 'fr' ? '55 XXX XXXX' : '55 XXX XXXX'}
                    maxLength={9}
                  />
                </div>
                {phoneError && (
                  <p className="mt-1 text-sm text-red-600">{phoneError}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('address')}
              </label>
              <textarea
                required
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fcb24b] focus:border-transparent"
                placeholder={t('enterAddress')}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('city')}
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fcb24b] focus:border-transparent"
                  placeholder={t('enterCity')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('orderNotes')}
                </label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fcb24b] focus:border-transparent"
                  placeholder={t('specialInstructions')}
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('orderSummary')}</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('product')}:</span>
                  <span className="font-medium">{t('productName')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('color')}:</span>
                  <span className="font-medium">{getLangText(selectedColor.name)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('quantity')}:</span>
                  <span className="font-medium">{quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('pricePerUnit')}:</span>
                  <span className="font-medium">{selectedPackage === 'single' ? basePrice : doublePrice}{currency}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>{t('total')}:</span>
                    <span className="text-[#fcb24b]">{(selectedPackage === 'single' ? basePrice : doublePrice).toLocaleString()}{currency}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                isSubmitting 
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {currentLang === 'ar' ? 'جاري المعالجة...' : currentLang === 'fr' ? 'Traitement en cours...' : 'Processing...'}
                </span>
              ) : (
                t('placeOrder')
              )}
            </button>
          </form>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('customerReviews')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <Image
                    src={review.image}
                    alt={review.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{review.name}</h4>
                    <div className="flex items-center">
                      {renderStars(review.rating)}
                      <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">{getLangText(review.comment)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Sections */}
        <VideoShowcase />
        <FeaturedReels />
        <CommunityReviews />
      </div>

      {/* Floating Back to Form Button */}
      {showBackToForm && (
        <button
          onClick={scrollToForm}
          className="sticky bottom-6 right-6 bg-[#fcb24b] text-white px-6 py-3 rounded-full shadow-lg hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105 z-50 flex items-center gap-2 float-right mr-6 mb-6"
          style={{
            animation: 'slideInRight 0.3s ease-out'
          }}
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
          {t('backToForm')}
        </button>
      )}
    </div>
  )
}
