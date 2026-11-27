"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { label: "Overview", href: "/customer/dashboard", icon: "grid" },
  { label: "My bookings", href: "/customer/bookings", icon: "calendar" },
  { label: "Messages", href: "/customer/messages", icon: "message", count: "2" },
  { label: "My reviews", href: "/customer/reviews", icon: "star" },
  { label: "Disputes", href: "/customer/disputes", icon: "shield" },
];

function Icon({ name, size = 20 }) {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18" /></>,
    message: <><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" /></>,
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3z" />,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z" /><path d="m9 12 2 2 4-4" /></>,
    user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0z" /><circle cx="12" cy="10" r="2.5" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.5.9l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.5-.9l-1.7.7-1.4-2.4 1.4-1.1a7 7 0 0 1 0-1.8l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.5-.9l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.5.9l1.7-.7 1.4 2.4-1.4 1.1a7 7 0 0 1 0 1.7z" /></>,
  };

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function NavigationLinks({ mobile = false }) {
  const pathname = usePathname();

  return navigation.map((item) => {
    const active = pathname === item.href;
    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
          active
            ? "bg-brand-wash text-brand"
            : "text-slate-500 hover:bg-slate-50 hover:text-ink"
        } ${mobile ? "shrink-0 whitespace-nowrap" : "w-full"}`}
      >
        <Icon name={item.icon} size={19} />
        <span>{item.label}</span>
        {item.count && (
          <span className="ml-auto rounded-full bg-brand-wash px-2 py-0.5 text-xs font-bold text-brand">
            {item.count}
          </span>
        )}
      </Link>
    );
  });
}

export default function CustomerLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#fffaf5] text-ink">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[258px] flex-col border-r border-line bg-white px-5 py-7 lg:flex">
        <Link href="/customer/dashboard" className="mb-10 flex items-center gap-2 px-2">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-lg font-extrabold text-white">
            sQ
          </span>
          <span className="text-[22px] font-extrabold tracking-tight text-ink">
            servi<span className="text-brand">Q</span>
          </span>
        </Link>

        <div className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
          Menu
        </div>
        <nav aria-label="Customer navigation" className="flex flex-col gap-1">
          <NavigationLinks />
        </nav>

        <div className="mt-8 border-t border-slate-100 pt-6">
          <div className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Account
          </div>
          <Link
            href="/customer/profile"
            aria-current={pathname === "/customer/profile" ? "page" : undefined}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
              pathname === "/customer/profile"
                ? "bg-brand-wash text-brand"
                : "text-slate-500 hover:bg-slate-50 hover:text-ink"
            }`}
          >
            <Icon name="user" size={19} />
            My profile
          </Link>
          <Link
            href="/customer/profile"
            className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-ink"
          >
            <Icon name="settings" size={19} />
            Settings
          </Link>
        </div>

        <div className="mt-auto rounded-2xl bg-brand-wash p-4">
          <div className="mb-2 grid h-9 w-9 place-items-center rounded-xl bg-white text-brand">
            <Icon name="shield" size={18} />
          </div>
          <p className="text-sm font-bold text-ink">Need a hand?</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Our support team is always happy to help.
          </p>
          <Link
            href="/customer/messages"
            className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-brand hover:text-brand-hover"
          >
            Contact support <Icon name="arrow" size={14} />
          </Link>
        </div>

        <div className="mt-5 flex items-center gap-3 border-t border-slate-100 px-1 pt-5">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-orange-100 text-sm font-bold text-brand">
            KP
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-ink">Kamal Perera</p>
            <p className="truncate text-xs text-slate-400">Customer account</p>
          </div>
          <Icon name="chevron" size={16} />
        </div>
      </aside>

      <div className="lg:pl-[258px]">
        <header className="sticky top-0 z-20 border-b border-line bg-white/90 backdrop-blur">
          <div className="flex h-[72px] items-center justify-between gap-5 px-5 sm:px-8 xl:px-10">
            <Link href="/customer/dashboard" className="flex items-center gap-2 lg:hidden">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-sm font-extrabold text-white">
                sQ
              </span>
              <span className="text-lg font-extrabold tracking-tight text-ink">
                servi<span className="text-brand">Q</span>
              </span>
            </Link>
            <div className="hidden max-w-[390px] flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 sm:flex lg:ml-0">
              <Icon name="search" size={18} />
              <input
                aria-label="Search services"
                placeholder="Search for a service..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
              <kbd className="hidden rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] text-slate-400 md:block">
                ⌘ K
              </kbd>
            </div>
            <div className="flex items-center gap-3 sm:gap-5">
              <button
                type="button"
                aria-label="Notifications"
                className="relative grid h-10 w-10 place-items-center rounded-xl text-slate-500 transition hover:bg-slate-50 hover:text-ink"
              >
                <Icon name="bell" size={20} />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-brand" />
              </button>
              <div className="hidden h-8 w-px bg-slate-200 sm:block" />
              <Link href="/customer/profile" className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-orange-100 text-xs font-bold text-brand">
                  KP
                </span>
                <span className="hidden text-left sm:block">
                  <span className="block text-sm font-bold leading-4 text-ink">Kamal Perera</span>
                  <span className="mt-1 block text-xs text-slate-400">Customer</span>
                </span>
              </Link>
            </div>
          </div>
          <nav
            aria-label="Customer navigation"
            className="flex gap-1 overflow-x-auto border-t border-slate-100 px-4 py-2 lg:hidden"
          >
            <NavigationLinks mobile />
            <Link
              href="/customer/profile"
              className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl px-3 py-3 text-sm font-semibold text-slate-500 hover:bg-slate-50"
            >
              <Icon name="user" size={19} />
              Profile
            </Link>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
