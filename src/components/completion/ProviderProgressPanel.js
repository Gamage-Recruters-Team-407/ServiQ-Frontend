"use client";
import { useState } from "react";
import { ui } from "@/utils/ui";
import { completionService } from "@/services/completionService";

const MIN_COMPLETION_NOTES = 10;
const MIN_CANCEL_REASON = 5;
const MAX_EVIDENCE = 5;

const STEP_LABEL = {
  Confirmed: "Confirm job",
  "On the Way": "I'm on the way",
  Started: "Start service",
  "In Progress": "Mark in progress"
};

function parseEvidence(text) {
  const urls = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (urls.length > MAX_EVIDENCE) return { error: `Add at most ${MAX_EVIDENCE} evidence links.` };
  const bad = urls.find((u) => !/^https?:\/\/\S+$/i.test(u));
  if (bad) return { error: `"${bad}" is not a valid http(s) link.` };
  return { urls };
}

// Provider controls: next-step buttons, completion form (notes + evidence) and cancel form.
export default function ProviderProgressPanel({ completion, onChanged }) {
  const [mode, setMode] = useState("idle"); // idle | complete | cancel
  const [notes, setNotes] = useState(completion.completion_notes || "");
  const [evidence, setEvidence] = useState((completion.evidence_urls || []).join("\n"));
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");

  const next = completion.allowed_next_statuses || [];
  const stepActions = next.filter((s) => STEP_LABEL[s]);
  const canComplete = next.includes("Completed");
  const canCancel = next.includes("Cancelled");
  const finished = next.length === 0;

  async function run(fn) {
    setBusy(true);
    setError("");
    setSaved("");
    try {
      const res = await fn();
      onChanged(res.data);
      setMode("idle");
      return true;
    } catch (e) {
      setError(e.message);
      return false;
    } finally {
      setBusy(false);
    }
  }

  const goTo = (status) => run(() => completionService.updateStatus(completion.id, status));

  async function submitComplete(e) {
    e.preventDefault();
    if (notes.trim().length < MIN_COMPLETION_NOTES) return setError(`Completion notes must be at least ${MIN_COMPLETION_NOTES} characters.`);
    const ev = parseEvidence(evidence);
    if (ev.error) return setError(ev.error);
    await run(() => completionService.updateStatus(completion.id, "Completed", { notes: notes.trim(), evidenceUrls: ev.urls }));
  }

  async function submitCancel(e) {
    e.preventDefault();
    if (reason.trim().length < MIN_CANCEL_REASON) return setError("Please give a short reason for cancelling.");
    await run(() => completionService.updateStatus(completion.id, "Cancelled", { notes: reason.trim() }));
  }

  async function saveDetails() {
    const ev = parseEvidence(evidence);
    if (ev.error) return setError(ev.error);
    if (!notes.trim() && !ev.urls.length) return setError("Add notes or an evidence link to save.");
    const ok = await run(() => completionService.updateDetails(completion.id, { notes: notes.trim() || undefined, evidenceUrls: ev.urls }));
    if (ok) setSaved("Details saved.");
  }

  return (
    <div className={ui.card}>
      <h2 className="mb-1 text-lg font-semibold">Update progress</h2>
      {finished ? (
        <p className="text-sm text-muted">
          {completion.status === "Completed"
            ? completion.requires_customer_confirmation && !completion.customer_confirmed
              ? "Marked as completed. Waiting for the customer to confirm."
              : "This job is complete."
            : `This job is ${completion.status.toLowerCase()}. No further updates are possible.`}
        </p>
      ) : (
        <p className="mb-4 text-sm text-muted">Each update notifies the customer.</p>
      )}

      {error && <div className={`${ui.alertError} mt-3`} role="alert">{error}</div>}
      {saved && <div className={`${ui.alertSuccess} mt-3`} role="status">{saved}</div>}

      {mode === "idle" && !finished && (
        <div className="flex flex-wrap gap-2.5">
          {stepActions.map((s, i) => (
            <button key={s} type="button" disabled={busy} onClick={() => goTo(s)} className={i === 0 ? ui.btnPrimary : ui.btnOutline}>
              {busy ? "Saving…" : STEP_LABEL[s]}
            </button>
          ))}
          {canComplete && (
            <button type="button" disabled={busy} onClick={() => { setError(""); setMode("complete"); }} className={ui.btnSuccess}>
              Mark as completed
            </button>
          )}
          {canCancel && (
            <button type="button" disabled={busy} onClick={() => { setError(""); setMode("cancel"); }} className={ui.btnDanger}>
              Cancel job
            </button>
          )}
        </div>
      )}

      {mode === "complete" && (
        <form onSubmit={submitComplete} className="space-y-4">
          <div>
            <label htmlFor="notes" className={ui.label}>Completion notes <span className="text-danger">*</span></label>
            <textarea id="notes" rows={4} maxLength={2000} value={notes} onChange={(e) => setNotes(e.target.value)} className={ui.input} placeholder="Describe the work you completed" />
            <p className={ui.hint}>{notes.trim().length}/2000, minimum {MIN_COMPLETION_NOTES} characters</p>
          </div>
          <div>
            <label htmlFor="evidence" className={ui.label}>Evidence links (optional)</label>
            <textarea id="evidence" rows={3} value={evidence} onChange={(e) => setEvidence(e.target.value)} className={ui.input} placeholder={"One link per line, e.g. https://…/photo.jpg"} />
            <p className={ui.hint}>Photos or documents of the finished work. Up to {MAX_EVIDENCE} links.</p>
          </div>
          <div className="flex gap-2.5">
            <button type="submit" disabled={busy} className={ui.btnPrimary}>{busy ? "Submitting…" : "Submit completion"}</button>
            <button type="button" disabled={busy} onClick={() => setMode("idle")} className={ui.btnOutline}>Back</button>
          </div>
        </form>
      )}

      {mode === "cancel" && (
        <form onSubmit={submitCancel} className="space-y-4">
          <div>
            <label htmlFor="reason" className={ui.label}>Reason for cancelling <span className="text-danger">*</span></label>
            <textarea id="reason" rows={3} maxLength={2000} value={reason} onChange={(e) => setReason(e.target.value)} className={ui.input} placeholder="The customer will see this reason" />
          </div>
          <div className="flex gap-2.5">
            <button type="submit" disabled={busy} className={ui.btnDanger}>{busy ? "Cancelling…" : "Confirm cancellation"}</button>
            <button type="button" disabled={busy} onClick={() => setMode("idle")} className={ui.btnOutline}>Keep job</button>
          </div>
        </form>
      )}

      {mode === "idle" && !finished && !canComplete && (
        <details className="mt-5 border-t border-line pt-4">
          <summary className="cursor-pointer text-sm font-semibold">Add notes or evidence</summary>
          <div className="mt-3 space-y-3">
            <textarea aria-label="Notes" rows={3} maxLength={2000} value={notes} onChange={(e) => setNotes(e.target.value)} className={ui.input} placeholder="Progress notes for the customer" />
            <textarea aria-label="Evidence links" rows={2} value={evidence} onChange={(e) => setEvidence(e.target.value)} className={ui.input} placeholder="Evidence links, one per line" />
            <button type="button" disabled={busy} onClick={saveDetails} className={`${ui.btnOutline} ${ui.btnSm}`}>Save details</button>
          </div>
        </details>
      )}
    </div>
  );
}
