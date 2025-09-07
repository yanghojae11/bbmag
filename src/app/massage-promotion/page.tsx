'use client'

import { ArrowLeft, Star, MapPin, Clock, Filter, Loader2, ChevronDown, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'

interface MassageShop {
  id: number
  name: string
  location: string
  distance: string
  rating: number
  reviews: number
  price: string
  originalPrice?: string
  discount?: number
  image: string
  services: string[]
  openTime: string
  badge?: string
}

// 지역 데이터
const regions = [
  { id: 'all', name: '전국' },
  { id: 'seoul', name: '서울' },
  { id: 'gyeonggi', name: '경기' },
  { id: 'incheon', name: '인천' },
  { id: 'daejeon', name: '대전' },
  { id: 'gwangju', name: '광주' },
  { id: 'chungbuk', name: '충북' },
  { id: 'chungnam', name: '충남' },
  { id: 'gyeongbuk', name: '경북' },
  { id: 'gyeongnam', name: '경남' },
  { id: 'jeonbuk', name: '전북' },
  { id: 'jeonnam', name: '전남' },
  { id: 'ulsan', name: '울산' },
  { id: 'daegu', name: '대구' },
  { id: 'busan', name: '부산' },
  { id: 'jeju', name: '제주' }
]

// 서울 세부 지역
const seoulDistricts = [
  { id: 'all', name: '전체' },
  { id: 'gangnam', name: '강남' },
  { id: 'gangdong', name: '강동' },
  { id: 'mapo', name: '마포' },
  { id: 'seocho', name: '서초' },
  { id: 'seongdong', name: '성동' },
  { id: 'songpa', name: '송파' },
  { id: 'dongdaemun', name: '동대문' },
  { id: 'jongno', name: '종로' },
  { id: 'jung', name: '중구' },
  { id: 'yongsan', name: '용산' },
  { id: 'yeongdeungpo', name: '영등포' },
  { id: 'gwanak', name: '관악' },
  { id: 'jamsil', name: '잠실' },
  { id: 'hongdae', name: '홍대' },
  { id: 'gangbuk', name: '강북' },
  { id: 'nowon', name: '노원' },
  { id: 'dobong', name: '도봉' },
  { id: 'eunpyeong', name: '은평' },
  { id: 'seodaemun', name: '서대문' }
]

// 테마 데이터 (FeatureIcons와 동일하게 수정)
const themes = [
  { id: 'all', name: '전체' },
  { id: 'new', name: '신규' },
  { id: 'swedish', name: '스웨디시' },
  { id: 'aroma', name: '아로마' },
  { id: 'thai', name: '타이마사지' },
  { id: '1person', name: '1인샵' },
  { id: 'spa', name: '스파테라피' },
  { id: 'couple', name: '커플마사지' },
  { id: '24h', name: '홈케어' }
]

// 초기 마사지샵 데이터
const initialMassageShops: MassageShop[] = [
  {
    id: 1,
    name: '바인 프리미엄 스웨디시',
    location: '강남구 역삼동',
    distance: '1.2km',
    rating: 4.8,
    reviews: 1234,
    price: '90,000',
    originalPrice: '120,000',
    discount: 25,
    image: '/images/shops/shop-1.jpg',
    services: ['스웨디시', '아로마', '딥티슈'],
    openTime: '09:00 - 24:00',
    badge: '인기'
  },
  {
    id: 2,
    name: '힐링타임 아로마테라피',
    location: '서초구 서초동',
    distance: '2.1km',
    rating: 4.7,
    reviews: 892,
    price: '120,000',
    image: '/images/shops/shop-2.jpg',
    services: ['아로마', '핫스톤', '커플'],
    openTime: '10:00 - 22:00'
  },
  {
    id: 3,
    name: '릴렉스 딥티슈 마사지',
    location: '강남구 논현동',
    distance: '800m',
    rating: 4.6,
    reviews: 567,
    price: '85,000',
    originalPrice: '100,000',
    discount: 15,
    image: '/images/shops/shop-3.jpg',
    services: ['딥티슈', '스포츠', '재활'],
    openTime: '09:00 - 23:00',
    badge: '신규'
  },
  {
    id: 4,
    name: '스파 앤 웰니스',
    location: '서초구 반포동',
    distance: '1.8km',
    rating: 4.9,
    reviews: 2341,
    price: '150,000',
    image: '/images/shops/shop-4.jpg',
    services: ['스파', '전신', '페이셜'],
    openTime: '08:00 - 22:00',
    badge: 'BEST'
  },
  {
    id: 5,
    name: '24시간 마사지샵',
    location: '강남구 삼성동',
    distance: '3.2km',
    rating: 4.5,
    reviews: 1876,
    price: '70,000',
    image: '/images/shops/shop-5.jpg',
    services: ['24시간', '스웨디시', '타이'],
    openTime: '24시간',
    badge: '24H'
  }
]

// 추가 더미 데이터 생성 함수
const generateMoreShops = (startId: number): MassageShop[] => {
  const names = [
    '스파 센터', '힐링 테라피', '릴렉스 마사지', '웰빙 스파', '아로마 하우스',
    '딥릴렉스 센터', '프리미엄 스파', '케어 마사지', '바디 힐링', '스웨디시 전문점'
  ]
  
  const locations = [
    '강남구 역삼동', '서초구 서초동', '강남구 논현동', '서초구 반포동', 
    '강남구 삼성동', '서초구 방배동', '강남구 도곡동', '서초구 잠원동'
  ]

  return Array.from({ length: 10 }, (_, i) => {
    const hasDiscount = Math.random() > 0.6
    const originalPriceValue = Math.floor(Math.random() * 30 + 100)
    const discountPercent = Math.floor(Math.random() * 30 + 10)
    const finalPrice = hasDiscount ? Math.floor(originalPriceValue * (1 - discountPercent / 100)) : Math.floor(Math.random() * 50 + 70)
    
    return {
      id: startId + i,
      name: `${names[i]} ${startId + i}점`,
      location: locations[i % locations.length],
      distance: `${(Math.random() * 3 + 0.5).toFixed(1)}km`,
      rating: Number((Math.random() * 0.5 + 4.3).toFixed(1)),
      reviews: Math.floor(Math.random() * 2000 + 100),
      price: `${finalPrice}000`,
      originalPrice: hasDiscount ? `${originalPriceValue}000` : undefined,
      discount: hasDiscount ? discountPercent : undefined,
      image: `/images/shops/shop-${((startId + i - 1) % 5) + 1}.jpg`,
      services: ['스웨디시', '아로마', '딥티슈', '타이', '핫스톤'].slice(0, Math.floor(Math.random() * 3 + 2)),
      openTime: Math.random() > 0.7 ? '24시간' : '09:00 - 23:00',
      badge: Math.random() > 0.8 ? ['인기', '신규', 'BEST'][Math.floor(Math.random() * 3)] : undefined
    }
  })
}

export default function MassagePromotionDetail() {
  const router = useRouter()
  const [massageShops, setMassageShops] = useState<MassageShop[]>(initialMassageShops)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)

  // 필터 상태
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [selectedDistrict, setSelectedDistrict] = useState('all')
  const [selectedTheme, setSelectedTheme] = useState('all')
  const [showRegionDropdown, setShowRegionDropdown] = useState(false)
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false)
  const [showThemeDropdown, setShowThemeDropdown] = useState(false)

  // 무한 스크롤 로딩 함수
  const loadMoreShops = useCallback(async () => {
    if (loading || !hasMore) return
    
    setLoading(true)
    
    // 실제 API 호출을 시뮬레이션 (1초 딜레이)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newShops = generateMoreShops(massageShops.length + 1)
    setMassageShops(prev => [...prev, ...newShops])
    setPage(prev => prev + 1)
    
    // 5페이지 이후에는 더 이상 로딩하지 않음
    if (page >= 5) {
      setHasMore(false)
    }
    
    setLoading(false)
  }, [loading, hasMore, page, massageShops.length])

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop 
          >= document.documentElement.offsetHeight - 1000) {
        loadMoreShops()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loadMoreShops])

  // URL 파라미터로 필터 자동 설정
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const regionParam = urlParams.get('region')
    const districtParam = urlParams.get('district')
    const themeParam = urlParams.get('theme') // 테마 파라미터 추가
    
    if (regionParam) {
      setSelectedRegion(regionParam)
    }
    
    if (districtParam && regionParam === 'seoul') {
      setSelectedDistrict(districtParam)
    }
    
    if (themeParam) { // 테마 파라미터 처리
      setSelectedTheme(themeParam)
    }
  }, [])

  // 지역 선택 핸들러
  const handleRegionSelect = (regionId: string) => {
    setSelectedRegion(regionId)
    setSelectedDistrict('all') // 지역 변경시 세부 지역 초기화
    setShowRegionDropdown(false)
  }

  // 세부 지역 선택 핸들러
  const handleDistrictSelect = (districtId: string) => {
    setSelectedDistrict(districtId)
    setShowDistrictDropdown(false)
  }

  // 테마 선택 핸들러
  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId)
    setShowThemeDropdown(false)
  }

  const getRegionName = (id: string) => regions.find(r => r.id === id)?.name || '전국'
  const getDistrictName = (id: string) => seoulDistricts.find(d => d.id === id)?.name || '전체'
  const getThemeName = (id: string) => themes.find(t => t.id === id)?.name || '전체'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          
          <h1 className="text-lg font-medium text-gray-900">
            마사지샵 찾기
          </h1>
          
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Search className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* 데스크톱 필터 */}
        <div className="hidden md:block border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              {/* 지역 필터 */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowRegionDropdown(!showRegionDropdown)
                    setShowDistrictDropdown(false)
                    setShowThemeDropdown(false)
                  }}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 min-w-32 bg-white"
                >
                  <span>{getRegionName(selectedRegion)}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showRegionDropdown && (
                  <div className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-30 w-96">
                    <div className="grid grid-cols-4 gap-1 p-3">
                      {regions.map((region) => (
                        <button
                          key={region.id}
                          onClick={() => handleRegionSelect(region.id)}
                          className={`px-3 py-2 text-sm rounded hover:bg-gray-100 text-center transition-colors ${
                            selectedRegion === region.id ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                          }`}
                        >
                          {region.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 서울 세부 지역 필터 (서울 선택시만 표시) */}
              {selectedRegion === 'seoul' && (
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowDistrictDropdown(!showDistrictDropdown)
                      setShowRegionDropdown(false)
                      setShowThemeDropdown(false)
                    }}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 min-w-32 bg-white"
                  >
                    <span>{getDistrictName(selectedDistrict)}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  
                  {showDistrictDropdown && (
                    <div className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-30 w-80">
                      <div className="grid grid-cols-4 gap-1 p-3 max-h-64 overflow-y-auto">
                        {seoulDistricts.map((district) => (
                          <button
                            key={district.id}
                            onClick={() => handleDistrictSelect(district.id)}
                            className={`px-3 py-2 text-sm rounded hover:bg-gray-100 text-center transition-colors ${
                              selectedDistrict === district.id ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                            }`}
                          >
                            {district.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 테마 필터 */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowThemeDropdown(!showThemeDropdown)
                    setShowRegionDropdown(false)
                    setShowDistrictDropdown(false)
                  }}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 min-w-32 bg-white"
                >
                  <span className="truncate max-w-32">{getThemeName(selectedTheme)}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showThemeDropdown && (
                  <div className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-30 w-96">
                    <div className="grid grid-cols-3 gap-1 p-3 max-h-64 overflow-y-auto">
                      {themes.map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() => handleThemeSelect(theme.id)}
                          className={`px-3 py-2 text-sm rounded hover:bg-gray-100 text-center transition-colors ${
                            selectedTheme === theme.id ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                          }`}
                        >
                          {theme.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 모바일 필터 */}
        <div className="md:hidden border-t border-gray-200 p-4">
          <div className="grid grid-cols-3 gap-2">
            {/* 지역 필터 */}
            <div className="relative">
              <button
                onClick={() => setShowRegionDropdown(!showRegionDropdown)}
                className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <span>{getRegionName(selectedRegion)}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showRegionDropdown && (
                <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-30">
                  <div className="max-h-48 overflow-y-auto p-2">
                    {regions.map((region) => (
                      <button
                        key={region.id}
                        onClick={() => handleRegionSelect(region.id)}
                        className={`w-full px-3 py-2 text-sm rounded hover:bg-gray-100 text-left ${
                          selectedRegion === region.id ? 'bg-blue-50 text-blue-600' : ''
                        }`}
                      >
                        {region.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 세부 지역 (서울 선택시만) */}
            {selectedRegion === 'seoul' ? (
              <div className="relative">
                <button
                  onClick={() => setShowDistrictDropdown(!showDistrictDropdown)}
                  className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <span>{getDistrictName(selectedDistrict)}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showDistrictDropdown && (
                  <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-30">
                    <div className="max-h-48 overflow-y-auto p-2">
                      {seoulDistricts.slice(0, 10).map((district) => (
                        <button
                          key={district.id}
                          onClick={() => handleDistrictSelect(district.id)}
                          className={`w-full px-3 py-2 text-sm rounded hover:bg-gray-100 text-left ${
                            selectedDistrict === district.id ? 'bg-blue-50 text-blue-600' : ''
                          }`}
                        >
                          {district.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div></div>
            )}

            {/* 테마 필터 */}
            <div className="relative">
              <button
                onClick={() => setShowThemeDropdown(!showThemeDropdown)}
                className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <span className="truncate">{getThemeName(selectedTheme)}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showThemeDropdown && (
                <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-30">
                  <div className="max-h-48 overflow-y-auto p-2">
                    {themes.slice(0, 10).map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => handleThemeSelect(theme.id)}
                        className={`w-full px-3 py-2 text-sm rounded hover:bg-gray-100 text-left ${
                          selectedTheme === theme.id ? 'bg-blue-50 text-blue-600' : ''
                        }`}
                      >
                        {theme.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 프로모션 설명 */}
      <div className="bg-blue-50 px-4 py-4 border-b">
        <div className="flex items-start gap-3">
          <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded font-medium">
            특가
          </div>
          <div>
            <h2 className="font-medium text-gray-900 mb-1">
              늦은 체크아웃이 무료인 마사지샵 특가
            </h2>
            <p className="text-sm text-gray-600">
              여유로운 퇴실로 편하게 즐겨요!
            </p>
          </div>
        </div>
      </div>

      {/* 마사지샵 리스트 */}
      <div className="px-4 py-4 space-y-4">
        {massageShops.map((shop) => (
          <Link key={shop.id} href={`/massage/${shop.id}`}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex">
                {/* 이미지 */}
                <div className="relative w-24 h-20 flex-shrink-0">
                  <Image
                    src={shop.image}
                    alt={shop.name}
                    fill
                    className="object-cover"
                  />
                  {shop.badge && (
                    <div className="absolute top-1 left-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded">
                      {shop.badge}
                    </div>
                  )}
                </div>

                {/* 정보 */}
                <div className="flex-1 p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm mb-1">
                        {shop.name}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                        <MapPin className="w-3 h-3" />
                        <span>{shop.location}</span>
                        <span>·</span>
                        <span>{shop.distance}</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                        <Clock className="w-3 h-3" />
                        <span>{shop.openTime}</span>
                      </div>

                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium text-gray-900">
                          {shop.rating}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({shop.reviews.toLocaleString()})
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {shop.services.map((service, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 가격 */}
                    <div className="text-right ml-2">
                      {shop.discount && (
                        <div className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded mb-1">
                          {shop.discount}%
                        </div>
                      )}
                      {shop.originalPrice && (
                        <div className="text-xs text-gray-400 line-through">
                          {shop.originalPrice}원
                        </div>
                      )}
                      <div className="font-bold text-gray-900">
                        {shop.price}원~
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 로딩 인디케이터 */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          <span className="ml-2 text-sm text-gray-500">더 많은 마사지샵을 불러오는 중...</span>
        </div>
      )}

      {/* 더 이상 데이터가 없을 때 */}
      {!hasMore && (
        <div className="text-center py-8">
          <p className="text-sm text-gray-500">모든 마사지샵을 확인했습니다</p>
        </div>
      )}
    </div>
  )
}