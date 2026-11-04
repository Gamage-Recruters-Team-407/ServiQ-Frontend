const styles = {
  active:     'bg-green-100 text-success',
  inactive:   'bg-slate-100 text-muted',
  restricted: 'bg-orange-100 text-warning',
  suspended:  'bg-red-100 text-danger',
  pending:    'bg-info text-primary-dark',
};
const labels = { pending: 'Pending' };

export default function AccountStatusBadge({ status }) {
  const s = status ?? 'inactive';
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${styles[s] ?? styles.inactive}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {labels[s] ?? s.charAt(0).toUpperCase() + s.slice(1)}
    </span>
  );
}