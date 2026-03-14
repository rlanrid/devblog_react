import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const PublicOnlyRoute = () => {
  const { isLoggedIn } = useAuthStore();

  return isLoggedIn() ? <Navigate to="/posts" replace /> : <Outlet />;
};

export default PublicOnlyRoute;