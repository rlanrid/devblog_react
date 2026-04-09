import axiosInstance from "./axiosInstance";

export const getPosts = () => axiosInstance.get("/posts");
export const getPost = (id) => axiosInstance.get(`/posts/${id}`);
export const createPost = (data) => axiosInstance.post("/posts", data);
export const updatePost = (id, data) => axiosInstance.put(`/posts/${id}`, data);
export const deletePost = (id) => axiosInstance.delete(`/posts/${id}`);

export const incrementView = (id) => axiosInstance.patch(`/posts/${id}/view`);
export const incrementLike = (id) => axiosInstance.patch(`/posts/${id}/like`);