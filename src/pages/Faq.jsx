import React, { useState } from 'react';
import './Faq.css'; // 스타일 파일 이름은 그대로 사용
import Navbar from './Navbar';

const faqs = [
  { id: 1, question: '[기기] IoT 기기는 어떻게 등록하나요?', answer: '마이 대시보드 > 기기 등록 메뉴에서 기기 정보를 입력하면 됩니다.' },
  { id: 2, question: '[보안점검] AI 이상 탐지 결과는 어디서 확인하나요?', answer: '대시보드의 보안 리포트 탭에서 확인 가능합니다.' },
  { id: 3, question: '[알림] 보안 위험 발생 시 알림은 어떻게 오나요?', answer: '이메일 또는 대시보드 내 알림으로 실시간 제공됩니다.' },
  { id: 4, question: '[설치] 이 솔루션은 어떻게 설치하나요?', answer: '회원가입 후 설치형 프로그램을 다운로드하여 실행하면 됩니다.' },
  { id: 5, question: '[기타] 고객센터에 문의하려면?', answer: '문의 게시판을 통해 작성해 주세요.' }
];

function Faq() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <>
      <Navbar />
      <div className="contact-page">
        <h2 className="faq-title">자주 묻는 질문 (FAQ)</h2>
        <div className="faq-list">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className={`faq-item ${openId === faq.id ? 'open' : ''}`}
              onClick={() => toggle(faq.id)}
            >
              <div className="faq-question">{faq.question}</div>
              {openId === faq.id && (
                <div className="faq-answer">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Faq;