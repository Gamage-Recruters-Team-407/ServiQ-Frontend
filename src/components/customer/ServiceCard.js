export default function ServiceCard({ service }) {
  return (
    <div className="glass-panel" style={{ padding: "1.5rem" }}>
      <h3>{service?.title || "Service Title"}</h3>
      <p>{service?.description || "Service Description"}</p>
    </div>
  );
}
