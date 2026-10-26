import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <div className="portal-layout">
      <aside className="portal-sidebar">
        <div className="portal-sidebar-title">Platform Administration (SRS §23)</div>
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Link href="/admin/dashboard" className="portal-nav-link">Analytics Dashboard</Link>
          <Link href="/admin/users" className="portal-nav-link">User & Provider Accounts</Link>
          <Link href="/admin/categories" className="portal-nav-link">Service Categories</Link>
          <Link href="/admin/bookings" className="portal-nav-link">Booking Monitoring</Link>
          <Link href="/admin/payments" className="portal-nav-link">Payment Transactions</Link>
          <Link href="/admin/commissions" className="portal-nav-link">Commission Rules</Link>
          <Link href="/admin/payouts" className="portal-nav-link">Payout Approvals</Link>
          <Link href="/admin/disputes" className="portal-nav-link">Dispute Resolution</Link>
          <Link href="/admin/ai-monitoring" className="portal-nav-link">AI Monitoring</Link>
          <Link href="/admin/audit-logs" className="portal-nav-link">Audit & Activity Logs</Link>
        </nav>
      </aside>
      <main className="portal-main">{children}</main>
    </div>
  );
}
