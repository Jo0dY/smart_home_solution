// src/pages/ScanResultQuickSelect.jsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ScanResultQuickSelect.css";

const ScanResultQuickSelect = () => {
  const navigate = useNavigate();
  const { deviceId } = useParams(); // ✅ 중요

  const handleLatest = () => {
    navigate(`/scan/result/${deviceId}`);
  };

  const handleHistory = () => {
    navigate(`/scan/history/${deviceId}`);
  };

  return (
    <div className="quick-select-container">
      <h2>📊 결과 보기 선택</h2>
      <button onClick={handleLatest}>✅ 최신 결과 요약 보기</button>
      <button onClick={handleHistory}>📜 전체 기록 보기</button>
    </div>
  );
};

export default ScanResultQuickSelect;
