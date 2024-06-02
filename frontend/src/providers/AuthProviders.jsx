/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import { loginUser, fetchUser } from "../services/authentication";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [loginError, setLoginError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  console.log("isAuthenticated", isAuthenticated);

  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    enabled: isAuthenticated,
  });

  console.log("USER DATA", data);

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["user"]);
      localStorage.setItem("token", data.token);
      setIsAuthenticated(true);
    },
    onError: (error) => {
      setLoginError(error?.response?.data.message);
    },
  });

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data,
        login: loginMutation,
        isLoading,
        error,
        loginError,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
