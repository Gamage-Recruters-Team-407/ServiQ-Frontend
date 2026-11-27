"use client";

import { useContext } from "react";
import { NotificationContext, NotificationProvider } from "@/context/NotificationContext";
import NotificationsView from "@/components/notifications/NotificationsView";

// Customer notifications page (list + read/unread).
// Uses the app-wide NotificationProvider (navbar bell) when it exists, otherwise mounts its own
// so the page also works before the shared layout wires the provider in.
export default function CustomerNotificationsPage() {
  const existing = useContext(NotificationContext);
  if (existing) return <NotificationsView />;
  return (
    <NotificationProvider>
      <NotificationsView />
    </NotificationProvider>
  );
}
