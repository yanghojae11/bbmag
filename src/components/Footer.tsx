import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* 메인 바닥글 콘텐츠 */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 회사 정보 */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-3">비비막</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                대한민국 최고의 마사지샵 정보 플랫폼으로, 
                전국의 우수한 마사지샵을 한 곳에서 찾아보세요.
              </p>
            </div>
            
            {/* 연락처 정보 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Phone className="w-4 h-4" />
                <span>1588-1234</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Mail className="w-4 h-4" />
                <span>info@bibimak.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Clock className="w-4 h-4" />
                <span>평일 09:00-18:00</span>
              </div>
            </div>
          </div>

          {/* 서비스 메뉴 */}
          <div>
            <h4 className="font-semibold text-white mb-4">서비스</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/massage-promotion" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  마사지샵 찾기
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  찜한 마사지샵
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  커뮤니티
                </Link>
              </li>
              <li>
                <Link href="/business" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  업체 등록
                </Link>
              </li>
            </ul>
          </div>

          {/* 지역별 마사지샵 */}
          <div>
            <h4 className="font-semibold text-white mb-4">지역별 마사지샵</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/region/seoul" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  서울 마사지샵
                </Link>
              </li>
              <li>
                <Link href="/region/gyeonggi" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  경기 마사지샵
                </Link>
              </li>
              <li>
                <Link href="/region/busan" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  부산 마사지샵
                </Link>
              </li>
              <li>
                <Link href="/region/daegu" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  대구 마사지샵
                </Link>
              </li>
              <li>
                <Link href="/region/daejeon" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  대전 마사지샵
                </Link>
              </li>
              <li>
                <Link href="/region/gwangju" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  광주 마사지샵
                </Link>
              </li>
            </ul>
          </div>

          {/* 고객지원 */}
          <div>
            <h4 className="font-semibold text-white mb-4">고객지원</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  도움말
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  문의하기
                </Link>
              </li>
              <li>
                <Link href="/notice" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  공지사항
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 추가 SEO 콘텐츠 섹션 */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 마사지 정보 */}
            <div>
              <h4 className="font-semibold text-white mb-4">마사지 건강 정보</h4>
              <div className="text-gray-300 text-sm space-y-2">
                <p>• 정기적인 마사지는 스트레스 해소와 근육 이완에 도움이 됩니다</p>
                <p>• 전문 마사지사에게 받는 마사지로 건강한 일상을 만들어보세요</p>
                <p>• 비비막에서 검증된 우수한 마사지샵만을 소개합니다</p>
              </div>
            </div>

            {/* 서비스 특징 */}
            <div>
              <h4 className="font-semibold text-white mb-4">비비막 특징</h4>
              <div className="text-gray-300 text-sm space-y-2">
                <p>• 전국 1,000개 이상의 마사지샵 정보 제공</p>
                <p>• 실시간 리뷰와 평점으로 신뢰할 수 있는 정보</p>
                <p>• 지역별, 서비스별 맞춤 검색 기능</p>
              </div>
            </div>
          </div>
        </div>

        {/* 소셜미디어 */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">팔로우하세요:</span>
              <div className="flex gap-3">
                <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Youtube className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Twitter className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* 정책 링크 */}
            <div className="flex gap-4 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">
                개인정보처리방침
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">
                이용약관
              </Link>
              <Link href="/site-map" className="text-gray-400 hover:text-blue-400 transition-colors">
                사이트맵
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 저작권 */}
      <div className="bg-gray-800 py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-gray-400 text-sm">
              © 2024 비비막(BIBIMAK). All rights reserved.
            </p>
            <p className="text-gray-500 text-xs">
              대한민국 최고의 마사지샵 정보 플랫폼
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}