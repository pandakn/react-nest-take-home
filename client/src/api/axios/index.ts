import { IS_AUTH_KEY } from "@/hooks/auth";
import Axios, { AxiosResponse } from "axios";

const api = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest?._retry &&
      originalRequest.url !== "/api/v1/auth/login"
    ) {
      window.location.href = "/login";
      localStorage.removeItem(IS_AUTH_KEY);
    }

    return Promise.reject(error);
  },
);

export default api;
