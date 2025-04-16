import React, { useEffect, useState } from 'react';
import axios from '../lib/axios'; // ✅ withCredentials 포함된 axios 인스턴스
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './ContactPrivate.css';

function ContactPrivate() {
  const [inquiries, setInquiries] = useState([]);
  const navigate = useNavigate();

  // ✅ 내 문의글 목록 불러오기
  useEffect(() => {
    axios.get('/inquiry/me', { withCredentials: true })
      .then(res => {
        console.log("📦 응답 데이터:", res.data); // ✅ 서버에서 내 글만 왔는지 콘솔 확인
        setInquiries(res.data);
      })
      .catch(err => {
        console.error('❌ 불러오기 오류:', err.response?.data || err.message);
        alert('문의글을 불러오는 데 실패했습니다.');
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="private-container">
        <div className="private-header">
          <h2>1:1 문의 게시판</h2>
          <hr className="private-line" />
        </div>

        <table className="inquiry-table">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>등록일</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((item, idx) => (
              <tr
                key={item.id}
                onClick={() => navigate(`/contact/private/${item.id}`)}
                className="table-row"
              >
                <td>{inquiries.length - idx}</td>
                <td>
                  {item.is_secret && <span role="img" aria-label="lock">🔒</span>} {item.title}
                </td>
                <td>{item.name}</td>
                <td>{new Date(item.created_at).toLocaleDateString('ko-KR')}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ✅ 테이블 아래 오른쪽 정렬된 버튼 */}
        <div className="inquiry-actions">
          <button
            className="private-button"
            onClick={() => navigate('/contact/private/write')}
          >
            문의 작성
          </button>
        </div>
      </div>
    </>
  );
}

export default ContactPrivate;
