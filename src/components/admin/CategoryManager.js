"use client";
import { useState } from "react";
import useApi from "@/utils/useApi";
import { categoryService } from "@/services/categoryService";
import { ui } from "@/utils/ui";
import StatusBadge from "@/components/common/CatalogueStatusBadge";
import CategoryIcon from "@/components/customer/CategoryIcon";
import CategoryForm from "./CategoryForm";
import FormDialog from "./FormDialog";

const smBtn = ui.btnSm;

function Stat({ label, value, tone = "text-ink" }) {
  return (
    <div className={ui.stat}>
      <div className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</div>
      <div className={`mt-1 text-2xl font-bold ${tone}`}>{value}</div>
    </div>
  );
}

export default function CategoryManager() {
  const [version, setVersion] = useState(0);
  const [editing, setEditing] = useState(null); // null = closed, {} = new, category = edit
  const [notice, setNotice] = useState("");
  const [actionError, setActionError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data, loading, error } = useApi(
    () => categoryService.getAllCategoriesAdmin({ status: "all" }),
    [version]
  );
  const categories = data || [];
  const nameById = Object.fromEntries(categories.map((c) => [c._id, c.name]));
  const refresh = () => setVersion((v) => v + 1);

  // Parents first, each followed by its sub-categories
  const roots = categories.filter((c) => !c.parent_category_id);
  const ordered = roots.flatMap((r) => [
    r,
    ...categories.filter((c) => String(c.parent_category_id) === String(r._id)),
  ]);
  const seen = new Set(ordered.map((c) => c._id));
  categories.forEach((c) => { if (!seen.has(c._id)) ordered.push(c); });

  const visible = ordered.filter(
    (c) =>
      (statusFilter === "all" || c.status === statusFilter) &&
      (!search || c.name.toLowerCase().includes(search.toLowerCase()))
  );

  const activeCount = categories.filter((c) => c.status === "Active").length;

  async function toggleStatus(c) {
    const next = c.status === "Active" ? "Inactive" : "Active";
    if (next === "Inactive" && !window.confirm(`Deactivate "${c.name}"? Its services will be hidden from customers.`)) return;
    setNotice(""); setActionError("");
    try {
      await categoryService.setCategoryStatus(c._id, next);
      setNotice(`"${c.name}" is now ${next}.`);
      refresh();
    } catch (e) {
      setActionError(e.message);
    }
  }

  function onSaved(saved, wasEditing) {
    setEditing(null);
    setNotice(`Category "${saved.name}" ${wasEditing ? "updated" : "created"}.`);
    refresh();
  }

  return (
    <div>
      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <Stat label="Total categories" value={categories.length} />
        <Stat label="Active" value={activeCount} tone="text-success" />
        <Stat label="Inactive" value={categories.length - activeCount} tone="text-muted" />
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <input
          className={`${ui.input} min-w-48 flex-1`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search categories…"
          aria-label="Search categories"
        />
        <select
          className={`${ui.input} w-full sm:w-40`}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          aria-label="Filter by status"
        >
          <option value="all">All statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button className={ui.btnPrimary} onClick={() => setEditing({})}>+ New category</button>
      </div>

      {notice && <div className={ui.alertSuccess} role="status">{notice}</div>}
      {(error || actionError) && <div className={ui.alertError} role="alert">{error || actionError}</div>}

      <div className="overflow-hidden rounded-xl border border-line bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={ui.th}>Category</th>
                <th className={ui.th}>Parent</th>
                <th className={ui.th}>Status</th>
                <th className={`${ui.th} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody className="[&>tr:last-child>td]:border-b-0">
              {loading && (
                <tr><td colSpan={4} className={`${ui.td} py-10 text-center text-muted`}>Loading categories…</td></tr>
              )}
              {!loading && visible.length === 0 && (
                <tr><td colSpan={4} className={`${ui.td} py-10 text-center text-muted`}>No categories found.</td></tr>
              )}
              {visible.map((c) => {
                const isChild = Boolean(c.parent_category_id);
                return (
                  <tr key={c._id} className={ui.tr}>
                    <td className={ui.td}>
                     <div className={`flex items-center gap-3 ${isChild ? "ml-5 border-l-2 border-accent pl-3" : ""}`}>
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-surface text-lg">
                          <CategoryIcon category={c} />
                        </div>
                        <div className="min-w-0">
                          <div className="truncate font-semibold">{c.name}</div>
                          <div className="truncate text-xs text-muted">/{c.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className={`${ui.td} text-muted`}>
                      {nameById[c.parent_category_id] ? (
                        <span className={ui.chip}>{nameById[c.parent_category_id]}</span>
                      ) : "—"}
                    </td>
                    <td className={ui.td}><StatusBadge status={c.status} /></td>
                    <td className={ui.td}>
                      <div className="flex flex-wrap justify-end gap-1.5">
                        <button className={`${ui.btnOutline} ${smBtn}`} onClick={() => setEditing(c)}>Edit</button>
                        {c.status === "Active" ? (
                          <button className={`${ui.btnDanger} ${smBtn}`} onClick={() => toggleStatus(c)}>Deactivate</button>
                        ) : (
                          <button className={`${ui.btnSuccess} ${smBtn}`} onClick={() => toggleStatus(c)}>Activate</button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <FormDialog open={Boolean(editing)} onClose={() => setEditing(null)}>
        {editing && (
          <CategoryForm
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