'use client'
import { signIn, signOut } from 'next-auth/react'
import React from 'react'

const ButtonSignIn = () => {
  return (
    <button
      className="bg-slate-600 px-4 py-2 text-white"
      onClick={() => signIn('github', { callbackUrl: '/admin' })}
      type="button"
    ></button>
  )
}

export default ButtonSignIn
