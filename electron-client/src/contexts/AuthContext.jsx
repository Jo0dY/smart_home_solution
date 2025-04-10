// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Context 생성
const AuthContext = createContext();

// 2. Provider 정의
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const user_id = localStorage.getItem('user_id');

    if (token && email) {
      setUser({
        token,
        email,
        user_id,
      });
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. useAuth 훅
export function useAuth() {
  return useContext(AuthContext);
}
