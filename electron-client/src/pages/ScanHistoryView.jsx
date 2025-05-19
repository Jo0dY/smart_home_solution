import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './ScanHistoryView.css';

import homeIcon from "/icons/home.png";
import profileIcon from "/icons/profile.png";
import reportIcon from "/icons/report.png";
import logoutIcon from "/icons/logout.png";

const ScanHistoryView = () => {
  const [scanHistory, setScanHistory] = useState([]);
  const { deviceId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`/api/v1/scan/result/history/${deviceId}`);
        const data = res.data;
        if (Array.isArray(data)) {
          setScanHistory(data);
        } else {
          console.warn('⚠️ API 응답이 배열이 아닙니다:', data);
          setScanHistory([]);
        }
      } catch (err) {
        console.error('❌ 히스토리 불러오기 실패', err);
        setScanHistory([]);
      }
    };

    fetchHistory();
  }, [deviceId]);

  const handleDetail = (resultId) => {
    navigate(`/scan-result-detail/${resultId}`);
  };

  const BackButton = () => (
    <button className="history-back-button" onClick={() => navigate(-1)}>뒤로가기</button>
  );

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
      <div className="scan-content">
        <div className="header-row">
          <BackButton />
          <h2 className="centered-title">기기 점검 기록</h2>
        </div>

        <table className="scan-table">
          <thead>
            <tr>
              <th>번호</th>
              <th>스캔 날짜</th>
              <th>점수</th>
              <th>요약</th>
              <th>자세히 보기</th>
            </tr>
          </thead>
          <tbody>
            {scanHistory.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', color: '#888' }}>
                  📭 스캔 기록이 없습니다.
                </td>
              </tr>
            ) : (
              scanHistory.map((result, index) => (
                <tr key={result.id}>
                  <td>{index + 1}</td>
                  <td>{new Date(result.scan_date).toLocaleString()}</td>
                  <td>{result.score}점</td>
                  <td>{result.summary}</td>
                  <td><button className="detail-btn" onClick={() => handleDetail(result.id)}>자세히 보기</button></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScanHistoryView;
