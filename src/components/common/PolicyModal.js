"use client";

import React, { useState } from "react";

export default function PolicyModal({ isOpen, onClose, initialTab = "terms" }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-900/65 backdrop-blur-sm flex items-center justify-center p-5 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-2xl max-h-[85vh] rounded-2xl flex flex-col shadow-2xl border border-orange-200 overflow-hidden"
      >
        {/* Modal Header */}
        <div className="px-7 py-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <div className="inline-block text-[0.7rem] font-bold text-orange-600 tracking-wider uppercase mb-1">
              Gamage Recruiters • serviQ Platform
            </div>
            <h2 className="m-0 text-xl font-extrabold text-slate-900">
              Legal & Compliance Documents
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex px-7 gap-4 border-b border-slate-100 bg-stone-50">
          <button
            onClick={() => setActiveTab("terms")}
            className={`py-3 px-2 bg-transparent border-b-2 font-bold text-sm transition-all ${
              activeTab === "terms"
                ? "border-orange-600 text-orange-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Terms of Service
          </button>
          <button
            onClick={() => setActiveTab("privacy")}
            className={`py-3 px-2 bg-transparent border-b-2 font-bold text-sm transition-all ${
              activeTab === "privacy"
                ? "border-orange-600 text-orange-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Privacy Policy
          </button>
        </div>

        {/* Scrollable Document Body */}
        <div className="p-7 overflow-y-auto text-sm leading-relaxed text-slate-700 space-y-4">
          {activeTab === "terms" ? (
            <div>
              <p className="text-xs text-slate-500 mb-4">
                <strong className="font-semibold text-slate-700">Last Updated:</strong> October 2026 • Version 1.0 Aligned
              </p>

              <h4 className="text-slate-900 font-bold mb-1">1. Acceptance of Terms</h4>
              <p className="mb-4">
                By creating an account or accessing the <strong className="font-semibold text-slate-900">serviQ</strong> platform (operated by Gamage Recruiters Pvt Ltd), you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use the platform.
              </p>

              <h4 className="text-slate-900 font-bold mb-1">2. Roles and Responsibilities</h4>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li><strong className="font-semibold text-slate-900">Customers:</strong> Responsible for providing accurate service locations, booking requirements, and making timely payments for completed services.</li>
                <li><strong className="font-semibold text-slate-900">Service Providers:</strong> Must maintain valid government-issued IDs, accurate trade qualifications, updated calendar availability, and deliver services according to agreed specifications.</li>
                <li><strong className="font-semibold text-slate-900">Administrators:</strong> Oversee verification, dispute resolution, and marketplace safety.</li>
              </ul>

              <h4 className="text-slate-900 font-bold mb-1">3. Booking & Scheduling Lifecycle</h4>
              <p className="mb-4">
                All bookings submitted through serviQ establish a binding scheduling agreement upon provider acceptance. Rescheduling and cancellations must adhere to the permitted notice windows to avoid cancellation penalties.
              </p>

              <h4 className="text-slate-900 font-bold mb-1">4. Payments & Escrow Protection</h4>
              <p className="mb-4">
                To safeguard both parties, customer payments are processed via verified digital payment gateways and held in escrow. Payouts are disbursed to providers only upon successful customer sign-off or validated service completion.
              </p>

              <h4 className="text-slate-900 font-bold mb-1">5. Dispute Resolution</h4>
              <p className="mb-4">
                In the event of incomplete delivery, property damage, or expectation mismatch, either party may file a formal dispute within the eligible submission window. The administrative team reserves the right to review evidence and issue full or partial refunds.
              </p>

              <h4 className="text-slate-900 font-bold mb-1">6. Account Suspension & Termination</h4>
              <p>
                serviQ reserves the right to restrict, suspend, or terminate accounts involved in fraudulent activity, harassment, unverified credentials, or repeated cancellations.
              </p>
            </div>
          ) : (
            <div>
              <p className="text-xs text-slate-500 mb-4">
                <strong className="font-semibold text-slate-700">Last Updated:</strong> October 2026 • Security & Data Protection
              </p>

              <h4 className="text-slate-900 font-bold mb-1">1. Information We Collect</h4>
              <p className="mb-4">
                We collect personal information necessary to deliver marketplace services, including your name, email address, telephone number, service delivery address, and role-specific trade documents (for service providers).
              </p>

              <h4 className="text-slate-900 font-bold mb-1">2. How We Use Your Information</h4>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li>To enable intelligent AI matching and location-aware provider discovery.</li>
                <li>To facilitate encrypted customer-provider in-app messaging and appointment scheduling.</li>
                <li>To process secure digital payments, calculate marketplace commissions, and disburse provider earnings.</li>
                <li>To maintain audit and security logs for fraud prevention.</li>
              </ul>

              <h4 className="text-slate-900 font-bold mb-1">3. Protection of Financial Credentials</h4>
              <p className="mb-4">
                serviQ does not store complete credit card or debit card numbers on its servers. All payment transactions are handled through PCI-DSS compliant payment gateways with bank-grade encryption.
              </p>

              <h4 className="text-slate-900 font-bold mb-1">4. Role-Based Access Controls</h4>
              <p className="mb-4">
                Strict data-level authorization boundaries ensure that other customers cannot view your private contact or transaction records, and service providers cannot access unrelated customer or provider financial data.
              </p>

              <h4 className="text-slate-900 font-bold mb-1">5. Your Data Rights</h4>
              <p>
                You have the right to review, update, or request the deletion of your personal account information at any time through your Profile Dashboard or by contacting customer support.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-7 py-4 border-t border-slate-100 bg-stone-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Gamage Recruiters (Pvt) Ltd
          </span>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md shadow-orange-600/30 transition-all"
          >
            I Understand & Accept
          </button>
        </div>
      </div>
    </div>
  );
}
