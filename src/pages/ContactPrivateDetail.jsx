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

  // ✅ 문의 상세 조회
  useEffect(() => {
    axios.get(`/inquiry/${id}`)
      .then(res => {
        setInquiry(res.data);
        if (res.data.answer) {
          setAnswer(res.data.answer);
        }
      })
      .catch(err => {
        console.error("❌ 상세 불러오기 실패:", err);
        alert("문의글을 불러올 수 없습니다.");
        navigate("/admin/inquiry");
      });
  }, [id, navigate]);

  // ✅ 답변 등록 또는 수정
  const handleSubmit = () => {
    if (!answer.trim()) {
      alert("답변을 입력하세요.");
      return;
    }

    axios.patch(`/admin/inquiry/${id}/answer`, { answer })
      .then(() => {
        alert("답변이 저장되었습니다.");
        setIsEditing(false);
        setInquiry(prev => ({ ...prev, answer, status: '답변완료' }));
      })
      .catch(err => {
        console.error("❌ 답변 등록 실패:", err);
        alert("답변 등록에 실패했습니다.");
      });
  };

  // ✅ 답변 삭제
  const handleDelete = () => {
    if (window.confirm("정말 답변을 삭제하시겠습니까?")) {
      axios.patch(`/admin/inquiry/${id}/answer`, { answer: '' })
        .then(() => {
          alert("답변이 삭제되었습니다.");
          setAnswer('');
          setInquiry(prev => ({ ...prev, answer: '', status: '대기중' }));
          setIsEditing(false);
        })
        .catch(err => {
          console.error("❌ 답변 삭제 실패:", err);
          alert("답변 삭제에 실패했습니다.");
        });
    }
  };

  if (!inquiry) return null;

  return (
    <>
      <Navbar />
      <div className="admin-inquiry-detail-container">
        <h2>문의 상세 보기</h2>

        <div className="detail-box">
          <p><strong>제목:</strong> {inquiry.title}</p>
          <p><strong>작성자:</strong> {inquiry.name} ({inquiry.email})</p>
          <p><strong>작성일:</strong> {new Date(inquiry.created_at).toLocaleString('ko-KR')}</p>
          <hr />
          <p><strong>내용:</strong></p>
          <div className="content-box">{inquiry.content}</div>
        </div>

        {/* ✅ 관리자 답변 영역 */}
        <div className="answer-section">
          <label><strong>📩 관리자 답변</strong></label>
          {inquiry.answer && !isEditing ? (
            <div>
              <div className="answer-readonly">{inquiry.answer}</div>
              <button onClick={() => setIsEditing(true)}>✏️ 답변 수정</button>
              <button onClick={handleDelete} className="delete-btn">🗑️ 답변 삭제</button>
            </div>
          ) : (
            <div>
              <textarea
                rows={5}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="답변을 입력하세요"
              />
              <div className="answer-buttons">
                <button onClick={handleSubmit}>💾 저장</button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setAnswer(inquiry.answer || '');
                  }}
                >
                  ❌ 취소
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminInquiryDetail;
