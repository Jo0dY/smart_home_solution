import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import logoImg from '../assets/logo.png';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isSolutionPage = location.pathname === '/solution';

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setIsLoggedIn(true);
      setUserEmail(storedEmail);
    } else {
      setIsLoggedIn(false);
    }
  }, [location.pathname]); // 페이지 이동 시 확인

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className={`navbar ${isSolutionPage ? 'navbar-solution' : ''}`}>
      <div className="logo">
        <img src={logoImg} alt="지켜_봄 로고" className="logo-img" />
      </div>

      <div className="nav-center">
        <ul className="nav-links">
          <li><Link to="/">홈</Link></li>
          <li><Link to="/solution">솔루션 기능</Link></li>
          <li><Link to="/notice">공지사항</Link></li>

          {/* ✅ 문의사항 드롭다운 */}
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
            <li className="login-link">👋 {userEmail}님</li>
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
