"use client";
import { useState } from "react";
import Link from "next/link";
import { ui } from "@/utils/ui";
import useApi from "@/utils/useApi";
import { completionService } from "@/services/completionService";
import StatusBadge from "@/components/common/StatusBadge";
import EmptyState from "@/components/common/EmptyState";
import Pagination from "@/components/common/Pagination";
import { formatDateTime } from "@/utils/formatters";

const TABS = [
  { key: "active", label: "Active" },
  { key: "finished", label: "Finished" },
  { key: "", label: "All" }
];

// viewer: "provider" shows the customer column, "customer" shows the provider column.
export default function CompletionList({ viewer, basePath }) {
  const [scope, setScope] = useState("active");
  const [page, setPage] = useState(1);
  const { data, meta, loading, error } = useApi(() => completionService.list({ scope, page, limit: 10 }), [scope, page]);
  const otherParty = viewer === "provider" ? "Customer" : "Provider";

  return (
    <div>
      <div className="mb-5 flex gap-2" role="tablist" aria-label="Filter jobs">
        {TABS.map((t) => (
          <button
            key={t.label}
            role="tab"
            aria-selected={scope === t.key}
            onClick={() => { setScope(t.key); setPage(1); }}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              scope === t.key ? "border-primary bg-primary text-white" : "border-line bg-white hover:border-primary hover:text-primary"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {error && <div className={ui.alertError} role="alert">{error}</div>}

      {loading ? (
        <div className="space-y-3" aria-busy="true">
          {[0, 1, 2].map((i) => <div key={i} className="h-16 animate-pulse rounded-xl bg-surface" />)}
        </div>
      ) : !data?.length ? (
        <EmptyState
          title={scope === "active" ? "No active jobs" : "Nothing here yet"}
          message={viewer === "provider" ? "Accepted bookings appear here once you start tracking them." : "Progress for your bookings appears here once your provider starts the job."}
        />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr>
                <th className={ui.th}>Service</th>
                <th className={ui.th}>{otherParty}</th>
                <th className={ui.th}>Status</th>
                <th className={ui.th}>Progress</th>
                <th className={ui.th}>Updated</th>
                <th className={ui.th}><span className="sr-only">Open</span></th>
              </tr>
            </thead>
            <tbody>
              {data.map((c) => (
                <tr key={c.id} className={ui.tr}>
                  <td className={ui.td}>
                    <p className="font-medium">{c.booking.service_name || "Service"}</p>
                    <p className="text-xs text-muted">{c.booking.reference}</p>
                  </td>
                  <td className={ui.td}>{(viewer === "provider" ? c.customer.name : c.provider.name) || "—"}</td>
                  <td className={ui.td}><StatusBadge status={c.status} /></td>
                  <td className={ui.td}>
                    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-line">
                      <div className={`h-full ${c.status === "Cancelled" ? "bg-danger" : "bg-primary"}`} style={{ width: `${c.progress_percent}%` }} />
                    </div>
                  </td>
                  <td className={`${ui.td} whitespace-nowrap text-muted`}>{formatDateTime(c.updated_at)}</td>
                  <td className={ui.td}>
                    <Link href={`${basePath}/${c.booking.id}`} className="font-semibold text-primary-dark hover:text-primary">Open →</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Pagination page={meta?.page || page} pages={meta?.pages} onChange={setPage} />
    </div>
  );
}
