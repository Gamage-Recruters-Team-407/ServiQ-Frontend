"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { USER_ROLES } from "@/utils/constants";

function AccessDeniedContent() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");
  const { user, role, logout } = useAuth();

  const isSuspended = reason === "suspended" || user?.account_status === "Suspended";

  const getDashboardHref = () => {
    if (role === USER_ROLES.PROVIDER) return "/provider/dashboard";
    if (role === USER_ROLES.ADMIN) return "/admin/dashboard";
    return "/customer/dashboard";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50/60 to-white p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-orange-500/5 border border-orange-200/60 text-center">
        <div
          className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${
            isSuspended ? "bg-red-50 text-red-500" : "bg-orange-50 text-orange-500"
          }`}
        >
          {isSuspended ? (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
            </svg>
          ) : (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          )}
        </div>

        <h1 className="text-2xl font-extrabold text-slate-900 mb-2">
          {isSuspended ? "Account Suspended" : "Access Denied"}
        </h1>

        <p className="text-sm text-slate-500 leading-relaxed mb-8">
          {isSuspended
            ? "Your account has been suspended due to an administrative review or policy violation. Please contact support to resolve this issue."
            : `You do not have the required permissions to view this portal. Your current role is set to ${role || "User"}.`}
        </p>

        <div className="flex flex-col gap-3">
          {!isSuspended && user && (
            <Link
              href={getDashboardHref()}
              className="inline-block py-3 px-6 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm shadow-md shadow-orange-600/20 transition-all"
            >
              Go to My Dashboard
            </Link>
          )}

          <button
            onClick={() => {
              logout();
              window.location.href = "/login";
            }}
            className="py-3 px-6 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-sm border border-slate-200 transition-all"
          >
            Switch / Log In Another Account
          </button>

          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-slate-600 transition-colors mt-2"
          >
            ← Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AccessDeniedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AccessDeniedContent />
    </Suspense>
  );
}
