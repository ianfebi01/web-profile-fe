'use client'
import { signOut } from 'next-auth/react'
import React from 'react'

const ButtonSignOut = () => {
  return (
    <button
      className="bg-slate-600 px-4 py-2 text-white"
      onClick={() => signOut({ callbackUrl: '/' })}
      type="button"
    ></button>
  )
}

export default ButtonSignOut
