/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },
  
  // 보안 헤더 설정
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // XSS 보호
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          // 콘텐츠 타입 스니핑 방지
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          // Referrer 정책
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          // X-Frame-Options (클릭재킹 방지)
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          // HSTS (HTTPS 강제)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdnjs.cloudflare.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https: blob:",
              "connect-src 'self' https://api.anthropic.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "upgrade-insecure-requests"
            ].join('; ')
          },
          // Permissions Policy (이전 Feature Policy)
          {
            key: 'Permissions-Policy',
            value: [
              'camera=(),',
              'microphone=(),',
              'geolocation=()',
              'payment=(),',
              'usb=(),',
              'bluetooth=(),',
              'magnetometer=(),',
              'gyroscope=(),',
              'accelerometer=()',
            ].join(' ')
          }
        ],
      },
    ]
  },

  // 리다이렉트 설정
  async redirects() {
    return [
      // www 서브도메인을 메인 도메인으로 리다이렉트
      {
        source: '/(.*)',
        has: [
          {
            type: 'host',
            value: 'www.babymag.co.kr',
          },
        ],
        destination: 'https://babymag.co.kr/$1',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig