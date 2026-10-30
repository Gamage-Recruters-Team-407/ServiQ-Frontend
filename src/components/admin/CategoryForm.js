"use client";
import { useState } from "react";
import { categoryService } from "@/services/categoryService";
import { CATEGORY_STATUSES } from "@/utils/catalogue";
import { ui } from "@/utils/ui";

export default function CategoryForm({ initial = null, categories = [], onSaved, onCancel }) {
  const editing = Boolean(initial?._id);
  const [form, setForm] = useState({
    name: initial?.name || "",
    description: initial?.description || "",
    parent_category_id: initial?.parent_category_id || "",
    status: initial?.status || "Active",
    icon_url: initial?.icon_url || "",
    image_url: initial?.image_url || "",
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const parents = categories.filter((c) => !c.parent_category_id && c._id !== initial?._id);

  async function submit(e) {
    e.preventDefault();
    setBusy(true); setError(""); setFieldErrors({});
    try {
      const body = {
        ...form,
        parent_category_id: form.parent_category_id || null,
        icon_url: form.icon_url || null,
        image_url: form.image_url || null,
      };
      const res = editing
        ? await categoryService.updateCategory(initial._id, body)
        : await categoryService.createCategory(body);
      onSaved?.(res.data, editing);
    } catch (err) {
      setError(err.message);
      setFieldErrors(err.details || {});
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="grid gap-3.5" onSubmit={submit} noValidate>
      <h3 className="text-lg font-semibold">{editing ? "Edit category" : "New category"}</h3>
      {error && <div className={ui.alertError} role="alert">{error}</div>}

      <div>
        <label htmlFor="cat-name" className={ui.label}>Name *</label>
        <input id="cat-name" className={ui.input} value={form.name} onChange={set("name")} required />
        {fieldErrors.name && <div className={ui.fieldError}>{fieldErrors.name}</div>}
      </div>

      <div>
        <label htmlFor="cat-desc" className={ui.label}>Description</label>
        <textarea id="cat-desc" className={`${ui.input} min-h-24 resize-y`} value={form.description} onChange={set("description")} />
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <div>
          <label htmlFor="cat-parent" className={ui.label}>Parent category</label>
          <select id="cat-parent" className={ui.input} value={form.parent_category_id} onChange={set("parent_category_id")}>
            <option value="">None (top level)</option>
            {parents.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
          {fieldErrors.parent_category_id && <div className={ui.fieldError}>{fieldErrors.parent_category_id}</div>}
        </div>
        <div>
          <label htmlFor="cat-status" className={ui.label}>Status</label>
          <select id="cat-status" className={ui.input} value={form.status} onChange={set("status")}>
            {CATEGORY_STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="cat-icon" className={ui.label}>Icon URL</label>
        <input id="cat-icon" className={ui.input} value={form.icon_url} onChange={set("icon_url")} placeholder="https://..." />
        <div className={ui.hint}>Optional. A default icon is used when empty.</div>
      </div>
      <div>
        <label htmlFor="cat-img" className={ui.label}>Image URL</label>
        <input id="cat-img" className={ui.input} value={form.image_url} onChange={set("image_url")} placeholder="https://..." />
      </div>

      <div className="flex flex-wrap gap-2">
        <button className={ui.btnPrimary} disabled={busy}>
          {busy ? "Saving…" : editing ? "Save changes" : "Create category"}
        </button>
        {onCancel && <button type="button" className={ui.btnOutline} onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}