"use client";

import { useState } from "react";

export default function PlatformSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form states
  const [generalSettings, setGeneralSettings] = useState({
    platformName: "ServiceHub",
    supportEmail: "support@servicehub.lk",
    supportPhone: "+94 11 234 5678",
    defaultLanguage: "English",
    defaultCurrency: "LKR – Sri Lankan Rupee",
    timeZone: "Asia/Colombo (UTC+05:30)",
    launchRegions: "Galle, Matara, Colombo, Kandy",
    maintenanceMode: false,
  });

  const [commissionSettings, setCommissionSettings] = useState({
    defaultRate: 10,
    minBookingFee: 250,
    payoutCycle: "Weekly (Every Monday)",
    autoDeductCommission: true,
  });

  const [bookingSettings, setBookingSettings] = useState({
    instantBooking: true,
    cancellationBufferHours: 24,
    autoRefundCancelled: true,
    allowCashOnDelivery: true,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    smsAlerts: true,
    adminDisputeAlerts: true,
    weeklyReportDigest: true,
  });

  const [aiSettings, setAiSettings] = useState({
    smartMatching: true,
    aiDisputeSentiment: true,
    automatedCategorization: true,
  });

  const [securitySettings, setSecuritySettings] = useState({
    sessionTimeoutMins: 60,
    require2FAForAdmins: true,
    auditRetentionDays: 365,
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const tabs = [
    {
      id: "general",
      label: "General",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      id: "commissions",
      label: "Commission rules",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
    {
      id: "bookings",
      label: "Bookings & payments",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
    },
    {
      id: "ai",
      label: "AI features",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      id: "security",
      label: "Security & audit",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Page Title & Subtitle */}
      <div>
        <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
          Platform <span className="text-[#EA580C]">Settings</span>
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          Configure marketplace behaviour. Sensitive changes are recorded in the audit trail.
        </p>
      </div>

      {/* Main Settings Card */}
      <div className="bg-white rounded-2xl border border-[#EFEAE3] shadow-sm p-6 flex flex-col md:flex-row gap-8">
        {/* Left Side Tab Navigation */}
        <aside className="w-full md:w-56 shrink-0 flex flex-col gap-1.5">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition text-left ${
                  isActive
                    ? "bg-[#FEF3E7] text-[#EA580C] font-semibold"
                    : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                }`}
              >
                <span className={isActive ? "text-[#EA580C]" : "text-stone-400"}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Right Side Form Content */}
        <div className="flex-1 min-w-0">
          {savedSuccess && (
            <div className="mb-5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center justify-between">
              <span>Settings successfully updated and logged to audit trail.</span>
              <button
                type="button"
                onClick={() => setSavedSuccess(false)}
                className="text-emerald-600 hover:text-emerald-900 font-bold"
              >
                &times;
              </button>
            </div>
          )}

          {/* TAB 1: GENERAL */}
          {activeTab === "general" && (
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-stone-900 leading-tight">General</h2>
                <p className="text-xs text-stone-500 mt-0.5">Basic platform information</p>
              </div>

              {/* 2-Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {/* Platform name */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Platform name
                  </label>
                  <input
                    type="text"
                    value={generalSettings.platformName}
                    onChange={(e) =>
                      setGeneralSettings({ ...generalSettings, platformName: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm text-stone-800 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition"
                  />
                </div>

                {/* Support email */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Support email
                  </label>
                  <input
                    type="email"
                    value={generalSettings.supportEmail}
                    onChange={(e) =>
                      setGeneralSettings({ ...generalSettings, supportEmail: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm text-stone-800 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition"
                  />
                </div>

                {/* Support phone */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Support phone
                  </label>
                  <input
                    type="text"
                    value={generalSettings.supportPhone}
                    onChange={(e) =>
                      setGeneralSettings({ ...generalSettings, supportPhone: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm text-stone-800 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition"
                  />
                </div>

                {/* Default language */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Default language
                  </label>
                  <input
                    type="text"
                    value={generalSettings.defaultLanguage}
                    onChange={(e) =>
                      setGeneralSettings({ ...generalSettings, defaultLanguage: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm text-stone-800 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition"
                  />
                </div>

                {/* Default currency */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Default currency
                  </label>
                  <input
                    type="text"
                    value={generalSettings.defaultCurrency}
                    onChange={(e) =>
                      setGeneralSettings({ ...generalSettings, defaultCurrency: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm text-stone-800 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition"
                  />
                  <p className="text-[11px] text-stone-400 mt-1">
                    Final supported currencies are pending client confirmation.
                  </p>
                </div>

                {/* Time zone */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Time zone
                  </label>
                  <input
                    type="text"
                    value={generalSettings.timeZone}
                    onChange={(e) =>
                      setGeneralSettings({ ...generalSettings, timeZone: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm text-stone-800 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition"
                  />
                </div>
              </div>

              {/* Launch regions */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Launch regions
                </label>
                <input
                  type="text"
                  value={generalSettings.launchRegions}
                  onChange={(e) =>
                    setGeneralSettings({ ...generalSettings, launchRegions: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-sm text-stone-800 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition"
                />
                <p className="text-[11px] text-stone-400 mt-1">
                  Geographic coverage is to be confirmed by the client.
                </p>
              </div>

              {/* Maintenance mode Toggle */}
              <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                <div>
                  <div className="text-sm font-semibold text-stone-800">Maintenance mode</div>
                  <div className="text-xs text-stone-400 mt-0.5">
                    Show a maintenance page to customers and providers. Admins keep access.
                  </div>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={generalSettings.maintenanceMode}
                  onClick={() =>
                    setGeneralSettings({
                      ...generalSettings,
                      maintenanceMode: !generalSettings.maintenanceMode,
                    })
                  }
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    generalSettings.maintenanceMode ? "bg-[#EA580C]" : "bg-stone-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      generalSettings.maintenanceMode ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Save changes button */}
              <div className="flex justify-end pt-3">
                <button
                  type="submit"
                  className="bg-[#EA580C] hover:bg-[#C2410C] text-white px-5 py-2.5 rounded-xl font-medium text-sm transition shadow-sm"
                >
                  Save changes
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: COMMISSION RULES */}
          {activeTab === "commissions" && (
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-stone-900 leading-tight">
                  Commission Rules
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Platform revenue deductions and payout scheduling
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Default commission rate (%)
                  </label>
                  <input
                    type="number"
                    value={commissionSettings.defaultRate}
                    onChange={(e) =>
                      setCommissionSettings({
                        ...commissionSettings,
                        defaultRate: Number(e.target.value),
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm text-stone-800 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#EA580C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Minimum booking fee (LKR)
                  </label>
                  <input
                    type="number"
                    value={commissionSettings.minBookingFee}
                    onChange={(e) =>
                      setCommissionSettings({
                        ...commissionSettings,
                        minBookingFee: Number(e.target.value),
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm text-stone-800 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#EA580C]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Payout cycle
                  </label>
                  <input
                    type="text"
                    value={commissionSettings.payoutCycle}
                    onChange={(e) =>
                      setCommissionSettings({
                        ...commissionSettings,
                        payoutCycle: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm text-stone-800 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#EA580C]"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <button
                  type="submit"
                  className="bg-[#EA580C] hover:bg-[#C2410C] text-white px-5 py-2.5 rounded-xl font-medium text-sm transition shadow-sm"
                >
                  Save changes
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: BOOKINGS & PAYMENTS */}
          {activeTab === "bookings" && (
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-stone-900 leading-tight">
                  Bookings & Payments
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Booking lifecycles, cancellations and payment rules
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-stone-100">
                  <div>
                    <div className="text-sm font-semibold text-stone-800">Instant booking</div>
                    <div className="text-xs text-stone-400">
                      Allow customers to confirm available slots immediately without waiting for provider response.
                    </div>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={bookingSettings.instantBooking}
                    onClick={() =>
                      setBookingSettings({
                        ...bookingSettings,
                        instantBooking: !bookingSettings.instantBooking,
                      })
                    }
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                      bookingSettings.instantBooking ? "bg-[#EA580C]" : "bg-stone-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                        bookingSettings.instantBooking ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-stone-100">
                  <div>
                    <div className="text-sm font-semibold text-stone-800">Auto-refund on cancellation</div>
                    <div className="text-xs text-stone-400">
                      Issue automated wallet/gateway refund if customer cancels before grace period.
                    </div>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={bookingSettings.autoRefundCancelled}
                    onClick={() =>
                      setBookingSettings({
                        ...bookingSettings,
                        autoRefundCancelled: !bookingSettings.autoRefundCancelled,
                      })
                    }
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                      bookingSettings.autoRefundCancelled ? "bg-[#EA580C]" : "bg-stone-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                        bookingSettings.autoRefundCancelled ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <button
                  type="submit"
                  className="bg-[#EA580C] hover:bg-[#C2410C] text-white px-5 py-2.5 rounded-xl font-medium text-sm transition shadow-sm"
                >
                  Save changes
                </button>
              </div>
            </form>
          )}

          {/* TAB 4: NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-stone-900 leading-tight">Notifications</h2>
                <p className="text-xs text-stone-500 mt-0.5">Automated customer and provider dispatch channels</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-stone-100">
                  <div>
                    <div className="text-sm font-semibold text-stone-800">Email notifications</div>
                    <div className="text-xs text-stone-400">Send transactional booking emails via SendGrid / SES</div>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={notificationSettings.emailAlerts}
                    onClick={() =>
                      setNotificationSettings({
                        ...notificationSettings,
                        emailAlerts: !notificationSettings.emailAlerts,
                      })
                    }
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                      notificationSettings.emailAlerts ? "bg-[#EA580C]" : "bg-stone-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                        notificationSettings.emailAlerts ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-stone-100">
                  <div>
                    <div className="text-sm font-semibold text-stone-800">SMS OTP & status alerts</div>
                    <div className="text-xs text-stone-400">Send SMS notifications to registered phone numbers</div>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={notificationSettings.smsAlerts}
                    onClick={() =>
                      setNotificationSettings({
                        ...notificationSettings,
                        smsAlerts: !notificationSettings.smsAlerts,
                      })
                    }
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                      notificationSettings.smsAlerts ? "bg-[#EA580C]" : "bg-stone-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                        notificationSettings.smsAlerts ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <button
                  type="submit"
                  className="bg-[#EA580C] hover:bg-[#C2410C] text-white px-5 py-2.5 rounded-xl font-medium text-sm transition shadow-sm"
                >
                  Save changes
                </button>
              </div>
            </form>
          )}

          {/* TAB 5: AI FEATURES */}
          {activeTab === "ai" && (
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-stone-900 leading-tight">AI Features</h2>
                <p className="text-xs text-stone-500 mt-0.5">Smart recommendations, classification and assistant</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-stone-100">
                  <div>
                    <div className="text-sm font-semibold text-stone-800">Smart provider matching</div>
                    <div className="text-xs text-stone-400">Use AI to rank and match providers by historical rating & distance</div>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={aiSettings.smartMatching}
                    onClick={() => setAiSettings({ ...aiSettings, smartMatching: !aiSettings.smartMatching })}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                      aiSettings.smartMatching ? "bg-[#EA580C]" : "bg-stone-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                        aiSettings.smartMatching ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-stone-100">
                  <div>
                    <div className="text-sm font-semibold text-stone-800">Automated dispute sentiment scoring</div>
                    <div className="text-xs text-stone-400">Analyze chat and dispute descriptions for priority triage</div>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={aiSettings.aiDisputeSentiment}
                    onClick={() =>
                      setAiSettings({ ...aiSettings, aiDisputeSentiment: !aiSettings.aiDisputeSentiment })
                    }
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                      aiSettings.aiDisputeSentiment ? "bg-[#EA580C]" : "bg-stone-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                        aiSettings.aiDisputeSentiment ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <button
                  type="submit"
                  className="bg-[#EA580C] hover:bg-[#C2410C] text-white px-5 py-2.5 rounded-xl font-medium text-sm transition shadow-sm"
                >
                  Save changes
                </button>
              </div>
            </form>
          )}

          {/* TAB 6: SECURITY & AUDIT */}
          {activeTab === "security" && (
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-stone-900 leading-tight">Security & Audit</h2>
                <p className="text-xs text-stone-500 mt-0.5">Admin session controls and immutable audit log retention</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Admin session timeout (minutes)
                  </label>
                  <input
                    type="number"
                    value={securitySettings.sessionTimeoutMins}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        sessionTimeoutMins: Number(e.target.value),
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm text-stone-800 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#EA580C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Audit log retention period (days)
                  </label>
                  <input
                    type="number"
                    value={securitySettings.auditRetentionDays}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        auditRetentionDays: Number(e.target.value),
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm text-stone-800 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#EA580C]"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <button
                  type="submit"
                  className="bg-[#EA580C] hover:bg-[#C2410C] text-white px-5 py-2.5 rounded-xl font-medium text-sm transition shadow-sm"
                >
                  Save changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

