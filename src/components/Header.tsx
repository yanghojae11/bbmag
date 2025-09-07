'use client'

import { useState } from 'react'
import { ArrowLeft, Search, User, Heart, LogOut, Menu, X } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import AuthModal from './AuthModal'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'

export default function Header() {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    logout()
    router.push('/')
    setMobileMenuOpen(false)
  }

  const isHomePage = pathname === '/'

  const menuItems = [
    { name: '마사지샵 찾기', href: '/massage-promotion' },
    { name: '찜한 마사지샵', href: '/favorites' },
    { name: '커뮤니티', href: '/community' },
    { name: '업체 등록', href: '/business' },
    { name: '도움말', href: '/help' },
    { name: '공지사항', href: '/notice' }
  ]

  return (
    <>
      {/* 데스크톱 헤더 */}
      <header className="bg-white border-b border-gray-100">
        {/* 데스크톱 네비게이션 */}
        <div className="hidden md:block">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* 로고 */}
              <Link href="/">
                <Image
                  src="/logo.svg"
                  alt="BBMAG"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>

              {/* 데스크톱 메뉴 */}
              <nav className="flex items-center space-x-8">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* 우측 메뉴 */}
              <div className="flex items-center gap-4">
                <Link href="/search">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Search className="w-5 h-5 text-gray-700" />
                  </button>
                </Link>

                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                      <div className="flex items-center justify-start gap-2 p-2">
                        <div className="flex flex-col space-y-1 leading-none">
                          <p className="font-medium">{user.name}</p>
                          <p className="w-[200px] truncate text-sm text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/favorites">
                          <Heart className="mr-2 h-4 w-4" />
                          찜한 마사지샵
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/profile">
                          <User className="mr-2 h-4 w-4" />
                          프로필 설정
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        로그아웃
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setAuthModalOpen(true)}
                      className="text-gray-700 border-gray-300"
                    >
                      로그인
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setAuthModalOpen(true)}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      회원가입
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 모바일 헤더 */}
        <div className="md:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            {/* 좌측: 뒤로가기 또는 햄버거 메뉴 */}
            <div className="flex items-center">
              {!isHomePage ? (
                <button
                  onClick={() => router.back()}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors mr-2"
                >
                  <ArrowLeft className="w-6 h-6 text-gray-700" />
                </button>
              ) : (
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Menu className="w-6 h-6 text-gray-700" />
                </button>
              )}
            </div>

            {/* 중앙: 로고 */}
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="BBMAG"
                width={100}
                height={32}
                className="h-7 w-auto"
              />
            </Link>

            {/* 우측: 검색 및 로그인 */}
            <div className="flex items-center gap-1">
              <Link href="/search">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Search className="w-6 h-6 text-gray-700" />
                </button>
              </Link>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="text-xs">{user.name[0]}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="w-[180px] truncate text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/favorites">
                        <Heart className="mr-2 h-4 w-4" />
                        찜한 마사지샵
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        프로필 설정
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      로그아웃
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setAuthModalOpen(true)}
                  className="text-gray-700 text-sm px-3"
                >
                  로그인
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 모바일 사이드 메뉴 */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* 오버레이 */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* 사이드 메뉴 */}
          <div className="fixed top-0 left-0 h-full w-80 max-w-sm bg-white shadow-xl">
            <div className="flex flex-col h-full">
              {/* 헤더 */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  <Image
                    src="/logo.svg"
                    alt="BBMAG"
                    width={100}
                    height={32}
                    className="h-7 w-auto"
                  />
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </button>
              </div>

              {/* 사용자 정보 */}
              {user && (
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 메뉴 항목 */}
              <nav className="flex-1 p-4">
                <div className="space-y-1">
                  {menuItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center px-3 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  ))}
                </div>
              </nav>

              {/* 하단 액션 */}
              <div className="p-4 border-t border-gray-200">
                {user ? (
                  <div className="space-y-2">
                    <Link
                      href="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors w-full"
                    >
                      <User className="mr-3 h-5 w-5" />
                      프로필 설정
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors w-full"
                    >
                      <LogOut className="mr-3 h-5 w-5" />
                      로그아웃
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button
                      onClick={() => {
                        setAuthModalOpen(true)
                        setMobileMenuOpen(false)
                      }}
                      className="w-full bg-black hover:bg-gray-800"
                    >
                      로그인 / 회원가입
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  )
}