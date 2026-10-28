export default function Modal({ isOpen, title, children, onClose }) {
  if (!isOpen) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="glass-panel" style={{ width: 480, padding: "2rem" }}>
        <h3>{title}</h3>
        <div>{children}</div>
        <button onClick={onClose} className="mt-4 inline-flex items-center justify-center gap-2 rounded-[10px] border border-[var(--secondary-accent)] bg-[var(--bg-secondary)] px-5 py-[0.65rem] text-[0.925rem] font-semibold text-[var(--text-main)] transition-all duration-200 ease-[ease-in-out] hover:bg-[#fed7aa]">Close</button>
      </div>
    </div>
  );
}
