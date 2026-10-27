import { ui } from "@/utils/ui";

export default function EmptyState({ title, message, children }) {
  return (
    <div className={ui.empty}>
      <h3 className="text-lg font-semibold">{title}</h3>
      {message && <p className="mb-4 mt-1 text-muted">{message}</p>}
      {children}
    </div>
  );
}