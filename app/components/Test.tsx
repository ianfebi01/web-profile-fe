'use client'

import { IApi } from '@/types/api'
import { IApiProfile } from '@/types/api/profile'
import { AxiosResponse } from 'axios'
import { signIn, signOut, useSession } from 'next-auth/react'
import React, { FunctionComponent, useEffect } from 'react'
import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import Button2 from '@/components/Atoms/Button2'
import ButtonSignIn from '@/components/Atoms/ButtonSignIn'
import ButtonSignOut from '@/components/Atoms/ButtonSignOut'

interface Props {
  // session: Session | null
}

const Test: FunctionComponent<Props> = () => {
	const { data: session, status, update } = useSession()

	const axiosAuth = useAxiosAuth()

	const getProfile = async () => {
		const userProfile: AxiosResponse<IApi<IApiProfile>> = await axiosAuth.get(
			`/v1/user`
		)

	}

	useEffect( () => {
		getProfile()
	}, [] )

	const updateSession = async () => {
		await update( {
			...session,
			name        : 'feee',
			accessToken : 'cupu',
		} )
	}
	
	return (
		<div className="overflow-hidden flex flex-col gap-2">
			<div>
				<p>
        		Client Component {status}
				</p>
				<p className='text-red-300'>
					{status === 'authenticated' && session?.user?.name}
				</p>
			</div>
			<ul className='flex flex-col gap-2'>
				<li className='flex gap-4 bg-dark-secondary p-2 border border-none rounded-lg'>
					<p>Access Token</p>
					<p className="break-all">{session?.user?.accessToken}</p>
				</li>
				<li className='flex gap-4 bg-dark-secondary p-2 border border-none rounded-lg'>
					<p>Oauth Access Token</p>
					<p className="break-all">{session?.user?.oauthAccessToken}</p>
				</li>
				<li className='flex gap-4 bg-dark-secondary p-2 border border-none rounded-lg'>
					<p>Session expires</p>
					<p className="break-all">{session?.expires}</p>
				</li>
			</ul>

			<Button2 type='button' onClick={() => updateSession()}>UpdateName</Button2>
			<ButtonSignOut/>
			<ButtonSignIn/>
		</div>
	)
}

export default Test
