
import Header from '@/components/Layouts/Header'
import { IPaginationParams } from '@/types/params'
import { Url } from 'next/dist/shared/lib/router/router'
import React from 'react'

export default function PortofoliosPage( {
	searchParams,
}: {
  searchParams: IPaginationParams
} ) {
	const backLink: Url = {
		pathname : '/',
		query    : {
			...searchParams,
		},
	}

	return (
		<main className="main">
			<section id="portofolio" className="main__section h-fit bg-dark">
				<div className="main__container mt-20 sm:mt-6 flex flex-col gap-4">
					<Header text='Portofolio' link={backLink}/>
				</div>
			</section>
		</main>
	)
}
