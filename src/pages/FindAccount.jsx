import React, { useState } from 'react';
import axios from 'axios';
import './Find.css';
import Navbar from './Navbar';

function FindAccount() {
  const [mode, setMode] = useState('id');

  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  // ✅ 인증코드 발송 함수
  const sendCode = async () => {
    try {
      await axios.post('http://localhost:8000/users/send-code', { email });
      alert('인증코드가 이메일로 전송되었습니다!');
    } catch (err) {
      alert('인증코드 전송 실패: ' + (err.response?.data?.detail || '오류'));
    }
  };

  // ✅ 인증코드 확인 함수
  const verifyCode = async () => {
    try {
      await axios.post('http://localhost:8000/users/verify-code', {
        email,
        code: String(code)
      });
      alert('이메일 인증 성공!');
    } catch (err) {
      alert('인증 실패: ' + (err.response?.data?.detail || '오류'));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (mode === 'id') {
        const response = await axios.post('http://localhost:8000/users/find-id', {
          name,
          birth,
          email,
        });
        alert('서버 응답: ' + response.data.message);
      } else {
        const response = await axios.post('http://localhost:8000/users/reset-password', {
          email,
          code,
        });
        alert('서버 응답: ' + response.data.message);
      }
    } catch (err) {
      console.error('요청 실패:', err.response?.data);
      alert(err.response?.data?.detail || '요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="find-container">
        <h2 className="find-title">계정정보 찾기</h2>

        <div className="tab-buttons">
          <button className={mode === 'id' ? 'active' : ''} onClick={() => setMode('id')}>아이디 찾기</button>
          <button className={mode === 'password' ? 'active' : ''} onClick={() => setMode('password')}>비밀번호 찾기</button>
        </div>

        <div className="auth-form">
          <h3>{mode === 'id' ? '이메일 인증' : '비밀번호 재설정'}</h3>
          <div className="form-line"></div>

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
                    <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
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
                    <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
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