import React, { useState, useEffect } from 'react';
import './ConnectDevice.css';
import DeviceModal from './DeviceModal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from '../lib/axios';

import homeIcon from '/icons/home.png';
import profileIcon from '/icons/profile.png';
import reportIcon from '/icons/report.png';
import logoutIcon from '/icons/logout.png';

function ConnectDevice() {
  const [showModal, setShowModal] = useState(false);
  const [devices, setDevices] = useState([]);
  const navigate = useNavigate();
  const { logout } = useAuth();

  // ✅ 기기 목록 가져오기
  useEffect(() => {
    axios.get('/devices')
      .then(res => setDevices(res.data))
      .catch(err => console.error("기기 목록 조회 실패:", err));
  }, []);

  // ✅ 삭제 핸들러
  const handleDelete = async (deviceId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await axios.delete(`/devices/${deviceId}`);
      setDevices(prev => prev.filter(device => device.id !== deviceId));
    } catch (err) {
      console.error('삭제 실패:', err);
      alert('삭제 실패: ' + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div className="layout">
      {/* 사이드바 */}
      <div className="sidebar" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100vh' }}>
        <div>
          <div className="logo">jibom</div>
          <div className="menu">
            <div className="menu-item" onClick={() => navigate("/dashboard")}>
              <img src={homeIcon} alt="홈" />
            </div>
            <div className="menu-item" onClick={() => navigate("/connect-device")}>
              <img src={profileIcon} alt="기기 연결" />
            </div>
            <div className="menu-item" onClick={() => navigate("/device-list")}>
              <img src={reportIcon} alt="리포트" />
            </div>
          </div>
        </div>
        <div className="menu-bottom" style={{ padding: '1rem' }}>
          <div className="menu-item" onClick={() => { logout(); navigate("/login"); }}>
            <img src={logoutIcon} alt="로그아웃" style={{ width: '24px', height: '24px' }} />
          </div>
        </div>
      </div>

      {/* 본문 */}
      <div className="connect-device-container">
        <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>IoT 기기 연결</h1>

        <div className="steps">
          <div className="step">① 기기 연결 버튼 클릭</div>
          <div className="step">② 이름/유형 입력</div>
          <div className="step">③ 등록 완료!</div>
        </div>

        <div className="start-btn-wrapper">
          <button className="start-btn" onClick={() => setShowModal(true)}>
            기기 등록 시작하기
          </button>
        </div>

        <div className="device-list">
          <h2>등록된 기기 목록</h2>
          {devices.length === 0 ? (
            <p className="no-device-message">등록된 기기가 없습니다.</p>
          ) : (
            <table className="device-table">
              <thead>
                <tr>
                  <th>번호</th>
                  <th>기기 이름</th>
                  <th>기기 유형</th>
                  <th>삭제</th>
                </tr>
              </thead>
              <tbody>
                {devices.map((device, index) => (
                  <tr key={device.id}>
                    <td>{index + 1}</td>
                    <td>{device.name}</td>
                    <td>{device.type}</td>
                    <td>
                      <button className="delete-btn" onClick={() => handleDelete(device.id)}>삭제</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ✅ 모달 렌더링 */}
      {showModal && <DeviceModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default ConnectDevice;
