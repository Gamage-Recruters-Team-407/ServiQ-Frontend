"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { notificationService, hasSession, isMockMode } from "@/services/notificationService";
import { useOptionalNotifications } from "@/context/NotificationContext";
import { NOTIFICATION_EVENT_TYPES } from "@/utils/constants";
import NotificationItem from "./NotificationItem";
import { groupByDay } from "./notificationUtils";
import styles from "./notifications.module.css";

const PAGE_SIZE = 10;
const POLL_MS = 30000;

const TABS = [
  { key: "", label: "All" },
  { key: "unread", label: "Unread" },
  { key: "read", label: "Read" }
];

// Event types a customer can receive.
const CUSTOMER_EVENT_TYPES = [
  NOTIFICATION_EVENT_TYPES.BOOKING_REQUEST,
  NOTIFICATION_EVENT_TYPES.BOOKING_ACCEPTANCE_OR_REJECTION,
  NOTIFICATION_EVENT_TYPES.SCHEDULE_OR_SERVICE_UPDATE,
  NOTIFICATION_EVENT_TYPES.PAYMENT_STATUS_CHANGE,
  NOTIFICATION_EVENT_TYPES.SERVICE_COMPLETION,
  NOTIFICATION_EVENT_TYPES.REVIEW_REQUEST,
  NOTIFICATION_EVENT_TYPES.DISPUTE_UPDATE,
  NOTIFICATION_EVENT_TYPES.ACCOUNT_REGISTRATION,
  NOTIFICATION_EVENT_TYPES.OTHER
];

const EMPTY_COPY = {
  "": { icon: "🔔", title: "No notifications yet", text: "Updates about your bookings, payments and reviews will appear here." },
  unread: { icon: "🎉", title: "You're all caught up", text: "You have no unread notifications." },
  read: { icon: "📭", title: "No read notifications", text: "Notifications you have read will show up here." }
};

export default function NotificationsView() {
  const ctx = useOptionalNotifications();
  const refreshBell = ctx?.refresh;

  const [tab, setTab] = useState("");
  const [eventType, setEventType] = useState("");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({ page: 1, pages: 1, total: 0, unread_count: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyIds, setBusyIds] = useState(() => new Set());
  const [markingAll, setMarkingAll] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const sessionOk = hasSession();
  const requestId = useRef(0);
  const mounted = useRef(true);
  const itemsRef = useRef(items);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  const load = useCallback(
    async ({ silent = false } = {}) => {
      if (!hasSession()) {
        setLoading(false);
        return;
      }
      const id = ++requestId.current;
      if (!silent) setLoading(true);
      try {
        const res = await notificationService.list({ status: tab, event_type: eventType, page, limit: PAGE_SIZE });
        if (!mounted.current || id !== requestId.current) return;
        // The last page may disappear after items are removed from it (e.g. marked read in "Unread").
        if (res.items.length === 0 && page > 1 && res.meta.pages < page) {
          setPage(res.meta.pages);
          return;
        }
        setItems(res.items);
        setMeta(res.meta);
        setError("");
      } catch (e) {
        if (mounted.current && id === requestId.current) setError(e.message || "Could not load notifications.");
      } finally {
        if (mounted.current && id === requestId.current) setLoading(false);
      }
    },
    [tab, eventType, page]
  );

  // Callbacks that finish later (after an API call) must reload with the *current* filters,
  // not the ones from the render in which the user clicked.
  const loadRef = useRef(load);
  useEffect(() => {
    loadRef.current = load;
  }, [load]);

  useEffect(() => {
    mounted.current = true;
    // Fetch whenever the filters change; state is updated after the request resolves.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
    return () => {
      mounted.current = false;
    };
  }, [load]);

  // Quiet auto-refresh while the tab is visible.
  useEffect(() => {
    const timer = setInterval(() => {
      if (document.visibilityState === "visible") load({ silent: true });
    }, POLL_MS);
    return () => clearInterval(timer);
  }, [load]);

  const setBusy = (id, on) =>
    setBusyIds((prev) => {
      const next = new Set(prev);
      if (on) next.add(id);
      else next.delete(id);
      return next;
    });

  const afterChange = useCallback(() => {
    loadRef.current({ silent: true });
    refreshBell?.();
  }, [refreshBell]);

  const changeRead = useCallback(
    async (n, read) => {
      if (n.read === read) return;
      setBusy(n.id, true);
      // optimistic update; in the "Unread"/"Read" tabs the item leaves the list
      const leaves = (tab === "unread" && read) || (tab === "read" && !read);
      const before = itemsRef.current;
      setItems((prev) => (leaves ? prev.filter((x) => x.id !== n.id) : prev.map((x) => (x.id === n.id ? { ...x, read } : x))));
      setMeta((m) => ({
        ...m,
        total: leaves ? Math.max(0, m.total - 1) : m.total,
        unread_count: Math.max(0, m.unread_count + (read ? -1 : 1))
      }));
      try {
        if (read) await notificationService.markAsRead(n.id);
        else await notificationService.markAsUnread(n.id);
        setAnnouncement(read ? "Marked as read" : "Marked as unread");
        afterChange();
      } catch (e) {
        setItems(before); // roll back
        setError(e.message || "Could not update the notification.");
        loadRef.current({ silent: true });
      } finally {
        setBusy(n.id, false);
      }
    },
    [tab, afterChange]
  );

  const markAllRead = useCallback(async () => {
    setMarkingAll(true);
    setError("");
    try {
      const modified = await notificationService.markAllAsRead();
      setAnnouncement(`${modified} notification${modified === 1 ? "" : "s"} marked as read`);
      afterChange();
    } catch (e) {
      setError(e.message || "Could not mark all as read.");
    } finally {
      setMarkingAll(false);
    }
  }, [afterChange]);

  const onOpen = (n) => {
    if (!n.read) changeRead(n, true);
  };

  const switchTab = (key) => {
    setTab(key);
    setPage(1);
  };

  const groups = groupByDay(items);
  const empty = EMPTY_COPY[tab];

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className="portal-title">Notifications</h1>
          <p className="portal-subtitle">Updates about your bookings, payments, services and reviews</p>
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={markAllRead}
          disabled={markingAll || meta.unread_count === 0 || !sessionOk}
        >
          {markingAll ? "Marking…" : `Mark all as read${meta.unread_count ? ` (${meta.unread_count})` : ""}`}
        </button>
      </div>

      {isMockMode() && (
        <p className={styles.message} style={{ marginBottom: "1rem" }}>
          Demo mode: showing sample notifications (NEXT_PUBLIC_NOTIFICATIONS_MOCK=true).
        </p>
      )}

      <div className={styles.toolbar}>
        <div className={styles.tabs} role="tablist" aria-label="Filter notifications">
          {TABS.map((t) => (
            <button
              key={t.label}
              type="button"
              role="tab"
              aria-selected={tab === t.key}
              className={`${styles.tab} ${tab === t.key ? styles.tabActive : ""}`}
              onClick={() => switchTab(t.key)}
            >
              {t.label}
              {t.key === "unread" && meta.unread_count > 0 && <span className={styles.tabCount}>{meta.unread_count}</span>}
            </button>
          ))}
        </div>

        <select
          className={styles.select}
          aria-label="Filter by type"
          value={eventType}
          onChange={(e) => {
            setEventType(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All types</option>
          {CUSTOMER_EVENT_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className={styles.srOnly} role="status" aria-live="polite">{announcement}</div>

      {error && (
        <div className={styles.alert} role="alert">
          <span>{error}</span>
          <button type="button" className="btn btn-outline btn-sm" onClick={() => load()}>Retry</button>
        </div>
      )}

      {!sessionOk ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon} aria-hidden="true">🔒</div>
          <p className={styles.emptyTitle}>Sign in to see your notifications</p>
          <p className={styles.emptyText}>Your notifications are linked to your account.</p>
          <Link href="/login" className="btn btn-primary btn-sm" style={{ marginTop: "1rem" }}>Sign in</Link>
        </div>
      ) : loading ? (
        <div style={{ display: "grid", gap: "0.6rem" }} aria-busy="true" aria-label="Loading notifications">
          {[0, 1, 2, 3].map((i) => <div key={i} className={styles.skeleton} />)}
        </div>
      ) : items.length === 0 && !error ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon} aria-hidden="true">{empty.icon}</div>
          <p className={styles.emptyTitle}>{eventType ? "No notifications of this type" : empty.title}</p>
          <p className={styles.emptyText}>{eventType ? "Try a different type or filter." : empty.text}</p>
        </div>
      ) : (
        <>
          {groups.map((g) => (
            <section key={g.label} aria-label={g.label}>
              <h2 className={styles.groupTitle}>{g.label}</h2>
              <ul className={styles.list}>
                {g.items.map((n) => (
                  <NotificationItem key={n.id} notification={n} busy={busyIds.has(n.id)} onToggleRead={(x) => changeRead(x, !x.read)} onOpen={onOpen} />
                ))}
              </ul>
            </section>
          ))}

          {meta.pages > 1 && (
            <nav className={styles.pager} aria-label="Notifications pages">
              <button type="button" className={styles.pagerBtn} disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>← Previous</button>
              <span>Page {meta.page} of {meta.pages}</span>
              <button type="button" className={styles.pagerBtn} disabled={page >= meta.pages} onClick={() => setPage((p) => p + 1)}>Next →</button>
            </nav>
          )}
        </>
      )}
    </div>
  );
}
