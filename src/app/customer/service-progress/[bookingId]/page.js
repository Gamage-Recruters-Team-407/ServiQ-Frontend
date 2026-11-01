"use client";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ui } from "@/utils/ui";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import ProgressTimeline, { StatusHistory } from "@/components/completion/ProgressTimeline";
import CompletionSummary from "@/components/completion/CompletionSummary";
import EmptyState from "@/components/common/EmptyState";
import useCompletion from "@/utils/useCompletion";
import { completionService } from "@/services/completionService";
import { USER_ROLES } from "@/utils/constants";

export default function CustomerServiceProgressDetailPage() {
  const { bookingId } = useParams();
  // Quietly refresh every 15s while the job is still active so the customer sees live progress.
  const { completion, loading, error, notFound, setCompletion } = useCompletion(bookingId, { pollMs: 15000 });
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState("");

  async function confirm() {
    setBusy(true);
    setActionError("");
    try {
      const res = await completionService.confirmCompletion(completion.id);
      setCompletion(res.data);
    } catch (e) {
      setActionError(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <ProtectedRoute allowedRoles={[USER_ROLES.CUSTOMER]}>
      <div className="rounded-2xl bg-white p-6 text-ink shadow-sm">
        <Link href="/customer/service-progress" className="text-sm text-muted hover:text-primary">← Back to service progress</Link>
        <h1 className="portal-title mt-2">Service Progress</h1>

        <div className="mt-6">
          {loading ? (
            <div className="space-y-4" aria-busy="true">
              <div className="h-40 animate-pulse rounded-xl bg-surface" />
              <div className="h-56 animate-pulse rounded-xl bg-surface" />
            </div>
          ) : error ? (
            <div className={ui.alertError} role="alert">{error}</div>
          ) : notFound ? (
            <EmptyState title="Your provider hasn't started this job yet" message="Progress appears here as soon as your provider begins tracking the service. We'll notify you." />
          ) : (
            <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
              <div className="space-y-6">
                <div className={ui.card}>
                  <ProgressTimeline status={completion.status} history={completion.status_history} percent={completion.progress_percent} />
                </div>

                {completion.can_confirm && (
                  <div className="rounded-xl border border-primary bg-info p-5">
                    <h2 className="text-lg font-semibold">Is the work done?</h2>
                    <p className="mt-1 text-sm">Your provider marked this service as completed. Confirm if you are happy with the result.</p>
                    {actionError && <div className={`${ui.alertError} mt-3`} role="alert">{actionError}</div>}
                    <div className="mt-4 flex flex-wrap gap-2.5">
                      <button type="button" onClick={confirm} disabled={busy} className={ui.btnPrimary}>{busy ? "Confirming…" : "Confirm completion"}</button>
                      <Link href="/customer/disputes" className={ui.btnOutline}>Report a problem</Link>
                    </div>
                  </div>
                )}

                {completion.status === "Completed" && completion.review_eligible && (
                  <div className={ui.card}>
                    <h2 className="text-lg font-semibold">How was it?</h2>
                    <p className="mb-3 mt-1 text-sm text-muted">Your feedback helps other customers choose a provider.</p>
                    <Link href="/customer/reviews" className={ui.btnPrimary}>Rate your provider</Link>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <CompletionSummary completion={completion} viewer="customer" />
                <div className={ui.card}>
                  <h2 className="mb-3 text-lg font-semibold">History</h2>
                  <StatusHistory history={completion.status_history} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
