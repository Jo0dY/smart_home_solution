import React from 'react';
import { FaHome, FaUser, FaQuestionCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';
import '../styles/Sidebar.css';

const Sidebar = ({ onMenuClick }) => {
  return (
    <div className="sidebar">
      <div className="logo">🌿 지봄이</div>
      <ul className="menu">
        <li onClick={() => onMenuClick('dashboard')}><FaHome /> 대시보드</li>
        <li onClick={() => onMenuClick('profile')}><FaUser /> 내 정보</li>
        <li onClick={() => onMenuClick('faq')}><FaQuestionCircle /> FAQ</li>
        <li onClick={() => onMenuClick('settings')}><FaCog /> 설정</li>
        <li className="logout" onClick={() => onMenuClick('logout')}><FaSignOutAlt /> 로그아웃</li>
      </ul>
    </div>
  );
};

export default Sidebar;
