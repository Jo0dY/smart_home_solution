// src/index.js 또는 src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// ✅ 전역 axios 설정 제거
// ❌ 아래는 삭제해야 함!
// axios.defaults.baseURL = 'http://localhost:8000';
// axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

// ⛔ 위 설정은 쿠키 기반 인증과 충돌하므로 절대 사용하면 안 됨!
// ⛔ 모든 axios 요청은 src/lib/axios.js의 인스턴스를 import 해서 사용해야 함

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

