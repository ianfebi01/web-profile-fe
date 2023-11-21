'use client'
import { signIn, signOut } from 'next-auth/react'
import React from 'react'
import GithubIcon from './GithubIcon'

const ButtonSignIn = () => {
  return (
    <button
      type="button"
      className="py-2 px-4 max-w-md flex justify-center items-center bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
      onClick={() => signIn('github', { callbackUrl: '/admin' })}
    >
      <GithubIcon />
      Sign in with GitHub
    </button>
  )
}

export default ButtonSignIn
