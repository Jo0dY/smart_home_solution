import React, { useState } from 'react';
import axios from '../lib/axios';import './Find.css';
import Navbar from './Navbar';

function FindAccount() {
  const [mode, setMode] = useState('id');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isVerified, setIsVerified] = useState(false); // ✅ 인증 완료 여부
  const [resultMessage, setResultMessage] = useState('');
  const [error, setError] = useState('');

  // ✅ 이메일 유효성 체크 함수
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  // ✅ 인증코드 발송
  const sendCode = async () => {
    if (!isValidEmail(email)) {
      setError('올바른 이메일 형식을 입력해주세요.');
      return;
    }
    try {
      await axios.post('http://localhost:8000/users/send-code', { email });
      alert('인증코드가 이메일로 전송되었습니다! 5분 내로 입력해주세요.');
      setIsVerified(false);
      setError('');
    } catch (err) {
      setError('인증코드 전송 실패: ' + (err.response?.data?.detail || '오류'));
    }
  };

  // ✅ 인증코드 확인
  const verifyCode = async () => {
    try {
      await axios.post('http://localhost:8000/users/verify-code', {
        email,
        code: String(code)
      });
      alert('이메일 인증 성공!');
      setIsVerified(true);
      setError('');
    } catch (err) {
      setError('인증 실패: ' + (err.response?.data?.detail || '오류'));
    }
  };

  // ✅ 최종 제출
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isVerified) {
      setError('이메일 인증을 먼저 완료해주세요.');
      return;
    }

    try {
      if (mode === 'id') {
        const response = await axios.post('http://localhost:8000/users/find-id', {
          name,
          birth,
          email,
        });
        setResultMessage(`✔️ ${response.data.message}\nID: ${response.data.email}`);
      } else {
        const response = await axios.post('http://localhost:8000/users/reset-password', {
          email,
          code,
        });
        setResultMessage(`✔️ ${response.data.message}`);
      }
      setError('');
    } catch (err) {
      setError(err.response?.data?.detail || '요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="find-container">
        <h2 className="find-title">계정정보 찾기</h2>

        <div className="tab-buttons">
          <button className={mode === 'id' ? 'active' : ''} onClick={() => {
            setMode('id'); setResultMessage(''); setError('');
          }}>아이디 찾기</button>
          <button className={mode === 'password' ? 'active' : ''} onClick={() => {
            setMode('password'); setResultMessage(''); setError('');
          }}>비밀번호 찾기</button>
        </div>

        <div className="auth-form">
          <h3>{mode === 'id' ? '이메일 인증 후 아이디 확인' : '비밀번호 재설정'}</h3>
          <div className="form-line"></div>

          {error && <div className="error-message">{error}</div>}
          {resultMessage && <div className="success-message">{resultMessage}</div>}

          <form onSubmit={handleSubmit}>
            {mode === 'id' ? (
              <>
                <label>
                  이름*
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>

                <label>
                  생년월일*
                  <input type="date" value={birth} onChange={(e) => setBirth(e.target.value)} required />
                </label>

                <label>
                  이메일*
                  <div className="code-row">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <button type="button" className="small-btn" onClick={sendCode}>인증코드 발송</button>
                  </div>
                </label>

                <label>
                  인증코드 입력*
                  <div className="code-row">
                    <input type="text" value={code} onChange={(e) => setCode(e.target.value)} required />
                    <button type="button" className="small-btn" onClick={verifyCode}>확인</button>
                  </div>
                </label>
              </>
            ) : (
              <>
                <label>
                  아이디(이메일)*
                  <div className="code-row">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <button type="button" className="small-btn" onClick={sendCode}>인증코드 발송</button>
                  </div>
                </label>

                <label>
                  인증코드 입력*
                  <div className="code-row">
                    <input type="text" value={code} onChange={(e) => setCode(e.target.value)} required />
                    <button type="button" className="small-btn" onClick={verifyCode}>확인</button>
                  </div>
                </label>
              </>
            )}

            <div className="bottom-button">
              <button type="submit" className="main-action-btn">
                {mode === 'id' ? '아이디 찾기' : '비밀번호 재설정'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FindAccount;
