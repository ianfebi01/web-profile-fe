'use client'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { signOut } from 'next-auth/react'
import React from 'react'

const ButtonSignOut = () => {
	return (
		<button
			className="bg-transparent hover:bg-dark border border-white/25 hover:border-transparent p-2 transition-all ease-in-out duration-500 text-base text-white flex items-center gap-2 w-full rounded-lg"
			onClick={() => signOut( { callbackUrl : '/' } )}
			type="button"
		>
			<p>Sign Out</p>
			<div className="grow-[1]"></div>
			<FontAwesomeIcon icon={faSignOut} size="sm" />
		</button>
	)
}

export default ButtonSignOut
