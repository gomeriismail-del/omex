import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import Footer from '@/components/footer'
import { LanguageProvider } from '@/contexts/LanguageContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'Omex',
  description: 'Omex Store',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="relative min-h-screen flex flex-col">
        <LanguageProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
        <GoogleAnalytics gaId="G-MFEM45NTYG" />
      </body>
    </html>
  )
}
