import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  console.log('🔥 Proxy GET request received')
  
  try {
    // Add timeout to prevent hanging
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000) // 8 second timeout

    const targetUrl = 'https://dmtart.pro/api/orders'
    console.log('🌐 Fetching from:', targetUrl)

    const response = await fetch(targetUrl, {
      signal: controller.signal,
      headers: {
        'Connection': 'keep-alive',
        'User-Agent': 'Vercel-Proxy/1.0'
      }
    })
    
    clearTimeout(timeoutId)
    console.log('📡 Response status:', response.status)
    console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ HTTP error response:', errorText)
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`)
    }

    const data = await response.json()
    console.log('📊 Raw data type:', typeof data)
    console.log('📊 Raw data isArray:', Array.isArray(data))
    console.log('📊 Raw data length:', data?.length)
    
    // Check if data is valid
    if (!Array.isArray(data)) {
      console.error('❌ Invalid data format from API:', data)
      return NextResponse.json(
        { 
          error: 'Invalid data format from server', 
          details: data,
          type: typeof data,
          isArray: Array.isArray(data)
        }, 
        { status: 500 }
      )
    }

    console.log('✅ Successfully processed', data.length, 'orders')
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('💥 Proxy error details:', {
      name: error?.name,
      message: error?.message,
      stack: error?.stack
    })
    
    let errorMessage = 'Failed to fetch orders'
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        errorMessage = 'Request timeout - server is taking too long to respond'
      } else {
        errorMessage = `Server error: ${error.message}`
      }
    }

    return NextResponse.json(
      { 
        error: errorMessage,
        message: 'Please try again later or contact support if the issue persists',
        timestamp: new Date().toISOString()
      }, 
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)

    const response = await fetch('https://dmtart.pro/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Connection': 'keep-alive'
      },
      body: JSON.stringify(body),
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('Proxy error:', error)
    
    let errorMessage = 'Failed to create order'
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        errorMessage = 'Request timeout - server is taking too long to respond'
      } else {
        errorMessage = `Server error: ${error.message}`
      }
    }

    return NextResponse.json(
      { 
        error: errorMessage,
        message: 'Please try again later or contact support if the issue persists'
      }, 
      { status: 500 }
    )
  }
}
