export default function StatCard({ title, value, change }) {
  return (
    <div className="glass-panel" style={{ padding: "1.25rem" }}>
      <span>{title}</span>
      <h3>{value}</h3>
      <span>{change}</span>
    </div>
  );
}
