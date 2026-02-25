interface FacebookConversionEvent {
  event_name: string
  event_time: number
  action_source: string
  event_source_url: string
  user_data: {
    client_user_agent?: string
    client_ip_address?: string
    fbp?: string
    fbc?: string
    phone?: string
    email?: string
    external_id?: string
  }
  custom_data?: {
    currency?: string
    value?: number
    content_name?: string
    content_ids?: string[]
    content_type?: string
  }
  event_id: string
  test_event_code?: string // Add test event code
}

class FacebookConversionsAPI {
  private readonly pixelId: string
  private readonly accessToken: string
  private readonly apiUrl: string

  constructor() {
    this.pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '1376103097326658'
    this.accessToken = process.env.FB_ACCESS_TOKEN || 'EAAfgQsITBkkBQlP6H8ZAO8yqoxGIy78V9AgPZBNGczoOME18DnJa3BIRK5iIrD8veJDvonpe6xRi2ngHZABmqyWheAawe6R5thbjQ1KX27z5SXnHQR4BiOBaLgLCG4Wb7qI8CuLEWc51pfstjSJ5L3jvMfZAPjm7tGHvnzv2jWnu5Q55HjQeuipZB7SjGoAZDZD'
    this.apiUrl = `https://graph.facebook.com/v18.0/${this.pixelId}/events`
  }

  private getFbpCookie(): string | undefined {
    if (typeof window === 'undefined') return undefined
    
    const cookies = document.cookie.split(';')
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=')
      if (name === '_fbp') {
        return value
      }
    }
    return undefined
  }

  private getFbcCookie(): string | undefined {
    if (typeof window === 'undefined') return undefined
    
    const cookies = document.cookie.split(';')
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=')
      if (name === '_fbc') {
        return value
      }
    }
    return undefined
  }

  private getClientIPAddress(): string | undefined {
    // In production, you'd get this from your server
    // For now, we'll send undefined as it's optional
    return undefined
  }

  private getClientUserAgent(): string | undefined {
    if (typeof window === 'undefined') return undefined
    return navigator.userAgent
  }

  private generateEventId(): string {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private async hashData(data: string): Promise<string> {
    const encoder = new TextEncoder()
    const dataBuffer = encoder.encode(data)
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  }

  private formatPhoneNumber(phone: string): string {
    // Remove all non-digit characters
    return phone.replace(/\D/g, '')
  }

  async sendInitiateCheckout(orderData: {
    customerName: string
    customerPhone: string
    customerEmail?: string
    products: Array<{
      id: string
      name: string
      quantity: number
      price: number
    }>
    totalAmount: number
    currency?: string
  }): Promise<boolean> {
    try {
      const eventData: FacebookConversionEvent = {
        event_name: 'InitiateCheckout',
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: window.location.href,
        user_data: {
          client_user_agent: this.getClientUserAgent(),
          client_ip_address: this.getClientIPAddress(),
          fbp: this.getFbpCookie(),
          fbc: this.getFbcCookie(),
          phone: await this.hashData(this.formatPhoneNumber(`+971${orderData.customerPhone}`)), // Hash phone number with UAE prefix
          external_id: await this.hashData(`${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
        },
        custom_data: {
          currency: orderData.currency || 'AED',
          value: orderData.totalAmount,
          content_name: orderData.products[0]?.name || 'Pocket Explorer',
          content_ids: orderData.products.map(p => p.id),
          content_type: 'product'
        },
        event_id: this.generateEventId()
        // Remove test_event_code from event level - only keep at API level
      }

      console.log('📊 Sending Facebook InitiateCheckout event:', eventData)

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [eventData],
          access_token: this.accessToken,
          test_event_code: 'TEST2468' // Add test event code at the top level
        })
      })

      const result = await response.json()
      console.log('📊 Facebook Conversions API response:', result)
      console.log('📊 Facebook API Status:', response.status)
      console.log('📊 Facebook API Headers:', Object.fromEntries(response.headers.entries()))

      if (response.ok && result.events_received === 1) {
        console.log('✅ Facebook InitiateCheckout event sent successfully')
        return true
      } else {
        console.error('❌ Failed to send Facebook InitiateCheckout event:', result)
        console.error('❌ Error details:', {
          status: response.status,
          statusText: response.statusText,
          events_received: result.events_received,
          messages: result.messages,
          fb_error: result.error?.message || result.error?.error_user_msg || result.error
        })
        return false
      }
    } catch (error) {
      console.error('💥 Error sending Facebook InitiateCheckout event:', error)
      return false
    }
  }

  async sendPurchase(orderData: {
    customerName: string
    customerPhone: string
    customerEmail?: string
    products: Array<{
      id: string
      name: string
      quantity: number
      price: number
    }>
    totalAmount: number
    orderId: string
    currency?: string
  }): Promise<boolean> {
    try {
      const eventData: FacebookConversionEvent = {
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: window.location.href,
        user_data: {
          client_user_agent: this.getClientUserAgent(),
          client_ip_address: this.getClientIPAddress(),
          fbp: this.getFbpCookie(),
          fbc: this.getFbcCookie(),
          phone: await this.hashData(this.formatPhoneNumber(`+971${orderData.customerPhone}`)), // Hash phone number with UAE prefix
          external_id: await this.hashData(`${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
        },
        custom_data: {
          currency: orderData.currency || 'AED',
          value: orderData.totalAmount,
          content_name: orderData.products[0]?.name || 'Pocket Explorer',
          content_ids: orderData.products.map(p => p.id),
          content_type: 'product'
        },
        event_id: this.generateEventId()
        // Remove test_event_code from event level - only keep at API level
      }

      console.log('📊 Sending Facebook Purchase event:', eventData)

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [eventData],
          access_token: this.accessToken,
          test_event_code: 'TEST2468' // Add test event code at the top level
        })
      })

      const result = await response.json()
      console.log('📊 Facebook Conversions API response:', result)
      console.log('📊 Facebook API Status:', response.status)
      console.log('📊 Facebook API Headers:', Object.fromEntries(response.headers.entries()))

      if (response.ok && result.events_received === 1) {
        console.log('✅ Facebook Purchase event sent successfully')
        return true
      } else {
        console.error('❌ Failed to send Facebook Purchase event:', result)
        console.error('❌ Error details:', {
          status: response.status,
          statusText: response.statusText,
          events_received: result.events_received,
          messages: result.messages,
          fb_error: result.error?.message || result.error?.error_user_msg || result.error
        })
        return false
      }
    } catch (error) {
      console.error('💥 Error sending Facebook Purchase event:', error)
      return false
    }
  }

  async sendViewContent(productData: {
    id: string
    name: string
    price: number
    currency?: string
  }): Promise<boolean> {
    try {
      const eventData: FacebookConversionEvent = {
        event_name: 'ViewContent',
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: window.location.href,
        user_data: {
          client_user_agent: this.getClientUserAgent(),
          client_ip_address: this.getClientIPAddress(),
          fbp: this.getFbpCookie(),
          fbc: this.getFbcCookie(),
          // Add external_id for better matching (can be session ID or anonymous ID)
          external_id: await this.hashData(`${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
        },
        custom_data: {
          currency: productData.currency || 'AED',
          value: productData.price,
          content_name: productData.name,
          content_ids: [productData.id],
          content_type: 'product'
        },
        event_id: this.generateEventId()
        // Remove test_event_code from event level - only keep at API level
      }

      console.log('📊 Sending Facebook ViewContent event:', eventData)

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [eventData],
          access_token: this.accessToken,
          test_event_code: 'TEST2468' // Add test event code at the top level
        })
      })

      const result = await response.json()
      console.log('📊 Facebook Conversions API response:', result)
      console.log('📊 Facebook API Status:', response.status)
      console.log('📊 Facebook API Headers:', Object.fromEntries(response.headers.entries()))

      if (response.ok && result.events_received === 1) {
        console.log('✅ Facebook ViewContent event sent successfully')
        return true
      } else {
        console.error('❌ Failed to send Facebook ViewContent event:', result)
        console.error('❌ Error details:', {
          status: response.status,
          statusText: response.statusText,
          events_received: result.events_received,
          messages: result.messages,
          fb_error: result.error?.message || result.error?.error_user_msg || result.error
        })
        return false
      }
    } catch (error) {
      console.error('💥 Error sending Facebook ViewContent event:', error)
      return false
    }
  }
}

export const facebookConversions = new FacebookConversionsAPI()
export type { FacebookConversionEvent }
