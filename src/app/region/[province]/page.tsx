// app/region/[province]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { MapPin, Star, Users, TrendingUp } from 'lucide-react'
import { 
  getProvinceData, 
  massageTypes,
  provinces
} from '@/lib/seoData'

interface PageParams {
  province: string
}

// 메타데이터 생성
export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { province: provinceId } = await params
  const province = getProvinceData(provinceId)

  if (!province) {
    return {
      title: '페이지를 찾을 수 없습니다 | 비비막',
    }
  }

  const title = `${province.name} 마사지샵 추천 | 비비막`
  const description = `${province.name} 전 지역 검증된 마사지샵 정보. ${province.cities.map(c => c.displayName).join(', ')} 지역의 스웨디시, 아로마, 타이마사지 전문업체를 찾아보세요.`

  return {
    title,
    description,
    keywords: `${province.name} 마사지, ${province.name} 스웨디시, ${province.name} 아로마, ${province.cities.map(c => c.displayName + ' 마사지').join(', ')}`,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'ko_KR',
    },
    alternates: {
      canonical: `/region/${provinceId}`,
    },
  }
}

// 정적 경로 생성
export async function generateStaticParams() {
  return provinces.map(province => ({
    province: province.id,
  }))
}

export default async function RegionLandingPage({ params }: { params: Promise<PageParams> }) {
  const { province: provinceId } = await params
  const province = getProvinceData(provinceId)

  if (!province) {
    notFound()
  }

  // 주요 마사지 타입 (우선순위 1, 2만)
  const majorMassageTypes = massageTypes.filter(type => type.priority <= 2)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* 헤더 섹션 */}
        <div className="mb-12">
          <nav className="text-sm text-gray-500 mb-4">
            <span>홈</span> &gt; <span>{province.name}</span>
          </nav>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {province.name} 마사지샵
          </h1>
          
          <p className="text-gray-600 text-lg mb-8">
            {province.name} 전 지역의 검증된 마사지샵을 찾아보세요. 
            실시간 예약과 실제 후기로 안전하고 만족스러운 마사지를 경험하실 수 있습니다.
          </p>

          {/* 통계 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{province.cities.length}</div>
              <div className="text-gray-600 text-sm">서비스 지역</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">4.7</div>
              <div className="text-gray-600 text-sm">평균 별점</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">1,200+</div>
              <div className="text-gray-600 text-sm">등록 업체</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">50K+</div>
              <div className="text-gray-600 text-sm">월 이용자</div>
            </div>
          </div>
        </div>

        {/* 지역별 마사지샵 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{province.name} 지역별 마사지샵</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {province.cities.map((city) => (
              <Link
                key={city.id}
                href={`/massage-promotion?region=${province.id}&district=${city.id}`}
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow text-center group"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {city.displayName}
                </h3>
                <p className="text-gray-500 text-sm mt-1">마사지샵 보기</p>
              </Link>
            ))}
          </div>
        </section>

        {/* 마사지 타입별 링크 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{province.name} 인기 마사지 종류</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {majorMassageTypes.map((type) => (
              <div key={type.id} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{type.displayName}</h3>
                <p className="text-gray-600 mb-4">{type.description}</p>
                
                <div className="grid grid-cols-2 gap-2">
                  {province.cities.slice(0, 6).map((city) => (
                    <Link
                      key={`${city.id}-${type.id}`}
                      href={`/massage-promotion?region=${province.id}&district=${city.id}&theme=${type.id}`}
                      className="px-3 py-2 text-sm border border-gray-200 rounded hover:border-gray-300 hover:bg-gray-50 text-center transition-colors"
                    >
                      {city.displayName} {type.displayName}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SEO 콘텐츠 */}
        <section className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {province.name} 마사지 이용 가이드
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">주요 특징</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• {province.name} 전 지역 서비스 가능</li>
                <li>• 검증된 업체만 엄선하여 안전 보장</li>
                <li>• 실시간 예약 시스템으로 편리한 이용</li>
                <li>• 다양한 마사지 종류 선택 가능</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">이용 혜택</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 신규 가입 시 할인 쿠폰 제공</li>
                <li>• 리뷰 작성 시 적립금 지급</li>
                <li>• 단골 고객 특별 혜택</li>
                <li>• 24시간 고객지원 서비스</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}