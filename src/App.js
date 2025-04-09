import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';  
// import Solution from './pages/Solution';
// import Notice from './pages/Notice';
// import Contact from './pages/Contact';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Privacy from './pages/Privacy';     // 🔹 추가
// import MyPage from './pages/MyPage';       // 🔹 추가

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />

        {/* <Route path="/solution" element={<Solution />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
