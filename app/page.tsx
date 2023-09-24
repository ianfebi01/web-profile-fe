import PersonImage from '@/components/Atoms/PersonImage'
import TextBackground from '@/components/Atoms/TextBackground'
import Navbar from '@/components/Molecules/Navbar'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="main">
      <Navbar />
      <section className="main__section h-[487px] bg-dark">
        <div className="main__container mt-4 relative overflow-hidden">
          <div>
            <p>Ian Febi Sastrataruna</p>
            <a href="mailto:ianfebi01@gmail.com" className="text-white-overlay">
              ianfebi01@gmail.com
            </a>
          </div>
          <TextBackground />

          <PersonImage />
        </div>
      </section>
      <div className="main__section h-[464px] bg-dark-secondary">
        <div className="main__container mt-16">aksjdnkasd</div>
      </div>
      <div className="main__section h-[821px] bg-dark">
        <div className="main__container mt-16">aksjdnkasd</div>
      </div>
    </main>
  )
}
