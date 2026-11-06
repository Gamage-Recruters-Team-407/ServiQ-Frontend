export default function BookingTimeline({ currentStatus }) {
  return (
    <div className="glass-panel" style={{ padding: "1rem" }}>
      <span>Status: {currentStatus || "Requested"}</span>
    </div>
  );
}
