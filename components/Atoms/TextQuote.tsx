'use client'
import React, { useEffect, useRef } from 'react'
import { motion, spring, useAnimation, useInView } from 'framer-motion'

const TextQuote = () => {
  const textRef = useRef(null)
  const isInView = useInView(textRef, {
    once: true,
  })

  const textControll = useAnimation()

  useEffect(() => {
    if (isInView) {
      textControll.start('visible')
    }
  }, [isInView])

  return (
    <div ref={textRef}>
      <motion.p
        variants={{
          hidden: {
            opacity: 0,
            scale: 0,
          },
          visible: {
            opacity: 1,
            scale: 1,
          },
        }}
        initial="hidden"
        transition={{
          type: 'spring',
          bounce: 0.5,
        }}
        animate={textControll}
        className="text-base md:text-2xl font-medium text-center"
      >
        Learning is the compass that guides us through the uncharted territories
        of knowledge, lighting our path toward growth and understanding.
      </motion.p>
    </div>
  )
}

export default TextQuote
