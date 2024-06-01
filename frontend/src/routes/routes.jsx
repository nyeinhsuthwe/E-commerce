import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import LoginForm from "../pages/LoginForm";
import RegisterForm from "../pages/RegisterForm";
import PrivateRoute from "../components/PrivateRoute";
import AdminPage from "../pages/admin/AdminPage";
import UserPage from "../pages/user/UserPage";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "register",
        element: <RegisterForm />,
      },
      {
        path: "admin",
        element: (
          <PrivateRoute roles={["admin"]}>
            <AdminPage />
          </PrivateRoute>
        ),
      },
      {
        path: "user",
        element: (
          <PrivateRoute roles={["user", "admin"]}>
            <UserPage />
          </PrivateRoute>
        ),
      },
      {
        path: "guide",
        element: (
          <PrivateRoute roles={["guide", "admin"]}>
            <AdminPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
