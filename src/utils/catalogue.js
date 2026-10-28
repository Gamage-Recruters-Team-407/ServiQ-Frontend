// Must match backend src/constants/enums.js
export const CATEGORY_STATUSES = ["Active", "Inactive"];
export const SERVICE_STATUSES = ["Active", "Inactive", "Temporarily Unavailable", "Archived"];
export const PRICING_TYPES = ["Fixed", "Hourly", "Quote"];

export function formatPrice(price) {
  if (!price || price.pricing_type === "Quote") return "Price on request";
  if (price.amount == null) return "Price on request";
  const amount = Number(price.amount).toLocaleString("en-US", { maximumFractionDigits: 2 });
  return `${price.currency || "LKR"} ${amount}${price.pricing_type === "Hourly" ? " / hour" : ""}`;
}

// Allowed next statuses (must match backend serviceService.js)
export const SERVICE_STATUS_TRANSITIONS = {
  Active: ["Inactive", "Temporarily Unavailable", "Archived"],
  Inactive: ["Active", "Archived"],
  "Temporarily Unavailable": ["Active", "Inactive", "Archived"],
  Archived: ["Inactive"],
};