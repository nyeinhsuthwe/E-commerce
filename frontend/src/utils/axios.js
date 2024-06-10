import axios from "axios";
const baseUrl = "http://localhost:8000/api/v1";

export const axiosApi = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});
