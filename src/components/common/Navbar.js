"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/context/NotificationContext";
import { USER_ROLES } from "@/utils/constants";

export default function Navbar() {
  const pathname = usePathname();
  const { user, role, switchRole } = useAuth();
  const { unreadCount, setIsOpen } = useNotifications();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getDashboardLink = () => {
    if (role === USER_ROLES.ADMIN) return "/admin/dashboard";
    if (role === USER_ROLES.PROVIDER) return "/provider/dashboard";
    return "/customer/dashboard";
  };

  const isActive = (path) => {
    if (path === "/services") {
      return pathname === "/services";
    }
    return pathname.startsWith(path);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link href="/" className="navbar-brand" onClick={closeMobileMenu}>
          <div className="navbar-logo-icon">S</div>

          <div className="navbar-brand-content">
            <span className="navbar-brand-name">
              Servi<span>Q</span>
            </span>
            <span className="navbar-brand-tagline">AI Marketplace</span>
          </div>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="navbar-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className={mobileMenuOpen ? "open" : ""}></span>
          <span className={mobileMenuOpen ? "open" : ""}></span>
          <span className={mobileMenuOpen ? "open" : ""}></span>
        </button>

        {/* Navigation + Actions */}
        <div
          className={`navbar-content ${
            mobileMenuOpen ? "navbar-content-open" : ""
          }`}
        >
          {/* Navigation Links */}
          <nav className="navbar-navigation">
            <Link
              href="/services"
              onClick={closeMobileMenu}
              className={`navbar-link ${isActive("/services") ? "active" : ""}`}
            >
              Services
            </Link>

            <Link
              href="/services/compare"
              onClick={closeMobileMenu}
              className={`navbar-link ${
                pathname.startsWith("/services/compare") ? "active" : ""
              }`}
            >
              Compare Providers
            </Link>

            <Link
              href={getDashboardLink()}
              onClick={closeMobileMenu}
              className={`navbar-link ${
                pathname.includes("/dashboard") ? "active" : ""
              }`}
            >
              Dashboard
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="navbar-actions">
            {/* Role Switcher */}
            <div className="navbar-role-wrapper">
              <button
                type="button"
                className={`navbar-role-button ${roleMenuOpen ? "active" : ""}`}
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                aria-expanded={roleMenuOpen}
              >
                <span className="navbar-role-label">View as:</span>
                <strong>{role}</strong>
                <span
                  className={`navbar-role-arrow ${
                    roleMenuOpen ? "rotated" : ""
                  }`}
                >
                  ▾
                </span>
              </button>

              {roleMenuOpen && (
                <div className="navbar-role-dropdown">
                  <p className="navbar-dropdown-heading">Switch Test Role</p>

                  {Object.values(USER_ROLES).map((r) => (
                    <button
                      type="button"
                      key={r}
                      className={`navbar-role-option ${
                        role === r ? "selected" : ""
                      }`}
                      onClick={() => {
                        switchRole(r);
                        setRoleMenuOpen(false);
                      }}
                    >
                      <span>{r}</span>
                      {role === r && <span>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications */}
            <button
              type="button"
              className="navbar-notification"
              onClick={() => setIsOpen(true)}
              aria-label={`Notifications, ${unreadCount} unread`}
            >
              <span className="navbar-bell">♧</span>

              {unreadCount > 0 && (
                <span className="navbar-notification-badge">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>

            {/* Authentication */}
            {user ? (
              <Link
                href={getDashboardLink()}
                className="navbar-user-profile"
                onClick={closeMobileMenu}
              >
                <span className="navbar-user-avatar">
                  {user.first_name?.[0] || "U"}
                </span>
                <span className="navbar-user-name">{user.first_name}</span>
              </Link>
            ) : (
              <div className="navbar-auth-buttons">
                <Link
                  href="/login"
                  className="btn btn-secondary btn-sm"
                  onClick={closeMobileMenu}
                >
                  Sign In
                </Link>

                <Link
                  href="/register"
                  className="btn btn-primary btn-sm"
                  onClick={closeMobileMenu}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
