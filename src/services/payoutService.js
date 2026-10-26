import { apiClient } from "./api";

export const payoutService = {
  requestPayout: (payoutData) =>
    apiClient("/payouts/request", { method: "POST", body: payoutData }),
  getPayoutHistory: (providerId) =>
    apiClient(`/payouts/provider/${providerId}`)
};
