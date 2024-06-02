/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
