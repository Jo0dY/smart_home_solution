import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import DashboardApp from './pages/DashboardApp';
import ConnectDevice from './pages/ConnectDevice';
import DeviceList from './pages/DeviceList';
import ScanResultView from './pages/ScanResultView';
import ScanHistoryView from './pages/ScanHistoryView';
import ScanResultDetail from './pages/ScanResultDetail';
import ScanResultQuickSelect from './pages/ScanResultQuickSelect';

import { AuthProvider, useAuth } from './contexts/AuthContext';

// ✅ 로그인 체크 보호 라우트
function ProtectedRoute({ children }) {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', fontSize: '1.5rem' }}>
        🔐 로그인 상태 확인 중...
      </div>
    );
  }

  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* 초기 접근 시 로그인으로 리디렉션 */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />

          {/* 보호된 라우트들 */}
          <Route path="/dashboard" element={
            <ProtectedRoute><DashboardApp /></ProtectedRoute>
          } />

          <Route path="/connect-device" element={
            <ProtectedRoute><ConnectDevice /></ProtectedRoute>
          } />

          <Route path="/device-list" element={
            <ProtectedRoute><DeviceList /></ProtectedRoute>
          } />

          {/* 최신 결과 요약 보기 */}
          <Route path="/scan/result/:deviceId" element={
            <ProtectedRoute><ScanResultView /></ProtectedRoute>
          } />

          {/* 전체 기록 보기 */}
          <Route path="/scan/history/:deviceId" element={
            <ProtectedRoute><ScanHistoryView /></ProtectedRoute>
          } />

          {/* 기록 상세 보기 */}
          <Route path="/scan-result-detail/:scanId" element={
            <ProtectedRoute><ScanResultDetail /></ProtectedRoute>
          } />

          {/* 결과 보기 선택 화면 */}
          <Route path="/scan/quick/:deviceId" element={
            <ProtectedRoute><ScanResultQuickSelect /></ProtectedRoute>
          } />

          {/* (선택) 기존에 쓰던 경로 유지 */}
          <Route path="/scan-result/:deviceId" element={
            <ProtectedRoute><ScanResultView /></ProtectedRoute>
          } />

          <Route path="/scan-result-history" element={
            <ProtectedRoute><ScanHistoryView /></ProtectedRoute>
          } />

          {/* 모든 잘못된 경로는 로그인으로 이동 */}
          <Route path="/*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
