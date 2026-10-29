"use client";

import React, { useState, useEffect } from "react";
import { customerService } from "@/services/customerService";
import ProfileEditForm from "@/components/customer/ProfileEditForm";
import CustomerSettingsForm from "@/components/customer/CustomerSettingsForm";
import ChangePasswordForm from "@/components/customer/ChangePasswordForm";

export default function CustomerProfilePage() {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [activeTab, setActiveTab] = useState("profile"); // 'profile' | 'settings' | 'security'

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const res = await customerService.getMyProfile();
        if (!ignore) {
          if (res.success && res.data?.customer) {
            setCustomer(res.data.customer);
          } else {
            setError(res.message || "Failed to load customer profile");
          }
        }
      } catch (err) {
        if (!ignore) {
          console.error("Failed to load customer profile:", err);
          setError(err.message || "Unable to retrieve your customer account details.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, [reloadTrigger]);

  const handleProfileUpdated = (updatedCustomer) => {
    setCustomer(updatedCustomer);
  };

  const handleSettingsUpdated = (updatedCustomer) => {
    setCustomer(updatedCustomer);
  };

  // Safe accessor helpers
  const user = customer?.user_id || {};
  const details = customer?.profile_details || {};
  const fullName = [
    details.first_name || user.first_name || "",
    details.last_name || user.last_name || ""
  ]
    .join(" ")
    .trim() || "Customer Account";
  const avatarUrl = details.avatar_url || user.profile_image || "";
  const email = user.email || "";
  const phone = details.phone_number || user.phone_number || "";
  const status = customer?.account_status || user.account_status || "Active";
  const memberSince = customer?.created_at
    ? new Date(customer.created_at).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric"
      })
    : "Recent";

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
          Account & Profile Management
        </h1>
        <p className="mt-1 text-sm text-muted">
          Manage your personal information, on-site service locations, and platform preferences.
        </p>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="space-y-6 animate-pulse">
          <div className="h-44 rounded-2xl border border-line bg-surface/50" />
          <div className="h-96 rounded-2xl border border-line bg-surface/50" />
        </div>
      )}

      {/* Error Retry Banner */}
      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-900 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="text-xl">⚠</span>
            <div className="flex-1">
              <h3 className="font-bold">Failed to load account profile</h3>
              <p className="mt-1 text-sm text-red-700">{error}</p>
              <button
                type="button"
                onClick={() => {
                  setLoading(true);
                  setReloadTrigger((v) => v + 1);
                }}
                className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-red-700"
              >
                Retry Loading
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Overview Card */}
      {!loading && !error && (
        <>
          <div className="relative overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-5">
                {/* Avatar */}
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border-2 border-primary/20 bg-surface shadow-inner sm:h-24 sm:w-24">
                  {avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={avatarUrl}
                      alt={fullName}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-primary">
                      {fullName[0] || "C"}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-bold text-ink sm:text-2xl">{fullName}</h2>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      ● {status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted sm:text-sm">
                    {email && (
                      <span className="flex items-center gap-1">
                        <span>✉</span>
                        <span>{email}</span>
                      </span>
                    )}
                    {phone && (
                      <span className="flex items-center gap-1">
                        <span>📞</span>
                        <span>{phone}</span>
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <span>📅</span>
                      <span>Member since {memberSince}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Tags */}
              <div className="flex flex-wrap gap-2 border-t border-line/60 pt-4 sm:border-t-0 sm:pt-0">
                <span className="rounded-lg border border-line bg-surface px-3 py-1 text-xs font-medium text-ink">
                  Role: <strong className="text-primary-dark">Customer</strong>
                </span>
                <span className="rounded-lg border border-line bg-surface px-3 py-1 text-xs font-medium text-ink">
                  Language: <strong className="uppercase">{customer?.preferences?.language || "en"}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-line gap-2 overflow-x-auto text-sm font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 transition whitespace-nowrap ${
                activeTab === "profile"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted hover:border-line hover:text-ink"
              }`}
            >
              <span>👤</span>
              <span>Profile & Address</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("settings")}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 transition whitespace-nowrap ${
                activeTab === "settings"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted hover:border-line hover:text-ink"
              }`}
            >
              <span>⚙️</span>
              <span>Preferences & Notifications</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("security")}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 transition whitespace-nowrap ${
                activeTab === "security"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted hover:border-line hover:text-ink"
              }`}
            >
              <span>🔒</span>
              <span>Security & Password</span>
            </button>
          </div>

          {/* Tab Panes */}
          <div>
            {activeTab === "profile" && (
              <ProfileEditForm
                key={`profile-${customer?._id || "init"}`}
                customer={customer}
                onProfileUpdated={handleProfileUpdated}
              />
            )}

            {activeTab === "settings" && (
              <CustomerSettingsForm
                key={`settings-${customer?._id || "init"}`}
                customer={customer}
                onSettingsUpdated={handleSettingsUpdated}
              />
            )}

            {activeTab === "security" && (
              <ChangePasswordForm userEmail={email} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
