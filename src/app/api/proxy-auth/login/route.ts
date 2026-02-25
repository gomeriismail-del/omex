import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  console.log('🔥 Proxy Login request received')
  
  try {
    const body = await request.json()
    console.log('📝 Login data:', { ...body, password: '[REDACTED]' })
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000)

    const targetUrl = 'https://dmtart.pro/api/auth/login'
    console.log('🌐 Sending login to:', targetUrl)

    try {
      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Connection': 'keep-alive',
          'User-Agent': 'Vercel-Auth-Proxy/1.0'
        },
        body: JSON.stringify(body),
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      console.log('📡 Login response status:', response.status)

      // Check if response is JSON (real endpoint) or HTML (error page)
      const responseText = await response.text()
      console.log('📄 Response preview:', responseText.substring(0, 100))

      if (responseText.startsWith('{') || responseText.startsWith('[')) {
        // Real JSON response from backend
        console.log('✅ Using real backend authentication')
        const data = JSON.parse(responseText)
        console.log('📊 Login response:', { ...data, token: data?.token ? '[JWT_TOKEN]' : 'NO_TOKEN' })
        return NextResponse.json(data, { status: response.status })
      } else {
        // HTML response means endpoint doesn't exist
        console.log('❌ Backend auth endpoint not found')
        return NextResponse.json({
          success: false,
          error: 'Authentication service not available',
          message: 'The authentication endpoint is not configured on the server. Please contact support.',
          timestamp: new Date().toISOString()
        }, { status: 503 })
      }
    } catch (fetchError: any) {
      clearTimeout(timeoutId)
      console.error('💥 Backend auth error:', fetchError.message)
      
      let errorMessage = 'Authentication service unavailable'
      let statusCode = 503
      
      if (fetchError.name === 'AbortError') {
        errorMessage = 'Authentication service timeout - please try again'
        statusCode = 504
      } else if (fetchError.message.includes('fetch failed')) {
        errorMessage = 'Cannot connect to authentication server'
        statusCode = 503
      }

      return NextResponse.json({
        success: false,
        error: errorMessage,
        message: 'The authentication service is currently unavailable. Please try again later.',
        timestamp: new Date().toISOString()
      }, { status: statusCode })
    }
  } catch (error: any) {
    console.error('💥 Login proxy error:', {
      name: error?.name,
      message: error?.message,
      stack: error?.stack
    })
    
    let errorMessage = 'Failed to login user'
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        errorMessage = 'Request timeout - server is taking too long to respond'
      } else {
        errorMessage = `Server error: ${error.message}`
      }
    }

    return NextResponse.json(
      { 
        success: false,
        error: errorMessage,
        message: 'Please try again later or contact support if the issue persists',
        timestamp: new Date().toISOString()
      }, 
      { status: 500 }
    )
  }
}
