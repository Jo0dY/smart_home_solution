// ✅ NoticeDetail.jsx (보안 강화)
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from '../lib/axios';
import "./NoticeDetail.css";
import Navbar from "./Navbar";

function NoticeDetail() {
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/users/me');
        setRole(res.data.role);
      } catch (err) {
        setRole(""); // 비로그인 상태로 처리
      }
    };

    const fetchNotice = async () => {
      try {
        const res = await axios.get(`/notice/${id}`);
        setNotice(res.data);
      } catch (err) {
        alert("공지사항을 불러오지 못했습니다.");
        navigate("/notice");
      }
    };

    fetchUser();
    fetchNotice();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await axios.delete(`/notice/${id}`);
        alert("삭제되었습니다.");
        navigate("/notice");
      } catch (err) {
        console.error(err);
        alert("삭제 실패: 권한이 없거나 서버 오류");
      }
    }
  };

  const handleEdit = () => {
    navigate(`/admin/notice/edit/${id}`);
  };

  if (!notice) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="notice-detail-container">
        <h2 className="notice-detail-title">{notice.title}</h2>
        <p className="notice-detail-date">
          {new Date(notice.created_at).toLocaleString()}
        </p>
        <div className="notice-detail-content">{notice.content}</div>

        {role === "admin" && (
          <div className="notice-detail-buttons">
            <button onClick={handleEdit}>수정</button>
            <button onClick={handleDelete}>삭제</button>
          </div>
        )}

        <button onClick={() => navigate("/notice")}>목록으로</button>
      </div>
    </>
  );
}

export default NoticeDetail;