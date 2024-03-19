import AddPortofolio from '@/components/Organisms/AddPortofolio'
import React from 'react'

export default function AddPortofolioPage() {
	return (
		<div className="flex flex-col gap-6 overflow-scroll h-full">
			<h1 className="text-2xl font-semibold ">Portofolio</h1>
			<AddPortofolio/>
		</div> 
	)
}
