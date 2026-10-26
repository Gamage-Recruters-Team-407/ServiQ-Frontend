import Link from "next/link";

export default function ProviderLayout({ children }) {
  return (
    <div className="portal-layout">
      <aside className="portal-sidebar">
        <div className="portal-sidebar-title">Provider Portal (SRS §12)</div>
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Link href="/provider/dashboard" className="portal-nav-link">Dashboard</Link>
          <Link href="/provider/services" className="portal-nav-link">My Services</Link>
          <Link href="/provider/availability" className="portal-nav-link">Availability</Link>
          <Link href="/provider/bookings" className="portal-nav-link">Bookings</Link>
          <Link href="/provider/messages" className="portal-nav-link">Messages</Link>
          <Link href="/provider/earnings" className="portal-nav-link">Earnings</Link>
          <Link href="/provider/payouts" className="portal-nav-link">Payouts</Link>
          <Link href="/provider/reviews" className="portal-nav-link">Reviews</Link>
          <Link href="/provider/disputes" className="portal-nav-link">Disputes</Link>
          <Link href="/provider/profile" className="portal-nav-link">Profile</Link>
        </nav>
      </aside>
      <main className="portal-main">{children}</main>
    </div>
  );
}
