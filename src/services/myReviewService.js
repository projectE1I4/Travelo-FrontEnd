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
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3QxQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzIxNTY0OTg0LCJleHAiOjE3MjE1Njg1ODR9.DwzggnVC7qx_L7zDcJNbekKTz0gifed0LtdxE5zQVpk',
      },
    });
    return response.data; // API 응답 데이터를 반환합니다.
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }
};

// 리뷰 수정

export const updateReview = async (reviewSeq, content) => {
  try {
    const response = await axiosInstance.post(
      `/user/review/modify/${reviewSeq}`,
      { content },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3QxQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzIxNTcwMDAyLCJleHAiOjE3MjE1NzM2MDJ9.wrnbW_haySxBdAPa-yBucQUkijpXewdvHkKt9S5qjkw',
        },
      }
    );
    return response.data; // API 응답 데이터를 반환합니다.
  } catch (error) {
    console.error('리뷰 수정 실패:', error);
    throw error;
  }
};

// 리뷰 삭제
export const deleteReview = async (reviewSeq) => {
  try {
    const response = await axiosInstance.post(
      `/user/review/delete/${reviewSeq}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3QxQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzIxNTcwMDAyLCJleHAiOjE3MjE1NzM2MDJ9.wrnbW_haySxBdAPa-yBucQUkijpXewdvHkKt9S5qjkw`, // 현재 토큰으로 대체
        },
      }
    );
    return response.data; // 성공 시 메시지 반환
  } catch (error) {
    console.error('리뷰 삭제 실패:', error);
    throw error;
  }
};
