"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RegisterForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", password: "", role: "Customer" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));

  async function submit(event) {
    event.preventDefault(); setBusy(true); setError("");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/auth/register`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed.");
      login(data.user, data.token);
      router.replace(form.role === "Service Provider" ? "/provider/dashboard" : "/customer/dashboard");
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }

  return <main className="auth-page"><div className="auth-wrap"><Link href="/" className="auth-brand">servi<span>Q</span></Link><section className="auth-card"><p className="auth-eyebrow">JOIN SERVIQ</p><h1>Create your account</h1><p className="auth-description">Register as a customer or service provider.</p><form className="auth-form auth-grid" onSubmit={submit}><label>First name<input value={form.first_name} onChange={update("first_name")} required /></label><label>Last name<input value={form.last_name} onChange={update("last_name")} required /></label><label className="auth-full">Email address<input type="email" value={form.email} onChange={update("email")} required /></label><label className="auth-full">Password<input type="password" minLength={8} value={form.password} onChange={update("password")} required /></label><label className="auth-full">Account type<select value={form.role} onChange={update("role")}><option>Customer</option><option>Service Provider</option></select></label>{error && <p className="auth-error auth-full">{error}</p>}<button className="auth-full" disabled={busy}>{busy ? "Creating account…" : "Create account →"}</button></form><p className="auth-footnote">Already registered? <Link href="/login">Sign in</Link></p></section><Link href="/" className="auth-back">← Back to serviQ</Link></div></main>;
}
