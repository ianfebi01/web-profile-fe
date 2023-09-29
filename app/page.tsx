import Navbar from '@/components/Molecules/Navbar'
import Section1 from '@/components/Organisms/Home/Section1'
import Section2 from '@/components/Organisms/Home/Section2'
import Section3 from '@/components/Organisms/Home/Section3'
import Section4 from '@/components/Organisms/Home/Section4'

export default function Home() {
  return (
    <main className="main">
      <Navbar />
      {/* @ NOTE Section 1 */}
      <Section1 />
      {/* @ NOTE Section 2 */}
      <Section2 />
      {/* @ NOTE Section 3 */}
      <Section3 />
      {/* @ NOTE Section 4 */}
      <Section4 />
    </main>
  )
}
