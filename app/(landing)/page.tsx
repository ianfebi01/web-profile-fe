// import ParalaxProvider from '@/components/Context/ParalaxProvider'
import SectionProvider from '@/components/Context/SectionProvider'
import Section1 from '@/components/Pages/Home/Section1'
import Section2 from '@/components/Pages/Home/Section2'
import Section3 from '@/components/Pages/Home/Section3'
import Section4 from '@/components/Pages/Home/Section4'
import { IApi, IApiLanding } from '@/types/api'
import { IApiProfile } from '@/types/api/profile'
import axios from 'axios'

export const dynamic = 'force-dynamic'

export default async function Home() {
  let data: IApi<IApiLanding> | null = null

  try {
    const response = await axios.get<IApi<IApiLanding>>(
      `${process.env.BASE_URL}/v1/landing`,
      {
        params : {
          email : 'ianfebi01@gmail.com',
        },
      }
    )
    data = response.data
  } catch ( error ) {
    return <div>Error loading data</div>
  }

  if ( !data ) {
    return <div>Error loading data</div>
  }

  return (
    <main className="">
      <SectionProvider>
        <Section1 profile={data.data?.profile as IApiProfile} />
        <Section2 quote={data.data?.profile?.quote as string} />
        <Section3 />
        <Section4 />

        {/* <ParalaxProvider position='top'> */}
        {/* <Section1 profile={data.data?.profile as IApiProfile} /> */}
        {/* </ParalaxProvider> */}
      </SectionProvider>
    </main>
  )
}
