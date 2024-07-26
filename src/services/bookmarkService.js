import axiosInstance from '../utils/axiosInstance';

export const addBookmark = async (placeSeq, accessToken) => {
  try {
    const response = await axiosInstance.post(
      `/user/placebookmarks/add?placeSeq=${placeSeq}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('북마크 추가 실패', error);
    throw error;
  }
};

export const removeBookmark = async (placeSeq, accessToken) => {
  try {
    const response = await axiosInstance.delete(
      `/user/placebookmarks/remove?placeSeq=${placeSeq}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('북마크 삭제 실패', error);
    throw error;
  }
};

export const fetchBookmarks = async (accessToken) => {
  try {
    const response = await axiosInstance.get('/user/placebookmarks/all', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('북마크 목록 가져오기 실패', error);
    throw error;
  }
};
