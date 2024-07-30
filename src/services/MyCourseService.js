import axiosInstance from '../utils/axiosInstance';

export const myCourses = async () => {
  try {
    const response = await axiosInstance.get('/user/customCourses');
    return response.data.customCourses;
  } catch (error) {
    console.error('Error fetching custom courses:', error);
    throw error;
  }
};

// 코스 삭제
export const deleteCourse = async (courseSeq) => {
  try {
    const response = await axiosInstance.post(
      'user/custom/delete',
      { courseSeq },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: sessionStorage.getItem('accessToken'),
        },
      }
    );
    return response.data; // 성공 시 메시지 반환
  } catch (error) {
    console.error('코스 삭제 실패:', error);
    throw error;
  }
};
