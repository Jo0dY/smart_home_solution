// electron-client/src/lib/axios.js
import axios from 'axios';

console.log('[axios] electron-client 인스턴스 로딩됨');

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/v1',  // ✅ FastAPI 경로
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
