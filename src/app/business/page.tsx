'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Building, CheckCircle, Clock, AlertTriangle, Send, Star, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function BusinessRegistrationPage() {
  const [currentStep, setCurrentStep] = useState('info') // 'info', 'application', 'submitted'
  const [applicationData, setApplicationData] = useState({
    businessName: '',
    ownerName: '',
    phone: '',
    email: '',
    address: '',
    businessType: '',
    experience: '',
    motivation: '',
    agreeTerms: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const features = [
    {
      icon: <Star className="w-6 h-6 text-blue-600" />,
      title: '신뢰성 확보',
      description: '검증된 업체만 등록하여 고객 신뢰도 향상'
    },
    {
      icon: <Users className="w-6 h-6 text-green-600" />,
      title: '고객 연결',
      description: '타겟 고객과의 효과적인 매칭 시스템'
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-purple-600" />,
      title: '품질 관리',
      description: '지속적인 서비스 품질 모니터링'
    }
  ]

  const approvalProcess = [
    {
      step: 1,
      title: '기본 정보 제출',
      description: '업체 정보와 서비스 계획 제출',
      time: '즉시'
    },
    {
      step: 2,
      title: '내부 검토',
      description: '제출된 정보 확인 및 적합성 검토',
      time: '1-2일'
    },
    {
      step: 3,
      title: '승인 결과',
      description: '승인 시 상세 등록 양식 발송',
      time: '검토 완료 후'
    },
    {
      step: 4,
      title: '서비스 시작',
      description: '업체 정보 등록 및 서비스 개시',
      time: '승인 후'
    }
  ]

  const handleInputChange = (field: string, value: string | boolean) => {
    setApplicationData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmitApplication = async () => {
    setIsSubmitting(true)
    
    try {
      // 실제 구현 시 API 호출
      await new Promise(resolve => setTimeout(resolve, 2000))
      setCurrentStep('submitted')
    } catch (error) {
      console.error('신청 실패:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const canSubmit = () => {
    return applicationData.businessName && 
           applicationData.ownerName && 
           applicationData.phone && 
           applicationData.email && 
           applicationData.address &&
           applicationData.businessType &&
           applicationData.agreeTerms
  }

  if (currentStep === 'submitted') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              업체 등록 신청이 접수되었습니다
            </h1>
            <p className="text-gray-600 mb-6 leading-relaxed">
              제출해주신 정보를 검토한 후 승인 결과를 이메일로 안내해드리겠습니다.<br/>
              승인 완료 시 상세 등록 양식을 보내드립니다.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-900">예상 처리 시간</span>
              </div>
              <p className="text-sm text-blue-700">
                영업일 기준 1-2일 내에 검토 결과를 안내해드립니다.
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={() => window.location.href = '/'} variant="outline">
                홈으로 이동
              </Button>
              <Button onClick={() => window.location.href = '/contact'}>
                문의하기
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 페이지 헤더 */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Building className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">업체 등록 신청</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            비비막과 함께 더 많은 고객을 만나보세요.<br/>
            간단한 신청으로 검증된 마사지샵 플랫폼에 참여할 수 있습니다.
          </p>
        </div>

        {currentStep === 'info' && (
          <>
            {/* 플랫폼 특징 */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">비비막 플랫폼의 특징</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 승인 프로세스 */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">등록 프로세스</h2>
              <div className="space-y-4">
                {approvalProcess.map((process, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                      {process.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-medium text-gray-900">{process.title}</h3>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {process.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{process.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 안내사항 */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-900 mb-2">신청 전 안내사항</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• 마사지샵 운영에 필요한 기본 조건을 갖추고 계신가요?</li>
                    <li>• 제출하신 모든 정보가 정확하고 최신 정보인가요?</li>
                    <li>• 비비막의 서비스 정책과 가이드라인에 동의하시나요?</li>
                    <li>• 고객 서비스와 품질 관리에 책임감을 가지고 계신가요?</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button 
                onClick={() => setCurrentStep('application')}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
              >
                신청서 작성하기
              </Button>
            </div>
          </>
        )}

        {currentStep === 'application' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">업체 등록 신청서</h2>
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep('info')}
                size="sm"
              >
                이전으로
              </Button>
            </div>

            <div className="space-y-6">
              {/* 기본 정보 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    업체명 *
                  </label>
                  <Input
                    type="text"
                    placeholder="예: 힐링 스웨디시"
                    value={applicationData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    담당자명 *
                  </label>
                  <Input
                    type="text"
                    placeholder="담당자 성함을 입력해주세요"
                    value={applicationData.ownerName}
                    onChange={(e) => handleInputChange('ownerName', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    연락처 *
                  </label>
                  <Input
                    type="tel"
                    placeholder="010-1234-5678"
                    value={applicationData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    이메일 *
                  </label>
                  <Input
                    type="email"
                    placeholder="contact@example.com"
                    value={applicationData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  업체 주소 *
                </label>
                <Input
                  type="text"
                  placeholder="상세 주소를 입력해주세요"
                  value={applicationData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  주요 서비스 *
                </label>
                <select
                  value={applicationData.businessType}
                  onChange={(e) => handleInputChange('businessType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">선택해주세요</option>
                  <option value="swedish">스웨디시 마사지</option>
                  <option value="aroma">아로마테라피</option>
                  <option value="thai">타이 마사지</option>
                  <option value="sports">스포츠 마사지</option>
                  <option value="spa">스파/찜질</option>
                  <option value="other">기타</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  운영 경험 (선택)
                </label>
                <textarea
                  placeholder="마사지업 운영 경험이나 관련 자격에 대해 간단히 설명해주세요"
                  value={applicationData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  신청 동기 (선택)
                </label>
                <textarea
                  placeholder="비비막에 업체를 등록하려는 이유와 고객에게 제공하고 싶은 서비스에 대해 알려주세요"
                  value={applicationData.motivation}
                  onChange={(e) => handleInputChange('motivation', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* 동의사항 */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    checked={applicationData.agreeTerms}
                    onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                    className="mt-1"
                  />
                  <label htmlFor="agreeTerms" className="text-sm text-gray-700">
                    <span className="font-medium">서비스 이용약관 및 개인정보처리방침 동의 *</span>
                    <div className="text-gray-600 mt-1">
                      비비막의 서비스 이용약관과 개인정보처리방침에 동의하며, 제출한 모든 정보가 정확함을 확인합니다.
                    </div>
                  </label>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <Button
                  onClick={handleSubmitApplication}
                  disabled={!canSubmit() || isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      신청서 제출 중...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      신청서 제출
                    </>
                  )}
                </Button>
                
                <p className="text-xs text-gray-500 text-center mt-3">
                  제출 후 수정이 어려우니 정보를 정확히 확인해주세요.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  )
}