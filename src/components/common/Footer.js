import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-subtle)",
        padding: "4rem 0 2rem",
        marginTop: "auto"
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2.5rem",
            marginBottom: "3rem"
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "8px",
                  background: "var(--brand-gradient)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: "1rem"
                }}
              >
                S
              </div>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 800 }}>
                ServiQ
              </span>
            </div>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              AI-Powered Local Services Marketplace connecting verified professionals with customers across Sri Lanka with transparent pricing, instant booking, and secure escrow payments.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1rem", color: "#fff" }}>
              Explore Services
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <li><Link href="/services?category=Home+Repairs" style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Home Repairs & Maintenance</Link></li>
              <li><Link href="/services?category=Electrical" style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Electrical Services</Link></li>
              <li><Link href="/services?category=Plumbing" style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Plumbing & Sanitation</Link></li>
              <li><Link href="/services?category=Cleaning" style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Deep Cleaning & Janitorial</Link></li>
              <li><Link href="/services/compare" style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Provider Comparison</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1rem", color: "#fff" }}>
              For Providers
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <li><Link href="/register?role=provider" style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Become a Service Provider</Link></li>
              <li><Link href="/provider/dashboard" style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Provider Portal</Link></li>
              <li><Link href="/provider/earnings" style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Earnings & Payouts</Link></li>
              <li><Link href="/provider/availability" style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Calendar & Scheduling</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1rem", color: "#fff" }}>
              Platform & Trust
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <li><span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>🛡️ Identity Verified Providers</span></li>
              <li><span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>🔒 Escrow Payment Protection</span></li>
              <li><span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>⚖️ Structured Dispute Resolution</span></li>
              <li><Link href="/admin/dashboard" style={{ color: "var(--brand-primary)", fontSize: "0.9rem" }}>Platform Administration</Link></li>
            </ul>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid var(--border-subtle)",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            fontSize: "0.85rem",
            color: "var(--text-muted)"
          }}
        >
          <div>
            © 2026 Gamage Recruiters (Pvt) Ltd. All rights reserved. ServiQ Marketplace SRS v1.0.
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Dispute Policies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
