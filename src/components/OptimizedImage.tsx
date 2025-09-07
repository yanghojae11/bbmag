// components/OptimizedImage.tsx
'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ImageIcon } from 'lucide-react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  sizes?: string
  fill?: boolean
  style?: React.CSSProperties
  fallbackSrc?: string
  showFallback?: boolean
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  sizes,
  fill = false,
  style,
  fallbackSrc = '/images/placeholder.jpg',
  showFallback = true,
}: OptimizedImageProps) {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  // 기본 blur placeholder 생성 (1x1 투명 이미지)
  const shimmer = (w: number, h: number) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#f6f7f8" offset="20%" />
          <stop stop-color="#edeef1" offset="50%" />
          <stop stop-color="#f6f7f8" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#f6f7f8" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`

  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str)

  // 에러 발생 시 폴백 처리
  if (error && showFallback) {
    return (
      <div 
        className={`bg-gray-100 flex items-center justify-center ${className}`}
        style={{ width, height, ...style }}
      >
        <ImageIcon className="w-8 h-8 text-gray-400" />
      </div>
    )
  }

  // 공통 props
  const commonProps = {
    alt,
    className: `transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'} ${className}`,
    quality,
    priority,
    style,
    onLoad: () => setLoading(false),
    onError: () => {
      setError(true)
      setLoading(false)
    },
  }

  // fill 모드
  if (fill) {
    return (
      <div className="relative overflow-hidden">
        <Image
          {...commonProps}
          src={error ? fallbackSrc : src}
          fill
          sizes={sizes || '100vw'}
          placeholder={placeholder}
          blurDataURL={
            placeholder === 'blur'
              ? blurDataURL || `data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`
              : undefined
          }
        />
      </div>
    )
  }

  // 고정 크기 모드
  return (
    <div className="relative">
      <Image
        {...commonProps}
        src={error ? fallbackSrc : src}
        width={width || 300}
        height={height || 200}
        sizes={sizes}
        placeholder={placeholder}
        blurDataURL={
          placeholder === 'blur'
            ? blurDataURL || `data:image/svg+xml;base64,${toBase64(shimmer(width || 300, height || 200))}`
            : undefined
        }
      />
      
      {/* 로딩 상태 표시 */}
      {loading && (
        <div 
          className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center"
          style={{ width, height }}
        >
          <ImageIcon className="w-8 h-8 text-gray-300" />
        </div>
      )}
    </div>
  )
}

// 마사지샵 카드용 특화 이미지 컴포넌트
export function MassageShopImage({
  src,
  alt,
  className = '',
  ...props
}: Omit<OptimizedImageProps, 'width' | 'height'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={400}
      height={300}
      className={`object-cover rounded-lg ${className}`}
      placeholder="blur"
      quality={80}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      {...props}
    />
  )
}

// 배너 이미지용 특화 컴포넌트
export function BannerImage({
  src,
  alt,
  className = '',
  ...props
}: Omit<OptimizedImageProps, 'fill'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      fill
      className={`object-cover ${className}`}
      placeholder="blur"
      quality={90}
      priority
      sizes="100vw"
      {...props}
    />
  )
}

// 아바타/프로필 이미지용 컴포넌트
export function AvatarImage({
  src,
  alt,
  size = 40,
  className = '',
  ...props
}: Omit<OptimizedImageProps, 'width' | 'height'> & { size?: number }) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`rounded-full object-cover ${className}`}
      placeholder="blur"
      quality={85}
      {...props}
    />
  )
}