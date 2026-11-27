// Presentation helpers for notifications (icon, colour, link target, grouping by day).

const META = {
  "Account Registration": { icon: "👋", tone: "brand" },
  "Booking Request": { icon: "📩", tone: "info" },
  "Booking Acceptance or Rejection": { icon: "📅", tone: "success" },
  "Schedule or Service Update": { icon: "🕒", tone: "info" },
  "Payment Status Change": { icon: "💳", tone: "warning" },
  "Service Completion": { icon: "✅", tone: "success" },
  "Review Request": { icon: "⭐", tone: "warning" },
  "Dispute Update": { icon: "⚖️", tone: "danger" },
  "Earnings Update": { icon: "💰", tone: "success" },
  "Payout Update": { icon: "🏦", tone: "info" },
  Other: { icon: "🔔", tone: "brand" }
};

export function getEventMeta(eventType) {
  return META[eventType] || META.Other;
}

const BOOKING_EVENTS = [
  "Booking Request",
  "Booking Acceptance or Rejection",
  "Schedule or Service Update",
  "Service Completion"
];

// Where "View" should go for a customer. Returns null when there is nothing sensible to open.
export function getNotificationHref(n) {
  if (BOOKING_EVENTS.includes(n.event_type) && n.related_record_id) return `/bookings/${n.related_record_id}`;
  switch (n.event_type) {
    case "Booking Request":
    case "Booking Acceptance or Rejection":
    case "Schedule or Service Update":
    case "Payment Status Change":
      return "/customer/bookings";
    case "Service Completion":
    case "Review Request":
      return "/customer/reviews";
    case "Dispute Update":
      return "/customer/disputes";
    default:
      return null;
  }
}

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

// Group (already sorted) notifications into Today / Yesterday / Earlier this week / Older.
export function groupByDay(items, now = new Date()) {
  const today = startOfDay(now);
  const day = 24 * 60 * 60 * 1000;
  const buckets = [
    { label: "Today", items: [] },
    { label: "Yesterday", items: [] },
    { label: "Earlier this week", items: [] },
    { label: "Older", items: [] }
  ];
  for (const n of items) {
    const t = new Date(n.created_at).getTime();
    const start = isNaN(t) ? 0 : startOfDay(new Date(t));
    if (start >= today) buckets[0].items.push(n);
    else if (start >= today - day) buckets[1].items.push(n);
    else if (start >= today - 6 * day) buckets[2].items.push(n);
    else buckets[3].items.push(n);
  }
  return buckets.filter((b) => b.items.length);
}
