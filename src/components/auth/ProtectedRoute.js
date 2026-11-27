"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { USER_ROLES } from "@/utils/constants";

function getDashboardForRole(role) {
  if (role === USER_ROLES.ADMIN) return "/admin/dashboard";
  if (role === USER_ROLES.PROVIDER) return "/provider/dashboard";
  return "/customer/dashboard";
}

export default function ProtectedRoute({ allowedRoles = [], children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, token, role, authReady, logout } = useAuth();

  const isAuthenticated = Boolean(user && token);
  const isAuthorized =
    isAuthenticated && (allowedRoles.length === 0 || allowedRoles.includes(role));

  useEffect(() => {
    if (authReady && !isAuthenticated) {
      const target = pathname ? `/login?next=${encodeURIComponent(pathname)}` : "/login";
      router.replace(target);
    }
  }, [authReady, isAuthenticated, pathname, router]);

  if (!authReady || !isAuthenticated) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.75rem",
          backgroundColor: "#FFF7ED",
          color: "#0F172A",
          padding: "2rem"
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            border: "3px solid #FFEDD5",
            borderTopColor: "#F97316",
            animation: "spin 0.8s linear infinite"
          }}
        />
        <p style={{ fontSize: "0.92rem", fontWeight: 600, color: "#64748B" }}>
          {!authReady ? "Checking your session..." : "Redirecting to Sign In..."}
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!isAuthorized) {
    const homeDashboard = getDashboardForRole(role);
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFF7ED",
          padding: "1.5rem"
        }}
      >
        <div
          style={{
            maxWidth: 440,
            width: "100%",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: "18px",
            padding: "2rem",
            textAlign: "center",
            boxShadow: "0 18px 40px rgba(15, 23, 42, 0.08)"
          }}
        >
          <h1 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.5rem" }}>
            Access Denied
          </h1>
          <p style={{ fontSize: "0.9rem", color: "#64748B", lineHeight: 1.55, marginBottom: "1.4rem" }}>
            Your current account role (<strong>{role}</strong>) does not have permission to access
            this portal.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
            <Link
              href={homeDashboard}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: "44px",
                borderRadius: "10px",
                backgroundColor: "#F97316",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: "0.9rem",
                textDecoration: "none"
              }}
            >
              Go to My Dashboard
            </Link>
            <button
              type="button"
              onClick={async () => {
                await logout();
                router.replace("/login");
              }}
              style={{
                height: "42px",
                borderRadius: "10px",
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                color: "#0F172A",
                fontWeight: 600,
                fontSize: "0.86rem",
                cursor: "pointer"
              }}
            >
              Sign In with Another Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
