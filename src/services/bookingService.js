import { apiClient } from "./api";

export const bookingService = {
  createBooking: (data) => apiClient("/bookings", { method: "POST", body: data }),
  getBookings: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiClient(`/bookings${query ? `?${query}` : ""}`);
  },
  getBookingById: (id) => apiClient(`/bookings/${id}`),
  updateBookingStatus: (id, status, reason = null) =>
    apiClient(`/bookings/${id}/status`, {
      method: "PATCH",
      body: { status, reason }
    }),
  rescheduleBooking: (id, scheduleData) =>
    apiClient(`/bookings/${id}/reschedule`, {
      method: "PATCH",
      body: scheduleData
    }),
  confirmCompletion: (id, notes = "") =>
    apiClient(`/bookings/${id}/complete`, {
      method: "POST",
      body: { notes }
    })
};
