import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PolicyPage.css';

function PolicyPage() {
  const navigate = useNavigate();

  return (
    <div className="policy-container">
      <h1 className="policy-title">개인정보처리방침</h1>
      <div className="policy-content">
        <p>
          “지켜, 봄”은 회원님의 개인정보를 중요시하며, 
          「개인정보 보호법」을 준수하고 있습니다.
        </p>
        <p>
          본 개인정보처리방침은 회사가 어떤 정보를 수집하며, 
          이를 어떻게 사용하고 보호하는지에 대해 설명합니다.
        </p>

        <h3>1. 수집하는 개인정보 항목</h3>
        <ul>
          <li>회원가입 시: 이메일, 이름, 연락처, 생년월일, 비밀번호 등</li>
          <li>서비스 이용 시: 접속 로그, 쿠키, IP 주소 등</li>
        </ul>

        <h3>2. 개인정보의 수집 및 이용 목적</h3>
        <ul>
          <li>회원제 서비스 제공 및 본인 확인</li>
          <li>고지사항 전달 및 고객 문의 응답</li>
          <li>이벤트 및 마케팅 활용 (동의 시)</li>
        </ul>

        <h3>3. 개인정보 보유 및 이용기간</h3>
        <ul>
          <li>회원 탈퇴 시까지 보관 후 즉시 파기</li>
        </ul>

        <h3>4. 기타 사항</h3>
        <p>
          자세한 사항은 고객센터 또는 웹사이트 내 문의하기를 통해 연락해주시기 바랍니다.
        </p>

        <button onClick={() => navigate(-1)} className="back-button">
          ← 돌아가기
        </button>
      </div>
    </div>
  );
}

export default PolicyPage;