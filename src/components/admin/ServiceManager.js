"use client";
import { useState } from "react";
import useApi from "@/utils/useApi";
import { categoryService } from "@/services/categoryService";
import { serviceService } from "@/services/serviceService";
import { SERVICE_STATUSES, SERVICE_STATUS_TRANSITIONS, formatPrice } from "@/utils/catalogue";
import { ui } from "@/utils/ui";
import StatusBadge from "@/components/common/CatalogueStatusBadge";
import Pagination from "@/components/common/Pagination";
import ServiceForm from "./ServiceForm";
import FormDialog from "./FormDialog";

export default function ServiceManager() {
  const [version, setVersion] = useState(0);
  const [editing, setEditing] = useState(null);
  const [notice, setNotice] = useState("");
  const [actionError, setActionError] = useState("");

  const [q, setQ] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState("all");
  const [applied, setApplied] = useState({ q: "", category_id: "", status: "all" });
  const [page, setPage] = useState(1);

  const cats = useApi(() => categoryService.getAllCategoriesAdmin({ status: "all" }), []);
  const services = useApi(
    () => serviceService.getAllServicesAdmin({ ...applied, page, limit: 10 }),
    [applied.q, applied.category_id, applied.status, page, version]
  );

  const categories = cats.data || [];
  const items = services.data || [];
  const refresh = () => setVersion((v) => v + 1);

  function applyFilters(e) {
    e.preventDefault();
    setApplied({ q: q.trim(), category_id: categoryId, status });
    setPage(1);
  }
  function resetFilters() {
    setQ(""); setCategoryId(""); setStatus("all");
    setApplied({ q: "", category_id: "", status: "all" });
    setPage(1);
  }

  async function changeStatus(s, next) {
    if (!next) return;
    if (next === "Archived" && !window.confirm(`Archive "${s.name}"? It will be hidden from customers.`)) return;
    setNotice(""); setActionError("");
    try {
      await serviceService.changeServiceStatus(s._id, next);
      setNotice(`"${s.name}" is now ${next}.`);
      refresh();
    } catch (e) {
      setActionError(e.message);
    }
  }

  function onSaved(saved, wasEditing) {
    setEditing(null);
    setNotice(`Service "${saved.name}" ${wasEditing ? "updated" : "created"}.`);
    refresh();
  }

  return (
    <div>
      <form className={`${ui.card} mb-4 flex flex-wrap items-center gap-2`} onSubmit={applyFilters} role="search">
        <input
          className={`${ui.input} min-w-48 flex-1`}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search services…"
          aria-label="Search services"
        />
        <select className={`${ui.input} w-full sm:w-44`} value={categoryId} onChange={(e) => setCategoryId(e.target.value)} aria-label="Category">
          <option value="">All categories</option>
          {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
        <select className={`${ui.input} w-full sm:w-44`} value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Status">
          <option value="all">All statuses</option>
          {SERVICE_STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
        <button className={ui.btnPrimary}>Filter</button>
        <button type="button" className={ui.btnOutline} onClick={resetFilters}>Reset</button>
      </form>

      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm text-muted">
          <span className="font-semibold text-ink">{services.meta?.total ?? 0}</span> services
        </p>
        <button className={ui.btnPrimary} onClick={() => setEditing({})}>+ New service</button>
      </div>

      {notice && <div className={ui.alertSuccess} role="status">{notice}</div>}
      {(services.error || actionError) && (
        <div className={ui.alertError} role="alert">{services.error || actionError}</div>
      )}

      <div className="overflow-hidden rounded-xl border border-line bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={ui.th}>Service</th>
                <th className={ui.th}>Category</th>
                <th className={ui.th}>Price</th>
                <th className={ui.th}>Status</th>
                <th className={`${ui.th} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody className="[&>tr:last-child>td]:border-b-0">
              {services.loading && (
                <tr><td colSpan={5} className={`${ui.td} py-10 text-center text-muted`}>Loading services…</td></tr>
              )}
              {!services.loading && items.length === 0 && (
                <tr><td colSpan={5} className={`${ui.td} py-10 text-center text-muted`}>No services found.</td></tr>
              )}
              {items.map((s) => (
                <tr key={s._id} className={ui.tr}>
                  <td className={ui.td}>
                    <div className="font-semibold">{s.name}</div>
                    <div className="text-xs text-muted">
                      {s.coverage?.coverage_area ? `${s.coverage.coverage_area} · ` : ""}
                      Provider …{String(s.provider_id).slice(-6)}
                    </div>
                  </td>
                  <td className={ui.td}>
                    {s.category_id?.name ? <span className={ui.chip}>{s.category_id.name}</span> : "—"}
                  </td>
                  <td className={`${ui.td} whitespace-nowrap font-semibold`}>{formatPrice(s.price)}</td>
                  <td className={ui.td}><StatusBadge status={s.status} /></td>
                  <td className={ui.td}>
                    <div className="flex flex-wrap items-center justify-end gap-1.5">
                      <button className={`${ui.btnOutline} ${ui.btnSm}`} onClick={() => setEditing(s)}>Edit</button>
                      <select
                        className={`${ui.input} w-auto! py-1.5! text-sm`}
                        value=""
                        onChange={(e) => changeStatus(s, e.target.value)}
                        aria-label={`Change status of ${s.name}`}
                      >
                        <option value="">Change status…</option>
                        {(SERVICE_STATUS_TRANSITIONS[s.status] || []).map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination page={page} pages={services.meta?.pages} onChange={setPage} />

      <FormDialog open={Boolean(editing)} onClose={() => setEditing(null)}>
        {editing && (
          <ServiceForm
            key={editing._id || "new"}
            initial={editing._id ? editing : null}
            categories={categories}
            onSaved={onSaved}
            onCancel={() => setEditing(null)}
          />
        )}
      </FormDialog>
    </div>
  );
}