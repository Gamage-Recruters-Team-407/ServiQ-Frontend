"use client";

import Link from "next/link";
import { formatDateTime, formatRelativeTime } from "@/utils/formatters";
import { getEventMeta, getNotificationHref } from "./notificationUtils";
import styles from "./notifications.module.css";

export default function NotificationItem({ notification: n, busy, onToggleRead, onOpen }) {
  const { icon, tone } = getEventMeta(n.event_type);
  const href = getNotificationHref(n);

  const body = (
    <>
      <span className={styles.titleRow}>
        <span className={`${styles.title} ${n.read ? styles.titleRead : ""}`}>{n.title}</span>
        {!n.read && <span className={styles.newPill}>New</span>}
      </span>
      <span className={styles.message} style={{ display: "block" }}>{n.message}</span>
    </>
  );

  return (
    <li className={`${styles.item} ${n.read ? "" : styles.itemUnread}`} aria-label={`${n.read ? "Read" : "Unread"} notification: ${n.title}`}>
      <span className={`${styles.icon} ${styles[`tone_${tone}`]}`} aria-hidden="true">{icon}</span>

      <div style={{ flex: 1, minWidth: 0 }}>
        {href ? (
          <Link href={href} className={styles.content} onClick={() => onOpen(n)}>{body}</Link>
        ) : (
          <div className={styles.content}>{body}</div>
        )}
        <div className={styles.meta}>
          <span className={styles.typeTag}>{n.event_type}</span>
          <time dateTime={n.created_at} title={formatDateTime(n.created_at)}>{formatRelativeTime(n.created_at)}</time>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.action}
          disabled={busy}
          onClick={() => onToggleRead(n)}
          aria-label={n.read ? `Mark "${n.title}" as unread` : `Mark "${n.title}" as read`}
        >
          {n.read ? "Mark unread" : "Mark read"}
        </button>
      </div>
    </li>
  );
}
