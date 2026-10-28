"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/context/NotificationContext";
import { USER_ROLES } from "@/utils/constants";

export default function Navbar() {
  const pathname = usePathname();
  const { user, role, switchRole, logout } = useAuth();
  const { unreadCount, setIsOpen } = useNotifications();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const getDashboardLink = () => {
    if (role === USER_ROLES.ADMIN) return "/admin/dashboard";
    if (role === USER_ROLES.PROVIDER) return "/provider/dashboard";
    return "/customer/dashboard";
  };

  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/provider") ||
    pathname.startsWith("/customer")
  ) {
    return null;
  }

  return (
    <header className="sticky top-0 z-[100] border-b border-[var(--border-light)] bg-white py-3">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-6">
        <div className="flex flex-col items-center gap-1 text-center"></div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-2 rounded-full border border-[var(--secondary-accent)] bg-[var(--bg-secondary)] px-[0.8rem] py-[0.4rem] text-[0.8rem] text-[var(--text-main)]"
            >
              <span className="text-[var(--text-secondary)]">View as:</span>
              <strong className="text-[var(--primary-orange)]">{role}</strong>
              <span>▾</span>
            </button>

            {roleMenuOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] z-[200] w-[190px] rounded-[10px] border border-[var(--border-light)] bg-[var(--bg-card)] p-2 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
                <div className="px-2 py-1 text-xs text-[var(--text-secondary)]">
                  Switch Test Role:
                </div>
                {Object.values(USER_ROLES).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      switchRole(r);
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full rounded-md px-3 py-2 text-left text-[0.85rem] ${
                      role === r
                        ? "bg-[var(--bg-secondary)] font-semibold text-[var(--primary-orange)]"
                        : "bg-transparent font-normal text-[var(--text-main)]"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="relative flex items-center justify-center rounded-full bg-[var(--bg-secondary)] p-[0.55rem] text-[var(--text-secondary)] transition-colors duration-200 ease-[ease-in-out]"
            aria-label="Notifications"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#64748B"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>

            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[var(--status-error)] text-[0.7rem] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={logout}
                className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[var(--secondary-accent)] bg-[var(--bg-secondary)] px-[0.8rem] py-[0.4rem] text-[0.85rem] font-semibold text-[var(--text-main)] transition-all duration-200 ease-[ease-in-out] hover:bg-[#fed7aa]"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-[var(--primary-orange)] px-[0.8rem] py-[0.4rem] text-[0.85rem] font-semibold text-white transition-all duration-200 ease-[ease-in-out] hover:bg-[var(--primary-hover)]"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
