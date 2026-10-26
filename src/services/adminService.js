import { apiClient } from "./api";

export const adminService = {
  getAnalytics: (period = "30d") => apiClient(`/admin/analytics?period=${period}`),
  getUsers: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiClient(`/admin/users${query ? `?${query}` : ""}`);
  },
  updateUserStatus: (userId, status, reason) =>
    apiClient(`/admin/users/${userId}/status`, {
      method: "PATCH",
      body: { status, reason }
    }),
  getCommissionRules: () => apiClient("/admin/commission-rules"),
  createCommissionRule: (ruleData) =>
    apiClient("/admin/commission-rules", {
      method: "POST",
      body: ruleData
    }),
  getPayoutRequests: (status) =>
    apiClient(`/admin/payouts${status ? `?status=${status}` : ""}`),
  reviewPayout: (payoutId, action, reason) =>
    apiClient(`/admin/payouts/${payoutId}/review`, {
      method: "POST",
      body: { action, reason }
    }),
  getAuditLogs: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiClient(`/admin/audit-logs${query ? `?${query}` : ""}`);
  }
};
