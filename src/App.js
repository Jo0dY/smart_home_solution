// App.js
import { Routes, Route } from 'react-router-dom'; // ✅ Router 제거
import Home from './pages/Home';
import Signup from './pages/Signup';
import Solution from './pages/Solution';
import Notice from './pages/Notice';
import Contact from './pages/Contact';
import Login from './pages/Login';
import PolicyPage from './pages/PolicyPage';
import MyPage from './pages/MyPage';
import FindAccount from './pages/FindAccount';
import InstallGuide from './pages/InstallGuide';

import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider> {/* ✅ 로그인 상태 Context만 감싸기 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/solution" element={<Solution />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/privacy" element={<PolicyPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/FindAccount" element={<FindAccount />} />
        <Route path="/install-guide" element={<InstallGuide />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
