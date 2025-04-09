import React, { useState, useEffect, useRef } from 'react';
import './ScrollFeature.css';

import infraImg from '../assets/infra.png';
import businessImg from '../assets/business.png';
import globalImg from '../assets/main_flower.png';
import jibomVulne from '../assets/jibom_vulne.png';
import jibomTraffic from '../assets/jibom_traffic.png';
import jibomDetec from '../assets/jibom_detec.png';
import jibomReport from '../assets/jibom_report.png';
import arrowRight from '../assets/Arrow right-circle.png';
import devicesImg from '../assets/devices.png';
import questionImg from '../assets/jibom_instruc.png';
import phoneImg from '../assets/jibom_useableproduct.png';
import umbImg from '../assets/jibom_umb_on.png';

const features = [
  {
    id: 1,
    title: '스마트 IoT 기기 시장의 성장',
    description: '스마트 IoT 기기가 성장하면서 IoT 기기의 위협이 증가하고 있다.',
    image: infraImg,
    label: '스마트 IoT 기기 시장의 성장',
  },
  {
    id: 2,
    title: '보안 사각지대를 위한 우산',
    description: '우리의 IoT 기기가 위협으로부터 안전하도록 지켜,봄이 당신의 우산같은 솔루션이 되어드립니다.',
    image: businessImg,
    label: '보안 사각지대를 위한 우산',
  },
  {
    id: 3,
    title: '모두를 위한 보안 솔루션',
    description: '모두가 쉽고, 간편하게 내 IoT기기를 지켜낼 수 있도록 모두를 위한 솔루션이 되어드립니다.',
    image: globalImg,
    label: '모두를 위한 솔루션',
  },
];

function ScrollFeature() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const isThrottling = useRef(false);

  useEffect(() => {
    const handleWheel = (e) => {
      if (isThrottling.current) return;

      isThrottling.current = true;
      setTimeout(() => {
        isThrottling.current = false;
      }, 700);

      if (e.deltaY > 0) {
        setActiveIndex((prev) => Math.min(features.length - 1, prev + 1));
      } else {
        setActiveIndex((prev) => Math.max(0, prev - 1));
      }
    };

    const container = containerRef.current;
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className="scroll-feature-outer-wrapper" ref={containerRef}>
      <div className="scroll-feature-wrapper">
        <div className="scroll-sticky-container">
          <div className="circle-zone">
            <div
              className="circle-ring"
              style={{ transform: `rotate(-${activeIndex * 120}deg)` }}
            >
              {features.map((f, i) => (
                <div
                  key={i}
                  className={`circle-dot ${i === activeIndex ? 'active' : ''}`}
                  style={{
                    transform: `rotate(${(360 / features.length) * i}deg) translate(260px)`
                  }}
                >
                  <div
                    className={`circle-marker ${i === activeIndex ? 'active' : 'inactive'}`}
                  ></div>
                </div>
              ))}
              <img
                src={features[activeIndex].image}
                alt={features[activeIndex].title}
                className="circle-image-direct"
                style={{ transform: `translate(-50%, -50%) rotate(${activeIndex * 120}deg)` }}

              />
            </div>
          </div>

          <div className="feature-text-area">
            <h3>{String(features[activeIndex].id).padStart(2, '0')}</h3>
            <h2>{features[activeIndex].title}</h2>
            <p>{features[activeIndex].description}</p>
          </div>
        </div>
      </div>

      {/* ✅ 하단 실제 콘텐츠 추가 */}
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
                <li>스마트 카메라</li>
                <li>스마트 도어락</li>
                <li>스마트 조명 스위치</li>
                <li>AI 스피커</li>
                <li>센서 모듈</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="jibom-explain-section fade-in">
  <div className="jibom-card">
    <img src={questionImg} alt="지봄이 질문" className="jibom-icon" />
    <div className="jibom-text-group">
      <h3>우리집에는 IoT기기가 많은데, 과연 안전할걸까?</h3>
      <p>💬 스마트 IoT기기가 집에 많은데, 안전한 관리가 필요하신 분</p>
      <p>💬 데일리한 관리를 통해 안전한 스마트홈 환경을 유지하고 싶으신 분</p>
    </div>
  </div>

  <div className="jibom-card">
    <img src={phoneImg} alt="지봄이 휴대폰" className="jibom-icon" />
    <div className="jibom-text-group">
      <h3>우리 사업장에서 IoT기기를 사용하는데, 안전할걸까?</h3>
      <p>💬 사업장에 IoT기기를 많이 사용하지만, 솔루션을 이용하긴 부담스러우신 분</p>
      <p>💬 쉽고, 편하지만, 안전하게 내 사업장 IoT기기를 관리하고 싶으신 분</p>
    </div>
  </div>

  <div className="jibom-card">
    <img src={umbImg} alt="지봄이 우산" className="jibom-icon" />
    <div className="jibom-text-group">
      <h3>내 IoT기기의 안전을 걱정하지만, 관리 방법을 모르는 누구나</h3>
      <p>💬 보안솔루션이 어렵고, 비쌀 것이라 생각하여 망설이는 누구나</p>
      <p>💬 안전한 스마트 IoT 기기 관리를 원하는 누구나</p>
    </div>
  </div>
</section>

    </div>
  );
}

export default ScrollFeature;

