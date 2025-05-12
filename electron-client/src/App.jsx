// src/App.jsx
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardApp from './pages/DashboardApp';
import ConnectDevice from './pages/ConnectDevice';
import ScanResultView from './pages/ScanResultView';
import DeviceList from './pages/DeviceList';
import { AuthProvider, useAuth } from './contexts/AuthContext';


function ProtectedRoute({ children }) {
  const { isLoggedIn, isLoading } = useAuth();
  if (isLoading) return null;
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ✅ 초기 진입은 무조건 로그인으로 이동 */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* 로그인 페이지 */}
          <Route path="/login" element={<Login />} />

          {/* 보호된 페이지 (로그인 필요) */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardApp />
            </ProtectedRoute>
          } />

          <Route path="/connect-device" element={
            <ProtectedRoute>
              <ConnectDevice />
            </ProtectedRoute>
          } />

          <Route path="/device-list" element={
            <ProtectedRoute>
              <DeviceList />
            </ProtectedRoute>
          } />

          <Route path="/scan-result/:deviceId" element={
            <ProtectedRoute>
              <ScanResultView />
            </ProtectedRoute>
          } />

          {/* 알 수 없는 경로는 로그인으로 리디렉션 */}
          <Route path="/*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App; 