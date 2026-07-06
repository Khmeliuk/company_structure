import axios from "axios";

// const BASE_URL = import.meta.env.VITE_API_URL;
const BASE_URL = "http://localhost:5051/api/v1/";
// const API_URL = "http://127.0.0.1:6061/api/v1";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (formData) => {
  try {
    console.log(formData, "user");
    const user = await axiosInstance.post("/auth/login", formData);

    return user;
  } catch (error) {
    if (error.response && error.response.data?.message) {
      console.log("====================================");
      console.log(error.response.data.message);
      console.log("====================================");
      throw new Error(error.response.data.message);
    }
    throw new Error("Login failed. Please try again.");
  }
};

export const registration = async (formData) => {
  try {
    return await axiosInstance.post("/auth/registration", formData);
  } catch (error) {
    console.log(error.message);
  }
};

export const logout = async () => {
  try {
    return await axiosInstance.post("/auth/logout");
  } catch (error) {
    console.error("logoutError", error);
  }
};

export const refresh = async () => {
  try {
    const response = await axiosInstance.get("/auth/check");
    return response;
  } catch (error) {
    console.error("Refresh error:", error);
    throw error; // або поверни null / false, якщо не хочеш кидати
  }
};
