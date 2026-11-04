"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SessionExpiredPage() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLoginAgain = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50/60 to-white p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-orange-500/5 border border-orange-200/60 text-center">
        <div className="w-16 h-16 mx-auto mb-6 bg-orange-50 rounded-full flex items-center justify-center text-orange-500">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>

        <h1 className="text-2xl font-extrabold text-slate-900 mb-2">
          Session Expired
        </h1>

        <p className="text-sm text-slate-500 leading-relaxed mb-8">
          For your security, your session has timed out due to inactivity. Please log back in to continue where you left off.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleLoginAgain}
            className="py-3 px-6 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm shadow-md shadow-orange-600/20 transition-all"
          >
            Log In Again
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
