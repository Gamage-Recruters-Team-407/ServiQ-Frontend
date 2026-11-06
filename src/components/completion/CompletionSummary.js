import { ui } from "@/utils/ui";
import StatusBadge from "@/components/common/StatusBadge";
import { formatCurrency, formatDateTime } from "@/utils/formatters";

function Row({ label, children }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</dt>
      <dd className="mt-0.5 text-sm">{children || "—"}</dd>
    </div>
  );
}

// Read-only summary used by both the provider and the customer detail pages.
export default function CompletionSummary({ completion, viewer }) {
  const { booking, provider, customer } = completion;
  return (
    <div className={ui.card}>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">{booking.service_name || "Service"}</h2>
          <p className="text-sm text-muted">Booking {booking.reference || booking.id}</p>
        </div>
        <StatusBadge status={completion.status} />
      </div>

      <dl className="grid gap-4 sm:grid-cols-2">
        {viewer === "provider" ? <Row label="Customer">{customer.name}</Row> : <Row label="Provider">{provider.name}</Row>}
        <Row label="Amount">{booking.total_amount != null ? formatCurrency(booking.total_amount, booking.currency || "LKR") : null}</Row>
        <Row label="Location">{booking.location}</Row>
        <Row label="Started">{completion.start_datetime ? formatDateTime(completion.start_datetime) : null}</Row>
        <Row label="Completed">{completion.completion_datetime ? formatDateTime(completion.completion_datetime) : null}</Row>
        <Row label="Customer confirmation">
          {completion.customer_confirmed ? `Confirmed ${formatDateTime(completion.confirmed_by_customer_at)}` : completion.status === "Completed" ? "Waiting for customer" : null}
        </Row>
      </dl>

      {completion.completion_notes && (
        <div className="mt-5">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">Provider notes</h3>
          <p className="mt-1 whitespace-pre-wrap text-sm">{completion.completion_notes}</p>
        </div>
      )}

      {completion.evidence_urls.length > 0 && (
        <div className="mt-5">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">Evidence</h3>
          <ul className="mt-1 space-y-1 text-sm">
            {completion.evidence_urls.map((url) => (
              <li key={url}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="break-all text-primary-dark underline hover:text-primary">
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
