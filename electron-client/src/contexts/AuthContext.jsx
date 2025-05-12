// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      console.log('🔍 [Auth] 세션 확인 시작');
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000); // 2초 제한

        const res = await fetch('http://localhost:8000/api/v1/users/me', {
          credentials: 'include',
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          console.log('✅ [Auth] 세션 확인 성공:', data);
          setUser({ token: null, ...data });
        } else {
          console.warn('🟡 [Auth] 세션 없음, 로컬 토큰 확인 중...');
          const token = localStorage.getItem('token');
          const email = localStorage.getItem('email');
          const user_id = localStorage.getItem('user_id');
          const role = localStorage.getItem('role');

          if (token && email && user_id && role) {
            setUser({ token, email, user_id, role });
            console.log('✅ [Auth] 로컬 토큰 기반 로그인 성공');
          } else {
            setUser(null);
            console.log('❌ [Auth] 로그인 정보 없음');
          }
        }
      } catch (err) {
        console.error('🚫 [Auth] 세션 확인 실패:', err.message || err);
        setUser(null);
      } finally {
        console.log('✅ [Auth] isLoading = false');
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token || '');
    localStorage.setItem('email', userData.email);
    localStorage.setItem('user_id', userData.user_id);
    localStorage.setItem('role', userData.role);
    console.log('✅ [Auth] 로그인 상태 설정 완료');
  };

  const logout = async () => {
    try {
      await fetch('http://localhost:8000/api/v1/users/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      console.error('❌ [Auth] 서버 로그아웃 실패:', err);
    }

    const remembered = localStorage.getItem('remembered_email');
    localStorage.clear();
    if (remembered) {
      localStorage.setItem('remembered_email', remembered);
    }
    setUser(null);
    console.log('✅ [Auth] 로그아웃 완료');
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!user,
        user,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
