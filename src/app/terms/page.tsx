import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">서비스 이용약관</h1>
          <p className="text-gray-600">시행일자: 2024년 1월 1일</p>
        </div>

        <div className="prose prose-gray max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">제1조 (목적)</h2>
            <p className="text-gray-700">
              이 약관은 비비막(이하 "회사")가 제공하는 마사지샵 정보 플랫폼 서비스(이하 "서비스")의 
              이용조건 및 절차, 회사와 회원간의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">제2조 (정의)</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>"서비스"</strong>란 회사가 제공하는 마사지샵 정보 검색, 리뷰, 커뮤니티 등 모든 서비스를 의미합니다.</li>
              <li><strong>"회원"</strong>이란 회사와 서비스 이용계약을 체결하고 서비스를 이용하는 고객을 말합니다.</li>
              <li><strong>"아이디(ID)"</strong>란 회원의 식별과 서비스 이용을 위하여 회원이 정하고 회사가 승인하는 문자와 숫자의 조합을 의미합니다.</li>
              <li><strong>"비밀번호"</strong>란 회원이 부여받은 아이디와 일치되는 회원임을 확인하고 비밀보호를 위해 회원 자신이 정한 문자 또는 숫자의 조합을 의미합니다.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">제3조 (약관 등의 명시와 설명 및 개정)</h2>
            <p className="text-gray-700 mb-4">
              1. 회사는 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함), 
              전화번호, 전자우편주소, 사업자등록번호 등을 이용자가 쉽게 알 수 있도록 서비스 초기 화면에 게시하거나 
              기타의 방법으로 이용자에게 공지합니다.
            </p>
            <p className="text-gray-700">
              2. 회사는 필요하다고 인정되는 경우 이 약관을 개정할 수 있으며, 개정된 약관은 적용일자 및 개정사유를 명시하여 
              현행약관과 함께 서비스 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">제4조 (서비스의 제공 및 변경)</h2>
            <p className="text-gray-700 mb-4">
              1. 회사는 다음과 같은 업무를 수행합니다:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>마사지샵 정보 검색 서비스</li>
              <li>마사지샵 리뷰 및 평점 서비스</li>
              <li>커뮤니티 서비스</li>
              <li>기타 회사가 정하는 업무</li>
            </ul>
            <p className="text-gray-700">
              2. 회사는 서비스의 내용, 품질의 변경이 있는 경우에는 변경사유, 변경될 서비스의 내용 및 제공일자를 
              명시하여 현재의 서비스 제공 중단 7일 이전에 통지합니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">제5조 (회원가입)</h2>
            <p className="text-gray-700 mb-4">
              1. 회원가입은 이용자가 약관의 내용에 대하여 동의를 하고 회원가입신청을 한 후 회사가 이러한 신청에 대하여 승낙함으로써 체결됩니다.
            </p>
            <p className="text-gray-700 mb-4">
              2. 회사는 다음 각 호에 해당하는 신청에 대하여는 승낙을 하지 않거나 사후에 이용계약을 해지할 수 있습니다:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우</li>
              <li>실명이 아니거나 타인의 명의를 이용한 경우</li>
              <li>허위의 정보를 기재하거나, 회사가 제시하는 내용을 기재하지 않은 경우</li>
              <li>기타 회원으로 등록하는 것이 회사의 기술상 현저히 지장이 있다고 판단되는 경우</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">제6조 (회원정보의 변경)</h2>
            <p className="text-gray-700">
              1. 회원은 개인정보관리화면을 통하여 언제든지 본인의 개인정보를 열람하고 수정할 수 있습니다.
            </p>
            <p className="text-gray-700">
              2. 회원은 회원가입신청 시 기재한 사항이 변경되었을 경우 온라인으로 수정을 하거나 전자우편 기타 방법으로 
              회사에 그 변경사항을 알려야 합니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">제7조 (개인정보보호)</h2>
            <p className="text-gray-700">
              회사는 관계법령이 정하는 바에 따라 회원의 개인정보를 보호하기 위해 노력합니다. 
              개인정보의 보호 및 사용에 대해서는 관련법령 및 회사의 개인정보처리방침이 적용됩니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">제8조 (회원의 의무)</h2>
            <p className="text-gray-700 mb-4">
              1. 회원은 다음 행위를 하여서는 안 됩니다:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>신청 또는 변경시 허위 내용의 등록</li>
              <li>타인의 정보 도용</li>
              <li>회사가 게시한 정보의 변경</li>
              <li>회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
              <li>회사 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
              <li>회사 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
              <li>외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는 행위</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">제9조 (서비스의 중단)</h2>
            <p className="text-gray-700 mb-4">
              1. 회사는 컴퓨터 등 정보통신설비의 보수점검·교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 
              서비스의 제공을 일시적으로 중단할 수 있습니다.
            </p>
            <p className="text-gray-700">
              2. 회사는 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자 또는 제3자가 입은 손해에 대하여 
              배상하지 않습니다. 단, 회사에 고의 또는 중대한 과실이 있는 경우에는 그러하지 아니합니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">제10조 (면책조항)</h2>
            <p className="text-gray-700 mb-4">
              1. 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 
              서비스 제공에 관한 책임이 면제됩니다.
            </p>
            <p className="text-gray-700 mb-4">
              2. 회사는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.
            </p>
            <p className="text-gray-700">
              3. 회사는 회원이 서비스를 이용하여 기대하는 수익을 상실한 것에 대하여 책임을 지지 않으며, 
              그 밖의 서비스를 통하여 얻은 자료로 인한 손해에 관하여 책임을 지지 않습니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">제11조 (분쟁해결)</h2>
            <p className="text-gray-700 mb-4">
              1. 회사는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 
              피해보상처리기구를 설치·운영합니다.
            </p>
            <p className="text-gray-700">
              2. 회사와 이용자 간에 발생한 분쟁은 전자거래조정위원회 또는 소비자분쟁조정위원회의 조정에 따를 수 있습니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">제12조 (재판권 및 준거법)</h2>
            <p className="text-gray-700">
              1. 회사와 이용자 간에 발생한 분쟁에 관한 소송은 대한민국 법을 적용하며, 
              회사의 본사 소재지를 관할하는 법원을 관할 법원으로 합니다.
            </p>
          </section>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-8">
            <p className="text-blue-800 text-sm">
              <strong>부칙:</strong> 이 약관은 2024년 1월 1일부터 적용됩니다.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}