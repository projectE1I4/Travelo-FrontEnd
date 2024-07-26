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
    return response.data;
  } catch (error) {
    console.error('Error fetching review list:', error);
    throw error;
  }
};
