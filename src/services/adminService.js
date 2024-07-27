import axiosInstance from '../utils/axiosInstance';

export const getAdminData = async () => {
  try {
    const response = await axiosInstance.get('/admin/main');
    return response.data;
  } catch (error) {
    console.error('Error fetching admin data:', error);
    throw error;
  }
};

//전체 회원 목록
export const getUserList = async (page = 0, sortBy = 'latest') => {
  try {
    const response = await axiosInstance.get('/admin/getAllUser', {
      params: {
        page: page,
        sortBy: sortBy,
      },
      headers: {
        Authorization: sessionStorage.getItem('accessToken'),
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user list:', error);
    throw error;
  }
};

// 회원 탈퇴
export const deleteUser = async (userSeq) => {
  try {
    const response = await axiosInstance.post(
      `/admin/deleteUser/${userSeq}`,
      {},
      {
        headers: {
          Authorization: sessionStorage.getItem('accessToken'),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('회원을 탈퇴시키는데 문제가 발생했습니다. :', error);
    throw error;
  }
};

//전체 그룹 목록
export const getGroupList = async (page = 0, sortBy = 'latest') => {
  try {
    const response = await axiosInstance.get('/admin/groups', {
      params: {
        page: page,
        sortBy: sortBy,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching group list:', error);
    throw error;
  }
};

//그룹 목록 삭제
export const deleteGroup = async (courseGroupSeq) => {
  try {
    const response = await axiosInstance.post(
      `/user/group/delete/${courseGroupSeq}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: sessionStorage.getItem('accessToken'),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('그룹 삭제 실패:', error);
    throw error;
  }
};

// 전체 리뷰 목록
export const getReviewList = async (page = 0, sortBy = 'latest') => {
  try {
    const response = await axiosInstance.get('/admin/reviews', {
      params: {
        page: page,
        sortBy: sortBy,
      },
      headers: {
        Authorization: sessionStorage.getItem('accessToken'),
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching review list:', error);
    throw error;
  }
};

// 전체 리뷰 목록 (모든 페이지 가져오기)
export const getAllReviews = async (sortBy = 'latest') => {
  try {
    let page = 0;
    let allReviews = [];
    let hasMorePages = true;

    while (hasMorePages) {
      const response = await getReviewList(page, sortBy);
      allReviews = [...allReviews, ...response.content];
      hasMorePages = !response.last;
      page += 1;
    }

    return allReviews;
  } catch (error) {
    console.error('Error fetching all reviews:', error);
    throw error;
  }
};

// 신고된 리뷰 목록 불러오기
export const getBlindReviewList = async (page = 0) => {
  try {
    const response = await axiosInstance.get('/admin/blindReviewList', {
      params: {
        page: page,
        sortBy: 'oldest',
      },
      headers: {
        Authorization: sessionStorage.getItem('accessToken'),
      },
    });
    return response.data.tempBlindReviews;
  } catch (error) {
    console.error('신고 리뷰 목록을 불러올 수 없습니다. :', error);
    throw error;
  }
};

// 신고 수 초기화
export const resetReportCount = async (reviewSeq) => {
  try {
    const response = await axiosInstance.post(
      `/admin/unblind/${reviewSeq}`,
      {},
      {
        headers: {
          Authorization: sessionStorage.getItem('accessToken'),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('신고 수 초기화를 실패하였습니다. :', error);
    throw error;
  }
};

// 리뷰 블라인드 처리
export const blindReview = async (reviewSeq) => {
  try {
    const response = await axiosInstance.post(
      `/admin/blind/${reviewSeq}`,
      {},
      {
        headers: {
          Authorization: sessionStorage.getItem('accessToken'),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error blinding review:', error);
    throw error;
  }
};
