/* eslint-disable react/prop-types */
import { createContext } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import { loginUser, fetchUser } from "../services/authentication";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    enabled: !!token,
  });

  console.log(data);

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      queryClient.invalidateQueries(["user"]);
    },
  });

  return (
    <AuthContext.Provider
      value={{ user: data, login: loginMutation, isLoading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};
