import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../lib/axios'; // ✅ withCredentials: true 포함된 axios 인스턴스
import './Login.css';
import Navbar from './Navbar';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // ✅ API 요청: FastAPI에 쿠키 기반 로그인 요청
      const response = await axios.post('/users/login', { email, password }, { withCredentials: true });
      const { user_id, email: userEmail, role } = response.data;
      
      console.log("✅ 로그인된 사용자 role:", role);  // 확인용
      
      localStorage.setItem('user_id', user_id);
      localStorage.setItem('email', userEmail);
      localStorage.setItem('role', role); // ✅ 반드시 저장
      

      // ✅ 로그인 context 상태 갱신
      login({ id: user_id, email: userEmail });

      alert('로그인 성공!');
      navigate('/');
    } catch (err) {
      console.error('로그인 실패:', err.response?.data || err.message);
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
