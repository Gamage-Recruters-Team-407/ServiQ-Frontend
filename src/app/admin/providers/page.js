'use client';
import StatusBadge from '@/components/admin/AccountStatusBadge';
import { useEffect, useState, useCallback } from 'react';
//import StatusBadge from '@/components/admin/StatusBadge';
import VerificationBadge from '@/components/admin/VerificationBadge';
import ConfirmStatusModal from '@/components/admin/ConfirmStatusModal';
import ProviderDetailsModal from '@/components/admin/ProviderDetailsModal';
import {
  listProviders,
  updateProviderStatus,
  updateProviderVerification,
} from '@/services/providerAdminService';
console.log("StatusBadge:", typeof StatusBadge, "| VerificationBadge:", typeof VerificationBadge);

const TABS = [
  { key: '',           label: 'All providers',        count: 'all' },
  { key: 'individual', label: 'Individual',           count: 'individual' },
  { key: 'business',   label: 'Business',             count: 'business' },
  { key: 'pending',    label: 'Pending verification', count: 'pending' },
];

const STATUS_OPTIONS = ['active', 'inactive', 'pending', 'restricted', 'suspended'];

const initials = name =>
  name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

export default function ManageProviders() {
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [tabs, setTabs] = useState({});
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [error, setError] = useState('');
  const limit = 5;

  const load = useCallback(async () => {
    try {
      setError('');
      const data = await listProviders({ search, tab, status, category, page, limit });
      setRows(data.rows);
      setTotal(data.total);
      setTabs(data.tabs);
      setCategories(data.categories);
    } catch (e) {
      setError(e.message);
    }
  }, [search, tab, status, category, page]);

  useEffect(() => { load(); }, [load]);

  async function changeStatus(id, next) {
    try {
      await updateProviderStatus(id, next);
      setEditing(null);
      load();
    } catch (e) { setError(e.message); }
  }

  async function verify(id, value) {
    try {
      await updateProviderVerification(id, value);
      setViewing(null);
      load();
    } catch (e) { setError(e.message); }
  }

  const pages = Math.max(1, Math.ceil(total / limit));
  const reset = fn => v => { fn(v); setPage(1); };

  return (
    <div className="text-ink">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold">
            Manage <span className="text-primary">Providers</span>
          </h1>
          <p className="text-sm text-muted mt-1">
            Review provider profiles, verify new providers and control their marketplace participation.
          </p>
        </div>
        <button disabled title="Export format pending confirmation"
          className="px-4 py-2 rounded-lg border border-line bg-white text-sm disabled:opacity-60">
          Export
        </button>
      </div>

      {error && (
        <div className="mb-4 px-4 py-2 rounded-lg bg-red-100 text-danger text-sm">{error}</div>
      )}

      <div className="bg-white border border-line rounded-xl overflow-hidden">
        {/* Tabs */}
        <div className="flex gap-6 px-4 border-b border-line">
          {TABS.map(t => {
            const active = tab === t.key;
            return (
              <button key={t.key} onClick={() => reset(setTab)(t.key)}
                className={`py-3 text-sm font-medium border-b-2 -mb-px flex items-center gap-2
                  ${active ? 'border-primary text-primary' : 'border-transparent text-muted hover:text-ink'}`}>
                {t.label}
                <span className={`text-xs px-1.5 rounded-full ${active ? 'bg-info text-primary-dark' : 'bg-surface text-muted'}`}>
                  {tabs[t.count] ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap gap-3 p-4">
          <input
            className="border border-line px-3 py-2 rounded-lg w-72 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Search by name, service or city..."
            value={search} onChange={e => reset(setSearch)(e.target.value)} />
          <select className="border border-line px-3 py-2 rounded-lg text-sm capitalize"
            value={status} onChange={e => reset(setStatus)(e.target.value)}>
            <option value="">All statuses</option>
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="border border-line px-3 py-2 rounded-lg text-sm"
            value={category} onChange={e => reset(setCategory)(e.target.value)}>
            <option value="">All categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface text-muted text-xs uppercase">
              <tr>
                <th className="px-4 py-3">Provider</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Rating</th>
                <th className="px-4 py-3">Bookings</th>
                <th className="px-4 py-3">Verification</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(p => (
                <tr key={p.id} className="border-t border-line hover:bg-surface">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-info text-primary-dark text-xs font-bold flex items-center justify-center">
                        {initials(p.name)}
                      </div>
                      <div>
                        <div className="font-semibold">{p.name}</div>
                        <div className="text-xs text-muted">{p.code} · {p.city}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 capitalize">{p.type}</td>
                  <td className="px-4 py-3">{p.category}</td>
                  <td className="px-4 py-3 font-semibold">{p.rating ? `★ ${p.rating.toFixed(1)}` : '-'}</td>
                  <td className="px-4 py-3">{p.bookings}</td>
                  <td className="px-4 py-3"><VerificationBadge value={p.verification} /></td>
                  <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setViewing(p)}
                        className="px-3 py-1 rounded-lg border border-line text-xs hover:bg-surface">
                        View
                      </button>
                      <button onClick={() => setEditing(p)}
                        className="px-3 py-1 rounded-lg bg-info text-primary-dark text-xs font-semibold hover:bg-accent">
                        Change status
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={8} className="p-8 text-center text-muted">No providers found</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-line text-xs text-muted">
          <span>Showing {rows.length} of {total} providers</span>
          <div className="flex gap-1">
            {Array.from({ length: pages }, (_, i) => i + 1).map(n => (
              <button key={n} onClick={() => setPage(n)}
                className={`w-8 h-8 rounded-lg border text-sm
                  ${n === page ? 'bg-primary border-primary text-white' : 'border-line bg-white text-ink'}`}>
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      {editing && (
        <ConfirmStatusModal customer={editing} onClose={() => setEditing(null)} onConfirm={changeStatus} />
      )}
      {viewing && (
        <ProviderDetailsModal provider={viewing} onClose={() => setViewing(null)} onVerify={verify} />
      )}
    </div>
  );
}