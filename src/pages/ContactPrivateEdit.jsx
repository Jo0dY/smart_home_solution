import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../lib/axios';
import Navbar from './Navbar';
import './ContactPrivateEdit.css';

function ContactPrivateEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    axios.get(`/inquiry/${id}`)
      .then(res => {
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch(err => {
        console.error('❌ 문의글 불러오기 실패:', err);
        alert('문의글 정보를 불러올 수 없습니다.');
        navigate('/contact/private');
      });
  }, [id, navigate]);

  const handleUpdate = (e) => {
    e.preventDefault();

    axios.put(`/inquiry/${id}`, {
      title,
      content,
    })
      .then(() => {
        alert('문의글이 수정되었습니다.');
        navigate(`/contact/private/${id}`);
      })
      .catch(err => {
        console.error('❌ 수정 실패:', err);
        alert('문의글 수정에 실패했습니다.');
      });
  };

  return (
    <>
      <Navbar />
      <div className="edit-container">
        <h2 className="edit-title">문의글 수정</h2>

        <form className="edit-form" onSubmit={handleUpdate}>
          <div className="form-group">
            <label>제목</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>내용</label>
            <textarea
              rows="8"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="edit-buttons">
            <button type="submit" className="edit-save">저장</button>
            <button type="button" className="edit-cancel" onClick={() => navigate(`/contact/private/${id}`)}>
              취소
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ContactPrivateEdit;
