'use client';
import StatusBadge from '@/components/admin/AccountStatusBadge';
//import StatusBadge from '@/components/admin/StatusBadge';
import VerificationBadge from '@/components/admin/VerificationBadge';

const fmtDate = d =>
  new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

function Row({ label, children }) {
  return (
    <div className="flex justify-between py-2 border-b border-line text-sm">
      <span className="text-muted">{label}</span>
      <span className="font-medium text-right">{children}</span>
    </div>
  );
}

export default function ProviderDetailsModal({ provider, onClose, onVerify }) {
  const reviewable = ['pending', 'under_review'].includes(provider.verification);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-xl border border-line w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
        <h2 className="text-lg font-bold">{provider.name}</h2>
        <p className="text-sm text-muted mb-4">{provider.email}</p>

        <Row label="Provider ID">{provider.code}</Row>
        <Row label="Phone">{provider.phone}</Row>
        <Row label="Type"><span className="capitalize">{provider.type}</span></Row>
        <Row label="Category">{provider.category}</Row>
        <Row label="City">{provider.city}</Row>
        <Row label="Bookings">{provider.bookings}</Row>
        <Row label="Rating">{provider.rating ? `${provider.rating.toFixed(1)} ★` : 'No ratings yet'}</Row>
        <Row label="Joined">{fmtDate(provider.joinedAt)}</Row>
        <Row label="Verification"><VerificationBadge value={provider.verification} /></Row>
        <Row label="Account status"><StatusBadge status={provider.status} /></Row>

        <div className="flex justify-end gap-2 mt-5">
          {reviewable && (
            <>
              <button onClick={() => onVerify(provider.id, 'rejected')}
                className="px-4 py-2 rounded-lg border border-line text-danger text-sm hover:bg-red-50">
                Reject
              </button>
              <button onClick={() => onVerify(provider.id, 'verified')}
                className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm">
                Approve
              </button>
            </>
          )}
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-line text-sm">Close</button>
        </div>
        {reviewable && (
          <p className="text-xs text-muted mt-3">Approval process is pending confirmation.</p>
        )}
      </div>
    </div>
  );
}