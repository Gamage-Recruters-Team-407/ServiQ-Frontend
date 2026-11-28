// src/services/customerService.js
import { apiClient } from "./api";

export const customerService = {
  // Get Customer Profile
  getProfile: () => apiClient("/customers/profile", { method: "GET" }),

  // Update Customer Profile
  updateProfile: (data) => 
    apiClient("/customers/profile", { method: "PUT", body: data }),

  // Delete Customer Account
  deleteAccount: () => 
    apiClient("/customers/profile", { method: "DELETE" })
};