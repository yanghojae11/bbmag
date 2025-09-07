'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, Heart, Share, MapPin, Wifi, Car, Coffee, Bath, Clock, Users, Phone, MessageCircle, ThumbsUp, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import Header from '@/components/Header'

interface Review {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  content: string
  service: string
  visitDate: string
  createdAt: string
  images?: string[]
  likes: number
  isLiked: boolean
}

interface MassageShop {
  id: string
  name: string
  address: string
  rating: number
  reviews: number
  price: number
  originalPrice?: number
  discount?: number
  images: string[]
  amenities: string[]
  description: string
  services: {
    id: string
    name: string
    duration: string
    price: number
    description: string
  }[]
  businessInfo: {
    introduction: string
    program: string
    location: string
    managerInfo: string
    hours: string
    access: string
    benefits: string
    contact: string
  }
  reviewStats: {
    total: number
    average: number
    distribution: {
      5: number
      4: number
      3: number
      2: number
      1: number
    }
  }
  recentReviews: Review[]
}

const massageShopData: MassageShop = {
  id: '1',
  name: '비비막 프리미엄 스웨디시',
  address: '서울시 강남구 테헤란로 123',
  rating: 4.8,
  reviews: 1847,
  price: 90000,
  images: [
    'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&h=600&fit=crop',
  ],
  amenities: ['무료 WiFi', '주차장', '24시간 운영', '샤워시설', '개인실', '스파'],
  description: '프리미엄 마사지 서비스와 최고급 시설을 갖춘 전문 마사지샵입니다. 강남 중심가에 위치하여 교통이 편리하며, 숙련된 전문 테라피스트가 최상의 힐링 서비스를 제공합니다.',
  services: [
    {
      id: '1',
      name: '스웨디시 마사지',
      duration: '60분',
      price: 90000,
      description: '전신 근육 이완과 혈액순환 개선에 효과적인 클래식 스웨디시'
    },
    {
      id: '2',
      name: '아로마 테라피',
      duration: '90분',
      price: 120000,
      description: '천연 에센셜 오일을 사용한 심신 안정 아로마 마사지'
    },
    {
      id: '3',
      name: '딥티슈 마사지',
      duration: '60분',
      price: 100000,
      description: '깊은 근육층까지 풀어주는 강압 마사지'
    }
  ],
  businessInfo: {
    introduction: `안녕하세요! 저희 가게에서 여러분께 
안녕하세요. 저희는 고객 만족 지향으로 
체계적 운영방식 운영마인드로 운영하는 
업소 모두가 오신 것만으로도 기쁘고 즐
거운곳 즐거운 서비스를 지향하는 곳을 지금도 
저희는 한결같이 정이 가는 곳으로
만이 진짜 뜻에서 리틀서바이벌네요! "_ ^`,
    program: `스웨디시 관리`,
    location: `서울특별시
충무구 거여동`,
    managerInfo: `전원 (20대) 한국인 | 최관리사

⭐ 연심 24세 / 인정 23세 ⭐
⭐ 시라 22세 / 유아 24세 ⭐`,
    hours: `오전 11시 ~ 새벽 3시
( 근무시간 : 배경매불능류형 )`,
    access: `가러이 도로 3분
서울특별시 충무구 가거동
(상세주소 문의)
무료주차장`,
    benefits: `• 100% 베네탄 무스 및 오픈 공간 맵리각 ●●●
• 베네탄 13곡포스터 텍티블 저밤볼벤 토식봇 
• 가정, 총선요소가적, 지전식, 박스룰, 쿠보브탄,
  포텐 정도 개방후인엑태항 총솔 발문보서방재재자겠다
• 쿠계지탄덜음말보지채게저리(고,브러인오목양제되이 ●●●`,
    contact: `공금점사 시뮴이리
아동센 탈 연결 주거년
신재뿌셔 정동별 드렘정요 됩니다.

문화다시공 · 예쁘음
중랜사회시고추 : 빼헤도이전팝

실 연셰저 | "건마예반하다" 보고 
연석필요 됩니다 잘보신시원 
서희거디부르구 먼저 읽었습니다.

아저씨 관현 구별적으원!!
먼저 랜친 날컬 먀언청!
아저씨들스 온 공간으깅외자신맞
온 실갓 정리변럽탈팀 경겨끄릴을지원
먼저껜젼을 정하찬 리미까
더도단를의 화양 같더 디엠어
가져화업꾸 경무 맘 엄인!`
  },
  reviewStats: {
    total: 1847,
    average: 4.8,
    distribution: {
      5: 1203,
      4: 462,
      3: 138,
      2: 31,
      1: 13
    }
  },
  recentReviews: [
    {
      id: '1',
      userId: 'user1',
      userName: '김**',
      rating: 5,
      content: '정말 만족스러운 서비스였습니다. 테라피스트분이 매우 전문적이고 친절하셨어요. 마사지 후 몸이 너무 가벼워졌고 스트레스가 확실히 풀렸습니다. 시설도 깔끔하고 분위기도 좋았어요. 다음에도 꼭 재방문할 예정입니다!',
      service: '스웨디시 마사지',
      visitDate: '2024-01-15',
      createdAt: '2024-01-16',
      images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'],
      likes: 12,
      isLiked: false
    },
    {
      id: '2',
      userId: 'user2',
      userName: '박**',
      rating: 4,
      content: '아로마 테라피를 받았는데 향기도 좋고 마사지도 시원했어요. 다만 예약 시간보다 조금 늦게 시작된 점이 아쉬웠습니다. 그래도 전반적으로 만족합니다.',
      service: '아로마 테라피',
      visitDate: '2024-01-12',
      createdAt: '2024-01-13',
      likes: 8,
      isLiked: true
    },
    {
      id: '3',
      userId: 'user3',
      userName: '이**',
      rating: 5,
      content: '회사 스트레스로 어깨와 목이 너무 아팠는데 딥티슈 마사지 받고 나서 확실히 좋아졌어요. 강도도 적당했고 아픈 부위를 정확히 찾아서 마사지해주셨습니다. 가격 대비 만족도가 높습니다.',
      service: '딥티슈 마사지',
      visitDate: '2024-01-10',
      createdAt: '2024-01-11',
      likes: 15,
      isLiked: false
    },
    {
      id: '4',
      userId: 'user4',
      userName: '정**',
      rating: 4,
      content: '시설이 깔끔하고 직원분들도 친절해요. 마사지 실력도 좋습니다. 다만 주차공간이 조금 협소한 것 같아요.',
      service: '스웨디시 마사지',
      visitDate: '2024-01-08',
      createdAt: '2024-01-09',
      likes: 6,
      isLiked: false
    },
    {
      id: '5',
      userId: 'user5',
      userName: '최**',
      rating: 5,
      content: '몇 번째 방문인데 항상 만족해요. 특히 관리사분들이 바뀌어도 서비스 품질이 일정하게 유지되는 점이 좋습니다. 예약도 편리하고 추천합니다!',
      service: '아로마 테라피',
      visitDate: '2024-01-05',
      createdAt: '2024-01-06',
      likes: 9,
      isLiked: true
    }
  ]
}

export default function MassageShopDetails() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [likedReviews, setLikedReviews] = useState<Set<string>>(new Set())
  const { user } = useAuth()

  const handleLikeReview = (reviewId: string) => {
    setLikedReviews(prev => {
      const newSet = new Set(prev)
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId)
      } else {
        newSet.add(reviewId)
      }
      return newSet
    })
  }

  const filteredReviews = massageShopData.recentReviews.filter(review => {
    if (selectedFilter === 'all') return true
    if (selectedFilter === 'photo') return review.images && review.images.length > 0
    return review.rating === parseInt(selectedFilter)
  })

  const displayedReviews = showAllReviews ? filteredReviews : filteredReviews.slice(0, 3)

  const amenityIcons = {
    '무료 WiFi': Wifi,
    '주차장': Car,
    '24시간 운영': Clock,
    '샤워시설': Bath,
    '개인실': Users,
    '스파': Coffee
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pb-20">
        {/* Image Gallery */}
        <div className="relative">
          <div className="aspect-video relative">
            <Image
              src={massageShopData.images[selectedImage]}
              alt={massageShopData.name}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsFavorite(!isFavorite)}
                className="bg-white/80 backdrop-blur-sm"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button variant="secondary" size="sm" className="bg-white/80 backdrop-blur-sm">
                <Share className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-2 p-4 overflow-x-auto">
            {massageShopData.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? 'border-blue-500' : 'border-transparent'
                }`}
              >
                <Image
                  src={image}
                  alt={`${massageShopData.name} ${index + 1}`}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Massage Shop Info */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-900">{massageShopData.name}</h1>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {massageShopData.price.toLocaleString()}원~
              </div>
              <div className="text-sm text-gray-500">60분 기준</div>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{massageShopData.rating}</span>
              <span className="text-gray-500">({massageShopData.reviews.toLocaleString()})</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{massageShopData.address}</span>
            </div>
          </div>

          <p className="text-gray-700 mb-6">{massageShopData.description}</p>

          {/* Amenities */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">편의시설</h3>
            <div className="grid grid-cols-2 gap-3">
              {massageShopData.amenities.map((amenity) => {
                const Icon = amenityIcons[amenity as keyof typeof amenityIcons] || Coffee
                return (
                  <div key={amenity} className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-gray-600" />
                    <span className="text-sm">{amenity}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Service Selection - Display Only */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">마사지 서비스 안내</h3>
            <div className="space-y-3">
              {massageShopData.services.map((service) => (
                <div
                  key={service.id}
                  className="border rounded-lg p-4 border-gray-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{service.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-lg">{service.price.toLocaleString()}원</span>
                      <div className="text-sm text-gray-500">{service.duration}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Review Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">리뷰 ({massageShopData.reviewStats.total.toLocaleString()})</h3>
            
            {/* Review Stats */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{massageShopData.reviewStats.average}</div>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(massageShopData.reviewStats.average) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">{massageShopData.reviewStats.total.toLocaleString()}개 리뷰</div>
                </div>
                
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const count = massageShopData.reviewStats.distribution[rating as keyof typeof massageShopData.reviewStats.distribution]
                    const percentage = (count / massageShopData.reviewStats.total) * 100
                    return (
                      <div key={rating} className="flex items-center gap-2 mb-1">
                        <span className="text-sm w-3">{rating}</span>
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-500 w-8">{count}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Review Filters */}
            <div className="flex gap-2 mb-4 overflow-x-auto">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap border ${
                  selectedFilter === 'all' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setSelectedFilter('photo')}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap border flex items-center gap-1 ${
                  selectedFilter === 'photo' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                <Camera className="w-3 h-3" />
                사진
              </button>
              {[5, 4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setSelectedFilter(rating.toString())}
                  className={`px-3 py-1 rounded-full text-sm whitespace-nowrap border flex items-center gap-1 ${
                    selectedFilter === rating.toString() ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-300'
                  }`}
                >
                  {rating}점
                </button>
              ))}
            </div>

            {/* Review List */}
            <div className="space-y-4">
              {displayedReviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {review.userName.charAt(0)}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-gray-900">{review.userName}</span>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3 h-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">{review.visitDate}</span>
                      </div>
                      
                      <div className="mb-2">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
                          {review.service}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 text-sm leading-relaxed mb-3">
                        {review.content}
                      </p>
                      
                      {review.images && review.images.length > 0 && (
                        <div className="flex gap-2 mb-3">
                          {review.images.map((image, index) => (
                            <div key={index} className="w-16 h-16 rounded-lg overflow-hidden">
                              <Image
                                src={image}
                                alt={`리뷰 이미지 ${index + 1}`}
                                width={64}
                                height={64}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <button
                          onClick={() => handleLikeReview(review.id)}
                          className={`flex items-center gap-1 ${
                            likedReviews.has(review.id) ? 'text-blue-500' : 'text-gray-500'
                          }`}
                        >
                          <ThumbsUp className={`w-4 h-4 ${
                            likedReviews.has(review.id) ? 'fill-blue-500' : ''
                          }`} />
                          도움됨 {review.likes + (likedReviews.has(review.id) ? 1 : 0)}
                        </button>
                        <span>{review.createdAt}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Show More Button */}
            {filteredReviews.length > 3 && (
              <div className="text-center mt-4">
                <button
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="text-blue-500 text-sm font-medium hover:underline"
                >
                  {showAllReviews ? '접기' : `리뷰 더보기 (${filteredReviews.length - 3}개)`}
                </button>
              </div>
            )}

            {/* Write Review Button */}
            {user && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-3">이 업체를 이용해보셨나요?</p>
                  <Button variant="outline" className="w-full">
                    리뷰 작성하기
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Business Introduction */}
          <div className="mb-6">
            <div className="bg-pink-50 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold mb-3 text-center">
                <span className="bg-pink-200 px-3 py-1 rounded-full text-sm">소개</span>
              </h3>
              <div className="text-center text-sm leading-relaxed whitespace-pre-line">
                {massageShopData.businessInfo.introduction}
              </div>
            </div>

            <div className="bg-pink-50 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold mb-3 text-center">
                <span className="bg-pink-200 px-3 py-1 rounded-full text-sm">지역</span>
              </h3>
              <div className="text-center">
                <div className="font-bold text-lg">{massageShopData.businessInfo.location}</div>
              </div>
            </div>

            <div className="bg-pink-50 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold mb-3 text-center">
                <span className="bg-pink-200 px-3 py-1 rounded-full text-sm">프로그램</span>
              </h3>
              <div className="text-center">
                <div className="text-lg font-bold text-red-500">스웨디시 관리</div>
                <div className="text-sm mt-2">
                  <span className="bg-red-100 px-2 py-1 rounded text-red-600">다양고객</span>
                  <span className="ml-2 font-bold">60분 1구간 → 15만</span>
                </div>
                <div className="text-xs mt-2 text-gray-600">
                  건마예반하다에 최강의집 첫 할수<br/>
                  핵정거의 최강가지 적경압니다.
                </div>
              </div>
            </div>

            <div className="bg-pink-50 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold mb-3 text-center">
                <span className="bg-pink-200 px-3 py-1 rounded-full text-sm">관리사님</span>
              </h3>
              <div className="text-center text-sm leading-relaxed whitespace-pre-line">
                {massageShopData.businessInfo.managerInfo}
              </div>
            </div>

            <div className="bg-pink-50 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold mb-3 text-center">
                <span className="bg-pink-200 px-3 py-1 rounded-full text-sm">영업시간</span>
              </h3>
              <div className="text-center text-sm leading-relaxed whitespace-pre-line">
                {massageShopData.businessInfo.hours}
              </div>
            </div>

            <div className="bg-pink-50 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold mb-3 text-center">
                <span className="bg-pink-200 px-3 py-1 rounded-full text-sm">오시는길</span>
              </h3>
              <div className="text-center text-sm leading-relaxed whitespace-pre-line">
                {massageShopData.businessInfo.access}
              </div>
            </div>

            <div className="bg-pink-50 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold mb-3 text-center">
                <span className="bg-pink-200 px-3 py-1 rounded-full text-sm">부탁말씀</span>
              </h3>
              <div className="text-center text-xs leading-relaxed whitespace-pre-line">
                {massageShopData.businessInfo.benefits}
              </div>
            </div>

            <div className="bg-pink-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3 text-center">
                <span className="bg-pink-200 px-3 py-1 rounded-full text-sm">곡원어보요소</span>
              </h3>
              <div className="text-center text-xs leading-relaxed whitespace-pre-line">
                {massageShopData.businessInfo.contact}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Contact Footer - Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden">
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 flex items-center gap-2">
            <Phone className="w-4 h-4" />
            전화하기
          </Button>
          <Button className="flex-1 bg-blue-500 hover:bg-blue-600 relative overflow-hidden">
            <div 
              className="flex items-center gap-2 whitespace-nowrap"
              style={{
                animation: 'trainMove 3s infinite linear'
              }}
            >
              <MessageCircle className="w-4 h-4" />
              문의하기
            </div>
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes trainMove {
          0% { 
            transform: translateX(120%);
          }
          100% { 
            transform: translateX(-120%);
          }
        }
      `}</style>
    </div>
  )
}