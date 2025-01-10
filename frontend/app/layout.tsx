import type { Metadata } from 'next'
import { Press_Start_2P } from 'next/font/google'
import Navbar from '@/components/Navbar'
import './globals.css'

const pixelFont = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel',
})

export const metadata: Metadata = {
  title: 'Tokiemon NFT Marketplace',
  description: 'Buy and sell Tokiemon NFTs for your web3 game',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${pixelFont.variable} font-pixel crt bg-gb-lightest text-gb-darkest`}>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}

