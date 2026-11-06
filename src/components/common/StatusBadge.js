import React from "react";

export default function StatusBadge({ status, type = "booking" }) {
  if (!status) return null;

  const normalized = status.toLowerCase();

  let badgeClass = "badge-neutral";

  if (
    ["active", "confirmed", "completed", "successful", "verified", "available", "approved", "published", "delivered", "read"].includes(normalized)
  ) {
    badgeClass = "badge-success";
  } else if (
    ["requested", "pending", "pending confirmation", "awaiting approval", "under review", "in investigation", "calculated", "submitted"].includes(normalized)
  ) {
    badgeClass = "badge-pending";
  } else if (
    ["in progress", "started", "on the way", "processing", "rescheduled", "escalated", "partially adjusted", "partially refunded"].includes(normalized)
  ) {
    badgeClass = "badge-info";
  } else if (
    ["rejected", "cancelled", "failed", "suspended", "restricted", "removed", "closed"].includes(normalized)
  ) {
    badgeClass = "badge-danger";
  } else if (
    ["disputed", "on hold", "flagged"].includes(normalized)
  ) {
    badgeClass = "badge-warning";
  }

  return (
    <span className={`badge ${badgeClass}`}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "currentColor" }} />
      {status}
    </span>
  );
}
