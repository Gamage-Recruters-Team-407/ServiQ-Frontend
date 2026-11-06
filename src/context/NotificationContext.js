"use client";

import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([
    {
      id: "notif_1",
      title: "Booking Confirmed",
      message: "Electrician Service confirmed for tomorrow at 10:00 AM.",
      event_type: "Booking Acceptance or Rejection",
      channel: "In-App",
      read: false,
      created_at: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: "notif_2",
      title: "Payment Received",
      message: "Payment of LKR 4,500.00 has been verified.",
      event_type: "Payment Status Change",
      channel: "In-App",
      read: false,
      created_at: new Date(Date.now() - 7200000).toISOString()
    },
    {
      id: "notif_3",
      title: "Review Request",
      message: "Please rate your plumbing service experience with Nimal Silva.",
      event_type: "Review Request",
      channel: "In-App",
      read: true,
      created_at: new Date(Date.now() - 86400000).toISOString()
    }
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const addNotification = (notif) => {
    setNotifications((prev) => [
      { id: `notif_${Date.now()}`, read: false, created_at: new Date().toISOString(), ...notif },
      ...prev
    ]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        isOpen,
        setIsOpen,
        markAllAsRead,
        markAsRead,
        addNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
}
