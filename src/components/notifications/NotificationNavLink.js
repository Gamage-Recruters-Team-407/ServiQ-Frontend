"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useOptionalNotifications } from "@/context/NotificationContext";
import styles from "./notifications.module.css";

// Sidebar link with a live unread badge. Works with or without a NotificationProvider above it.
export default function NotificationNavLink({ href = "/customer/notifications", label = "Notifications" }) {
  const pathname = usePathname();
  const ctx = useOptionalNotifications();
  const unread = ctx?.unreadCount || 0;
  return (
    <Link href={href} className={`portal-nav-link ${pathname === href ? "active" : ""}`} aria-current={pathname === href ? "page" : undefined}>
      {label}
      {unread > 0 && (
        <span className={styles.navBadge} aria-label={`${unread} unread`}>
          {unread > 99 ? "99+" : unread}
        </span>
      )}
    </Link>
  );
}
