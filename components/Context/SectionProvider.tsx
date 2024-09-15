'use client'

import React, { useEffect, useRef, useState } from 'react'

interface MyPosYProps {
  myposy?: number
}

const SectionProvider = ( {
  children,
}: {
  children: React.ReactElement<MyPosYProps>[]
} ) => {
  const [myPosY, setMyPosY] = useState<number>( 0 )

  const sectionRef = useRef<HTMLElement>( null )

  useEffect( () => {
    // Add event listener when component mounts
    window.addEventListener( 'scroll', handleScroll )

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener( 'scroll', handleScroll )
    }
  }, [] )

  function handleScroll() {
    const { top } = sectionRef.current?.getBoundingClientRect() as DOMRect
    setMyPosY( top )
  }

  return (
    <section ref={sectionRef}>
      {React.Children.map( children, ( child ) => {
        if ( React.isValidElement( child ) ) {
          return React.cloneElement( child, { myposy : myPosY } ) // Passing myPosY to React child components
        }

        return child
      } )}
    </section>
  )
}

export default SectionProvider
