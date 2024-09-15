'use client'

import { ReactNode, useEffect, useRef, useState } from "react";

const SectionProvider = ( { children }: {children: ReactNode} ) => {

  const [myPosY, setMyPosY] = useState<number>( 0 );

  const sectionRef = useRef<HTMLElement>( null )
  
  useEffect( ()=>{
    const { top } = sectionRef.current?.getBoundingClientRect() as DOMRect
    setMyPosY( top )
  }, [] )
  
  return (
    <section ref={sectionRef}>
      { children }
    </section>
  )
}

export default SectionProvider
