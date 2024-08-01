// // userAuth hook
// import { useEffect, useState } from 'react';
// import authService from '../services/authService.js';
// import axiosInstance from '../utils/axiosInstance.js';

// export const useAuth = () => {
//   // 인증 상태관리
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);

//   // // 토큰 관리
//   const checkAuth = async () => {
//     const result = authService.isAuthenticated();
//     setIsAuthenticated(result);

//     if (result) {
//       try {
//         const accessToken = sessionStorage.getItem('accessToken');
//         console.log('accessToken:', accessToken); // accessToken이 있는지 확인
//         const response = await axiosInstance.get('/user/mypage', {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });
//         setUser(response.data);
//       } catch (error) {
//         console.error('사용자 정보를 가져오는 중 오류 발생 : ', error);
//         setIsAuthenticated(false);
//         setUser(null);
//       }
//     }
//     useEffect(() => {
//       checkAuth();
//     }, [accessToken]);
//   };

//   // const login = async (email, password) => {
//   //   try {
//   //     const success = await authService.login(email, password);
//   //     if (success) {
//   //       setIsAuthenticated(true);
//   //     }
//   //     sessionStorage.setItem('token', success);
//   //     setIsAuthenticated(true);
//   //     return success;
//   //   } catch (error) {
//   //     console.error('로그인 요청 중 오류 발생: ', error);
//   //     return { status: error.response?.status, data: error.response?.data };
//   //   }
//   // };

//   const logout = async () => {
//     try {
//       const accessToken = sessionStorage.getItem('accessToken');
//       if (accessToken) {
//         await axiosInstance.post(
//           '/user/logout',
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           }
//         );
//       }

//       sessionStorage.removeItem('accessToken');
//       localStorage.removeItem('accessToken');
//       localStorage.removeItem('token');
//       sessionStorage.removeItem('refreshToken');
//       sessionStorage.removeItem('token');
//       setIsAuthenticated(false);

//       window.location.href = '/users/login';
//     } catch (error) {
//       console.error('로그아웃 실패 : ', error);
//     }
//   };

//   return { isAuthenticated, user, logout, checkAuth };
// };

// export default useAuth;
