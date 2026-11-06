"use client";
import useApi from "@/utils/useApi";
import { categoryService } from "@/services/categoryService";
import { ui } from "@/utils/ui";
import PageHeader from "@/components/common/PageHeader";
import LoadingGrid from "@/components/common/LoadingGrid";
import EmptyState from "@/components/common/EmptyState";
import CategoryCard from "@/components/customer/CategoryCard";

export default function CategoriesPage() {
  const { data, loading, error } = useApi(
    () => categoryService.getCategories({ parent: "root", withCounts: 1 }),
    []
  );

  return (
    <>
      <PageHeader
        title={<>Find the right <span className="text-primary">service</span></>}
        subtitle="Browse categories to discover trusted local service providers."
      />
      <div className={`${ui.wrap} pb-16 pt-8`}>
        {error && <div className={ui.alertError} role="alert">{error}</div>}
        {loading ? (
          <LoadingGrid />
        ) : !data?.length ? (
          <EmptyState title="No categories available yet" message="Please check back soon." />
        ) : (
          <div className={ui.grid}>
            {data.map((c) => <CategoryCard key={c._id} category={c} />)}
          </div>
        )}
      </div>
    </>
  );
}