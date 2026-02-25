import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  console.log('🧪 Test proxy endpoint called')
  
  try {
    // Test basic connectivity to the target server
    const targetUrl = 'https://dmtart.pro/api/orders'
    console.log('🌐 Testing connection to:', targetUrl)

    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Test-Proxy/1.0'
      },
      // Shorter timeout for testing
      signal: AbortSignal.timeout(5000)
    })

    console.log('📡 Test response status:', response.status)
    console.log('📡 Test response headers:', Object.fromEntries(response.headers.entries()))

    const responseText = await response.text()
    console.log('📄 Raw response (first 200 chars):', responseText.substring(0, 200))

    let data
    try {
      data = JSON.parse(responseText)
    } catch (e) {
      console.error('❌ Failed to parse JSON:', e)
      data = { rawResponse: responseText }
    }

    return NextResponse.json({
      success: true,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      dataType: typeof data,
      isArray: Array.isArray(data),
      dataLength: data?.length,
      rawData: data
    })

  } catch (error: any) {
    console.error('💥 Test proxy error:', error)
    
    return NextResponse.json({
      success: false,
      error: error?.message || 'Unknown error',
      name: error?.name,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
