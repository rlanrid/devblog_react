import axios from "axios";
import { useAuthStore } from "../store/authStore";

const axiosInstance = axios.create({
  baseURL: "https://devblog-react-xv6c.onrender.com/api",
});

const public__paths = ["/login", "/register", "/password"];

// 요청 인터셉터 - 모든 요청 전에 토큰 자동 첨부
axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 응답 인터셉터 - 토큰 만료 시 자동 로그아웃
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const isPublicPath = public__paths.some(path => error.config.url.includes(path));

    if (error.response?.status === 401 && !isPublicPath) {
      useAuthStore.getState().logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;