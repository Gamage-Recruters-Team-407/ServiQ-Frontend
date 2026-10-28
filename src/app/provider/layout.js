"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProviderLayout({ children }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { name: "Dashboard", href: "/provider/dashboard", icon: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" },
    { name: "My Services", href: "/provider/services", icon: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-7.8 7.8a2.1 2.1 0 0 1-3-3l7.8-7.8a6 6 0 0 1 7.9-7.9z" },
    { name: "Availability", href: "/provider/availability", icon: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2z" },
    { name: "Bookings", href: "/provider/bookings", icon: "M3 7h18v13H3zM3 7l2-4h14l2 4M7 12h4M7 16h7" },
    { name: "Messages", href: "/provider/messages", icon: "M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8A8.5 8.5 0 0 1 8.7 3.9a8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" },
    { name: "Earnings", href: "/provider/earnings", icon: "M3 3v18h18M7 14l4-4 4 4 6-7M17 7h4v4" },
    { name: "Payouts", href: "/provider/payouts", icon: "M3 7h18v13H3zM3 7l2-4h14l2 4M7 12h4M7 16h7" },
    { name: "Reviews", href: "/provider/reviews", icon: "m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z" },
    { name: "Disputes", href: "/provider/disputes", icon: "M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8A8.5 8.5 0 0 1 8.7 3.9a8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" },
    { name: "Profile", href: "/provider/profile", icon: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" },
  ];

  return (
    <div className="flex min-h-screen bg-[var(--bg-secondary)]">
      <aside className="sticky top-0 flex h-screen w-[260px] shrink-0 flex-col overflow-y-auto border-r border-[var(--border-light)] bg-[var(--bg-main)] text-[var(--text-main)]">
        <div className="border-b border-[var(--border-light)] px-5 py-6">
          <div className="mb-1 flex items-center gap-[0.6rem]">
            <Image
              src="/images/logo.png"
              alt="ServiQ Single Q Logo"
              width={59}
              height={59}
              className="object-contain"
            />
            <span className="text-[1.2rem] font-bold tracking-[-0.02em] text-[var(--text-main)]">
              servi<span className="text-[var(--primary-orange)]">Q</span>
            </span>
          </div>
          <div className="text-center font-['Plus_Jakarta_Sans',sans-serif] text-[0.85rem] font-medium tracking-[-0.01em] text-[#475569]">
            Find Experts. Book Smarter.
          </div>

          <div className="mt-[0.1rem] text-center text-[0.65rem] font-extrabold uppercase tracking-[0.04em] text-[#F97316]">
            AI-Powered Local Services Marketplace
          </div>
        </div>
        <nav className="flex flex-col gap-1 px-3 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-[0.85rem] py-[0.65rem] text-[0.9rem] font-medium transition-all duration-200 ease-[ease-in-out] ${
                  isActive
                    ? "bg-[var(--primary-orange)] text-white"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--primary-orange)]"
                }`}
              >
                <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={item.icon} />
                </svg>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-[60px] items-center justify-between border-b border-[var(--border-light)] bg-[var(--bg-main)] px-6">
          <div className="font-semibold text-[#0F172A]">Merchant Console</div>
          <div className="flex items-center gap-4">
            <div className="text-[0.85rem] text-[#64748B]">Account: Service Provider</div>
            <Link
              href="/provider/profile"
              aria-label="Profile"
              title="Profile"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-light)] bg-[var(--bg-main)] text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-secondary)] hover:text-[var(--primary-orange)]"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
              </svg>
            </Link>
            {user ? (
              <button onClick={logout} className="rounded-md border border-[var(--secondary-accent)] bg-[var(--bg-secondary)] px-3 py-2 text-sm font-semibold text-[var(--text-main)] transition-colors hover:bg-[#fed7aa]">
                Sign Out
              </button>
            ) : (
              <Link href="/login" className="rounded-md bg-[var(--primary-orange)] px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-hover)]">
                Sign In
              </Link>
            )}
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
// 1
