// lib/placeholderImage.ts

/**
 * SVG 기반 placeholder 이미지 생성기
 */
export function generatePlaceholderImage({
  width = 400,
  height = 300,
  text = '',
  backgroundColor = '#f3f4f6',
  textColor = '#9ca3af',
  fontSize = 16,
}: {
  width?: number
  height?: number
  text?: string
  backgroundColor?: string
  textColor?: string
  fontSize?: number
} = {}) {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="${backgroundColor}"/>
      ${text ? `
        <text x="50%" y="50%" 
              font-family="system-ui, sans-serif" 
              font-size="${fontSize}" 
              fill="${textColor}" 
              text-anchor="middle" 
              dominant-baseline="middle">
          ${text}
        </text>
      ` : ''}
    </svg>
  `

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}

/**
 * 그라데이션 shimmer 효과가 있는 placeholder
 */
export function generateShimmerImage({
  width = 400,
  height = 300,
}: {
  width?: number
  height?: number
} = {}) {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#f6f7f8;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#edeef1;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#f6f7f8;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="shimmer-moving" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#f6f7f8;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#edeef1;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#f6f7f8;stop-opacity:1" />
          <animateTransform
            attributeName="gradientTransform"
            attributeType="XML"
            type="translate"
            values="-${width};0;${width};0;-${width};0"
            dur="1.5s"
            repeatCount="indefinite"/>
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="#f6f7f8"/>
      <rect width="${width}" height="${height}" fill="url(#shimmer-moving)"/>
    </svg>
  `

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}

/**
 * 마사지샵 전용 placeholder 이미지
 */
export function generateMassageShopPlaceholder({
  width = 400,
  height = 300,
  name = '마사지샵',
}: {
  width?: number
  height?: number
  name?: string
} = {}) {
  return generatePlaceholderImage({
    width,
    height,
    text: name,
    backgroundColor: '#e5e7eb',
    textColor: '#6b7280',
    fontSize: Math.min(width, height) / 20,
  })
}

/**
 * 다양한 크기의 responsive placeholder 생성
 */
export function generateResponsivePlaceholders(baseName: string = 'Image') {
  return {
    small: generatePlaceholderImage({
      width: 200,
      height: 150,
      text: baseName,
      fontSize: 12,
    }),
    medium: generatePlaceholderImage({
      width: 400,
      height: 300,
      text: baseName,
      fontSize: 16,
    }),
    large: generatePlaceholderImage({
      width: 800,
      height: 600,
      text: baseName,
      fontSize: 24,
    }),
    banner: generatePlaceholderImage({
      width: 1200,
      height: 400,
      text: baseName,
      fontSize: 32,
    }),
  }
}

/**
 * Unsplash API를 통한 실제 이미지 URL 생성 (개발/테스트용)
 */
export function generateUnsplashImage({
  width = 400,
  height = 300,
  category = 'spa',
  blur = false,
}: {
  width?: number
  height?: number
  category?: string
  blur?: boolean
} = {}) {
  const baseUrl = 'https://images.unsplash.com'
  const params = new URLSearchParams({
    w: width.toString(),
    h: height.toString(),
    fit: 'crop',
    crop: 'center',
  })

  if (blur) {
    params.append('blur', '2')
  }

  return `${baseUrl}/photo-1540555700478-4be289fbecef?${params.toString()}`
}

/**
 * Base64 인코딩된 1x1 투명 이미지 (로딩 placeholder용)
 */
export const TRANSPARENT_PIXEL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

/**
 * 공통 blur data URL 생성
 */
export function generateBlurDataURL(width: number = 400, height: number = 300) {
  return generateShimmerImage({ width, height })
}