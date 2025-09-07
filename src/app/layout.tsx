import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/context/AuthContext'
import { OrganizationSchema, WebsiteSchema } from '@/components/StructuredData'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "비비막 - 마사지샵 예약 | 스웨디시, 아로마, 타이마사지",
  description: "프리미엄 마사지샵 예약 플랫폼 비비막. 스웨디시, 홈타이, 로미로미, 아로마, 타이마사지, 중국마사지, 감성마사지, 림프마사지 전문 업체 찾기. 실시간 예약과 후기 확인 가능.",
  keywords: "비비막, 마사지, 스웨디시, 홈타이, 로미로미, 아로마, 홈케어, 타이마사지, 중국마사지, 감성마사지, 림프마사지, 후기, 마사지사이트, 마사지예약",
  authors: [{ name: "비비막" }],
  creator: "비비막",
  publisher: "비비막",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://babymag.co.kr'),
  openGraph: {
    title: "비비막 - 마사지샵 예약 플랫폼",
    description: "스웨디시, 아로마, 타이마사지 전문 업체를 찾고 예약하세요",
    url: 'https://babymag.co.kr',
    siteName: '비비막',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "비비막 - 마사지샵 예약 플랫폼",
    description: "스웨디시, 아로마, 타이마사지 전문 업체를 찾고 예약하세요",
    creator: '@bibimak',
    site: '@bibimak',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    // Google Search Console 인증 코드 (필요시 추가)
    // google: 'your-google-verification-code',
    // other: {
    //   'naver-site-verification': 'your-naver-verification-code',
    // },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#667eea" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="비비막" />
        
        {/* 카카오톡 공유를 위한 추가 메타 태그 */}
        <meta property="og:site_name" content="비비막" />
        <meta property="og:locale" content="ko_KR" />
        
        {/* 네이버 검색 최적화 */}
        <meta name="naver-site-verification" content="" />
        
        {/* 구조화 데이터 */}
        <OrganizationSchema
          name="비비막"
          url="https://babymag.co.kr"
          logo="https://babymag.co.kr/logo.png"
          description="대한민국 최고의 마사지샵 예약 플랫폼. 검증된 업체와 실시간 예약 서비스를 제공합니다."
          sameAs={[
            'https://www.facebook.com/bibimak',
            'https://www.instagram.com/bibimak',
            'https://blog.naver.com/bibimak'
          ]}
        />
        
        <WebsiteSchema
          url="https://babymag.co.kr"
          name="비비막"
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}