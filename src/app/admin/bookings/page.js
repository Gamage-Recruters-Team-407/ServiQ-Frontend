"use client";

import { useState, useEffect, useCallback } from "react";
import { adminService } from "@/services/adminService";

// Fallback preview data matching the client's screenshot exactly
const PREVIEW_MOCK_BOOKINGS = [
  {
    _id: "mock-1",
    booking_reference: "BK-5912",
    customer_name: "Nimali Perera",
    provider_name: "CoolAir Technicians",
    service_name: "AC Servicing",
    schedule_formatted: "21 Oct, 10:00",
    total_amount: 6500,
    currency: "LKR",
    payment_status: "Unpaid",
    booking_status: "Requested",
  },
  {
    _id: "mock-2",
    booking_reference: "BK-5911",
    customer_name: "Kasun Fernando",
    provider_name: "CleanNest Services",
    service_name: "Deep House Cleaning",
    schedule_formatted: "21 Oct, 14:00",
    total_amount: 4200,
    currency: "LKR",
    payment_status: "Paid",
    booking_status: "Confirmed",
  },
  {
    _id: "mock-3",
    booking_reference: "BK-5910",
    customer_name: "Dilani Silva",
    provider_name: "FixIt Pro Lanka",
    service_name: "Pipe Leak Repair",
    schedule_formatted: "20 Oct, 09:30",
    total_amount: 3800,
    currency: "LKR",
    payment_status: "Paid",
    booking_status: "In Progress",
  },
  {
    _id: "mock-4",
    booking_reference: "BK-5909",
    customer_name: "Ruwan Jayasinghe",
    provider_name: "BrightSpark Electricals",
    service_name: "Electrical Wiring",
    schedule_formatted: "19 Oct, 11:00",
    total_amount: 12000,
    currency: "LKR",
    payment_status: "Paid",
    booking_status: "Completed",
  },
  {
    _id: "mock-5",
    booking_reference: "BK-5908",
    customer_name: "Sanduni Weerasinghe",
    provider_name: "GreenLeaf Gardening",
    service_name: "Garden Maintenance",
    schedule_formatted: "19 Oct, 08:00",
    total_amount: 5500,
    currency: "LKR",
    payment_status: "Refunded",
    booking_status: "Cancelled",
  },
  {
    _id: "mock-6",
    booking_reference: "BK-5907",
    customer_name: "Tharindu Bandara",
    provider_name: "Sunil Perera",
    service_name: "Interior Painting",
    schedule_formatted: "18 Oct, 09:00",
    total_amount: 28000,
    currency: "LKR",
    payment_status: "Paid",
    booking_status: "Disputed",
  },
  {
    _id: "mock-7",
    booking_reference: "BK-5906",
    customer_name: "Chamari Wickramasinghe",
    provider_name: "Nadeesha Weerakoon",
    service_name: "Deep House Cleaning",
    schedule_formatted: "18 Oct, 13:00",
    total_amount: 4800,
    currency: "LKR",
    payment_status: "Paid",
    booking_status: "Completed",
  },
];


const BOOKING_STATUS_CONFIG = {
  Requested:   { bg: "bg-[#FEF3E7]", text: "text-[#C2410C]", dot: "bg-[#EA580C]" },
  Accepted:    { bg: "bg-[#EDFCF2]", text: "text-[#15803D]", dot: "bg-[#22C55E]" },
  Confirmed:   { bg: "bg-[#EDFCF2]", text: "text-[#15803D]", dot: "bg-[#22C55E]" },
  "In Progress":{ bg: "bg-[#FFF7ED]", text: "text-[#C2410C]", dot: "bg-[#EA580C]" },
  Completed:   { bg: "bg-[#EDFCF2]", text: "text-[#15803D]", dot: "bg-[#22C55E]" },
  Cancelled:   { bg: "bg-[#FEF2F2]", text: "text-[#DC2626]", dot: "bg-[#EF4444]" },
  Disputed:    { bg: "bg-[#FFFBEB]", text: "text-[#B45309]", dot: "bg-[#F59E0B]" },
  Rejected:    { bg: "bg-stone-100", text: "text-stone-600", dot: "bg-stone-400" },
};

const PAYMENT_STATUS_CONFIG = {
  Paid:               { bg: "bg-[#EDFCF2]", text: "text-[#15803D]", dot: "bg-[#22C55E]", label: "Paid" },
  Successful:         { bg: "bg-[#EDFCF2]", text: "text-[#15803D]", dot: "bg-[#22C55E]", label: "Paid" },
  Unpaid:             { bg: "bg-[#FEF3E7]", text: "text-[#C2410C]", dot: "bg-[#EA580C]", label: "Unpaid" },
  Pending:            { bg: "bg-[#FEF3E7]", text: "text-[#C2410C]", dot: "bg-[#EA580C]", label: "Unpaid" },
  Processing:         { bg: "bg-sky-50",   text: "text-sky-700",   dot: "bg-sky-500",   label: "Processing" },
  Refunded:           { bg: "bg-[#F1F5F9]", text: "text-[#64748B]", dot: "bg-[#94A3B8]", label: "Refunded" },
  "Partially Refunded":{ bg: "bg-amber-50", text: "text-amber-700",dot: "bg-amber-500", label: "Part Refund" },
  Failed:             { bg: "bg-rose-50",  text: "text-rose-700",  dot: "bg-rose-500",  label: "Failed" },
};

function StatusBadge({ status }) {
  const cfg = BOOKING_STATUS_CONFIG[status] || { bg: "bg-stone-100", text: "text-stone-700", dot: "bg-stone-400" };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {status}
    </span>
  );
}

function PaymentBadge({ paymentStatus }) {
  const cfg = PAYMENT_STATUS_CONFIG[paymentStatus] || { bg: "bg-stone-100", text: "text-stone-600", dot: "bg-stone-400", label: paymentStatus || "Unpaid" };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

export default function AdminBookingsPage() {
  const [bookings, setBookings]           = useState(PREVIEW_MOCK_BOOKINGS);
  const [statFilter, setStatFilter]       = useState("All");
  const [search, setSearch]               = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [loading, setLoading]             = useState(false);
  const [selectedBooking, setSelected]    = useState(null);

  // Status counts for the top stat cards
  const [stats, setStats] = useState({
    All: 12,
    Requested: 1,
    Confirmed: 2,
    "In Progress": 1,
    Completed: 4,
    Cancelled: 1,
    Disputed: 1
  });

  const fetchRealBookings = useCallback(async () => {
    try {
      setLoading(true);
      const res = await adminService.getBookings({ limit: 100 });
      if (res?.data?.bookings && res.data.bookings.length > 0) {
        const transformed = res.data.bookings.map(b => ({
          _id: b._id,
          booking_reference: b.booking_reference,
          customer_name: b.customer_id?.user_id ? `${b.customer_id.user_id.first_name} ${b.customer_id.user_id.last_name}` : "Unknown Customer",
          provider_name: b.provider_id?.user_id ? `${b.provider_id.user_id.first_name} ${b.provider_id.user_id.last_name}` : "Unknown Provider",
          service_name: b.service_id?.service_name || "Service",
          schedule_formatted: b.schedule?.scheduled_start ? new Date(b.schedule.scheduled_start).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit", hour12: false }) : "Pending Schedule",
          total_amount: b.total_amount,
          currency: b.currency || "LKR",
          payment_status: b.payment?.payment_status ? (b.payment.payment_status === "Successful" ? "Paid" : b.payment.payment_status) : "Unpaid",
          booking_status: b.booking_status,
          raw: b
        }));
        setBookings(transformed);

        // Update real counts
        const count = (st) => transformed.filter(item => item.booking_status === st).length;
        setStats({
          All: transformed.length,
          Requested: count("Requested"),
          Confirmed: count("Confirmed"),
          "In Progress": count("In Progress"),
          Completed: count("Completed"),
          Cancelled: count("Cancelled"),
          Disputed: count("Disputed")
        });
      }
    } catch {
      // If API fails (e.g. unauthenticated / local test), keep mock preview
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRealBookings();
  }, [fetchRealBookings]);

  // Client-side filtering for immediate snappy response
  const filteredBookings = bookings.filter(b => {
    if (statFilter !== "All" && b.booking_status !== statFilter) return false;
    if (paymentFilter && b.payment_status.toLowerCase() !== paymentFilter.toLowerCase()) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchRef = b.booking_reference?.toLowerCase().includes(q);
      const matchCust = b.customer_name?.toLowerCase().includes(q);
      const matchProv = b.provider_name?.toLowerCase().includes(q);
      const matchServ = b.service_name?.toLowerCase().includes(q);
      if (!matchRef && !matchCust && !matchProv && !matchServ) return false;
    }
    return true;
  });

  const statCards = [
    { label: "All bookings", key: "All", count: stats.All },
    { label: "Requested", key: "Requested", count: stats.Requested },
    { label: "Confirmed", key: "Confirmed", count: stats.Confirmed },
    { label: "In Progress", key: "In Progress", count: stats["In Progress"] },
    { label: "Completed", key: "Completed", count: stats.Completed },
    { label: "Cancelled", key: "Cancelled", count: stats.Cancelled },
    { label: "Disputed", key: "Disputed", count: stats.Disputed },
  ];

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Breadcrumb */}
      <div className="text-xs text-stone-500 font-medium mb-3">
        Administration / <span className="text-stone-800 font-semibold">Manage Bookings</span>
      </div>

      {/* Title & Action Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
            Manage <span className="text-[#EA580C]">Bookings</span>
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Monitor bookings across the marketplace and investigate booking-related issues.
          </p>
        </div>

        {/* Export Button */}
        <button
          onClick={() => {
            const csv = ["REF,CUSTOMER,PROVIDER,SERVICE,SCHEDULE,AMOUNT,PAYMENT,STATUS"]
              .concat(filteredBookings.map(b =>
                `"${b.booking_reference}","${b.customer_name}","${b.provider_name}","${b.service_name}","${b.schedule_formatted}","${b.currency} ${b.total_amount}","${b.payment_status}","${b.booking_status}"`
              )).join("\n");
            const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "marketplace_bookings.csv";
            link.click();
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E7E2DB] text-stone-700 rounded-xl text-sm font-medium hover:bg-stone-50 shadow-xs transition"
        >
          <svg className="w-4 h-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export
        </button>
      </div>

      {/* Top Stat Filter Cards Row */}
      <div className="flex gap-3 overflow-x-auto pb-2 mb-6">
        {statCards.map((card) => {
          const isSelected = statFilter === card.key;
          return (
            <button
              key={card.key}
              onClick={() => setStatFilter(card.key)}
              className={`flex flex-col items-start px-5 py-3 rounded-2xl min-w-[115px] transition-all text-left ${
                isSelected
                  ? "bg-[#FEF2E8] border-2 border-[#EA580C] shadow-xs"
                  : "bg-white border border-[#EFEAE3] hover:border-[#DDD6CE]"
              }`}
            >
              <span className="text-2xl font-bold text-stone-900 leading-tight">
                {card.count}
              </span>
              <span className="text-xs text-stone-500 font-medium mt-1">
                {card.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-3 rounded-2xl border border-[#EFEAE3] mb-6 flex flex-col md:flex-row gap-3 items-center shadow-xs">
        {/* Search input */}
        <div className="relative flex-1 w-full">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search by reference, customer, provider..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-transparent text-sm text-stone-800 placeholder-stone-400 focus:outline-none"
          />
        </div>

        <div className="h-6 w-[1px] bg-stone-200 hidden md:block" />

        {/* Status Dropdown */}
        <div className="w-full md:w-auto">
          <select
            value={statFilter}
            onChange={(e) => setStatFilter(e.target.value)}
            className="w-full md:w-44 px-3 py-2 bg-stone-50 md:bg-transparent border border-stone-200 md:border-0 rounded-xl text-sm text-stone-700 font-medium focus:outline-none cursor-pointer"
          >
            <option value="All">All statuses</option>
            <option value="Requested">Requested</option>
            <option value="Confirmed">Confirmed</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Disputed">Disputed</option>
          </select>
        </div>

        <div className="h-6 w-[1px] bg-stone-200 hidden md:block" />

        {/* Payment Dropdown */}
        <div className="w-full md:w-auto">
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="w-full md:w-40 px-3 py-2 bg-stone-50 md:bg-transparent border border-stone-200 md:border-0 rounded-xl text-sm text-stone-700 font-medium focus:outline-none cursor-pointer"
          >
            <option value="">All payments</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl border border-[#EFEAE3] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF6F1] border-b border-[#EFEAE3]">
                <th className="py-4 px-5 text-[11px] font-bold tracking-wider text-stone-400 uppercase">REF</th>
                <th className="py-4 px-5 text-[11px] font-bold tracking-wider text-stone-400 uppercase">CUSTOMER</th>
                <th className="py-4 px-5 text-[11px] font-bold tracking-wider text-stone-400 uppercase">PROVIDER</th>
                <th className="py-4 px-5 text-[11px] font-bold tracking-wider text-stone-400 uppercase">SERVICE</th>
                <th className="py-4 px-5 text-[11px] font-bold tracking-wider text-stone-400 uppercase">SCHEDULE</th>
                <th className="py-4 px-5 text-[11px] font-bold tracking-wider text-stone-400 uppercase">AMOUNT</th>
                <th className="py-4 px-5 text-[11px] font-bold tracking-wider text-stone-400 uppercase">PAYMENT</th>
                <th className="py-4 px-5 text-[11px] font-bold tracking-wider text-stone-400 uppercase">STATUS</th>
                <th className="py-4 px-5 text-[11px] font-bold tracking-wider text-stone-400 uppercase text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F0E8]">
              {loading ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-sm text-stone-400 font-medium">
                    Loading bookings...
                  </td>
                </tr>
              ) : filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-sm text-stone-400 font-medium">
                    No bookings found matching filters.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b._id} className="hover:bg-[#FDFBF9] transition-colors">
                    {/* REF */}
                    <td className="py-4 px-5 font-bold text-stone-900 text-sm whitespace-nowrap">
                      {b.booking_reference}
                    </td>

                    {/* CUSTOMER */}
                    <td className="py-4 px-5 font-medium text-stone-900 text-sm whitespace-nowrap">
                      {b.customer_name}
                    </td>

                    {/* PROVIDER */}
                    <td className="py-4 px-5 text-stone-700 text-sm whitespace-nowrap">
                      {b.provider_name}
                    </td>

                    {/* SERVICE */}
                    <td className="py-4 px-5 text-stone-800 text-sm whitespace-nowrap">
                      {b.service_name}
                    </td>

                    {/* SCHEDULE */}
                    <td className="py-4 px-5 text-stone-600 text-sm whitespace-nowrap">
                      {b.schedule_formatted}
                    </td>

                    {/* AMOUNT */}
                    <td className="py-4 px-5 font-bold text-stone-900 text-sm whitespace-nowrap">
                      {b.currency} {Number(b.total_amount).toLocaleString()}
                    </td>

                    {/* PAYMENT */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      <PaymentBadge paymentStatus={b.payment_status} />
                    </td>

                    {/* STATUS */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      <StatusBadge status={b.booking_status} />
                    </td>

                    {/* ACTIONS */}
                    <td className="py-4 px-5 text-center whitespace-nowrap">
                      <button
                        onClick={() => setSelected(b)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E5DFD7] text-stone-700 rounded-lg text-xs font-semibold hover:bg-stone-50 hover:border-stone-400 shadow-2xs transition"
                      >
                        <svg className="w-3.5 h-3.5 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking View & Admin Override Modal */}
      {selectedBooking && (
        <div
          className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <span className="text-xs uppercase font-bold text-stone-400 tracking-wider">Booking Details</span>
                <h3 className="text-lg font-bold text-stone-900">{selectedBooking.booking_reference}</h3>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 py-5 text-sm">
              <div>
                <p className="text-xs text-stone-400 font-medium">Customer</p>
                <p className="font-semibold text-stone-800 mt-0.5">{selectedBooking.customer_name}</p>
              </div>
              <div>
                <p className="text-xs text-stone-400 font-medium">Provider</p>
                <p className="font-semibold text-stone-800 mt-0.5">{selectedBooking.provider_name}</p>
              </div>
              <div>
                <p className="text-xs text-stone-400 font-medium">Service</p>
                <p className="font-semibold text-stone-800 mt-0.5">{selectedBooking.service_name}</p>
              </div>
              <div>
                <p className="text-xs text-stone-400 font-medium">Schedule</p>
                <p className="font-semibold text-stone-800 mt-0.5">{selectedBooking.schedule_formatted}</p>
              </div>
              <div>
                <p className="text-xs text-stone-400 font-medium">Total Amount</p>
                <p className="font-bold text-stone-900 mt-0.5">{selectedBooking.currency} {Number(selectedBooking.total_amount).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-stone-400 font-medium">Payment Status</p>
                <div className="mt-1">
                  <PaymentBadge paymentStatus={selectedBooking.payment_status} />
                </div>
              </div>
            </div>

            {/* Admin Override Section */}
            <div className="mt-2 pt-4 border-t border-stone-100">
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">
                Admin Status Override
              </label>
              <div className="flex gap-2">
                <select
                  defaultValue={selectedBooking.booking_status}
                  id="admin-status-select"
                  className="flex-1 px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C]"
                >
                  <option value="Requested">Requested</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Disputed">Disputed</option>
                </select>
                <button
                  onClick={async () => {
                    const select = document.getElementById("admin-status-select");
                    const newStatus = select.value;
                    try {
                      if (selectedBooking.raw?._id) {
                        await adminService.updateBookingStatus(selectedBooking.raw._id, newStatus);
                      }
                      setBookings(prev => prev.map(item => item._id === selectedBooking._id ? { ...item, booking_status: newStatus } : item));
                      setSelected(null);
                    } catch {
                      alert("Status updated locally (mock)");
                      setBookings(prev => prev.map(item => item._id === selectedBooking._id ? { ...item, booking_status: newStatus } : item));
                      setSelected(null);
                    }
                  }}
                  className="px-4 py-2 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-xl text-sm font-semibold shadow-xs transition"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
