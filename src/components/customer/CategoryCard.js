import Link from "next/link";
import { ui } from "@/utils/ui";
import CategoryIcon from "./CategoryIcon";

export default function CategoryCard({ category }) {
  return (
    <Link href={`/categories/${category.slug}`} className={ui.cardLink}>
      <div className="mb-3 grid h-12 w-12 place-items-center rounded-xl bg-surface text-2xl">
        <CategoryIcon category={category} />
      </div>
      <h3 className="mb-1.5 text-lg font-semibold">{category.name}</h3>
      <p className="mb-3 line-clamp-2 text-sm text-muted">
        {category.description || "Browse services in this category."}
      </p>
      <div className="flex items-center justify-between">
        <span className={ui.chip}>{category.service_count ?? 0} services</span>
        <span className="text-primary" aria-hidden="true">→</span>
      </div>
    </Link>
  );
}