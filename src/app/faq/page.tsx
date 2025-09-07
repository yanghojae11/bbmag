'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Search, ChevronDown, ChevronUp, User, Building, MessageSquare, Heart, Star, HelpCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [openItems, setOpenItems] = useState<number[]>([])

  const categories = [
    { id: 'all', name: '전체', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'account', name: '계정', icon: <User className="w-4 h-4" /> },
    { id: 'search', name: '검색', icon: <Search className="w-4 h-4" /> },
    { id: 'reviews', name: '리뷰', icon: <Star className="w-4 h-4" /> },
    { id: 'favorites', name: '찜하기', icon: <Heart className="w-4 h-4" /> },
    { id: 'business', name: '업체', icon: <Building className="w-4 h-4" /> },
    { id: 'community', name: '커뮤니티', icon: <MessageSquare className="w-4 h-4" /> }
  ]

  const faqData = [
    {
      id: 1,
      category: 'account',
      question: '회원가입은 무료인가요?',
      answer: '네, 비비막 회원가입은 완전 무료입니다. 추가 비용 없이 모든 서비스를 이용하실 수 있습니다.',
      tags: ['회원가입', '무료', '가입']
    },
    {
      id: 2,
      category: 'account',
      question: '비밀번호를 잊어버렸어요. 어떻게 재설정하나요?',
      answer: '로그인 페이지에서 "비밀번호 찾기"를 클릭하신 후, 가입 시 등록한 이메일 주소를 입력하면 비밀번호 재설정 링크가 전송됩니다.',
      tags: ['비밀번호', '재설정', '찾기']
    },
    {
      id: 3,
      category: 'account',
      question: '회원 탈퇴는 어떻게 하나요?',
      answer: '마이페이지 → 계정 설정 → 회원 탈퇴에서 진행하실 수 있습니다. 탈퇴 시 모든 개인정보가 삭제되며 복구가 불가능합니다.',
      tags: ['회원탈퇴', '계정삭제']
    },
    {
      id: 4,
      category: 'search',
      question: '마사지샵 검색은 어떻게 하나요?',
      answer: '메인 페이지 상단의 검색창에서 지역명이나 마사지샵 이름을 입력하시거나, "마사지샵 찾기" 메뉴에서 다양한 필터를 사용해 검색하실 수 있습니다.',
      tags: ['검색', '마사지샵', '찾기']
    },
    {
      id: 5,
      category: 'search',
      question: '지역별 검색은 어떻게 하나요?',
      answer: '메인 페이지의 지역 검색 섹션에서 원하는 지역을 선택하거나, 검색창에 "서울 마사지", "강남 스웨디시" 등으로 검색하시면 됩니다.',
      tags: ['지역검색', '지역별', '위치']
    },
    {
      id: 6,
      category: 'search',
      question: '마사지샵 예약은 비비막에서 할 수 있나요?',
      answer: '비비막은 정보 제공 플랫폼으로, 직접 예약 기능은 제공하지 않습니다. 각 마사지샵의 연락처를 통해 직접 문의하여 예약하시기 바랍니다.',
      tags: ['예약', '문의', '전화']
    },
    {
      id: 7,
      category: 'reviews',
      question: '리뷰는 어떻게 작성하나요?',
      answer: '마사지샵 상세 페이지에서 "리뷰 작성하기" 버튼을 클릭하시면 됩니다. 로그인이 필요하며, 실제 이용 후 작성해주세요.',
      tags: ['리뷰작성', '후기', '평점']
    },
    {
      id: 8,
      category: 'reviews',
      question: '내가 작성한 리뷰를 수정하거나 삭제할 수 있나요?',
      answer: '네, 가능합니다. 마이페이지 → 내 리뷰에서 작성한 리뷰를 확인하고 수정 또는 삭제하실 수 있습니다.',
      tags: ['리뷰수정', '리뷰삭제', '관리']
    },
    {
      id: 9,
      category: 'reviews',
      question: '부적절한 리뷰를 신고하고 싶어요.',
      answer: '각 리뷰 우측 하단의 "신고" 버튼을 클릭하여 신고하실 수 있습니다. 허위, 광고, 욕설 등 부적절한 리뷰는 검토 후 삭제됩니다.',
      tags: ['리뷰신고', '부적절', '신고']
    },
    {
      id: 10,
      category: 'favorites',
      question: '찜하기 기능은 어떻게 사용하나요?',
      answer: '마사지샵 카드나 상세 페이지에서 하트 모양의 찜하기 버튼을 클릭하시면 됩니다. 찜한 마사지샵은 "찜한 마사지샵" 메뉴에서 확인할 수 있습니다.',
      tags: ['찜하기', '하트', '관심목록']
    },
    {
      id: 11,
      category: 'favorites',
      question: '찜한 마사지샵은 최대 몇 개까지 저장할 수 있나요?',
      answer: '찜하기 개수에는 제한이 없습니다. 원하는 만큼 마사지샵을 찜 목록에 추가하실 수 있습니다.',
      tags: ['찜하기', '개수', '제한']
    },
    {
      id: 12,
      category: 'business',
      question: '마사지샵 업체 등록은 어떻게 하나요?',
      answer: '"업체 등록" 메뉴에서 사업자등록증, 업체 정보, 서비스 내용 등을 입력하여 신청하실 수 있습니다. 검토 후 승인됩니다.',
      tags: ['업체등록', '사업자', '신청']
    },
    {
      id: 13,
      category: 'business',
      question: '업체 등록에 비용이 발생하나요?',
      answer: '기본 업체 등록은 무료입니다. 프리미엄 광고나 상위 노출 서비스는 별도 문의가 필요합니다.',
      tags: ['업체등록', '비용', '무료']
    },
    {
      id: 14,
      category: 'business',
      question: '등록된 업체 정보를 수정하고 싶어요.',
      answer: '업체 대시보드에 로그인하여 정보를 수정하실 수 있습니다. 주요 정보 변경 시에는 재검토가 필요할 수 있습니다.',
      tags: ['업체수정', '정보변경', '대시보드']
    },
    {
      id: 15,
      category: 'community',
      question: '커뮤니티에 글을 작성하려면 회원가입이 필요한가요?',
      answer: '네, 글 작성과 댓글 작성을 위해서는 회원가입 및 로그인이 필요합니다. 글 읽기는 비회원도 가능합니다.',
      tags: ['커뮤니티', '글쓰기', '회원가입']
    },
    {
      id: 16,
      category: 'community',
      question: '커뮤니티 이용 규칙이 있나요?',
      answer: '네, 건전한 커뮤니티 문화를 위해 욕설, 광고, 개인정보 노출, 허위정보 등은 금지됩니다. 자세한 내용은 커뮤니티 규칙을 참고해주세요.',
      tags: ['커뮤니티', '규칙', '금지사항']
    }
  ]

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-12">
        {/* 페이지 헤더 */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">자주 묻는 질문</h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6 md:mb-8 text-sm md:text-base leading-relaxed">
            비비막 이용 중 자주 묻는 질문들을 모아두었습니다. 
            궁금한 내용을 검색하거나 카테고리별로 찾아보세요.
          </p>
          
          {/* 검색창 */}
          <div className="max-w-lg mx-auto relative">
            <Search className="w-4 md:w-5 h-4 md:h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <Input
              type="text"
              placeholder="질문 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-base md:text-lg"
            />
          </div>
        </div>

        {/* 모바일 카테고리 탭 (가로 스크롤) */}
        <div className="md:hidden mb-6">
          <div className="flex overflow-x-auto pb-2 scrollbar-hide" style={{scrollbarWidth: 'none'}}>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors mr-3 flex-shrink-0 ${
                  selectedCategory === category.id
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-white text-gray-700 border border-gray-200'
                }`}
              >
                {category.icon}
                <span>{category.name}</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
                  {category.id === 'all' 
                    ? faqData.length 
                    : faqData.filter(faq => faq.category === category.id).length
                  }
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-8">
          {/* 데스크톱 카테고리 사이드바 */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-4">
              <h3 className="font-semibold text-gray-900 mb-4">카테고리</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-100 text-blue-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {category.icon}
                      <span>{category.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {category.id === 'all' 
                        ? faqData.length 
                        : faqData.filter(faq => faq.category === category.id).length
                      }
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ 목록 */}
          <div className="flex-1">
            {filteredFAQs.length > 0 ? (
              <div className="space-y-3 md:space-y-4">
                {filteredFAQs.map((faq) => (
                  <div key={faq.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full px-4 md:px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="font-medium text-gray-900 pr-4 text-sm md:text-base">{faq.question}</h3>
                      {openItems.includes(faq.id) ? (
                        <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      )}
                    </button>
                    
                    {openItems.includes(faq.id) && (
                      <div className="px-4 md:px-6 pb-4 border-t border-gray-100">
                        <div className="pt-4 text-gray-700 leading-relaxed text-sm md:text-base">
                          {faq.answer}
                        </div>
                        
                        {/* 태그 */}
                        <div className="mt-4 flex flex-wrap gap-2">
                          {faq.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
                <p className="text-gray-600 mb-4 text-sm md:text-base">
                  다른 키워드로 검색해보시거나 전체 FAQ를 확인해보세요.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('all')
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm md:text-base"
                >
                  전체 FAQ 보기
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 추가 도움 섹션 */}
        <div className="mt-8 md:mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6 md:p-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">원하는 답을 찾지 못하셨나요?</h3>
            <p className="text-gray-600 mb-6 text-sm md:text-base">
              FAQ에 없는 질문이나 추가적인 도움이 필요하시면 직접 문의해주세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-4 md:px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm md:text-base"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                문의하기
              </a>
              <a
                href="/help"
                className="inline-flex items-center justify-center px-4 md:px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium text-sm md:text-base"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                도움말 보기
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}