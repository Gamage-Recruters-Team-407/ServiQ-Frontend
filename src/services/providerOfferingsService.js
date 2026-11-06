import { apiClient } from "./api";
import { categoryService } from "./categoryService";

// Developer 05 - Provider Services
// Real API calls only. No mock data.

const BASE = "/providers/me/services";

export const providerOfferingsService = {
  // Get active categories for Add Service form
  getCategories() {
    return categoryService.getCategories();
  },

  // Get all services belonging to logged-in provider
  getAll() {
    return apiClient(BASE);
  },

  // Get one service
  getById(id) {
    return apiClient(
      `${BASE}/${encodeURIComponent(id)}`
    );
  },

  // Create new service
  create(data) {
    return apiClient(BASE, {
      method: "POST",
      body: data,
    });
  },

  // Edit service, price and coverage
  update(id, data) {
    return apiClient(
      `${BASE}/${encodeURIComponent(id)}`,
      {
        method: "PATCH",
        body: data,
      }
    );
  },

  // Activate / Deactivate / Unavailable
  changeStatus(id, status) {
    return apiClient(
      `${BASE}/${encodeURIComponent(id)}/status`,
      {
        method: "PATCH",
        body: { status },
      }
    );
  },

  // Restore previously archived service
  restore(id) {
    return apiClient(
      `${BASE}/${encodeURIComponent(id)}/restore`,
      {
        method: "PATCH",
      }
    );
  },

  // Permanently delete service
  remove(id) {
    return apiClient(
      `${BASE}/${encodeURIComponent(id)}`,
      {
        method: "DELETE",
      }
    );
  },
};