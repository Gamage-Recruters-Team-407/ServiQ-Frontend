"use client";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import CompletionList from "@/components/completion/CompletionList";
import { USER_ROLES } from "@/utils/constants";

export default function CustomerServiceProgressPage() {
  return (
    <ProtectedRoute allowedRoles={[USER_ROLES.CUSTOMER]}>
      <div className="rounded-2xl bg-white p-6 text-ink shadow-sm">
        <h1 className="portal-title">Service Progress</h1>
        <p className="mb-6 mt-1 text-sm text-muted">Follow your booked services from start to finish.</p>
        <CompletionList viewer="customer" basePath="/customer/service-progress" />
      </div>
    </ProtectedRoute>
  );
}
