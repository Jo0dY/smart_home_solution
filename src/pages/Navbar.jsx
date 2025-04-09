import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

import logoImg from '../assets/logo.png';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logoImg} alt="지켜_봄 로고" className="logo-img" />
      </div>
      <div className="nav-center">
        <ul className="nav-links">
          <li><Link to="/">홈</Link></li>
          <li><Link to="/solution">솔루션 기능</Link></li>
          <li><Link to="/notice">공지사항</Link></li>
          <li><Link to="/contact">문의사항</Link></li>
          <li><Link to="/privacy">개인정보 보호</Link></li>
        </ul>
      </div>
      <ul className="auth-group">
        <li className="login-link"><Link to="/login">로그인</Link></li>
        <li>
          <Link to="/signup">
            <button className="signup-btn">회원가입</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;