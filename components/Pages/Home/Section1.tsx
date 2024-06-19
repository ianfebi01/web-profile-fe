import Shape from '@/components/Shape'
import { IApiProfile } from '@/types/api/profile'
import Image from 'next/image'
import { FunctionComponent } from 'react'

interface Props {
  profile: IApiProfile
}

const Section1: FunctionComponent<Props> = ( props ) => {
  const { profile } = props

  return (
    <section
      id="home"
      className="main__section transition-default bg-dark relative  mt-24 sm:mt-20"
    >
      <Shape />
      <div className="flex w-full h-48 relative">
        <div className="aspect-square w-48 border rounded-full overflow-hidden inset-x-0 mx-auto absolute -bottom-24">
          <Image
            src={profile.personImage as string}
            alt="Profile image"
            fill
            priority
            sizes="auto"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="w-full grow-[1] max-w-4xl relative overflow-hidden mt-28 mb-8">
        <p className="text-center text-display-xs-medium">
              A frontend developer with pixel-perfect mindset, I am committed to
              creating software that is simple, robust, and easy to maintain at a
              fast pace. I have a proven track record of reducing complexity and
              improving the clarity of codebases. With an open mind and unbiased
              approach, I excel in brainstorming sessions, mentoring, and code
              reviews. I take pleasure in hands-on problem-solving.
        </p>
      </div>
    </section>
  )
}

export default Section1
