export default function EarningsSummaryCard({ grossAmount, commissionAmount, netEarnings }) {
  return (
    <div className="glass-panel" style={{ padding: "1.25rem" }}>
      <h4>Earnings Summary</h4>
      <p>Gross − Commission = Net Earnings (SRS §17, §21)</p>
    </div>
  );
}
