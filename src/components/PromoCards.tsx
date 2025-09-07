import Image from 'next/image'
import Link from 'next/link'

const promoCards = [
  {
    id: 1,
    title: '신규 오픈 마사지샵',
    subtitle: '첫 방문 30% 할인!',
    badge: 'MD추천',
    bgColor: 'bg-purple-50',
    textColor: 'text-gray-900',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    title: '커플 마사지 특가',
    subtitle: '2인 동시 예약 시 20% 할인',
    badge: 'MD추천',
    bgColor: 'bg-pink-50',
    textColor: 'text-gray-900',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    title: '스웨디시 런치타임',
    subtitle: '오후 2시까지 특별가!',
    badge: '런치특가',
    bgColor: 'bg-yellow-50',
    textColor: 'text-gray-900',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    title: '프리미엄 아로마',
    subtitle: '최고급 에센셜 오일',
    badge: '프리미엄',
    bgColor: 'bg-green-50',
    textColor: 'text-gray-900',
    image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=400&h=300&fit=crop'
  },
  {
    id: 5,
    title: '딥티슈 마사지 할인',
    subtitle: '근육 피로 완벽 해소!',
    badge: 'MD추천',
    bgColor: 'bg-blue-50',
    textColor: 'text-gray-900',
    image: 'https://images.unsplash.com/photo-1559586696-11321dc5de4a?w=400&h=300&fit=crop'
  },
  {
    id: 6,
    title: '24시간 마사지샵',
    subtitle: '언제든지 편리하게!',
    badge: '24시간',
    bgColor: 'bg-indigo-50',
    textColor: 'text-gray-900',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop'
  },
]

export default function PromoCards() {
  return (
    <>
      {/* 데스크톱 버전 */}
      <section 
        className="hidden lg:flex lg:justify-center"
        style={{
          paddingTop: '40px',
          paddingBottom: '40px',
          fontSize: '10px',
          fontFamily: 'Pretendard, Apple SD Gothic Neo, Roboto, Arial Helvetica, sans-serif',
          lineHeight: 'inherit',
          color: 'rgb(27, 28, 31)'
        }}
      >
        <div 
          className="px-4"
          style={{
            width: '1280px',
            maxWidth: '100%'
          }}
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            마사지 프로모션
          </h2>
          
          <div 
            className="grid overflow-hidden rounded-xl"
            style={{
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: '8px'
            }}
          >
            {promoCards.map((card) => (
              <Link key={card.id} href="/massage-promotion">
                <div
                  className={`relative rounded-lg overflow-hidden ${card.bgColor} shadow-sm cursor-pointer hover:shadow-md transition-shadow`}
                  style={{
                    aspectRatio: '1.2/1',
                    minHeight: '180px'
                  }}
                >
                  <div className="absolute top-2 left-2 z-10">
                    <span className="bg-gray-800 text-white px-2 py-1 rounded text-xs font-medium">
                      {card.badge}
                    </span>
                  </div>
                  
                  {card.image && (
                    <div className="absolute inset-0">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover opacity-60"
                      />
                    </div>
                  )}
                  
                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    <h3 className={`font-bold text-base mb-2 ${card.textColor} leading-tight`}>
                      {card.title}
                    </h3>
                    <p className={`text-sm ${card.textColor} opacity-80 leading-tight`}>
                      {card.subtitle}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link href="/massage-promotion">
              <button className="w-full py-3 border border-gray-200 rounded-lg text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors max-w-2xl mx-auto">
                마사지 프로모션 전체보기
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 모바일 및 태블릿 버전 */}
      <section className="block lg:hidden px-4 py-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          마사지 프로모션
        </h2>
        
        <div className="grid grid-cols-3 gap-1.5 mb-6">
          {promoCards.map((card) => (
            <Link key={card.id} href="/massage-promotion">
              <div
                className={`relative rounded-md overflow-hidden ${card.bgColor} shadow-sm`}
                style={{
                  aspectRatio: '1/1.1',
                  minHeight: '90px'
                }}
              >
                <div className="absolute top-1 left-1 z-10">
                  <span className="bg-gray-800 text-white px-1 py-0.5 rounded text-[9px] font-medium leading-none">
                    {card.badge}
                  </span>
                </div>
                
                {card.image && (
                  <div className="absolute inset-0">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover opacity-50"
                    />
                  </div>
                )}
                
                <div className="absolute inset-0 p-1.5 flex flex-col justify-end">
                  <h3 className={`font-bold text-[10px] mb-0.5 ${card.textColor} leading-tight`}>
                    {card.title}
                  </h3>
                  <p className={`text-[8px] ${card.textColor} opacity-80 leading-tight line-clamp-2`}>
                    {card.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center">
          <Link href="/massage-promotion">
            <button className="w-full py-3 border border-gray-200 rounded-lg text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors">
              마사지 프로모션 전체보기
            </button>
          </Link>
        </div>
      </section>
    </>
  )
}