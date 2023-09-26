import Button from '@/components/Atoms/Button'
import TextHeader from '@/components/Atoms/TextHeader'
import CardPortofolio from '@/components/Molecules/CardPortofolio'
import Image from 'next/image'
import React from 'react'

const Section3 = () => {
  return (
    <section id="portofolio" className="main__section h-fit bg-dark">
      <div className="main__container my-8 flex flex-col gap-4">
        <TextHeader title="Portofolio" subtitle="See what i’ve been build" />
        <div className="grid grid-rows-2 grid-cols-2 w-full h-full gap-8">
          {/* @ NOTE  CARD*/}
          <CardPortofolio
            title="Gendut Grosir"
            subtitle='<b className="font-semibold ">Grocery Point of Sales -</b> Gendut
            Grosir is a system to handle sales and stock management in grocery
            store. Include dashboard, user management, role management, and
            product management feature.'
            color="bg-dark-secondary"
            skill={['ts', 'react', 'tailwind']}
          />
          <CardPortofolio
            title="Gendut Grosir"
            subtitle='<b className="font-semibold ">Grocery Point of Sales -</b> Gendut
            Grosir is a system to handle sales and stock management in grocery
            store. Include dashboard, user management, role management, and
            product management feature.'
            color="bg-white"
            skill={['ts', 'react', 'tailwind']}
          />
          <CardPortofolio
            title="Gendut Grosir"
            subtitle='<b className="font-semibold ">Grocery Point of Sales -</b> Gendut
            Grosir is a system to handle sales and stock management in grocery
            store. Include dashboard, user management, role management, and
            product management feature.'
            color="bg-green"
            skill={['ts', 'react', 'tailwind']}
          />
          <CardPortofolio
            title="Gendut Grosir"
            subtitle='<b className="font-semibold ">Grocery Point of Sales -</b> Gendut
            Grosir is a system to handle sales and stock management in grocery
            store. Include dashboard, user management, role management, and
            product management feature.'
            color="bg-dark-secondary"
            skill={['ts', 'react', 'tailwind']}
          />
        </div>
        <Button className="w-fit">Show more</Button>
      </div>
    </section>
  )
}

export default Section3
