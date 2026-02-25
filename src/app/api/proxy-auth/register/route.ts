import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  console.log('🔥 Proxy Register request received')
  
  try {
    const body = await request.json()
    console.log('📝 Registration data:', { ...body, password: '[REDACTED]' })
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000)

    const targetUrl = 'https://dmtart.pro/api/auth/register'
    console.log('🌐 Sending registration to:', targetUrl)

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
      console.log('📡 Registration response status:', response.status)

      // Check if response is JSON (real endpoint) or HTML (error page)
      const responseText = await response.text()
      console.log('� Response preview:', responseText.substring(0, 100))

      if (responseText.startsWith('{') || responseText.startsWith('[')) {
        // Real JSON response from backend
        console.log('✅ Using real backend registration')
        const data = JSON.parse(responseText)
        console.log('📊 Registration response:', data)
        return NextResponse.json(data, { status: response.status })
      } else {
        // HTML response means endpoint doesn't exist
        console.log('❌ Backend registration endpoint not found')
        return NextResponse.json({
          success: false,
          error: 'Registration service not available',
          message: 'The registration endpoint is not configured on the server. Please contact support.',
          timestamp: new Date().toISOString()
        }, { status: 503 })
      }
    } catch (fetchError: any) {
      clearTimeout(timeoutId)
      console.error('💥 Backend registration error:', fetchError.message)
      
      let errorMessage = 'Registration service unavailable'
      let statusCode = 503
      
      if (fetchError.name === 'AbortError') {
        errorMessage = 'Registration service timeout - please try again'
        statusCode = 504
      } else if (fetchError.message.includes('fetch failed')) {
        errorMessage = 'Cannot connect to registration server'
        statusCode = 503
      }

      return NextResponse.json({
        success: false,
        error: errorMessage,
        message: 'The registration service is currently unavailable. Please try again later.',
        timestamp: new Date().toISOString()
      }, { status: statusCode })
    }
  } catch (error: any) {
    console.error('💥 Registration proxy error:', {
      name: error?.name,
      message: error?.message,
      stack: error?.stack
    })
    
    let errorMessage = 'Failed to register user'
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
