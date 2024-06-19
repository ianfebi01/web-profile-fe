'use client'

import React from 'react'
import MenuItem from './MenuItem'
import {
  useAnimation,
  useMotionValueEvent,
  useScroll,
  motion,
} from 'framer-motion'

const NavbarV2 = () => {
  const { scrollY } = useScroll()
  const visibilityControl = useAnimation()

  function update() {
    if ( scrollY?.get() < scrollY?.getPrevious() ) {
      visibilityControl.start( 'visible' )
    } else if (
      scrollY?.get() > 100 &&
      scrollY?.get() > scrollY?.getPrevious()
    ) {
      visibilityControl.start( 'hidden' )
    }
  }

  useMotionValueEvent( scrollY, 'change', () => {
    update()
  } )

  return (
    <motion.nav
      variants={{
        hidden : {
          opacity : 0,
          y       : -25,
        },
        visible : {
          opacity : 1,
          y       : 0,
        },
      }}
      initial="visible"
      animate={visibilityControl}
      transition={{ ease : [0.1, 0.25, 0.3, 1], duration : 0.3 }}
      className=" fixed top-0 w-full h-16 z-30 bg-dark"
    >
      <div className="inset-x-0 mx-auto max-w-5xl  h-full flex gap-2 items-center">
        <MenuItem />
      </div>
    </motion.nav>
  )
}

export default NavbarV2
