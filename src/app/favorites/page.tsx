'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Heart, MapPin } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'

interface FavoriteShop {
  id: string
  name: string
  address: string
  rating: number
  reviews: number
  price: number
  image: string
  addedDate: string
}

const favoriteShops: FavoriteShop[] = [
  {
    id: '1',
    name: 'HOTEL GRAY',
    address: '서울시 강남구',
    rating: 4.8,
    reviews: 10849,
    price: 69990,
    image: 'https://ext.same-assets.com/4045962414/286460827.jpeg',
    addedDate: '2024-01-15'
  },
  {
    id: '3',
    name: '대전 용전 멜리사 호텔',
    address: '대전시 유성구',
    rating: 4.6,
    reviews: 5373,
    price: 40000,
    image: 'https://ext.same-assets.com/4045962414/3630767201.jpeg',
    addedDate: '2024-01-10'
  }
]

export default function Favorites() {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState<FavoriteShop[]>([])

  useEffect(() => {
    if (user) {
      // Simulate loading favorites from storage/API
      setFavorites(favoriteShops)
    }
  }, [user])

  const removeFavorite = (hotelId: string) => {
    setFavorites(favorites.filter(hotel => hotel.id !== hotelId))
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-col items-center justify-center h-96">
          <Heart className="w-16 h-16 text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            로그인이 필요합니다
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            찜한 숙소를 보려면 먼저 로그인해주세요.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">찜한 마사지샵</h1>
          <p className="text-gray-600">
            {favorites.length > 0
              ? `${favorites.length}개의 마사지샵을 찜했습니다`
              : '아직 찜한 마사지샵이 없습니다'
            }
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96">
            <Heart className="w-16 h-16 text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              찜한 마사지샵이 없습니다
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              마음에 드는 마사지샵을 찾아서 하트를 눌러보세요!
            </p>
            <Link href="/search">
              <Button>마사지샵 둘러보기</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {favorites.map((shop) => (
              <div key={shop.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="flex">
                  <Link href={`/massage/${shop.id}`} className="flex-1 flex">
                    <div className="relative w-32 h-32 flex-shrink-0">
                      <Image
                        src={shop.image}
                        alt={shop.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {shop.name}
                        </h3>
                        <div className="text-right">
                          <div className="font-bold text-lg text-gray-900">
                            {shop.price.toLocaleString()}원
                          </div>
                          <div className="text-xs text-gray-500">1박 기준</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{shop.rating}</span>
                        <span className="text-xs text-gray-500">
                          ({shop.reviews.toLocaleString()})
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-gray-600 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{shop.address}</span>
                      </div>

                      <div className="text-xs text-gray-500">
                        찜한 날짜: {new Date(shop.addedDate).toLocaleDateString('ko-KR')}
                      </div>
                    </div>
                  </Link>

                  <div className="p-4 flex items-start">
                    <button
                      onClick={() => removeFavorite(shop.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
