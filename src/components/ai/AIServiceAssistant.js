"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/utils/formatters";

export default function AIServiceAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  const handleAskAI = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsProcessing(true);
    // Simulate smart AI recommendation matching
    setTimeout(() => {
      setIsProcessing(false);
      setAiResult({
        category: "Electrical & Appliance Repairs",
        intent: "Emergency Electrical Short-Circuit Troubleshooting",
        recommendations: [
          {
            id: "srv_mock_01",
            provider_name: "Nimal Silva (Certified Master Electrician)",
            service_name: "Emergency Power & Wiring Inspection",
            rating: 4.9,
            reviews_count: 38,
            price: 3500,
            eta: "Within 45 mins",
            badge: "98% Match"
          },
          {
            id: "srv_mock_02",
            provider_name: "Lanka Power Solutions Ltd",
            service_name: "Domestic Circuit Breaker Repair",
            rating: 4.8,
            reviews_count: 82,
            price: 4200,
            eta: "Within 2 hours",
            badge: "Top Business Provider"
          }
        ]
      });
    }, 800);
  };

  return (
    <>
      {/* Floating Widget Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 900,
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          padding: "0.8rem 1.25rem",
          borderRadius: "var(--radius-full)",
          background: "linear-gradient(135deg, #6366f1, #06b6d4)",
          color: "#fff",
          fontWeight: 700,
          boxShadow: "0 8px 25px rgba(99, 102, 241, 0.4)",
          cursor: "pointer",
          border: "1px solid rgba(255, 255, 255, 0.2)"
        }}
        className="pulse-glow"
      >
        <span style={{ fontSize: "1.2rem" }}>✨</span>
        <span>ServiQ AI Assistant</span>
      </button>

      {/* Slide-out or Modal Drawer */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 85,
            right: 24,
            width: 420,
            maxWidth: "92vw",
            maxHeight: "80vh",
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "0 20px 45px rgba(0, 0, 0, 0.7)",
            zIndex: 901,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden"
          }}
          className="animate-fade-in"
        >
          {/* Header */}
          <div
            style={{
              padding: "1rem 1.25rem",
              background: "linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(6, 182, 212, 0.15))",
              borderBottom: "1px solid var(--border-subtle)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "1.2rem" }}>✨</span>
              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700 }}>AI Matchmaker</h4>
                <p style={{ fontSize: "0.75rem", color: "var(--accent-cyan)" }}>
                  Natural Language Service Finder (SRS §25)
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                color: "#fff",
                borderRadius: "50%",
                width: 26,
                height: 26,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: "1.25rem", overflowY: "auto", flex: 1 }}>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
              Describe what service you need in plain words (e.g. <em>&quot;My kitchen sink is leaking and need someone today in Kandy&quot;</em>):
            </p>

            <form onSubmit={handleAskAI} style={{ marginBottom: "1rem" }}>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  type="text"
                  placeholder="Type what you need..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="form-input"
                  style={{ padding: "0.6rem 0.9rem", fontSize: "0.9rem" }}
                />
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="btn btn-primary btn-sm"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {isProcessing ? "Matching..." : "Find"}
                </button>
              </div>
            </form>

            {/* AI Results */}
            {aiResult && (
              <div className="animate-fade-in" style={{ marginTop: "1rem" }}>
                <div
                  style={{
                    padding: "0.75rem",
                    borderRadius: "var(--radius-md)",
                    background: "rgba(6, 182, 212, 0.1)",
                    border: "1px solid rgba(6, 182, 212, 0.25)",
                    marginBottom: "1rem",
                    fontSize: "0.8rem"
                  }}
                >
                  <strong style={{ color: "var(--accent-cyan)", display: "block" }}>
                    Detected Need:
                  </strong>
                  <span>{aiResult.intent}</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {aiResult.recommendations.map((rec) => (
                    <div
                      key={rec.id}
                      style={{
                        padding: "0.9rem",
                        borderRadius: "var(--radius-md)",
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-subtle)"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.3rem" }}>
                        <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{rec.service_name}</span>
                        <span className="badge badge-success" style={{ fontSize: "0.7rem" }}>
                          {rec.badge}
                        </span>
                      </div>
                      <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                        👤 {rec.provider_name}
                      </p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.85rem" }}>
                        <strong style={{ color: "var(--brand-primary)" }}>{formatCurrency(rec.price)}</strong>
                        <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>⏱️ {rec.eta}</span>
                        <Link
                          href={`/services/${rec.id}`}
                          onClick={() => setIsOpen(false)}
                          className="btn btn-secondary btn-sm"
                          style={{ padding: "0.25rem 0.6rem", fontSize: "0.75rem" }}
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
