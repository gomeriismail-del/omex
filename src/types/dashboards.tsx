export type SupportedLanguage = 'en' | 'fr' | 'ar'

interface Translations {
  en: {
    [key: string]: string
  }
  fr: {
    [key: string]: string
  }
  ar: {
    [key: string]: string
  }
}

 export const translations: Translations = {
  en: {
    dashboard: 'Dashboard',
    orders: 'Orders',
    ordersDescription: 'Manage all customer orders',
    totalRevenue: 'Total Revenue',
    totalOrders: 'Total Orders',
    averageOrderValue: 'Average Order Value',
    pendingOrders: 'Pending Orders',
    searchOrders: 'Search orders...',
    filter: 'Filter',
    allOrders: 'All Orders',
    pending: 'Pending',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    clientName: 'Client Name',
    phone: 'Phone',
    product: 'Product',
    address: 'Address',
    city: 'City',
    color: 'Color',
    quantity: 'Quantity',
    price: 'Price',
    date: 'Date',
    total: 'Total',
    status: 'Status',
    actions: 'Actions',
    delete: 'Delete',
    welcomeBack: 'Welcome back',
    lastLogin: 'Last login',
    loading: 'Loading...',
    noOrdersFound: 'No orders found',
    incompleteOrders: 'Incomplete Orders',
    incompleteOrdersDescription: 'View abandoned customer orders',
    totalIncomplete: 'Total Incomplete',
    recoveryRate: 'Recovery Rate',
    exitReason: 'Exit Reason',
    pageExit: 'Page Exit',
    formAbandon: 'Form Abandon',
    userAgent: 'User Agent',
    noIncompleteOrders: 'No incomplete orders found',
    ordersTab: 'Orders',
    incompleteTab: 'Incomplete'
  },
  fr: {
    dashboard: 'Tableau de bord',
    orders: 'Commandes',
    ordersDescription: 'Gérer toutes les commandes des clients',
    totalRevenue: 'Revenu total',
    totalOrders: 'Total des commandes',
    averageOrderValue: 'Valeur moyenne des commandes',
    pendingOrders: 'Commandes en attente',
    searchOrders: 'Rechercher des commandes...',
    filter: 'Filtrer',
    allOrders: 'Toutes les commandes',
    pending: 'En attente',
    processing: 'En cours de traitement',
    shipped: 'Expédié',
    delivered: 'Livré',
    cancelled: 'Annulé',
    clientName: 'Nom du client',
    phone: 'Téléphone',
    product: 'Produit',
    address: 'Adresse',
    city: 'Ville',
    color: 'Couleur',
    quantity: 'Quantité',
    price: 'Prix',
    date: 'Date',
    total: 'Total',
    status: 'Statut',
    actions: 'Actions',
    delete: 'Supprimer',
    welcomeBack: 'Bon retour',
    lastLogin: 'Dernière connexion',
    loading: 'Chargement...',
    noOrdersFound: 'Aucune commande trouvée',
    incompleteOrders: 'Commandes incomplètes',
    incompleteOrdersDescription: 'Voir les commandes abandonnées des clients',
    totalIncomplete: 'Total incomplet',
    recoveryRate: 'Taux de récupération',
    exitReason: 'Raison de sortie',
    pageExit: 'Sortie de page',
    formAbandon: 'Abandon de formulaire',
    userAgent: 'Agent utilisateur',
    noIncompleteOrders: 'Aucune commande incomplète trouvée',
    ordersTab: 'Commandes',
    incompleteTab: 'Incomplet'
  },
  ar: {
    dashboard: 'لوحة التحكم',
    orders: 'الطلبات',
    ordersDescription: 'إدارة جميع طلبات العملاء',
    totalRevenue: 'إجمالي الإيرادات',
    totalOrders: 'إجمالي الطلبات',
    averageOrderValue: 'متوسط قيمة الطلب',
    pendingOrders: 'الطلبات المعلقة',
    searchOrders: 'البحث عن الطلبات...',
    filter: 'تصفية',
    allOrders: 'جميع الطلبات',
    pending: 'في الانتظار',
    processing: 'قيد المعالجة',
    shipped: 'تم الشحن',
    delivered: 'تم التسليم',
    cancelled: 'ملغي',
    clientName: 'اسم العميل',
    phone: 'الهاتف',
    product: 'المنتج',
    address: 'العنوان',
    city: 'المدينة',
    color: 'اللون',
    quantity: 'الكمية',
    price: 'السعر',
    date: 'التاريخ',
    total: 'الإجمالي',
    status: 'الحالة',
    actions: 'الإجراءات',
    delete: 'حذف',
    welcomeBack: 'مرحباً بعودتك',
    lastLogin: 'آخر تسجيل دخول',
    loading: 'جاري التحميل...',
    noOrdersFound: 'لم يتم العثور على طلبات',
    incompleteOrders: 'الطلبات غير مكتملة',
    incompleteOrdersDescription: 'عرض طلبات العملاء المهجورة',
    totalIncomplete: 'إجمالي غير مكتمل',
    recoveryRate: 'معدل الاسترداد',
    exitReason: 'سبب الخروج',
    pageExit: 'خروج من الصفحة',
    formAbandon: 'ترك النموذج',
    userAgent: 'وكيل المستخدم',
    noIncompleteOrders: 'لم يتم العثور على طلبات غير مكتملة',
    ordersTab: 'الطلبات',
    incompleteTab: 'غير مكتمل'
  }
}

 export interface Order {
  id: string
  customerName: string
  customerPhone: string
  customerEmail: string
  date: string
  total: number
  status: string
  items: {
    id: string
    name: string
    quantity: number
    price: number
    color?: string
    address?: string
    city?: string
  }[]
}

 export interface IncompleteOrder {
  _id?: string
  id?: string
  name: string
  nameClient: string
  phone: string
  address: string
  city: string
  notes: string
  selectedColor: string
  selectedPackage: string
  quantity: number
  timestamp: string
  exitReason: string
  userAgent: string
  page: string
}
