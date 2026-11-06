"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/context/NotificationContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, role, logout } = useAuth();
  const { unreadCount, setIsOpen } = useNotifications();
  const dashboard = role === "Administrator" ? "/admin/dashboard" : role === "Service Provider" ? "/provider/dashboard" : "/customer/dashboard";
  const signOut = () => { logout(); router.replace("/login"); };

  return <header className="public-navbar"><div className="container flex h-full items-center justify-between gap-4">
    <Link href="/" className="flex items-center gap-2"><span className="portal-logo-mark">S</span><span className="text-xl font-extrabold text-slate-900">servi<span className="text-brand-light">Q</span></span></Link>
    <nav className="hidden items-center gap-6 sm:flex"><Link className={pathname.startsWith("/services") ? "public-nav-active" : "public-nav-link"} href="/services">Services</Link><Link className={pathname.startsWith("/services/compare") ? "public-nav-active" : "public-nav-link"} href="/services/compare">Compare providers</Link>{user && <Link className="public-nav-link" href={dashboard}>Dashboard</Link>}</nav>
    <div className="flex items-center gap-2">{user ? <><button className="notification-trigger" onClick={() => setIsOpen(true)} aria-label="Notifications">♧{unreadCount > 0 && <span>{unreadCount}</span>}</button><button className="portal-signout" onClick={signOut}>Sign out</button></> : <><Link href="/login" className="btn btn-secondary btn-sm">Sign in</Link><Link href="/register" className="btn btn-primary btn-sm">Get started</Link></>}</div>
  </div></header>;
}
