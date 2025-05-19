import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ScanResultDetail.css';

import homeIcon from "/icons/home.png";
import profileIcon from "/icons/profile.png";
import reportIcon from "/icons/report.png";
import logoutIcon from "/icons/logout.png";

const ScanResultDetail = () => {
  const { scanId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch(`/api/v1/scan/result/detail/${scanId}`)
      .then(res => res.json())
      .then(data => setResult(data))
      .catch(err => console.error("🔴 결과 불러오기 실패", err));
  }, [scanId]);

  if (!result) {
    return <div style={{ padding: '2rem' }}>⏳ 결과를 불러오는 중입니다...</div>;
  }

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
        <button className="back-button" onClick={() => navigate(-1)}>← 뒤로가기</button>
        <h2 className="centered-title">상세 점검 결과</h2>

        <div className="detail-box">
          <p><strong>스캔 일시:</strong> {new Date(result.scan_date).toLocaleString()}</p>
          <p><strong>점수:</strong> {result.score}점</p>
          <p><strong>요약:</strong> {result.summary}</p>

          <h4>🔍 감지된 포트 정보</h4>
          <table className="port-table">
            <thead>
              <tr>
                <th>포트</th>
                <th>상태</th>
                <th>서비스</th>
              </tr>
            </thead>
            <tbody>
              {result.parsed_ports.map((port, idx) => (
                <tr key={idx}>
                  <td>{port.port}</td>
                  <td>{port.state}</td>
                  <td>{port.service}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4>🧾 Nmap 원본 출력</h4>
          <pre className="raw-output">{result.raw_output}</pre>
        </div>
      </div>
    </div>
  );
};

export default ScanResultDetail;
