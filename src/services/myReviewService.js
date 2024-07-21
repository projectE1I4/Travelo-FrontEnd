import axiosInstance from '../utils/axiosInstance';

export const reviewsList = async (page = 0, sortBy = 'latest') => {
  try {
    const response = await axiosInstance.get('/user/course/myReviews', {
      params: {
        page: page,
        sortBy: sortBy,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3QxQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzIxNTQyMDYwLCJleHAiOjE3MjE1NDU2NjB9.uzFBuRQWK7ysNAuoMQ0YiZBt0wsl6Yom4Ej7NqheEfM', // 더미 토큰을 설정합니다.
      },
    });
    return response.data; // API 응답 데이터를 반환합니다.
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }
};
