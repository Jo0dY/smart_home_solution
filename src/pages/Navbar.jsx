import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import logoImg from '../assets/logo.png';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isSolutionPage = location.pathname === '/solution';

  const { user, isLoggedIn, logout } = useAuth();  // ✅ 여기만으로 로그인 상태 & 이메일 가져옴

  const handleLogout = async () => {
    await logout();  // ❗ 서버에 진짜 요청 보낸 다음
    navigate('/');   // ❗ 그 다음 이동
  };  

  return (
    <nav className={`navbar ${isSolutionPage ? 'navbar-solution' : ''}`}>
      <div className="logo">
        <Link to="/">
          <img src={logoImg} alt="지켜_봄 로고" className="logo-img" />
        </Link>
      </div>

      <div className="nav-center">
        <ul className="nav-links">
          <li><Link to="/">홈</Link></li>
          <li><Link to="/solution">솔루션 기능</Link></li>
          <li><Link to="/notice">공지사항</Link></li>
          <li className="dropdown">
            <Link to="#" className="dropdown-label">문의사항</Link>
            <ul className="dropdown-menu">
              <li><Link to="/faq">자주 묻는 질문</Link></li>
              <li><Link to="/contact">문의 게시판</Link></li>
            </ul>
          </li>
        </ul>
      </div>

      <ul className="auth-group">
        {isLoggedIn ? (
          <>
            <li className="login-link">👋 {user?.email || '사용자'}님</li>
            <li>
              <Link to="/mypage">
                <button className="signup-btn">마이페이지</button>
              </Link>
            </li>
            <li>
              <button className="signup-btn" onClick={handleLogout}>로그아웃</button>
            </li>
          </>
        ) : (
          <>
            <li className="login-link"><Link to="/login">로그인</Link></li>
            <li>
              <Link to="/signup">
                <button className="signup-btn">회원가입</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;