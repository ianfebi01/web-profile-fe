import Position from '@/components/Organisms/Position'
import React from 'react'

export default function PositionPage() {
	return (
		<div className="flex flex-col gap-6 overflow-scroll h-full">
			<h1 className="text-2xl font-semibold ">Position</h1>
			<Position/>
		</div>
	)
}
