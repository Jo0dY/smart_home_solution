import React, { useEffect, useState } from 'react';
import axios from '../lib/axios';
import './Notice.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Notice() {
  const [notices, setNotices] = useState([]);
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ 서버에서 실제 사용자 정보 가져오기 (토큰 기반 인증)
    const fetchUserRole = async () => {
      try {
        const res = await axios.get('/users/me'); // ⬅️ 로그인 상태일 때만 성공함
        setRole(res.data.role); // ✅ 실제 인증된 role ("admin"만 true 처리됨)
      } catch (err) {
        setRole(''); // 비로그인 시
      }
    };

    // ✅ 공지사항 가져오기
    const fetchNotices = async () => {
      try {
        const res = await axios.get('/notice');
        setNotices(res.data);
      } catch (error) {
        console.error('공지사항 불러오기 실패:', error);
      }
    };

    fetchUserRole();
    fetchNotices();
  }, []);

  const handleClick = (id) => {
    navigate(`/notice/${id}`);
  };

  const goToWrite = () => {
    navigate("/admin/notice/write");
  };

  return (
    <>
      <Navbar />
      <div className="notice-page">
        <h2 className="notice-title">공지사항</h2>

        <div className="notice-list">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="notice-card"
              onClick={() => handleClick(notice.id)}
            >
              <h3>{notice.title}</h3>
              <p className="notice-date">
                {new Date(notice.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>

        {/* ✅ 서버 인증된 관리자만 작성 버튼 노출 */}
        {role === "admin" && (
          <div className="notice-bottom-button-area">
            <hr className="notice-divider" />
            <button className="notice-write-btn" onClick={goToWrite}>
              공지 작성하기
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Notice;
