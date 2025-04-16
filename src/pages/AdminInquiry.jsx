import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../lib/axios';
import Navbar from './Navbar';
import './AdminInquiry.css';

function AdminInquiry() {
  const [inquiries, setInquiries] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [answerMap, setAnswerMap] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ 관리자 인증 추가
    axios.get('/users/me')
      .then(res => {
        if (res.data.role !== 'admin') {
          alert('관리자만 접근 가능합니다.');
          navigate('/');
        } else {
          // 인증 성공 시 문의 목록 로딩
          axios.get('/admin/inquiry/')
            .then(res => setInquiries(res.data))
            .catch(err => {
              console.error('❌ 문의 목록 불러오기 실패:', err);
              alert('문의글 목록을 불러오는 데 실패했습니다.');
            });
        }
      })
      .catch(() => {
        alert('로그인이 필요합니다.');
        navigate('/login');
      });
  }, [navigate]);

  const handleAnswerChange = (id, value) => {
    setAnswerMap(prev => ({ ...prev, [id]: value }));
  };

  const handleAnswerSubmit = (id) => {
    const answer = answerMap[id];
    if (!answer?.trim()) return alert("답변을 입력해주세요.");

    axios.patch(`/admin/inquiry/${id}/answer`, { answer })
      .then(() => {
        alert("답변이 등록되었습니다.");
        setExpandedId(null);
        return axios.get('/admin/inquiry/');
      })
      .then(res => setInquiries(res.data))
      .catch(err => {
        console.error('❌ 답변 등록 실패:', err);
        alert('답변 등록에 실패했습니다.');
      });
  };

  const handleAnswerDelete = (id) => {
    axios.patch(`/admin/inquiry/${id}/answer`, { answer: '' })
      .then(() => {
        alert("답변이 삭제되었습니다.");
        setExpandedId(null);
        return axios.get('/admin/inquiry/');
      })
      .then(res => setInquiries(res.data))
      .catch(err => {
        console.error('❌ 답변 삭제 실패:', err);
        alert('답변 삭제에 실패했습니다.');
      });
  };

  return (
    <>
      <Navbar />
      <div className="admin-inquiry-container">
        <h2 className="admin-inquiry-title">전체 문의글 관리</h2>

        <table className="admin-inquiry-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>제목</th>
              <th>작성자</th>
              <th>이메일</th>
              <th>등록일</th>
              <th>상태</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((item) => (
              <React.Fragment key={item.id}>
                <tr
                  className="inquiry-row"
                  onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                >
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{new Date(item.created_at).toLocaleString('ko-KR')}</td>
                  <td>{item.answer ? '답변완료' : '대기중'}</td>
                  <td>{item.answer ? '✔' : '✏'}</td>
                </tr>
                {expandedId === item.id && (
                  <tr className="expanded-row">
                    <td colSpan="7">
                      <div className="expanded-box">
                        <h4>작성 내용</h4>
                        <textarea
                          defaultValue={item.content}
                          readOnly
                          className="readonly-text"
                        />

                        <div className="answer-section">
                          <label>답변</label>
                          <textarea
                            value={answerMap[item.id] ?? item.answer ?? ''}
                            onChange={(e) => handleAnswerChange(item.id, e.target.value)}
                            placeholder="답변 내용을 입력하세요"
                            rows={4}
                          />
                          <div className="button-group">
                            <button onClick={() => handleAnswerSubmit(item.id)}>답변 수정</button>
                            <button onClick={() => handleAnswerDelete(item.id)} className="delete-btn">답변 삭제</button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminInquiry;
