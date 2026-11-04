"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  ["/admin/dashboard", "Analytics Dashboard"],
  ["/admin/users", "User & Provider Accounts"],
  ["/admin/categories", "Service Categories"],
  ["/admin/bookings", "Booking Monitoring"],
  ["/admin/payments", "Payment Transactions"],
  ["/admin/commissions", "Commission Rules"],
  ["/admin/payouts", "Payout Approvals"],
  ["/admin/disputes", "Dispute Resolution"],
  ["/admin/ai-monitoring", "AI Monitoring"],
  ["/admin/audit-logs", "Audit & Activity Logs"]
];

export default function AdminNavigation() {
  const pathname = usePathname();

  return (
    <nav
      className="flex flex-col gap-2 max-[760px]:flex-row max-[760px]:overflow-x-auto"
      aria-label="Administration"
    >
      {links.map(([href, label]) => {
        const active = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 rounded-xl border-l-[3px] px-[0.85rem] py-[0.7rem] text-sm font-medium transition-colors max-[760px]:flex-none max-[760px]:whitespace-nowrap ${
              active
                ? "border-primary bg-info font-semibold text-primary-dark"
                : "border-transparent text-muted hover:bg-surface hover:text-primary-dark"
            }`}
            aria-current={active ? "page" : undefined}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
