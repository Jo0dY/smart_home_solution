import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ScanResultQuickSelect.css';

import homeIcon from "/icons/home.png";
import profileIcon from "/icons/profile.png";
import reportIcon from "/icons/report.png";
import logoutIcon from "/icons/logout.png";

const ScanResultQuickSelect = () => {
  const navigate = useNavigate();
  const { deviceId } = useParams();

  return (
    <div className="scan-page">
      {/* ✅ 사이드바 */}
      <div className="sidebar" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100vh' }}>
        <div>
          <div className="logo" style={{ color: '#000' }}>jibom</div>
          <div className="menu">
            <div className="menu-item" onClick={() => navigate("/dashboard")}> <img src={homeIcon} alt="홈" /> </div>
            <div className="menu-item" onClick={() => navigate("/connect-device")}> <img src={profileIcon} alt="기기 연결" /> </div>
            <div className="menu-item" onClick={() => navigate("/device-list")}> <img src={reportIcon} alt="리포트" /> </div>
          </div>
        </div>
        <div className="menu-bottom" style={{ padding: '1rem' }}>
          <div className="menu-item" onClick={() => navigate("/login")}> <img src={logoutIcon} alt="로그아웃" style={{ width: '24px', height: '24px' }} /> </div>
        </div>
      </div>

      {/* ✅ 본문 */}
      <div className="quick-wrapper">
        <div className="quick-card">
          <button className="quick-back" onClick={() => navigate(-1)}>뒤로가기</button>

          <h2 className="quick-title">점검 결과 보기</h2>

          <div className="quick-buttons">
            <button
              className="quick-btn primary"
              onClick={() => navigate(`/scan/result/${deviceId}`)}
            >
              최신 결과 요약 보기
            </button>

            <button
              className="quick-btn outline"
              onClick={() => navigate(`/scan/history/${deviceId}`)}
            >
              전체 기록 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanResultQuickSelect;
