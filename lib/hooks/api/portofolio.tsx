import { getDetail } from '@/lib/api/portofolioQueryFn'
import { IApi } from '@/types/api'
import { IApiPortofolio } from '@/types/api/portofolio'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

export const useGetDetail = (   id: string | number,
  enabled: boolean = true ): UseQueryResult<IApi<IApiPortofolio>> => {
    
  const data = useQuery<IApi<IApiPortofolio>>( {
    queryKey : ['portofolio', 'detail', id],
    queryFn  : () => getDetail( id ),
    enabled  : enabled
  } )

  return data
}
