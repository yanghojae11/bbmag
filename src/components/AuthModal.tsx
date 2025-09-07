'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/context/AuthContext'
import Image from 'next/image'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const { login, signup, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // 회원가입 시 비밀번호 확인 체크
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다')
      return
    }

    // 비밀번호 길이 체크
    if (formData.password.length < 8) {
      setError('비밀번호는 8자 이상이어야 합니다')
      return
    }

    try {
      if (isLogin) {
        await login(formData.email, formData.password)
      } else {
        await signup(formData.name, formData.email, formData.password)
      }
      onClose()
      setFormData({ name: '', email: '', password: '', confirmPassword: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다')
    }
  }

  const handleSocialLogin = (provider: 'google' | 'naver') => {
    // 실제 구현 시에는 OAuth 서비스로 리다이렉트
    console.log(`${provider} 로그인 시작`)
    
    // 예시: 실제로는 다음과 같이 구현
    // window.location.href = `/api/auth/${provider}`
    
    // 임시 구현 (실제로는 백엔드 OAuth 처리 필요)
    alert(`${provider === 'google' ? '구글' : '네이버'} 로그인 기능은 개발 중입니다`)
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setError('')
    setFormData({ name: '', email: '', password: '', confirmPassword: '' })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            {isLogin ? '로그인' : '회원가입'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* 이메일 로그인/회원가입 폼 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <Label htmlFor="name" className="text-sm font-medium">이름</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required={!isLogin}
                  placeholder="이름을 입력하세요"
                  className="mt-1 h-11"
                />
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-sm font-medium">이메일</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="이메일을 입력하세요"
                className="mt-1 h-11"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium">비밀번호</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                placeholder="비밀번호를 입력하세요 (8자 이상)"
                className="mt-1 h-11"
              />
            </div>

            {!isLogin && (
              <div>
                <Label htmlFor="confirmPassword" className="text-sm font-medium">비밀번호 확인</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  placeholder="비밀번호를 다시 입력하세요"
                  className="mt-1 h-11"
                />
              </div>
            )}

            {error && (
              <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                {error}
              </div>
            )}

            {/* 소셜 로그인 버튼들 - 로그인 버튼 바로 위에 */}
            <div className="space-y-3">
              {/* 구글 로그인 버튼 - 공식 가이드라인 */}
              <button
                type="button"
                className="w-full h-11 bg-white border border-gray-300 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors shadow-sm"
                onClick={() => handleSocialLogin('google')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-gray-700 font-medium text-sm">Google로 계속하기</span>
              </button>

              {/* 네이버 로그인 버튼 - 공식 가이드라인 */}
              <button
                type="button"
                className="w-full h-11 bg-green-500 hover:bg-green-600 border-0 rounded-lg flex items-center justify-center gap-3 transition-colors"
                onClick={() => handleSocialLogin('naver')}
              >
                <div className="w-4 h-4 bg-white rounded flex items-center justify-center">
                  <span className="text-green-500 text-xs font-bold">N</span>
                </div>
                <span className="text-white font-medium text-sm">네이버로 로그인</span>
              </button>
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 font-medium" 
              disabled={isLoading}
            >
              {isLoading ? '처리중...' : (isLogin ? '로그인' : '회원가입')}
            </Button>
          </form>

          {/* 모드 전환 */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={toggleMode}
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              {isLogin ? '계정이 없으신가요? 회원가입하기' : '이미 계정이 있으신가요? 로그인하기'}
            </button>
          </div>

          {/* 약관 동의 (회원가입 시만 표시) */}
          {!isLogin && (
            <div className="text-xs text-gray-500 text-center leading-relaxed">
              회원가입 시{' '}
              <button className="text-blue-600 underline">이용약관</button>과{' '}
              <button className="text-blue-600 underline">개인정보처리방침</button>에 동의합니다
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}