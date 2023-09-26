import PersonImage from '@/components/Atoms/PersonImage'
import Shape from '@/components/Atoms/Shape'
import TextBackground from '@/components/Atoms/TextBackground'
import TextSide from '@/components/Atoms/TextSide'
import Navbar from '@/components/Molecules/Navbar'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="main">
      <Navbar />
      {/* @ NOTE Section 1 */}
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
      <section id="quote" className="main__section h-[464px] bg-dark-secondary">
        <div className="main__container mt-16">aksjdnkasd</div>
      </section>
      <section id="portofolio" className="main__section h-[821px] bg-dark">
        <div className="main__container mt-16">aksjdnkasd</div>
      </section>
    </main>
  )
}
