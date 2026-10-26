export default function ProviderComparisonTable({ providers = [] }) {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Criteria</th>
            {providers.map((p) => (
              <th key={p.id}>{p.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Experience</td>
            {providers.map((p) => (
              <td key={p.id}>{p.experience}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
