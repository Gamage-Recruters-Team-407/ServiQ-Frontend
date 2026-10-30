"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { USER_STATUSES } from "@/utils/constants";

/**
 * ProtectedRoute component
 * Wraps protected pages and portals, enforcing authentication and role guards
 * 
 * @param {Array<string>} allowedRoles - Optional list of authorized roles
 * @param {React.ReactNode} children - Child content
 */
export default function ProtectedRoute({ allowedRoles = [], children }) {
  const { user, role, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      const redirectUrl = pathname ? `/login?redirect=${encodeURIComponent(pathname)}` : "/login";
      router.replace(redirectUrl);
      return;
    }

    if (user?.account_status === "Suspended") {
      router.replace("/access-denied?reason=suspended");
      return;
    }

    if (allowedRoles.length > 0 && role && !allowedRoles.includes(role)) {
      router.replace(`/access-denied?reason=role&role=${encodeURIComponent(role)}`);
      return;
    }
  }, [loading, isAuthenticated, role, user, allowedRoles, router, pathname]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-slate-500">
        <div className="w-11 h-11 border-4 border-orange-500/20 border-t-orange-600 rounded-full animate-spin" />
        <p className="text-sm font-medium text-slate-600">Verifying credentials...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (user?.account_status === "Suspended") {
    return null;
  }

  if (allowedRoles.length > 0 && role && !allowedRoles.includes(role)) {
    return null;
  }

  return <>{children}</>;
}
