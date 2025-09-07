'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, MapPin, Filter, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Header from '@/components/Header'

interface Shop {
  id: string
  name: string
  address: string
  rating: number
  reviews: number
  price: number
  originalPrice?: number
  discount?: number
  image: string
  distance: string
}

const searchResults: Shop[] = [
  {
    id: '1',
    name: 'HOTEL GRAY',
    address: '서울시 강남구',
    rating: 4.8,
    reviews: 10849,
    price: 69990,
    image: 'https://ext.same-assets.com/4045962414/286460827.jpeg',
    distance: '2.1km'
  },
  {
    id: '2',
    name: '성신데명 우디(WOODY)',
    address: '서울시 성북구',
    rating: 4.8,
    reviews: 1594,
    price: 60000,
    image: 'https://ext.same-assets.com/4045962414/1066566708.jpeg',
    distance: '3.5km'
  },
  {
    id: '3',
    name: '대전 용전 멜리사 호텔',
    address: '대전시 유성구',
    rating: 4.6,
    reviews: 5373,
    price: 40000,
    originalPrice: 50000,
    discount: 20,
    image: 'https://ext.same-assets.com/4045962414/3630767201.jpeg',
    distance: '1.8km'
  },
  {
    id: '4',
    name: '역삼 루이애르',
    address: '서울시 강남구',
    rating: 4.8,
    reviews: 709,
    price: 66600,
    originalPrice: 74000,
    discount: 10,
    image: 'https://ext.same-assets.com/4045962414/3287134765.jpeg',
    distance: '4.2km'
  },
  {
    id: '5',
    name: '수원역 라이어 수원',
    address: '경기도 수원시',
    rating: 4.6,
    reviews: 4193,
    price: 25000,
    image: 'https://ext.same-assets.com/4045962414/1838635694.jpeg',
    distance: '12.7km'
  }
]

export default function SearchResults() {
  const [searchQuery, setSearchQuery] = useState('강남')
  const [sortBy, setSortBy] = useState('distance')
  const [priceRange, setPriceRange] = useState([0, 200000])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pb-6">
        {/* Search Bar */}
        <div className="bg-white p-4 border-b border-gray-200">
          <div className="flex gap-3">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="지역, 숙소명 검색"
              className="flex-1"
            />
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex gap-2 mt-3 overflow-x-auto">
            <Button
              variant={sortBy === 'distance' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('distance')}
            >
              거리순
            </Button>
            <Button
              variant={sortBy === 'price' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('price')}
            >
              가격순
            </Button>
            <Button
              variant={sortBy === 'rating' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('rating')}
            >
              평점순
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-1" />
              필터
            </Button>
          </div>
        </div>

        {/* Search Results */}
        <div className="p-4">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">{searchQuery} 검색결과</h2>
            <p className="text-sm text-gray-600">{searchResults.length}개의 숙소를 찾았습니다</p>
          </div>

          <div className="space-y-4">
            {searchResults.map((shop) => (
              <Link key={shop.id} href={`/massage/${shop.id}`}>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex">
                    <div className="relative w-32 h-32 flex-shrink-0">
                      <Image
                        src={shop.image}
                        alt={shop.name}
                        fill
                        className="object-cover"
                      />
                      {shop.discount && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                          {shop.discount}%
                        </div>
                      )}
                    </div>

                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900 line-clamp-1">
                          {shop.name}
                        </h3>
                        <div className="text-right">
                          {shop.originalPrice && (
                            <div className="text-xs text-gray-400 line-through">
                              {shop.originalPrice.toLocaleString()}원
                            </div>
                          )}
                          <div className="font-bold text-lg text-gray-900">
                            {shop.price.toLocaleString()}원
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{shop.rating}</span>
                        <span className="text-xs text-gray-500">
                          ({shop.reviews.toLocaleString()})
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{shop.address}</span>
                        </div>
                        <span className="text-sm text-blue-600 font-medium">
                          {shop.distance}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
