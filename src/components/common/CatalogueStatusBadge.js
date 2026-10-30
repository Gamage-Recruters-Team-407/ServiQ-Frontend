const STYLES = {
  Active: { badge: "bg-green-50 text-success ring-green-200", dot: "bg-success" },
  Inactive: { badge: "bg-slate-50 text-muted ring-slate-200", dot: "bg-slate-400" },
  Archived: { badge: "bg-slate-50 text-muted ring-slate-200", dot: "bg-slate-400" },
  "Temporarily Unavailable": { badge: "bg-info text-warning ring-orange-200", dot: "bg-warning" },
};

// Status badge for catalogue (categories + services), styled with the Orange & White palette
export default function CatalogueStatusBadge({ status }) {
  const s = STYLES[status] || STYLES.Inactive;
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${s.badge}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}