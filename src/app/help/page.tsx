'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Search, User, Heart, MessageSquare, Building, Star, ChevronRight, BookOpen, HelpCircle, Users, Shield } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const helpCategories = [
    {
      id: 'getting-started',
      title: '시작하기',
      icon: <BookOpen className="w-5 md:w-6 h-5 md:h-6" />,
      color: 'bg-blue-100 text-blue-600',
      guides: [
        { title: '비비막 서비스 소개', description: '비비막이 제공하는 서비스에 대해 알아보세요' },
        { title: '회원가입 방법', description: '간단한 회원가입 절차를 안내합니다' },
        { title: '로그인 및 계정 관리', description: '로그인 방법과 계정 정보 관리하기' },
        { title: '첫 번째 마사지샵 검색하기', description: '원하는 마사지샵을 찾는 방법을 알아보세요' }
      ]
    },
    {
      id: 'search-booking',
      title: '검색 및 예약',
      icon: <Search className="w-5 md:w-6 h-5 md:h-6" />,
      color: 'bg-green-100 text-green-600',
      guides: [
        { title: '마사지샵 검색 방법', description: '지역별, 서비스별 검색 기능 활용하기' },
        { title: '필터 사용하기', description: '가격, 평점, 거리 등 조건으로 검색하기' },
        { title: '마사지샵 정보 보기', description: '상세 정보, 사진, 리뷰 확인하는 방법' },
        { title: '전화 문의 및 예약', description: '마사지샵에 직접 연락하는 방법' }
      ]
    },
    {
      id: 'reviews',
      title: '리뷰 및 평점',
      icon: <Star className="w-5 md:w-6 h-5 md:h-6" />,
      color: 'bg-yellow-100 text-yellow-600',
      guides: [
        { title: '리뷰 작성하기', description: '마사지샵 이용 후 리뷰 남기는 방법' },
        { title: '리뷰 수정 및 삭제', description: '내가 작성한 리뷰 관리하기' },
        { title: '도움이 되는 리뷰 작성법', description: '다른 사용자에게 유용한 리뷰 작성 팁' },
        { title: '리뷰 신고하기', description: '부적절한 리뷰 신고 방법' }
      ]
    },
    {
      id: 'favorites',
      title: '찜하기 및 관리',
      icon: <Heart className="w-5 md:w-6 h-5 md:h-6" />,
      color: 'bg-red-100 text-red-600',
      guides: [
        { title: '마사지샵 찜하기', description: '관심 있는 마사지샵을 찜 목록에 추가하기' },
        { title: '찜 목록 관리', description: '찜한 마사지샵 확인하고 정리하기' },
        { title: '찜 목록 공유하기', description: '친구와 찜 목록 공유하는 방법' }
      ]
    },
    {
      id: 'community',
      title: '커뮤니티',
      icon: <MessageSquare className="w-5 md:w-6 h-5 md:h-6" />,
      color: 'bg-purple-100 text-purple-600',
      guides: [
        { title: '커뮤니티 이용하기', description: '게시글 읽기, 댓글 달기 등 기본 이용법' },
        { title: '글 작성하기', description: '새로운 게시글 작성 방법과 에디터 사용법' },
        { title: '카테고리별 이용 가이드', description: '자유게시판, 질문답변, 마사지팁 활용하기' },
        { title: '커뮤니티 규칙', description: '건전한 커뮤니티를 위한 이용 규칙' }
      ]
    },
    {
      id: 'business',
      title: '업체 등록',
      icon: <Building className="w-5 md:w-6 h-5 md:h-6" />,
      color: 'bg-indigo-100 text-indigo-600',
      guides: [
        { title: '업체 등록 신청', description: '마사지샵 사업자를 위한 등록 절차' },
        { title: '업체 정보 관리', description: '등록된 업체 정보 수정 및 관리 방법' },
        { title: '업체 인증 과정', description: '업체 인증을 위한 필요 서류와 절차' },
        { title: '업체 대시보드 이용법', description: '업체 관리 도구 사용 방법' }
      ]
    }
  ]

  const quickLinks = [
    { title: 'FAQ', href: '/faq', icon: <HelpCircle className="w-4 md:w-5 h-4 md:h-5" /> },
    { title: '문의하기', href: '/contact', icon: <MessageSquare className="w-4 md:w-5 h-4 md:h-5" /> },
    { title: '커뮤니티', href: '/community', icon: <Users className="w-4 md:w-5 h-4 md:h-5" /> },
    { title: '개인정보', href: '/privacy', icon: <Shield className="w-4 md:w-5 h-4 md:h-5" /> }
  ]

  const filteredCategories = helpCategories.filter(category =>
    searchTerm === '' || 
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.guides.some(guide => 
      guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-12">
        {/* 페이지 헤더 */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">도움말</h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6 md:mb-8 text-sm md:text-base leading-relaxed">
            비비막 서비스 이용에 도움이 되는 가이드와 팁을 확인해보세요. 
            궁금한 내용을 검색하거나 카테고리별로 찾아볼 수 있습니다.
          </p>
          
          {/* 검색창 */}
          <div className="max-w-lg mx-auto relative">
            <Search className="w-4 md:w-5 h-4 md:h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <Input
              type="text"
              placeholder="도움말 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-base md:text-lg"
            />
          </div>
        </div>

        {/* 빠른 링크 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12">
          {quickLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="bg-white rounded-lg p-3 md:p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-200 text-center group"
            >
              <div className="flex justify-center mb-2">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600 group-hover:bg-blue-200 transition-colors">
                  {link.icon}
                </div>
              </div>
              <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors text-sm md:text-base">
                {link.title}
              </h3>
            </a>
          ))}
        </div>

        {/* 도움말 카테고리 */}
        <div className="space-y-6 md:space-y-8">
          {filteredCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 md:p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${category.color}`}>
                    {category.icon}
                  </div>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900">{category.title}</h2>
                </div>
              </div>
              
              <div className="p-4 md:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {category.guides
                    .filter(guide => 
                      searchTerm === '' ||
                      guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      guide.description.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((guide, index) => (
                    <div
                      key={index}
                      className="p-3 md:p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors mb-2 text-sm md:text-base">
                            {guide.title}
                          </h3>
                          <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{guide.description}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 ml-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 추가 도움 섹션 */}
        <div className="mt-8 md:mt-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 md:p-8 text-white text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-4">원하는 답을 찾지 못하셨나요?</h2>
          <p className="text-blue-100 mb-6 text-sm md:text-base">
            직접 문의하시면 빠르고 정확한 답변을 받으실 수 있습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-4 md:px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm md:text-base"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              문의하기
            </a>
            <a
              href="/faq"
              className="inline-flex items-center justify-center px-4 md:px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-medium text-sm md:text-base"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              자주 묻는 질문
            </a>
          </div>
        </div>

        {/* 검색 결과 없음 */}
        {searchTerm && filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
            <p className="text-gray-600 mb-4 text-sm md:text-base">
              다른 키워드로 검색해보시거나 직접 문의해주세요.
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm md:text-base"
            >
              전체 도움말 보기
            </button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  )
}