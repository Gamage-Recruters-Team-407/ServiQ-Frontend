"use client";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import CompletionList from "@/components/completion/CompletionList";
import { USER_ROLES } from "@/utils/constants";

export default function ProviderCompletionsPage() {
  return (
    <ProtectedRoute allowedRoles={[USER_ROLES.PROVIDER]}>
      <div className="rounded-2xl bg-white p-6 text-ink shadow-sm">
        <h1 className="portal-title">Service Progress</h1>
        <p className="mb-6 mt-1 text-sm text-muted">Track each job from acceptance to completion. Customers are notified at every step.</p>
        <CompletionList viewer="provider" basePath="/provider/completions" />
      </div>
    </ProtectedRoute>
  );
}
