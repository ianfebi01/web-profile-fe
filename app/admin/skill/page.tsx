import Skill from '@/components/Organisms/Skill'
import React from 'react'

export default function PositionPage() {
	return (
		<div className="flex flex-col gap-6 overflow-scroll h-full">
			<h1 className="text-2xl font-semibold ">Skill</h1>
			<Skill/>
		</div>
	)
}
