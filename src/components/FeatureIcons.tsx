import Image from 'next/image'
import Link from 'next/link'

const massageCategories = [
  { 
    icon: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=400&fit=crop&crop=center', 
    label: '신규', 
    color: 'bg-green-100',
    themeId: 'new'
  },
  { 
    icon: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=400&fit=crop&crop=center', 
    label: '스웨디시', 
    color: 'bg-purple-100',
    themeId: 'swedish'
  },
  { 
    icon: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center', 
    label: '아로마', 
    color: 'bg-orange-100',
    themeId: 'aroma'
  },
  { 
    icon: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=400&h=400&fit=crop&crop=center', 
    label: '타이마사지', 
    color: 'bg-blue-100',
    themeId: 'thai'
  },
  { 
    icon: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=400&fit=crop&crop=center', 
    label: '1인샵', 
    color: 'bg-yellow-100',
    themeId: '1person'
  },
  { 
    icon: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop&crop=center', 
    label: '스파테라피', 
    color: 'bg-teal-100',
    themeId: 'spa'
  },
  { 
    icon: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=400&h=400&fit=crop&crop=center', 
    label: '커플마사지', 
    color: 'bg-pink-100',
    themeId: 'couple'
  },
  { 
    icon: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=400&fit=crop&crop=center', 
    label: '홈케어', 
    color: 'bg-indigo-100',
    themeId: '24h'
  },
]

export default function MassageCategoryIcons() {
  return (
    <>
      {/* 데스크톱 버전 - 8개 아이콘 1열 스크롤 */}
      <section className="hidden md:block px-4 py-6">
        <div className="flex gap-8 justify-center overflow-x-auto pb-2 max-w-6xl mx-auto">
          {massageCategories.map((category, index) => (
            <Link 
              key={index} 
              href={`/massage-promotion?theme=${category.themeId}`}
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-200 flex-shrink-0"
            >
              <div 
                className={`rounded-full overflow-hidden flex items-center justify-center mb-3 ${category.color} shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200`}
                style={{ width: '72px', height: '88px' }}
              >
                <Image
                  src={category.icon}
                  alt={category.label}
                  width={72}
                  height={88}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-sm text-gray-700 text-center font-medium leading-tight whitespace-nowrap">
                {category.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 모바일 버전 - 스와이프 가능한 1열 */}
      <section className="block md:hidden px-4 py-6">
        <div 
          className="flex gap-6 overflow-x-auto pb-2"
          style={{ 
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
          }}
        >
          {massageCategories.map((category, index) => (
            <Link 
              key={index} 
              href={`/massage-promotion?theme=${category.themeId}`}
              className="flex flex-col items-center flex-shrink-0 cursor-pointer"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div 
                className={`rounded-full overflow-hidden flex items-center justify-center mb-2 ${category.color} shadow-sm border border-gray-200`}
                style={{ width: '48px', height: '64px' }}
              >
                <Image
                  src={category.icon}
                  alt={category.label}
                  width={48}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-[11px] text-gray-700 text-center font-medium leading-tight whitespace-nowrap">
                {category.label}
              </span>
            </Link>
          ))}
        </div>
        
        {/* 웹킷 스크롤바 숨기기 */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .overflow-x-auto::-webkit-scrollbar {
              display: none;
            }
          `
        }} />
      </section>
    </>
  )
}