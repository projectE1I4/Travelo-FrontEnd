import axiosInstance from '../utils/axiosInstance';

export const reviewsList = async (page = 0, sortBy = 'latest') => {
  try {
    const response = await axiosInstance.get('/user/course/myReviews', {
      params: {
        page: page,
        sortBy: sortBy,
      },
      headers: {
        Authorization: sessionStorage.getItem('token'),
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
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
        },
      }
    );
    return response.data;
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
          Authorization: sessionStorage.getItem('token'),
        },
      }
    );
    return response.data; // 성공 시 메시지 반환
  } catch (error) {
    console.error('리뷰 삭제 실패:', error);
    throw error;
  }
};
