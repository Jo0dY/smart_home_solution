// src/pages/DeviceModal.jsx
import React, { useState } from 'react';
import axios from '../lib/axios';
import './DeviceModal.css';

function DeviceModal({ onClose }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [ip, setIp] = useState('');
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/devices', {
        name,
        type,
        ip,
        ssid,
        password,
      });

      alert('✅ 기기 등록 및 Wi-Fi 연결 성공!');
      setName('');
      setType('');
      setIp('');
      setSsid('');
      setPassword('');
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

          <label htmlFor="device-ip">기기 IP 주소</label>
          <input
            id="device-ip"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            required
          />

          <label htmlFor="ssid">Wi-Fi SSID</label>
          <input
            id="ssid"
            value={ssid}
            onChange={(e) => setSsid(e.target.value)}
            required
          />

          <label htmlFor="password">Wi-Fi 비밀번호</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

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