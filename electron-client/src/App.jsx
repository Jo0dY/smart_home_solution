// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import DashboardApp from './pages/DashboardApp';  // ✅ 변경됨
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<DashboardApp />} /> {/* ✅ 모든 경로 보호됨 */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;