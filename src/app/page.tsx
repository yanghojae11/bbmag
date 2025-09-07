import Header from '@/components/Header'
import SearchSection from '@/components/SearchSection'
import FeatureIcons from '@/components/FeatureIcons'
import Banner from '@/components/Banner'
import PopularHotels from '@/components/PopularHotels'
import PromoCards from '@/components/PromoCards'
import CommunityPreview from '@/components/CommunityPreview'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pb-6">
        <SearchSection />
        <FeatureIcons />
        <Banner />
        <PopularHotels />
        <PromoCards />
        <CommunityPreview />
      </main>
      <Footer />
    </div>
  )
}