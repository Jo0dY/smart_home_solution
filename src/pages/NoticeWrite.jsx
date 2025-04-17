// ✅ src/pages/NoticeWrite.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NoticeWrite.css';
import Navbar from './Navbar';
import axios from '../lib/axios';

function NoticeWrite() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ 서버에서 사용자 role을 받아서 확인
    axios.get('/users/me', { withCredentials: true })
      .then(res => {
        if (res.data.role !== 'admin') {
          alert('관리자만 접근 가능합니다.');
          navigate('/notice');
        }
      })
      .catch(() => {
        alert('로그인이 필요합니다.');
        navigate('/login');
      });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/notice', { title, content }, { withCredentials: true });      alert('공지사항이 작성되었습니다.');
      navigate('/notice');
    } catch (err) {
      if (err.response?.status === 403) {
        alert('접근 권한이 없습니다.');
      } else {
        alert('작성 실패');
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="notice-write-container">
        <h2 className="write-title">공지사항 작성</h2>
        <form className="notice-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="notice-input"
            placeholder="공지 제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="notice-textarea"
            placeholder="공지 내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button type="submit" className="submit-btn">작성하기</button>
        </form>
      </div>
    </>
  );
}

export default NoticeWrite;