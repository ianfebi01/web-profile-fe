import Button from '@/components/Atoms/Button'
import TextHeader from '@/components/Atoms/TextHeader'
import CardPortofolio from '@/components/Molecules/CardPortofolio'
import { title } from 'process'
import React from 'react'

const portofolio = [
	{
		name        : 'Gendut Grosir',
		desc        : 'Gendut Grosir is a system to handle sales and stock management in grocery store. Include dashboard, user management, role management, and product management feature.',
		type        : 'Grocery Point of Sales',
		year        : 2023,
		skill       : ['ts', 'react', 'tailwind'],
		image       : '/desk.png',
		imageDevice : 'desktop',
	},
	{
		name        : 'Gendut Grosir',
		desc        : 'Gendut Grosir is a system to handle sales and stock management in grocery store. Include dashboard, user management, role management, and product management feature.',
		type        : 'Grocery Point of Sales',
		year        : 2023,
		skill       : ['ts', 'react', 'tailwind'],
		image       : '/desk.png',
		imageDevice : 'desktop',
	},
	{
		name        : 'Gendut Grosir',
		desc        : 'Gendut Grosir is a system to handle sales and stock management in grocery store. Include dashboard, user management, role management, and product management feature.',
		type        : 'Grocery Point of Sales',
		year        : 2023,
		skill       : ['ts', 'react', 'tailwind'],
		image       : '/desk.png',
		imageDevice : 'desktop',
	},
	{
		name        : 'Gendut Grosir',
		desc        : 'Gendut Grosir is a system to handle sales and stock management in grocery store. Include dashboard, user management, role management, and product management feature.',
		type        : 'Grocery Point of Sales',
		year        : 2023,
		skill       : ['ts', 'react', 'tailwind'],
		image       : '/mobile.png',
		imageDevice : 'mobile',
	},
]

const Section3 = () => {
	return (
		<section id="portofolio" className="main__section h-fit bg-dark">
			<div className="main__container my-8 flex flex-col gap-4">
				<TextHeader title="Portofolio" subtitle="See what i’ve been build" />
				<div className="grid grid-cols-1 md:grid-cols-2 w-full h-full gap-8">
					{/* @ NOTE  CARD*/}
					{portofolio?.map( ( item, i ) => (
						<div
							className="hover:scale-95 transition-default relative group overflow-hidden"
							key={i}
						>
							<div className="flex gap-2 absolute top-0 w-full opacity-0 -translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 group-hover:delay-300 delay-300  transition-default px-4 py-2 z-10">
								<Button theme={i === 1 ? 'light' : 'dark'}>{item?.name}</Button>
								<Button theme={i === 1 ? 'light' : 'dark'}>{item?.year}</Button>
							</div>
							<CardPortofolio
								title={item?.name}
								subtitle={`<b className="font-semibold ">${item?.type} -</b> ${item?.desc}`}
								color={
									i === 1
										? 'bg-white'
										: i === 2
											? 'bg-green'
											: 'bg-dark-secondary'
								}
								skill={item?.skill}
								image={item?.image}
								imageDevice={item.imageDevice}
							/>
						</div>
					) )}
				</div>
				<Button className="w-fit">Show more</Button>
			</div>
		</section>
	)
}

export default Section3
