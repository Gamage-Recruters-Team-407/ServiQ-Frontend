export default function CommissionRuleModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="glass-panel" style={{ padding: "1.5rem" }}>
      <h3>Commission Rule Configuration</h3>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
