"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Users,
  Layers,
  CalendarCheck,
  CreditCard,
  Percent,
  BadgeDollarSign,
  Scale,
  Sparkles,
  FileText,
  Wrench,
  Clock,
  MessageSquare,
  TrendingUp,
  Wallet,
  Star,
  UserCheck,
  User,
  Menu,
  X,
} from "lucide-react";

const PORTAL_SIDEBAR_DATA = {
  admin: {
    brandName: "ServiQ",
    consoleName: "Admin Console",
    title: "PLATFORM ADMINISTRATION",
    badge: "SRS §23",
    footerLabel: "Admin Workspace",
    links: [
      {
        href: "/admin/analytics",
        label: "Analytics Dashboard",
        icon: LayoutGrid,
      },
      {
        href: "/admin/users",
        label: "User & Provider Accounts",
        icon: Users,
      },
      {
        href: "/admin/categories",
        label: "Service Categories",
        icon: Layers,
      },
      {
        href: "/admin/bookings",
        label: "Booking Monitoring",
        icon: CalendarCheck,
      },
      {
        href: "/admin/payments",
        label: "Payment Transactions",
        icon: CreditCard,
      },
      {
        href: "/admin/commissions",
        label: "Commission Rules",
        icon: Percent,
      },
      {
        href: "/admin/payouts",
        label: "Payout Approvals",
        icon: BadgeDollarSign,
      },
      {
        href: "/admin/disputes",
        label: "Dispute Resolution",
        icon: Scale,
      },
      {
        href: "/admin/ai-monitoring",
        label: "AI Monitoring",
        icon: Sparkles,
      },
      {
        href: "/admin/audit-logs",
        label: "Audit & Activity Logs",
        icon: FileText,
      },
    ],
  },
  provider: {
    brandName: "ServiQ",
    consoleName: "Provider Portal",
    title: "Provider Portal",
    footerLabel: "Provider Workspace",
    links: [
      { href: "/provider/dashboard", label: "Dashboard", icon: LayoutGrid },
      { href: "/provider/services", label: "My Services", icon: Wrench },
      { href: "/provider/availability", label: "Availability", icon: Clock },
      { href: "/provider/bookings", label: "Bookings", icon: CalendarCheck },
      { href: "/provider/messages", label: "Messages", icon: MessageSquare },
      { href: "/provider/earnings", label: "Earnings", icon: TrendingUp },
      { href: "/provider/payouts", label: "Payouts", icon: Wallet },
      { href: "/provider/reviews", label: "Reviews", icon: Star },
      { href: "/provider/disputes", label: "Disputes", icon: Scale },
      { href: "/provider/profile", label: "Profile", icon: UserCheck },
    ],
  },
  customer: {
    brandName: "ServiQ",
    consoleName: "Customer Portal",
    title: "Customer Portal",
    footerLabel: "Customer Workspace",
    links: [
      { href: "/customer/dashboard", label: "Dashboard", icon: LayoutGrid },
      { href: "/customer/bookings", label: "My Bookings", icon: CalendarCheck },
      { href: "/customer/messages", label: "Messages", icon: MessageSquare },
      { href: "/customer/reviews", label: "My Reviews", icon: Star },
      { href: "/customer/disputes", label: "Disputes", icon: Scale },
      { href: "/customer/profile", label: "Profile", icon: User },
    ],
  },
};

export default function Sidebar({ variant = "admin" }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const config = PORTAL_SIDEBAR_DATA[variant] || PORTAL_SIDEBAR_DATA.admin;

  const checkActive = (href) => {
    if (pathname === href) return true;
    if (href === "/admin/analytics" && pathname === "/admin/dashboard") {
      return true;
    }
    return false;
  };

  const sidebarBody = (
    <aside className="w-72 shrink-0 bg-[#FFFFFF] border-r border-[#E2E8F0] flex flex-col justify-between min-h-screen">
      <div className="p-5 flex flex-col gap-5">
        <div className="flex items-center justify-between pb-5 border-b border-[#E2E8F0]">
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <img
              src="/images/serviQ.png"
              alt="ServiQ Logo"
              className="w-9 h-9 object-contain shrink-0"
            />
            <div className="min-w-0">
              <div className="text-lg font-extrabold tracking-tight text-[#0F172A] leading-tight truncate">
                {config.brandName}
              </div>
              <div className="text-xs font-medium text-[#64748B] leading-tight mt-0.5 truncate">
                {config.consoleName}
              </div>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-xl text-[#64748B] hover:bg-[#FFF7ED] hover:text-[#F97316] transition-colors cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-3 flex items-center justify-between gap-2 text-xs font-bold uppercase tracking-wider text-[#64748B]">
          <span>{config.title}</span>
          {variant !== "admin" && (
            <span className="px-2 py-0.5 rounded-full bg-[#FFEDD5] text-[#F97316] text-[10px] font-semibold shrink-0">
              {config.badge}
            </span>
          )}
        </div>

        <nav className="flex flex-col gap-1.5">
          {config.links.map((item) => {
            const IconComponent = item.icon;
            const isActive = checkActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-full text-sm transition-all ${
                  isActive
                    ? "bg-[#F97316] hover:bg-[#EA580C] text-[#FFFFFF] font-semibold shadow-sm"
                    : "text-[#64748B] hover:bg-[#FFF7ED] hover:text-[#0F172A] font-medium"
                }`}
              >
                {IconComponent && (
                  <IconComponent
                    className={`w-4 h-4 shrink-0 stroke-[2] ${
                      isActive ? "text-[#FFFFFF]" : "text-[#64748B]"
                    }`}
                  />
                )}
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 pb-16 lg:pb-4 border-t border-[#E2E8F0] bg-[#FFFFFF]">
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-[#FFF7ED] border border-[#E2E8F0] text-xs font-semibold text-[#0F172A]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#15803D] shrink-0" />
          <span>{config.footerLabel}</span>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      <div className="lg:hidden bg-[#FFFFFF] border-b border-[#E2E8F0] px-4 py-2.5 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
          {config.consoleName}
        </span>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFF7ED] text-[#F97316] border border-[#FDBA74] text-xs font-semibold cursor-pointer"
        >
          <Menu className="w-4 h-4" />
          <span>Menu</span>
        </button>
      </div>

      <div className="hidden lg:block shrink-0">{sidebarBody}</div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-[#0F172A]/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-10 flex bg-[#FFFFFF]">{sidebarBody}</div>
        </div>
      )}
    </>
  );
}
