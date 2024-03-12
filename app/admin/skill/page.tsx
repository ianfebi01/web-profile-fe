import Skill from '@/components/Organisms/Skill'
import { PositionProvider } from '@/context/PositionContext'
import React from 'react'

export default function PositionPage() {
	return (
		<div className="flex flex-col gap-6 overflow-scroll h-full">
			<h1 className="text-2xl font-semibold ">Skill</h1>
			<PositionProvider>
				<Skill/>
			</PositionProvider>
		</div>
	)
}
