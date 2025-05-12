import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from '../lib/axios';
import Navbar from './Navbar';
import { useAuth } from '../contexts/AuthContext';  // ✅ 추가
import './InquiryDetail.css';

function InquiryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();  // ✅ 현재 로그인한 사용자 정보

  const [inquiry, setInquiry] = useState(null);
  const [content, setContent] = useState('');
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    axios.get(`/inquiry/${id}`)
      .then(res => {
        setInquiry(res.data);
        setContent(res.data.content);
        if (user?.email === res.data.email) {
          setIsAuthor(true);
        }
      })
      .catch(err => {
        console.error("❌ 상세 불러오기 실패:", err);
        alert("문의글을 불러올 수 없습니다.");
        navigate('/');
      });
  }, [id, navigate, user]);

  const handleUpdate = () => {
    if (!content.trim()) return alert("내용을 입력해주세요.");
    axios.put(`/inquiry/${id}`, {
      ...inquiry,
      content
    })
      .then(() => {
        alert("수정되었습니다.");
        navigate('/contact/private');
      })
      .catch(err => {
        console.error("❌ 수정 실패:", err);
        alert("수정에 실패했습니다.");
      });
  };

  const handleDelete = () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    axios.delete(`/inquiry/${id}`)
      .then(() => {
        alert("삭제되었습니다.");
        navigate('/contact/private');
      })
      .catch(err => {
        console.error("❌ 삭제 실패:", err);
        alert("삭제에 실패했습니다.");
      });
  };

  if (!inquiry) return null;

  return (
    <>
      <Navbar />
      <div className="user-inquiry-detail-container">
        <h2 className="user-detail-title">문의 상세 보기</h2>
        <hr className="section-divider" />

        <div className="user-detail-card">
          <p><strong>제목:</strong> {inquiry.title}</p>
          <p><strong>작성자:</strong> {inquiry.name} ({inquiry.email})</p>
          <p><strong>작성일:</strong> {new Date(inquiry.created_at).toLocaleString('ko-KR')}</p>

          <textarea
            className="user-readonly-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            readOnly={!isAuthor}
          />

          {inquiry.answer && (
            <div className="admin-answer-box">
              <h4 className="answer-title">📢 관리자 답변</h4>
              <div className="admin-answer">{inquiry.answer}</div>
            </div>
          )}

          {isAuthor && (
            <div className="user-button-box">
              <button className="user-edit-btn" onClick={handleUpdate}>수정</button>
              <button className="user-delete-btn" onClick={handleDelete}>삭제</button>
            </div>
          )}
        </div>

        <div className="next-inquiry-guide">
          <p>추가 문의사항이 있다면 새롭게 작성해주세요!</p>
          <Link to="/contact/private/write">
            <button className="next-inquiry-btn">새로운 문의 하러 가기</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default InquiryDetail;
