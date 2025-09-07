// components/StructuredData.tsx

interface LocalBusinessSchemaProps {
  name: string
  address: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode?: string
  }
  phone?: string
  priceRange?: string
  rating?: number
  reviewCount?: number
  openingHours?: string[]
  services?: string[]
  url?: string
  image?: string
}

interface OrganizationSchemaProps {
  name: string
  url: string
  logo: string
  sameAs?: string[]
  description: string
}

// 메인 사이트 조직 정보
export function OrganizationSchema({ name, url, logo, sameAs, description }: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo: {
      '@type': 'ImageObject',
      url: logo,
    },
    description,
    sameAs,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      areaServed: 'KR',
      availableLanguage: 'ko',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// 웹사이트 정보
export function WebsiteSchema({ url, name }: { url: string; name: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url,
    name,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/massage-promotion?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// 개별 마사지샵 정보
export function LocalBusinessSchema({
  name,
  address,
  phone,
  priceRange,
  rating,
  reviewCount,
  openingHours,
  services,
  url,
  image,
}: LocalBusinessSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': url,
    name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      postalCode: address.postalCode,
      addressCountry: 'KR',
    },
    telephone: phone,
    priceRange,
    url,
    image,
    openingHours,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '마사지 서비스',
      itemListElement: services?.map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service,
          serviceType: '마사지',
        },
        position: index + 1,
      })),
    },
    aggregateRating: rating
      ? {
          '@type': 'AggregateRating',
          ratingValue: rating,
          reviewCount: reviewCount || 1,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// 서비스 페이지용 구조화 데이터
export function ServiceSchema({
  name,
  provider,
  areaServed,
  description,
  offers,
}: {
  name: string
  provider: string
  areaServed: string
  description: string
  offers?: {
    priceRange: string
    availability: string
  }
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    provider: {
      '@type': 'Organization',
      name: provider,
    },
    areaServed: {
      '@type': 'State',
      name: areaServed,
    },
    description,
    serviceType: '마사지 서비스',
    offers: offers
      ? {
          '@type': 'Offer',
          priceRange: offers.priceRange,
          availability: offers.availability,
        }
      : undefined,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// FAQ 페이지용 구조화 데이터
export function FAQSchema({
  questions,
}: {
  questions: Array<{ question: string; answer: string }>
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// 빵부스러기 내비게이션
export function BreadcrumbSchema({
  items,
}: {
  items: Array<{ name: string; url: string }>
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}