import { apiClient } from "./api";

export const disputeService = {
  raiseDispute: (disputeData) =>
    apiClient("/disputes", { method: "POST", body: disputeData }),
  uploadEvidence: (disputeId, evidenceData) =>
    apiClient(`/disputes/${disputeId}/evidence`, { method: "POST", body: evidenceData }),
  getDisputeById: (disputeId) =>
    apiClient(`/disputes/${disputeId}`)
};
