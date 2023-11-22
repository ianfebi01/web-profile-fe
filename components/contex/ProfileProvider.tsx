'use client'

import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import { IApi } from '@/types/api'
import { IApiProfile } from '@/types/api/profile'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'

export default function ProfileProvider( {
	children,

}: {
  children: ReactNode
} ) {
	const { data: session, update } = useSession()

	const axiosAuth = useAxiosAuth()

	const { isLoading } = useQuery<AxiosResponse<IApi<IApiProfile>>>( {
		queryKey : ['profile'],
		queryFn  : async()=> {
			const data = await axiosAuth.get(
				`/v1/profile`
			)

			await update( {
				...session,
				user : {
					...session?.user,
					...data?.data.data
				}
			} )
			
			return data
		}
	} )

	// const getProfile = async () => {
	// 	const userProfile: AxiosResponse<IApi<IApiProfile>> = await axiosAuth.get(
	// 		`/v1/profile`
	// 	)

	// 	await update( {
	// 		...session,
	// 		user : {
	// 			...session?.user,
	// 			...userProfile?.data.data
	// 		}
	// 	} )

	// }

	// useEffect( () => {
	// 	getProfile()
	// }, [] )

	return isLoading ? <span>loading...</span> : <>{ children }</>
	
	// return  <>{ children }</>
}
