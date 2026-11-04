"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/context/NotificationContext";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user, role } = useAuth();
  const { setIsOpen } = useNotifications();

  const currentRole = String(
    role || user?.user_role || user?.role || "",
  ).toUpperCase();

  const roleLabels = {
    ADMIN: "Administrator",
    ADMINISTRATOR: "Administrator",
    CUSTOMER: "Customer",
    PROVIDER: "Service Provider",
    "SERVICE PROVIDER": "Service Provider",
  };

  const dashboardPaths = {
    ADMIN: "/admin/dashboard",
    ADMINISTRATOR: "/admin/dashboard",
    CUSTOMER: "/customer/dashboard",
    PROVIDER: "/provider/dashboard",
    "SERVICE PROVIDER": "/provider/dashboard",
  };

  const dashboardPath = dashboardPaths[currentRole] || "/dashboard";

  const isServicesActive = pathname === "/services";
  const isCompareActive = pathname.startsWith("/services/compare");
  const isDashboardActive = pathname.startsWith(dashboardPath);

  const closeMenu = () => setMobileMenuOpen(false);

  const linkStyle = (active) =>
    `rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
      active
        ? "bg-orange-50 text-orange-600"
        : "text-slate-600 hover:bg-slate-50 hover:text-orange-600"
    }`;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex min-h-[68px] w-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="text-2xl font-extrabold tracking-tight text-slate-900">
            Servi<span className="text-orange-500">Q</span>
          </span>
        </Link>

        <div className="hidden flex-1 items-center justify-between gap-4 md:flex">
          <nav className="flex items-center gap-2">
            <Link href="/services" className={linkStyle(isServicesActive)}>
              Explore Services
            </Link>

            <Link
              href="/services/compare"
              className={linkStyle(isCompareActive)}
            >
              Compare Services
            </Link>

            {user && (
              <Link
                href={dashboardPath}
                className={linkStyle(isDashboardActive)}
              >
                Dashboard
              </Link>
            )}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            {user ? (
              <>
                <span className="hidden rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600 lg:inline-flex">
                  {roleLabels[currentRole] || "User"}
                </span>

                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  aria-label="Open notifications"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-lg transition-colors hover:border-orange-200 hover:bg-orange-50"
                >
                  🔔
                </button>

                <Link
                  href="/profile"
                  className="rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-orange-600"
                >
                  My Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50 hover:text-orange-600"
                >
                  Sign In
                </Link>

                <Link
                  href="/register"
                  className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-orange-600"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-xl text-slate-700 transition-colors hover:bg-slate-50 md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 shadow-lg md:hidden">
          <nav className="flex flex-col gap-2">
            <Link
              href="/services"
              onClick={closeMenu}
              className={linkStyle(isServicesActive)}
            >
              Explore Services
            </Link>

            <Link
              href="/services/compare"
              onClick={closeMenu}
              className={linkStyle(isCompareActive)}
            >
              Compare Services
            </Link>

            {user && (
              <>
                <Link
                  href={dashboardPath}
                  onClick={closeMenu}
                  className={linkStyle(isDashboardActive)}
                >
                  Dashboard
                </Link>

                <div className="my-2 border-t border-slate-100" />

                <p className="px-3 text-xs font-semibold text-slate-400">
                  {roleLabels[currentRole] || "User"}
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(true);
                    closeMenu();
                  }}
                  className="rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                >
                  🔔 Notifications
                </button>

                <Link
                  href="/profile"
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                >
                  My Profile
                </Link>
              </>
            )}

            {!user && (
              <div className="flex flex-col gap-2 pt-2">
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-bold text-slate-700"
                >
                  Sign In
                </Link>

                <Link
                  href="/register"
                  onClick={closeMenu}
                  className="rounded-xl bg-orange-500 px-4 py-3 text-center text-sm font-bold text-white"
                >
                  Get Started
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
