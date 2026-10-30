"use client";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import useApi from "@/utils/useApi";
import { categoryService } from "@/services/categoryService";
import { serviceService } from "@/services/serviceService";
import { ui } from "@/utils/ui";
import PageHeader from "@/components/common/PageHeader";
import LoadingGrid from "@/components/common/LoadingGrid";
import EmptyState from "@/components/common/EmptyState";
import Pagination from "@/components/common/Pagination";
import CategoryCard from "@/components/customer/CategoryCard";
import ServiceCard from "@/components/customer/ServiceCard";

export default function CategoryPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(1);

  const category = useApi(() => categoryService.getCategoryBySlug(slug), [slug]);
  const cat = category.data;

  const subs = useApi(
    () => categoryService.getCategories({ parent: cat._id, withCounts: 1 }),
    [cat?._id],
    Boolean(cat)
  );
  const services = useApi(
    () => serviceService.getServices({ category_id: cat._id, page, limit: 12 }),
    [cat?._id, page],
    Boolean(cat)
  );

  if (category.error) {
    return (
      <div className={`${ui.wrap} py-16`}>
        <EmptyState title="Category not found" message="This category does not exist or is no longer available.">
          <Link href="/categories" className={ui.btnPrimary}>Browse categories</Link>
        </EmptyState>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Categories", href: "/categories" }, { label: cat?.name || "…" }]}
        title={cat?.name || "Loading…"}
        subtitle={cat?.description}
      />
      <div className={`${ui.wrap} pb-16 pt-8`}>
        {subs.data?.length > 0 && (
          <>
            <h2 className={ui.h2}>Sub-categories</h2>
            <div className={`${ui.grid} mb-8`}>
              {subs.data.map((c) => <CategoryCard key={c._id} category={c} />)}
            </div>
          </>
        )}

        <h2 className={ui.h2}>Services{cat ? ` in ${cat.name}` : ""}</h2>
        {services.error && <div className={ui.alertError} role="alert">{services.error}</div>}
        {category.loading || services.loading ? (
          <LoadingGrid />
        ) : !services.data?.length ? (
          <EmptyState title="No services in this category yet" message="Try another category.">
            <Link href="/categories" className={ui.btnPrimary}>Browse categories</Link>
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