import Link from "next/link";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import { USER_ROLES } from "@/utils/constants";

export default function CustomerLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={[USER_ROLES.CUSTOMER, USER_ROLES.ADMIN]}>
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
        </aside>
        <main className="portal-main">{children}</main>
      </div>
    </ProtectedRoute>
  );
}

