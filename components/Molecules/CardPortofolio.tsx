'use client'
import Image from 'next/image'
import React, { FunctionComponent } from 'react'
import DOMPurify from 'dompurify'

interface Props {
  color?: 'bg-dark-secondary' | 'bg-green' | 'bg-white'
  title?: string
  subtitle?: string
  skill?: string[]
}
const CardPortofolio: FunctionComponent<Props> = (props) => {
  const {
    color = 'dark-secondary',
    title = 'Gendut Grosir',
    subtitle = 'subtitle',
    skill = ['ts', 'react', 'tailwind'],
  } = props
  return (
    <div
      className={`${color} ${
        color === 'bg-white' && 'text-dark'
      } border border-none rounded-lg w-full h-64 p-6 grid grid-rows-1 grid-cols-5 items-center relative `}
    >
      {/* @ NOTE Text */}
      <div className=" flex flex-col gap-6 col-span-3">
        <div className="flex flex-col gap-2">
          <h3 className="text-base font-bold">{title}</h3>
          <p
            className="text-[8px]"
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
      <div>
        <div className="w-56 absolute right-0 inset-y-0 my-auto ">
          <Image
            src="/MacBookPro.png"
            alt="Project Image"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  )
}

export default CardPortofolio
