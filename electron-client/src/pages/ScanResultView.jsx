import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ScanResultView.css';

const ScanResultView = () => {
  const { deviceId } = useParams();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`/api/v1/scan/result/history/${deviceId}`); // 엔드포인트는 수정 필요
        setResults(response.data);
      } catch (err) {
        setError('스캔 결과를 불러오는 중 오류 발생');
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [deviceId]);

  const getColorClass = (score) => {
    if (score >= 70) return 'score-safe';
    if (score >= 40) return 'score-warning';
    return 'score-danger';
  };

  const getDegree = (score) => `${(score / 100) * 360}deg`;

  if (loading) return <div className="loading">불러오는 중...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!results.length) return <div className="error">결과 없음</div>;

  return (
    <div className="result-container compact">
      <div className="header-row">
        <button className="back-button" onClick={() => navigate(-1)}>← 뒤로가기</button>
        <h2>스캔 결과</h2>
      </div>
      {results.map((result, index) => (
        <div className="scan-block" key={index}>
          <div className="meta-info">
            <strong>점검 날짜:</strong> {new Date(result.scan_date).toLocaleString()}
          </div>

          <div className="gauge-container">
            <div className="gauge" style={{ '--degree': getDegree(result.score) }}>
              <span>{result.score}점</span>
            </div>
          </div>

          <div className="score-bar-wrapper">
            <div
              className={`score-bar ${getColorClass(result.score)}`}
              style={{ width: `${result.score}%` }}
            >
              {result.score}%
            </div>
          </div>

          <div className="summary-box">
            <h4>요약 결과</h4>
            <p>{result.result_summary || '요약 정보 없음'}</p>
          </div>

          <table className="result-table">
            <thead>
              <tr>
                <th>포트</th>
                <th>상태</th>
                <th>서비스</th>
              </tr>
            </thead>
            <tbody>
              {result.parsed_ports && result.parsed_ports.length > 0 ? (
                result.parsed_ports.map((port, idx) => (
                  <tr key={idx}>
                    <td>{port.port}</td>
                    <td>{port.state}</td>
                    <td>{port.service}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">열려 있는 포트 없음</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ScanResultView;
