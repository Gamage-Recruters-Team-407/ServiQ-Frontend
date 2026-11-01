import { SERVICE_PROGRESS_FLOW } from "@/utils/constants";
import { formatDateTime } from "@/utils/formatters";

// Highest normal step reached (also works for Cancelled / Disputed jobs, using their history).
function reachedIndex(status, history) {
  const own = SERVICE_PROGRESS_FLOW.indexOf(status);
  if (own >= 0) return own;
  return history.reduce((max, h) => Math.max(max, SERVICE_PROGRESS_FLOW.indexOf(h.status)), 0);
}

export default function ProgressTimeline({ status, history = [], percent = 0 }) {
  const reached = reachedIndex(status, history);
  const stopped = status === "Cancelled" || status === "Disputed";

  return (
    <div>
      <div className="mb-4 flex items-center justify-between text-sm">
        <span className="font-semibold">Progress</span>
        <span className="text-muted">{percent}%</span>
      </div>
      <div className="mb-6 h-2 overflow-hidden rounded-full bg-line" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
        <div
          className={`h-full rounded-full transition-all ${status === "Cancelled" ? "bg-danger" : "bg-primary"}`}
          style={{ width: `${percent}%` }}
        />
      </div>

      <ol className="grid grid-cols-6">
        {SERVICE_PROGRESS_FLOW.map((step, i) => {
          const done = i < reached || (i === reached && status === "Completed");
          const current = i === reached && !done && !stopped;
          return (
            <li key={step} className="relative flex flex-col items-center text-center" aria-current={current ? "step" : undefined}>
              {i > 0 && (
                <span
                  className={`absolute right-1/2 top-4 h-0.5 w-full ${i <= reached ? "bg-primary" : "bg-line"}`}
                  aria-hidden="true"
                />
              )}
              <span
                className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-bold ${
                  done
                    ? "border-primary bg-primary text-white"
                    : current
                      ? "border-primary bg-white text-primary ring-4 ring-info"
                      : "border-line bg-white text-muted"
                }`}
              >
                {done ? "✓" : i + 1}
              </span>
              <span className={`mt-2 px-0.5 text-[11px] leading-tight sm:text-xs ${current || done ? "font-semibold text-ink" : "text-muted"}`}>
                {step}
              </span>
            </li>
          );
        })}
      </ol>

      {stopped && (
        <p className={`mt-5 rounded-lg px-3.5 py-3 text-sm ${status === "Cancelled" ? "bg-red-50 text-danger" : "bg-amber-50 text-warning"}`}>
          {status === "Cancelled" ? "This job was cancelled." : "This job is under dispute. An administrator will review it."}
        </p>
      )}
    </div>
  );
}

export function StatusHistory({ history = [] }) {
  if (!history.length) return null;
  const items = [...history].reverse();
  return (
    <ul className="space-y-3">
      {items.map((h, i) => (
        <li key={`${h.status}-${h.changed_at}-${i}`} className="flex gap-3 text-sm">
          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
          <div>
            <p className="font-medium">
              {h.status}
              {h.changed_by_role && <span className="ml-2 text-xs font-normal text-muted">by {h.changed_by_role}</span>}
            </p>
            {h.note && <p className="text-muted">{h.note}</p>}
            <p className="text-xs text-muted">{formatDateTime(h.changed_at)}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
