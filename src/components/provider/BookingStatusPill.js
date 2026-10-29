const statusStyles = {
  Requested: "border-[#FDBA74] bg-[#FFF7ED] text-[#B45309]",
  Accepted: "border-[#86EFAC] bg-[#F0FDF4] text-[#15803D]",
  Rejected: "border-[#FCA5A5] bg-[#FEF2F2] text-[#DC2626]",
  Confirmed: "border-[#86EFAC] bg-[#F0FDF4] text-[#15803D]",
  "In Progress": "border-[#FDBA74] bg-[#FFF7ED] text-[#C2410C]",
  Completed: "border-[#86EFAC] bg-[#F0FDF4] text-[#15803D]",
  Cancelled: "border-[#FCA5A5] bg-[#FEF2F2] text-[#DC2626]",
  Disputed: "border-[#FCD34D] bg-[#FFFBEB] text-[#B45309]"
};

export default function BookingStatusPill({ status }) {
  if (!status) return null;

  const style =
    statusStyles[status] || "border-[#E2E8F0] bg-white text-[#64748B]";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${style}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
