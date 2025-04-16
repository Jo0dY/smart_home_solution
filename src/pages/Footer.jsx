// src/components/Footer.jsx
import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="/privacy">개인정보처리방침</a>
          <a href="/terms">이용약관</a>
          <a href="mailto:jikyebom.solution@gmail.com">이메일 문의</a>
          </div>
        <div className="footer-info">
          <p>지켜봄 보안솔루션 | 대표: 지봄이</p>
          <p>사업자등록번호: 123-45-67890 | 서울특별시 강남구 테헤란로 123</p>
          <p>© 2025 Jibom. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
