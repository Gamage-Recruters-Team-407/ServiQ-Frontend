import Link from "next/link";

const portals = [
  { title: "Customer", description: "Find services, make bookings and manage appointments.", href: "/login/customer", icon: "♡" },
  { title: "Service provider", description: "Manage your services, availability and earnings.", href: "/login/provider", icon: "⌂" },
  { title: "Administrator", description: "Access platform controls and administration tools.", href: "/login/admin", icon: "✦" },
];

export default function LoginPage() {
  return <main className="auth-page"><div className="auth-wrap"><Link href="/" className="auth-brand">servi<span>Q</span></Link><section className="auth-card"><p className="auth-eyebrow">WELCOME TO SERVIQ</p><h1>Choose your sign in</h1><p className="auth-description">Select your account type to continue to the correct secure sign-in page.</p><div className="portal-choice-list">{portals.map((portal) => <Link href={portal.href} key={portal.href} className="portal-choice"><span className="portal-choice-icon">{portal.icon}</span><span><strong>{portal.title}</strong><small>{portal.description}</small></span><b>→</b></Link>)}</div><p className="auth-footnote">New to serviQ? <Link href="/register">Create a customer or provider account</Link></p></section><Link href="/" className="auth-back">← Back to serviQ</Link></div></main>;
}
