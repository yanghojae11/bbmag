import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const massageShops = [
  {
    id: 1,
    name: '비비막 프리미엄 스웨디시',
    price: '90,000',
    originalPrice: '120,000',
    discount: 25,
    rating: 4.8,
    reviews: 1847,
    image: '/images/shops/massage-1.jpg',
    services: ['스웨디시', '아로마']
  },
  {
    id: 2,
    name: '힐링타임 아로마테라피',
    price: '120,000',
    originalPrice: null,
    discount: null,
    rating: 4.7,
    reviews: 892,
    image: '/images/shops/massage-2.jpg',
    services: ['아로마', '핫스톤']
  },
  {
    id: 3,
    name: '릴렉스 딥티슈 마사지',
    price: '85,000',
    originalPrice: '100,000',
    discount: 15,
    rating: 4.6,
    reviews: 1234,
    image: '/images/shops/massage-3.jpg',
    services: ['딥티슈', '스포츠']
  },
  {
    id: 4,
    name: '스파 앤 웰니스 센터',
    price: '150,000',
    originalPrice: null,
    discount: null,
    rating: 4.9,
    reviews: 2341,
    image: '/images/shops/massage-4.jpg',
    services: ['스파', '전신']
  },
  {
    id: 5,
    name: '24시간 마사지샵',
    price: '70,000',
    originalPrice: null,
    discount: null,
    rating: 4.5,
    reviews: 1876,
    image: '/images/shops/massage-5.jpg',
    services: ['24시간', '타이']
  },
]

export default function PopularMassageShops() {
  return (
    <section className="px-4 py-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          관심 지역의 많이 찾는 마사지샵
        </h2>
        <p className="text-sm text-gray-500">최근 한 주간 예약 많은 순</p>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-2">
        {massageShops.map((shop) => (
          <Link key={shop.id} href={`/massage/${shop.id}`}>
            <div className="flex-shrink-0 w-48 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
              <div className="relative">
                <Image
                  src={shop.image}
                  alt={shop.name}
                  width={192}
                  height={128}
                  className="w-full h-32 object-cover"
                />
                {shop.discount && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    {shop.discount}%
                  </div>
                )}
              </div>
              
              <div className="p-3">
                <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">
                  {shop.name}
                </h3>
                
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-900">
                    {shop.rating}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({shop.reviews.toLocaleString()})
                  </span>
                </div>

                {/* 서비스 태그 */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {shop.services.map((service, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                    >
                      {service}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-baseline gap-1">
                  {shop.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {shop.originalPrice}원
                    </span>
                  )}
                  <span className="text-lg font-bold text-gray-900">
                    {shop.price}원~
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <button className="w-full py-3 border border-gray-200 rounded-lg text-gray-700 font-medium">
          전체보기
        </button>
      </div>
    </section>
  )
}