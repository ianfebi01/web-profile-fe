'use client'

import { IApi } from '@/types/api'
import { IApiProfile } from '@/types/api/profile'
import axios, { AxiosResponse } from 'axios'
import { Session } from 'next-auth'
import { signIn, signOut, useSession } from 'next-auth/react'
import React, { FunctionComponent, useEffect } from 'react'
import api from '../../lib/api'

interface Props {
  session: Session | null
}

const Test: FunctionComponent<Props> = ({ session }) => {
  const { status } = useSession()

  // const getProfile = async () => {
  //   const userProfile: AxiosResponse<IApi<IApiProfile>> = await api.get(
  //     `/v1/user`
  //   )
  //   console.log(userProfile)
  // }

  // useEffect(() => {
  //   getProfile()
  // }, [])
  return (
    <div>
      <div>
        ClientComponent {status}{' '}
        {status === 'authenticated' && session?.user?.name}
      </div>
      <ul>
        <li>{session?.accessToken}</li>
        <li>{session?.oauthAccessToken}</li>
      </ul>
      <button onClick={() => signOut()}>Sign out</button>
      <button onClick={() => signIn('github')}>Sign in</button>
    </div>
  )
}

export default Test
