'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 글로벌 에러 로깅
    console.error('Global error:', error)
    
    // 프로덕션 환경에서 에러 리포팅
    if (process.env.NODE_ENV === 'production') {
      // Sentry, LogRocket 등 에러 모니터링 서비스에 전송
    }
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 text-center">
            {/* 에러 아이콘 */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </div>

            {/* 에러 메시지 */}
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              시스템 오류가 발생했습니다
            </h1>
            
            <p className="text-gray-600 mb-6">
              죄송합니다. 예상치 못한 시스템 오류가 발생했습니다. 
              잠시 후 다시 시도해주시거나 고객센터로 문의해주세요.
            </p>

            {/* 에러 ID 표시 (디버깅용) */}
            {error.digest && (
              <div className="mb-6 p-3 bg-gray-100 rounded text-sm text-gray-600">
                에러 ID: {error.digest}
              </div>
            )}

            {/* 액션 버튼들 */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <button 
                onClick={reset}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                다시 시도
              </button>
              
              <button 
                onClick={() => window.location.href = '/'}
                className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Home className="w-4 h-4" />
                홈으로 이동
              </button>
            </div>

            {/* 고객센터 안내 */}
            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                문제가 계속 발생하면{' '}
                <a 
                  href="/contact" 
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  고객센터
                </a>
                로 문의해주세요.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}