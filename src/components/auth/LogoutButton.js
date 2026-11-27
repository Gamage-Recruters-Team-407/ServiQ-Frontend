"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LogoutButton({
  redirectTo = "/login",
  label = "Log Out",
  variant = "default",
  className = "",
  style = {},
  onLoggedOut
}) {
  const router = useRouter();
  const { logout, isLoggingOut } = useAuth();
  const [pending, setPending] = useState(false);

  const busy = pending || isLoggingOut;

  const handleLogout = async () => {
    if (busy) return;
    setPending(true);
    try {
      const result = await logout();
      if (onLoggedOut) {
        onLoggedOut(result);
      }
      if (redirectTo) {
        router.push(redirectTo);
      }
    } finally {
      setPending(false);
    }
  };

  const baseStyle =
    variant === "navbar"
      ? {
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          padding: "0.42rem 0.85rem",
          borderRadius: "var(--radius-md)",
          background: "rgba(249, 115, 22, 0.14)",
          border: "1px solid rgba(249, 115, 22, 0.4)",
          color: "#fb923c",
          fontSize: "0.82rem",
          fontWeight: 600,
          cursor: busy ? "not-allowed" : "pointer",
          opacity: busy ? 0.65 : 1,
          transition: "all 0.15s ease"
        }
      : {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.45rem",
          padding: "0.55rem 1rem",
          borderRadius: "10px",
          background: "#FFFFFF",
          border: "1px solid #E2E8F0",
          color: "#DC2626",
          fontSize: "0.86rem",
          fontWeight: 600,
          cursor: busy ? "not-allowed" : "pointer",
          opacity: busy ? 0.65 : 1,
          transition: "all 0.15s ease"
        };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={busy}
      className={className}
      style={{ ...baseStyle, ...style }}
      aria-label={label}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{busy ? "Logging out..." : label}</span>
    </button>
  );
}
