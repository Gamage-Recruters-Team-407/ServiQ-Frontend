const styles = {
  verified:     'bg-green-100 text-success',
  pending:      'bg-info text-primary-dark',
  under_review: 'bg-orange-100 text-warning',
  rejected:     'bg-red-100 text-danger',
};
const labels = { under_review: 'Under Review' };

export default function VerificationBadge({ value }) {
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${styles[value] ?? styles.pending}`}>
      {labels[value] ?? value.charAt(0).toUpperCase() + value.slice(1)}
    </span>
  );
}