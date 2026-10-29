"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import BookingStatusPill from "@/components/provider/BookingStatusPill";
import { bookingService } from "@/services/bookingService";
import { BOOKING_STATUSES } from "@/utils/constants";

const tabs = [
  ["all", "All bookings"],
  ["requests", "Requests"],
  ["history", "History"]
];

function formatDate(value) {
  return value ? new Date(value).toLocaleDateString() : "—";
}

function TabButton({ label, active, onClick }) {
  const activeClasses =
    "rounded-xl bg-[#F97316] px-4 py-2 text-sm font-bold text-white shadow-sm";
  const inactiveClasses =
    "rounded-xl px-4 py-2 text-sm font-semibold text-[#64748B] transition " +
    "hover:bg-[#FFF7ED] hover:text-[#EA580C]";

  return (
    <button
      type="button"
      className={active ? activeClasses : inactiveClasses}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function BookingActions({ booking, busy, onUpdate }) {
  const isRequested = booking.booking_status === BOOKING_STATUSES.REQUESTED;

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={`/provider/bookings/${booking.id}`}
        className="rounded-lg border border-[#E2E8F0] px-3 py-1.5 text-xs font-bold text-[#0F172A] transition hover:border-[#F97316] hover:text-[#EA580C]"
      >
        View
      </Link>

      {isRequested && (
        <>
          <button
            type="button"
            className="rounded-lg bg-[#F97316] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#EA580C] disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => onUpdate(booking.id, "accept")}
            disabled={busy}
          >
            {busy ? "Saving..." : "Accept"}
          </button>

          <button
            type="button"
            className="rounded-lg border border-[#DC2626] px-3 py-1.5 text-xs font-bold text-[#DC2626] transition hover:bg-[#FEF2F2] disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => onUpdate(booking.id, "reject")}
            disabled={busy}
          >
            Reject
          </button>
        </>
      )}
    </div>
  );
}

function BookingRow({ booking, busy, onUpdate }) {
  return (
    <tr className="transition hover:bg-[#FFF7ED]">
      <td className="whitespace-nowrap px-5 py-4 font-bold text-[#EA580C]">
        <Link
          href={`/provider/bookings/${booking.id}`}
          className="hover:underline"
        >
          {booking.booking_reference}
        </Link>
      </td>
      <td className="whitespace-nowrap px-5 py-4 font-medium text-[#0F172A]">
        {booking.customer?.name || "Customer"}
      </td>
      <td className="whitespace-nowrap px-5 py-4 text-[#64748B]">
        {booking.service?.name || "Service"}
      </td>
      <td className="whitespace-nowrap px-5 py-4 text-[#64748B]">
        {formatDate(booking.requested_at)}
      </td>
      <td className="whitespace-nowrap px-5 py-4">
        <BookingStatusPill status={booking.booking_status} />
      </td>
      <td className="px-5 py-4">
        <BookingActions
          booking={booking}
          busy={busy}
          onUpdate={onUpdate}
        />
      </td>
    </tr>
  );
}

export default function ProviderBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);
  const [error, setError] = useState("");

  const loadBookings = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await bookingService.getProviderBookings();
      setBookings(response.data || []);
    } catch (requestError) {
      setError(requestError.message || "Unable to load provider bookings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => loadBookings(), 0);
    return () => clearTimeout(timer);
  }, [loadBookings]);

  async function updateBooking(id, action) {
    setActionId(id);
    setError("");

    try {
      if (action === "reject") {
        const reason = window.prompt("Optional rejection reason:", "");
        if (reason === null) return;
        await bookingService.rejectProviderBooking(id, reason);
      } else {
        await bookingService.acceptProviderBooking(id);
      }

      await loadBookings();
    } catch (requestError) {
      setError(requestError.message || "Unable to update booking");
    } finally {
      setActionId(null);
    }
  }

  const visibleBookings = useMemo(() => {
    if (filter === "requests") {
      return bookings.filter(
        (booking) => booking.booking_status === BOOKING_STATUSES.REQUESTED
      );
    }

    if (filter === "history") {
      return bookings.filter(
        (booking) => booking.booking_status !== BOOKING_STATUSES.REQUESTED
      );
    }

    return bookings;
  }, [bookings, filter]);

  return (
    <main className="min-h-full rounded-3xl bg-[#FFF7ED] p-4 text-[#0F172A] sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-[#F97316]">
              Provider portal
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#0F172A]">
              Provider bookings
            </h1>
            <p className="mt-2 text-sm text-[#64748B]">
              Review requests, accept work, and keep your booking history.
            </p>
          </div>

          <button
            type="button"
            className="rounded-xl border border-[#F97316] bg-white px-4 py-2.5 text-sm font-bold text-[#EA580C] transition hover:bg-[#FFF7ED] disabled:cursor-not-allowed disabled:opacity-50"
            onClick={loadBookings}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        <div className="mb-6 flex flex-wrap gap-2 rounded-2xl border border-[#FED7AA] bg-white p-2 shadow-sm">
          {tabs.map(([value, label]) => (
            <TabButton
              key={value}
              label={label}
              active={filter === value}
              onClick={() => setFilter(value)}
            />
          ))}
        </div>

        {error && (
          <p
            role="alert"
            className="mb-5 rounded-xl border border-[#FCA5A5] bg-[#FEF2F2] px-4 py-3 text-sm font-medium text-[#DC2626]"
          >
            {error}
          </p>
        )}

        {loading ? (
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 text-center text-sm text-[#64748B] shadow-sm">
            Loading bookings...
          </div>
        ) : visibleBookings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#FDBA74] bg-white p-10 text-center shadow-sm">
            <p className="font-semibold text-[#0F172A]">No bookings found</p>
            <p className="mt-1 text-sm text-[#64748B]">
              There are no bookings in this view yet.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-[#0F172A] text-xs uppercase tracking-wider text-white">
                  <tr>
                    <th className="px-5 py-4 font-bold">Reference</th>
                    <th className="px-5 py-4 font-bold">Customer</th>
                    <th className="px-5 py-4 font-bold">Service</th>
                    <th className="px-5 py-4 font-bold">Requested</th>
                    <th className="px-5 py-4 font-bold">Status</th>
                    <th className="px-5 py-4 font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {visibleBookings.map((booking) => (
                    <BookingRow
                      key={booking.id}
                      booking={booking}
                      busy={actionId === booking.id}
                      onUpdate={updateBooking}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
