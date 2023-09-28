'use client'
import Image from 'next/image'
import React, { FunctionComponent, useEffect, useRef } from 'react'
import DOMPurify from 'dompurify'
import { motion, useInView, useAnimation, easeOut } from 'framer-motion'
import AnimationProvider from './AnimationProvider'
import MacbookMockup from '../Atoms/MacbookMockup'

interface Props {
  color?: 'bg-dark-secondary' | 'bg-green' | 'bg-white'
  title?: string
  subtitle?: string
  skill?: string[]
  image?: string
  imageDevice?: string
}
const CardPortofolio: FunctionComponent<Props> = (props) => {
  const {
    color = 'dark-secondary',
    title = 'Gendut Grosir',
    subtitle = 'subtitle',
    skill = ['ts', 'react', 'tailwind'],
    image,
    imageDevice = 'mobile',
  } = props

  const cardRef = useRef(null)
  const isInView = useInView(cardRef, {
    once: true,
  })
  const animationControl = useAnimation()

  useEffect(() => {
    if (isInView) {
      animationControl.start('visible')
    }
  }, [isInView])

  return (
    <AnimationProvider
      className={`${color} ${
        color === 'bg-white' && 'text-dark'
      } border border-none rounded-lg w-full sm:h-64 md:h-64 p-6 grid grid-rows-1 grid-cols-5 items-center relative cursor-pointer hover:scale-90`}
    >
      {/* @ NOTE Text */}
      <div
        className={`flex flex-col gap-2 sm:gap-6 ${
          image ? 'col-span-3' : 'col-span-5'
        }`}
      >
        <div className="flex flex-col gap-2">
          <h3 className="text-base font-bold">{title}</h3>
          <p
            className="text-xs"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(subtitle) }}
          ></p>
        </div>
        <div className="grow-[1]" />
        <div className="flex gap-1">
          {skill?.map((item, i) => (
            <div
              className={`w-4 h-4  border border-none rounded-sm relative overflow-hidden ${
                color === 'bg-white' && 'shadow-skill'
              }`}
              key={i}
            >
              <Image
                src={`/${item}.svg`}
                layout="fill"
                objectFit="contain"
                alt="Icon"
              />
            </div>
          ))}
        </div>
      </div>
      {image && (
        <div>
          <div
            className={`w-48 lg:w-56 absolute inset-y-0 my-auto ${
              imageDevice === 'desktop'
                ? '-right-16'
                : imageDevice === 'mobile'
                ? '-bottom-32 h-[120%] sm:h-[90%] -right-6 sm:-right-4 lg:-right-10'
                : ''
            }`}
          >
            {/* <MacbookMockup image={image} /> */}
            <Image
              src={image}
              alt="Project Image"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      )}
    </AnimationProvider>
  )
}

export default CardPortofolio
