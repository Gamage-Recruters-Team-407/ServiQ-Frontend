import { apiClient } from "./api";

export const notificationService = {
  getNotifications: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiClient(`/notifications${query ? `?${query}` : ""}`);
  },
  markAsRead: (notificationId) =>
    apiClient(`/notifications/${notificationId}/read`, { method: "PATCH" }),
  markAllAsRead: () =>
    apiClient("/notifications/read-all", { method: "PATCH" })
};
