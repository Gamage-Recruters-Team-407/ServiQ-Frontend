
import Link from "next/link";
import styles from "./admin.module.css";

const adminLinks = [
  { href: "/admin/analytics", label: "Analytics Dashboard" },
  { href: "/admin/users", label: "User & Provider Accounts" },
  { href: "/admin/categories", label: "Service Categories" },
  { href: "/admin/bookings", label: "Booking Monitoring" },
  { href: "/admin/payments", label: "Payment Transactions" },
  { href: "/admin/commissions", label: "Commission Rules" },
  { href: "/admin/payouts", label: "Payout Approvals" },
  { href: "/admin/disputes", label: "Dispute Resolution" },
  { href: "/admin/ai-monitoring", label: "AI Monitoring" },
  { href: "/admin/audit-logs", label: "Audit & Activity Logs" },
];

export default function AdminLayout({ children }) {
  return (
    <div className={`portal-layout ${styles.adminLayout}`}>
      <aside className={`portal-sidebar ${styles.sidebar}`}>
        <div className={styles.brand}>
          <span className={styles.brandIcon}>S</span>
          <span>Servi<span className={styles.brandAccent}>Q</span></span>
        </div>

        <div className={styles.sidebarTitle}>
          PLATFORM ADMINISTRATION
          <span>SRS §23</span>
        </div>

        <nav className={styles.navigation}>
          {adminLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.navLink}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <span className={styles.statusDot} />
          Admin Workspace
        </div>
      </aside>

      <main className={`portal-main ${styles.main}`}>
        {children}
      </main>
    </div>
  );
}
