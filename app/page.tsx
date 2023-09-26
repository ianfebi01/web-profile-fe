import PersonImage from '@/components/Atoms/PersonImage'
import Shape from '@/components/Atoms/Shape'
import TextBackground from '@/components/Atoms/TextBackground'
import TextSide from '@/components/Atoms/TextSide'
import Navbar from '@/components/Molecules/Navbar'
import Section1 from '@/components/Organisms/Home/Section1'
import Section2 from '@/components/Organisms/Home/Section2'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="main">
      <Navbar />
      {/* @ NOTE Section 1 */}
      <Section1 />
      {/* @ NOTE Section 2 */}
      <Section2 />

      <section id="portofolio" className="main__section h-[821px] bg-dark">
        <div className="main__container mt-16">aksjdnkasd</div>
      </section>
    </main>
  )
}
