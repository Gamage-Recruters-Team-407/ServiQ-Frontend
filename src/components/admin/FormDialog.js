"use client";
import { useEffect } from "react";
import { createPortal } from "react-dom";

// Popup for the catalogue admin forms. Closes on Esc or clicking the dark backdrop.
export default function FormDialog({ open, onClose, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    // The OUTER layer scrolls; the INNER wrapper centers. This keeps the top of tall forms reachable.
    <div
      className="fixed inset-0 z-[1100] overflow-y-auto bg-slate-900/50"
      onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="flex min-h-full items-center justify-center p-4 sm:p-8"
        onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}
      >
        <div className="w-full max-w-2xl rounded-xl bg-white p-6 text-slate-900 shadow-xl sm:p-8">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}