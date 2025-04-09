import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    alert('로그인 기능은 아직 구현되지 않았습니다.');
  };

  return (
    <div className="login-container">
      <h1 className="login-title">로그인</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="이메일 아이디를 입력하세요"
          className="login-input"
          required
        />
        <input
          type="password"
          placeholder="비밀번호 (영문, 숫자, 특수문자 조합 8~16자리)"
          className="login-input"
          required
        />
        <button type="submit" className="login-button">로그인</button>
      </form>
      <div className="login-links">
        <span onClick={() => navigate('/Signup')}>회원가입</span>
        <span>|</span>
        <span onClick={() => navigate('/find-account')}>아이디/비밀번호 찾기</span>
      </div>
    </div>
  );
}

export default Login;