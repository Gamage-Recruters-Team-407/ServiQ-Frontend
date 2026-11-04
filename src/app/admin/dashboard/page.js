import Link from "next/link";

const stats = [
  {
    title: "Total Users",
    value: "1,250",
    detail: "Registered accounts",
    change: "+12.5%",
    icon: "👥",
    iconStyle: "bg-orange-50 text-orange-600",
  },
  {
    title: "Service Providers",
    value: "320",
    detail: "Verified providers",
    change: "+8.2%",
    icon: "🛠️",
    iconStyle: "bg-blue-50 text-blue-600",
  },
  {
    title: "Total Bookings",
    value: "860",
    detail: "All platform bookings",
    change: "+18.4%",
    icon: "📅",
    iconStyle: "bg-violet-50 text-violet-600",
  },
  {
    title: "Pending Disputes",
    value: "12",
    detail: "Awaiting resolution",
    change: "Needs attention",
    icon: "⚠️",
    iconStyle: "bg-red-50 text-red-600",
  },
];

const bookings = [
  {
    id: "#BK-1001",
    customer: "Kasun Perera",
    service: "Home Cleaning",
    amount: "Rs. 5,000",
    status: "Completed",
  },
  {
    id: "#BK-1002",
    customer: "Nimal Silva",
    service: "Electrical Repair",
    amount: "Rs. 3,500",
    status: "Pending",
  },
  {
    id: "#BK-1003",
    customer: "Amali Fernando",
    service: "Plumbing",
    amount: "Rs. 7,500",
    status: "In Progress",
  },
  {
    id: "#BK-1004",
    customer: "Saman Jayawardena",
    service: "AC Repair",
    amount: "Rs. 4,000",
    status: "Completed",
  },
];

const actions = [
  {
    title: "Manage Users",
    description: "View and manage customer accounts",
    icon: "👥",
    href: "/admin/users",
    color: "bg-orange-50",
  },
  {
    title: "Manage Providers",
    description: "Review provider accounts",
    icon: "🛠️",
    href: "/admin/users",
    color: "bg-blue-50",
  },
  {
    title: "View Bookings",
    description: "Monitor service bookings",
    icon: "📅",
    href: "/admin/bookings",
    color: "bg-violet-50",
  },
  {
    title: "Review Disputes",
    description: "Resolve customer complaints",
    icon: "⚖️",
    href: "/admin/disputes",
    color: "bg-red-50",
  },
];

const chart = [
  { month: "Jan", height: "h-[38%]" },
  { month: "Feb", height: "h-[55%]" },
  { month: "Mar", height: "h-[45%]" },
  { month: "Apr", height: "h-[72%]" },
  { month: "May", height: "h-[62%]" },
  { month: "Jun", height: "h-[85%]" },
  { month: "Jul", height: "h-[96%]" },
];

const overview = [
  {
    label: "Customers",
    value: "930",
    width: "w-[75%]",
    color: "bg-orange-500",
  },
  { label: "Providers", value: "320", width: "w-[42%]", color: "bg-blue-500" },
  {
    label: "Completed Bookings",
    value: "680",
    width: "w-[82%]",
    color: "bg-emerald-500",
  },
  {
    label: "Pending Bookings",
    value: "180",
    width: "w-[25%]",
    color: "bg-amber-500",
  },
];

function SectionHeading({ title, subtitle }) {
  return (
    <div>
      <h2 className="text-lg font-bold tracking-tight text-slate-900">
        {title}
      </h2>
      <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Completed: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    Pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
    "In Progress": "bg-blue-50 text-blue-700 ring-blue-600/20",
  };

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}

function Panel({ children, className = "" }) {
  return (
    <div
      className={`min-w-0 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen min-w-0 bg-slate-50/80 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1600px] space-y-7">
        <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
              ServiQ / Administration
            </p>
            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Welcome back! Here is your marketplace overview.
            </p>
          </div>

          <div className="flex w-fit items-center gap-3 rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-sm">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Platform Status
              </p>
              <p className="mt-0.5 text-sm font-semibold text-slate-700">
                All Systems Operational
              </p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-slate-500">
                  {item.title}
                </p>
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl ${item.iconStyle}`}
                >
                  {item.icon}
                </span>
              </div>

              <p className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">
                {item.value}
              </p>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs text-slate-400">{item.detail}</span>
                <span
                  className={`text-xs font-bold ${
                    item.title === "Pending Disputes"
                      ? "text-red-600"
                      : "text-emerald-600"
                  }`}
                >
                  {item.change}
                </span>
              </div>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <Panel className="xl:col-span-2">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <SectionHeading
                title="Booking Analytics"
                subtitle="Monthly marketplace booking overview"
              />
              <span className="w-fit rounded-lg bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-700">
                Last 7 Months
              </span>
            </div>

            <div className="mt-8 flex h-64 items-end justify-around gap-3 border-b border-slate-100 px-1 sm:gap-5">
              {chart.map((item) => (
                <div
                  key={item.month}
                  className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-3"
                >
                  <div className="flex h-full w-full items-end justify-center">
                    <div
                      className={`w-full max-w-12 rounded-t-xl bg-gradient-to-t from-orange-600 to-orange-400 transition-all duration-300 hover:from-orange-700 hover:to-orange-500 ${item.height}`}
                    />
                  </div>
                  <span className="pb-3 text-xs font-medium text-slate-400">
                    {item.month}
                  </span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <SectionHeading
              title="Platform Overview"
              subtitle="Marketplace statistics"
            />

            <div className="mt-7 space-y-6">
              {overview.map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-slate-500">
                      {item.label}
                    </span>
                    <strong className="text-sm font-bold text-slate-800">
                      {item.value}
                    </strong>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${item.color} ${item.width}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 rounded-xl bg-orange-50 p-4">
              <p className="text-xs font-medium text-orange-700">
                Total platform bookings
              </p>
              <p className="mt-1 text-2xl font-extrabold text-slate-900">860</p>
              <p className="mt-1 text-xs text-slate-500">
                680 completed bookings
              </p>
            </div>
          </Panel>
        </section>

        <section>
          <div className="mb-4">
            <SectionHeading
              title="Quick Actions"
              subtitle="Quickly access important administration features."
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {actions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${action.color}`}
                >
                  {action.icon}
                </span>
                <h3 className="mt-4 font-bold text-slate-900 transition-colors group-hover:text-orange-600">
                  {action.title}
                </h3>
                <p className="mt-2 min-h-10 text-sm leading-5 text-slate-500">
                  {action.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-orange-600">
                  Open Section
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <Panel className="!p-0">
          <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:px-6">
            <SectionHeading
              title="Recent Bookings"
              subtitle="Latest marketplace transactions"
            />
            <Link
              href="/admin/bookings"
              className="w-fit rounded-lg px-3 py-2 text-sm font-bold text-orange-600 transition-colors hover:bg-orange-50"
            >
              View All →
            </Link>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">
              <thead>
                <tr className="bg-slate-50/80">
                  {[
                    "Booking ID",
                    "Customer",
                    "Service",
                    "Amount",
                    "Status",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="transition-colors hover:bg-slate-50/70"
                  >
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-orange-600">
                      {booking.id}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-slate-800">
                      {booking.customer}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                      {booking.service}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-slate-800">
                      {booking.amount}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <StatusBadge status={booking.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </main>
  );
}
