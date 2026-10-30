import Link from "next/link";
import { ui } from "@/utils/ui";

// crumbs: [{ label, href }, { label }]
export default function PageHeader({ title, subtitle, crumbs = [], children }) {
  return (
    <section className={ui.head}>
      <div className={ui.wrap}>
        {crumbs.length > 0 && (
          <div className="mb-2 text-sm text-muted">
            {crumbs.map((c, i) => (
              <span key={i}>
                {i > 0 && " / "}
                {c.href ? <Link href={c.href} className="hover:text-primary">{c.label}</Link> : c.label}
              </span>
            ))}
          </div>
        )}
        <h1 className={ui.h1}>{title}</h1>
        {subtitle && <p className="mt-1.5 text-muted">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}