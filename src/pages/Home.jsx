import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import ScrollFeature from './ScrollFeature';
import Navbar from './Navbar';

// 이미지
import buttonImg from '../assets/Button.png';
import flowerImg from '../assets/main_flower.png';
import jibomImg from '../assets/jibom_seat.png';
import walk1 from '../assets/jibom_wark1.png';
import walk2 from '../assets/jibom_wark2.png';

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
      {/* ✅ 공통 네비게이션 컴포넌트 사용 */}
      <Navbar />

      {/* 메인 콘텐츠 */}
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
            onClick={() => {
              navigate('/solution');
            }}
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

      {/* 스크롤 전용 콘텐츠 */}
      <div style={{ height: '9vh' }}></div>
      <ScrollFeature />
    </div>
  );
}

export default Home;
