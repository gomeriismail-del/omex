'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { CheckCircle, ArrowLeft, Home, ShoppingBag, Phone, Mail, MapPin } from 'lucide-react'

export default function ThankYouPage() {
  const { currentLang } = useLanguage()
  const router = useRouter()

  // Safe language getter with fallback
  const getLangText = (textObj: { ar: string; fr: string; en: string }) => {
    return textObj[currentLang as keyof typeof textObj] || textObj.en || ''
  }

  // Translation function
  const t = (key: string) => {
    const translations: { [key: string]: { ar: string; fr: string; en: string } } = {
      thankYou: {
        ar: 'شكراً لك!',
        fr: 'Merci !',
        en: 'Thank You!'
      },
      orderReceived: {
        ar: 'تم استلام طلبك بنجاح',
        fr: 'Votre commande a été reçue avec succès',
        en: 'Your order has been received successfully'
      },
      orderNumber: {
        ar: 'رقم الطلب',
        fr: 'Numéro de commande',
        en: 'Order Number'
      },
      confirmationEmail: {
        ar: 'لقد أرسلنا تأكيد الطلب إلى بريدك الإلكتروني',
        fr: 'Nous avons envoyé une confirmation de commande à votre adresse e-mail',
        en: 'We have sent an order confirmation to your email'
      },
      processingTime: {
        ar: 'سيتم معالجة طلبك خلال 24-48 ساعة',
        fr: 'Votre commande sera traitée dans les 24-48 heures',
        en: 'Your order will be processed within 24-48 hours'
      },
      deliveryInfo: {
        ar: 'معلومات التوصيل',
        fr: 'Informations de livraison',
        en: 'Delivery Information'
      },
      cashOnDelivery: {
        ar: 'الدفع عند الاستلام',
        fr: 'Paiement à la livraison',
        en: 'Cash on Delivery'
      },
      contactSupport: {
        ar: 'لأي استفسار، تواصل معنا',
        fr: 'Pour toute question, contactez-nous',
        en: 'For any inquiries, contact us'
      },
      backToHome: {
        ar: 'العودة إلى الرئيسية',
        fr: 'Retour à l\'accueil',
        en: 'Back to Home'
      },
      continueShopping: {
        ar: 'متابعة التسوق',
        fr: 'Continuer les achats',
        en: 'Continue Shopping'
      },
      trackOrder: {
        ar: 'تتبع الطلب',
        fr: 'Suivre la commande',
        en: 'Track Order'
      },
      orderDetails: {
        ar: 'تفاصيل الطلب',
        fr: 'Détails de la commande',
        en: 'Order Details'
      },
      whatNext: {
        ar: 'ماذا بعد؟',
        fr: 'Que se passe-t-il ensuite ?',
        en: 'What happens next?'
      },
      step1: {
        ar: 'تأكيد الطلب',
        fr: 'Confirmation de la commande',
        en: 'Order Confirmation'
      },
      step2: {
        ar: 'معالجة الطلب',
        fr: 'Traitement de la commande',
        en: 'Order Processing'
      },
      step3: {
        ar: 'التوصيل',
        fr: 'Livraison',
        en: 'Delivery'
      },
      step1Desc: {
        ar: 'لقد تلقينا طلبك وأرسلنا بريداً إلكترونياً للتأكيد',
        fr: 'Nous avons reçu votre commande et vous avons envoyé un e-mail de confirmation',
        en: 'We have received your order and sent you a confirmation email'
      },
      step2Desc: {
        ar: 'يقوم فريقنا بمراجعة طلبك وتجهيزه للشحن',
        fr: 'Notre équipe examine votre commande et la prépare pour l\'expédition',
        en: 'Our team reviews your order and prepares it for shipping'
      },
      step3Desc: {
        ar: 'سيتم توصيل طلبك إلى العنوان المحدد',
        fr: 'Votre commande sera livrée à l\'adresse spécifiée',
        en: 'Your order will be delivered to the specified address'
      }
    }
    
    return translations[key]?.[currentLang as 'ar' | 'fr' | 'en'] || key
  }

  // Generate random order number
  const orderNumber = `OMX-${Date.now().toString().slice(-6)}`

  useEffect(() => {
    // Set page language
    if (currentLang) {
      document.documentElement.lang = currentLang
      document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr'
    }
  }, [currentLang])

  return (
    <div className="min-h-screen bg-gray-50" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Success Header */}
      <div className="bg-gradient-to-tr from-[#fcb24b] to-yellow-200 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-full p-6 shadow-lg">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('thankYou')}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {t('orderReceived')}
          </p>
        </div>
      </div>

      {/* Order Information */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <div className="inline-block bg-gray-100 rounded-lg px-4 py-2 mb-4">
              <span className="text-sm text-gray-600">{t('orderNumber')}: </span>
              <span className="font-bold text-gray-900">{orderNumber}</span>
            </div>
            <p className="text-gray-600">
              {t('confirmationEmail')}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {t('whatNext')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="text-center">
                <div className="bg-[#fcb24b]/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#fcb24b]">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{t('step1')}</h3>
                <p className="text-sm text-gray-600">{t('step1Desc')}</p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="bg-[#fcb24b]/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#fcb24b]">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{t('step2')}</h3>
                <p className="text-sm text-gray-600">{t('step2Desc')}</p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="bg-[#fcb24b]/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#fcb24b]">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{t('step3')}</h3>
                <p className="text-sm text-gray-600">{t('step3Desc')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t('deliveryInfo')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4">
              <div className="bg-[#fcb24b]/10 rounded-lg p-3">
                <ShoppingBag className="w-6 h-6 text-[#fcb24b]" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{t('cashOnDelivery')}</h3>
                <p className="text-sm text-gray-600">{t('processingTime')}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-[#fcb24b]/10 rounded-lg p-3">
                <Phone className="w-6 h-6 text-[#fcb24b]" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{t('contactSupport')}</h3>
                <p className="text-sm text-gray-600">+213 XXX XXX XXXX</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="flex items-center justify-center px-6 py-3 bg-[#fcb24b] text-white rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            {t('backToHome')}
          </Link>
          
          <Link 
            href="/products"
            className="flex items-center justify-center px-6 py-3 border border-[#fcb24b] text-[#fcb24b] rounded-lg font-semibold hover:bg-[#fcb24b] hover:text-white transition-colors"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            {t('continueShopping')}
          </Link>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t('contactSupport')}
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Phone className="w-5 h-5" />
              <span>+213 XXX XXX XXXX</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Mail className="w-5 h-5" />
              <span>support@omex.com</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>Algiers, Algeria</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
