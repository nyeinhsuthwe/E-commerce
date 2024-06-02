import axios from "axios";

const baseUrl = "http://localhost:8000/api/v1";

export const loginUser = async (credentials) => {
  try {
    const { data } = await axios.post(`${baseUrl}/users/login`, credentials, {
      withCredentials: true,
    });
    console.log("baseurl===============>", baseUrl);
    return data;
  } catch (error) {
    console.error("Error try to log in", error);
    throw error;
  }
};

export const registerUser = async (credentials) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/users/register`,
      credentials,
      {
        withCredentials: true,
      }
    );
    console.log("baseurl===============>", baseUrl);
    return data;
  } catch (error) {
    console.error("Error try to register", error);
    throw error;
  }
};

export const fetchUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token not found");
  }
  console.log("TOKEN", token);
  const { data } = await axios.get(`${baseUrl}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// export const fetchUser = async () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({ id: 1, name: "John Doe", role: "user" });
//     }, 1000);
//   });
// };
