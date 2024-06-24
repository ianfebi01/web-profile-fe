import NavbarV2 from '@/components/Layouts/NavbarV2'
import Footer from '@/components/Pages/Home/Footer'
import React from 'react'

export default function landingLayout( {
  children,
}: {
  children: React.ReactNode
} ) {
  return (
    <>
      <NavbarV2 />
      {children}
      <Footer/>
    </>
  )
}
