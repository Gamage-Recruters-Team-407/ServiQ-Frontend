"use client";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ui } from "@/utils/ui";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import ProgressTimeline, { StatusHistory } from "@/components/completion/ProgressTimeline";
import ProviderProgressPanel from "@/components/completion/ProviderProgressPanel";
import CompletionSummary from "@/components/completion/CompletionSummary";
import EmptyState from "@/components/common/EmptyState";
import useCompletion from "@/utils/useCompletion";
import { completionService } from "@/services/completionService";
import { USER_ROLES } from "@/utils/constants";

export default function ProviderCompletionDetailPage() {
  const { bookingId } = useParams();
  const { completion, loading, error, notFound, setCompletion, reload } = useCompletion(bookingId);
  const [starting, setStarting] = useState(false);
  const [startError, setStartError] = useState("");

  async function startTracking() {
    setStarting(true);
    setStartError("");
    try {
      const res = await completionService.startTracking(bookingId);
      setCompletion(res.data);
    } catch (e) {
      if (e.code === "ALREADY_EXISTS") reload();
      else setStartError(e.message);
    } finally {
      setStarting(false);
    }
  }

  return (
    <ProtectedRoute allowedRoles={[USER_ROLES.PROVIDER]}>
      <div className="rounded-2xl bg-white p-6 text-ink shadow-sm">
        <Link href="/provider/completions" className="text-sm text-muted hover:text-primary">← Back to service progress</Link>
        <h1 className="portal-title mt-2">Job Progress</h1>

        <div className="mt-6">
          {loading ? (
            <div className="space-y-4" aria-busy="true">
              <div className="h-40 animate-pulse rounded-xl bg-surface" />
              <div className="h-56 animate-pulse rounded-xl bg-surface" />
            </div>
          ) : error ? (
            <div className={ui.alertError} role="alert">{error}</div>
          ) : notFound ? (
            <EmptyState title="Tracking hasn't started for this booking" message="Start tracking to update progress and keep the customer informed. Only accepted or confirmed bookings can be tracked.">
              {startError && <div className={ui.alertError} role="alert">{startError}</div>}
              <button type="button" onClick={startTracking} disabled={starting} className={ui.btnPrimary}>
                {starting ? "Starting…" : "Start tracking"}
              </button>
            </EmptyState>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
              <div className="space-y-6">
                <div className={ui.card}>
                  <ProgressTimeline status={completion.status} history={completion.status_history} percent={completion.progress_percent} />
                </div>
                <ProviderProgressPanel key={`${completion.status}-${completion.updated_at}`} completion={completion} onChanged={setCompletion} />
              </div>
              <div className="space-y-6">
                <CompletionSummary completion={completion} viewer="provider" />
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
