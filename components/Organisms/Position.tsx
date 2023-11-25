"use client"
import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import { IApi } from '@/types/api'
import { IApiPosition } from '@/types/api/position'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import React from 'react'

const Position = () => {

	const axiosAuth = useAxiosAuth()

	const{ data } = useQuery<AxiosResponse<IApi<IApiPosition[]>>>( {
		queryKey : ['position'],
		queryFn  : async ()=> await axiosAuth.get( '/v1/position' ),
	} )
	
	return (
		<div>
			{
				data?.data?.data?.map( ( item: IApiPosition, i )=>(
					<p key={i}>{item.name}</p>
				) )
			}
		</div>
	)
}

export default Position
