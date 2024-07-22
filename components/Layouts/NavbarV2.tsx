'use client'
import { useState } from 'react'
import MenuItem from './MenuItem'
import {
  useAnimation,
  useMotionValueEvent,
  useScroll,
  motion,
} from 'framer-motion'
import Hamburger from '../Icons/Hamburger'
import { cn, openNewTab } from '@/lib/utils'
import { Transition } from '@headlessui/react'
import { socials } from '@/lib/constans/socials-media'

const NavbarV2 = () => {
  const { scrollY } = useScroll()
  const visibilityControl = useAnimation()

  const [isOpen, setIsOpen] = useState<boolean>( false )

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
    <>
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
        animate={isOpen ? undefined : visibilityControl}
        transition={{ ease : [0.1, 0.25, 0.3, 1], duration : 0.3 }}
        className={cn( 'fixed top-0 w-full h-16 z-30 bg-transparent md:bg-dark' )}
      >
        <div className="inset-x-0 mx-auto max-w-5xl px-4 lg:px-0 h-full hidden md:flex gap-2 items-center">
          <MenuItem />
        </div>
        <div className="absolute top-4 right-4 z-50">
          <Hamburger open={isOpen}
            setOpen={setIsOpen}
          />
        </div>
        <Transition
          className="h-full w-full fixed top-0"
          appear={true}
          show={isOpen}
        >
          <Transition.Child
            className={cn( 'h-full' )}
            enter="transition-all duration-300 ease-in-out delay-500"
            enterFrom="opacity-0"
            enterTo="no-doc-scroll bg-dark opacity-100"
            leave="duration-300 ease-in-out delay-500"
            leaveFrom="no-doc-scroll bg-dark opacity-100"
            leaveTo="opacity-0"
          >
            <div className="flex flex-col gap-y-4 h-full p-6 justify-center items-center font-bold text-xl text-white">
              {socials.map( ( item ) => (
                <button
                  key={item.name}
                  onClick={() => openNewTab( item.href )}
                  className={cn(
                    'flex items-center rounded-lg transition duration-150 ease-in-out',
                    'focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50'
                  )}
                >
                  <div>
                    <p className="text-4xl font-bold text-white text-center">
                      {item.name}
                    </p>
                  </div>
                </button>
              ) )}
            </div>
          </Transition.Child>
        </Transition>
      </motion.nav>
      {/* {open && (
        // <div className="h-full w-full fixed top-16 bg-dark z-50 no-doc-scroll md:hidden"></div>
        
      )} */}
    </>
  )
}

export default NavbarV2
