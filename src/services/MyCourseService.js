import axiosInstance from '../utils/axiosInstance';

export const myCourses = async () => {
  try {
    const response = await axiosInstance.get('/user/group/customCourses');
    return response.data.customCourses;
  } catch (error) {
    console.error('Error fetching custom courses:', error);
    throw error;
  }
};
