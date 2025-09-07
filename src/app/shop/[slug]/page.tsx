// app/shop/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Star, MapPin, Clock, Phone, Heart } from 'lucide-react'
import { 
  getCityData, 
  getProvinceData, 
  getMassageTypeData,
  generateMajorCombinations,
  getCityName,
  getTypeName,
  getProvinceName
} from '@/lib/seoData'

interface PageParams {
  slug: string
}

interface MassageShop {
  id: number
  name: string
  address: string
  rating: number
  reviewCount: number
  price: string
  image: string
  openTime: string
  phone: string
  services: string[]
}

// 메타데이터 생성
export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { slug } = await params
  const slugParts = slug.split('-')
  
  if (slugParts.length !== 3) {
    return {
      title: '페이지를 찾을 수 없습니다 | 비비막',
    }
  }

  const [provinceId, cityId, typeId] = slugParts
  const city = getCityData(cityId)
  const type = getMassageTypeData(typeId)
  const province = getProvinceData(provinceId)

  if (!city || !type || !province) {
    return {
      title: '페이지를 찾을 수 없습니다 | 비비막',
    }
  }

  const title = `${city.displayName} ${type.displayName} 마사지샵 추천 | 비비막`
  const description = `${city.displayName} 지역 검증된 ${type.displayName} 마사지샵 정보. 실시간 예약, 리뷰, 가격 비교로 최적의 선택을 하세요. ${type.description}`

  return {
    title,
    description,
    keywords: `${city.displayName} ${type.displayName}, ${city.name} 마사지, ${type.displayName} 마사지, ${province.name} 마사지샵, ${city.displayName} 마사지 예약`,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'ko_KR',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `/massage/${slug}`,
    },
  }
}

// 정적 경로 생성
export async function generateStaticParams() {
  const majorCombinations = generateMajorCombinations()
  
  return majorCombinations.map(slug => ({
    slug,
  }))
}

// 샘플 데이터 (실제로는 API에서 가져와야 함)
function getMockMassageShops(cityId: string, typeId: string): MassageShop[] {
  const cityName = getCityName(cityId)
  const typeName = getTypeName(typeId)
  
  return [
    {
      id: 1,
      name: `${cityName} 프리미엄 ${typeName} 스파`,
      address: `${cityName} 메인로드 123`,
      rating: 4.8,
      reviewCount: 156,
      price: '80,000원~',
      image: '/api/placeholder/300/200',
      openTime: '09:00 - 22:00',
      phone: '02-1234-5678',
      services: [typeName, '전신마사지', '반신마사지']
    },
    {
      id: 2,
      name: `힐링 ${typeName} 테라피`,
      address: `${cityName} 중앙대로 456`,
      rating: 4.6,
      reviewCount: 89,
      price: '70,000원~',
      image: '/api/placeholder/300/200',
      openTime: '10:00 - 23:00',
      phone: '02-2345-6789',
      services: [typeName, '커플마사지', '개인실']
    },
    {
      id: 3,
      name: `${cityName} ${typeName} 전문점`,
      address: `${cityName} 번화가 789`,
      rating: 4.7,
      reviewCount: 234,
      price: '90,000원~',
      image: '/api/placeholder/300/200',
      openTime: '11:00 - 24:00',
      phone: '02-3456-7890',
      services: [typeName, '핫스톤', '아로마테라피']
    }
  ]
}

export default async function MassageThemePage({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params
  const slugParts = slug.split('-')
  
  if (slugParts.length !== 3) {
    notFound()
  }

  const [provinceId, cityId, typeId] = slugParts
  const city = getCityData(cityId)
  const type = getMassageTypeData(typeId)
  const province = getProvinceData(provinceId)

  if (!city || !type || !province) {
    notFound()
  }

  const massageShops = getMockMassageShops(cityId, typeId)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* 헤더 섹션 */}
        <div className="mb-8">
          <nav className="text-sm text-gray-500 mb-4">
            <span>홈</span> &gt; <span>{province.name}</span> &gt; <span>{city.displayName}</span> &gt; <span>{type.displayName}</span>
          </nav>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {city.displayName} {type.displayName} 마사지샵
          </h1>
          
          <p className="text-gray-600 text-lg mb-6">
            {city.displayName}에서 검증된 {type.displayName} 마사지샵을 찾아보세요. 
            실시간 예약과 실제 후기로 안전하고 만족스러운 마사지를 경험하실 수 있습니다.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <h2 className="font-semibold text-blue-900 mb-2">{type.displayName} 마사지란?</h2>
            <p className="text-blue-800 text-sm">{type.description}</p>
          </div>
        </div>

        {/* 필터 & 정렬 */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">전체</button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">높은 평점순</button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">리뷰 많은순</button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">가격 낮은순</button>
            </div>
            <span className="text-sm text-gray-500">총 {massageShops.length}개 업체</span>
          </div>
        </div>

        {/* 마사지샵 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {massageShops.map((shop) => (
            <div key={shop.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img 
                  src={shop.image} 
                  alt={shop.name}
                  className="w-full h-48 object-cover"
                />
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                  <Heart className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{shop.name}</h3>
                
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{shop.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({shop.reviewCount})</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{shop.address}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Clock className="w-4 h-4" />
                  <span>{shop.openTime}</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {shop.services.map((service, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      {service}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-blue-600">{shop.price}</span>
                  <div className="flex gap-2">
                    <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                      <Phone className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                      예약하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SEO 콘텐츠 섹션 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {city.displayName} {type.displayName} 마사지 이용 가이드
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg text-gray-900 mb-3">예약 시 체크포인트</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 업체의 인증 및 허가 여부 확인</li>
                <li>• 실제 후기와 평점 검토</li>
                <li>• 가격 및 서비스 내용 사전 확인</li>
                <li>• 위생 및 청결 상태 점검</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg text-gray-900 mb-3">{city.displayName} 교통 정보</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 지하철 및 버스 접근성 우수</li>
                <li>• 주차 시설 완비된 업체 다수</li>
                <li>• 택시 이용 시 평균 소요시간 안내</li>
                <li>• 주요 랜드마크 인근 위치</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 관련 지역 링크 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">다른 지역 {type.displayName} 마사지</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {province.cities.filter(c => c.id !== cityId).slice(0, 8).map((relatedCity) => (
              <a
                key={relatedCity.id}
                href={`/massage/${provinceId}-${relatedCity.id}-${typeId}`}
                className="px-3 py-2 border border-gray-200 rounded hover:border-gray-300 hover:bg-gray-50 text-center text-sm transition-colors"
              >
                {relatedCity.displayName} {type.displayName}
              </a>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}