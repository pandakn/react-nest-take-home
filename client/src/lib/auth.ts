import { IS_AUTH_KEY } from "@/hooks/auth";

export const getAccessToken = (): string | null => {
  const accessToken = localStorage.getItem(IS_AUTH_KEY);
  if (!accessToken) {
    localStorage.removeItem(IS_AUTH_KEY);
    return null;
  }
  return accessToken;
};
