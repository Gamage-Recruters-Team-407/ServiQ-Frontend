"use client";
import { useState } from "react";
import CategoryManager from "@/components/admin/CategoryManager";
import ServiceManager from "@/components/admin/ServiceManager";

const TABS = [
  { id: "categories", label: "Categories" },
  { id: "services", label: "Services" },
];

// TODO: protect this page with the admin role guard once auth is ready.
export default function AdminCataloguePage() {
  const [tab, setTab] = useState("categories");

  return (
    <div className="mx-auto w-full max-w-7xl">
      {/* Header */}
      <div className="mb-6 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white shadow-lg shadow-orange-500/20 sm:p-8">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
          Catalogue management
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-orange-50 sm:text-base">
          Manage service categories and service records.
        </p>
      </div>

      {/* Tabs */}
      <div
        className="mb-6 inline-flex rounded-xl border border-solid border-slate-200 bg-white p-1 shadow-sm"
        role="tablist"
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-lg px-5 py-2 text-sm font-semibold transition ${
              tab === t.id
                ? "bg-orange-500 text-white shadow-sm"
                : "text-slate-500 hover:bg-orange-50 hover:text-slate-900"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === "categories" ? <CategoryManager /> : <ServiceManager />}
    </div>
  );
}