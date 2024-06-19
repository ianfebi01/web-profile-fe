import '@/assets/scss/main.scss'
import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { LandingProvider } from '@/context/LandingContext'
import ReactQueryProvider from '@/components/Context/ReactQueryProvider'
import NavbarV2 from '@/components/Layouts/NavbarV2'
const outfit = Outfit( { subsets : ['latin'] } )

config.autoAddCss = false

export const metadata: Metadata = {
  title : 'Ian Febi S',
  description :
    'Front End Web Developer with 1+ year of experience. Expert on React js and Vue js',
}

export default function RootLayout( {
  children,
}: {
  children: React.ReactNode
} ) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <LandingProvider>
          <body className={outfit.className}
            suppressHydrationWarning={true}
          >
            <NavbarV2 />
            {children}
          </body>
        </LandingProvider>
      </ReactQueryProvider>
    </html>
  )
}
