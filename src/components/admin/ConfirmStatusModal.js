'use client';
import { useState } from 'react';

const OPTIONS = ['active', 'inactive', 'restricted', 'suspended'];

export default function ConfirmStatusModal({ customer, onClose, onConfirm }) {
  const [status, setStatus] = useState(customer.status);
  const [saving, setSaving] = useState(false);

  async function submit() {
    setSaving(true);
    await onConfirm(customer.id, status);
    setSaving(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-xl border border-line w-full max-w-sm p-6" onClick={e => e.stopPropagation()}>
        <h2 className="text-lg font-bold">Change status</h2>
        <p className="text-sm text-muted mb-4">{customer.name}</p>

        <div className="flex flex-col gap-2 mb-5">
          {OPTIONS.map(o => (
            <label key={o}
              className={`flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer text-sm capitalize
                ${status === o ? 'border-primary bg-surface' : 'border-line'}`}>
              <input type="radio" name="status" value={o} checked={status === o}
                onChange={() => setStatus(o)} className="accent-primary" />
              {o}
            </label>
          ))}
        </div>

        <p className="text-xs text-muted mb-4">Booking and financial history is always preserved.</p>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-line text-sm">Cancel</button>
          <button onClick={submit} disabled={saving || status === customer.status}
            className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm disabled:opacity-50">
            {saving ? 'Saving...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}