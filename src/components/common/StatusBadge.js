import React from "react";

export default function StatusBadge({ status, type = "booking" }) {
  if (!status) return null;

  const normalized = status.toLowerCase();

  let badgeClass = "bg-slate-100 text-slate-700";

  if (
    ["active", "confirmed", "completed", "successful", "verified", "available", "approved", "published", "delivered", "read"].includes(normalized)
  ) {
    badgeClass = "bg-[#dcfce7] text-[var(--status-success)]";
  } else if (
    ["requested", "pending", "pending confirmation", "awaiting approval", "under review", "in investigation", "calculated", "submitted"].includes(normalized)
  ) {
    badgeClass = "bg-[#fef3c7] text-[var(--status-warning)]";
  } else if (
    ["in progress", "started", "on the way", "processing", "rescheduled", "escalated", "partially adjusted", "partially refunded"].includes(normalized)
  ) {
    badgeClass = "bg-[var(--status-info)] text-[#c2410c]";
  } else if (
    ["rejected", "cancelled", "failed", "suspended", "restricted", "removed", "closed"].includes(normalized)
  ) {
    badgeClass = "bg-[#fee2e2] text-[var(--status-error)]";
  } else if (
    ["disputed", "on hold", "flagged"].includes(normalized)
  ) {
    badgeClass = "bg-[#fef3c7] text-[var(--status-warning)]";
  }

  return (
    <span className={`inline-flex items-center rounded-full px-[0.6rem] py-1 text-xs font-semibold ${badgeClass}`}>
      <span className="h-[6px] w-[6px] rounded-full bg-current" />
      {status}
    </span>
  );
}
