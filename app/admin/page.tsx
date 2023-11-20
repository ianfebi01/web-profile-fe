import { getServerSession } from 'next-auth'
import Test from '../components/Test'
import { authOptions } from '../../lib/auth'
import { signIn } from 'next-auth/react'

export default async function Admin() {
  const session = await getServerSession(authOptions)
  // if (!session) {
  //   signIn('github')
  // }

  return (
    <main className="main">
      <Test session={session} />
    </main>
  )
}
