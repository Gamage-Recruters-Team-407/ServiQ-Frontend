const STYLES = {
  Active: { badge: "bg-green-50 text-green-700 ring-green-200", dot: "bg-green-600" },
  Inactive: { badge: "bg-slate-50 text-slate-500 ring-slate-200", dot: "bg-slate-400" },
  Archived: { badge: "bg-slate-50 text-slate-500 ring-slate-200", dot: "bg-slate-400" },
  "Temporarily Unavailable": { badge: "bg-orange-100 text-amber-700 ring-orange-200", dot: "bg-amber-600" },
};

// Status badge for catalogue (categories + services)
export default function CatalogueStatusBadge({ status }) {
  const s = STYLES[status] || STYLES.Inactive;
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${s.badge}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}