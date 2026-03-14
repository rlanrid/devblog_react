import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { login as loginApi, register as registerApi } from "../api/authApi";

export const useAuth = () => {
  const { login, logout, user, isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    const { data } = await registerApi(formData);
    login(data.user, data.token);
    navigate("/posts");
  };

  const handleLogin = async (formData) => {
    const { data } = await loginApi(formData);
    login(data.user, data.token);
    navigate("/posts");
  };

  const handleLogout = () => {
    logout();
    navigate("/posts");
  };

  return { handleRegister, handleLogin, handleLogout, user, isLoggedIn };
};
