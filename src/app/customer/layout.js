import Sidebar from "@/components/common/Sidebar";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export default function CustomerLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FFF7ED] text-[#0F172A]">
      <Sidebar variant="customer" />
      <div className="flex-1 min-w-0 flex flex-col">
        <Navbar variant="customer" />
        <main className="flex-1 p-5 sm:p-8">{children}</main>
        <Footer />
import Link from "next/link";
import LogoutButton from "@/components/auth/LogoutButton";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { USER_ROLES } from "@/utils/constants";

export default function CustomerLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={[USER_ROLES.CUSTOMER]}>
      <div className="portal-layout">
        <aside className="portal-sidebar">
          <div className="portal-sidebar-title">Customer Portal (SRS §8)</div>
          <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <Link href="/customer/dashboard" className="portal-nav-link">Dashboard</Link>
            <Link href="/customer/bookings" className="portal-nav-link">My Bookings</Link>
            <Link href="/customer/messages" className="portal-nav-link">Messages</Link>
            <Link href="/customer/reviews" className="portal-nav-link">My Reviews</Link>
            <Link href="/customer/disputes" className="portal-nav-link">Disputes</Link>
            <Link href="/customer/profile" className="portal-nav-link">Profile</Link>
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
