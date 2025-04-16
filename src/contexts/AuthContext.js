import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Context 생성
const AuthContext = createContext();

// 2. Provider 정의
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // 로그인 사용자 정보 상태

  // ✅ 페이지 새로고침 시 localStorage로부터 사용자 상태 복원
  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const user_id = localStorage.getItem('user_id');
    const role = localStorage.getItem('role');

    if (token && email && user_id) {
      setUser({
        token,
        email,
        user_id,
        role,
      });
    }
  }, []);

  // ✅ 로그인 함수 (로그인 성공 후 호출됨)
  const login = (userData) => {
    setUser(userData);
  };

  // ✅ 로그아웃 함수 (보안 강화: 명시적 항목 제거)
  const logout = () => {
    // ❗ localStorage.clear() 대신 필요한 키만 삭제
    ['token', 'email', 'user_id', 'role'].forEach((key) =>
      localStorage.removeItem(key)
    );
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

// 3. useAuth() 훅 (다른 컴포넌트에서 로그인 정보 접근용)
export function useAuth() {
  return useContext(AuthContext);
}
