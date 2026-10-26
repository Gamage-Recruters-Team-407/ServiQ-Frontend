"use client";

import React, { useState } from "react";
import Link from "next/link";
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

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "rgba(9, 13, 22, 0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border-subtle)",
        height: "72px"
      }}
    >
      <div
        className="container"
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        {/* Brand Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "10px",
              background: "var(--brand-gradient)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 800,
              fontSize: "1.2rem",
              boxShadow: "var(--brand-glow)"
            }}
          >
            S
          </div>
          <div>
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.35rem",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                background: "linear-gradient(to right, #fff, #94a3b8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              Servi<span style={{ color: "var(--brand-primary)", WebkitTextFillColor: "initial" }}>Q</span>
            </span>
            <span
              style={{
                display: "block",
                fontSize: "0.65rem",
                color: "var(--accent-cyan)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontWeight: 600,
                marginTop: "-4px"
              }}
            >
              AI Marketplace
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <Link
            href="/services"
            style={{
              fontSize: "0.95rem",
              fontWeight: 500,
              color: pathname.startsWith("/services") ? "#fff" : "var(--text-secondary)",
              transition: "color var(--transition-fast)"
            }}
          >
            Services
          </Link>
          <Link
            href="/services/compare"
            style={{
              fontSize: "0.95rem",
              fontWeight: 500,
              color: pathname.startsWith("/services/compare") ? "#fff" : "var(--text-secondary)",
              transition: "color var(--transition-fast)"
            }}
          >
            Compare Providers
          </Link>
          <Link
            href={getDashboardLink()}
            style={{
              fontSize: "0.95rem",
              fontWeight: 500,
              color: pathname.includes("/dashboard") ? "#fff" : "var(--text-secondary)",
              transition: "color var(--transition-fast)"
            }}
          >
            Dashboard
          </Link>
        </nav>

        {/* Right Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* Role Switcher Pill */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.4rem 0.8rem",
                borderRadius: "var(--radius-full)",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid var(--border-subtle)",
                fontSize: "0.8rem",
                color: "var(--text-secondary)"
              }}
            >
              <span style={{ color: "var(--text-muted)" }}>View as:</span>
              <strong style={{ color: "var(--brand-primary)" }}>{role}</strong>
              <span>▾</span>
            </button>

            {roleMenuOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  right: 0,
                  width: 190,
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-light)",
                  borderRadius: "var(--radius-md)",
                  padding: "0.5rem",
                  boxShadow: "var(--shadow-lg)",
                  zIndex: 200
                }}
              >
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", padding: "0.25rem 0.5rem" }}>
                  Switch Test Role:
                </div>
                {Object.values(USER_ROLES).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      switchRole(r);
                      setRoleMenuOpen(false);
                    }}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "0.5rem 0.75rem",
                      borderRadius: "var(--radius-sm)",
                      fontSize: "0.85rem",
                      color: role === r ? "var(--brand-primary)" : "var(--text-primary)",
                      background: role === r ? "rgba(99, 102, 241, 0.1)" : "transparent",
                      fontWeight: role === r ? 600 : 400
                    }}
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Trigger */}
          <button
            onClick={() => setIsOpen(true)}
            style={{
              position: "relative",
              padding: "0.5rem",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.04)",
              color: "var(--text-secondary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            aria-label="Notifications"
          >
            🔔
            {unreadCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -2,
                  right: -2,
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "var(--accent-rose)",
                  color: "#fff",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {unreadCount}
              </span>
            )}
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
