import Link from "next/link";

const stats = [
  {
    title: "My Bookings",
    value: "08",
    detail: "Total service requests",
    icon: "📋",
  },
  {
    title: "Upcoming Bookings",
    value: "03",
    detail: "Scheduled appointments",
    icon: "📅",
  },
  {
    title: "Completed Services",
    value: "05",
    detail: "Successfully completed",
    icon: "✓",
  },
];

const actions = [
  {
    title: "Find Services",
    description: "Discover trusted professionals near you.",
    icon: "🔍",
    href: "/services",
  },
  {
    title: "My Bookings",
    description: "Track and manage your appointments.",
    icon: "📅",
    href: "/customer/bookings",
  },
  {
    title: "Messages",
    description: "Communicate with service providers.",
    icon: "💬",
    href: "/customer/messages",
  },
  {
    title: "My Reviews",
    description: "Share your experience and feedback.",
    icon: "⭐",
    href: "/customer/reviews",
  },
];

const recentBookings = [
  {
    id: "#BK-1001",
    service: "Home Cleaning",
    provider: "Kasun Perera",
    date: "10 Nov 2026",
    amount: "Rs. 5,000",
    status: "Completed",
  },
  {
    id: "#BK-1005",
    service: "Electrical Repair",
    provider: "Nimal Silva",
    date: "05 Nov 2026",
    amount: "Rs. 3,500",
    status: "Upcoming",
  },
  {
    id: "#BK-1008",
    service: "Plumbing",
    provider: "Saman Fernando",
    date: "02 Nov 2026",
    amount: "Rs. 4,500",
    status: "Pending",
  },
];

function CustomerStatus({ status }) {
  const styles = {
    Completed: "bg-green-100 text-green-700",
    Upcoming: "bg-blue-100 text-blue-700",
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

export default function CustomerDashboardPage() {
  return (
    <div className="w-full space-y-8 p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-orange-600">
            SERVIQ / CUSTOMER PORTAL
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
            My Dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Welcome back! Manage your bookings and service activities.
          </p>
        </div>

        <Link
          href="/services"
          className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600"
        >
          + Find a Service
        </Link>
      </header>

      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 p-6 text-white shadow-lg sm:p-9">
        <div className="relative z-10 max-w-2xl">
          <p className="text-xs font-bold tracking-[0.2em] text-orange-100">
            YOUR SERVIQ ACCOUNT
          </p>
          <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
            Your services, all in one place.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-orange-50">
            Find trusted professionals, manage appointments and keep track of
            your service requests.
          </p>
          <Link
            href="/services"
            className="mt-6 inline-flex rounded-lg bg-white px-5 py-3 text-sm font-bold text-orange-600 transition hover:bg-orange-50"
          >
            Explore Services →
          </Link>
        </div>
        <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border-[35px] border-white/10" />
        <div className="pointer-events-none absolute -bottom-28 right-32 h-64 w-64 rounded-full bg-white/10" />
      </section>

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-500">
                {item.title}
              </p>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-xl">
                {item.icon}
              </span>
            </div>
            <strong className="mt-4 block text-3xl font-extrabold text-slate-900">
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
            Everything you need to manage your services.
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
              Your latest service appointments.
            </p>
          </div>
          <Link
            href="/customer/bookings"
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
                  "Service",
                  "Provider",
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
                    {booking.service}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                    {booking.provider}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                    {booking.date}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 font-bold text-slate-800">
                    {booking.amount}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <CustomerStatus status={booking.status} />
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
