'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Map, ChevronRight } from 'lucide-react'

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

export default function SearchSection() {
  const [selectedRegion, setSelectedRegion] = useState<string>('')
  const [selectedDistrict, setSelectedDistrict] = useState<string>('')
  const router = useRouter()

  const handleRegionClick = () => {
    // 새로운 페이지로 이동
    router.push('/region-select')
  }

  const displayText = selectedDistrict || '지역선택'

  return (
    <>
      <section className="bg-gray-50 px-4 py-8">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-medium text-center text-gray-900 mb-6">
            어디로 갈까요?
          </h2>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <button 
                onClick={handleRegionClick}
                className="w-full flex items-center bg-white rounded-lg border-2 border-gray-300 px-4 py-3 shadow-md hover:border-gray-400 transition-all duration-200"
              >
                <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                <span className={`${selectedDistrict ? 'text-gray-900' : 'text-gray-500'}`}>
                  {displayText}
                </span>
                <div className="ml-auto">
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            </div>
            <button className="bg-white rounded-lg border-2 border-gray-300 p-3 shadow-md hover:border-gray-400 transition-all duration-200">
              <Map className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </section>
    </>
  )
}