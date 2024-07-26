import axiosInstance from '../utils/axiosInstance';

const likePlace = async (placeSeq, accessToken) => {
  try {
    const response = await axiosInstance.post(
      `/user/place/like/${placeSeq}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log('좋아요 상태 업데이트 실패', error);
    throw error;
  }
};

export default likePlace;
