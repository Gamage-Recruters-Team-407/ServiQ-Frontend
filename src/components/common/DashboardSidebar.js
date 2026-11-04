"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = {
  admin: [
    { label: "Analytics Dashboard", href: "/admin/dashboard", icon: "📊" },
    { label: "Users & Providers", href: "/admin/users", icon: "👥" },
    { label: "Service Categories", href: "/admin/categories", icon: "📁" },
    { label: "Bookings", href: "/admin/bookings", icon: "📅" },
    { label: "Payments", href: "/admin/payments", icon: "💳" },
    { label: "Commissions", href: "/admin/commissions", icon: "⚙️" },
    { label: "Payouts", href: "/admin/payouts", icon: "💰" },
    { label: "Disputes", href: "/admin/disputes", icon: "⚖️" },
    { label: "AI Monitoring", href: "/admin/ai-monitoring", icon: "🤖" },
    { label: "Audit Logs", href: "/admin/audit-logs", icon: "📋" },
  ],
  customer: [
    { label: "Dashboard", href: "/customer/dashboard", icon: "📊" },
    { label: "My Bookings", href: "/customer/bookings", icon: "📅" },
    { label: "Payments", href: "/customer/payments", icon: "💳" },
    { label: "Reviews", href: "/customer/reviews", icon: "⭐" },
  ],
  provider: [
    { label: "Dashboard", href: "/provider/dashboard", icon: "📊" },
    { label: "My Services", href: "/provider/services", icon: "🛠️" },
    { label: "Bookings", href: "/provider/bookings", icon: "📅" },
    { label: "Earnings", href: "/provider/earnings", icon: "💰" },
    { label: "Reviews", href: "/provider/reviews", icon: "⭐" },
  ],
};

const portalTitles = {
  admin: "Administration",
  customer: "Customer Portal",
  provider: "Provider Portal",
};

export default function DashboardSidebar({ role }) {
  const pathname = usePathname();
  const items = menuItems[role] || [];

  return (
    <aside className="sticky top-0 flex h-screen w-[270px] shrink-0 flex-col border-r border-[#E2E8F0] bg-white px-4 py-6 shadow-sm max-lg:w-[245px] max-md:relative max-md:h-auto max-md:w-full max-md:border-b max-md:border-r-0">
      <Link
        href={
          role === "admin"
            ? "/admin/dashboard"
            : role === "provider"
              ? "/provider/dashboard"
              : "/customer/dashboard"
        }
        className="flex items-center gap-3 rounded-xl px-2 py-3 transition-colors hover:bg-[#FFF7ED]"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFF7ED]">
          <img
            src="/ServiQ.png"
            alt="ServiQ Logo"
            className="h-10 w-10 object-contain"
          />
        </div>

        <div className="min-w-0">
          <h2 className="truncate text-base font-extrabold text-[#0F172A]">
            {portalTitles[role] || "ServiQ Workspace"}
          </h2>
          <p className="mt-1 text-xs font-medium text-[#64748B]">
            ServiQ Workspace
          </p>
        </div>
      </Link>

      <div className="my-5 h-px w-full bg-[#E2E8F0]" />

      <div className="mb-3 px-3">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#64748B]">
          Main Menu
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-1.5 overflow-y-auto">
        {items.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`group grid min-h-[49px] w-full grid-cols-[32px_minmax(0,1fr)_8px] items-center gap-3 rounded-xl px-3 transition-all duration-200 ${
                isActive
                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                  : "text-[#64748B] hover:bg-orange-50 hover:text-[#64748B]"
              }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-lg ${
                  isActive ? "bg-white/15" : "bg-transparent"
                }`}
              >
                {item.icon}
              </span>

              <span className="truncate text-sm font-semibold">
                {item.label}
              </span>

              <span
                className={`h-2 w-2 rounded-full ${
                  isActive
                    ? "bg-white"
                    : "bg-transparent group-hover:bg-orange-300"
                }`}
              />
            </Link>
          );
        })}
      </nav>

      <div className="mt-5 border-t border-[#E2E8F0] px-3 pt-5">
        <p className="text-xs font-medium text-[#64748B]">
          © 2026 ServiQ Workspace
        </p>
        <p className="mt-1 text-[11px] text-[#64748B]">All rights reserved.</p>
      </div>
    </aside>
  );
}
