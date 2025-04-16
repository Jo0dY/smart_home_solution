// src/pages/ContactPrivateWrite.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from '../lib/axios'; // ✅ withCredentials 설정 포함된 인스턴스
import './ContactPrivateWrite.css';

function ContactPrivateWrite() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  // ✅ 로그인된 사용자 정보 가져오기
  useEffect(() => {
    axios.get('/users/me')
      .then(res => {
        console.log('✅ 로그인 사용자 정보:', res.data); // ← 이거 반드시 콘솔에 찍혀야 해!
        setName(res.data.email); // 또는 name 등 원하는 필드
      })
      .catch(err => {
        console.error('❌ 인증 실패:', err.response); // ← 여기도 반드시 에러 콘솔 확인!
        alert('로그인이 필요합니다.');
        console.log('⚠️ 현재 쿠키:', document.cookie);  // ✅ 여기서 쿠키 확인 가능

        navigate('/login');
    });
}, [navigate]);
  

const handleSubmit = (e) => {
  e.preventDefault();

  axios.post('/inquiry', {
    title,
    content,
    is_secret: false,  // 🔐 선택형 필드, 기본값 지정
    password: null     // 🔒 비회원 X → null 전달
  }, { withCredentials: true })
    .then(() => {
      alert('문의가 등록되었습니다.');
      navigate('/contact/private');
    })
    .catch(err => {
      console.error("❌ 문의 등록 실패:", err.response?.data || err);
      alert('등록에 실패했습니다.');
    });
};


  return (
    <>
      <Navbar />
      <div className="write-container">
        <h2 className="write-title">1:1 문의 작성</h2>
        <hr className="write-line" />

        <form onSubmit={handleSubmit} className="write-form">
          <div className="form-group">
            <label>작성자</label>
            <input type="text" value={name} disabled />
          </div>
          <div className="form-group">
            <label>제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>내용</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="8"
              required
            />
          </div>
          <button type="submit" className="write-button">등록</button>
        </form>
      </div>
    </>
  );
}

export default ContactPrivateWrite;
