import { useContext } from "react";
import { AuthContext } from "../providers/AuthProviders";

export const useAuth = () => {
  return useContext(AuthContext);
};
