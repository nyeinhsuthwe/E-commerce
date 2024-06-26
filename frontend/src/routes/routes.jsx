import { createBrowserRouter } from "react-router-dom";
import LoginForm from "../pages/LoginForm";
import RegisterForm from "../pages/RegisterForm";
import PrivateRoute from "../components/PrivateRoute";
import Dashboard from "../pages/Dashboard";

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
        path: "/",
        element: <Dashboard />,
      }
    ],
  },
]);
