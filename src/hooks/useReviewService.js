import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const useReviewService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createReview = async (courseSeq, content, accessToken) => {
    if (!content.trim()) {
      throw new Error('내용을 입력해주세요.');
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post(
        `/user/review/create/${courseSeq}`,
        { content },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setLoading(false);
      if (typeof response.data === 'string') {
        return { content, user: response.data.user };
      }
      return response.data;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  const modifyReview = async (reviewSeq, content, accessToken) => {
    if (!content.trim()) {
      throw new Error('내용을 입력해주세요.');
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post(
        `/user/review/modify/${reviewSeq}`,
        { content },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  const deleteReview = async (reviewSeq, accessToken) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post(
        `/user/review/delete/${reviewSeq}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  const recommendReview = async (reviewSeq, accessToken) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post(
        `/user/review/recommend/${reviewSeq}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setLoading(false);
      return response.data; // API에서 반환된 데이터("Y" 또는 "N")를 그대로 반환
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  const reportReview = async (reviewSeq, accessToken) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post(
        `/user/review/report/${reviewSeq}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return {
    createReview,
    modifyReview,
    deleteReview,
    recommendReview,
    reportReview,
    loading,
    error,
  };
};

export default useReviewService;
