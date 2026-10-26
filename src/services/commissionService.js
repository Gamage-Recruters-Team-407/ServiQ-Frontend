import { apiClient } from "./api";

export const commissionService = {
  getRules: () => apiClient("/commissions/rules"),
  calculateCommission: (transactionData) =>
    apiClient("/commissions/calculate", { method: "POST", body: transactionData })
};
