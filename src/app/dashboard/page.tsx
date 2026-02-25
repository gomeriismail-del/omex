'use client'

import { useState, useEffect } from 'react'
import { 
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Package,
  Calendar,
  Search,
  Filter
} from 'lucide-react'
import DashboardLayout from '@/components/DashboardLayout'
import { useLanguage } from '@/contexts/LanguageContext'
import { IncompleteOrder, Order, SupportedLanguage, translations } from '@/types/dashboards'
import ConfirmModal from '@/components/ConfirmModal'



export default function Dashboard() {
  const { currentLang } = useLanguage()
  const [orders, setOrders] = useState<Order[]>([])
  const [incompleteOrders, setIncompleteOrders] = useState<IncompleteOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [incompleteLoading, setIncompleteLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [activeTab, setActiveTab] = useState<'orders' | 'incomplete'>('orders')
  
  // Modal states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteType, setDeleteType] = useState<'order' | 'incomplete'>('order')

  const t = (key: string) => translations[currentLang as SupportedLanguage]?.[key] || key

  // Status change and delete functions
  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`https://dmtart.pro/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      })
      
      if (response.ok) {
        // Update local state
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        )
        console.log(`Order ${orderId} status updated to ${newStatus}`)
      } else {
        console.error('Failed to update order status')
      }
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  const deleteOrder = async (orderId: string) => {
    setOrderToDelete(orderId)
    setDeleteType('order')
    setDeleteModalOpen(true)
  }

  const deleteIncompleteOrder = async (orderId: string) => {
    setOrderToDelete(orderId)
    setDeleteType('incomplete')
    setDeleteModalOpen(true)
  }

  // Handle actual deletion after modal confirmation
  const handleDeleteConfirm = async () => {
    if (!orderToDelete) return
    
    setIsDeleting(true)
    
    try {
      const endpoint = deleteType === 'order' 
        ? `https://dmtart.pro/api/orders/${orderToDelete}`
        : `https://dmtart.pro/api/incomplete-orders/${orderToDelete}`
      
      console.log(`🗑️ Attempting to delete ${deleteType}:`, orderToDelete)
      
      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      console.log('📡 Delete response status:', response.status)
      
      if (response.ok) {
        // Remove from local state
        if (deleteType === 'order') {
          setOrders(prevOrders => prevOrders.filter(order => order.id !== orderToDelete))
          console.log(`✅ Order ${orderToDelete} deleted successfully`)
        } else {
          setIncompleteOrders(prevOrders => prevOrders.filter(order => 
            (order.id !== orderToDelete) && (order._id !== orderToDelete)
          ))
          console.log(`✅ Incomplete order ${orderToDelete} deleted successfully`)
        }
        
        // Close modal
        setDeleteModalOpen(false)
        setOrderToDelete(null)
      } else {
        const errorText = await response.text()
        console.error(`❌ Failed to delete ${deleteType}:`, response.status, errorText)
        
        // Show error message
        alert(
          currentLang === 'ar' 
            ? 'فشل في حذف الطلب' 
            : currentLang === 'fr' 
            ? 'Échec de la suppression'
            : 'Failed to delete item'
        )
      }
    } catch (error) {
      console.error(`💥 Error deleting ${deleteType}:`, error)
      
      // Show error message
      alert(
        currentLang === 'ar' 
          ? 'حدث خطأ أثناء حذف الطلب' 
          : currentLang === 'fr' 
          ? 'Une erreur s\'est produite'
          : 'Error occurred while deleting'
      )
    } finally {
      setIsDeleting(false)
    }
  }

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://dmtart.pro/api/orders')
        if (!response.ok) throw new Error('Failed to fetch orders')
        const data = await response.json()
        
        if (!Array.isArray(data)) {
          console.error('API returned non-array data:', data)
          setOrders([])
          setLoading(false)
          return
        }
        
        const transformedOrders = data.map((order: any) => ({
          id: order._id || `#${order._id?.slice(-6)}`,
          customerName: order.nameClient || 'Unknown Customer',
          customerPhone: order.phone || 'N/A',
          customerEmail: `${order.address || 'No address'}, ${order.city || 'No city'}`,
          date: new Date(order.createdAt).toLocaleDateString(),
          total: order.priceOfProduct * order.quantity,
          status: order.status,
          items: [{
            id: order._id,
            name: order.nameOfProduct,
            quantity: order.quantity,
            price: order.priceOfProduct,
            color: order.color,
            address: order.address,
            city: order.city
          }]
        }))
        
        setOrders(transformedOrders)
      } catch (error) {
        console.error('Error fetching orders:', error)
        setOrders([])
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  // Fetch incomplete orders from API
  useEffect(() => {
    const fetchIncompleteOrders = async () => {
      try {
        const response = await fetch('https://dmtart.pro/api/incomplete-orders')
        if (!response.ok) {
          // If endpoint doesn't exist, set empty array and stop loading
          setIncompleteOrders([])
          setIncompleteLoading(false)
          return
        }
        const data = await response.json()
        
        if (!Array.isArray(data)) {
          console.error('API returned non-array data for incomplete orders:', data)
          setIncompleteOrders([])
          setIncompleteLoading(false)
          return
        }
        
        setIncompleteOrders(data)
      } catch (error) {
        console.error('Error fetching incomplete orders:', error)
        setIncompleteOrders([])
      } finally {
        setIncompleteLoading(false)
      }
    }

    fetchIncompleteOrders()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-purple-100 text-purple-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredOrders = orders.filter(order => {
    const orderId = order?.id || ''
    const customerName = order?.customerName || ''
    const customerEmail = order?.customerEmail || ''
    
    const matchesSearch = orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || order?.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const filteredIncompleteOrders = incompleteOrders.filter(order => {
    const customerName = order?.name || order?.nameClient || ''
    const phone = order?.phone || ''
    const address = order?.address || ''
    
    const matchesSearch = customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         address.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const stats = {
    totalRevenue: orders.reduce((sum, order) => sum + (order?.total || 0), 0),
    totalOrders: orders.length,
    averageOrderValue: orders.length > 0 ? orders.reduce((sum, order) => sum + (order?.total || 0), 0) / orders.length : 0,
    pendingOrders: orders.filter(order => order?.status === 'pending').length
  }

  const incompleteStats = {
    totalIncomplete: incompleteOrders.length,
    recoveryRate: orders.length > 0 ? ((orders.length / (orders.length + incompleteOrders.length)) * 100).toFixed(1) : '0.0',
    pageExitCount: incompleteOrders.filter(order => order?.exitReason === 'page_exit').length,
    formAbandonCount: incompleteOrders.filter(order => order?.exitReason !== 'page_exit').length
  }

  return (
    <DashboardLayout currentLang={currentLang || 'fr'}>
      <div className="p-3 sm:p-4 lg:p-6 overflow-x-hidden mt-10">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {activeTab === 'orders' ? t('orders') : t('incompleteOrders')}
          </h1>
          <p className="text-gray-600">
            {activeTab === 'orders' ? t('ordersDescription') : t('incompleteOrdersDescription')}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('orders')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'orders'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('ordersTab')}
              </button>
              <button
                onClick={() => setActiveTab('incomplete')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'incomplete'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('incompleteTab')} ({incompleteOrders.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Stats Cards */}
        {activeTab === 'orders' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm border p-4">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-8 h-8 text-green-500" />
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">AED {stats.totalRevenue.toFixed(2)}</h3>
              <p className="text-sm text-gray-600">{t('totalRevenue')}</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border p-4">
              <div className="flex items-center justify-between mb-2">
                <ShoppingCart className="w-8 h-8 text-blue-500" />
                <TrendingUp className="w-4 h-4 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{stats.totalOrders}</h3>
              <p className="text-sm text-gray-600">{t('totalOrders')}</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border p-4">
              <div className="flex items-center justify-between mb-2">
                <Package className="w-8 h-8 text-purple-500" />
                <TrendingUp className="w-4 h-4 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">AED {stats.averageOrderValue.toFixed(2)}</h3>
              <p className="text-sm text-gray-600">{t('averageOrderValue')}</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border p-4">
              <div className="flex items-center justify-between mb-2">
                <Calendar className="w-8 h-8 text-orange-500" />
                <TrendingUp className="w-4 h-4 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{stats.pendingOrders}</h3>
              <p className="text-sm text-gray-600">{t('pendingOrders')}</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm border p-4">
              <div className="flex items-center justify-between mb-2">
                <Package className="w-8 h-8 text-orange-500" />
                <TrendingUp className="w-4 h-4 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{incompleteStats.totalIncomplete}</h3>
              <p className="text-sm text-gray-600">{t('totalIncomplete')}</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border p-4">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-8 h-8 text-green-500" />
                <DollarSign className="w-4 h-4 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{incompleteStats.recoveryRate}%</h3>
              <p className="text-sm text-gray-600">{t('recoveryRate')}</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border p-4">
              <div className="flex items-center justify-between mb-2">
                <Calendar className="w-8 h-8 text-blue-500" />
                <TrendingUp className="w-4 h-4 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{incompleteStats.pageExitCount}</h3>
              <p className="text-sm text-gray-600">{t('pageExit')}</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border p-4">
              <div className="flex items-center justify-between mb-2">
                <ShoppingCart className="w-8 h-8 text-purple-500" />
                <TrendingUp className="w-4 h-4 text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{incompleteStats.formAbandonCount}</h3>
              <p className="text-sm text-gray-600">{t('formAbandon')}</p>
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('searchOrders')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">{t('allOrders')}</option>
              <option value="pending">{t('pending')}</option>
              <option value="processing">{t('processing')}</option>
              <option value="shipped">{t('shipped')}</option>
              <option value="delivered">{t('delivered')}</option>
              <option value="cancelled">{t('cancelled')}</option>
            </select>
          </div>
        </div>

        {/* Orders/Incomplete Orders Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {activeTab === 'orders' ? (
            <>
              {loading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="mt-4 text-gray-600">{t('loading')}</p>
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="p-8 text-center">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">{t('noOrdersFound')}</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border border-black/50">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black/20">
                          {t('clientName')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black/20">
                          {t('phone')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black/20">
                          {t('product')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black/20">
                          {t('address')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black/20">
                          {t('city')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black/20">
                          {t('color')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black/20">
                          {t('quantity')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black/20">
                          {t('price')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black/20">
                          {t('date')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black/20">
                          {t('status')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black/20">
                          {t('actions')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredOrders.map((order, index) => (
                        <tr key={order?.id || index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-black/20">
                            {order?.customerName || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-black/20">
                            {order?.customerPhone || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-black/20">
                            {order?.items?.[0]?.name || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-black/20">
                            {order?.items?.[0]?.address || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-black/20">
                            {order?.items?.[0]?.city || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-black/20">
                            {order?.items?.[0]?.color || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-black/20">
                            {order?.items?.[0]?.quantity || 0}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-black/20">
                            AED {(order?.items?.[0]?.price || 0).toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-black/20">
                            {order?.date || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap border border-black/20">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order?.status || '')}`}>
                              {t(order?.status || 'unknown')}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap border border-black/20">
                            <div className="flex gap-2">
                              <select
                                value={order?.status}
                                onChange={(e) => updateOrderStatus(order?.id, e.target.value)}
                                className="px-2 py-1 text-xs border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="pending">{t('pending')}</option>
                                <option value="processing">{t('processing')}</option>
                                <option value="shipped">{t('shipped')}</option>
                                <option value="delivered">{t('delivered')}</option>
                                <option value="cancelled">{t('cancelled')}</option>
                              </select>
                              <button
                                onClick={() => deleteOrder(order?.id)}
                                className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                              >
                                {t('delete')}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          ) : (
            <>
              {incompleteLoading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="mt-4 text-gray-600">{t('loading')}</p>
                </div>
              ) : filteredIncompleteOrders.length === 0 ? (
                <div className="p-8 text-center">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">{t('noIncompleteOrders')}</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border border-black/50">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black/20">
                          {t('clientName')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black/20">
                          {t('phone')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black/20">
                          {t('address')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black/20">
                          {t('city')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black/20">
                          {t('color')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black/20">
                          {t('quantity')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black/20">
                          {t('exitReason')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black/20">
                          {t('date')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black/20">
                          {t('actions')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredIncompleteOrders.map((order, index) => (
                        <tr key={order?.id || index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-black/20">
                            {order?.name || order?.nameClient || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-black/20">
                            {order?.phone || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-black/20">
                            {order?.address || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-black/20">
                            {order?.city || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-black/20">
                            {order?.selectedColor || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-black/20">
                            {order?.quantity || 0}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap border border-black/20">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              order?.exitReason === 'page_exit' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-orange-100 text-orange-800'
                            }`}>
                              {order?.exitReason === 'page_exit' ? t('pageExit') : t('formAbandon')}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-black/20">
                            {order?.timestamp ? new Date(order.timestamp).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap border border-black/20">
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                              const orderId = order?.id || order?._id;
                              if (orderId) deleteIncompleteOrder(orderId);
                            }}
                                className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                              >
                                {t('delete')}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      
      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setOrderToDelete(null)
        }}
        onConfirm={handleDeleteConfirm}
        title={
          deleteType === 'order'
            ? (currentLang === 'ar' ? 'حذف الطلب' : currentLang === 'fr' ? 'Supprimer la commande' : 'Delete Order')
            : (currentLang === 'ar' ? 'حذف الطلب غير مكتمل' : currentLang === 'fr' ? 'Supprimer la commande incomplète' : 'Delete Incomplete Order')
        }
        message={
          deleteType === 'order'
            ? (currentLang === 'ar' ? 'هل أنت متأكد من حذف هذا الطلب؟' : currentLang === 'fr' ? 'Êtes-vous sûr de vouloir supprimer cette commande ?' : 'Are you sure you want to delete this order?')
            : (currentLang === 'ar' ? 'هل أنت متأكد من حذف هذا الطلب غير مكتمل؟' : currentLang === 'fr' ? 'Êtes-vous sûr de vouloir supprimer cette commande incomplète ?' : 'Are you sure you want to delete this incomplete order?')
        }
        confirmText={
          currentLang === 'ar' ? 'حذف' : currentLang === 'fr' ? 'Supprimer' : 'Delete'
        }
        cancelText={
          currentLang === 'ar' ? 'إلغاء' : currentLang === 'fr' ? 'Annuler' : 'Cancel'
        }
        isLoading={isDeleting}
      />
      </div>
    </DashboardLayout>
  )
}
