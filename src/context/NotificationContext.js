"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { notificationService, hasSession } from "@/services/notificationService";

// Drives the navbar bell + slide-over drawer. It keeps the latest few notifications and the
// total unread count in sync with the API (refresh on mount, on focus and every 30 s).
// The full notifications page (/customer/notifications) calls `refresh()` after it changes anything.

const POLL_MS = 30000;
const PREVIEW_SIZE = 10;

export const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const mounted = useRef(true);
  const latestRequest = useRef(0);
  const itemsRef = useRef([]);

  useEffect(() => {
    itemsRef.current = notifications;
  }, [notifications]);

  const refresh = useCallback(async () => {
    if (!hasSession()) {
      setNotifications([]);
      setUnreadCount(0);
      setLoading(false);
      return;
    }
    const requestId = ++latestRequest.current;
    try {
      const { items, meta } = await notificationService.list({ limit: PREVIEW_SIZE });
      if (!mounted.current || requestId !== latestRequest.current) return;
      setNotifications(items);
      setUnreadCount(meta.unread_count);
      setError("");
    } catch (e) {
      if (mounted.current && requestId === latestRequest.current) setError(e.message);
    } finally {
      if (mounted.current && requestId === latestRequest.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    // Initial fetch on mount; state is only updated after the request resolves.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
    const timer = setInterval(() => {
      if (document.visibilityState === "visible") refresh();
    }, POLL_MS);
    const onVisible = () => {
      if (document.visibilityState === "visible") refresh();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      mounted.current = false;
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [refresh]);

  const markAsRead = useCallback(
    async (id) => {
      const target = itemsRef.current.find((n) => n.id === id);
      if (target?.read) return;
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
      if (target) setUnreadCount((c) => Math.max(0, c - 1));
      try {
        await notificationService.markAsRead(id);
      } catch {
        // roll back by reloading the real state
      }
      refresh();
    },
    [refresh]
  );

  const markAllAsRead = useCallback(async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
    try {
      await notificationService.markAllAsRead();
    } catch {
      // reload below restores the real state
    }
    refresh();
  }, [refresh]);

  // Local-only toast style notification (e.g. a UI event). Does not touch the server.
  const addNotification = useCallback((notif) => {
    setNotifications((prev) => [
      { id: `local_${Date.now()}`, read: false, created_at: new Date().toISOString(), ...notif },
      ...prev
    ]);
    setUnreadCount((c) => c + 1);
  }, []);

  const value = useMemo(
    () => ({
      notifications,
      unreadCount,
      isOpen,
      setIsOpen,
      loading,
      error,
      refresh,
      markAllAsRead,
      markAsRead,
      addNotification
    }),
    [notifications, unreadCount, isOpen, loading, error, refresh, markAllAsRead, markAsRead, addNotification]
  );

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
}

// Same as useNotifications but returns null instead of throwing (safe in layouts rendered
// before the provider is mounted).
export function useOptionalNotifications() {
  return useContext(NotificationContext);
}
