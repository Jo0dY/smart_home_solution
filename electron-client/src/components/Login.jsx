// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/users/login', {
        email,
        password
      });

      const { access_token, user_id, email: userEmail, name } = response.data;

      localStorage.setItem('token', access_token);
      localStorage.setItem('user_id', user_id);
      localStorage.setItem('email', userEmail);

      login({ id: user_id, email: userEmail, name });

      alert('로그인 성공!');
      navigate('/');
    } catch (err) {
      console.error('로그인 실패:', err.response?.data);
      alert(err.response?.data?.detail || '로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">로그인</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="이메일 아이디를 입력하세요"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호 (영문, 숫자, 특수문자 조합 8~16자리)"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button">로그인</button>
      </form>

      <div className="login-links">
        {/* 웹사이트로 이동하도록 설정 */}
        <span onClick={() => window.open('https://your-web-url.com/signup', '_blank')}>
          회원가입
        </span>
        <span>|</span>
        <span onClick={() => window.open('https://your-web-url.com/find-account', '_blank')}>
          아이디/비밀번호 찾기
        </span>
      </div>
    </div>
  );
}

export default Login;

