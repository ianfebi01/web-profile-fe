"use client"
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePathname, useRouter } from 'next/navigation';
import React, { FunctionComponent } from 'react'

interface Props{
    icon: IconProp
    text: string
    path: string
}
const ButtonSidebar: FunctionComponent<Props> = ( props ) => {
	const { icon, path, text } = props

	const router = useRouter()

	const pathname = usePathname()
	
	return (
		<button
			type="button"
			className={`transition-all ease-in-out duration-500 w-full flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-dark border ${
				pathname === path
					? 'bg-dark border-transparent cursor-default'
					: 'bg-none border-white/25 hover:border-transparent'
			}`}
			disabled={pathname === path}
			onClick={() => router.push( path )}
		>
			{/* <Icon :name="menu?.icon" /> */}
			<FontAwesomeIcon icon={icon} size="xs" />

			<p className="ml-3 line-clamp-1">{text}</p>
		</button>
	)
}

export default ButtonSidebar
