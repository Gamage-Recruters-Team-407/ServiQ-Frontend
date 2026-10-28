export default function ProviderComparisonTable({ providers = [] }) {
  return (
    <div className="w-full overflow-x-auto rounded-[10px] border border-[var(--border-light)] bg-[var(--bg-card)]">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border-b border-[var(--border-light)] bg-[#f8fafc] px-4 py-3 text-center text-xs font-bold uppercase text-[var(--text-secondary)]">Criteria</th>
            {providers.map((p) => (
              <th key={p.id} className="border-b border-[var(--border-light)] bg-[#f8fafc] px-4 py-3 text-center text-xs font-bold uppercase text-[var(--text-secondary)]">{p.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-b border-[var(--border-light)] px-4 py-[0.85rem] text-sm">Experience</td>
            {providers.map((p) => (
              <td key={p.id} className="border-b border-[var(--border-light)] px-4 py-[0.85rem] text-sm">{p.experience}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
