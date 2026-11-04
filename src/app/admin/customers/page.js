'use client';
import StatusBadge from '@/components/admin/AccountStatusBadge';
import { listCustomers, updateCustomerStatus } from '@/services/customerAdminService';
import { useEffect, useState, useCallback } from 'react';
//import StatusBadge from '@/components/admin/StatusBadge';
import ConfirmStatusModal from '@/components/admin/ConfirmStatusModal';

const CHIPS = [
  { key: '',           label: 'All customers' },
  { key: 'active',     label: 'Active' },
  { key: 'inactive',   label: 'Inactive' },
  { key: 'restricted', label: 'Restricted' },
  { key: 'suspended',  label: 'Suspended' },
  { key: 'pending',    label: 'Pending Verification' },
];

const fmtDate = d =>
  new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

const initials = name =>
  name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

export default function ManageCustomers() {
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [counts, setCounts] = useState({});
  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState(null);
  const limit = 5;

  const [error, setError] = useState('');

const load = useCallback(async () => {
  try {
    setError('');
    const data = await listCustomers({ search, status, location, page, limit });
    setRows(data.rows);
    setTotal(data.total);
    setCounts(data.counts);
    setLocations(data.locations);
  } catch (e) {
    setError(e.message);
  }
}, [search, status, location, page]);

  useEffect(() => { load(); }, [load]);

  async function changeStatus(id, next) {
  try {
    await updateCustomerStatus(id, next);
    setEditing(null);
    load();
  } catch (e) {
    setError(e.message);
  }
}

  const pages = Math.max(1, Math.ceil(total / limit));
  const reset = fn => v => { fn(v); setPage(1); };

  return (
    <div className="-m-8 p-8 min-h-screen bg-surface text-ink">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold">
            Manage <span className="text-primary">Customers</span>
          </h1>
          <p className="text-sm text-muted mt-1">
            View, search and manage customer accounts. Booking and financial history is always preserved.
          </p>
        </div>
        <button disabled title="Export format pending confirmation"
          className="px-4 py-2 rounded-lg border border-line bg-white text-sm disabled:opacity-60">
          Export
        </button>
      </div>

      {/* Status chips */}
      <div className="flex flex-wrap gap-3 mb-5">
        {CHIPS.map(c => {
          const active = status === c.key;
          const n = c.key === '' ? counts.all : counts[c.key];
          return (
            <button key={c.key} onClick={() => reset(setStatus)(c.key)}
              className={`text-left px-4 py-2 rounded-lg border min-w-[96px]
                ${active ? 'border-primary bg-info' : 'border-line bg-white hover:bg-surface'}`}>
              <div className="text-lg font-bold leading-tight">{n ?? 0}</div>
              <div className="text-xs text-muted">{c.label}</div>
            </button>
          );
        })}
      </div>

      {/* Card */}
      <div className="bg-white border border-line rounded-xl overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-3 p-4">
          <input
            className="border border-line px-3 py-2 rounded-lg w-72 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Search by name, email or phone..."
            value={search} onChange={e => reset(setSearch)(e.target.value)} />
          <select className="border border-line px-3 py-2 rounded-lg text-sm"
            value={status} onChange={e => reset(setStatus)(e.target.value)}>
            <option value="">All statuses</option>
            {CHIPS.slice(1).map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
          </select>
          <select className="border border-line px-3 py-2 rounded-lg text-sm"
            value={location} onChange={e => reset(setLocation)(e.target.value)}>
            <option value="">All locations</option>
            {locations.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface text-muted text-xs uppercase">
              <tr>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Bookings</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(c => (
                <tr key={c.id} className="border-t border-line hover:bg-surface">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-info text-primary-dark text-xs font-bold flex items-center justify-center">
                        {initials(c.name)}
                      </div>
                      <div>
                        <div className="font-semibold">{c.name}</div>
                        <div className="text-xs text-muted">{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{c.phone}</td>
                  <td className="px-4 py-3">{c.location}</td>
                  <td className="px-4 py-3">{c.bookings}</td>
                  <td className="px-4 py-3">{fmtDate(c.joinedAt)}</td>
                  <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button className="px-3 py-1 rounded-lg border border-line text-xs hover:bg-surface">
                        View
                      </button>
                      <button onClick={() => setEditing(c)}
                        className="px-3 py-1 rounded-lg bg-info text-primary-dark text-xs font-semibold hover:bg-accent">
                        Change status
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={7} className="p-8 text-center text-muted">No customers found</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-line text-xs text-muted">
          <span>Showing {rows.length} of {total} customers</span>
          <div className="flex gap-1">
            {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg border text-sm
                  ${p === page ? 'bg-primary border-primary text-white' : 'border-line bg-white text-ink'}`}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {editing && (
        <ConfirmStatusModal customer={editing} onClose={() => setEditing(null)} onConfirm={changeStatus} />
      )}
    </div>
  );
}