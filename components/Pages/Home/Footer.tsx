'use client'
import LinkOpenNewTab from '@/components/Buttons/LinkOpenNewTab'
import InstagramIcon from '@/components/Icons/InstagramIcon'
import LinkedinIcon from '@/components/Icons/LinkedinIcon'
import CopyToClipboard from '@/components/Inputs/CopyToClipboard'
import { scalePow } from 'd3-scale'
import Image from 'next/image'
import { useRef } from 'react'

const Footer = ( {
  myposy = 0,
  winheight = 0,
}: {
  myposy?: number
  winheight?: number
} ) => {
  const ref = useRef<HTMLElement>( null )

  const translate = scalePow().domain( [0, 2000] ).range( [78, 400] )
  const opacity = scalePow()
    .domain( [ref.current?.offsetHeight ? ref.current?.offsetHeight - 40 : 0, 0] )
    .range( [0, 1] )

  return (
    <section
      id="footer"
      ref={ref}
      className="main__section h-fit bg-dark overflow-hidden"
      style={{
        opacity : opacity.exponent( 1 )(
          myposy - ( winheight - ( ref.current?.offsetHeight || 0 ) )
        ),
      }}
    >
      <div
        className="main__container my-8 h-full"
        style={{
          transform : `translate(0, ${translate.exponent( 1 )( -myposy || 0 )}px)`,
        }}
      >
        <div className="w-fit mx-auto mb-4">
          <div className="flex flex-col gap-2 max-w-2xl items-center text-center">
            <Image src="/Logo.svg"
              alt="Logo image"
              width={40}
              height={40}
            />
            <h2 className="text-lg">Ian Febi Sastrataruna</h2>
            <p className="text-white/75">
              RT 02, RW 15, Semuluhkidul, Ngeposari, Semanu, Gunungkidul,
              Yogyakarta, Indonesia.
            </p>
          </div>
        </div>

        <div className="text-lg flex gap-4 text-center w-full justify-center flex-wrap">
          <LinkOpenNewTab
            url={'https://www.instagram.com/ianfebi01/'}
            label={'Instagram'}
            className="text-md"
            icon={<InstagramIcon size={20} />}
          />
          •
          <LinkOpenNewTab
            url={'https://www.linkedin.com/in/ian-febi-sastrataruna-895598149/'}
            label={'LinkedIn'}
            className="text-md"
            icon={<LinkedinIcon size={20} />}
          />
          •
          {/* <LinkOpenNewTab
            url={'mailto:ianfebi01@gmail.com'}
            label={'Email'}
            className="text-md"
            icon={<EnvelopSimpleIcon size={20} />}
          /> */}
          <div className=" flex flex-row items-center gap-2">
            <CopyToClipboard
              copyText="ianfebi01@gmail.com"
              className="text-md"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
