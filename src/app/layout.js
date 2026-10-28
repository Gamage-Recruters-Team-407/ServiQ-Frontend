import "@/styles/globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { NotificationProvider } from "@/context/NotificationContext";

export const metadata = {
  title: "ServiQ - Local Services Marketplace",
  description: "AI-Powered Local Services Marketplace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="max-w-[100vw] overflow-x-hidden bg-[var(--bg-main)] font-[Inter,sans-serif] leading-normal text-[var(--text-main)] antialiased">
        <AuthProvider>
          <NotificationProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="grow">{children}</main>
              <Footer />
            </div>
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
