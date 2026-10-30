"use client";

const base = "min-w-[38px] rounded-lg border px-3 py-2 text-center font-medium";

export default function Pagination({ page, pages, onChange }) {
  if (!pages || pages <= 1) return null;
  const nums = Array.from({ length: pages }, (_, i) => i + 1);
  return (
    <nav className="mt-8 flex flex-wrap justify-center gap-1.5" aria-label="Pagination">
      <button disabled={page <= 1} onClick={() => onChange(page - 1)}
        className={`${base} border-line hover:border-primary hover:text-primary disabled:opacity-40`}>‹ Prev</button>
      {nums.map((n) => (
        <button key={n} onClick={() => onChange(n)} aria-current={n === page ? "page" : undefined}
          className={`${base} ${n === page ? "border-primary bg-primary text-white" : "border-line hover:border-primary hover:text-primary"}`}>
          {n}
        </button>
      ))}
      <button disabled={page >= pages} onClick={() => onChange(page + 1)}
        className={`${base} border-line hover:border-primary hover:text-primary disabled:opacity-40`}>Next ›</button>
    </nav>
  );
}