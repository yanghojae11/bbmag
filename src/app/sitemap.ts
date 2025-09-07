// app/sitemap.ts
import { MetadataRoute } from 'next'
import { generateMajorCombinations, provinces } from '@/lib/seoData'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://babymag.co.kr' // 실제 도메인으로 수정

  // 정적 페이지들
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/massage-promotion`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/community`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/favorites`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/business`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/help`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/notice`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/site-map`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  // 광역시/도별 랜딩 페이지들
  const regionPages = provinces.map(province => ({
    url: `${baseUrl}/region/${province.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // 지역+테마 조합 페이지들 (SEO 핵심) - URL 경로 수정
  const majorCombinations = generateMajorCombinations()
  const massageThemePages = majorCombinations.map(combo => ({
    url: `${baseUrl}/shop/${combo}`, // /massage → /shop으로 수정
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8, // 높은 우선순위
  }))

  // 개별 마사지샵 페이지들 (예시 - 실제 데이터로 교체 필요)
  const massageShopPages = Array.from({ length: 50 }, (_, i) => ({
    url: `${baseUrl}/massage/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // 시/구별 세부 페이지들 (필요시 활성화)
  // const cityPages: MetadataRoute.Sitemap = []
  // provinces.forEach(province => {
  //   province.cities.forEach(city => {
  //     cityPages.push({
  //       url: `${baseUrl}/region/${province.id}/${city.id}`,
  //       lastModified: new Date(),
  //       changeFrequency: 'weekly' as const,
  //       priority: 0.7,
  //     })
  //   })
  // })

  return [
    ...staticPages,
    ...regionPages,
    ...massageThemePages, // SEO 핵심 페이지들
    ...massageShopPages, // 개별 마사지샵 페이지들
    // ...cityPages, // 필요시 활성화
  ]
}