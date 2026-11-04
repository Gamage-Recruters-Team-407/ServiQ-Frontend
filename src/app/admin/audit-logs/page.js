"use client";

import { useEffect, useState } from "react";
import { adminService } from "@/services/adminService";

const PAGE_SIZE = 25;

const EVENT_TYPES = [
  "Authentication and Security",
  "Application",
  "Administrative Audit",
  "Transaction",
  "Integration and Notification",
  "AI Operational",
  "Performance and Availability"
];

const OUTCOMES = ["SUCCESS", "FAILURE", "DENIED"];

const initialFilters = {
  event_type: "",
  outcome: "",
  actor_id: "",
  resource_type: "",
  resource_id: "",
  correlation_reference: "",
  from: "",
  to: ""
};

const inputClass =
  "mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-primary focus:ring-2 focus:ring-accent/50";

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date);
}

function formatOutcome(outcome) {
  if (!outcome) return "Unknown";
  return outcome.charAt(0) + outcome.slice(1).toLowerCase();
}

function outcomeClass(outcome) {
  if (outcome === "SUCCESS") return "border-green-200 bg-green-50 text-success";
  if (outcome === "FAILURE") return "border-red-200 bg-red-50 text-danger";
  if (outcome === "DENIED") return "border-amber-200 bg-amber-50 text-warning";
  return "border-line bg-surface text-muted";
}

function shortId(value) {
  if (!value) return "System";
  const id = typeof value === "object" ? value._id || value.id : value;
  return typeof id === "string" && id.length > 12
    ? `${id.slice(0, 6)}…${id.slice(-4)}`
    : id || "System";
}

function StatePanel({ title, value }) {
  return (
    <div className="min-w-0">
      <h4 className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-muted">
        {title}
      </h4>
      {value == null ? (
        <p className="rounded-lg border border-dashed border-line bg-white px-3 py-4 text-sm text-muted">
          No state recorded
        </p>
      ) : (
        <pre className="max-h-72 overflow-auto rounded-lg border border-line bg-white p-3 text-xs leading-5 text-ink">
          {JSON.stringify(value, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default function AdminAuditLogsPage() {
  const [draftFilters, setDraftFilters] = useState(initialFilters);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);
  const [records, setRecords] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 0,
    total: 0,
    limit: PAGE_SIZE
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [filterError, setFilterError] = useState("");

  useEffect(() => {
    let active = true;

    async function fetchRecords() {
      setLoading(true);
      setError("");

      try {
        const result = await adminService.getAuditLogs({
          ...filters,
          page,
          limit: PAGE_SIZE
        });
        if (!active) return;
        setRecords(Array.isArray(result.records) ? result.records : []);
        setPagination(
          result.pagination || { page, pages: 0, total: 0, limit: PAGE_SIZE }
        );
      } catch (requestError) {
        if (!active) return;
        setError(requestError.message || "Unable to load audit events.");
        setRecords([]);
        setPagination({ page, pages: 0, total: 0, limit: PAGE_SIZE });
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchRecords();
    return () => {
      active = false;
    };
  }, [filters, page, refreshKey]);

  function updateDraft(event) {
    const { name, value } = event.target;
    setDraftFilters((current) => ({ ...current, [name]: value }));
  }

  function applyFilters(event) {
    event.preventDefault();
    setFilterError("");

    if (draftFilters.from && draftFilters.to && draftFilters.from > draftFilters.to) {
      setFilterError("The start date must be earlier than the end date.");
      return;
    }

    const nextFilters = {};
    for (const [key, value] of Object.entries(draftFilters)) {
      if (!value.trim()) continue;
      nextFilters[key] =
        key === "from" || key === "to"
          ? new Date(value).toISOString()
          : value.trim();
    }

    setPage(1);
    setExpandedId(null);
    setFilters(nextFilters);
  }

  function clearFilters() {
    setDraftFilters(initialFilters);
    setFilters({});
    setFilterError("");
    setExpandedId(null);
    setPage(1);
  }

  const failureCount = records.filter((record) => record.outcome === "FAILURE").length;
  const deniedCount = records.filter((record) => record.outcome === "DENIED").length;
  const firstItem = pagination.total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const lastItem = Math.min(page * PAGE_SIZE, pagination.total);

  return (
    <div className="min-h-full space-y-6 pb-10">
      <header className="relative overflow-hidden rounded-2xl border border-orange-100 bg-linear-to-br from-white via-white to-surface px-6 py-7 shadow-sm sm:px-8">
        <div className="pointer-events-none absolute -right-10 -top-14 size-48 rounded-full bg-accent/20 blur-2xl" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-100 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary-dark">
              <span className="size-2 rounded-full bg-success" />
              Append-only event history
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Audit <span className="text-primary">logs</span>
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base">
              Review security, administrative, and transaction activity across
              your platform.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setRefreshKey((key) => key + 1)}
            disabled={loading}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg
              className={`size-4 ${loading ? "animate-spin" : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M20 11a8 8 0 0 0-14.9-3M4 4v4h4m-4 5a8 8 0 0 0 14.9 3M20 20v-4h-4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Refresh events
          </button>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Audit summary">
        <SummaryCard
          label="Matching events"
          value={pagination.total.toLocaleString()}
          note="Based on the selected filters"
          accent="bg-primary"
        />
        <SummaryCard
          label="Showing on this page"
          value={records.length.toString()}
          note={`Page ${page}${pagination.pages ? ` of ${pagination.pages}` : ""}`}
          accent="bg-slate-400"
        />
        <SummaryCard
          label="Failures on this page"
          value={failureCount.toString()}
          note="Events with a failed outcome"
          accent="bg-danger"
        />
        <SummaryCard
          label="Denied on this page"
          value={deniedCount.toString()}
          note="Events blocked by access controls"
          accent="bg-warning"
        />
      </section>

      <section className="rounded-xl border border-line bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-ink">Filter activity</h2>
            <p className="mt-1 text-sm text-muted">
              Narrow events by actor, resource, outcome, or time period.
            </p>
          </div>
          {Object.keys(filters).length > 0 && (
            <span className="rounded-full bg-info px-3 py-1 text-xs font-semibold text-primary-dark">
              {Object.keys(filters).length} active{" "}
              {Object.keys(filters).length === 1 ? "filter" : "filters"}
            </span>
          )}
        </div>

        <form onSubmit={applyFilters}>
          <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2 xl:grid-cols-4">
            <label className="text-xs font-semibold text-ink">
              Event category
              <select
                name="event_type"
                value={draftFilters.event_type}
                onChange={updateDraft}
                className={inputClass}
              >
                <option value="">All categories</option>
                {EVENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-xs font-semibold text-ink">
              Outcome
              <select
                name="outcome"
                value={draftFilters.outcome}
                onChange={updateDraft}
                className={inputClass}
              >
                <option value="">All outcomes</option>
                {OUTCOMES.map((outcome) => (
                  <option key={outcome} value={outcome}>
                    {formatOutcome(outcome)}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-xs font-semibold text-ink">
              Actor ID
              <input
                name="actor_id"
                value={draftFilters.actor_id}
                onChange={updateDraft}
                className={inputClass}
                placeholder="24-character user ID"
                pattern="[a-fA-F0-9]{24}"
                title="Enter a valid 24-character user ID"
                maxLength={24}
              />
            </label>

            <label className="text-xs font-semibold text-ink">
              Resource type
              <input
                name="resource_type"
                value={draftFilters.resource_type}
                onChange={updateDraft}
                className={inputClass}
                placeholder="e.g. Booking"
                maxLength={200}
              />
            </label>

            <label className="text-xs font-semibold text-ink">
              Resource ID
              <input
                name="resource_id"
                value={draftFilters.resource_id}
                onChange={updateDraft}
                className={inputClass}
                placeholder="Find a specific resource"
                maxLength={200}
              />
            </label>

            <label className="text-xs font-semibold text-ink">
              Correlation reference
              <input
                name="correlation_reference"
                value={draftFilters.correlation_reference}
                onChange={updateDraft}
                className={inputClass}
                placeholder="Trace or request reference"
                maxLength={128}
              />
            </label>

            <label className="text-xs font-semibold text-ink">
              From
              <input
                type="datetime-local"
                name="from"
                value={draftFilters.from}
                onChange={updateDraft}
                className={inputClass}
              />
            </label>

            <label className="text-xs font-semibold text-ink">
              To
              <input
                type="datetime-local"
                name="to"
                value={draftFilters.to}
                onChange={updateDraft}
                className={inputClass}
              />
            </label>
          </div>

          {filterError && (
            <p className="mt-3 text-sm font-medium text-danger" role="alert">
              {filterError}
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-line pt-4">
            <button
              type="submit"
              className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              Apply filters
            </button>
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-lg border border-line bg-white px-4 py-2.5 text-sm font-semibold text-muted transition hover:border-primary hover:text-primary-dark"
            >
              Clear all
            </button>
          </div>
        </form>
      </section>

      <section className="overflow-hidden rounded-xl border border-line bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
          <div>
            <h2 className="font-bold text-ink">Activity events</h2>
            <p className="mt-0.5 text-xs text-muted">
              {loading
                ? "Loading latest activity…"
                : pagination.total > 0
                  ? `Showing ${firstItem}–${lastItem} of ${pagination.total.toLocaleString()} events`
                  : "No events to display"}
            </p>
          </div>
          <span className="rounded-md border border-orange-100 bg-surface px-2.5 py-1 text-xs font-medium text-primary-dark">
            Newest first
          </span>
        </div>

        {error && (
          <div
            className="m-5 flex flex-col gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-danger sm:flex-row sm:items-center sm:justify-between"
            role="alert"
          >
            <p>{error}</p>
            <button
              type="button"
              onClick={() => setRefreshKey((key) => key + 1)}
              className="shrink-0 font-semibold underline underline-offset-2"
            >
              Try again
            </button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-surface/70">
              <tr className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted">
                <th scope="col" className="px-5 py-3.5">Event / action</th>
                <th scope="col" className="px-5 py-3.5">Actor</th>
                <th scope="col" className="px-5 py-3.5">Resource</th>
                <th scope="col" className="px-5 py-3.5">Outcome</th>
                <th scope="col" className="px-5 py-3.5">Logged at</th>
                <th scope="col" className="px-5 py-3.5">
                  <span className="sr-only">Details</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {loading &&
                records.length === 0 &&
                Array.from({ length: 5 }, (_, index) => (
                  <tr key={`loading-${index}`}>
                    {Array.from({ length: 6 }, (_, cell) => (
                      <td key={cell} className="px-5 py-5">
                        <div className="h-4 animate-pulse rounded bg-surface" />
                      </td>
                    ))}
                  </tr>
                ))}

              {!loading && !error && records.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center">
                    <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-surface text-primary">
                      <svg
                        className="size-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <p className="font-semibold text-ink">No audit events found</p>
                    <p className="mt-1 text-sm text-muted">
                      Try adjusting your filters or check back later.
                    </p>
                  </td>
                </tr>
              )}

              {records.map((record) => {
                const recordId = record._id || `${record.logged_at}-${record.action}`;
                const expanded = expandedId === recordId;

                return (
                  <AuditEventRow
                    key={recordId}
                    record={record}
                    expanded={expanded}
                    onToggle={() => setExpandedId(expanded ? null : recordId)}
                  />
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-xs text-muted">
            Page {page}{pagination.pages ? ` of ${pagination.pages}` : ""}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setExpandedId(null);
                setPage((current) => Math.max(1, current - 1));
              }}
              disabled={loading || page <= 1}
              className="rounded-lg border border-line px-3.5 py-2 text-sm font-medium text-ink transition hover:border-primary hover:text-primary-dark disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => {
                setExpandedId(null);
                setPage((current) => Math.min(pagination.pages, current + 1));
              }}
              disabled={loading || page >= pagination.pages}
              className="rounded-lg border border-line px-3.5 py-2 text-sm font-medium text-ink transition hover:border-primary hover:text-primary-dark disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function SummaryCard({ label, value, note, accent }) {
  return (
    <article className="rounded-xl border border-line bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <span className={`size-2 rounded-full ${accent}`} />
        <p className="text-xs font-semibold text-muted">{label}</p>
      </div>
      <p className="mt-3 text-2xl font-extrabold tracking-tight text-ink">{value}</p>
      <p className="mt-1 text-xs text-muted">{note}</p>
    </article>
  );
}

function AuditEventRow({ record, expanded, onToggle }) {
  return (
    <>
      <tr className="transition-colors hover:bg-surface/40">
        <td className="px-5 py-4">
          <div className="max-w-64">
            <p className="truncate text-sm font-semibold text-ink" title={record.action}>
              {record.action || "Unspecified action"}
            </p>
            <p className="mt-1 text-xs text-muted">
              {record.event_type || "Uncategorized"}
            </p>
          </div>
        </td>
        <td className="px-5 py-4">
          <p className="font-mono text-xs font-medium text-ink">{shortId(record.actor_id)}</p>
          <p className="mt-1 text-xs text-muted">{record.actor_role || "No role recorded"}</p>
        </td>
        <td className="px-5 py-4">
          <p className="text-sm font-medium text-ink">{record.resource_type || "—"}</p>
          <p className="mt-1 max-w-36 truncate font-mono text-xs text-muted" title={record.resource_id || ""}>
            {record.resource_id || "No resource ID"}
          </p>
        </td>
        <td className="px-5 py-4">
          <span
            className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${outcomeClass(record.outcome)}`}
          >
            {formatOutcome(record.outcome)}
          </span>
        </td>
        <td className="whitespace-nowrap px-5 py-4 text-xs text-muted">
          {formatDate(record.logged_at)}
        </td>
        <td className="px-5 py-4 text-right">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={expanded}
            className="rounded-md px-2.5 py-1.5 text-xs font-semibold text-primary-dark transition hover:bg-info"
          >
            {expanded ? "Hide" : "Details"}
          </button>
        </td>
      </tr>
      {expanded && (
        <tr className="bg-surface/50">
          <td colSpan={6} className="px-5 py-5">
            <div className="grid gap-5 lg:grid-cols-2">
              <StatePanel title="Previous state" value={record.previous_state} />
              <StatePanel title="New state" value={record.new_state} />
            </div>
            <dl className="mt-5 grid gap-4 border-t border-line pt-4 text-xs sm:grid-cols-2 xl:grid-cols-4">
              <DetailItem label="Correlation reference" value={record.correlation_reference} />
              <DetailItem label="Error reference" value={record.error_reference} />
              <DetailItem label="IP address" value={record.ip_address} />
              <DetailItem label="User agent" value={record.user_agent} />
            </dl>
          </td>
        </tr>
      )}
    </>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="min-w-0">
      <dt className="font-semibold uppercase tracking-wide text-muted">{label}</dt>
      <dd className="mt-1 break-all text-ink">{value || "Not recorded"}</dd>
    </div>
  );
}
