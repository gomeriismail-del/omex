import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  console.log('🧪 Testing auth endpoints...')
  
  const endpoints = [
    '/api/auth/login',
    '/api/auth/register',
    '/api/login',
    '/api/register',
    '/auth/login',
    '/auth/register'
  ]

  const results = []

  for (const endpoint of endpoints) {
    try {
      const targetUrl = `https://dmtart.pro${endpoint}`
      console.log('🌐 Testing:', targetUrl)

      const response = await fetch(targetUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'Test-Auth-Proxy/1.0'
        },
        signal: AbortSignal.timeout(5000)
      })

      const responseText = await response.text()
      console.log(`📡 ${endpoint} - Status:`, response.status)
      console.log(`📄 ${endpoint} - Response (first 100 chars):`, responseText.substring(0, 100))

      results.push({
        endpoint,
        status: response.status,
        statusText: response.statusText,
        isHtml: responseText.includes('<!DOCTYPE') || responseText.includes('<html'),
        isJson: responseText.startsWith('{') || responseText.startsWith('['),
        preview: responseText.substring(0, 100)
      })

    } catch (error: any) {
      console.error(`💥 ${endpoint} - Error:`, error.message)
      results.push({
        endpoint,
        error: error.message,
        status: 'FAILED'
      })
    }
  }

  return NextResponse.json({
    message: 'Auth endpoint test results',
    results,
    timestamp: new Date().toISOString()
  })
}
