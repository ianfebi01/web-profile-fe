import PersonImage from '@/components/Atoms/PersonImage'
import Shape from '@/components/Atoms/Shape'
import TextBackground from '@/components/Atoms/TextBackground'
import TextSide from '@/components/Atoms/TextSide'
import React from 'react'

const Section1 = () => {
  return (
    <section
      id="home"
      className="main__section h-[650px] md:h-[487px] transition-default bg-dark relative"
    >
      <Shape />
      <div className="main__container mt-20 sm:mt-6 relative overflow-hidden">
        <div className="text-center sm:text-left transition-default">
          <p>Ian Febi Sastrataruna</p>
          <a href="mailto:ianfebi01@gmail.com" className="text-white-overlay">
            ianfebi01@gmail.com
          </a>
        </div>
        <TextBackground />
        <PersonImage />
        <TextSide />
      </div>
    </section>
  )
}

export default Section1
