// { q: "tap", page: 2, category_id: "" } -> "?q=tap&page=2"  (empty values are dropped)
export function toQuery(params = {}) {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") sp.set(k, v);
  });
  const s = sp.toString();
  return s ? `?${s}` : "";
}