'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Search, Bell, Pin, Calendar, Eye, ChevronRight } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function NoticePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: '전체' },
    { id: 'service', name: '서비스' },
    { id: 'update', name: '업데이트' },
    { id: 'maintenance', name: '점검' },
    { id: 'event', name: '이벤트' },
    { id: 'policy', name: '정책' }
  ]

  const notices = [
    {
      id: 1,
      category: 'service',
      title: '비비막 서비스 정식 오픈 안내',
      content: '안녕하세요. 비비막입니다. 드디어 비비막 서비스가 정식으로 오픈되었습니다. 전국의 우수한 마사지샵 정보를 한 곳에서 확인하실 수 있으며, 실시간 리뷰와 평점을 통해 신뢰할 수 있는 정보를 제공합니다.',
      date: '2024-12-06',
      views: 1250,
      isPinned: true,
      isImportant: true
    },
    {
      id: 2,
      category: 'update',
      title: '커뮤니티 기능 업데이트 안내',
      content: '사용자 여러분의 요청에 따라 커뮤니티 기능을 대폭 개선했습니다. 새로운 에디터와 카테고리별 게시판을 통해 더욱 편리하게 소통하실 수 있습니다.',
      date: '2024-12-05',
      views: 890,
      isPinned: false,
      isImportant: false
    },
    {
      id: 3,
      category: 'event',
      title: '신규 가입 이벤트 - 첫 리뷰 작성 시 포인트 지급',
      content: '12월 한 달간 신규 가입 회원을 대상으로 특별 이벤트를 진행합니다. 첫 번째 리뷰 작성 시 1000포인트를 지급해드립니다.',
      date: '2024-12-04',
      views: 2340,
      isPinned: true,
      isImportant: false
    },
    {
      id: 4,
      category: 'policy',
      title: '개인정보처리방침 개정 안내',
      content: '개인정보보호법 개정에 따라 개인정보처리방침을 일부 개정합니다. 주요 변경사항은 다음과 같습니다.',
      date: '2024-12-03',
      views: 567,
      isPinned: false,
      isImportant: true
    },
    {
      id: 5,
      category: 'maintenance',
      title: '시스템 정기 점검 안내 (12월 7일 02:00~04:00)',
      content: '안정적인 서비스 제공을 위해 정기 점검을 실시합니다. 점검 시간 중에는 서비스 이용이 일시적으로 제한될 수 있습니다.',
      date: '2024-12-02',
      views: 445,
      isPinned: false,
      isImportant: true
    },
    {
      id: 6,
      category: 'service',
      title: '업체 등록 절차 간소화 안내',
      content: '마사지샵 사업자분들의 편의를 위해 업체 등록 절차를 간소화했습니다. 이제 더욱 쉽고 빠르게 등록하실 수 있습니다.',
      date: '2024-12-01',
      views: 678,
      isPinned: false,
      isImportant: false
    },
    {
      id: 7,
      category: 'update',
      title: '모바일 앱 UI/UX 개선 업데이트',
      content: '모바일 사용자 경험 향상을 위해 앱 인터페이스를 개선했습니다. 더욱 직관적이고 사용하기 편리해졌습니다.',
      date: '2024-11-30',
      views: 723,
      isPinned: false,
      isImportant: false
    },
    {
      id: 8,
      category: 'service',
      title: '지역별 마사지샵 검색 기능 추가',
      content: '사용자 편의성 향상을 위해 지역별 상세 검색 기능을 추가했습니다. 시/구/동 단위로 더욱 정확한 검색이 가능합니다.',
      date: '2024-11-29',
      views: 512,
      isPinned: false,
      isImportant: false
    },
    {
      id: 9,
      category: 'event',
      title: '11월 베스트 리뷰어 시상식 결과 발표',
      content: '11월 한 달간 유용한 리뷰를 작성해주신 회원분들을 시상했습니다. 수상자 발표 및 시상 내역을 안내드립니다.',
      date: '2024-11-28',
      views: 834,
      isPinned: false,
      isImportant: false
    },
    {
      id: 10,
      category: 'policy',
      title: '리뷰 작성 가이드라인 업데이트',
      content: '건전한 리뷰 문화 조성을 위해 리뷰 작성 가이드라인을 업데이트했습니다. 새로운 가이드라인을 확인해주세요.',
      date: '2024-11-27',
      views: 445,
      isPinned: false,
      isImportant: false
    }
  ]

  const filteredNotices = notices.filter(notice => {
    const matchesCategory = selectedCategory === 'all' || notice.category === selectedCategory
    const matchesSearch = searchTerm === '' || 
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesCategory && matchesSearch
  })

  const sortedNotices = filteredNotices.sort((a, b) => {
    // 고정된 공지사항을 먼저 표시
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    
    // 날짜순 정렬 (최신순)
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category ? category.name : categoryId
  }

  const getCategoryColor = (categoryId: string) => {
    switch (categoryId) {
      case 'service': return 'bg-blue-100 text-blue-800'
      case 'update': return 'bg-green-100 text-green-800'
      case 'maintenance': return 'bg-yellow-100 text-yellow-800'
      case 'event': return 'bg-purple-100 text-purple-800'
      case 'policy': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-12">
        {/* 페이지 헤더 */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 md:p-3 bg-blue-100 rounded-lg">
              <Bell className="w-6 md:w-8 h-6 md:h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">공지사항</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6 md:mb-8 text-sm md:text-base leading-relaxed">
            비비막의 새로운 소식과 업데이트, 중요한 안내사항을 확인하세요.
          </p>
          
          {/* 검색창 */}
          <div className="max-w-lg mx-auto relative">
            <Search className="w-4 md:w-5 h-4 md:h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <Input
              type="text"
              placeholder="공지사항 검색..."
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
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors mr-3 flex-shrink-0 ${
                  selectedCategory === category.id
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-white text-gray-700 border border-gray-200'
                }`}
              >
                {category.name}
                <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
                  {category.id === 'all' 
                    ? notices.length 
                    : notices.filter(notice => notice.category === category.id).length
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
                    <span>{category.name}</span>
                    <span className="text-sm text-gray-500">
                      {category.id === 'all' 
                        ? notices.length 
                        : notices.filter(notice => notice.category === category.id).length
                      }
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 공지사항 목록 */}
          <div className="flex-1">
            {sortedNotices.length > 0 ? (
              <div className="space-y-3 md:space-y-4">
                {sortedNotices.map((notice) => (
                  <div key={notice.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="p-4 md:p-6">
                      {/* 헤더 */}
                      <div className="flex items-start gap-3 mb-3">
                        {notice.isPinned && (
                          <Pin className="w-4 md:w-5 h-4 md:h-5 text-red-500 flex-shrink-0 mt-1" />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(notice.category)}`}>
                              {getCategoryName(notice.category)}
                            </span>
                            {notice.isImportant && (
                              <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
                                중요
                              </span>
                            )}
                          </div>
                          
                          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors cursor-pointer leading-tight">
                            {notice.title}
                          </h3>
                          
                          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                            {notice.content}
                          </p>
                          
                          {/* 메타 정보 */}
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center gap-3 md:gap-4">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 md:w-4 h-3 md:h-4" />
                                <span className="text-xs md:text-sm">{formatDate(notice.date)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="w-3 md:w-4 h-3 md:h-4" />
                                <span className="text-xs md:text-sm">{notice.views.toLocaleString()}</span>
                              </div>
                            </div>
                            
                            <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors">
                              <span className="text-xs md:text-sm">자세히</span>
                              <ChevronRight className="w-3 md:w-4 h-3 md:h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
                <p className="text-gray-600 mb-4 text-sm md:text-base">
                  다른 키워드로 검색해보시거나 전체 공지사항을 확인해보세요.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('all')
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm md:text-base"
                >
                  전체 공지사항 보기
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 구독 안내 */}
        <div className="mt-8 md:mt-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 md:p-8 text-white text-center">
          <Bell className="w-10 md:w-12 h-10 md:h-12 mx-auto mb-4" />
          <h3 className="text-lg md:text-xl font-bold mb-4">공지사항 알림 받기</h3>
          <p className="text-blue-100 mb-6 text-sm md:text-base">
            중요한 공지사항과 업데이트 소식을 이메일로 받아보세요.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="이메일 주소 입력"
              className="flex-1 px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500 text-sm md:text-base"
            />
            <button className="px-4 md:px-6 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm md:text-base">
              구독
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}