import { apiClient } from "./api";

export const paymentService = {
  initiatePayment: (bookingId, paymentData) =>
    apiClient(`/payments/initiate`, {
      method: "POST",
      body: { booking_id: bookingId, ...paymentData }
    }),
  getPaymentStatus: (paymentId) => apiClient(`/payments/${paymentId}`),
  getPaymentHistory: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiClient(`/payments${query ? `?${query}` : ""}`);
  },
  requestRefund: (paymentId, reason) =>
    apiClient(`/payments/${paymentId}/refund`, {
      method: "POST",
      body: { reason }
    })
};
