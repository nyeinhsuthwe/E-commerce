import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Dashboard";
import LoginForm from "../pages/LoginForm";
import RegisterForm from "../pages/RegisterForm";
import PrivateRoute from "../components/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Home />,
      },
    ],
  },
]);
