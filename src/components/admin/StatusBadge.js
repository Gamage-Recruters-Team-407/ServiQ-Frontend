const styles = {
  active:     'bg-green-100 text-success',
  inactive:   'bg-slate-100 text-muted',
  restricted: 'bg-orange-100 text-warning',
  suspended:  'bg-red-100 text-danger',
  pending:    'bg-info text-primary-dark',
};
const labels = { pending: 'Pending Verification' };

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${styles[status] ?? styles.inactive}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {labels[status] ?? status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}