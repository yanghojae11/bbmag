// lib/seoData.ts

export interface Province {
  id: string
  name: string
  cities: City[]
}

export interface City {
  id: string
  name: string
  displayName: string
  province: string
}

export interface MassageType {
  id: string
  name: string
  displayName: string
  priority: number
  description: string
}

// 주요 지역 데이터
export const provinces: Province[] = [
  {
    id: 'seoul',
    name: '서울',
    cities: [
      { id: 'gangnam', name: '강남', displayName: '강남구', province: 'seoul' },
      { id: 'songpa', name: '송파', displayName: '송파구', province: 'seoul' },
      { id: 'seocho', name: '서초', displayName: '서초구', province: 'seoul' },
      { id: 'gangdong', name: '강동', displayName: '강동구', province: 'seoul' },
      { id: 'mapo', name: '마포', displayName: '마포구', province: 'seoul' },
      { id: 'yeongdeungpo', name: '영등포', displayName: '영등포구', province: 'seoul' },
      { id: 'jongno', name: '종로', displayName: '종로구', province: 'seoul' },
      { id: 'jung', name: '중구', displayName: '중구', province: 'seoul' },
      { id: 'yongsan', name: '용산', displayName: '용산구', province: 'seoul' },
      { id: 'seodaemun', name: '서대문', displayName: '서대문구', province: 'seoul' }
    ]
  },
  {
    id: 'gyeonggi',
    name: '경기',
    cities: [
      { id: 'suwon', name: '수원', displayName: '수원시', province: 'gyeonggi' },
      { id: 'seongnam', name: '성남', displayName: '성남시', province: 'gyeonggi' },
      { id: 'goyang', name: '고양', displayName: '고양시', province: 'gyeonggi' },
      { id: 'yongin', name: '용인', displayName: '용인시', province: 'gyeonggi' },
      { id: 'anyang', name: '안양', displayName: '안양시', province: 'gyeonggi' },
      { id: 'bucheon', name: '부천', displayName: '부천시', province: 'gyeonggi' },
      { id: 'ansan', name: '안산', displayName: '안산시', province: 'gyeonggi' },
      { id: 'hwaseong', name: '화성', displayName: '화성시', province: 'gyeonggi' }
    ]
  },
  {
    id: 'busan',
    name: '부산',
    cities: [
      { id: 'haeundae', name: '해운대', displayName: '해운대구', province: 'busan' },
      { id: 'busanjin', name: '부산진', displayName: '부산진구', province: 'busan' },
      { id: 'dongrae', name: '동래', displayName: '동래구', province: 'busan' },
      { id: 'nam', name: '남구', displayName: '남구', province: 'busan' },
      { id: 'suyeong', name: '수영', displayName: '수영구', province: 'busan' }
    ]
  },
  {
    id: 'daegu',
    name: '대구',
    cities: [
      { id: 'jung', name: '중구', displayName: '중구', province: 'daegu' },
      { id: 'suseong', name: '수성', displayName: '수성구', province: 'daegu' },
      { id: 'dong', name: '동구', displayName: '동구', province: 'daegu' }
    ]
  },
  {
    id: 'daejeon',
    name: '대전',
    cities: [
      { id: 'seo', name: '서구', displayName: '서구', province: 'daejeon' },
      { id: 'yuseong', name: '유성', displayName: '유성구', province: 'daejeon' },
      { id: 'jung', name: '중구', displayName: '중구', province: 'daejeon' }
    ]
  },
  {
    id: 'gwangju',
    name: '광주',
    cities: [
      { id: 'dong', name: '동구', displayName: '동구', province: 'gwangju' },
      { id: 'seo', name: '서구', displayName: '서구', province: 'gwangju' },
      { id: 'gwangsan', name: '광산', displayName: '광산구', province: 'gwangju' }
    ]
  }
]

// 마사지 테마 데이터
export const massageTypes: MassageType[] = [
  {
    id: 'swedish',
    name: 'swedish',
    displayName: '스웨디시',
    priority: 1,
    description: '전신 마사지의 대표격인 스웨디시 마사지로 근육 이완과 혈액 순환 개선에 효과적입니다.'
  },
  {
    id: 'aroma',
    name: 'aroma',
    displayName: '아로마',
    priority: 1,
    description: '천연 에센셜 오일을 사용한 아로마테라피로 심신 안정과 스트레스 해소에 도움을 줍니다.'
  },
  {
    id: 'thai',
    name: 'thai',
    displayName: '타이마사지',
    priority: 2,
    description: '태국 전통 마사지 기법으로 스트레칭과 지압을 결합하여 몸의 균형을 맞춰줍니다.'
  },
  {
    id: 'sports',
    name: 'sports',
    displayName: '스포츠마사지',
    priority: 2,
    description: '운동 전후 근육 관리에 특화된 마사지로 부상 예방과 회복에 효과적입니다.'
  },
  {
    id: 'couple',
    name: 'couple',
    displayName: '커플마사지',
    priority: 3,
    description: '연인이나 부부가 함께 받는 마사지로 특별한 시간을 만들어드립니다.'
  }
]

// 헬퍼 함수들
export function getCityData(cityId: string): City | undefined {
  for (const province of provinces) {
    const city = province.cities.find(c => c.id === cityId)
    if (city) return city
  }
  return undefined
}

export function getProvinceData(provinceId: string): Province | undefined {
  return provinces.find(p => p.id === provinceId)
}

export function getMassageTypeData(typeId: string): MassageType | undefined {
  return massageTypes.find(t => t.id === typeId)
}

export function getCityName(cityId: string): string {
  const city = getCityData(cityId)
  return city ? city.displayName : cityId
}

export function getTypeName(typeId: string): string {
  const type = getMassageTypeData(typeId)
  return type ? type.displayName : typeId
}

export function getProvinceName(provinceId: string): string {
  const province = getProvinceData(provinceId)
  return province ? province.name : provinceId
}

// SEO용 주요 조합 생성
export function generateMajorCombinations(): string[] {
  const combinations: string[] = []
  
  provinces.forEach(province => {
    // 각 성/시의 주요 도시들만 선택 (처음 5개)
    const majorCities = province.cities.slice(0, 5)
    
    majorCities.forEach(city => {
      // 우선순위 1, 2인 마사지 타입만
      const majorTypes = massageTypes.filter(type => type.priority <= 2)
      
      majorTypes.forEach(type => {
        combinations.push(`${province.id}-${city.id}-${type.id}`)
      })
    })
  })
  
  return combinations
}