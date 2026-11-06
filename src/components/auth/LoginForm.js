"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const roles = {
  customer: { label: "Customer", apiRole: "Customer", dashboard: "/customer/dashboard", intro: "Book trusted professionals and manage your services." },
  provider: { label: "Service provider", apiRole: "Service Provider", dashboard: "/provider/dashboard", intro: "Manage your services, bookings and earnings." },
  admin: { label: "Administrator", apiRole: "Administrator", dashboard: "/admin/dashboard", intro: "Manage the serviQ platform and operations." },
};

export default function LoginForm({ role = "customer" }) {
  const config = roles[role] || roles.customer;
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, expectedRole: config.apiRole }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to sign in.");
      login(data.user, data.token);
      router.replace(config.dashboard);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-wrap">
        <Link href="/" className="auth-brand">servi<span>Q</span></Link>
        <section className="auth-card">
          <div className="auth-icon">{role === "admin" ? "✦" : role === "provider" ? "⌂" : "♡"}</div>
          <p className="auth-eyebrow">SECURE {config.label.toUpperCase()} ACCESS</p>
          <h1>Welcome back</h1>
          <p className="auth-description">{config.intro}</p>
          <form onSubmit={handleSubmit} className="auth-form">
            <label>Email address<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" autoComplete="username" required /></label>
            <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" autoComplete="current-password" required /></label>
            {error && <p className="auth-error" role="alert">{error}</p>}
            <button type="submit" disabled={busy}>{busy ? "Signing in…" : `Sign in as ${config.label} →`}</button>
          </form>
          {role !== "admin" && <p className="auth-footnote">New to serviQ? <Link href="/register">Create an account</Link></p>}
          <div className="auth-switches">
            <span>Sign in as</span>
            {Object.entries(roles).filter(([key]) => key !== role).map(([key, item]) => <Link key={key} href={`/login/${key}`}>{item.label}</Link>)}
          </div>
        </section>
        <Link href="/" className="auth-back">← Back to serviQ</Link>
      </div>
    </main>
  );
}
