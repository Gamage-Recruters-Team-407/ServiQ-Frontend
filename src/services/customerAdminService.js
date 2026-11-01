import { apiClient } from '@/services/api';

export const STATUSES = ['active', 'inactive', 'restricted', 'suspended', 'pending'];

export async function listCustomers({ search = '', status = '', location = '', page = 1, limit = 12 } = {}) {
  const qs = new URLSearchParams({ search, status, location, page, limit }).toString();
  return apiClient(`/admin/customers?${qs}`);
}

export async function getCustomer(id) {
  return apiClient(`/admin/customers/${id}`);
}

export async function updateCustomerStatus(id, status) {
  return apiClient(`/admin/customers/${id}/status`, {
    method: 'PATCH',
    body: { status },
  });
}