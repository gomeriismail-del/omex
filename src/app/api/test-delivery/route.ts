import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  console.log('🧪 Testing delivery agency API...')
  
  try {
    const body = await request.json()
    console.log('📝 Test data received:', body)
    
    const apiUrl = 'https://api.codtoop.com/api/general-api/register'
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MTUyODRkZDljNTQ3Y2Y0ZTU5YjQ5NiIsInJvbGUiOlszMDBdLCJzdGF0dXMiOjkwLCJpYXQiOjE3Njk5MjgyNDB9.bUyo1LAvWEDERzO1c4kKn6VloPerwecJ13uERWvUPDM'
    
    console.log('🌐 Testing delivery agency endpoint:', apiUrl)
    
    // Test with different HTTP methods and auth approaches
    const testMethods = [
      {
        name: 'POST with Token in Query',
        method: 'POST',
        url: `${apiUrl}?token=${token}`,
        headers: { 'Content-Type': 'application/json' } as Record<string, string>
      },
      {
        name: 'POST with Bearer Token',
        method: 'POST', 
        url: apiUrl,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        } as Record<string, string>
      },
      {
        name: 'POST with Basic Auth',
        method: 'POST',
        url: apiUrl,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(token).toString('base64')}`
        } as Record<string, string>
      },
      {
        name: 'GET with Token in Query',
        method: 'GET',
        url: `${apiUrl}?token=${token}`,
        headers: { 'Content-Type': 'application/json' } as Record<string, string>
      },
      {
        name: 'PUT with Token in Query',
        method: 'PUT',
        url: `${apiUrl}?token=${token}`,
        headers: { 'Content-Type': 'application/json' } as Record<string, string>
      }
    ]
    
    let methodResults = []
    
    for (const test of testMethods) {
      console.log(`🧪 Testing ${test.name}...`)
      
      try {
        const response = await fetch(test.url, {
          method: test.method,
          headers: test.headers,
          body: test.method !== 'GET' ? JSON.stringify({
            order_id: 'test_order_123',
            customer_name: 'Test Customer',
            address: '123 Test Street',
            city: 'Test City'
          }) : undefined
        })
        
        const responseText = await response.text()
        
        let responseData
        try {
          responseData = JSON.parse(responseText)
        } catch (parseError) {
          responseData = { rawResponse: responseText }
        }
        
        methodResults.push({
          method: test.name,
          status: response.status,
          statusText: response.statusText,
          success: response.ok,
          data: responseData
        })
        
        console.log(`📊 ${test.name} result:`, {
          status: response.status,
          success: response.ok,
          data: responseData
        })
        
        // If we find a working method, break
        if (response.ok && responseData.success !== false) {
          console.log(`✅ ${test.name} WORKS!`)
          break
        }
        
      } catch (error: any) {
        methodResults.push({
          method: test.name,
          error: error.message,
          success: false
        })
        console.log(`❌ ${test.name} failed:`, error.message)
      }
    }
    
    // Also test the token validity
    console.log('🔑 Testing token validity...')
    
    try {
      // Try to decode the token to check if it's valid
      const tokenParts = token.split('.')
      if (tokenParts.length === 3) {
        const payload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString())
        console.log('🔓 Token payload:', payload)
        
        // Check if token is expired
        const now = Math.floor(Date.now() / 1000)
        if (payload.exp && payload.exp < now) {
          console.log('⏰ Token is expired!')
          return NextResponse.json({
            success: false,
            error: 'Token expired',
            tokenPayload: payload,
            currentTime: now,
            expiresAt: payload.exp
          })
        }
      }
    } catch (tokenError) {
      console.error('❌ Error decoding token:', tokenError)
    }
    
    return NextResponse.json({
      success: true,
      message: 'Delivery agency test completed',
      testUrl: 'http://localhost:3001/api/test-delivery',
      testResults: methodResults,
      workingMethod: methodResults.find((r: any) => r.success)?.method || 'None found',
      timestamp: new Date().toISOString()
    })
    
  } catch (error: any) {
    console.error('💥 Test error:', error)
    return NextResponse.json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
