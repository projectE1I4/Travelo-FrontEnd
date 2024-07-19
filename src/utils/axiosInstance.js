import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json',
  },
  //Axios의 설정 옵션, 리소스 공유(CORS) 요청에서 쿠키나 인증 정보를 서버에 전달할 때 사용
  withCredentials: true,
});

export default axiosInstance;
