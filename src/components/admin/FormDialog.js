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
    <div
      className="fixed inset-0 z-[1100] flex items-start justify-center overflow-y-auto bg-ink/50 p-4 sm:items-center"
      onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}
      role="dialog"
      aria-modal="true"
    >
      <div className="my-8 w-full max-w-2xl rounded-xl bg-white p-6 text-ink shadow-xl">
        {children}
      </div>
    </div>,
    document.body
  );
}