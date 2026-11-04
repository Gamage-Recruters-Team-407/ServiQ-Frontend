import Link from "next/link";

const stats = [
  {
    title: "Active Bookings",
    value: "06",
    detail: "Jobs currently scheduled",
    icon: "📅",
  },
  {
    title: "Completed Jobs",
    value: "24",
    detail: "Successfully completed",
    icon: "✓",
  },
  {
    title: "Total Earnings",
    value: "Rs. 85,000",
    detail: "Your business earnings",
    icon: "💰",
  },
  {
    title: "Customer Reviews",
    value: "18",
    detail: "Reviews received",
    icon: "⭐",
  },
];

const actions = [
  {
    title: "Manage Services",
    description: "Add, edit and manage your services.",
    icon: "🛠️",
    href: "/provider/services",
  },
  {
    title: "View Bookings",
    description: "Manage customer service requests.",
    icon: "📅",
    href: "/provider/bookings",
  },
  {
    title: "Availability",
    description: "Manage your working schedule.",
    icon: "🕒",
    href: "/provider/availability",
  },
  {
    title: "View Earnings",
    description: "Track your income and transactions.",
    icon: "💰",
    href: "/provider/earnings",
  },
];

const recentBookings = [
  {
    id: "#BK-2001",
    customer: "Kasun Perera",
    service: "Home Cleaning",
    date: "10 Nov 2026",
    amount: "Rs. 5,000",
    status: "Confirmed",
  },
  {
    id: "#BK-2002",
    customer: "Amali Fernando",
    service: "Plumbing",
    date: "12 Nov 2026",
    amount: "Rs. 7,500",
    status: "Pending",
  },
  {
    id: "#BK-2003",
    customer: "Nimal Silva",
    service: "Electrical Repair",
    date: "14 Nov 2026",
    amount: "Rs. 3,500",
    status: "Completed",
  },
];

function ProviderStatus({ status }) {
  const styles = {
    Completed: "bg-green-100 text-green-700",
    Confirmed: "bg-blue-100 text-blue-700",
    Pending: "bg-amber-100 text-amber-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[status] || "bg-slate-100 text-slate-600"}`}
    >
      {status}
    </span>
  );
}

export default function ProviderDashboardPage() {
  return (
    <div className="w-full space-y-8 p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-orange-600">
            SERVIQ / PROVIDER PORTAL
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
            Provider Dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage your services, bookings and business performance.
          </p>
        </div>

        <Link
          href="/provider/services"
          className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600"
        >
          + Manage Services
        </Link>
      </header>

      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 p-6 text-white shadow-lg sm:p-9">
        <div className="relative z-10 max-w-2xl">
          <p className="text-xs font-bold tracking-[0.2em] text-orange-300">
            YOUR BUSINESS OVERVIEW
          </p>
          <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
            Grow your business with ServiQ.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
            Manage customer requests, organize your schedule and monitor your
            earnings from one place.
          </p>
          <Link
            href="/provider/bookings"
            className="mt-6 inline-flex rounded-lg bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
          >
            View Bookings →
          </Link>
        </div>
        <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border-[35px] border-white/10" />
        <div className="pointer-events-none absolute -bottom-28 right-32 h-64 w-64 rounded-full bg-orange-400/10" />
      </section>

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-slate-500">
                {item.title}
              </p>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-xl">
                {item.icon}
              </span>
            </div>
            <strong className="mt-4 block text-2xl font-extrabold text-slate-900 sm:text-3xl">
              {item.value}
            </strong>
            <small className="mt-2 block text-xs text-slate-400">
              {item.detail}
            </small>
          </article>
        ))}
      </section>

      <section className="space-y-5">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">
            Quick Actions
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage your business activities quickly.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {actions.map((action) => (
            <Link
              href={action.href}
              key={action.title}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-2xl">
                {action.icon}
              </span>
              <h3 className="mt-4 font-bold text-slate-900 group-hover:text-orange-600">
                {action.title}
              </h3>
              <p className="mt-2 min-h-10 text-sm leading-5 text-slate-500">
                {action.description}
              </p>
              <span className="mt-4 inline-block text-sm font-bold text-orange-600">
                Open Section →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Recent Bookings
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Latest customer service requests.
            </p>
          </div>
          <Link
            href="/provider/bookings"
            className="text-sm font-bold text-orange-600 hover:text-orange-700"
          >
            View All →
          </Link>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[750px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                {[
                  "Booking ID",
                  "Customer",
                  "Service",
                  "Date",
                  "Amount",
                  "Status",
                ].map((heading) => (
                  <th key={heading} className="px-6 py-4 font-bold">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="transition hover:bg-slate-50">
                  <td className="whitespace-nowrap px-6 py-4 font-bold text-orange-600">
                    {booking.id}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 font-semibold text-slate-800">
                    {booking.customer}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                    {booking.service}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                    {booking.date}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 font-bold text-slate-800">
                    {booking.amount}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <ProviderStatus status={booking.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
