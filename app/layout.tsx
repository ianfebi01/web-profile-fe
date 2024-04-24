import '@/assets/scss/main.scss'
import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { LandingProvider } from '@/context/LandingContext'
import Navbar from '@/components/Layouts/Navbar'
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
			<LandingProvider>
				<body className={outfit.className} suppressHydrationWarning={true}>
					<Navbar />
					{children}
				</body>
			</LandingProvider>
		</html>
	)
}
