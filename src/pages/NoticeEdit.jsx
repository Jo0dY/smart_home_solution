import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "./NoticeEdit.css";
import axios from '../lib/axios'; // ✅ axios 인스턴스 사용

function NoticeEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // ✅ 관리자 권한 여부 서버에서 검증
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axios.get('/users/me');
        if (res.data.role !== 'admin') {
          alert("관리자만 접근 가능합니다.");
          navigate("/notice");
        }
      } catch (err) {
        alert("로그인이 필요합니다.");
        navigate("/login");
      }
    };

    checkAdmin();
  }, [navigate]);

  // ✅ 공지사항 불러오기
  useEffect(() => {
    axios.get(`/notice/${id}`, { withCredentials: true })
      .then(res => {
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch((err) => {
        alert("공지사항 정보를 불러오지 못했습니다.");
        navigate("/notice");
      });
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/notice/${id}`, { title, content }, { withCredentials: true });
      alert("공지사항이 수정되었습니다.");
      navigate(`/notice/${id}`);
    } catch (err) {
      if (err.response?.status === 401) {
        alert('로그인이 필요합니다.');
        navigate('/login');
      } else if (err.response?.status === 403) {
        alert('수정 권한이 없습니다.');
      } else {
        alert("수정 실패: 서버 오류");
      }
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="notice-edit-container">
        <h2>공지사항 수정</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button type="submit">수정하기</button>
        </form>
      </div>
    </>
  );
}

export default NoticeEdit;
