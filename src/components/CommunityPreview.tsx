'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MessageSquare, Eye, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CommunityPost {
  id: number
  category: string
  title: string
  author: string
  views: number
  comments: number
  isHot?: boolean
  createdAt: string
}

interface CommunityStats {
  totalPosts: number
  todayPosts: number
  activeUsers: number
  todayComments: number
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case '자유': return 'bg-blue-100 text-blue-800'
    case '질문': return 'bg-green-100 text-green-800'
    case '팁': return 'bg-purple-100 text-purple-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export default function CommunityPreview() {
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [stats, setStats] = useState<CommunityStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        setLoading(true)
        
        // 인기 게시글 API 호출
        const postsResponse = await fetch('/api/community/posts?limit=6&type=popular')
        if (!postsResponse.ok) {
          throw new Error('Failed to fetch posts')
        }
        const postsData = await postsResponse.json()
        setPosts(postsData.posts || [])

        // 커뮤니티 통계 API 호출
        const statsResponse = await fetch('/api/community/stats')
        if (!statsResponse.ok) {
          throw new Error('Failed to fetch stats')
        }
        const statsData = await statsResponse.json()
        setStats(statsData)

      } catch (err) {
        console.error('Error fetching community data:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchCommunityData()
  }, [])

  if (loading) {
    return (
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg border p-4">
                  <div className="h-6 bg-gray-200 rounded w-20 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <p className="text-gray-600">커뮤니티 데이터를 불러올 수 없습니다.</p>
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline" 
              className="mt-4"
            >
              다시 시도
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* 섹션 헤더 */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">커뮤니티</h2>
            <p className="text-gray-600">마사지와 건강 정보를 나누는 공간</p>
          </div>
          <Link href="/community">
            <Button variant="outline" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              전체보기
            </Button>
          </Link>
        </div>

        {/* 인기 게시글 그리드 */}
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <Link key={post.id} href={`/community/${post.id}`}>
                <div className="bg-white rounded-lg border p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                    {post.isHot && (
                      <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        HOT
                      </span>
                    )}
                  </div>
                  
                  <h3 className="font-medium text-gray-900 mb-3 line-clamp-2 leading-5">
                    {post.title}
                  </h3>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span className="font-medium">{post.author}</span>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{post.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">아직 게시글이 없습니다.</p>
          </div>
        )}

        {/* 커뮤니티 통계 */}
        {stats && (
          <div className="mt-8 bg-white rounded-lg border p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{stats.totalPosts.toLocaleString()}</div>
                <div className="text-sm text-gray-600">전체 게시글</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{stats.todayPosts}</div>
                <div className="text-sm text-gray-600">오늘 새 글</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{stats.activeUsers.toLocaleString()}</div>
                <div className="text-sm text-gray-600">활성 회원</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">{stats.todayComments}</div>
                <div className="text-sm text-gray-600">오늘 댓글</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}