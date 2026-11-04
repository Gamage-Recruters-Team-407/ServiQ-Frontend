import { apiClient } from "./api";

// Service Completion API (Developer 15). Endpoints: /api/service-completions
export const completionService = {
  list: (params = {}) => {
    const clean = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== ""));
    const query = new URLSearchParams(clean).toString();
    return apiClient(`/service-completions${query ? `?${query}` : ""}`);
  },
  getById: (id) => apiClient(`/service-completions/${id}`),
  getByBooking: (bookingId) => apiClient(`/service-completions/booking/${bookingId}`),
  // Provider: start tracking an accepted / confirmed booking.
  startTracking: (bookingId) =>
    apiClient("/service-completions", { method: "POST", body: { booking_id: bookingId } }),
  // Provider: move to the next status. `notes` is required for Completed and Cancelled.
  updateStatus: (id, status, { notes, evidenceUrls } = {}) =>
    apiClient(`/service-completions/${id}`, {
      method: "PATCH",
      body: {
        status,
        ...(notes ? { notes } : {}),
        ...(evidenceUrls?.length ? { evidence_urls: evidenceUrls } : {})
      }
    }),
  // Provider: edit notes / evidence links without changing the status.
  updateDetails: (id, { notes, evidenceUrls }) =>
    apiClient(`/service-completions/${id}`, {
      method: "PATCH",
      body: {
        ...(notes ? { notes } : {}),
        ...(evidenceUrls ? { evidence_urls: evidenceUrls } : {})
      }
    }),
  // Customer: confirm the service was completed.
  confirmCompletion: (id) =>
    apiClient(`/service-completions/${id}`, { method: "PATCH", body: { confirm_completion: true } })
};
