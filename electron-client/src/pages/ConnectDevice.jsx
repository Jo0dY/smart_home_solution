// src/pages/ConnectDevice.jsx
import React, { useState } from 'react';
import './ConnectDevice.css';
import DeviceModal from './DeviceModal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import homeIcon from '/icons/home.png';
import profileIcon from '/icons/profile.png';
import reportIcon from '/icons/report.png';
import logoutIcon from '/icons/logout.png';

function ConnectDevice() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

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

        {showModal && <DeviceModal onClose={() => setShowModal(false)} />}
      </div>
    </div>
  );
}

export default ConnectDevice;
