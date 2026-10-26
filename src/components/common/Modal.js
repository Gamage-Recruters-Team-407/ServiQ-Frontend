export default function Modal({ isOpen, title, children, onClose }) {
  if (!isOpen) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="glass-panel" style={{ width: 480, padding: "2rem" }}>
        <h3>{title}</h3>
        <div>{children}</div>
        <button onClick={onClose} className="btn btn-secondary btn-sm" style={{ marginTop: "1rem" }}>Close</button>
      </div>
    </div>
  );
}
