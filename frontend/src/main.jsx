import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './pages/Home.jsx';
import LoginForm from './pages/LoginForm.jsx';
import RegisterForm from './pages/RegisterForm.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children : [
      {
        path : "/",
        element: <Home/>
      },
      {
        path : "/login",
        element: <LoginForm/>
      },
      {
        path : "/register",
        element: <RegisterForm/>
      }
    ]
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
