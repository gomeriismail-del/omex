interface DeliveryOrderData {
  orderId: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  address: string
  city: string
  products: Array<{
    id: string
    name: string
    quantity: number
    price: number
    color?: string
  }>
  totalAmount: number
  status: string
  createdAt: string
}

interface DeliveryResponse {
  success: boolean
  deliveryId?: string
  trackingNumber?: string
  estimatedDelivery?: string
  message?: string
  error?: string
  details?: any
}

class DeliveryService {
  private readonly apiUrl = 'https://api.codtoop.com/api/general-api/register'
  private readonly token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MTUyODRkZDljNTQ3Y2Y0ZTU5YjQ5NiIsInJvbGUiOlszMDBdLCJzdGF0dXMiOjkwLCJpYXQiOjE3Njk5MjgyNDB9.bUyo1LAvWEDERzO1c4kKn6VloPerwecJ13uERWvUPDM'

  private formatPhoneNumber(phone: string): string {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '')
    
    // If already has country code, validate and return
    if (cleaned.startsWith('971') && cleaned.length === 12) {
      return '+971' + cleaned.substring(3) // UAE format: +971XXXXXXXXX
    }
    
    // Handle different formats for UAE numbers
    if (cleaned.length === 9) {
      // UAE mobile format: XXXXXXXXX → +971XXXXXXXXX
      return '+971' + cleaned
    }
    if (cleaned.length === 10 && cleaned.startsWith('0')) {
      // UAE mobile format: 0XXXXXXXXX → +971XXXXXXXXX
      return '+971' + cleaned.substring(1)
    }
    
    // Default fallback - assume UAE if no match
    return '+971' + (cleaned.length > 9 ? cleaned.substring(cleaned.length - 9) : cleaned)
  }

  async sendOrderToDelivery(orderData: DeliveryOrderData, retryCount: number = 3): Promise<DeliveryResponse> {
    for (let attempt = 1; attempt <= retryCount; attempt++) {
      try {
        console.log(`🚚 Sending order to delivery agency (attempt ${attempt}/${retryCount}):`, orderData.orderId)

        // Use the exact format from the CODTOOP documentation
        const formattedPhone = this.formatPhoneNumber(orderData.customerPhone || '+971551234567')
        
        // Detect country from phone number
        let country = 'DZ' // Default Algeria
        if (formattedPhone.startsWith('+971')) {
          country = 'AE' // UAE
        } else if (formattedPhone.startsWith('+966')) {
          country = 'SA' // Saudi Arabia
        }
        
        const payload = {
          line_items: [{
            sku: orderData.products[0]?.id || 'CTNSPY68EC',
            quantity: orderData.products[0]?.quantity || 1
          }],
          shipping: {
            first_name: orderData.customerName.split(' ')[0] || 'Ahmed',
            last_name: orderData.customerName.split(' ').slice(1).join(' ') || 'Mohammed',
            phone: formattedPhone,
            city: orderData.city || 'Dubai',
            state: orderData.city || 'Dubai',
            address_1: orderData.address || '123 Main Street',
            address_2: '',
            country: country
          },
          total: orderData.totalAmount
        }

        console.log('📦 Delivery payload being sent:', JSON.stringify(payload, null, 2))
        console.log('⚠️ Note: If product shows "No stocks available" in CODTOOP, order may not appear in dashboard')
        console.log('📋 Order details sent:')
        console.log(`   - SKU: ${payload.line_items[0].sku}`)
        console.log(`   - Customer: ${payload.shipping.first_name} ${payload.shipping.last_name}`)
        console.log(`   - Phone: ${payload.shipping.phone}`)
        console.log(`   - City: ${payload.shipping.city}`)
        console.log(`   - Total: ${payload.total}`)
        console.log(`   - Order ID: ${orderData.orderId}`)

        const response = await fetch(`${this.apiUrl}?token=${this.token}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(10000)
        })

        console.log('📡 Delivery agency response status:', response.status)

        const responseText = await response.text()
        console.log('📄 Raw delivery agency response:', responseText)

        let responseData
        try {
          responseData = JSON.parse(responseText)
        } catch (parseError) {
          console.error('❌ Failed to parse delivery agency response as JSON:', parseError)
          responseData = { rawResponse: responseText }
        }

        console.log('📊 Parsed delivery agency response:', responseData)

        // If server error, retry
        if (response.status >= 500 && attempt < retryCount) {
          console.log(`⚠️ Server error (${response.status}), retrying in 2 seconds...`)
          await new Promise(resolve => setTimeout(resolve, 2000))
          continue
        }

        if (response.ok) {
          console.log('✅ Order sent to delivery agency successfully!')
          console.log('📋 Order details sent:')
          console.log(`   - SKU: ${payload.line_items[0].sku}`)
          console.log(`   - Customer: ${payload.shipping.first_name} ${payload.shipping.last_name}`)
          console.log(`   - Phone: ${payload.shipping.phone}`)
          console.log(`   - City: ${payload.shipping.city}`)
          console.log(`   - Total: ${payload.total}`)
          console.log(`   - Order ID: ${orderData.orderId}`)
          
          return {
            success: true,
            deliveryId: responseData.delivery_id || responseData.id || orderData.orderId,
            trackingNumber: responseData.tracking_number || 'Processing',
            estimatedDelivery: responseData.estimated_delivery || 'Will be assigned',
            message: responseData.message || 'Order sent to delivery agency successfully'
          }
        } else {
          console.error('❌ Delivery agency error:', responseData)
          return {
            success: false,
            error: responseData.error || responseData.message || 'Failed to send order to delivery agency',
            message: responseData.message || `Delivery agency error (${response.status})`,
            details: responseData
          }
        }

      } catch (error: any) {
        console.error(`💥 Delivery service error (attempt ${attempt}/${retryCount}):`, error)
        
        if (attempt < retryCount) {
          console.log(`⚠️ Network error, retrying in 2 seconds...`)
          await new Promise(resolve => setTimeout(resolve, 2000))
          continue
        }
        
        return {
          success: false,
          error: error.message || 'Network error while sending to delivery agency',
          message: 'Failed to connect to delivery agency after multiple attempts'
        }
      }
    }

    return {
      success: false,
      error: 'Unknown error',
      message: 'Failed to send order to delivery agency'
    }
  }

  async updateDeliveryStatus(orderId: string, status: string, trackingNumber?: string): Promise<DeliveryResponse> {
    try {
      console.log('🔄 Updating delivery status:', orderId, status)

      const payload = {
        order_id: orderId,
        delivery_status: status,
        tracking_number: trackingNumber,
        update_timestamp: new Date().toISOString()
      }

      const response = await fetch(`${this.apiUrl}/update?token=${this.token}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify(payload)
      })

      const responseData = await response.json()
      console.log('📊 Delivery status update response:', responseData)

      if (response.ok) {
        return {
          success: true,
          message: 'Delivery status updated successfully'
        }
      } else {
        return {
          success: false,
          error: responseData.error || 'Failed to update delivery status'
        }
      }

    } catch (error: any) {
      console.error('💥 Delivery status update error:', error)
      return {
        success: false,
        error: error.message || 'Network error while updating delivery status'
      }
    }
  }

  // Helper function to transform order data from your system to delivery format
  transformOrderData(order: any): DeliveryOrderData {
    return {
      orderId: order.id || order._id,
      customerName: order.customerName || order.name || 'Unknown Customer',
      customerEmail: order.customerEmail || order.email || '',
      customerPhone: order.customerPhone || order.phone || '',
      address: order.address || order.customerAddress || '',
      city: order.city || order.customerCity || '',
      products: order.items ? order.items.map((item: any) => ({
        name: item.name || item.nameOfProduct || 'Unknown Product',
        quantity: item.quantity || 1,
        price: item.price || item.priceOfProduct || 0,
        color: item.color || ''
      })) : [],
      totalAmount: order.total || order.totalAmount || 0,
      status: order.status || 'pending',
      createdAt: order.createdAt || order.date || new Date().toISOString()
    }
  }
}

export const deliveryService = new DeliveryService()
export type { DeliveryOrderData, DeliveryResponse }
