import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import { ToastProvider } from '@/components/Toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shizuru - Modern Anime Streaming',
  description: 'Experience anime like never before with Shizuru\'s modern, clean streaming platform featuring AMOLED-optimized design.',
  applicationName: 'Shizuru',
  authors: [{ name: 'Shizuru Team' }],
  keywords: 'anime,streaming,watch,online,free,HD,subbed,dubbed,shizuru',
  creator: 'Shizuru',
  themeColor: '#b26df5',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ToastProvider>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  )
}