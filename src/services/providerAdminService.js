import { apiClient } from '@/services/api';

export const PROVIDER_STATUSES = ['active', 'inactive', 'pending', 'suspended', 'restricted'];

export async function listProviders({ search = '', tab = '', status = '', category = '', page = 1, limit = 12 } = {}) {
  const qs = new URLSearchParams({ search, tab, status, category, page, limit }).toString();
  return apiClient(`/admin/providers?${qs}`);
}

export async function getProvider(id) {
  return apiClient(`/admin/providers/${id}`);
}

export async function updateProviderStatus(id, status) {
  return apiClient(`/admin/providers/${id}/status`, { method: 'PATCH', body: { status } });
}

export async function updateProviderVerification(id, verification) {
  return apiClient(`/admin/providers/${id}/verification`, { method: 'PATCH', body: { verification } });
}