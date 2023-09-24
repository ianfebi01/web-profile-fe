'use client'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import { useAnimation, useInView, motion, easeInOut } from 'framer-motion'

const PersonImage = () => {
  const personImageRef = useRef(null)
  const personImageView = useInView(personImageRef, {
    once: false,
  })
  const personImageControl = useAnimation()

  useEffect(() => {
    if (personImageView === true) {
      personImageControl.start('visible')
    }
  }, [personImageView])
  return (
    <div
      ref={personImageRef}
      className="absolute bottom-0 mx-auto inset-x-0 w-fit"
    >
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: 75,
          },
          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        animate={personImageControl}
        transition={{
          duration: 0.5,
          ease: easeInOut,
        }}
      >
        <Image src="/me-3.png" alt="Profile image" width={261} height={391} />
      </motion.div>
    </div>
  )
}

export default PersonImage
