import '@/assets/scss/main.scss'
import Navbar from '@/components/Molecules/Navbar'
import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import NextAuthProvider from '@/components/contex/NextAuthProvider'
const outfit = Outfit({ subsets: ['latin'] })

config.autoAddCss = false

export const metadata: Metadata = {
  title: 'Admin Panel | Ian Febi S',
  description: 'Customize data on landing page',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={outfit.className} suppressHydrationWarning={true}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  )
}
