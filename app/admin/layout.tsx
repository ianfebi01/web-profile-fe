import '@/assets/scss/main.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import NextAuthProvider from '@/components/Context/NextAuthProvider'
import Sidebar from '@/components/Molecules/Sidebar'
import ReactQueryProvider from '@/components/Context/ReactQueryProvider'
import { Session, getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import ProfileProvider from '@/components/Context/ProfileProvider'
import { Toaster } from "react-hot-toast";
const inter = Inter( { subsets : ['latin'] } )

config.autoAddCss = false

export const metadata: Metadata = {
	title       : 'Admin Panel | Ian Febi S',
	description : 'Customize data on landing page',
}

export default async function AdminLayout( {
	children,
}: {
  children: React.ReactNode
} ) {
	const session = await getServerSession( authOptions )
	
	return (
		<main className={`h-screen overflow-scroll ${inter.className}`}>
			<Toaster
				toastOptions={{
					// icon : (
					// 	<div className="text-20" data-cy="modal-information-icon">
					// 		<ModalInformationIcon />
					// 	</div>
					// ),
					position  : "top-right",
					className : "bg-white text-dark",
					style     : {
						boxShadow : "0px 4px 10px rgba(0, 0, 0, 0.1)",
						height    : "44px",
					},
				}}
			/>
			<NextAuthProvider session={session as Session}>
				
				<ReactQueryProvider>
					<ProfileProvider>
						<Sidebar />
						<section className="ml-64 h-full flex flex-col">
							<div className="mx-6 mt-6 p-4 border border-none rounded-t-lg bg-dark-secondary grow-[1]">
								<ReactQueryProvider>{children}</ReactQueryProvider>
							</div>
						</section>
					</ProfileProvider>
				</ReactQueryProvider>
			</NextAuthProvider>
		</main>
	)
}
