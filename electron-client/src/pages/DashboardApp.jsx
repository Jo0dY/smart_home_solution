// src/pages/DashboardApp.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../App.css";

import homeIcon from "/icons/home.png";
import profileIcon from "/icons/profile.png";
import reportIcon from "/icons/report.png";
import logoutIcon from "/icons/logout.png";
import avatarImage from "/icons/profile_jibom.png";
import jibomUmbImage from "/icons/jibom_umb_off.png";
import flowerImage from "/icons/main_flower.png";

function DashboardApp() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="layout">
      {/* 사이드바 */}
      <div
        className="sidebar"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100vh",
        }}
      >
        <div>
          <div className="logo">jibom</div>
          <div className="menu">
            <div className="menu-item" onClick={() => navigate("/dashboard")}>
              <img src={homeIcon} alt="홈" />
            </div>
            <div className="menu-item" onClick={() => navigate("/connect-device")}>
              <img src={profileIcon} alt="기기 연결" />
            </div>
            <div className="menu-item" onClick={() => navigate("/device-list")}>
              <img src={reportIcon} alt="리포트" />
            </div>
          </div>
        </div>
        <div className="menu-bottom" style={{ padding: "1rem" }}>
          <div
            className="menu-item"
            onClick={() => {
              logout();
              navigate("/login");
            }}
            style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
          >
            <img
              src={logoutIcon}
              alt="로그아웃"
              style={{ width: "24px", height: "24px" }}
            />
          </div>
        </div>
      </div>

      {/* 대시보드 본문 */}
      <div className="dashboard-container">
        {/* 헤더 */}
        <div className="dashboard-header">
          <div className="avatar-container">
            <img src={avatarImage} alt="User Avatar" className="avatar" />
            <div className="user-info">
              <h2>지봄이님, 안녕하세요!</h2>
              <p>{today}</p>
            </div>
          </div>
        </div>

        <div className="main-grid">
          {/* 왼쪽 기능 타일 */}
          <div className="left-group">
            <div className="row">
              <div className="tile small orange">대시보드 사용방법</div>
              <div className="tile small orange" onClick={() => navigate("/connect-device")}>
                IoT 기기연결
              </div>
              <div className="tile small orange">최신 업데이트</div>
            </div>

            <div className="row">
              <div className="tile medium">
                <div>AI 실시간 이상 탐지</div>
                <img src={flowerImage} alt="그래프" className="graph-img" />
              </div>
              <div className="tile medium green score-tile">
                <div>오늘의 보안점수</div>
                <h1>100</h1>
              </div>
            </div>

            <div className="row">
              <div className="tile small green" onClick={() => navigate("/device-list")}>
                취약점 분석
              </div>
              <div className="tile small green">AI 실시간 이상탐지</div>
              <div className="tile small green">보안 리포트 분석</div>
            </div>
          </div>

          {/* 오른쪽 지봄이 FAQ */}
          <div className="faq-section">
            <img src={jibomUmbImage} alt="지봄이" className="jibom" />
            <div className="faq-box">
              <button
                className="faq-toggle"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                무엇을 도와드릴까요?
              </button>

              {isDropdownOpen && (
                <div className="faq-dropdown">
                  <button>이용방법 설명해줘</button>
                  <button>사용가능 기기 알려줘</button>
                  <button>기기 등록방법 알려줘</button>
                  <button>보안 점수 확인 방법</button>
                  <button>기기 관리 방법</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardApp;
