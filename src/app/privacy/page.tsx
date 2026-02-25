'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function PrivacyPolicyPage() {
  const { currentLang } = useLanguage()

  const content = {
    ar: {
      title: 'سياسة الخصوصية',
      subtitle: 'نحن نقدر خصوصيتك ونلتزم بحماية بياناتك',
      lastUpdated: 'آخر تحديث: 3 فبراير 2026',
      sections: [
        {
          title: 'المعلومات التي نجمعها',
          content: 'نحن نجمع المعلومات التي تقدمها طواعية عند التسجيل أو تقديم طلب، بما في ذلك الاسم ورقم الهاتف والعنوان وبريد إلكتروني. كما نجمع معلومات فنية مثل عنوان IP ونوع المتصفح وبيانات الاستخدام لتحسين خدماتنا.'
        },
        {
          title: 'كيفية استخدام معلوماتك',
          content: 'نستخدم معلوماتك لمعالجة الطلبات وتقديم خدمة العملاء وتحسين تجربة التسوق وإرسال معلومات التسويق (بموافقتك) وتحليل استخدام الموقع لتحسين خدماتنا.'
        },
        {
          title: 'مشاركة المعلومات',
          content: 'نحن لا نبيع أو نؤجر معلوماتك الشخصية لجهات خارجية. نشارك معلوماتك فقط مع شركات الشحن لتوصيل طلباتك ومع السلطات عند الضرورة القانونية.'
        },
        {
          title: 'حماية البيانات',
          content: 'نحن نستخدم تدابير أمنية معقولة لحماية بياناتك من الوصول غير المصرح به أو التعديل أو التدمير. ومع ذلك، لا يمكننا ضمان أمان مطلق على الإنترنت.'
        },
        {
          title: 'ملفات تعريف الارتباط (Cookies)',
          content: 'نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقعنا. يمكنك تعطيل ملفات تعريف الارتباط في إعدادات المتصفح، ولكن قد يؤثر ذلك على بعض وظائف الموقع.'
        },
        {
          title: 'حقوقك',
          content: 'لديك الحق في الوصول إلى بياناتك وتصحيحها وحذفها. يمكنك طلب هذه الحقوق عن طريق الاتصال بنا باستخدام المعلومات المقدمة أدناه.'
        },
        {
          title: 'التغييرات على هذه السياسة',
          content: 'قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنلزمك بأي تغييرات مهمة عن طريق نشر السياسة المحدثة على هذا الموقع.'
        },
        {
          title: 'اتصل بنا',
          content: 'إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا:'
        }
      ]
    },
    fr: {
      title: 'Politique de Confidentialité',
      subtitle: 'Nous apprécions votre vie privée et nous nous engageons à protéger vos données',
      lastUpdated: 'Dernière mise à jour: 3 février 2026',
      sections: [
        {
          title: 'Informations que nous collectons',
          content: 'Nous collectons les informations que vous fournissez volontairement lors de l\'inscription ou de la passation d\'une commande, y compris le nom, le numéro de téléphone, l\'adresse et l\'e-mail. Nous collectons également des informations techniques telles que l\'adresse IP, le type de navigateur et les données d\'utilisation pour améliorer nos services.'
        },
        {
          title: 'Comment nous utilisons vos informations',
          content: 'Nous utilisons vos informations pour traiter les commandes, fournir le service client, améliorer l\'expérience d\'achat, envoyer des informations marketing (avec votre consentement) et analyser l\'utilisation du site pour améliorer nos services.'
        },
        {
          title: 'Partage d\'informations',
          content: 'Nous ne vendons ni ne louons vos informations personnelles à des tiers. Nous ne partageons vos informations qu\'avec les entreprises de livraison pour livrer vos commandes et avec les autorités lorsque cela est requis par la loi.'
        },
        {
          title: 'Protection des données',
          content: 'Nous utilisons des mesures de sécurité raisonnables pour protéger vos données contre l\'accès, la modification ou la destruction non autorisés. Cependant, nous ne pouvons garantir une sécurité absolue sur Internet.'
        },
        {
          title: 'Cookies',
          content: 'Nous utilisons des cookies pour améliorer votre expérience sur notre site. Vous pouvez désactiver les cookies dans les paramètres de votre navigateur, mais cela peut affecter certaines fonctionnalités du site.'
        },
        {
          title: 'Vos droits',
          content: 'Vous avez le droit d\'accéder à vos données, de les corriger et de les supprimer. Vous pouvez demander ces droits en nous contactant avec les informations fournies ci-dessous.'
        },
        {
          title: 'Modifications de cette politique',
          content: 'Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Nous vous informerons de tout changement important en publiant la politique mise à jour sur ce site.'
        },
        {
          title: 'Contactez-nous',
          content: 'Si vous avez des questions sur cette politique de confidentialité, veuillez nous contacter:'
        }
      ]
    },
    en: {
      title: 'Privacy Policy',
      subtitle: 'We value your privacy and are committed to protecting your data',
      lastUpdated: 'Last updated: February 3, 2026',
      sections: [
        {
          title: 'Information We Collect',
          content: 'We collect information you voluntarily provide when registering or placing an order, including name, phone number, address, and email. We also collect technical information such as IP address, browser type, and usage data to improve our services.'
        },
        {
          title: 'How We Use Your Information',
          content: 'We use your information to process orders, provide customer service, improve shopping experience, send marketing information (with your consent), and analyze site usage to improve our services.'
        },
        {
          title: 'Information Sharing',
          content: 'We do not sell or rent your personal information to third parties. We only share your information with delivery companies to deliver your orders and with authorities when required by law.'
        },
        {
          title: 'Data Protection',
          content: 'We use reasonable security measures to protect your data from unauthorized access, alteration, or destruction. However, we cannot guarantee absolute security on the internet.'
        },
        {
          title: 'Cookies',
          content: 'We use cookies to enhance your experience on our site. You can disable cookies in your browser settings, but this may affect some site functionality.'
        },
        {
          title: 'Your Rights',
          content: 'You have the right to access, correct, and delete your data. You can request these rights by contacting us using the information provided below.'
        },
        {
          title: 'Changes to This Policy',
          content: 'We may update this privacy policy from time to time. We will notify you of any significant changes by posting the updated policy on this site.'
        },
        {
          title: 'Contact Us',
          content: 'If you have any questions about this privacy policy, please contact us:'
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
