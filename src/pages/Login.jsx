import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import Navbar from './Navbar';
import { useAuth } from '../contexts/AuthContext'; // ✅ 추가: 로그인 상태 관리

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ 추가: login 함수 가져오기

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

      // ✅ localStorage 저장
      localStorage.setItem('token', access_token);
      localStorage.setItem('user_id', user_id);
      localStorage.setItem('email', userEmail);

      // ✅ 로그인 상태 전역 반영
      login({ id: user_id, email: userEmail, name }); // 이름 포함!

      alert('로그인 성공!');
      navigate('/');
    } catch (err) {
      console.error('로그인 실패:', err.response?.data);
      alert(err.response?.data?.detail || '로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <Navbar />
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
          <span onClick={() => navigate('/Signup')}>회원가입</span>
          <span>|</span>
          <span onClick={() => navigate('/FindAccount')}>아이디/비밀번호 찾기</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
