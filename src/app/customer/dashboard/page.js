export default function CustomerDashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-[1.75rem] font-bold text-[#0F172A]">
          Customer Activity Dashboard
        </h1>
        <p className="mt-1 text-[0.95rem] text-[#64748B]">
          Monitor your ongoing service requests, schedule appointments, and
          transactions.
        </p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
        <div className="rounded-[10px] border border-[var(--border-light)] bg-[var(--bg-main)] p-6">
          <div className="text-sm font-semibold uppercase text-[var(--text-secondary)]">
            Total Bookings
          </div>
          <div className="mt-2 text-[1.75rem] font-bold text-[var(--text-main)]">
            12
          </div>
          <div className="mt-1 text-[0.85rem] font-semibold text-[var(--text-secondary)]">
            All-time history
          </div>
        </div>

        <div className="rounded-[10px] border border-[var(--border-light)] bg-[var(--bg-main)] p-6">
          <div className="text-sm font-semibold uppercase text-[var(--text-secondary)]">
            Active Orders
          </div>
          <div className="mt-2 text-[1.75rem] font-bold text-[var(--primary-orange)]">
            2 Active
          </div>
          <div className="mt-1 text-[0.85rem] font-semibold text-[var(--status-warning)]">
            1 in progress today
          </div>
        </div>

        <div className="rounded-[10px] border border-[var(--border-light)] bg-[var(--bg-main)] p-6">
          <div className="text-sm font-semibold uppercase text-[var(--text-secondary)]">
            Total Invested
          </div>
          <div className="mt-2 text-[1.75rem] font-bold text-[var(--text-main)]">
            Rs.340.00
          </div>
          <div className="mt-1 text-[0.85rem] font-semibold text-[var(--status-success)]">
            Secured processing
          </div>
        </div>
      </div>

      <div className="rounded-[10px] border border-[var(--border-light)] bg-[var(--bg-main)] p-6">
        <div className="mb-4 border-b border-[var(--border-light)] pb-4 text-[1.15rem] font-semibold text-[var(--text-main)]">
          Current Service Milestones
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between py-2 text-[0.9rem]">
            <span className="text-[var(--text-main)]">
              Plumbing Service maintenance by{" "}
              <strong>Expert Plumbing Ltd</strong>
            </span>
            <span className="inline-flex items-center rounded-full bg-[#dcfce7] px-[0.6rem] py-1 text-xs font-semibold text-[var(--status-success)]">
              In Progress
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
