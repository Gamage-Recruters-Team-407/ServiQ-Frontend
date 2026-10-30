import { apiClient } from "./api";
import { toQuery } from "@/utils/query";

export const categoryService = {
  // public (Active only). params: { parent: "root" | id, q, withCounts: 1 }
  getCategories: (params = {}) => apiClient(`/categories${toQuery(params)}`),
  getCategoryBySlug: (slugOrId) => apiClient(`/categories/${slugOrId}`),

  // admin
  getAllCategoriesAdmin: (params = {}) => apiClient(`/categories/admin/all${toQuery(params)}`),
  createCategory: (data) => apiClient("/categories", { method: "POST", body: data }),
  updateCategory: (id, data) => apiClient(`/categories/${id}`, { method: "PUT", body: data }),
  setCategoryStatus: (id, status) =>
    apiClient(`/categories/${id}`, { method: "PUT", body: { status } }),
};