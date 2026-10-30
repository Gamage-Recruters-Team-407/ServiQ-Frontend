import { ui } from "@/utils/ui";

export default function LoadingGrid({ count = 6 }) {
  return (
    <div className={ui.grid} aria-busy="true">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="h-44 animate-pulse rounded-xl bg-surface" />
      ))}
    </div>
  );
}