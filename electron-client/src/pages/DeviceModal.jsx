// src/pages/DeviceModal.jsx
import React, { useState } from 'react';
import axios from '../lib/axios';
import './DeviceModal.css';

function DeviceModal({ onClose }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  // const [status, setStatus] = useState('정상'); // ❌ 사용하지 않으므로 제거

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ ip 하드코딩 추가
      await axios.post('/devices', {
        name,
        type,
        ip: '127.0.0.1', // 고정값 임시 등록
      });

      alert('✅ 기기 등록 완료!');
      setName('');
      setType('');
      onClose(); // 모달 닫기
    } catch (err) {
      console.error('❌ 등록 실패:', err);
      alert('❌ 등록 실패: ' + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>기기 등록</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="device-name">기기 이름</label>
          <input
            id="device-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="device-type">기기 유형</label>
          <select
            id="device-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">선택하세요</option>
            <option value="스마트 플러그">스마트 플러그</option>
            <option value="스마트 스피커">스마트 스피커</option>
            <option value="스마트 도어락">스마트 도어락</option>
            <option value="스마트 홈캠">스마트 홈캠</option>
          </select>

          <div className="button-group">
            <button type="submit" className="btn-confirm">등록</button>
            <button type="button" className="btn-cancel" onClick={onClose}>취소</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DeviceModal;
