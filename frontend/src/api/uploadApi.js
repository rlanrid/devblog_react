import axiosInstance from "./axiosInstance";

export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append("image", file);

  return axiosInstance.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};