import Navbar from '@/components/Molecules/Navbar'
import Section1 from '@/components/Organisms/Home/Section1'
import Section2 from '@/components/Organisms/Home/Section2'
import Section3 from '@/components/Organisms/Home/Section3'
import Section4 from '@/components/Organisms/Home/Section4'
import { LandingProvider } from '@/context/LandingContext'
import { IApi, IApiLanding } from '@/types/api'
import { IApiProfile } from '@/types/api/profile'
import axios, { AxiosResponse } from 'axios'

export default async function Home() {

	const data: AxiosResponse<IApi<IApiLanding>> = await axios.get( `${process.env.BASE_URL}/v1/landing`, {
		params : {
			email : 'ianfebi01@gmail.com'
		}
	} )
	
	return (
		<main className="main">
			<LandingProvider>
				<Navbar />
				{/* @ NOTE Section 1 */}
				<Section1 profile={data.data?.data?.profile as IApiProfile} />
				{/* @ NOTE Section 2 */}
				<Section2 quote={data.data?.data?.profile?.quote as string}/>
				{/* @ NOTE Section 3 */}
				<Section3 />
				{/* @ NOTE Section 4 */}
				<Section4 />
			</LandingProvider>
		</main>
	)
}
