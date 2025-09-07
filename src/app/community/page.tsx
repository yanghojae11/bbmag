'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { MessageSquare, Eye, ThumbsUp, Search, Edit, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Header from '@/components/Header'

interface Post {
  id: number
  category: string
  title: string
  author: string
  authorLevel?: string
  date: string
  views: number
  likes: number
  comments: number
  isHot?: boolean
  isNotice?: boolean
}

interface Category {
  id: string
  name: string
  count: number
}

interface CommunityData {
  posts: Post[]
  categories: Category[]
  totalPosts: number
  currentPage: number
  totalPages: number
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case '공지': return 'bg-red-500 text-white'
    case '자유': return 'bg-blue-500 text-white'
    case '질문': return 'bg-green-500 text-white'
    case '팁': return 'bg-purple-500 text-white'
    default: return 'bg-gray-500 text-white'
  }
}

const getLevelColor = (level?: string) => {
  switch (level) {
    case '관리자': return 'text-red-600 font-bold'
    case '전문가': return 'text-purple-600 font-semibold'
    case 'VIP': return 'text-blue-600 font-semibold'
    case '새싹': return 'text-green-600'
    default: return 'text-gray-600'
  }
}

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [communityData, setCommunityData] = useState<CommunityData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // API에서 커뮤니티 데이터 가져오기 - useCallback으로 최적화
  const fetchCommunityData = useCallback(async () => {
    try {
      setLoading(true)
      
      const params = new URLSearchParams({
        category: selectedCategory,
        search: searchTerm,
        page: currentPage.toString(),
        limit: '20'
      })

      const response = await fetch(`/api/community/posts?${params}`)
      if (!response.ok) {
        throw new Error('Failed to fetch community data')
      }

      const data = await response.json()
      setCommunityData(data)
      
    } catch (err) {
      console.error('Error fetching community data:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [selectedCategory, searchTerm, currentPage])

  useEffect(() => {
    fetchCommunityData()
  }, [fetchCommunityData])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    // fetchCommunityData() 호출 제거 - useEffect가 자동으로 호출됨
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            <span className="ml-2 text-gray-600">데이터를 불러오는 중...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center py-20">
            <p className="text-gray-600 mb-4">데이터를 불러올 수 없습니다.</p>
            <Button onClick={() => fetchCommunityData()} variant="outline">
              다시 시도
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!communityData) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">커뮤니티</h1>
          <p className="text-gray-600">마사지와 건강에 대한 정보를 나누는 공간입니다.</p>
        </div>

        {/* Category Tabs - 가로 스크롤 최적화 */}
        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
          <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
            {communityData.categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 min-w-max ${
                  selectedCategory === category.id
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>{category.name}</span>
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="space-y-4">
          {/* 검색 및 글쓰기 */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="space-y-3">
              {/* 검색 */}
              <form onSubmit={handleSearch} className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <Input
                  placeholder="제목이나 작성자를 검색하세요"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-20"
                />
                <Button 
                  type="submit" 
                  size="sm" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 px-3 text-xs bg-gray-800 hover:bg-gray-900"
                >
                  검색
                </Button>
              </form>
              
              {/* 글쓰기 버튼 */}
              <Link href="/community/write" className="block">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 py-3">
                  <Edit className="w-4 h-4 mr-2" />
                  글쓰기
                </Button>
              </Link>
            </div>
          </div>

          {/* 인기 게시글 섹션 (모바일용) */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">인기 게시글</h3>
            <div className="text-xs text-gray-500">
              인기 게시글을 불러오는 중...
            </div>
          </div>

          {/* 게시글 목록 - 모바일 카드 형태 */}
          <div className="space-y-0 bg-white rounded-lg shadow-sm overflow-hidden">
            {communityData.posts.length > 0 ? (
              communityData.posts.map((post, index) => (
                <Link 
                  key={post.id} 
                  href={`/community/${post.id}`} 
                  className={`block p-4 hover:bg-gray-50 transition-colors ${
                    index !== communityData.posts.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div className="space-y-3">
                    {/* 카테고리와 뱃지 */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(post.category)}`}>
                        {post.category}
                      </span>
                      {post.isNotice && (
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
                          공지
                        </span>
                      )}
                      {post.isHot && (
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded">
                          HOT
                        </span>
                      )}
                    </div>

                    {/* 제목 */}
                    <div className="text-base font-medium text-gray-900 leading-tight">
                      {post.title}
                      {post.comments > 0 && (
                        <span className="text-blue-500 text-sm ml-2">
                          [{post.comments}]
                        </span>
                      )}
                    </div>

                    {/* 작성자 및 통계 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <span className={getLevelColor(post.authorLevel)}>
                          {post.author}
                        </span>
                        <span className="text-gray-400">·</span>
                        <span className="text-gray-500 text-xs">{post.date}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{post.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" />
                          <span>{post.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-20">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">검색 결과가 없습니다.</p>
              </div>
            )}
          </div>

          {/* 페이지네이션 */}
          {communityData.totalPages > 1 && (
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-center items-center">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={currentPage <= 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    이전
                  </Button>
                  {Array.from({ length: Math.min(5, communityData.totalPages) }, (_, i) => {
                    const page = i + 1
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="w-8 h-8"
                      >
                        {page}
                      </Button>
                    )
                  })}
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled={currentPage >= communityData.totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    다음
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}