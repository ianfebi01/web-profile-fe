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

export async function generateMetadata() {
  const metaData = await getMetadata()

  return metaData
}
let resolve: any
const getMetadata = () => {
  return new Promise( ( res ) => {
    if ( resolve && typeof resolve === 'object' ) {
      res( resolve )
    } else resolve = res
  } )
}

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

    const title = data.data?.profile.name
    const desc =
      'Front End Web Developer with 1+ year of experience. Expert on React js and Vue js'
    const me = {
      title       : title,
      description : desc,
      openGraph   : {
        title       : title,
        description : desc,
        url         : 'https://ianfebisastrataruna.my.id',
        siteName    : title,
        images      : [{ url : data.data?.profile.avatar }],
        type        : 'article',
        authors     : [data.data?.profile.name],
      },
    }
    if ( resolve && typeof resolve === 'function' ) resolve( me )
    else resolve = me
  } catch ( error ) {
    return <div>Error loading data</div>
  }

  return (
    <main>
      <SectionProvider>
        <Section1 profile={data.data?.profile as IApiProfile} />
      </SectionProvider>
      <SectionProvider>
        <Section2 quote={data.data?.profile?.quote as string} />
      </SectionProvider>
      <SectionProvider>
        <Section3 />
      </SectionProvider>
      <SectionProvider>
        <Section4 />
      </SectionProvider>
    </main>
  )
}
