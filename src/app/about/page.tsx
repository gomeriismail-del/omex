'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import Image from 'next/image'

export default function AboutPage() {
  const { currentLang } = useLanguage()

  const content = {
    ar: {
      title: 'اكتشف عالم الخلايا والميكروبات',
      description: 'أوميكس هو الموقع الرسمي لمنتجات التعليم العلمي للأطفال، نقدم مجموعة واسعة من الأدوات التعليمية المبتكرة التي تجعل التعلم ممتعاً وتفاعلياً. نؤمن بأن التعليم العملي يفتح آفاقاً جديدة للأطفال وينمي فضولهم العلمي.',
      secondParagraph: 'من المجاهر الدقيقة إلى مجموعات الكيمياء الآمنة، نقدم منتجات عالية الجودة تلبي احتياجات الأطفال في جميع الأعمار. كل منتجاتنا مصممة بعناية لتكون آمنة ومثيرة للاهتمام.',
      thirdParagraph: 'في أوميكس، نلتزم بتقديم تجربة تسوق ممتازة مع خدمة عملاء متوفرة للإجابة على استفساراتكم، وتوصيل سريع إلى جميع مناطق البلاد.',
      slogan: 'اكتشف العالم مع أوميكس… لأن التعلم يجب أن يكون مغامراً.'
    },
    fr: {
      title: 'Découvrez le monde des cellules et des microorganismes',
      description: 'OMEX est le site officiel des produits éducatifs scientifiques pour enfants, nous offrons une large gamme d\'outils pédagogiques innovants qui rendent l\'apprentissage amusant et interactif. Nous croyons que l\'éducation pratique ouvre de nouveaux horizons pour les enfants et nourrit leur curiosité scientifique.',
      secondParagraph: 'Des microscopes précis aux kits de chimie sécurisés, nous proposons des produits de haute qualité qui répondent aux besoins des enfants de tous âges. Tous nos produits sont soigneusement conçus pour être sûrs et passionnants.',
      thirdParagraph: 'Chez OMEX, nous nous engageons à offrir une excellente expérience d\'achat avec un service client disponible pour répondre à vos questions et une livraison rapide dans toutes les régions du pays.',
      slogan: 'Découvrez le monde avec OMEX… parce que l\'apprentissage devrait être une aventure.'
    },
    en: {
      title: 'Discover the world of cells and microorganisms',
      description: 'OMEX is the official website for educational science products for kids, offering a wide range of innovative learning tools that make education fun and interactive. We believe that hands-on learning opens new horizons for children and nurtures their scientific curiosity.',
      secondParagraph: 'From precision microscopes to safe chemistry sets, we provide high-quality products that meet the needs of children of all ages. All our products are carefully designed to be safe and engaging.',
      thirdParagraph: 'At OMEX, we are committed to providing an excellent shopping experience with customer service available to answer your inquiries and fast delivery to all regions of the country.',
      slogan: 'Discover the world with OMEX… because learning should be an adventure.'
    }
  }

  const currentContent = content[currentLang as keyof typeof content] || content.en

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#fcb24b] to-yellow-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {currentContent.title}
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-[#A38151] to-[#D8BA84] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12">
          {/* About Content with Mixed Layout */}
          <div className="space-y-12">
            {/* Section 1: Text + Image Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {currentContent.description}
                </p>
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <div className="relative aspect-video">
                  <Image
                    src="/assets/suggest/71--+HeIQkL._AC_SL1500_.jpg"
                    alt="Educational Science Products for Kids"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Image + Text Side by Side (Reversed) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <div className="relative aspect-video">
                    <Image
                      src="/assets/suggest/71G2hYXNKcL._AC_SL1500_.jpg"
                      alt="Quality Educational Products"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {currentContent.secondParagraph}
                </p>
              </div>
            </div>

            {/* Section 3: Text with Full Width Image */}
            <div>
              <p className="text-gray-700 leading-relaxed text-lg mb-8">
                {currentContent.thirdParagraph}
              </p>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <div className="relative aspect-video">
                  <Image
                    src="/assets/suggest/71J81b5oHkL._AC_SX425_.jpg"
                    alt="Customer Service and Educational Support"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Slogan Section */}
            <div className="mt-12 p-8 bg-gradient-to-r from-[#fcb24b]/20 to-yellow-200/20 rounded-xl border border-[#A38151]/20">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#A38151] to-[#D8BA84] rounded-full mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#A38151] mb-2">
                  {currentContent.slogan}
                </h3>
              </div>
            </div>

            {/* Features Grid */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-white rounded-xl border border-[#A38151]/10">
                <div className="w-12 h-12 bg-[#A38151]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-[#A38151]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {currentLang === 'ar' ? 'منتجات أصلية' : currentLang === 'fr' ? 'Produits Authentiques' : 'Authentic Products'}
                </h4>
                <p className="text-gray-600 text-sm">
                  {currentLang === 'ar' 
                    ? 'نضمن لك منتجات أصلية ومجرّبة'
                    : currentLang === 'fr'
                    ? 'Nous garantissons des produits authentiques et testés'
                    : 'We guarantee authentic and tested products'
                  }
                </p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-white rounded-xl border border-[#A38151]/10">
                <div className="w-12 h-12 bg-[#A38151]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-[#A38151]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {currentLang === 'ar' ? 'توصيل سريع' : currentLang === 'fr' ? 'Livraison Rapide' : 'Fast Delivery'}
                </h4>
                <p className="text-gray-600 text-sm">
                  {currentLang === 'ar' 
                    ? 'توصيل سريع إلى جميع ولايات البلاد'
                    : currentLang === 'fr'
                    ? 'Livraison rapide dans toutes les régions du pays'
                    : 'Fast delivery to all regions of the country'
                  }
                </p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-white rounded-xl border border-[#A38151]/10">
                <div className="w-12 h-12 bg-[#A38151]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-[#A38151]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {currentLang === 'ar' ? 'خدمة عملاء' : currentLang === 'fr' ? 'Service Client' : 'Customer Service'}
                </h4>
                <p className="text-gray-600 text-sm">
                  {currentLang === 'ar' 
                    ? 'خدمة عملاء متوفرة للإجابة على استفساراتكم'
                    : currentLang === 'fr'
                    ? 'Service client disponible pour répondre à vos questions'
                    : 'Customer service available to answer your inquiries'
                  }
                </p>
              </div>
            </div>

            {/* Suggested Products Section */}
            <div className="mt-16">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {currentLang === 'ar' ? 'منتجات مقترحة' : 
                   currentLang === 'fr' ? 'Produits Suggérés' : 
                   'Suggested Products'}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {currentLang === 'ar' ? 'منتجات تعليمية مختارة بعناية لتلبية احتياجات أطفالكم' : 
                   currentLang === 'fr' ? 'Produits éducatifs sélectionnés avec soin pour répondre aux besoins de vos enfants' : 
                   'Carefully selected educational products to meet your kids\' needs'}
                </p>
              </div>

              {/* Product Cards - Different Style */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Product 1 */}
                <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
                  <div className="aspect-square overflow-hidden bg-gradient-to-br from-yellow-50 to-white relative">
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-all duration-300"></div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-xs font-semibold text-[#A38151]">
                        {currentLang === 'ar' ? 'الأكثر مبيعاً' : 
                         currentLang === 'fr' ? 'Best-seller' : 
                         'Best-seller'}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2">
                        <span className="text-sm font-bold text-gray-900">
                          {currentLang === 'ar' ? 'مجهر للأطفال' : 
                           currentLang === 'fr' ? 'Microscope pour Enfants' : 
                           'Kids Microscope'}
                        </span>
                      </div>
                    </div>
                    <Image
                      src="/assets/suggest/71dXO6hQYHL._AC_SX425_.jpg"
                      alt="Kids Microscope"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">
                      {currentLang === 'ar' ? 'مجهر تعليمي متقدم' : 
                       currentLang === 'fr' ? 'Microscope Éducatif Avancé' : 
                       'Advanced Educational Microscope'}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {currentLang === 'ar' ? 'مجهر عالي الجودة مصمم للأطفال لاكتشاف عالم الخلايا والميكروبات' : 
                       currentLang === 'fr' ? 'Microscope haute qualité conçu pour les enfants pour découvrir le monde des cellules et des microbes' : 
                       'High-quality microscope designed for kids to discover the world of cells and microorganisms'}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-[#A38151]">
                        {currentLang === 'ar' ? '١٢٠٠ درهم' : 
                         currentLang === 'fr' ? '1200 AED' : 
                         '1200 AED'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Product 2 */}
                <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
                  <div className="aspect-square overflow-hidden bg-gradient-to-br from-yellow-50 to-white relative">
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-all duration-300"></div>
                    <div className="absolute top-4 right-4 bg-green-500/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-xs font-semibold text-white">
                        {currentLang === 'ar' ? 'جديد' : 
                         currentLang === 'fr' ? 'Nouveau' : 
                         'New'}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2">
                        <span className="text-sm font-bold text-gray-900">
                          {currentLang === 'ar' ? 'مجموعة كيمياء' : 
                           currentLang === 'fr' ? 'Kit de Chimie' : 
                           'Chemistry Set'}
                        </span>
                      </div>
                    </div>
                    <Image
                      src="/assets/suggest/71nAdBWxtdL._AC_SX425_.jpg"
                      alt="Chemistry Set"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">
                      {currentLang === 'ar' ? 'مجموعة كيمياء آمنة' : 
                       currentLang === 'fr' ? 'Kit de Chimie Sécurisé' : 
                       'Safe Chemistry Set'}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {currentLang === 'ar' ? 'مجموعة تجارب كيميائية آمنة ومثيرة للأطفال' : 
                       currentLang === 'fr' ? 'Kit d\'expériences chimiques sûr et passionnant pour les enfants' : 
                       'Safe and exciting chemistry experiment set for kids'}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-[#A38151]">
                        {currentLang === 'ar' ? '٨٠٠ درهم' : 
                         currentLang === 'fr' ? '800 AED' : 
                         '800 AED'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Product 3 */}
                <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
                  <div className="aspect-square overflow-hidden bg-gradient-to-br from-yellow-50 to-white relative">
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-all duration-300"></div>
                    <div className="absolute top-4 right-4 bg-purple-500/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-xs font-semibold text-white">
                        {currentLang === 'ar' ? 'محدود' : 
                         currentLang === 'fr' ? 'Limité' : 
                         'Limited'}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2">
                        <span className="text-sm font-bold text-gray-900">
                          {currentLang === 'ar' ? 'تلسكوب فلكي' : 
                           currentLang === 'fr' ? 'Télescope Astronomique' : 
                           'Astronomical Telescope'}
                        </span>
                      </div>
                    </div>
                    <Image
                      src="/assets/suggest/81hjNUS9HpL._AC_SX425_.jpg"
                      alt="Astronomical Telescope"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">
                      {currentLang === 'ar' ? 'تلسكوب فلكي محمول' : 
                       currentLang === 'fr' ? 'Télescope Astronomique Portable' : 
                       'Portable Astronomical Telescope'}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {currentLang === 'ar' ? 'تلسكوب محمول لاستكشاف النجوم والكواكب' : 
                       currentLang === 'fr' ? 'Télescope portable pour explorer les étoiles et les planètes' : 
                       'Portable telescope for exploring stars and planets'}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-[#A38151]">
                        {currentLang === 'ar' ? '٦٠٠ درهم' : 
                         currentLang === 'fr' ? '600 AED' : 
                         '600 AED'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
