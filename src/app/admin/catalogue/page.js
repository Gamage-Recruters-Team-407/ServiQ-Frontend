"use client";
import { useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import CategoryManager from "@/components/admin/CategoryManager";
import ServiceManager from "@/components/admin/ServiceManager";

const TABS = [
  { key: "categories", label: "Categories" },
  { key: "services", label: "Services" },
];

// TODO: protect with the admin role guard once auth is available (frontend + backend routes).
export default function AdminCataloguePage() {
  const [tab, setTab] = useState("categories");

  return (
    // White panel keeps the Orange & White design inside the dark admin portal
    <div className="overflow-hidden rounded-2xl bg-white text-ink shadow-sm">
      <PageHeader
        title={<>Catalogue <span className="text-primary">management</span></>}
        subtitle="Manage service categories and service records."
      />
      <div className="px-6 pb-10 pt-6">
        <div className="mb-6 inline-flex rounded-lg bg-surface p-1" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={tab === t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-md px-5 py-2 text-sm font-semibold transition ${
                tab === t.key ? "bg-white text-primary shadow-sm" : "text-muted hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "categories" ? <CategoryManager /> : <ServiceManager />}
      </div>
    </div>
  );
}