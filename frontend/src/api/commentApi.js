import axiosInstance from "./axiosInstance";

export const getComments = (postId) => axiosInstance.get(`/comments/${postId}`);
export const createComment = (postId, data) => axiosInstance.post(`/comments/${postId}`, data);
export const deleteComment = (postId, commentId) => axiosInstance.delete(`/comments/${postId}/${commentId}`);