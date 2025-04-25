import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // ✅ 추가
import axios from '../lib/axios';
import './Login.css';

function Login() {
  const navigate = useNavigate(); // ✅ 훅 사용
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/users/login', {
        email,
        password,
      });

      const { email: userEmail, role, user_id } = res.data;

      localStorage.setItem('email', userEmail);
      localStorage.setItem('role', role);
      localStorage.setItem('user_id', user_id);

      alert(`${userEmail}님 로그인 성공!`);

      // ✅ navigate로 대시보드 이동
      navigate('/');
    } catch (err) {
      console.error('❌ 로그인 실패:', err.response?.data || err.message);
      alert('로그인 실패. 이메일 또는 비밀번호를 확인해주세요.');
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">로그인</button>
      </form>

      <div className="login-links">
        <span onClick={() => navigate('/signup')}>회원가입</span>
        <span>|</span>
        <span onClick={() => navigate('/find-account')}>아이디/비밀번호 찾기</span>
      </div>
    </div>
  );
}

export default Login;