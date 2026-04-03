import axiosInstance from "./axiosInstance";

export const register = (data) => axiosInstance.post("/auth/register", data);
export const login = (data) => axiosInstance.post("/auth/login", data);
export const getMe = () => axiosInstance.get("/auth/me");
export const updateMe = (data) => axiosInstance.put("/auth/me", data);
export const updatePassword = (data) => axiosInstance.put("/auth/me/password", data);