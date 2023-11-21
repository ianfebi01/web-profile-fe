'use client'

import { IApi } from '@/types/api'
import { IApiProfile } from '@/types/api/profile'
import { AxiosResponse } from 'axios'
import { signIn, signOut, useSession } from 'next-auth/react'
import React, { FunctionComponent, useEffect } from 'react'
import useAxiosAuth from '@/lib/hooks/useAxiosAuth'

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
			accessToken : 'cupu',
			user        : {
				...session?.user,
				name : 'kuning',
			},
		} )
	}
	
	return (
		<div className="overflow-hidden">
			<div>
        ClientComponent {status}{' '}
				{status === 'authenticated' && session?.user?.name}
			</div>
			<ul>
				<li>
					<p className="break-all">{session?.accessToken}</p>
				</li>
				<li>
					<p>{session?.oauthAccessToken}</p>
				</li>
			</ul>

			<button onClick={() => updateSession()}>UpdateName</button>
			<button onClick={() => signOut()}>Sign out</button>
			<button onClick={() => signIn( 'github' )}>Sign in</button>
		</div>
	)
}

export default Test
