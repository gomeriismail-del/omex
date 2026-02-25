'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function TermsOfServicePage() {
  const { currentLang } = useLanguage()

  const content = {
    ar: {
      title: 'شروط الخدمة',
      subtitle: 'شروط وأحكام استخدام خدماتنا ومنتجاتنا',
      lastUpdated: 'آخر تحديث: 3 فبراير 2026',
      sections: [
        {
          title: 'قبول الشروط',
          content: 'باستخدام موقعنا الإلكتروني وشراء منتجاتنا، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا لم توافق على هذه الشروط، يرجى عدم استخدام موقعنا أو شراء منتجاتنا.'
        },
        {
          title: 'المنتجات والخدمات',
          content: 'نحن نبيع منتجات تعليمية عالية الجودة للأطفال. جميع المنتجات تخضع للتوفر وقد يتم استبدال المنتجات المكافئة في حالة نفاد المخزون. نسعى جاهدين لضمان دقة وصف المنتجات والصور.'
        },
        {
          title: 'الأسعار والدفع',
          content: 'جميع الأسعار معروضة بالدرهم الإماراتي. نقبل الدفع عند الاستلام (COD) فقط. يجب الدفع نقداً عند استلام المنتج. نحتفظ بالحق في تغيير الأسعار في أي وقت دون إشعار مسبق.'
        },
        {
          title: 'الشحن والتوصيل',
          content: 'نقوم بالشحن إلى جميع أنحاء دولة الإمارات. وقت التوصيل المتوقع هو 2-5 أيام عمل. نحن لسنا مسؤولين عن أي تأخيرات ناتجة عن قوة قاهرة أو مشاكل في الخدمات اللوجستية.'
        },
        {
          title: 'الإرجاع والاستبدال',
          content: 'يمكن إرجاع المنتجات أو استبدالها في غضون 7 أيام من التسليم، بشرط أن تكون المنتجات في حالتها الأصلية وغير مستخدمة. يجب على العميل تحمل تكاليف الشحن للإرجاع.'
        },
        {
          title: 'ملكية الملكية الفكرية',
          content: 'جميع المحتويات على هذا الموقع، بما في ذلك النصوص والصور والشعارات، هي ملكية لشركتنا ومحمية بموجب قوانين حقوق النشر. لا يجوز استخدام أي محتوى دون إذن كتابي منا.'
        },
        {
          title: 'تحديد المسؤولية',
          content: 'نحن لسنا مسؤولين عن أي أضرار مباشرة أو غير مباشرة تنشأ عن استخدام منتجاتنا أو موقعنا. استخدام منتجاتنا يكون على مسؤولية العميل بالكامل.'
        },
        {
          title: 'قانون الحوكمة',
          content: 'تخضع هذه الشروط والأحكام وتفسرها قوانين دولة الإمارات العربية المتحدة. أي نزاع ينشأ عن هذه الشروط سيتم حله في المحاكم الإماراتية.'
        },
        {
          title: 'تعديلات الشروط',
          content: 'نحن نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت. أي تعديلات ستنشر على هذه الصفحة وتصبح سارية المفعول فور نشرها.'
        },
        {
          title: 'اتصل بنا',
          content: 'إذا كان لديك أي أسئلة حول هذه الشروط والأحكام، يرجى الاتصال بنا:'
        }
      ]
    },
    fr: {
      title: 'Conditions de Service',
      subtitle: 'Termes et conditions d\'utilisation de nos services et produits',
      lastUpdated: 'Dernière mise à jour: 3 février 2026',
      sections: [
        {
          title: 'Acceptation des conditions',
          content: 'En utilisant notre site Web et en achetant nos produits, vous acceptez de vous conformer à ces termes et conditions. Si vous n\'acceptez pas ces termes, veuillez ne pas utiliser notre site ni acheter nos produits.'
        },
        {
          title: 'Produits et services',
          content: 'Nous vendons des produits éducatifs de haute qualité pour enfants. Tous les produits sont soumis à disponibilité et des produits équivalents peuvent être remplacés en cas de rupture de stock. Nous nous efforçons d\'assurer l\'exactitude des descriptions et images des produits.'
        },
        {
          title: 'Prix et paiement',
          content: 'Tous les prix sont affichés en Dirhams des Émirats Arabes Unis. Nous n\'acceptons que le paiement à la livraison (COD). Le paiement doit être effectué en espèces lors de la réception du produit. Nous nous réservons le droit de modifier les prix à tout moment sans préavis.'
        },
        {
          title: 'Expédition et livraison',
          content: 'Nous expédions dans tous les Émirats Arabes Unis. Le délai de livraison prévu est de 2-5 jours ouvrables. Nous ne sommes pas responsables des retards dus à la force majeure ou aux problèmes de services logistiques.'
        },
        {
          title: 'Retours et échanges',
          content: 'Les produits peuvent être retournés ou échangés dans les 7 jours suivant la livraison, à condition que les produits soient dans leur état d\'origine et non utilisés. Le client doit supporter les frais d\'expédition pour les retours.'
        },
        {
          title: 'Propriété intellectuelle',
          content: 'Tout le contenu de ce site, y compris les textes, images et logos, est la propriété de notre entreprise et est protégé par les lois sur le droit d\'auteur. Aucun contenu ne peut être utilisé sans notre autorisation écrite.'
        },
        {
          title: 'Limitation de responsabilité',
          content: 'Nous ne sommes pas responsables des dommages directs ou indirects découlant de l\'utilisation de nos produits ou de notre site. L\'utilisation de nos produits relève de la pleine responsabilité du client.'
        },
        {
          title: 'Loi applicable',
          content: 'Ces termes et conditions sont régis et interprétés conformément aux lois des Émirats Arabes Unis. Tout litige découlant de ces termes sera résolu dans les tribunaux des Émirats Arabes Unis.'
        },
        {
          title: 'Modifications des conditions',
          content: 'Nous nous réservons le droit de modifier ces termes et conditions à tout moment. Toute modification sera publiée sur cette page et prendra effet immédiatement après publication.'
        },
        {
          title: 'Contactez-nous',
          content: 'Si vous avez des questions sur ces termes et conditions, veuillez nous contacter:'
        }
      ]
    },
    en: {
      title: 'Terms of Service',
      subtitle: 'Terms and conditions for using our services and products',
      lastUpdated: 'Last updated: February 3, 2026',
      sections: [
        {
          title: 'Acceptance of Terms',
          content: 'By using our website and purchasing our products, you agree to comply with these terms and conditions. If you do not agree to these terms, please do not use our site or purchase our products.'
        },
        {
          title: 'Products and Services',
          content: 'We sell high-quality educational products for children. All products are subject to availability and equivalent products may be substituted in case of stock shortage. We strive to ensure accuracy of product descriptions and images.'
        },
        {
          title: 'Pricing and Payment',
          content: 'All prices are displayed in UAE Dirhams. We only accept cash on delivery (COD). Payment must be made in cash upon receipt of the product. We reserve the right to change prices at any time without prior notice.'
        },
        {
          title: 'Shipping and Delivery',
          content: 'We ship throughout the UAE. Expected delivery time is 2-5 business days. We are not responsible for any delays due to force majeure or logistics service issues.'
        },
        {
          title: 'Returns and Exchanges',
          content: 'Products can be returned or exchanged within 7 days of delivery, provided products are in their original condition and unused. Customer must bear shipping costs for returns.'
        },
        {
          title: 'Intellectual Property',
          content: 'All content on this site, including text, images, and logos, is the property of our company and is protected by copyright laws. No content may be used without our written permission.'
        },
        {
          title: 'Limitation of Liability',
          content: 'We are not liable for any direct or indirect damages arising from the use of our products or our site. Use of our products is entirely at the customer\'s risk.'
        },
        {
          title: 'Governing Law',
          content: 'These terms and conditions are governed by and construed in accordance with the laws of the United Arab Emirates. Any dispute arising from these terms will be resolved in UAE courts.'
        },
        {
          title: 'Modifications to Terms',
          content: 'We reserve the right to modify these terms and conditions at any time. Any modifications will be posted on this page and will become effective immediately upon posting.'
        },
        {
          title: 'Contact Us',
          content: 'If you have any questions about these terms and conditions, please contact us:'
        }
      ]
    }
  }

  const currentContent = content[currentLang as keyof typeof content] || content.en

  return (
    <div className="mt-12 min-h-screen bg-gradient-to-tr from-[#fcb24b] to-yellow-200 py-20">
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
          <p className="text-sm text-gray-500 mt-4">
            {currentContent.lastUpdated}
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12">
          <div className="space-y-8">
            {currentContent.sections.map((section, index) => (
              <div key={index} className="border-b border-gray-200 last:border-0 pb-8 last:pb-0">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {section.title}
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Information */}
          <div className="mt-12 p-6 bg-gradient-to-r from-yellow-50 to-yellow-100/50 rounded-xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {currentContent.sections[currentContent.sections.length - 1].title}
            </h3>
            <div className="space-y-2">
              <p className="text-gray-700">
                <strong>Email:</strong> tnshopping16@gmail.com
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> +971 55 840 6027
              </p>
              <p className="text-gray-700">
                <strong>Address:</strong> UAE
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
