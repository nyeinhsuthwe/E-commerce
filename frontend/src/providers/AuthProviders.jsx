/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { loginUser, fetchUser, registerUser } from "../services/authentication";
import { useToast } from "@/components/ui/use-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const {
    data: fetchedUser,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    enabled: !!user,
    retry: false,
    onSuccess: (data) => {
      setUser(data.data.user);
      localStorage.setItem("user", JSON.stringify(data.data.user));
    },
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data) => {
      setUser(data.data.user);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      queryClient.invalidateQueries(["user"]);
      toast({
        description: "Login successful",
        variant: "outline",
      });
      setIsLoading(false);
    },
    onError: (data) => {
      toast({
        title: "Error",
        description: data.response.data.message,
        variant: "destructive",
      });
      setIsLoading(false);
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data) => {
      setUser(data.data.user);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      queryClient.invalidateQueries(["user"]);
      toast({
        description: "Register successful",
        variant: "outline",
      });
      setIsLoading(false);
    },
    onError: (data) => {
      toast({
        title: "Error",
        description: data.response.data.message,
        variant: "destructive",
      });
      setIsLoading(false);
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: fetchedUser || user,
        login: loginMutation,
        register: registerMutation,
        isLoading,
        error,
        isSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
