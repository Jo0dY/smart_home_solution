// 📄 ScanHistoryView.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './ScanHistoryView.css';

const ScanHistoryView = () => {
  const [scanHistory, setScanHistory] = useState([]);
  const { deviceId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/v1/scan/result/history/${deviceId}`)
      .then(res => setScanHistory(res.data))
      .catch(err => console.error('❌ 히스토리 불러오기 실패', err));
  }, [deviceId]);

  const handleDetail = (resultId) => {
    navigate(`/scan-result/${resultId}`);
  };

  return (
    <div className="scan-history-container">
      <h2>📋 과거 스캔 기록</h2>
      {scanHistory.length === 0 ? (
        <p className="empty-message">스캔 기록이 없습니다.</p>
      ) : (
        <ul className="scan-list">
          {scanHistory.map((result) => (
            <li key={result.id} className="scan-item">
              <div>
                <strong>🕒 {new Date(result.scan_date).toLocaleString()}</strong>
                <p>🔐 보안 점수: <b>{result.score}점</b></p>
                <p>📝 요약: {result.summary}</p>
              </div>
              <button className="detail-btn" onClick={() => handleDetail(result.id)}>상세 보기</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ScanHistoryView;
