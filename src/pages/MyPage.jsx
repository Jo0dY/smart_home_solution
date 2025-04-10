import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

function MyPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const checkInstallation = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/users/${user.id}/install-check`);
        if (res.data.installed) {
          // 설치된 환경이면 로컬 대시보드 페이지로 이동
          window.location.href = `http://localhost:5000/dashboard/${user.id}`;
        } else {
          // 설치 안 된 환경이면 설치 가이드 페이지로 이동
          navigate('/install-guide');
        }
      } catch (err) {
        console.error('설치 확인 중 오류 발생:', err);
        navigate('/install-guide');
      }
    };

    checkInstallation();
  }, [user, navigate]);

  return <p>설치 환경을 확인 중입니다...</p>;
}

export default MyPage;
