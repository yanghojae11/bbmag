import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">개인정보처리방침</h1>
          <p className="text-gray-600">시행일자: 2024년 1월 1일</p>
        </div>

        <div className="prose prose-gray max-w-none">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
            <p className="text-blue-800">
              비비막(이하 "회사")는 정보주체의 개인정보를 중요시하며, 「개인정보 보호법」에 따라 
              개인정보처리방침을 다음과 같이 안내드립니다.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. 개인정보의 처리목적</h2>
            <p className="text-gray-700 mb-4">회사는 다음의 목적을 위하여 개인정보를 처리합니다:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>회원가입 및 관리</li>
              <li>마사지샵 정보 제공 서비스</li>
              <li>커뮤니티 서비스 제공</li>
              <li>고객상담 및 불만처리</li>
              <li>서비스 개선 및 통계분석</li>
              <li>마케팅 및 광고 활용</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. 개인정보의 처리 및 보유기간</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">개인정보 항목</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">보유기간</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">회원정보</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">회원탈퇴 시까지</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">서비스 이용기록</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">1년</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">마케팅 동의정보</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">동의철회 시까지</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. 개인정보의 제3자 제공</h2>
            <p className="text-gray-700 mb-4">
              회사는 원칙적으로 정보주체의 개인정보를 제3자에게 제공하지 않습니다. 
              다만, 다음의 경우에는 예외로 합니다:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>정보주체가 사전에 동의한 경우</li>
              <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. 개인정보처리의 위탁</h2>
            <p className="text-gray-700 mb-4">
              회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700"><strong>위탁받는 자:</strong> 클라우드 서비스 제공업체</p>
              <p className="text-gray-700"><strong>위탁하는 업무:</strong> 서비스 운영 및 데이터 보관</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. 정보주체의 권리·의무 및 행사방법</h2>
            <p className="text-gray-700 mb-4">정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>개인정보 처리현황 통지요구</li>
              <li>개인정보 열람요구</li>
              <li>개인정보 정정·삭제요구</li>
              <li>개인정보 처리정지요구</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. 개인정보의 안전성 확보조치</h2>
            <p className="text-gray-700 mb-4">회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육</li>
              <li>기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치</li>
              <li>물리적 조치: 전산실, 자료보관실 등의 접근통제</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. 개인정보보호책임자</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2"><strong>개인정보보호책임자</strong></p>
              <p className="text-gray-700">이메일: privacy@bibimak.com</p>
              <p className="text-gray-700">전화번호: 1588-1234</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. 개인정보처리방침 변경</h2>
            <p className="text-gray-700">
              이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 
              변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
            </p>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}