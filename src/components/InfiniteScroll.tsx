// components/InfiniteScroll.tsx
'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { Loader2 } from 'lucide-react'

interface InfiniteScrollProps<T> {
  items: T[]
  loadMore: () => Promise<void>
  hasMore: boolean
  isLoading: boolean
  renderItem: (item: T, index: number) => React.ReactNode
  threshold?: number
  className?: string
  loadingComponent?: React.ReactNode
  emptyComponent?: React.ReactNode
}

export default function InfiniteScroll<T>({
  items,
  loadMore,
  hasMore,
  isLoading,
  renderItem,
  threshold = 200,
  className = '',
  loadingComponent,
  emptyComponent,
}: InfiniteScrollProps<T>) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const loadingRef = useRef<HTMLDivElement>(null)

  // Intersection Observer 설정
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (target.isIntersecting && hasMore && !isLoading) {
        setIsIntersecting(true)
        loadMore()
      }
    },
    [hasMore, isLoading, loadMore]
  )

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: `${threshold}px`,
      threshold: 0,
    }

    const observer = new IntersectionObserver(handleObserver, option)
    
    if (loadingRef.current) {
      observer.observe(loadingRef.current)
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current)
      }
    }
  }, [handleObserver, threshold])

  // 로딩 완료 후 intersection 상태 리셋
  useEffect(() => {
    if (!isLoading) {
      setIsIntersecting(false)
    }
  }, [isLoading])

  // 빈 상태 처리
  if (items.length === 0 && !isLoading) {
    return (
      <div className={className}>
        {emptyComponent || (
          <div className="text-center py-12">
            <p className="text-gray-500">검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={className}>
      {/* 아이템 렌더링 */}
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      {/* 로딩 인디케이터 */}
      {hasMore && (
        <div
          ref={loadingRef}
          className="flex justify-center items-center py-8"
        >
          {loadingComponent || (
            <div className="flex items-center gap-2 text-gray-500">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>더 많은 마사지샵을 불러오는 중...</span>
            </div>
          )}
        </div>
      )}

      {/* 더 이상 데이터가 없을 때 */}
      {!hasMore && items.length > 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>모든 마사지샵을 확인했습니다.</p>
        </div>
      )}
    </div>
  )
}