'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'

interface BannerData {
  id: number
  image: string
  alt: string
  link: string
}

// 기본 배너 이미지 경로들 (데스크톱/모바일 구분)
const desktopBannerPaths = [
  '/images/광고/desktop/banner1.jpg',
  '/images/광고/desktop/banner2.jpg', 
  '/images/광고/desktop/banner3.jpg'
]

const mobileBannerPaths = [
  '/images/광고/mobile/banner1.jpg',
  '/images/광고/mobile/banner2.jpg',
  '/images/광고/mobile/banner3.jpg'
]

export default function Banner() {
  const [desktopBanners, setDesktopBanners] = useState<BannerData[]>([])
  const [mobileBanners, setMobileBanners] = useState<BannerData[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  // 이미지 존재 여부 확인 함수
  const checkImageExists = async (imagePath: string): Promise<boolean> => {
    try {
      const response = await fetch(imagePath, { method: 'HEAD' })
      return response.ok
    } catch {
      return false
    }
  }

  // 사용 가능한 배너 이미지 확인
  useEffect(() => {
    const checkBanners = async () => {
      const validDesktopBanners: BannerData[] = []
      const validMobileBanners: BannerData[] = []
      
      // 데스크톱 배너 확인
      for (let i = 0; i < desktopBannerPaths.length; i++) {
        const imagePath = desktopBannerPaths[i]
        const imageExists = await checkImageExists(imagePath)
        
        if (imageExists) {
          validDesktopBanners.push({
            id: i + 1,
            image: imagePath,
            alt: `광고 배너 ${i + 1}`,
            link: '/contact'
          })
        }
      }
      
      // 모바일 배너 확인
      for (let i = 0; i < mobileBannerPaths.length; i++) {
        const imagePath = mobileBannerPaths[i]
        const imageExists = await checkImageExists(imagePath)
        
        if (imageExists) {
          validMobileBanners.push({
            id: i + 1,
            image: imagePath,
            alt: `광고 배너 ${i + 1}`,
            link: '/contact'
          })
        }
      }
      
      setDesktopBanners(validDesktopBanners)
      setMobileBanners(validMobileBanners)
      setIsLoading(false)
    }

    checkBanners()
  }, [])

  // 자동 슬라이드 (배너가 2개 이상일 때만)
  useEffect(() => {
    if (!isPlaying || desktopBanners.length <= 1) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % desktopBanners.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [isPlaying, desktopBanners.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + desktopBanners.length) % desktopBanners.length)
  }

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % desktopBanners.length)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  // 로딩 중이거나 사용 가능한 배너가 없으면 렌더링하지 않음
  if (isLoading || (desktopBanners.length === 0 && mobileBanners.length === 0)) {
    return null
  }

  return (
    <>
      {/* 데스크톱 버전 */}
      {desktopBanners.length > 0 && (
        <section className="hidden md:block px-4 py-6">
          <div className="max-w-6xl mx-auto relative">
            <div className="relative h-16 md:h-32 lg:h-40 rounded-2xl overflow-hidden">
              {/* 배너 슬라이드 */}
              <div 
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {desktopBanners.map((banner) => (
                  <Link 
                    key={banner.id} 
                    href={banner.link}
                    className="min-w-full h-full relative block"
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={banner.image}
                        alt={banner.alt}
                        fill
                        className="object-cover object-center"
                        priority={banner.id === desktopBanners[0]?.id}
                        sizes="100vw"
                      />
                      {/* 호버 오버레이 */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300" />
                    </div>
                  </Link>
                ))}
              </div>

              {/* 네비게이션 화살표 (배너가 2개 이상일 때만 표시) */}
              {desktopBanners.length > 1 && (
                <>
                  <button
                    onClick={goToPrevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full flex items-center justify-center transition-all z-10"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  
                  <button
                    onClick={goToNextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full flex items-center justify-center transition-all z-10"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* 하단 컨트롤 */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
                    {/* 재생/일시정지 버튼 */}
                    <button
                      onClick={togglePlayPause}
                      className="w-8 h-8 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full flex items-center justify-center transition-all"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>

                    {/* 인디케이터 */}
                    <div className="flex gap-2">
                      {desktopBanners.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            currentSlide === index 
                              ? 'bg-white w-6' 
                              : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                          }`}
                        />
                      ))}
                    </div>

                    {/* 슬라이드 카운터 */}
                    <div className="text-white text-sm bg-black bg-opacity-30 px-2 py-1 rounded">
                      {String(currentSlide + 1).padStart(2, '0')} / {String(desktopBanners.length).padStart(2, '0')}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 모바일 버전 */}
      {mobileBanners.length > 0 && (
        <section className="block md:hidden px-4 py-4">
          <Link href={mobileBanners[0].link}>
            <div className="relative h-20 md:h-24 rounded-xl overflow-hidden">
              <Image
                src={mobileBanners[0].image}
                alt={mobileBanners[0].alt}
                fill
                className="object-cover object-center"
                priority
                sizes="100vw"
              />
              {/* 호버 오버레이 */}
              <div className="absolute inset-0 bg-black bg-opacity-0 active:bg-opacity-10 transition-all duration-300" />
            </div>
          </Link>
        </section>
      )}
    </>
  )
}