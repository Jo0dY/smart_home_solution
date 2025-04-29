import React, { useState } from 'react';
import './ParentPhoneAuth.css';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";  // ✅ getAuth 가져옴
import { auth } from '../lib/firebase';  // ✅ 기존 auth import

auth.useDeviceLanguage();

function ParentPhoneAuth({ onVerified }) {
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [code, setCode] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const setupRecaptcha = async () => {
    if (!window.recaptchaVerifier) {
      await window.grecaptchaReady; // ✅ grecaptcha 준비 기다림

      const authInstance = getAuth();  // ✅ 현재 auth 인스턴스 가져오기

      window.recaptchaVerifier = new RecaptchaVerifier(
        authInstance,                 // ✅ 첫 번째 인자: auth
        'recaptcha-container',         // ✅ 두 번째 인자: div id
        {
          size: 'invisible',
          callback: (response) => {
            console.log('reCAPTCHA solved');
          },
          'expired-callback': () => {
            console.warn('reCAPTCHA expired');
          }
        }
      );
      await window.recaptchaVerifier.render();  // ✅ 반드시 render 호출
    }
  };

  const handleSendCode = async () => {
    setError('');
    if (!parentPhone.startsWith('+82')) {
      return setError('전화번호는 국제번호 형식으로 입력해야 합니다. 예: +821012345678');
    }
    try {
      await setupRecaptcha();  // ✅ 먼저 reCAPTCHA 준비
      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, parentPhone, appVerifier);
      window.confirmationResult = confirmation;
      setIsSent(true);
      alert('인증코드가 전송되었습니다.');
    } catch (err) {
      console.error('인증코드 전송 실패:', err);
      setError('인증코드 전송 실패: ' + err.message);
    }
  };

  const handleVerifyCode = async () => {
    try {
      await window.confirmationResult.confirm(code);
      alert('전화번호 인증 성공!');
      if (onVerified) {
        onVerified(parentName, parentPhone);
      }
    } catch (err) {
      setError('인증 실패: ' + err.message);
    }
  };

  return (
    <div className="parent-auth-box">
      <h4>법정대리인 정보</h4>

      <div className="form-group">
        <label>보호자 성함</label>
        <input
          type="text"
          value={parentName}
          onChange={(e) => setParentName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>보호자 휴대전화 (예: +821012345678)</label>
        <input
          type="tel"
          value={parentPhone}
          onChange={(e) => setParentPhone(e.target.value)}
          required
        />
        <button type="button" onClick={handleSendCode}>
          인증코드 발송
        </button>
      </div>

      {isSent && (
        <div className="form-group">
          <label>인증코드 입력</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button type="button" onClick={handleVerifyCode}>
            확인
          </button>
        </div>
      )}

      {error && <p className="warn-text">{error}</p>}

      <div id="recaptcha-container"></div> {/* ✅ recaptcha div */}
    </div>
  );
}

export default ParentPhoneAuth;