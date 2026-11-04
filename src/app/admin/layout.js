import DashboardLayout from "@/components/common/DashboardLayout";

export default function AdminLayout({ children }) {
  return <DashboardLayout role="admin">{children}</DashboardLayout>;
}
