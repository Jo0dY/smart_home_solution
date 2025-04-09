import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import ScrollFeature from './ScrollFeature';


import logoImg from '../assets/logo.png';
import buttonImg from '../assets/Button.png';
import flowerImg from '../assets/main_flower.png';
import jibomImg from '../assets/jibom_seat.png';
import walk1 from '../assets/jibom_wark1.png';
import walk2 from '../assets/jibom_wark2.png';
import jibomVulne from '../assets/jibom_vulne.png';
import jibomTraffic from '../assets/jibom_traffic.png';
import jibomDetec from '../assets/jibom_detec.png';
import jibomReport from '../assets/jibom_report.png';
import arrowRight from '../assets/Arrow right-circle.png';
import devicesImg from '../assets/devices.png';


function Home() {
  const [jibomState, setJibomState] = useState('walk1');
  const [jibomLeft, setJibomLeft] = useState(1280);
  const [jibomDone, setJibomDone] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (jibomDone) return;
    let step = 0;
    const interval = setInterval(() => {
      setJibomLeft((prevLeft) => {
        if (prevLeft <= 1060) {
          clearInterval(interval);
          setJibomDone(true);
          return 1060;
        }
        return prevLeft - 7;
      });
      step++;
      if (step % 2 === 0) {
        setJibomState((prev) => (prev === 'walk1' ? 'walk2' : 'walk1'));
      }
    }, 150);
    return () => clearInterval(interval);
  }, [jibomDone]);

  return (
    <div className="home-container">
      {/* ========== 상단 네비게이션 ========== */}
      <nav className="navbar">
        <div className="logo">
          <img src={logoImg} alt="지켜_봄 로고" className="logo-img" />
        </div>
        <div className="nav-center">
          <ul className="nav-links">
            <li><Link to="/">홈</Link></li>
            <li><Link to="/solution">솔루션 기능</Link></li>
            <li><Link to="/notice">공지사항</Link></li>
            <li><Link to="/contact">문의사항</Link></li>
            <li><Link to="/privacy">개인정보 보호</Link></li>
          </ul>
        </div>
        <ul className="auth-group">
          <li className="login-link"><Link to="/login">로그인</Link></li>
          <li>
            <Link to="/signup">
              <button className="signup-btn">회원가입</button>
            </Link>
          </li>
        </ul>
      </nav>

      {/* ========== 메인 인트로 ========== */}
      <main className="main-content">
        <div className="main-left">
          <h1>
            지켜, 봄 보안 솔루션은<br />
            <span className="highlight">봄처럼 따듯한</span> 솔루션을 <br />
            제공합니다.
          </h1>
          <img
            src={buttonImg}
            alt="지켜,봄 시작하기 버튼"
            className="start-button"
            onClick={() => navigate('/login')}
          />
        </div>
        <div className="main-right">
          <div className="flower-wrapper">
            <img src={flowerImg} alt="꽃 이미지" className="flower-img" />
          </div>
          <div
            className="jibom-wrapper"
            style={{
              position: 'absolute',
              left: `${jibomLeft}px`,
              top: '765px',
              transition: 'left 0.2s ease-in-out',
            }}
          >
            <img
              src={jibomDone ? jibomImg : jibomState === 'walk1' ? walk1 : walk2}
              alt="지봄이 걷기"
              className="jibom-img"
            />
          </div>
        </div>
      </main>

      {/* ========== 스크롤 전환 섹션 ========== */}
      <div style={{ height: '23vh' }}></div>  

      <ScrollFeature />  
      <div style={{ height: '400vh' }}></div>  

      </div>
  );
}
{/* ====== 기능 소개 Section ====== */}
      <section id="function-img" className="solution-feature-section">
        <div className="feature-card">
          <h3>취약점 분석</h3>
          <img src={jibomVulne} alt="취약점 분석" className="feature-img" />
          <img src={arrowRight} alt="화살표" className="arrow-icon" />
        </div>
        <div className="feature-card">
          <h3>네트워크 트래픽 감시</h3>
          <img src={jibomTraffic} alt="트래픽 감시" className="feature-img" />
          <img src={arrowRight} alt="화살표" className="arrow-icon" />
        </div>
        <div className="feature-card">
          <h3>AI 실시간 이상탐지</h3>
          <img src={jibomDetec} alt="AI 이상탐지" className="feature-img" />
          <img src={arrowRight} alt="화살표" className="arrow-icon" />
        </div>
        <div className="feature-card">
          <h3>보안 리포트 확인</h3>
          <img src={jibomReport} alt="보안 리포트" className="feature-img" />
          <img src={arrowRight} alt="화살표" className="arrow-icon" />
        </div>
      </section>

      {/* ====== 사용 가능 기기 Section ====== */}
      <section className="detail-image-section" id="devices-img">
        <div className="device-section">
          <div className="device-img-wrapper">
            <img
              src={devicesImg}
              alt="사용 가능 기기 이미지"
              className="device-img"
            />
            <div className="device-list">
              <h2>사용 가능 기기</h2>
              <ul>
                <li> 스마트 카메라</li>
                <li> 스마트 도어락</li>
                <li> 스마트 조명 스위치</li>
                <li> AI 스피커</li>
                <li> 센서 모듈</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
export default Home;
