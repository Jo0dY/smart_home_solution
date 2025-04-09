import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Solution from './pages/Solution';
import Notice from './pages/Notice';
import Contact from './pages/Contact';
import Login from './pages/Login';
import PolicyPage from './pages/PolicyPage'; // ✅ 변경된 이름 사용
import MyPage from './pages/MyPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/solution" element={<Solution />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/privacy" element={<PolicyPage />} /> {/* ✅ 변경된 컴포넌트 사용 */}
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  );
}

export default App;

