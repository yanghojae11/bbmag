'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, X } from 'lucide-react'

interface Region {
  id: string
  name: string
  districts: string[]
}

const regions: Region[] = [
  {
    id: 'seoul',
    name: '서울',
    districts: [
      '강남/역삼/삼성/논현',
      '서초/신사/방배',
      '강서/마곡',
      '강북/성북/노원',
      '강동/광진/성동',
      '영등포/여의도',
      '신촌/서대문/마포/홍대',
      '전국/건국대/왕십리/성수',
      '종로/중구/명동',
      '잠실/송파/강동',
      '구로/금천/관악',
      '동대문/중랑/도봉',
      '은평/서대문',
      '용산'
    ]
  },
  {
    id: 'gyeonggi',
    name: '경기',
    districts: [
      '수원/영통/광교',
      '성남/분당/판교',
      '고양/일산/킨텍스',
      '용인/기흥/수지',
      '안양/평촌/인덕원',
      '부천/중동/상동',
      '의정부/회룡/민락',
      '안산/중앙/고잔',
      '남양주/다산/별내',
      '화성/동탄/향남',
      '평택/송탄/서정리',
      '시흥/정왕/배곧',
      '군포/산본/금정',
      '하남/미사/풍산',
      '김포/장기/구래',
      '광명/철산/소하',
      '구리/인창/교문',
      '오산/세교/원동',
      '이천/부발/마장',
      '여주/점동/가남',
      '양평/용문/강상',
      '과천/중앙/별양',
      '의왕/내손/고천',
      '파주/운정/교하',
      '양주/회천/덕계',
      '동두천/생연/상봉',
      '포천/소흘/신북',
      '가평/청평/설악',
      '연천/전곡/미산'
    ]
  },
  {
    id: 'busan',
    name: '부산',
    districts: [
      '해운대/센텀시티',
      '서면/부전/양정',
      '남포동/중구/영도',
      '연산/토곡/부산대',
      '사상/김해공항',
      '기장/정관',
      '동래/온천장',
      '광안리/수영',
      '덕천/북구'
    ]
  },
  {
    id: 'daegu',
    name: '대구',
    districts: [
      '동성로/중구',
      '반월당/수성구',
      '동대구역/신천',
      '칠곡/북구',
      '대구공항/동구'
    ]
  },
  {
    id: 'daejeon',
    name: '대전',
    districts: [
      '둔산동/서구',
      '유성/온천',
      '대전역/중구',
      '동구/대동'
    ]
  },
  {
    id: 'gwangju',
    name: '광주',
    districts: [
      '충장로/동구',
      '상무지구/서구',
      '첨단/광산구',
      '남구/북구'
    ]
  }
]

export default function RegionSelectPage() {
  const [activeTab, setActiveTab] = useState<string>('서울')
  const router = useRouter()

  const handleDistrictSelect = (regionName: string, district: string) => {
    // 한글 지역명을 영문 ID로 변환
    const regionMapping: Record<string, string> = {
      '서울': 'seoul',
      '경기': 'gyeonggi', 
      '부산': 'busan',
      '대구': 'daegu',
      '대전': 'daejeon',
      '광주': 'gwangju'
    }
    
    // 구/동명 추출 및 매핑 (서울의 경우만)
    const districtMapping: Record<string, string> = {
      '강남': 'gangnam',
      '서초': 'seocho',
      '송파': 'songpa',
      '강동': 'gangdong',
      '마포': 'mapo',
      '영등포': 'yeongdeungpo',
      '종로': 'jongno',
      '중구': 'jung',
      '용산': 'yongsan',
      '서대문': 'seodaemun',
      '잠실': 'jamsil',
      '홍대': 'hongdae',
      '강북': 'gangbuk',
      '노원': 'nowon',
      '도봉': 'dobong',
      '은평': 'eunpyeong',
      '관악': 'gwanak',
      '동대문': 'dongdaemun',
      '성동': 'seongdong'
    }
    
    const regionId = regionMapping[regionName]
    const mainArea = district.split('/')[0] // 첫 번째 지역명 추출 (예: "강남")
    const districtId = districtMapping[mainArea]
    
    if (regionId && districtId && regionName === '서울') {
      // 서울 + 구별 정보가 있는 경우: massage-promotion 페이지로 필터링된 상태로 이동
      router.push(`/massage-promotion?region=${regionId}&district=${districtId}&area=${encodeURIComponent(district)}`)
    } else if (regionId) {
      // 지역만 있는 경우: massage-promotion 페이지로 지역 필터만 적용
      router.push(`/massage-promotion?region=${regionId}&area=${encodeURIComponent(district)}`)
    } else {
      // 매핑되지 않은 경우 기본 massage-promotion 페이지로
      console.warn(`Unknown region: ${regionName}`)
      router.push('/massage-promotion')
    }
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 모바일 헤더 */}
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <button onClick={handleBack} className="p-2">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-lg font-medium">지역 선택</h1>
          <button onClick={handleBack} className="p-2">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* 모바일 탭 */}
        <div className="flex mt-4 border-b overflow-x-auto">
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => setActiveTab(region.name)}
              className={`flex-shrink-0 px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === region.name
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500'
              }`}
            >
              {region.name}
            </button>
          ))}
        </div>
      </div>

      {/* 데스크톱 레이아웃 */}
      <div className="hidden md:flex h-screen">
        {/* 좌측 사이드바 */}
        <div className="w-64 bg-gray-50 border-r border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">지역 선택</h1>
              <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          <div className="p-4">
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => setActiveTab(region.name)}
                className={`w-full text-left px-4 py-3 mb-1 rounded-lg transition-colors text-sm ${
                  activeTab === region.name
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {region.name}
              </button>
            ))}
          </div>
        </div>

        {/* 우측 메인 콘텐츠 */}
        <div className="flex-1 bg-white">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold">{activeTab}</h2>
            <p className="text-gray-600 text-sm mt-1">원하는 지역을 선택해주세요</p>
          </div>
          <div className="p-6">
            {regions.map((region) => (
              <div 
                key={region.id}
                className={activeTab === region.name ? 'block' : 'hidden'}
              >
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {region.districts.map((district, index) => (
                    <button
                      key={index}
                      onClick={() => handleDistrictSelect(region.name, district)}
                      className="text-left px-4 py-3 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-gray-900 text-sm">{district}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 모바일 콘텐츠 */}
      <div className="md:hidden">
        {regions.map((region) => (
          <div 
            key={region.id}
            className={activeTab === region.name ? 'block' : 'hidden'}
          >
            {region.districts.map((district, index) => (
              <button
                key={index}
                onClick={() => handleDistrictSelect(region.name, district)}
                className="w-full text-left px-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-900">{district}</span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}