import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // ✅ 페이지 새로고침 시 서버에 요청해서 유저 정보 확인 (optional)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/v1/users/me', {
          credentials: 'include', // 쿠키 보내기
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        console.log('세션 만료 또는 로그인 아님');
      }
    };
    fetchUser();
  }, []);

  // ✅ 로그인 시 Context만 설정
  const login = (userData) => {
    setUser(userData);
  };

// ✅ 로그아웃 시 쿠키 기반 로그아웃 + 상태 제거
const logout = async () => {
  try {
    const res = await fetch('http://localhost:8000/api/v1/users/logout', {
      method: 'POST',
      credentials: 'include',
    });
    const data = await res.json();
    console.log('✅ 서버 로그아웃 응답:', data);
  } catch (err) {
    console.error('❌ 서버에 로그아웃 실패:', err);
  }

  const remembered = localStorage.getItem('remembered_email');
  localStorage.clear();
  if (remembered) {
    localStorage.setItem('remembered_email', remembered);
  }
  setUser(null);
};

return (
  <AuthContext.Provider
    value={{
      isLoggedIn: !!user,
      user,
      login,
      logout,
    }}
  >
    {children}
  </AuthContext.Provider>
);
}

export function useAuth() {
return useContext(AuthContext);
}