import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import DashboardSidebar from "@/components/common/DashboardSidebar";

export default function DashboardLayout({ children, role }) {
  return (
    <div className="flex min-h-screen w-full flex-row bg-slate-50 max-md:flex-col">
      <DashboardSidebar role={role} />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Navbar />

        <main className="min-w-0 flex-1">{children}</main>

        <Footer />
      </div>
    </div>
  );
}
