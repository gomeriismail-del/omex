import { NextResponse } from "next/server"
import { readFile } from "fs/promises"
import path from "path"

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'products.txt')
    const fileContent = await readFile(filePath, 'utf-8')
    
    // Parse the products.txt file
    const products = parseProductsFile(fileContent)
    
    return NextResponse.json(products)
  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json({ error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}

function parseProductsFile(content: string) {
  const products = []
  const sections = content.split(/Product \d+ - All Properties:/).filter(section => section.trim())
  
  for (let i = 0; i < sections.length; i++) {
    try {
      const productData = JSON.parse(sections[i].trim())
      
      // Extract plain text from rich_text arrays
      const getPlainText = (field: any) => {
        if (!field?.rich_text) return ''
        return field.rich_text.map((item: any) => item.plain_text).join('')
      }
      
      // Extract plain text from title arrays
      const getTitleText = (field: any) => {
        if (!field?.title) return `Product ${i + 1}`
        return field.title.map((item: any) => item.plain_text).join('').trim()
      }
      
      // Transform the data to match the expected interface
      const transformedProduct = {
        id: `product-${i + 1}`,
        properties: {
          name: { 
            title: [{ plain_text: getTitleText(productData.name) || `Product ${i + 1}` }] 
          },
          "Description-en": productData["Description-en"],
          "Description-ar": productData["Description-ar"],
          "Description-fr": productData["Description-fr"],
          "Usage-en": productData["Usage-en"],
          "Usage-ar": productData["Usage-ar"],
          "Usage-fr": productData["Usage-fr"],
          price: productData.price,
          "old price": productData["old price"],
          image1: productData.image1,
          image2: productData.image2,
          rating: productData.rating,
          ID: productData.ID
        }
      }
      
      products.push(transformedProduct)
    } catch (parseError) {
      console.error(`Error parsing product ${i + 1}:`, parseError)
    }
  }
  
  return products
}
