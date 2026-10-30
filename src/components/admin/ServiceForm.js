"use client";
// Reusable. Admin uses it as-is; the provider module can pass isProvider to hide admin-only fields.
import { useState } from "react";
import { serviceService } from "@/services/serviceService";
import { PRICING_TYPES, SERVICE_STATUSES, SERVICE_STATUS_TRANSITIONS } from "@/utils/catalogue";
import { ui } from "@/utils/ui";

export default function ServiceForm({ initial = null, categories = [], isProvider = false, onSaved, onCancel }) {
  const editing = Boolean(initial?._id);
  const [form, setForm] = useState({
    name: initial?.name || "",
    description: initial?.description || "",
    category_id: initial?.category_id?._id || initial?.category_id || "",
    provider_id: initial?.provider_id || "",
    status: initial?.status || "Active",
    amount: initial?.price?.amount != null ? String(initial.price.amount) : "",
    currency: initial?.price?.currency || "LKR",
    pricing_type: initial?.price?.pricing_type || "Fixed",
    coverage_area: initial?.coverage?.coverage_area || "",
    supported_locations: (initial?.coverage?.supported_locations || []).join(", "),
    radius_km: String(initial?.coverage?.radius_km ?? 0),
    duration_minutes: String(initial?.duration_minutes ?? 60),
    availability_info: initial?.availability_info || "",
    images: (initial?.images || []).join(", "),
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  // Only Active categories can be chosen (keep the current one when editing)
  const categoryOptions = categories.filter((c) => c.status === "Active" || c._id === form.category_id);
  // When editing, only allow valid status changes
  const statusOptions = editing
    ? [initial.status, ...(SERVICE_STATUS_TRANSITIONS[initial.status] || [])]
    : SERVICE_STATUSES;

  async function submit(e) {
    e.preventDefault();
    setBusy(true); setError(""); setFieldErrors({});
    try {
      const body = {
        name: form.name,
        description: form.description,
        category_id: form.category_id,
        price: {
          // "Quote" services have no fixed price: store 0
          amount: form.pricing_type === "Quote" && form.amount === "" ? 0 : form.amount,
          currency: form.currency,
          pricing_type: form.pricing_type,
        },
        coverage: {
          coverage_area: form.coverage_area,
          supported_locations: form.supported_locations,
          radius_km: Number(form.radius_km) || 0,
        },
        duration_minutes: Number(form.duration_minutes) || 60,
        availability_info: form.availability_info,
        images: form.images,
      };
      if (!isProvider) {
        body.status = form.status;
        body.provider_id = form.provider_id;
      }
      const res = editing
        ? await serviceService.updateService(initial._id, body)
        : await serviceService.createService(body);
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
      <h3 className="text-lg font-semibold">{editing ? "Edit service" : "New service"}</h3>
      {error && <div className={ui.alertError} role="alert">{error}</div>}

      <div>
        <label htmlFor="svc-name" className={ui.label}>Service name *</label>
        <input id="svc-name" className={ui.input} value={form.name} onChange={set("name")} required />
        {fieldErrors.name && <div className={ui.fieldError}>{fieldErrors.name}</div>}
      </div>

      <div>
        <label htmlFor="svc-cat" className={ui.label}>Category *</label>
        <select id="svc-cat" className={ui.input} value={form.category_id} onChange={set("category_id")} required>
          <option value="">Select a category</option>
          {categoryOptions.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
        {fieldErrors.category_id && <div className={ui.fieldError}>{fieldErrors.category_id}</div>}
      </div>

      {!isProvider && (
        <div>
          <label htmlFor="svc-prov" className={ui.label}>Provider ID *</label>
          <input id="svc-prov" className={ui.input} value={form.provider_id} onChange={set("provider_id")} placeholder="Provider ObjectId" />
          {fieldErrors.provider_id && <div className={ui.fieldError}>{fieldErrors.provider_id}</div>}
          <div className={ui.hint}>Temporary: paste the provider&apos;s ID. This becomes a provider dropdown once the provider module is ready.</div>
        </div>
      )}

      <div>
        <label htmlFor="svc-desc" className={ui.label}>Description *</label>
        <textarea id="svc-desc" className={`${ui.input} min-h-24 resize-y`} value={form.description} onChange={set("description")} />
        {fieldErrors.description && <div className={ui.fieldError}>{fieldErrors.description}</div>}
      </div>

      <div className="grid gap-3.5 sm:grid-cols-3">
        <div>
          <label htmlFor="svc-ptype" className={ui.label}>Pricing type</label>
          <select id="svc-ptype" className={ui.input} value={form.pricing_type} onChange={set("pricing_type")}>
            {PRICING_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="svc-amount" className={ui.label}>Amount</label>
          <input id="svc-amount" type="number" min="0" step="0.01" className={ui.input} value={form.amount} onChange={set("amount")} />
          {fieldErrors["price.amount"] && <div className={ui.fieldError}>{fieldErrors["price.amount"]}</div>}
        </div>
        <div>
          <label htmlFor="svc-cur" className={ui.label}>Currency</label>
          <input id="svc-cur" className={ui.input} value={form.currency} onChange={set("currency")} maxLength={3} />
        </div>
      </div>
      <div className={`${ui.hint} -mt-2`}>Leave the amount empty for &quot;Quote&quot; services.</div>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <div>
          <label htmlFor="svc-area" className={ui.label}>Coverage area</label>
          <input id="svc-area" className={ui.input} value={form.coverage_area} onChange={set("coverage_area")} placeholder="Negombo" />
        </div>
        <div>
          <label htmlFor="svc-radius" className={ui.label}>Radius (km)</label>
          <input id="svc-radius" type="number" min="0" className={ui.input} value={form.radius_km} onChange={set("radius_km")} />
        </div>
      </div>

      <div>
        <label htmlFor="svc-locs" className={ui.label}>Supported locations</label>
        <input id="svc-locs" className={ui.input} value={form.supported_locations} onChange={set("supported_locations")} placeholder="Negombo, Colombo, Gampaha" />
        <div className={ui.hint}>Separate with commas.</div>
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <div>
          <label htmlFor="svc-dur" className={ui.label}>Duration (minutes)</label>
          <input id="svc-dur" type="number" min="1" className={ui.input} value={form.duration_minutes} onChange={set("duration_minutes")} />
        </div>
        {!isProvider && (
          <div>
            <label htmlFor="svc-status" className={ui.label}>Status</label>
            <select id="svc-status" className={ui.input} value={form.status} onChange={set("status")}>
              {statusOptions.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        )}
      </div>

      <div>
        <label htmlFor="svc-avail" className={ui.label}>Availability info</label>
        <input id="svc-avail" className={ui.input} value={form.availability_info} onChange={set("availability_info")} placeholder="Mon–Sat, 8am–6pm" />
      </div>

      <div>
        <label htmlFor="svc-img" className={ui.label}>Image URLs</label>
        <input id="svc-img" className={ui.input} value={form.images} onChange={set("images")} placeholder="https://..., https://..." />
        <div className={ui.hint}>Separate with commas. Optional.</div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button className={ui.btnPrimary} disabled={busy}>
          {busy ? "Saving…" : editing ? "Save changes" : "Create service"}
        </button>
        {onCancel && <button type="button" className={ui.btnOutline} onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}