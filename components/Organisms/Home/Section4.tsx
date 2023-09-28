'use client'
import Button from '@/components/Atoms/Button'
import TextHeader from '@/components/Atoms/TextHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const Section4 = () => {
  return (
    <section id="portofolio" className="main__section h-fit bg-dark-secondary">
      <div className="main__container my-8 flex flex-col gap-4">
        <div className="grid grid-cols-5">
          <div className="col-span-2">
            <TextHeader
              title="Portofolio"
              subtitle="See what i’ve been build"
            />
          </div>
          <div className="bg-dark w-full h-fit border border-none rounded-3xl col-span-3 p-4 flex flex-col">
            <div className="flex flex-col px-4 gap-2">
              <div className="grid grid-cols-10 font-semibold">
                <div className="col-span-3">PrivyID</div>
                <div className="col-span-3 text-white-overlay">
                  Oct 2022 - Jan 2023
                </div>
                <div className="col-span-3 text-white-overlay">
                  Front End Developer Intern
                </div>
                <div className="col-span-1 text-right">
                  <Button variant="link">
                    <FontAwesomeIcon icon={faChevronDown} />
                  </Button>
                </div>
              </div>
              <div>
                <ul>
                  <li>
                    <p> - Intergrate Oauth 2 to Nuxt js 2.</p>
                  </li>
                  <li>
                    <p> - Create landing page using Nuxt 3 and Typescript.</p>
                  </li>
                  <li>
                    <p> - Intergrate Privy sign feature for external app.</p>
                  </li>
                  <li>
                    <p> - Intergrate payment gateway.</p>
                  </li>
                  <li>
                    <p>
                      - Learn Storybook, Nuxt Js 3, Firebase, Unit Testing, and
                      Design System on acceleration program for engineer.
                    </p>
                  </li>
                  <li>
                    <p>
                      - Create HR app to handle employee mobility and mutation.
                      Build using Nuxt Js 3, Typescrypt, and Pinia.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Section4
