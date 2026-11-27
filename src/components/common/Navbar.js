"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/context/NotificationContext";
import { USER_ROLES } from "@/utils/constants";
import LogoutButton from "@/components/auth/LogoutButton";

export default function Navbar({ variant = "admin" }) {
  const pathname = usePathname();
  const { user, role, switchRole } = useAuth();
  const { unreadCount, setIsOpen } = useNotifications();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const getBreadcrumb = () => {
    const segments = pathname.split("/").filter(Boolean);
    const formatWord = (str) =>
      str.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

    if (variant === "admin" || segments[0] === "admin") {
      return {
        section: "Administration",
        sectionHref: "/admin/analytics",
        page:
          segments[1] === "analytics" || segments[1] === "dashboard"
            ? "Admin Dashboard"
            : segments[1]
              ? formatWord(segments[1])
              : "Admin Dashboard",
        initials: "AD",
      };
    }

    if (variant === "provider" || segments[0] === "provider") {
      return {
        section: "Provider Portal",
        sectionHref: "/provider/dashboard",
        page: segments[1] ? formatWord(segments[1]) : "Dashboard",
        initials: "PR",
      };
    }

    if (variant === "customer" || segments[0] === "customer") {
      return {
        section: "Customer Portal",
        sectionHref: "/customer/dashboard",
        page: segments[1] ? formatWord(segments[1]) : "Dashboard",
        initials: "CU",
      };
    }

    return {
      section: "ServiQ",
      sectionHref: "/",
      page: segments.length
        ? formatWord(segments[segments.length - 1])
        : "Home",
      initials: "SQ",
    };
  };

  const info = getBreadcrumb();

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#FFFFFF] border-b border-[#E2E8F0] px-5 sm:px-8 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-2 min-w-0">
        <Link
          href={info.sectionHref}
          className="text-xs sm:text-sm font-medium text-[#64748B] hover:text-[#F97316] transition-colors truncate"
        >
          {info.section}
        </Link>
        <span className="text-xs sm:text-sm text-[#64748B]">/</span>
        <span className="text-xs sm:text-sm font-bold text-[#0F172A] truncate">
          {info.page}
        </span>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button"
          aria-label="Notifications"
          className="relative w-9 h-9 rounded-xl bg-[#FFFFFF] hover:bg-[#FFF7ED] border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:text-[#F97316] transition-colors cursor-pointer"
        >
          <Bell className="w-4 h-4 stroke-[2]" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#F97316]" />
        </button>

          {/* Auth State */}
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <Link
                href={getDashboardLink()}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "var(--radius-md)",
                  background: "var(--bg-tertiary)",
                  fontSize: "0.85rem",
                  color: "#fff"
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: "var(--brand-primary)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 700
                  }}
                >
                  {user.first_name?.[0] || "U"}
                </div>
                <span>{user.first_name}</span>
              </Link>
              <LogoutButton variant="navbar" />
            </div>
          ) : (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Link href="/login" className="btn btn-secondary btn-sm">
                Sign In
              </Link>
              <Link href="/register" className="btn btn-primary btn-sm">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
