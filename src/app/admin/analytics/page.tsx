
"use client";

import { useMemo, useState } from "react";
import "./analytics.css";

type BookingStatus = "Completed" | "Pending" | "Cancelled";

type Booking = {
  id: string;
  customer: string;
  service: string;
  amount: number;
  status: BookingStatus;
};

const bookingStats = [
  { month: "Jan", value: 42 },
  { month: "Feb", value: 58 },
  { month: "Mar", value: 48 },
  { month: "Apr", value: 72 },
  { month: "May", value: 64 },
  { month: "Jun", value: 88 },
  { month: "Jul", value: 76 },
  { month: "Aug", value: 95 },
  { month: "Sep", value: 68 },
  { month: "Oct", value: 82 },
  { month: "Nov", value: 90 },
  { month: "Dec", value: 100 },
];

const recentBookings: Booking[] = [
  { id: "BK-1001", customer: "Kasun Perera", service: "Home Cleaning", amount: 8500, status: "Completed" },
  { id: "BK-1002", customer: "Nimal Silva", service: "AC Repair", amount: 12000, status: "Pending" },
  { id: "BK-1003", customer: "Amaya Fernando", service: "Plumbing", amount: 6500, status: "Completed" },
  { id: "BK-1004", customer: "Tharushi Jay", service: "Electrical", amount: 9500, status: "Cancelled" },
  { id: "BK-1005", customer: "Ravindu Perera", service: "Painting", amount: 18000, status: "Completed" },
];

const initialStats = {
  users: 1284,
  providers: 346,
  bookings: 892,
  revenue: 2456800,
  commission: 245680,
  disputes: 18,
};

const statCards = [
  { label: "Total Users", key: "users", icon: "👥", change: "+12.5%", description: "Registered platform users" },
  { label: "Service Providers", key: "providers", icon: "🛠️", change: "+8.2%", description: "Registered professionals" },
  { label: "Total Bookings", key: "bookings", icon: "📅", change: "+18.4%", description: "Platform booking activity" },
  { label: "Total Revenue", key: "revenue", icon: "💰", change: "+15.8%", description: "Total booking revenue" },
  { label: "Commission", key: "commission", icon: "📊", change: "+10.2%", description: "Platform commission" },
  { label: "Disputes", key: "disputes", icon: "⚠️", change: "Needs review", description: "Disputes requiring attention" },
] as const;

const formatLKR = (value: number) =>
  new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    maximumFractionDigits: 0,
  }).format(value);

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("30 days");
  const [activeTab, setActiveTab] = useState("Overview");

  const stats = useMemo(() => {
    const multiplier =
      period === "7 days" ? 0.24 :
      period === "90 days" ? 2.5 :
      period === "12 months" ? 8 : 1;

    return {
      ...initialStats,
      bookings: Math.round(initialStats.bookings * multiplier),
      revenue: Math.round(initialStats.revenue * multiplier),
      commission: Math.round(initialStats.commission * multiplier),
    };
  }, [period]);

  const exportCSV = () => {
    const rows = [
      ["Booking ID", "Customer", "Service", "Amount (LKR)", "Status"],
      ...recentBookings.map((booking) => [
        booking.id,
        booking.customer,
        booking.service,
        booking.amount.toString(),
        booking.status,
      ]),
    ];

    const csv = rows
      .map((row) =>
        row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "serviq-analytics-report.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const tabs = ["Overview", "Bookings", "Revenue", "Customers"];

  return (
    <div className="analytics-page">
      <div className="analytics-container">

        {/* Page Header */}
        <header className="analytics-header">
          <div>
            <div className="analytics-breadcrumb">
              SERVIQ <span>/</span> ADMINISTRATION
            </div>

            <h1>Analytics & Reports</h1>

            <p className="analytics-subtitle">
              Monitor platform performance and business insights.
            </p>
          </div>

          <div className="analytics-header-actions">
            <span className="demo-badge">
              <span className="demo-dot" />
              DEMO MODE
            </span>

            <button className="export-button" onClick={exportCSV}>
              <span>↓</span> Export CSV
            </button>
          </div>
        </header>

        {/* Demo Notice */}
        <div className="demo-notice">
          <div className="demo-notice-icon">ⓘ</div>
          <div>
            <strong>Demo Environment</strong>
            <p>
              All figures shown here are sample data, not live platform records.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <nav className="analytics-tabs" aria-label="Analytics sections">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`analytics-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
              aria-current={activeTab === tab ? "page" : undefined}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Section Heading */}
        <section className="analytics-section-heading">
          <div>
            <h2>{activeTab} Overview</h2>
            <p>Key performance indicators and platform statistics</p>
          </div>

          <select
            value={period}
            onChange={(event) => setPeriod(event.target.value)}
            aria-label="Select analytics period"
            className="period-select"
          >
            <option>7 days</option>
            <option>30 days</option>
            <option>90 days</option>
            <option>12 months</option>
          </select>
        </section>

        {/* KPI Cards */}
        <section className="analytics-kpi-grid">
          {statCards.map((card, index) => {
            const rawValue = stats[card.key as keyof typeof stats];

            const value =
              card.key === "revenue" || card.key === "commission"
                ? formatLKR(rawValue)
                : rawValue.toLocaleString("en-LK");

            return (
              <article className="analytics-stat-card" key={card.key}>
                <div className="stat-card-top">
                  <span className="stat-label">{card.label}</span>
                  <span className={`stat-icon icon-${index + 1}`}>
                    {card.icon}
                  </span>
                </div>

                <h3 className="stat-value">{value}</h3>

                <p className="stat-description">{card.description}</p>

                <div className={`stat-change ${card.key === "disputes" ? "warning" : ""}`}>
                  {card.key === "disputes" ? "⚠ " : "↗ "}
                  {card.change}
                </div>
              </article>
            );
          })}
        </section>

        {/* Charts */}
        <section className="analytics-charts-grid">

          {/* Booking Performance */}
          <article className="analytics-panel">
            <div className="panel-header">
              <div>
                <h2>Booking Performance</h2>
                <p>Monthly booking activity (sample data)</p>
              </div>

              <span className="chart-legend">
                <span className="legend-dot" />
                Bookings
              </span>
            </div>

            <div className="booking-chart">
              {bookingStats.map((item) => (
                <div className="chart-column" key={item.month}>
                  <span className="chart-value">{item.value}</span>

                  <div className="chart-bar-track">
                    <div
                      className="chart-bar"
                      style={{ height: `${item.value}%` }}
                      title={`${item.month}: ${item.value} bookings`}
                    />
                  </div>

                  <span className="chart-month">{item.month}</span>
                </div>
              ))}
            </div>
          </article>

          {/* Booking Status */}
          <article className="analytics-panel">
            <div className="panel-header">
              <div>
                <h2>Platform Summary</h2>
                <p>Sample booking status distribution</p>
              </div>
            </div>

            <div className="status-chart-area">
              <div className="status-donut">
                <div className="status-donut-inner">
                  <strong>{stats.bookings.toLocaleString("en-LK")}</strong>
                  <span>Bookings</span>
                </div>
              </div>
            </div>

            <div className="status-legend">
              <div>
                <span><i className="status-completed" /> Completed</span>
                <strong>68%</strong>
              </div>

              <div>
                <span><i className="status-pending" /> Pending</span>
                <strong>22%</strong>
              </div>

              <div>
                <span><i className="status-cancelled" /> Cancelled</span>
                <strong>10%</strong>
              </div>
            </div>
          </article>
        </section>

        {/* Bookings and AI */}
        <section className="analytics-bottom-grid">

          {/* Recent Bookings */}
          <article className="analytics-panel bookings-panel">
            <div className="panel-header">
              <div>
                <h2>Recent Bookings</h2>
                <p>Latest sample transactions</p>
              </div>

              <button className="text-export-button" onClick={exportCSV}>
                Export Data ↗
              </button>
            </div>

            <div className="booking-table-wrapper">
              <table className="booking-table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Customer</th>
                    <th>Service</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="booking-id">{booking.id}</td>
                      <td>{booking.customer}</td>
                      <td>{booking.service}</td>
                      <td className="booking-amount">
                        {formatLKR(booking.amount)}
                      </td>
                      <td>
                        <span className={`booking-status ${booking.status.toLowerCase()}`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          {/* AI Assistance */}
          <article className="ai-insights-panel">
            <span className="ai-label">✦ AI ASSISTANCE</span>

            <div className="ai-icon">✧</div>

            <h2>Smart Insights</h2>

            <p>
              AI-powered business insights will be available after client
              approval and integration of an approved AI service.
            </p>

            <div className="ai-pending">
              <span>◷</span>
              Pending Client Approval
            </div>

            <div className="ai-disclaimer">
              No AI requests or automated decisions are performed in demo mode.
            </div>
          </article>
        </section>

        {/* Footer */}
        <footer className="analytics-footer">
          <span>© {new Date().getFullYear()} ServiQ Admin Analytics</span>
          <span>Demo Data · Not connected to production database</span>
        </footer>

      </div>
    </div>
  );
}
