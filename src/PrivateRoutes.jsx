import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

const PrivateRoutes = () => {
  const { currentUser } = useAuth();

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
