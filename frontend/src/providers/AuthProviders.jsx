/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import { loginUser, fetchUser } from "../services/authentication";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");
  const [loginError, setLoginError] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    enabled: !!token,
    onError: () => {
      localStorage.removeItem("token");
    },
  });

  console.log(data);

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["user"]);
      localStorage.setItem("token", data.token);
    },
    onError: (error) => {
      setLoginError(error?.response?.data.message);
    },
  });

  return (
    <AuthContext.Provider
      value={{ user: data, login: loginMutation, isLoading, error, loginError }}
    >
      {children}
    </AuthContext.Provider>
  );
};
