import api from "@/api/axios";
import { useMutation } from "@tanstack/react-query";
import { ILoginForm, IRegisterForm } from "../auth/interface";

export const IS_AUTH_KEY = "isAuthenticated";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (loginPayload: ILoginForm) => {
      const { data, status, statusText } = await api.post(
        "/api/v1/auth/login",
        loginPayload,
      );

      data && localStorage.setItem(IS_AUTH_KEY, "login success");

      return { status, data, statusText };
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (registerPayload: IRegisterForm) => {
      const { data } = await api.post("/api/v1/auth/register", registerPayload);
      return data;
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await api.get("/api/v1/auth/logout");
      return data;
    },
  });
};
