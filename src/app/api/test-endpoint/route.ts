import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  console.log('🧪 Testing if backend auth endpoint exists...')
  
  try {
    const targetUrl = 'https://dmtart.pro/api/auth/login'
    console.log('🌐 Testing:', targetUrl)

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Test-Auth-Endpoint/1.0'
      },
      body: JSON.stringify({ email: 'test@test.com', password: 'test123' }),
      signal: AbortSignal.timeout(5000)
    })

    const responseText = await response.text()
    console.log('📡 Response status:', response.status)
    console.log('📄 Response (first 200 chars):', responseText.substring(0, 200))

    return NextResponse.json({
      endpoint: targetUrl,
      status: response.status,
      statusText: response.statusText,
      isHtml: responseText.includes('<!DOCTYPE') || responseText.includes('<html'),
      isJson: responseText.startsWith('{') || responseText.startsWith('['),
      responsePreview: responseText.substring(0, 200),
      fullResponse: responseText
    })

  } catch (error: any) {
    console.error('💥 Test error:', error.message)
    return NextResponse.json({
      error: error.message,
      status: 'FAILED'
    })
  }
}
