"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import BookingStatusPill from "@/components/provider/BookingStatusPill";
import { bookingService } from "@/services/bookingService";
import { BOOKING_STATUSES } from "@/utils/constants";

function DetailCard({ label, children }) {
  return (
    <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
      <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#F97316]">
        {label}
      </h2>
      <div className="text-sm leading-6 text-[#0F172A]">{children}</div>
    </section>
  );
}

function formatDateTime(value) {
  return value ? new Date(value).toLocaleString() : "—";
}

function formatLocation(location) {
  return [location.address, location.city, location.state]
    .filter(Boolean)
    .join(", ");
}

function LoadingState() {
  return (
    <main className="min-h-full rounded-3xl bg-[#FFF7ED] p-8 text-center text-sm text-[#64748B]">
      Loading booking...
    </main>
  );
}

function ErrorState({ message }) {
  return (
    <main className="min-h-full rounded-3xl bg-[#FFF7ED] p-8">
      <p
        role="alert"
        className="rounded-xl border border-[#FCA5A5] bg-[#FEF2F2] px-4 py-3 text-sm font-medium text-[#DC2626]"
      >
        {message}
      </p>
    </main>
  );
}

export default function ProviderBookingDetailsPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const loadBooking = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError("");

    try {
      const response = await bookingService.getProviderBookingById(id);
      setBooking(response.data);
    } catch (requestError) {
      setError(requestError.message || "Unable to load booking");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => loadBooking(), 0);
    return () => clearTimeout(timer);
  }, [loadBooking]);

  async function transition(action) {
    setSaving(true);
    setError("");

    try {
      if (action === "reject") {
        const reason = window.prompt("Optional rejection reason:", "");
        if (reason === null) return;
        await bookingService.rejectProviderBooking(id, reason);
      } else {
        await bookingService.acceptProviderBooking(id);
      }

      await loadBooking();
    } catch (requestError) {
      setError(requestError.message || "Unable to update booking");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <LoadingState />;
  if (error && !booking) return <ErrorState message={error} />;

  if (!booking) {
    return (
      <main className="min-h-full rounded-3xl bg-[#FFF7ED] p-8 text-sm text-[#64748B]">
        Booking not found.
      </main>
    );
  }

  const isRequested = booking.booking_status === BOOKING_STATUSES.REQUESTED;
  const location = booking.service_location;

  return (
    <main className="min-h-full rounded-3xl bg-[#FFF7ED] p-4 text-[#0F172A] sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/provider/bookings"
          className="inline-flex items-center text-sm font-bold text-[#EA580C] hover:underline"
        >
          ← Back to bookings
        </Link>

        <div className="mb-7 mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-[#F97316]">
              Booking details
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight">
              {booking.booking_reference}
            </h1>
          </div>
          <BookingStatusPill status={booking.booking_status} />
        </div>

        {error && (
          <p
            role="alert"
            className="mb-5 rounded-xl border border-[#FCA5A5] bg-[#FEF2F2] px-4 py-3 text-sm font-medium text-[#DC2626]"
          >
            {error}
          </p>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <DetailCard label="Customer">
            <p className="font-bold">{booking.customer?.name || "Customer"}</p>
            {booking.customer?.email && (
              <p className="text-[#64748B]">{booking.customer.email}</p>
            )}
          </DetailCard>

          <DetailCard label="Service">
            <p className="font-bold">{booking.service?.name || "Service"}</p>
            {booking.service?.description && (
              <p className="text-[#64748B]">{booking.service.description}</p>
            )}
          </DetailCard>

          <DetailCard label="Booking information">
            <p>
              Requested: {" "}
              <span className="font-semibold">
                {formatDateTime(booking.requested_at)}
              </span>
            </p>
            <p>
              Total: {" "}
              <span className="font-semibold">
                {booking.currency} {booking.total_amount}
              </span>
            </p>
            {booking.service_requirements && (
              <p>
                Requirements: {" "}
                <span className="font-semibold">
                  {booking.service_requirements}
                </span>
              </p>
            )}
          </DetailCard>

          {location && (
            <DetailCard label="Service location">
              <p>{formatLocation(location) || "Location details unavailable"}</p>
              {location.notes && (
                <p className="text-[#64748B]">{location.notes}</p>
              )}
            </DetailCard>
          )}
        </div>

        {isRequested && (
          <div className="mt-6 flex flex-wrap gap-3 rounded-2xl border border-[#FED7AA] bg-white p-5 shadow-sm">
            <button
              type="button"
              className="rounded-xl bg-[#F97316] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#EA580C] disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => transition("accept")}
              disabled={saving}
            >
              {saving ? "Saving..." : "Accept booking"}
            </button>

            <button
              type="button"
              className="rounded-xl border border-[#DC2626] px-5 py-3 text-sm font-bold text-[#DC2626] transition hover:bg-[#FEF2F2] disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => transition("reject")}
              disabled={saving}
            >
              Reject booking
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
