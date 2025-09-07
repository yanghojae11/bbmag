import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Home, Search, Heart, Users, HelpCircle, FileText, Shield, MapPin } from 'lucide-react'

export default function Sitemap() {
  const siteLinks = [
    {
      category: '메인 서비스',
      icon: <Home className="w-5 h-5" />,
      links: [
        { name: '홈', url: '/', description: '비비막 메인 페이지' },
        { name: '마사지샵 찾기', url: '/massage-promotion', description: '전국 마사지샵 검색 및 정보' },
        { name: '마사지샵 상세', url: '/massage/1', description: '개별 마사지샵 상세 정보' },
      ]
    },
    {
      category: '회원 서비스',
      icon: <Heart className="w-5 h-5" />,
      links: [
        { name: '찜한 마사지샵', url: '/favorites', description: '관심 마사지샵 관리' },
        { name: '회원가입', url: '/auth/signup', description: '새로운 회원 등록' },
        { name: '로그인', url: '/auth/login', description: '기존 회원 로그인' },
      ]
    },
    {
      category: '커뮤니티',
      icon: <Users className="w-5 h-5" />,
      links: [
        { name: '커뮤니티', url: '/community', description: '마사지 정보 커뮤니티' },
        { name: '글쓰기', url: '/community/write', description: '커뮤니티 게시글 작성' },
        { name: '자유게시판', url: '/community?category=free', description: '자유로운 소통 공간' },
        { name: '질문답변', url: '/community?category=qna', description: '궁금한 점 질문하기' },
        { name: '마사지팁', url: '/community?category=tips', description: '마사지 관련 팁 공유' },
      ]
    },
    {
      category: '비즈니스',
      icon: <MapPin className="w-5 h-5" />,
      links: [
        { name: '업체 등록', url: '/business', description: '마사지샵 사업자 등록' },
        { name: '업체 관리', url: '/business/dashboard', description: '등록된 업체 정보 관리' },
      ]
    },
    {
      category: '고객지원',
      icon: <HelpCircle className="w-5 h-5" />,
      links: [
        { name: '도움말', url: '/help', description: '서비스 이용 가이드' },
        { name: '자주 묻는 질문', url: '/faq', description: 'FAQ 및 문제 해결' },
        { name: '문의하기', url: '/contact', description: '고객센터 문의' },
        { name: '공지사항', url: '/notice', description: '서비스 공지사항' },
      ]
    },
    {
      category: '정책 및 약관',
      icon: <Shield className="w-5 h-5" />,
      links: [
        { name: '개인정보처리방침', url: '/privacy', description: '개인정보 보호 정책' },
        { name: '이용약관', url: '/terms', description: '서비스 이용 약관' },
        { name: '사이트맵', url: '/sitemap', description: '전체 페이지 구조' },
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">사이트맵</h1>
          <p className="text-gray-600">
            비비막의 모든 페이지와 서비스를 한눈에 확인하실 수 있습니다.
          </p>
        </div>

        {/* 빠른 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">6</div>
            <div className="text-gray-700 text-sm">주요 카테고리</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">20+</div>
            <div className="text-gray-700 text-sm">전체 페이지</div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">24/7</div>
            <div className="text-gray-700 text-sm">서비스 이용</div>
          </div>
        </div>

        {/* 사이트맵 메인 콘텐츠 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {siteLinks.map((section, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  {section.icon}
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{section.category}</h2>
              </div>
              
              <div className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <div key={linkIndex} className="border-l-2 border-gray-100 pl-4 hover:border-l-blue-400 transition-colors">
                    <Link 
                      href={link.url}
                      className="block group"
                    >
                      <div className="text-blue-600 font-medium group-hover:text-blue-800 transition-colors">
                        {link.name}
                      </div>
                      <div className="text-gray-600 text-sm mt-1">
                        {link.description}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 추가 정보 섹션 */}
        <div className="mt-12 bg-gray-50 rounded-lg p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">서비스 소개</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">비비막이란?</h3>
              <p className="text-gray-600 text-sm">
                전국의 우수한 마사지샵 정보를 제공하는 대한민국 최고의 마사지샵 플랫폼입니다. 
                신뢰할 수 있는 리뷰와 상세한 정보로 최적의 마사지샵을 찾아보세요.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">주요 특징</h3>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• 전국 1,000개 이상 마사지샵 정보</li>
                <li>• 실시간 리뷰 및 평점 시스템</li>
                <li>• 지역별, 서비스별 맞춤 검색</li>
                <li>• 활발한 커뮤니티 운영</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 검색 도구 */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Search className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">페이지를 찾을 수 없나요?</h3>
          </div>
          <p className="text-gray-700 text-sm mb-4">
            원하는 페이지를 찾지 못하셨다면 검색 기능을 이용해보세요.
          </p>
          <div className="flex gap-2">
            <Link 
              href="/"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              홈으로 이동
            </Link>
            <Link 
              href="/contact"
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm"
            >
              문의하기
            </Link>
          </div>
        </div>

        {/* 마지막 업데이트 정보 */}
        <div className="mt-8 text-center text-gray-500 text-sm border-t border-gray-200 pt-8">
          <p>사이트맵 최종 업데이트: 2024년 12월 6일</p>
          <p>문의사항이 있으시면 <Link href="/contact" className="text-blue-600 hover:underline">고객센터</Link>로 연락주세요.</p>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}