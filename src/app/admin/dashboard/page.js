export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-[1.75rem] font-bold text-[#0F172A]">
          Marketplace Analytics & Operational Dashboard
        </h1>
        <p className="mt-1 text-[0.95rem] text-[#64748B]">
          Real-time platform performance, financial metrics, and operational
          trends.
        </p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
        <div className="rounded-[10px] border border-[var(--border-light)] bg-[var(--bg-main)] p-6">
          <div className="text-sm font-semibold uppercase text-[var(--text-secondary)]">
            Total GMV
          </div>
          <div className="mt-2 text-[1.75rem] font-bold text-[var(--text-main)]">
            Rs.24,850.00
          </div>
          <div className="mt-1 text-[0.85rem] font-semibold text-[var(--status-success)]">
            +12% from last week
          </div>
        </div>

        <div className="rounded-[10px] border border-[var(--border-light)] bg-[var(--bg-main)] p-6">
          <div className="text-sm font-semibold uppercase text-[var(--text-secondary)]">
            Platform Commission
          </div>
          <div className="mt-2 text-[1.75rem] font-bold text-[var(--primary-orange)]">
            Rs.3,727.50
          </div>
          <div className="mt-1 text-[0.85rem] font-semibold text-[var(--text-secondary)]">
            Avg. Rate: 15%
          </div>
        </div>

        <div className="rounded-[10px] border border-[var(--border-light)] bg-[var(--bg-main)] p-6">
          <div className="text-sm font-semibold uppercase text-[var(--text-secondary)]">
            Active Bookings
          </div>
          <div className="mt-2 text-[1.75rem] font-bold text-[var(--text-main)]">
            142
          </div>
          <div className="mt-1 text-[0.85rem] font-semibold text-[var(--status-warning)]">
            18 pending confirmation
          </div>
        </div>

        <div className="rounded-[10px] border border-[var(--border-light)] bg-[var(--bg-main)] p-6">
          <div className="text-sm font-semibold uppercase text-[var(--text-secondary)]">
            Active Disputes
          </div>
          <div className="mt-2 text-[1.75rem] font-bold text-[var(--status-error)]">
            3
          </div>
          <div className="mt-1 text-[0.85rem] font-semibold text-[var(--status-error)]">
            Requires immediate review
          </div>
        </div>
      </div>

      <div className="rounded-[10px] border border-[var(--border-light)] bg-[var(--bg-main)] p-6">
        <div className="mb-4 border-b border-[var(--border-light)] pb-4 text-[1.15rem] font-semibold text-[var(--text-main)]">
          Recent System Activity Logs
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between border-b border-dashed border-[var(--border-light)] py-2 text-[0.9rem]">
            <span className="text-[var(--text-main)]">
              New provider registration request submitted by{" "}
              <strong>TechFix Solutions</strong>
            </span>
            <span className="text-[var(--text-secondary)]">Just now</span>
          </div>
          <div className="flex justify-between border-b border-dashed border-[var(--border-light)] py-2 text-[0.9rem]">
            <span className="text-[var(--text-main)]">
              Dispute claim #DIS-9082 opened by customer Nimal Perera
            </span>
            <span className="text-[var(--text-secondary)]">12 mins ago</span>
          </div>
          <div className="flex justify-between py-2 text-[0.9rem]">
            <span className="text-[var(--text-main)]">
              Payout release approved for Provider #PRO-4412
            </span>
            <span className="text-[var(--text-secondary)]">1 hour ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
