import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../lib/axios';
import Navbar from './Navbar';
import './AdminInquiryDetail.css';

function AdminInquiryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [inquiry, setInquiry] = useState(null);
  const [answer, setAnswer] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios.get(`/inquiry/${id}`)
      .then(res => {
        setInquiry(res.data);
        setAnswer(res.data.answer || '');
      })
      .catch(() => {
        alert("문의글을 불러올 수 없습니다.");
        navigate('/admin/inquiry');
      });
  }, [id, navigate]);

  const handleSubmit = () => {
    if (!answer.trim()) return alert("답변을 입력해주세요.");
    axios.patch(`/admin/inquiry/${id}/answer`, { answer })
      .then(() => {
        alert("답변이 저장되었습니다.");
        setIsEditing(false);
        navigate('/admin/inquiry');
      })
      .catch(() => {
        alert("답변 저장에 실패했습니다.");
      });
  };

  if (!inquiry) return null;

  return (
    <>
      <Navbar />
      <div className="admin-inquiry-detail-container">
        <h2 className="admin-detail-title">문의 상세 보기 (관리자)</h2>
        <div className="admin-detail-card">
          <p><strong>제목:</strong> {inquiry.title}</p>
          <p><strong>작성자:</strong> {inquiry.name} ({inquiry.email})</p>
          <p><strong>작성일:</strong> {new Date(inquiry.created_at).toLocaleString('ko-KR')}</p>
          <hr />
          <p><strong>내용:</strong></p>
          <div className="admin-inquiry-content">{inquiry.content}</div>

          <div className="admin-answer-section">
            <label><strong>답변 작성</strong></label>
            {isEditing ? (
              <>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  rows={5}
                  className="admin-answer-textarea"
                />
                <div className="admin-button-box">
                  <button className="admin-edit-btn" onClick={handleSubmit}>저장</button>
                  <button className="admin-delete-btn" onClick={() => setIsEditing(false)}>취소</button>
                </div>
              </>
            ) : (
              <>
                <div className="admin-answer-display">{inquiry.answer || '답변이 없습니다.'}</div>
                <button className="admin-edit-btn" onClick={() => setIsEditing(true)}>✏️ 답변 수정</button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminInquiryDetail;
