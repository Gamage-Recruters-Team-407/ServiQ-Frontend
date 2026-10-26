import { apiClient } from "./api";

export const serviceService = {
  // Discovery & Search
  getCategories: () => apiClient("/categories"),
  getServices: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiClient(`/services${query ? `?${query}` : ""}`);
  },
  getServiceById: (id) => apiClient(`/services/${id}`),
  
  // Provider Comparison
  compareProviders: (providerIds = []) => {
    const ids = providerIds.join(",");
    return apiClient(`/providers/compare?ids=${ids}`);
  },

  // Provider offerings
  getProviderServices: (providerId) => apiClient(`/providers/${providerId}/services`),
  createService: (data) => apiClient("/services", { method: "POST", body: data }),
  updateService: (id, data) => apiClient(`/services/${id}`, { method: "PUT", body: data }),
  deleteService: (id) => apiClient(`/services/${id}`, { method: "DELETE" })
};
