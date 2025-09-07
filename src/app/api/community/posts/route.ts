// src/app/api/community/posts/route.ts
import { NextRequest, NextResponse } from 'next/server'

const mockPosts = [
  {
    id: 1,
    category: '자유',
    title: '강남 마사지샵 추천 부탁드려요',
    author: '마사지러버',
    views: 1245,
    comments: 8,
    isHot: true,
    createdAt: '2024-12-06'
  },
  {
    id: 2,
    category: '팁',
    title: '마사지 전후 관리법 공유합니다',
    author: '헬스케어',
    views: 1892,
    comments: 18,
    isHot: true,
    createdAt: '2024-12-06'
  },
  {
    id: 3,
    category: '질문',
    title: '첫 마사지 받을 때 주의사항이 있나요?',
    author: '초보자',
    views: 856,
    comments: 24,
    createdAt: '2024-12-05'
  },
  {
    id: 4,
    category: '팁',
    title: '목과 어깨 뭉침 해소하는 셀프 마사지',
    author: '물리치료사',
    views: 2156,
    comments: 31,
    isHot: true,
    createdAt: '2024-12-05'
  },
  {
    id: 5,
    category: '자유',
    title: '스웨디시 vs 타이마사지 어떤게 좋을까요?',
    author: '고민이',
    views: 634,
    comments: 15,
    createdAt: '2024-12-04'
  },
  {
    id: 6,
    category: '질문',
    title: '임산부도 받을 수 있는 마사지가 있나요?',
    author: '예비맘',
    views: 987,
    comments: 19,
    createdAt: '2024-12-04'
  }
]

const mockCategories = [
  { id: 'all', name: '전체', count: 1247 },
  { id: 'free', name: '자유게시판', count: 856 },
  { id: 'question', name: '질문답변', count: 234 },
  { id: 'tip', name: '마사지팁', count: 157 }
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get('limit') || '10')
  const type = searchParams.get('type')
  const category = searchParams.get('category') || 'all'
  const search = searchParams.get('search') || ''
  const page = parseInt(searchParams.get('page') || '1')

  // 지연 시뮬레이션 (실제 API 호출 느낌)
  await new Promise(resolve => setTimeout(resolve, 500))

  if (type === 'popular') {
    // 메인 페이지용 인기 게시글
    const popularPosts = mockPosts.filter(post => post.isHot).slice(0, limit)
    return NextResponse.json({
      posts: popularPosts
    })
  }

  // 커뮤니티 페이지용 게시글 목록
  let filteredPosts = mockPosts

  // 카테고리 필터링
  if (category !== 'all') {
    const categoryMap: { [key: string]: string } = {
      'free': '자유',
      'question': '질문',
      'tip': '팁'
    }
    filteredPosts = filteredPosts.filter(post => post.category === categoryMap[category])
  }

  // 검색 필터링
  if (search) {
    filteredPosts = filteredPosts.filter(post => 
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.author.toLowerCase().includes(search.toLowerCase())
    )
  }

  // 페이지네이션
  const totalPosts = filteredPosts.length
  const totalPages = Math.ceil(totalPosts / limit)
  const startIndex = (page - 1) * limit
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + limit)

  // 게시글에 추가 정보 추가 (커뮤니티 페이지용)
  const postsWithDetails = paginatedPosts.map(post => ({
    ...post,
    authorLevel: getRandomLevel(),
    date: post.createdAt,
    likes: Math.floor(Math.random() * 50) + 5,
    isNotice: post.id === 1 ? true : false
  }))

  return NextResponse.json({
    posts: postsWithDetails,
    categories: mockCategories,
    totalPosts,
    currentPage: page,
    totalPages
  })
}

function getRandomLevel() {
  const levels = ['일반', '새싹', 'VIP', '전문가', '관리자']
  return levels[Math.floor(Math.random() * levels.length)]
}