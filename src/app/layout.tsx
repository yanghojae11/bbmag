import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/context/AuthContext'

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
  metadataBase: new URL('https:babymag.co.kr'), // 실제 도메인으로 변경
  openGraph: {
    title: "비비막 - 마사지샵 예약 플랫폼",
    description: "스웨디시, 아로마, 타이마사지 전문 업체를 찾고 예약하세요",
    url: 'https://your-domain.com',
    siteName: '비비막',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg', // 카카오톡 공유용 이미지 (1200x630 권장)
        width: 1200,
        height: 630,
        alt: '비비막 - 마사지샵 예약 플랫폼',
      },
    ],
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
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}