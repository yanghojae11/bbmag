'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Phone, Mail, Clock, MapPin, Send, MessageSquare, HelpCircle, User, Building } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const categories = [
    { value: 'general', label: '일반 문의' },
    { value: 'business', label: '업체 등록 문의' },
    { value: 'technical', label: '기술적 문제' },
    { value: 'review', label: '리뷰 관련' },
    { value: 'account', label: '계정 문의' },
    { value: 'other', label: '기타' }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // 실제 구현 시 API 호출
    try {
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
      
      // 임시 지연
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setIsSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        category: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      console.error('문의 전송 실패:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* 페이지 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">문의하기</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            비비막 서비스 이용 중 궁금한 점이나 불편사항이 있으시면 언제든지 문의해주세요. 
            빠르고 정확한 답변을 드리겠습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 연락처 정보 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">연락처 정보</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">전화 문의</h3>
                    <p className="text-gray-600">1588-1234</p>
                    <p className="text-sm text-gray-500">평일 09:00 - 18:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Mail className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">이메일 문의</h3>
                    <p className="text-gray-600">support@bibimak.com</p>
                    <p className="text-sm text-gray-500">24시간 접수 가능</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">운영 시간</h3>
                    <p className="text-gray-600">평일 09:00 - 18:00</p>
                    <p className="text-sm text-gray-500">주말 및 공휴일 휴무</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <MapPin className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">주소</h3>
                    <p className="text-gray-600">서울시 강남구</p>
                    <p className="text-sm text-gray-500">테헤란로 123</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 자주 묻는 질문 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">자주 묻는 질문</h3>
              <div className="space-y-3">
                <div className="border-l-2 border-blue-200 pl-3">
                  <h4 className="font-medium text-gray-900 text-sm">회원가입은 무료인가요?</h4>
                  <p className="text-gray-600 text-sm">네, 비비막 회원가입은 완전 무료입니다.</p>
                </div>
                <div className="border-l-2 border-green-200 pl-3">
                  <h4 className="font-medium text-gray-900 text-sm">업체 등록은 어떻게 하나요?</h4>
                  <p className="text-gray-600 text-sm">업체 등록 메뉴에서 신청하실 수 있습니다.</p>
                </div>
                <div className="border-l-2 border-purple-200 pl-3">
                  <h4 className="font-medium text-gray-900 text-sm">리뷰 삭제가 가능한가요?</h4>
                  <p className="text-gray-600 text-sm">본인이 작성한 리뷰는 언제든 삭제 가능합니다.</p>
                </div>
              </div>
              <div className="mt-4">
                <a href="/faq" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  더 많은 FAQ 보기 →
                </a>
              </div>
            </div>
          </div>

          {/* 문의 폼 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">문의 사항을 남겨주세요</h2>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">문의가 접수되었습니다</h3>
                  <p className="text-gray-600 mb-4">
                    빠른 시일 내에 답변 드리겠습니다. 감사합니다.
                  </p>
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                  >
                    새 문의 작성
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* 개인정보 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4 inline mr-1" />
                        이름 *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="성명을 입력해주세요"
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-1" />
                        이메일 *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="이메일 주소를 입력해주세요"
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-1" />
                        연락처
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="연락처를 입력해주세요"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Building className="w-4 h-4 inline mr-1" />
                        문의 유형 *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">문의 유형을 선택해주세요</option>
                        {categories.map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* 제목 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <HelpCircle className="w-4 h-4 inline mr-1" />
                      문의 제목 *
                    </label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="문의 제목을 입력해주세요"
                      required
                      className="w-full"
                    />
                  </div>

                  {/* 내용 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MessageSquare className="w-4 h-4 inline mr-1" />
                      문의 내용 *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="문의하실 내용을 자세히 작성해주세요"
                      required
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                    />
                  </div>

                  {/* 개인정보 동의 */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="privacy"
                        required
                        className="mt-1"
                      />
                      <label htmlFor="privacy" className="text-sm text-gray-700">
                        개인정보 수집 및 이용에 동의합니다. *
                        <br />
                        <span className="text-gray-500 text-xs">
                          문의 처리를 위해 필요한 최소한의 개인정보를 수집하며, 문의 처리 완료 후 즉시 삭제됩니다.
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* 제출 버튼 */}
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-blue-600 hover:bg-blue-700 px-8 py-3"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          전송 중...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          문의 전송
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 추가 도움말 섹션 */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">더 빠른 도움이 필요하신가요?</h3>
            <p className="text-gray-600 mb-6">
              긴급한 문의사항이나 즉시 도움이 필요한 경우 아래 방법을 이용해보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1588-1234"
                className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                전화 문의 (1588-1234)
              </a>
              <a
                href="/faq"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                자주 묻는 질문
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}