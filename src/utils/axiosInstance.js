import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubsrcibers = [];

const subscribeTokenRefresh = (cb) => {
  refreshSubsrcibers.push(cb);
};

const onRefreshed = (token) => {
  refreshSubsrcibers.map((cb) => cb(token));
  refreshSubsrcibers = [];
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const excludedUrls = [
      '/travelo/join',
      '/travelo/mailConfirm',
      '/travelo/verifyCode',
      '/travelo/login',
      '/travelo/kakaoCallback',
      '/travelo/googleCallback',
      '/travelo/naverCallback',
      'travelo/resetPassword',
      'travelo/check',
    ];

    if (excludedUrls.includes(config.url)) {
      return config;
    }

    let laccessToken = localStorage.getItem('accessToken');
    let accessToken = sessionStorage.getItem('accessToken');
    const lrefreshToken = localStorage.getItem('refreshToken');
    const refreshToken = sessionStorage.getItem('refreshToken');

    if (isTokenExpired(accessToken)) {
      try {
        const response = await axiosInstance.post('/user/refreshToken', {
          refreshToken: refreshToken || lrefreshToken,
        });
        accessToken = response.data.accessToken;
        localStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('accessToken', accessToken);

        isRefreshing = false;
        onRefreshed(accessToken);
      } catch (error) {
        console.log('Fail to refresh token', error);
        isRefreshing = false;
      }
    }

    const retryOriginalRequest = new Promise((resolve) => {
      subscribeTokenRefresh((token) => {
        config.headers.Authorization = `Bearer ${token}`;
        resolve(config);
      });
    });

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else if (laccessToken) {
      config.headers.Authorization = `Bearer ${laccessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const isTokenExpired = (token) => {
  if (!token) return true;

  const { exp } = jwtDecode(token);
  const now = Math.floor(Date.now() / 1000);

  return exp < now;
};

export default axiosInstance;
