import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Contact.css';
import Navbar from './Navbar';
import AdminInquiry from './AdminInquiry'; // ✅ 관리자용 컴포넌트
import axios from '../lib/axios'; // ✅ 로그인 상태 확인용

function Contact() {
  const navigate = useNavigate();
  const [role, setRole] = useState('');

  // ✅ 로컬스토리지에서 관리자 여부 확인
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);

  // ✅ 1:1 문의 버튼 클릭 시 로그인 여부 확인
  const handlePrivateClick = async () => {
    try {
      const res = await axios.get('/users/me');
      if (res.data.role) {
        navigate('/contact/private'); // 로그인되어 있으면 이동
      }
    } catch (err) {
      // ✅ 로그인 안 된 경우 안내
      alert('⚠️ 1:1 문의는 로그인한 사용자만 이용 가능합니다.\n로그인 후 다시 시도해주세요.');
      navigate('/login');
    }
  };

  // ✅ 관리자일 경우 바로 관리자 페이지 렌더링
  if (role === 'admin') {
    return <AdminInquiry />;
  }

  return (
    <>
      <Navbar />
      <div className="contact-container">
        <h2 className="contact-title">문의하기</h2>
        <hr className="contact-line" />

        {/* ✅ 회원/비회원용 버튼 나란히 */}
        <div className="contact-dual-section">
          <div className="contact-section">
            <h3 className="contact-subtitle">🌻회원 전용🌻</h3>
            <button
              onClick={handlePrivateClick}
              className="contact-button full"
            >
              1:1 문의하기
            </button>
          </div>

          <div className="contact-section">
            <h3 className="contact-subtitle">🌱비회원 전용🌱</h3>
            <a
  href="mailto:jikyebom.solution@gmail.com"
  className="contact-button full-outline"
>
  이메일 문의하기
</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;