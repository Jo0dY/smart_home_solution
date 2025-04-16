// src/lib/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/v1',  // ✅ CRA용 proxy 적용을 위해 이렇게 변경
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ 응답 인터셉터 - 401 Unauthorized 시 자동 refresh 처리
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // ✅ refresh_token 존재 여부 (비회원이면 없음 → refresh 안함)
    const hasRefreshToken = document.cookie.includes('refresh_token');

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      hasRefreshToken
    ) {
      originalRequest._retry = true;
      try {
        await instance.post('/users/refresh');  // ✅ access_token 재발급
        return instance(originalRequest);       // ✅ 원래 요청 재시도
      } catch (refreshError) {
        alert('세션이 만료되었습니다. 다시 로그인해주세요.');
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
