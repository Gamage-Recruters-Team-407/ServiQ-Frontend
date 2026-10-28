export default function ProviderDashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-[1.75rem] font-bold text-[#0F172A]">
          Provider Operations & Earnings Ledger
        </h1>
        <p className="mt-1 text-[0.95rem] text-[#64748B]">
          Track vendor profile statistics, catalog performance, and incoming
          revenues.
        </p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
        <div className="rounded-[10px] border border-[var(--border-light)] bg-[var(--bg-main)] p-6">
          <div className="text-sm font-semibold uppercase text-[var(--text-secondary)]">
            Gross Earnings
          </div>
          <div className="mt-2 text-[1.75rem] font-bold text-[var(--text-main)]">
            Rs.1,250.00
          </div>
          <div className="mt-1 text-[0.85rem] font-semibold text-[var(--status-success)]">
            +8% this month
          </div>
        </div>

        <div className="rounded-[10px] border border-[var(--border-light)] bg-[var(--bg-main)] p-6">
          <div className="text-sm font-semibold uppercase text-[var(--text-secondary)]">
            Net Revenue
          </div>
          <div className="mt-2 text-[1.75rem] font-bold text-[var(--primary-orange)]">
            Rs.1,062.50
          </div>
          <div className="mt-1 text-[0.85rem] font-semibold text-[var(--text-secondary)]">
            Deducted 15% marketplace fee
          </div>
        </div>

        <div className="rounded-[10px] border border-[var(--border-light)] bg-[var(--bg-main)] p-6">
          <div className="text-sm font-semibold uppercase text-[var(--text-secondary)]">
            Pending Payouts
          </div>
          <div className="mt-2 text-[1.75rem] font-bold text-[var(--status-warning)]">
            Rs.210.00
          </div>
          <div className="mt-1 text-[0.85rem] font-semibold text-[var(--text-secondary)]">
            Next settlement date pending
          </div>
        </div>
      </div>

      <div className="rounded-[10px] border border-[var(--border-light)] bg-[var(--bg-main)] p-6">
        <div className="mb-4 border-b border-[var(--border-light)] pb-4 text-[1.15rem] font-semibold text-[var(--text-main)]">
          Incoming Customer Claims
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between py-2 text-[0.9rem]">
            <span className="text-[var(--text-main)]">
              Home cleaning appointment request from Amila Jayasuriya
            </span>
            <span className="inline-flex items-center rounded-full bg-[#fef3c7] px-[0.6rem] py-1 text-xs font-semibold text-[var(--status-warning)]">
              Action Required
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
