import React from 'react';
import './InstallGuide.css';
import Navbar from './Navbar';

function InstallGuide() {
  return (
    <>
      <Navbar />
      <div className="page-content"> {/* ✅ 추가: 전체 콘텐츠 정렬용 */}
        <div className="install-guide-container">
          <h1>🌱지켜,봄 설치 가이드🌱</h1>
          <p>지켜, 봄 보안 솔루션의 전체 기능을 사용하기 위해 프로그램 설치가 필요합니다.</p>

          <div className="install-section">
            {/* <img src={downloadIcon} alt="다운로드 아이콘" className="install-icon" /> */}
            <div className="install-icon-placeholder"></div> {/* 임시 아이콘 영역 */}
            <a
              href="/downloads/smart_home_setup.exe"
              download
              className="install-btn"
            >
              설치 프로그램 다운로드
            </a>
          </div>

          <div className="install-instruction">
            <h3>설치 방법 안내</h3>
            <ol>
              <li>위 버튼을 눌러 설치 프로그램을 다운로드합니다.</li>
              <li>다운로드한 파일을 실행하여 설치를 완료합니다.</li>
              <li>설치 후 로그인하여 대시보드를 이용해주세요.</li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}

export default InstallGuide;
