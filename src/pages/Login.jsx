import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../lib/axios';
import './Login.css';
import Navbar from './Navbar';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberEmail, setRememberEmail] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('remembered_email');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberEmail(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert('유효한 이메일 형식을 입력해주세요.');
      return;
    }

    if (!validatePassword(password)) {
      alert('비밀번호는 영문, 숫자, 특수문자 포함 8~16자여야 합니다.');
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:8000/api/v1/users/login',
        { email, password },
        { withCredentials: true }
      );

      const { user_id, email: userEmail, role } = res.data;

      login({ email: userEmail, user_id, role });

      // ✅ role을 반드시 localStorage에 저장!
      localStorage.setItem('role', role);

      if (rememberEmail) {
        localStorage.setItem('remembered_email', userEmail);
      } else {
        localStorage.removeItem('remembered_email');
      }

      alert('로그인 성공!');
      navigate('/');
    } catch (err) {
      const message = err.response?.data?.detail || '로그인 중 오류가 발생했습니다.';
      alert(message);
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.trim());
  };

  const validatePassword = (pw) => {
    return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,16}$/.test(pw);
  };

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <h1 className="login-title">로그인</h1>

        <form className="login-form" onSubmit={handleLogin} autoComplete="off">
          <input
            type="email"
            autoComplete="off"
            placeholder="이메일 아이디를 입력하세요"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            autoComplete="off"
            placeholder="비밀번호 (영문, 숫자, 특수문자 조합 8~16자리)"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="remember-wrapper">
            <label className="remember-label">
              <input
                type="checkbox"
                checked={rememberEmail}
                onChange={(e) => setRememberEmail(e.target.checked)}
              />
              <span>아이디 저장</span>
            </label>
          </div>

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
