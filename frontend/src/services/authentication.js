import { axiosApi } from "../utils/axios";

export const loginUser = async (data) => {
  try {
    const response = await axiosApi.post(`/users/login`, data);
    console.log("Response From Login", response);
    return response.data;
  } catch (error) {
    console.error("Error trying to log in", error);
    throw error;
  }
};

export const registerUser = async (data) => {
  try {
    const response = await axiosApi.post(`/users/register`, data);
    return response.data;
  } catch (error) {
    console.error("Error trying to register", error);
    throw error;
  }
};

export const fetchUser = async () => {
  try {
    const response = await axiosApi.get(`/users/me`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user", error);
    throw error;
  }
};
