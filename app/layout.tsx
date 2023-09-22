import '@/assets/scss/main.scss'
import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'

const outfit = Outfit({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ian Febi S',
  description: 'Front End Web Developer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <main className="main">
          <div className="main__container">{children}</div>
        </main>
      </body>
    </html>
  )
}
