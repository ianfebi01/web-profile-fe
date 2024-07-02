import Detail from '@/components/Pages/Home/Portofolio/Detail'
import { getDetail } from '@/lib/api/portofolioQueryFn'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'

export default async function PortofolioPage( {
  params,
}: {
  params: { slug: string }
} ) {

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery( {
    queryKey : ['portofolio', 'detail', params.slug],
    queryFn  : () => getDetail( params.slug ),
  } )

  const dehydratedState = dehydrate( queryClient )

  return (
    <main className="grow-[1] flex flex-col">
      <HydrationBoundary state={dehydratedState}>
        <Detail id={params.slug} />
      </HydrationBoundary>
    </main>
  )
}
