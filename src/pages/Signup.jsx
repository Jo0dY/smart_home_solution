import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ 이 줄 추가!
import './Signup.css';
function SignupPage() {
  
    const [memberType, setMemberType] = useState('company');
    const navigate = useNavigate(); // ✅ 선언
  
    const handleTabClick = (type) => {
      setMemberType(type);
    };
  
    return (
      <div className="register-container">
        <h1 className="register-title">회원가입</h1>
  
        <div className="tab-buttons">
          <button
            className={memberType === 'company' ? 'active' : ''}
            onClick={() => handleTabClick('company')}
          >
            기업회원
          </button>
          <button
            className={memberType === 'personal' ? 'active' : ''}
            onClick={() => handleTabClick('personal')}
          >
            개인회원
          </button>
        </div>
  
        <form className="register-form">
          {/* 이메일 인증 */}
          <div className="form-group">
            <label>아이디*</label>
            <div className="form-row">
              <input type="email" placeholder="이메일을 입력해 주세요." required />
              <button className="btn-sub">인증코드 발송</button>
            </div>
            <div className="form-row">
              <input type="text" placeholder="인증코드 입력" required />
              <button className="btn-sub">인증하기</button>
            </div>
          </div>
  
          {/* 휴대전화번호 */}
          <div className="form-group">
            <label>휴대전화번호*</label>
            <div className="phone-inputs">
              <select required>
                <option value="">선택</option>
                <option>010</option>
                <option>011</option>
              </select>
              <input type="text" />
              <input type="text" />
            </div>
          </div>
  
          {/* 이름, 비밀번호 */}
          <div className="form-group">
            <label>이름*</label>
            <input type="text" placeholder="이름을 입력해 주세요." required />
          </div>
  
          <div className="form-group">
            <label>비밀번호*</label>
            <input type="password" placeholder="비밀번호 (영문, 숫자, 특수문자 조합 8~16자리)" required />
          </div>
  
          <div className="form-group">
            <label>비밀번호확인*</label>
            <input type="password" placeholder="동일한 비밀번호 입력" required />
          </div>
  
          {/* 개인회원: 생년월일 + 만14세 */}
          {memberType === 'personal' && (
            <div className="form-group">
              <label>생년월일*</label>
              <div className="form-row">
                <input type="date" required />
              </div>
              <div className="minor-check">
                <div className="minor-left">
                  <input type="checkbox" id="under14" />
                  <label htmlFor="under14">만14세 미만 회원</label>
                </div>
                <button className="btn-sub">법정대리인 동의하기</button>
              </div>
            </div>
          )}
  
          {/* 기업회원: 회사명, 사업자등록번호 */}
          {memberType === 'company' && (
            <>
              <div className="form-group">
                <label>회사명*</label>
                <input type="text" placeholder="회사명을 입력해 주세요." required />
              </div>
  
              <div className="form-group">
                <label>사업자등록번호*</label>
                <div className="biznum-inputs">
                  <input type="text" />
                  <span>-</span>
                  <input type="text" />
                  <span>-</span>
                  <input type="text" />
                  <button className="btn-sub">사업자등록번호 조회</button>
                </div>
              </div>
            </>
          )}
  
          {/* 약관 보기 버튼 */}
          <div className="form-group">
            <div className="policy-buttons-inline">
              <button
                type="button"
                className="policy-text-btn"
                onClick={() => navigate('/policy')} // ✅ 개인정보처리방침 페이지로 이동
              >
                개인정보처리방침 전체 보기
              </button>
              <button
                type="button"
                className="policy-text-btn"
                onClick={() => navigate('/terms')} // ✅ 서비스이용약관 페이지로 이동
              >
                서비스이용약관 전체 보기
              </button>
            </div>
          </div>
  
          <button type="submit" className="register-submit">회원가입</button>
        </form>
      </div>
    );
  }
  

export default SignupPage;
