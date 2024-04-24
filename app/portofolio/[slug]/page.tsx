import Header from '@/components/Layouts/Header'
import { IPaginationParams } from '@/types/params'
import { Url } from 'next/dist/shared/lib/router/router'
import React from 'react'

export default function PortofolioPage( { searchParams, params }: {searchParams: IPaginationParams, params: {slug: string} } ) {
	const backLink: Url = {
		pathname : '/',
		query    : {
			...searchParams
		}

	}
	
	return (
		<div className="flex flex-col gap-6 h-full">
			<Header text='Portofolio' link={backLink}/>
			{params.slug}
		</div> 
	)
}
