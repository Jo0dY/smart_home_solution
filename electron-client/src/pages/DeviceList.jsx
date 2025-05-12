import React, { useEffect, useState } from "react";
import axios from "../lib/axios";
import "./DeviceList.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import homeIcon from "/icons/home.png";
import profileIcon from "/icons/profile.png";
import reportIcon from "/icons/report.png";
import logoutIcon from "/icons/logout.png";

function DeviceList() {
  const [devices, setDevices] = useState([]);
  const [scanResults, setScanResults] = useState({});
  const [scanStatus, setScanStatus] = useState({});
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    axios.get("/devices")
      .then(async (res) => {
        setDevices(res.data);

        const results = {};
        const status = {};

        for (const device of res.data) {
          try {
            const result = await axios.get(`/scan/result/${device.id}`);
            results[device.id] = result.data;
            status[device.id] = "not-scanned"; // 초기 상태는 점검 완료 표시 없음
          } catch (e) {
            status[device.id] = "not-scanned";
          }
        }

        setScanResults(results);
        setScanStatus(status);
      })
      .catch((err) => console.error("기기 불러오기 실패:", err));
  }, []);

  const handleScan = async (deviceId) => {
    setScanStatus(prev => ({ ...prev, [deviceId]: "loading" }));
    try {
      await axios.post(`/scan/${deviceId}`, {}, { timeout: 10 * 60 * 1000 });
      const res = await axios.get(`/scan/result/${deviceId}`);
      setScanResults(prev => ({ ...prev, [deviceId]: res.data }));
      setScanStatus(prev => ({ ...prev, [deviceId]: "done" }));
    } catch (err) {
      console.error("스캔 실패:", err);
      alert("스캔 실패: " + (err?.response?.data?.detail || err.message));
      setScanStatus(prev => ({ ...prev, [deviceId]: "error" }));
    }
  };

  return (
    <div className="layout">
      {/* 사이드바 */}
      <div className="sidebar" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100vh' }}>
        <div>
          <div className="logo">jibom</div>
          <div className="menu">
            <div className="menu-item" onClick={() => navigate("/dashboard")}> <img src={homeIcon} alt="홈" /> </div>
            <div className="menu-item" onClick={() => navigate("/connect-device")}> <img src={profileIcon} alt="기기 연결" /> </div>
            <div className="menu-item" onClick={() => navigate("/device-list")}> <img src={reportIcon} alt="리포트" /> </div>
          </div>
        </div>

        <div className="menu-bottom" style={{ padding: '1rem' }}>
          <div
            className="menu-item"
            onClick={() => {
              logout();
              navigate("/login");
            }}
            style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}
            title="로그아웃"
          >
            <img src={logoutIcon} alt="로그아웃" style={{ width: '24px', height: '24px' }} />
          </div>
        </div>
      </div>

      {/* 본문 */}
      <div className="device-list-container">
        <h2 className="device-list-title">등록된 IoT 기기</h2>
        {devices.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "2rem", color: "#888" }}>등록된 기기가 없습니다.</p>
        ) : (
          <div className="device-grid">
            {devices.map(device => (
              <div key={device.id} className="device-card">
                <p><strong>이름:</strong> {device.name}</p>
                <p><strong>IP:</strong> {device.ip}</p>

                {/* 버튼 가로 정렬 */}
                <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <button
                    onClick={() => handleScan(device.id)}
                    disabled={scanStatus[device.id] === "loading"}
                  >
                    점검하기
                  </button>
                  {scanResults[device.id] && (
                    <button onClick={() => navigate(`/scan/quick/${device.id}`)}>결과 보기</button>
                  )}
                </div>

                {/* 점검 중 표시 */}
                {scanStatus[device.id] === "loading" && (
                  <div style={{ textAlign: "center", fontSize: "0.9rem", color: "#1976d2" }}>
                    🔍 점검 중...
                  </div>
                )}

                {/* 점검 완료 표시 */}
                {scanStatus[device.id] === "done" && scanResults[device.id]?.scan_date && (
                  <div style={{ textAlign: "center", fontSize: "0.9rem", color: "green" }}>
                    ✅ 점검 완료 ({new Date(scanResults[device.id].scan_date).toLocaleDateString()})
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DeviceList;
