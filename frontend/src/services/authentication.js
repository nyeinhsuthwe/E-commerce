import axios from "axios";

const baseUrl = "http://localhost:8000/api/v1";

export const loginUser = async (credentials) => {
  const { data } = await axios.post(`${baseUrl}/users/login`, credentials, {
    withCredentials: true,
  });
  console.log("baseurl===============>", baseUrl);
  return data;
};

// export const fetchUser = async () => {
//   const token = localStorage.getItem("token");
//   const { data } = await axios.get(`${baseUrl}/me`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return data;
// };

export const fetchUser = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, name: "John Doe", role: "user" });
    }, 1000);
  });
};
