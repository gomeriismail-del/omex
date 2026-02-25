'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function PaymentMethodPage() {
  const { currentLang } = useLanguage()

  const content = {
    ar: {
      title: 'طرق الدفع',
      subtitle: 'أطلب الآن والدفع فقط عند استلام المنتج',
      method: 'الدفع نقداً عند الاستلام (COD)',
      description: 'الدفع عند الاستلام (Cash On Delivery) هي الطريقة الوحيدة حالياً المتاحة على متجرنا، والدفع عند الاستلام يعني أن المتسوق يمكنه التسوق عبر متجرنا إلكتروني واختيار المنتج الذي يرغب فيه ومن ثم يقوم بإجراء الطلب، وهو ما يعني أن عملية الدفع تؤجل حتى استلام العميل للمنتج الذي قام بطلبه إلكترونيًا.',
      process: 'وسنقوم بإرسال المنتج إلى المكان المتفق عليه (المدينة أو الحي أو المنزل، مكان العمل أو مكان اخر)، وبعدها يتم الدفع.',
      phone: 'يمكنك الطلب مباشرة عبر الهاتف :',
      phoneNumber: '+971 55 840 6027',
      note: 'ملاحظة :',
      noteDescription: 'يرجى إبقاء هاتفك مفتوحاً حتى يتمكن العون المكلف بالتوصيل بالإتصال بك عندما يكون قريب من العنوان.'
    },
    fr: {
      title: 'Méthodes de Paiement',
      subtitle: 'Commandez maintenant et payez uniquement à la réception du produit',
      method: 'Paiement en espèces à la livraison (COD)',
      description: 'Le paiement à la livraison (Cash On Delivery) est actuellement la seule méthode disponible sur notre boutique. Le paiement à la livraison signifie que le client peut faire ses achats sur notre boutique en ligne, choisir le produit qu\'il souhaite, puis passer sa commande. Le processus de paiement est reporté jusqu\'à ce que le client reçoive le produit commandé en ligne.',
      process: 'Nous enverrons le produit à l\'endroit convenu (ville, quartier, domicile, lieu de travail ou autre), et le paiement sera effectué après.',
      phone: 'Vous pouvez commander directement par téléphone :',
      phoneNumber: '+971 55 840 6027',
      note: 'Remarque :',
      noteDescription: 'Veuillez garder votre téléphone ouvert afin que le livreur puisse vous contacter lorsqu\'il sera proche de votre adresse.'
    },
    en: {
      title: 'Payment Methods',
      subtitle: 'Order now and pay only upon product delivery',
      method: 'Cash on Delivery (COD)',
      description: 'Cash on Delivery is currently the only payment method available on our store. COD means that customers can shop through our online store, choose the product they want, and then place their order. This means the payment process is postponed until the customer receives the product they ordered online.',
      process: 'We will send the product to the agreed location (city, neighborhood, home, workplace, or other place), and payment will be made afterward.',
      phone: 'You can order directly by phone:',
      phoneNumber: '+971 55 840 6027',
      note: 'Note:',
      noteDescription: 'Please keep your phone open so that the delivery person can contact you when they are near your address.'
    }
  }

  const currentContent = content[currentLang as keyof typeof content] || content.en

  return (
    <div className=" mt-12 min-h-screen bg-gradient-to-tr from-[#fcb24b] to-yellow-200 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {currentContent.title}
          </h1>
          <p className="text-xl text-gray-600 font-medium">
            {currentContent.subtitle}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#fcb24b] to-yellow-300 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12">
          {/* Payment Method */}
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#fcb24b] to-yellow-300 rounded-full flex items-center justify-center text-white font-bold text-lg">
                COD
              </div>
              <h2 className="text-2xl font-bold text-gray-900 ml-4">
                {currentContent.method}
              </h2>
            </div>
            
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              {currentContent.description}
            </p>
            
            <p className="text-gray-700 leading-relaxed text-lg">
              {currentContent.process}
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 rounded-xl p-6 md:p-8">
            <div className="flex items-center mb-4">
              <svg className="w-6 h-6 text-[#fcb24b] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900">
                {currentContent.phone}
              </h3>
            </div>
            
            <a 
              href={`tel:${currentContent.phoneNumber}`}
              className="inline-flex items-center text-2xl font-bold text-[#fcb24b] hover:text-yellow-600 transition-colors duration-200"
            >
              {currentContent.phoneNumber}
            </a>
          </div>

          {/* Important Note */}
          <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-xl">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-amber-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <h4 className="text-lg font-semibold text-amber-800 mb-2">
                  {currentContent.note}
                </h4>
                <p className="text-amber-700 leading-relaxed">
                  {currentContent.noteDescription}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#fcb24b]/10 rounded-full mb-4">
              <svg className="w-8 h-8 text-[#fcb24b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {currentLang === 'ar' ? 'آمن وموثوق' : currentLang === 'fr' ? 'Sécurisé et Fiable' : 'Safe and Reliable'}
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {currentLang === 'ar' 
                ? 'نضمن لك تجربة تسوق آمنة ومريحة مع أفضل المنتجات وأسرع خدمة توصيل'
                : currentLang === 'fr'
                ? 'Nous vous garantissons une expérience de shopping sécurisée et confortable avec les meilleurs produits et le service de livraison le plus rapide'
                : 'We guarantee you a safe and comfortable shopping experience with the best products and fastest delivery service'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
