// export default function ServicesPage() {
//   return (
//     <div className="container">
//       <h1>Services Catalogue</h1>
//       <p>Service discovery, search, and category filter placeholder (SRS §9, §10)</p>
//     </div>
//   );
// }


"use client";
import { useState } from "react";
import useApi from "@/utils/useApi";
import { categoryService } from "@/services/categoryService";
import { serviceService } from "@/services/serviceService";
import { ui } from "@/utils/ui";
import PageHeader from "@/components/common/PageHeader";
import LoadingGrid from "@/components/common/LoadingGrid";
import EmptyState from "@/components/common/EmptyState";
import Pagination from "@/components/common/Pagination";
import ServiceCard from "@/components/customer/ServiceCard";

export default function ServicesPage() {
  const [q, setQ] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [applied, setApplied] = useState({ q: "", category_id: "" });
  const [page, setPage] = useState(1);

  const categories = useApi(() => categoryService.getCategories(), []);
  const services = useApi(
    () => serviceService.getServices({ q: applied.q, category_id: applied.category_id, page, limit: 12 }),
    [applied.q, applied.category_id, page]
  );

  function onSubmit(e) {
    e.preventDefault();
    setApplied({ q: q.trim(), category_id: categoryId });
    setPage(1);
  }
  function clearFilters() {
    setQ(""); setCategoryId("");
    setApplied({ q: "", category_id: "" });
    setPage(1);
  }

  const total = services.meta?.total ?? 0;

  return (
    <>
      <PageHeader
        title={<>Service <span className="text-primary">catalogue</span></>}
        subtitle="Search all available services."
      />
      <div className={`${ui.wrap} pb-16 pt-8`}>
        <form className="mb-5 flex flex-wrap gap-2.5" onSubmit={onSubmit} role="search">
          <input
            className={`${ui.input} min-w-[240px] flex-1`}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search services, e.g. plumbing"
            aria-label="Search services"
          />
          <select
            className={`${ui.input} w-full sm:w-56`}
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            aria-label="Filter by category"
          >
            <option value="">All categories</option>
            {categories.data?.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
          <button className={ui.btnPrimary}>Search</button>
        </form>

        {services.error && <div className={ui.alertError} role="alert">{services.error}</div>}
        {!services.loading && !services.error && (
          <p className="mb-3.5 text-muted">{total} {total === 1 ? "service" : "services"} found</p>
        )}

        {services.loading ? (
          <LoadingGrid />
        ) : !services.data?.length ? (
          <EmptyState title="No services match your search" message="Try different keywords or choose another category.">
            <button className={ui.btnPrimary} onClick={clearFilters}>Clear filters</button>
          </EmptyState>
        ) : (
          <div className={ui.grid}>
            {services.data.map((s) => <ServiceCard key={s._id} service={s} />)}
          </div>
        )}
        <Pagination page={page} pages={services.meta?.pages} onChange={setPage} />
      </div>
    </>
  );
}