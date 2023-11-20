// src/app/sign-out/page.tsx

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../../lib/auth'
import ButtonSignIn from '@/components/Atoms/ButtonSignIn'

const SignOutPage = async () => {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/admin')
  } else {
    return (
      <div>
        <h1>SignInPAge</h1>

        <ButtonSignIn />
      </div>
    )
  }
}

export default SignOutPage
