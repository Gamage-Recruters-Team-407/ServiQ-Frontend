import { apiClient } from "./api";

export const earningsService = {
  getProviderEarnings: (providerId, params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiClient(`/providers/${providerId}/earnings${query ? `?${query}` : ""}`);
  },
  getEarningsSummary: (providerId) => apiClient(`/providers/${providerId}/earnings/summary`)
};
