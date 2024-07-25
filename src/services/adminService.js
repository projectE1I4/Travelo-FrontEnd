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
