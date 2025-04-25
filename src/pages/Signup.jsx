import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../lib/axios';
import './Signup.css';
import Navbar from './Navbar';

function SignupPage() {
  const [memberType, setMemberType] = useState('company');
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(null);
  const [passwordsMatch, setPasswordsMatch] = useState(null);
  const [name, setName] = useState('');
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [phone3, setPhone3] = useState('');
  const [carrier, setCarrier] = useState('');
  const [birth, setBirth] = useState('');
  const [under14, setUnder14] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [biz1, setBiz1] = useState('');
  const [biz2, setBiz2] = useState('');
  const [biz3, setBiz3] = useState('');

  useEffect(() => {
    if (memberType === 'personal' && birth) {
      const today = new Date();
      const birthDate = new Date(birth);
      const age = today.getFullYear() - birthDate.getFullYear();
      const isMinor =
        age < 14 || (age === 14 && today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate()));
  
      setUnder14(isMinor);
    }
  }, [birth, memberType]);
  

  const handleTabClick = (type) => setMemberType(type);

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&~^+=-])[A-Za-z\d@$!%*#?&~^+=-]{8,16}$/;

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordValid(passwordRegex.test(value));
    setPasswordsMatch(value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordsMatch(password === value);
  };

  const handleSendCode = async () => {
    try {
      await axios.post('http://localhost:8000/api/v1/users/send-code', { email: email.trim() });
      alert('인증코드가 전송되었습니다.');
    } catch (err) {
      alert('인증코드 발송 실패: ' + (err.response?.data?.detail || '오류 발생'));
    }
  };

  const handleVerifyCode = async () => {
    try {
      await axios.post('http://localhost:8000/api/v1/users/verify-code', {
        email: email.trim(),
        code: authCode.trim(),
      });
      setEmailVerified(true);
      alert('이메일 인증 성공!');
    } catch (err) {
      alert('인증 실패: ' + (err.response?.data?.detail || '오류 발생'));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailVerified) return alert('이메일 인증이 필요합니다.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return alert('유효한 이메일 형식이 아닙니다.');
    if (!passwordRegex.test(password)) return alert('비밀번호는 8~16자, 영문/숫자/특수문자를 포함해야 합니다.');
    if (password !== confirmPassword) return alert('비밀번호가 일치하지 않습니다.');

    const phone = `${phone1}-${phone2}-${phone3}`;
    const business_number = `${biz1}-${biz2}-${biz3}`;

    const formData = {
      member_type: memberType === 'company' ? '개인사업자' : '개인회원',
      email: email.trim(),
      password,
      name: name.trim(),
      phone,
      carrier,
      birth: memberType === 'personal' ? birth : null,
      under14: memberType === 'personal' ? under14 : false,
      company_name: memberType === 'company' ? companyName : '',
      business_number: memberType === 'company' ? business_number : '',
    };

    try {
      await axios.post('http://localhost:8000/api/v1/users/signup', formData);
      alert('회원가입 완료!');
      navigate('/login');
    } catch (err) {
      console.error('회원가입 실패:', err.response?.data);
      alert(err.response?.data?.detail || '회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="register-container">
        <h1 className="register-title">회원가입</h1>
        <div className="tab-buttons">
          <button className={memberType === 'company' ? 'active' : ''} onClick={() => handleTabClick('company')}>기업회원</button>
          <button className={memberType === 'personal' ? 'active' : ''} onClick={() => handleTabClick('personal')}>개인회원</button>
        </div>

        <form className="register-form" onSubmit={handleSubmit} autoComplete="off">
          {/* 이메일 인증 */}
          <div className="form-group">
            <label>아이디</label>
            <div className="form-row">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일 입력" required />
              <button type="button" className="btn-sub" onClick={handleSendCode}>인증코드 발송</button>
            </div>
            <div className={`form-row ${emailVerified ? 'verified-input' : ''}`}>
              <input type="text" value={authCode} onChange={(e) => setAuthCode(e.target.value)} placeholder="인증코드 입력" disabled={emailVerified} />
              <button type="button" className="btn-sub" onClick={handleVerifyCode} disabled={emailVerified}>
                {emailVerified ? '✔ 인증완료' : '인증하기'}
              </button>
            </div>
          </div>

          {/* 전화번호 */}
          <div className="form-group">
            <label>휴대전화번호</label>
            <div className="tel-combo-row">
              <select value={carrier} onChange={(e) => setCarrier(e.target.value)} required>
                <option value="">통신사</option>
                <option value="SKT">SKT</option>
                <option value="KT">KT</option>
                <option value="LG U+">LG U+</option>
                <option value="알뜰폰(SKT)">알뜰폰(SKT)</option>
                <option value="알뜰폰(KT)">알뜰폰(KT)</option>
                <option value="알뜰폰(LG U+)">알뜰폰(LG U+)</option>
              </select>
              
              <select value={phone1} onChange={(e) => setPhone1(e.target.value)} required>
                <option value="">선택</option>
                <option>010</option>
              </select>
              <input type="text" value={phone2} onChange={(e) => setPhone2(e.target.value)} required />
              <input type="text" value={phone3} onChange={(e) => setPhone3(e.target.value)} required />
            </div>
          </div>

          {/* 이름 */}
          <div className="form-group">
            <label>이름</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          {/* 비밀번호 */}
          <div className="form-group">
            <label>비밀번호</label>
            <input type="password" value={password} onChange={handlePasswordChange} required />
            {passwordValid === false && <p className="warn-text">※ 영문, 숫자, 특수문자 포함 8~16자리</p>}
          </div>
          <div className="form-group">
            <label>비밀번호 확인</label>
            <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
            {passwordsMatch === false && <p className="warn-text">※ 비밀번호가 일치하지 않습니다.</p>}
          </div>

          {/* 개인용 or 기업용 */}
          {memberType === 'personal' && (
            <div className="form-group">
              <label>생년월일</label>
              <input type="text" value={birth} onChange={(e) => setBirth(e.target.value)} placeholder='예) 2000-01-01'required />
              <div className="minor-check">
                <div className="minor-left">
                  <input type="checkbox" id="under14" checked={under14} onChange={(e) => setUnder14(e.target.checked)} />
                  <label htmlFor="under14">만14세 미만 회원</label>
                </div>
                <button className="btn-sub" type="button">법정대리인 동의</button>
              </div>
            </div>
          )}

          {memberType === 'company' && (
            <>
              <div className="form-group">
                <label>회사명</label>
                <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>사업자등록번호</label>
                <div className="biznum-inputs">
                  <input type="text" value={biz1} onChange={(e) => setBiz1(e.target.value)} required />
                  <span>-</span>
                  <input type="text" value={biz2} onChange={(e) => setBiz2(e.target.value)} required />
                  <span>-</span>
                  <input type="text" value={biz3} onChange={(e) => setBiz3(e.target.value)} required />
                  <button className="btn-sub" type="button">조회</button>
                </div>
              </div>
            </>
          )}

          <button type="submit" className="register-submit">회원가입</button>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;