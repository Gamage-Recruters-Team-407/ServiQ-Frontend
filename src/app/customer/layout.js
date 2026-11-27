import Sidebar from "@/components/common/Sidebar";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export default function CustomerLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FFF7ED] text-[#0F172A]">
      <Sidebar variant="customer" />
      <div className="flex-1 min-w-0 flex flex-col">
        <Navbar variant="customer" />
        <main className="flex-1 p-5 sm:p-8">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
