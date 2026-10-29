import { apiClient } from "./api";

export const authService = {
  login: (credentials) => apiClient("/auth/login", { method: "POST", body: credentials }),
  register: (userData) => apiClient("/auth/register", { method: "POST", body: userData }),
  logout: () => apiClient("/auth/logout", { method: "POST" }),
  getCurrentUser: () => apiClient("/auth/me"),
  forgotPassword: (identifier) => apiClient("/auth/forgot-password", { method: "POST", body: { identifier } }),
  resetPassword: (payload) => apiClient("/auth/reset-password", { method: "POST", body: payload })
};
