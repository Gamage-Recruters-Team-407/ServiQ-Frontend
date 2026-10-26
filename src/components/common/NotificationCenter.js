"use client";

import React from "react";
import { useNotifications } from "@/context/NotificationContext";
import { formatDateTime } from "@/utils/formatters";

export default function NotificationCenter() {
  const { notifications, isOpen, setIsOpen, markAllAsRead, markAsRead } = useNotifications();

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        width: 380,
        maxWidth: "90vw",
        backgroundColor: "var(--bg-secondary)",
        borderLeft: "1px solid var(--border-light)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        boxShadow: "var(--shadow-lg)"
      }}
      className="animate-fade-in"
    >
      <div
        style={{
          padding: "1.2rem 1.5rem",
          borderBottom: "1px solid var(--border-subtle)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Notifications</h3>
          <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
            Real-time platform activity
          </span>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <button
            onClick={markAllAsRead}
            style={{ fontSize: "0.75rem", color: "var(--brand-primary)", cursor: "pointer" }}
          >
            Mark all read
          </button>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              padding: "0.3rem 0.6rem",
              borderRadius: "var(--radius-sm)",
              background: "var(--bg-tertiary)",
              color: "var(--text-secondary)"
            }}
          >
            ✕
          </button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
        {notifications.length === 0 ? (
          <div style={{ textAlign: "center", color: "var(--text-muted)", padding: "3rem 1rem" }}>
            No notifications yet
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markAsRead(notif.id)}
              style={{
                padding: "1rem",
                borderRadius: "var(--radius-md)",
                marginBottom: "0.75rem",
                background: notif.read ? "rgba(255, 255, 255, 0.02)" : "rgba(99, 102, 241, 0.08)",
                border: notif.read ? "1px solid var(--border-subtle)" : "1px solid rgba(99, 102, 241, 0.3)",
                cursor: "pointer",
                transition: "background var(--transition-fast)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{notif.title}</span>
                {!notif.read && (
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--brand-primary)" }} />
                )}
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
                {notif.message}
              </p>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                {formatDateTime(notif.created_at)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
