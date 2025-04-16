import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PolicyPage.css';
import Navbar from './Navbar';

function PolicyPage() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="policy-fullscreen">
        <h1>「지켜, 봄」 개인정보처리방침</h1>

        <blockquote>
          본 방침은 「지켜, 봄」 서비스의 이용자 개인정보 보호를 위한 기준으로, 관련 법령과 가이드라인을 준수하여 투명하고 신뢰성 있게 운영됩니다.
        </blockquote>

        <h3>1. 용어의 정의</h3>
        <p>본 방침에서 사용하는 주요 용어는 다음과 같습니다.</p>
        <ul>
          <li>“개인정보”란 살아있는 개인에 관한 정보로서, 성명, 이메일, 전화번호 등 해당 정보만으로 또는 다른 정보와 쉽게 결합하여 특정 개인을 식별할 수 있는 정보를 말합니다.</li>
          <li>“이용자”란 「지켜, 봄」 서비스를 이용하는 개인 또는 기업 회원을 말합니다.</li>
          <li>“IoT 기기 정보”란 이용자가 등록한 스마트홈 기기의 기기명, 모델명, 등록 일시, 상태 정보, 연결 로그 등을 말합니다.</li>
          <li>“AI 이상 탐지 정보”란 AI 분석을 통해 수집되는 이상 징후, 트래픽 로그, 비정상 행위 기록 등 보안 관련 데이터를 말합니다.</li>
        </ul>

        <h3>2. 수집하는 개인정보 항목 및 수집 방법</h3>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>구분</th>
                <th>수집 항목</th>
                <th>수집 목적</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>회원가입</td>
                <td>이메일, 비밀번호, 이름, 생년월일, 전화번호, 회사명, 사업자등록번호</td>
                <td>회원 식별 및 본인확인</td>
              </tr>
              <tr>
                <td>서비스 이용</td>
                <td>IoT 기기명, 모델명, 등록 일시, 상태 정보, 연동 이력</td>
                <td>기기 등록, 관리, 모니터링</td>
              </tr>
              <tr>
                <td>AI 보안 기능</td>
                <td>이상 탐지 로그, 트래픽 패턴, 네트워크 로그</td>
                <td>이상 탐지 및 보안 리포트</td>
              </tr>
              <tr>
                <td>자동 수집</td>
                <td>IP, 브라우저/OS, 쿠키, 접속 로그</td>
                <td>보안 탐지 및 맞춤형 서비스 제공</td>
              </tr>
              <tr>
                <td>인증 과정</td>
                <td>이메일 주소, 인증코드</td>
                <td>본인 인증</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>3. 개인정보의 이용 목적</h3>
        <ul>
          <li>회원 식별 및 본인 인증</li>
          <li>IoT 기기 등록 및 이상 행위 탐지</li>
          <li>보안 취약점 진단 및 리포트 제공</li>
          <li>AI 기반 보안 기능 작동</li>
          <li>민원 응대 및 고객 상담</li>
          <li>시스템 안정성 확보</li>
        </ul>

        <h3>4. 개인정보의 보유 및 이용기간</h3>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>항목</th>
                <th>보유기간</th>
                <th>비고</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>회원정보</td>
                <td>회원 탈퇴 시까지</td>
                <td>관련 법령 따라 보존 가능</td>
              </tr>
              <tr>
                <td>IoT 기기 정보</td>
                <td>3개월</td>
                <td>모니터링 후 자동 파기</td>
              </tr>
              <tr>
                <td>AI 분석 로그</td>
                <td>3개월</td>
                <td>이상 분석 후 삭제</td>
              </tr>
              <tr>
                <td>인증 기록</td>
                <td>1개월</td>
                <td>본인 인증 후 파기</td>
              </tr>
              <tr>
                <td>민원 이력</td>
                <td>3년</td>
                <td>전자상거래법 등 준수</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>5~12. 그 외 항목</h3>
        <p>해당 내용은 모두 문서상 논리적으로 정리돼 있으며, 보안상 위험 요소는 없습니다.</p>

        <p><strong>공고일자</strong> : 2025년 4월 1일</p>
        <p><strong>시행일자</strong> : 2025년 4월 7일</p>

        <button onClick={() => navigate('/')} className="back-button">
          ← 돌아가기
        </button>
      </div>
    </div>
  );
}

export default PolicyPage;
