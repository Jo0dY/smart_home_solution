import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ 요청 경로 콘솔 출력
instance.interceptors.request.use((config) => {
  console.log('👉 [요청 URL]', config.method?.toUpperCase(), config.baseURL + config.url);
  return config;
});

export default instance;