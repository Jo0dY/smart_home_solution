import React from 'react';
import { useNavigate } from 'react-router-dom';  // ✅ 페이지 이동용
import './Solution.css';
import Navbar from './Navbar';

function Solution() {
  const navigate = useNavigate();  // ✅ 내비게이션 함수 선언

  return (
    <div className="solution-page">
      <Navbar />

      {/* 01-1. 취약점 분석 개요 */}
      <section className="solution-section bg-section">
        <div className="content">
          <h1>취약점 분석</h1>
          <p>
            연결된 IoT 기기의 포트, 펌웨어, 설정을 분석하여<br />
            보안상 취약한 지점을 자동으로 탐지합니다.<br />
            알려진 취약점(CVE) DB와 대조하여 위협도 점수까지 제공합니다.
          </p>

          <div className="action-buttons">
            <button className="primary" onClick={() => navigate('/login')}>
              바로 시작하기
            </button>
            <button className="secondary" onClick={() => navigate('/contact')}>
              문의하기
            </button>
          </div>
        </div>
      </section>

      {/* 01-2. 기능 설명 */}
      <section className="section white-section">
        <div className="plain-content">
          <h2>보안의 시작, 취약점을 향한 첫걸음</h2>

          <div className="feature-row">
            <div className="feature-title">포트/펌웨어/설정 자동 분석</div>
            <div className="feature-desc">
              연결된 IoT 기기의 포트, 펌웨어 버전, 설정값 등을 자동으로 수집 및 분석하여
              보안상 취약한 지점을 빠르게 식별합니다.
            </div>
          </div>

          <div className="feature-row">
            <div className="feature-title">CVE DB 기반 취약점 매칭</div>
            <div className="feature-desc">
              수집된 정보는 최신 CVE 데이터베이스와 대조되어 알려진 취약점을 식별하고,
              위협 수준을 자동 평가합니다.
            </div>
          </div>

          <div className="feature-row">
            <div className="feature-title">위험도 점수화 및 리포트 제공</div>
            <div className="feature-desc">
              탐지된 취약점은 위험도에 따라 점수화되며, 시각화된 리포트로 사용자에게
              조치 우선순위를 안내합니다.
            </div>
          </div>
        </div>
      </section>

      {/* 01-3. 구성도 */}
      <section className="vuln-structure-section">
        <div className="vuln-grid">
          <div className="vuln-text">
            <h2>지켜, 봄의 취약점 분석</h2>
            <p>
              연결된 IoT 기기의 포트, 펌웨어, 설정 정보를 수집하고,<br />
              최신 CVE 취약점 데이터베이스와 자동 매칭하여<br />
              위험 요소를 분석하고 점수화하는 취약점 진단 기능입니다.<br />
              보안상 취약한 지점을 조기에 발견하고 리포트를 통해<br />
              사용자에게 직관적으로 안내합니다.
            </p>
          </div>
          <div className="vuln-image">
            <img src="/images/vuln-diagram.png" alt="취약점 분석 구성도" />
          </div>
        </div>
      </section>

      {/* 02-1. AI 실시간 이상 탐지 */}
      <section className="solution-section bg-section">
        <div className="content">
          <h1>AI 실시간 이상 탐지</h1>
          <p>
            네트워크 트래픽 흐름을 AI 모델로 학습하고,<br />
            정상과 다른 이상 행위를 탐지합니다.<br />
            실시간 경고 시스템으로 미탐지 위협에 빠르게 대응할 수 있습니다.
          </p>

          <div className="action-buttons">
            <button className="primary" onClick={() => navigate('/login')}>
              바로 시작하기
            </button>
            <button className="secondary" onClick={() => navigate('/contact')}>
              문의하기
            </button>
          </div>
        </div>
      </section>

      {/* 02-2. AI 기능 설명 */}
      <section className="section white-section">
        <div className="plain-content">
          <h2>보이지 않는 이상 징후를 실시간으로 포착하다</h2>

          <div className="feature-row">
            <div className="feature-title">정상 트래픽 패턴 학습</div>
            <div className="feature-desc">
              네트워크 환경에서 발생하는 평상시 트래픽 데이터를 수집하고,<br />
              AI 모델이 스스로 정상 동작 패턴을 학습합니다.
            </div>
          </div>

          <div className="feature-row">
            <div className="feature-title">비정상 행위 자동 감지</div>
            <div className="feature-desc">
              평상시 패턴과 다른 트래픽 흐름을 실시간으로 탐지하며,<br />
              오탐률을 줄이기 위한 고도화된 필터링 로직을 적용합니다.
            </div>
          </div>

          <div className="feature-row">
            <div className="feature-title">관리자 알림 및 대응 연동</div>
            <div className="feature-desc">
              이상 탐지 시 관리자에게 즉시 경고 메시지를 전송하고,<br />
              자동 대응 스크립트나 알림 시스템과 연동이 가능합니다.
            </div>
          </div>
        </div>
      </section>

      {/* 02-3. 구성도 */}
      <section className="vuln-structure-section">
        <div className="vuln-grid">
          <div className="vuln-text">
            <h2>지켜, 봄의 AI 실시간 이상 탐지</h2>
            <p>
              네트워크에서 발생하는 트래픽 데이터를 기반으로,<br />
              AI 모델이 정상 패턴을 스스로 학습하고 이상 징후를 탐지합니다.<br />
              평상시와 다른 흐름이 감지되면 실시간 경고가 발송되며,<br />
              관리자 알림 및 자동 대응 연동을 통해 빠르게 위협에 대응할 수 있습니다.
            </p>
          </div>
          <div className="vuln-image">
            <img src="/images/ai-diagram.png" alt="AI 실시간 이상 탐지 구성도" />
          </div>
        </div>
      </section>

      {/* 03-1. 보안 리포트 개요 */}
      <section className="solution-section bg-section">
        <div className="content">
          <h1>보안 리포트 확인</h1>
          <p>
            점검 결과와 탐지된 이상 트래픽 이력을 통합하여<br />
            리포트 형식으로 제공합니다.<br />
            보안 수준을 한눈에 파악하고, 개선이 필요한 지점을 명확히 확인할 수 있습니다.
          </p>

          <div className="action-buttons">
            <button className="primary" onClick={() => navigate('/login')}>
              바로 시작하기
            </button>
            <button className="secondary" onClick={() => navigate('/contact')}>
              문의하기
            </button>
          </div>
        </div>
      </section>

      {/* 03-2. 리포트 기능 설명 */}
      <section className="section white-section">
        <div className="plain-content">
          <h2>보안의 흐름을 기록하고, 인사이트를 제공하다</h2>

          <div className="feature-row">
            <div className="feature-title">통합 리포트 제공</div>
            <div className="feature-desc">
              취약점 분석 결과와 AI 이상 탐지 이력을 통합하여
              한눈에 확인 가능한 보안 리포트를 생성합니다.
            </div>
          </div>

          <div className="feature-row">
            <div className="feature-title">위험도 추이 및 통계</div>
            <div className="feature-desc">
              기간별 위협 수준, 발생 빈도, 대응 현황 등을 시각화하여
              시간 흐름에 따른 보안 상태를 직관적으로 파악할 수 있습니다.
            </div>
          </div>

          <div className="feature-row">
            <div className="feature-title">사용자 맞춤 PDF 출력</div>
            <div className="feature-desc">
              관리자가 원하는 항목만 선택하여 리포트를 PDF로 저장하거나,
              외부 보고용 문서로도 손쉽게 활용할 수 있습니다.
            </div>
          </div>
        </div>
      </section>

      {/* 03-3. 구성도 */}
      <section className="vuln-structure-section">
        <div className="vuln-grid">
          <div className="vuln-text">
            <h2>지켜, 봄의 보안 리포트</h2>
            <p>
              취약점 분석 결과와 AI 이상 탐지 이력을 통합하여<br />
              사용자에게 한눈에 보이는 리포트를 제공합니다.<br />
              위험도 추이, 발생 빈도, 대응 현황을 시각화하고<br />
              맞춤형 PDF로 출력할 수 있어 외부 보고서로도 손쉽게 활용할 수 있습니다.
            </p>
          </div>
          <div className="vuln-image">
            <img src="/images/report-diagram.png" alt="보안 리포트 구성도" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Solution;
