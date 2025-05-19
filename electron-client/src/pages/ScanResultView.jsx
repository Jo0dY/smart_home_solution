import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell } from 'recharts';
import './ScanResultView.css';

import homeIcon from "/icons/home.png";
import profileIcon from "/icons/profile.png";
import reportIcon from "/icons/report.png";
import logoutIcon from "/icons/logout.png";

const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

function ScanResultView() {
  const { deviceId } = useParams();
  const navigate = useNavigate();
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/scan/result/${deviceId}`)
      .then((res) => res.json())
      .then((data) => {
        const risk_items = data.summary ? data.summary.split(" / ") : [];
        setScanResult({ ...data, risk_items });
      })
      .catch((err) => console.error('스캔 결과 불러오기 실패:', err));
  }, [deviceId]);

  if (!scanResult) {
    return <div style={{ padding: '2rem' }}>⏳ 스캔 결과 불러오는 중...</div>;
  }

  const pieData =
    scanResult.risk_items && scanResult.risk_items.length > 0
      ? scanResult.risk_items.map((item) => ({
          name: item,
          value: 100 / scanResult.risk_items.length,
        }))
      : [];

  return (
    <div className="scan-page">
      {/* 사이드바 */}
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

      <div className="scan-content">
        <button className="back-button" onClick={() => navigate(-1)}>뒤로가기</button>
        <h2 className="centered-title">최근 점검 결과 요약</h2>

        <div className="graph-card">
          <div className="graph-area">
            <PieChart width={300} height={300}>
              <Pie
                data={pieData.length > 0 ? pieData : [{ name: "none", value: 1 }]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
                labelLine={false}
              >
                {pieData.length > 0
                  ? pieData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))
                  : <Cell fill="#f0f0f0" />}
              </Pie>
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize={16} fill="#999">
                {pieData.length > 0 ? `${scanResult.score}점` : "📉 점검된 항목이 없습니다."}
              </text>
            </PieChart>
          </div>

          <div className="checklist-box">
            <h4>점검 항목</h4>
            <ul>
              {scanResult.risk_items.length > 0 ? (
                scanResult.risk_items.map((item, idx) => (
                  <li key={idx}>{item.includes("응답") ? "⚠️" : "✔️"} {item}</li>
                ))
              ) : (
                <li>✅ 점검된 항목이 없습니다.</li>
              )}
            </ul>
          </div>
        </div>

        <div className="summary-box">
          <h3>요약</h3>
          <p>{scanResult.summary || "요약 정보가 없습니다."}</p>
        </div>
      </div>
    </div>
  );
}

export default ScanResultView;
