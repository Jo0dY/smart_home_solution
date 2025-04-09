import React, { useState } from 'react';
import './Find.css';

function FindAccount() {
  const [mode, setMode] = useState('id'); // 'id' 또는 'password'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'id') {
      alert('아이디 찾기 기능은 아직 구현되지 않았습니다.');
    } else {
      alert('비밀번호 재설정 기능은 아직 구현되지 않았습니다.');
    }
  };

  return (
    <div className="find-container">
      <h2 className="find-title">아이디/비밀번호 찾기</h2>

      {/* 탭 버튼 */}
      <div className="tab-buttons">
        <button
          className={mode === 'id' ? 'active' : ''}
          onClick={() => setMode('id')}
        >
          아이디 찾기
        </button>
        <button
          className={mode === 'password' ? 'active' : ''}
          onClick={() => setMode('password')}
        >
          비밀번호 찾기
        </button>
      </div>

      {/* 공통 폼 */}
      <form className="find-form" onSubmit={handleSubmit}>
        {mode === 'id' ? (
          <>
            <input type="text" placeholder="이름을 입력하세요" className="find-input" required />
            <input type="email" placeholder="이메일을 입력하세요" className="find-input" required />
          </>
        ) : (
          <>
            <input type="text" placeholder="아이디를 입력하세요" className="find-input" required />
            <input type="email" placeholder="이메일을 입력하세요" className="find-input" required />
          </>
        )}
        <button type="submit" className="find-button">
          {mode === 'id' ? '아이디 찾기' : '비밀번호 재설정'}
        </button>
      </form>
    </div>
  );
}

export default FindAccount;