import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Contact.css';
import Navbar from './Navbar';
import AdminInquiry from './AdminInquiry'; // ✅ 관리자용 목록 컴포넌트

function Contact() {
  const navigate = useNavigate();
  const [role, setRole] = useState('');

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);

  if (role === 'admin') {
    return <AdminInquiry />; // ✅ admin이면 바로 관리자 목록 컴포넌트
  }

  return (
    <>
      <Navbar />
      <div className="contact-container">
        <h2 className="contact-title">문의하기</h2>
        <hr className="contact-line" />
        <div className="contact-section">
  <h3 className="contact-subtitle">🌱 회원 전용🌱</h3>
  <button onClick={() => navigate('/contact/private')} className="contact-button full">
    1:1 문의하기
  </button>
</div>

<div className="contact-section">
  <h3 className="contact-subtitle">🌱 비회원 전용🌱</h3>
  <button onClick={() => navigate('/contact/email')} className="contact-button full outline">
    이메일 문의하기
  </button>
</div>

      </div>
    </>
  );
}

export default Contact;
