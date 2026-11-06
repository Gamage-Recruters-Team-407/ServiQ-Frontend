"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

const navigation = {
  admin: [
    ["Overview", "/admin/dashboard", "▦"], ["Users & providers", "/admin/users", "♙"], ["Categories", "/admin/categories", "▤"],
    ["Bookings", "/admin/bookings", "▣"], ["Payments", "/admin/payments", "＄"], ["Commissions", "/admin/commissions", "%"],
    ["Payouts", "/admin/payouts", "⇧"], ["Disputes", "/admin/disputes", "⚑"], ["AI monitoring", "/admin/ai-monitoring", "✧"], ["Audit logs", "/admin/audit-logs", "≡"]
  ],
  provider: [
    ["Overview", "/provider/dashboard", "▦"], ["My services", "/provider/services", "▤"], ["Availability", "/provider/availability", "◷"],
    ["Bookings", "/provider/bookings", "▣"], ["Messages", "/provider/messages", "✉"], ["Earnings", "/provider/earnings", "＄"],
    ["Payouts", "/provider/payouts", "⇧"], ["Reviews", "/provider/reviews", "☆"], ["Disputes", "/provider/disputes", "⚑"], ["Profile", "/provider/profile", "♙"]
  ],
  customer: [
    ["Overview", "/customer/dashboard", "▦"], ["My bookings", "/customer/bookings", "▣"], ["Messages", "/customer/messages", "✉"],
    ["My reviews", "/customer/reviews", "☆"], ["Disputes", "/customer/disputes", "⚑"], ["Profile", "/customer/profile", "♙"]
  ]
};
const roleMeta = { admin: ["Administrator", "Platform management", "Administrator"], provider: ["Service provider", "Provider workspace", "Service Provider"], customer: ["Customer", "Customer workspace", "Customer"] };

export default function PortalShell({ role, children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const [roleLabel, subLabel, expectedRole] = roleMeta[role] || roleMeta.customer;
  const userRole = user?.role || user?.user_role;
  const allowed = roleMeta[role] && userRole === expectedRole;

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace(`/login/${role}`);
    else if (!allowed) {
      const destination = userRole === "Administrator" ? "/admin/dashboard" : userRole === "Service Provider" ? "/provider/dashboard" : "/customer/dashboard";
      router.replace(destination);
    }
  }, [loading, user, allowed, role, router, userRole]);

  if (loading || !user || !allowed) return <main className="portal-loading"><span className="loading-spinner" />Checking your secure workspace…</main>;

  const items = navigation[role] || navigation.customer;
  const current = items.find((item) => pathname === item[1])?.[0] || "Workspace";
  const initials = `${user.first_name?.[0] || "S"}${user.last_name?.[0] || "Q"}`.toUpperCase();

  function signOut() {
    logout();
    router.replace(`/login/${role}`);
  }

  return <div className="min-h-screen bg-ink-950 portal-light-shell">
    <header className="portal-topbar"><div className="container flex h-full items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <button className="portal-mobile-toggle lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">☰</button>
        <Link href={role === "admin" ? "/admin/dashboard" : role === "provider" ? "/provider/dashboard" : "/customer/dashboard"} className="flex items-center gap-2">
          <span className="portal-logo-mark">S</span><span className="text-xl font-extrabold tracking-tight text-slate-900">servi<span className="text-brand-light">Q</span><small className="ml-2 hidden text-[10px] font-semibold uppercase tracking-[.18em] text-slate-500 sm:inline">{roleLabel}</small></span>
        </Link>
      </div>
      <div className="hidden flex-1 items-center justify-center md:flex"><div className="portal-search">⌕ <span className="ml-2">Search your workspace…</span><span className="float-right text-xs">Ctrl K</span></div></div>
      <div className="flex items-center gap-3"><span className="portal-avatar">{initials}</span><div className="hidden text-right sm:block"><p className="text-sm font-semibold text-slate-900">{user.first_name} {user.last_name}</p><p className="text-[11px] text-slate-500">{roleLabel}</p></div><button onClick={signOut} className="portal-signout">Sign out</button></div>
    </div></header>
    <div className="portal-layout">
      <aside className={`portal-sidebar ${mobileOpen ? "!flex" : "hidden lg:flex"}`}>
        <div className="mb-3 px-3 pt-2"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-brand-light">{subLabel}</p><p className="mt-1 text-xs text-slate-400">SERVIQ / {role.toUpperCase()}</p></div>
        <p className="portal-sidebar-title">Workspace menu</p>
        <nav className="flex flex-col gap-1">{items.map(([label, href, icon]) => <Link key={href} href={href} onClick={() => setMobileOpen(false)} className={`portal-nav-link ${pathname === href ? "active" : ""}`}><span className="portal-nav-icon">{icon}</span>{label}{pathname === href && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-light" />}</Link>)}</nav>
        <div className="mt-auto rounded-xl border border-orange-100 bg-orange-50 p-3"><p className="text-xs font-bold text-orange-800">Need a hand?</p><p className="mt-1 text-[11px] leading-relaxed text-slate-600">Visit the help centre for workspace guidance.</p><Link href="/" className="mt-2 inline-block text-xs font-semibold text-brand-dark">Get support →</Link></div>
      </aside>
      <main className="portal-main"><div className="mb-6 flex items-center justify-between"><div className="text-xs text-slate-500">Workspace <span className="mx-2">/</span><span className="font-semibold text-slate-800">{current}</span></div><span className="portal-status">● System operational</span></div>{children}<footer className="mt-12 border-t border-slate-200 pt-5 text-xs text-slate-500">© {new Date().getFullYear()} serviQ · Gamage Recruiters — Team 407</footer></main>
    </div>
  </div>;
}
