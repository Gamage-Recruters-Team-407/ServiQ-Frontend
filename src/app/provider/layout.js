import Sidebar from "@/components/common/Sidebar";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export default function ProviderLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FFF7ED] text-[#0F172A]">
      <Sidebar variant="provider" />
      <div className="flex-1 min-w-0 flex flex-col">
        <Navbar variant="provider" />
        <main className="flex-1 p-5 sm:p-8">{children}</main>
        <Footer />
      </div>
    </div>
import Link from "next/link";
import LogoutButton from "@/components/auth/LogoutButton";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { USER_ROLES } from "@/utils/constants";

export default function ProviderLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={[USER_ROLES.PROVIDER]}>
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
          <div style={{ marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid var(--border-subtle)" }}>
            <LogoutButton variant="sidebar" />
          </div>
        </aside>
        <main className="portal-main">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
