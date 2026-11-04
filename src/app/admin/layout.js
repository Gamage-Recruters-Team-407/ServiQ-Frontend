import AdminNavigation from "@/components/admin/AdminNavigation";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-[calc(100vh-72px)] max-[760px]:flex-col">
      <aside className="flex w-[260px] shrink-0 flex-col gap-2 border-r border-line bg-white px-4 py-6 max-[760px]:w-full max-[760px]:p-4">
        <div className="px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] text-muted">
          Platform Administration (SRS §23)
        </div>
        <AdminNavigation />
      </aside>
      <main className="min-w-0 flex-1 overflow-y-auto bg-surface p-8 text-ink max-[760px]:p-4 [&_.portal-subtitle]:mt-1 [&_.portal-subtitle]:text-[0.95rem] [&_.portal-subtitle]:text-muted">
        {children}
      </main>
    </div>
  );
}
