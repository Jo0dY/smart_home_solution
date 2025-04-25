import React, { useState } from 'react';
import axios from '../lib/axios';import './Find.css';
import Navbar from './Navbar';

function FindAccount() {
  const [mode, setMode] = useState('id');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [birthValid, setBirthValid] = useState(null);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [error, setError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&~^+=-])[A-Za-z\d@$!%*#?&~^+=-]{8,16}$/;
  const [passwordValid, setPasswordValid] = useState(null);


  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const sendCode = async () => {
    if (!isValidEmail(email)) {
      setError('올바른 이메일 형식을 입력해주세요.');
      return;
    }
    try {
      await axios.post('http://localhost:8000/api/v1/users/send-code', { email });
      alert('인증코드가 이메일로 전송되었습니다! 5분 내로 입력해주세요.');
      setIsVerified(false);
      setError('');
    } catch (err) {
      setError('인증코드 전송 실패: ' + (err.response?.data?.detail || '오류'));
    }
  };

  const handleBirthChange = (e) => {
    const value = e.target.value;
    setBirth(value);
    const birthRegex = /^\d{4}-\d{2}-\d{2}$/;
    setBirthValid(birthRegex.test(value));
  };
  

  const verifyCode = async () => {
    try {
      await axios.post('http://localhost:8000/api/v1/users/verify-code', {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isVerified) {
      setError('이메일 인증을 먼저 완료해주세요.');
      return;
    }

    try {
      if (mode === 'id') {
        const response = await axios.post('http://localhost:8000/api/v1/users/find-id', {
          name,
          birth,
          email,
        });
        setResultMessage(`✔️ ${response.data.message}\nID: ${response.data.email}`);
      } else {
        if (newPassword !== confirmPassword) {
          setError('비밀번호가 일치하지 않습니다.');
          return;
        }

        // 이메일 인증 여부 + 사용자 존재 확인
        await axios.post('http://localhost:8000/api/v1/users/reset-password', {
          email,
          code,
        });

        // 비밀번호 업데이트
        await axios.put('http://localhost:8000/api/v1/users/update-password', {
          email,
          new_password: newPassword,
        });

        setResultMessage('✔️ 비밀번호가 성공적으로 재설정되었습니다.');
        setNewPassword('');
        setConfirmPassword('');
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
          <button className={mode === 'password' ? 'active' : ''} 
          onClick={() => {
            setMode('password');
            setResultMessage('');
            setError('');
            setIsVerified(false);  // ✅ 인증 초기화!
            setNewPassword('');    // ✅ 혹시 기존 비번 값도 리셋
            setConfirmPassword('');
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
                  이름
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>

                <label>
                  생년월일
                  <input type="text" value={birth} onChange={(e) => setBirth(e.target.value)} placeholder="예) 2000-01-01" required />
                  {birthValid === false && (<p className="warn-text">※ 생년월일은 YYYY-MM-DD 형식으로 입력해주세요.</p>)}
                </label>

                <label>
                  이메일
                  <div className={`code-row ${isVerified ? 'verified' : ''}`}>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <button type="button" className="small-btn" onClick={sendCode}>인증코드 발송</button>
                  </div>
                </label>

                <label>
                  인증코드 입력
                  <div className={`code-row ${isVerified ? 'verified' : ''}`}>
                    <input type="text" value={code} onChange={(e) => setCode(e.target.value)} required />
                    <button type="button" className="small-btn" onClick={verifyCode}>확인</button>
                  </div>
                </label>
              </>
            ) : (
              <>
                <label>
                  아이디(이메일)
                  <div className="code-row">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <button type="button" className="small-btn" onClick={sendCode}>인증코드 발송</button>
                  </div>
                </label>

                <label>
                  인증코드 입력
                  <div className={`code-row ${isVerified ? 'verified' : ''}`}>
                    <input type="text" value={code} onChange={(e) => setCode(e.target.value)} required />
                    <button type="button" className="small-btn" onClick={verifyCode}>확인</button>
                  </div>
                </label>

                {isVerified && (
                  <>
                    <label>
                      새 비밀번호
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => {
                          const value = e.target.value;
                          setNewPassword(value);
                          setPasswordValid(passwordRegex.test(value));
                        }}
                        required
                      />
                      {passwordValid === false && (
                          <p className="warn-text">※ 영문, 숫자, 특수문자 포함 8~16자리</p>
                      )}                                             
                    </label>
                    <label>
                      비밀번호 확인
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </label>
                  </>
                )}
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