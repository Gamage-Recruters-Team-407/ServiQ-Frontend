import Link from "next/link";
import CustomerIcon from "@/components/customer/CustomerIcon";

const stats = [
  { label: "Total bookings", value: "12", note: "+2 this month", icon: "calendar", tone: "orange" },
  { label: "Completed services", value: "9", note: "You’re doing great!", icon: "check", tone: "green" },
  { label: "Average rating", value: "4.9", note: "From 8 reviews", icon: "star", tone: "amber" },
];

const services = [
  { title: "Home cleaning", category: "Cleaning", icon: "✦", color: "bg-sky-50 text-sky-600", price: "From LKR 4,000" },
  { title: "Plumbing", category: "Repairs", icon: "⌁", color: "bg-blue-50 text-blue-600", price: "From LKR 2,000" },
  { title: "AC servicing", category: "Appliances", icon: "❄", color: "bg-violet-50 text-violet-600", price: "From LKR 3,500" },
];

function StatCard({ label, value, note, icon, tone }) {
  const tones = {
    orange: "bg-orange-50 text-brand",
    green: "bg-green-50 text-green-700",
    amber: "bg-amber-50 text-amber-700",
  };

  return (
    <article className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-extrabold tracking-tight text-ink">{value}</p>
        </div>
        <span className={`grid h-11 w-11 place-items-center rounded-xl ${tones[tone]}`}>
          <CustomerIcon name={icon} size={21} />
        </span>
      </div>
      <p className="mt-4 text-xs font-semibold text-slate-400">{note}</p>
    </article>
  );
}

export default function CustomerDashboardPage() {
  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold text-brand">Your service snapshot</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-[34px]">
            Good morning, Kamal <span aria-hidden="true">☀️</span>
          </h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Here&apos;s what&apos;s happening with your services today.
          </p>
        </div>
        <Link
          href="/services"
          className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-xl bg-brand px-5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-hover sm:self-auto"
        >
          <span className="text-lg leading-none">+</span> Book a service
        </Link>
      </section>

      <section aria-label="Booking overview" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.9fr)]">
        <article className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-6">
            <div>
              <h2 className="text-lg font-extrabold text-ink">Upcoming booking</h2>
              <p className="mt-1 text-sm text-slate-500">Your next service appointment</p>
            </div>
            <Link href="/customer/bookings" className="text-sm font-bold text-brand hover:text-brand-hover">
              View all
            </Link>
          </div>
          <div className="p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-orange-50 text-2xl">
                  ⚡
                </div>
                <div>
                  <h3 className="font-bold text-ink">Electrical wiring check</h3>
                  <p className="mt-1 text-sm text-slate-500">with Nimal Silva</p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <CustomerIcon name="calendar" size={15} /> Mon, Nov 30
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <CustomerIcon name="clock" size={15} /> 10:30 AM
                    </span>
                  </div>
                </div>
              </div>
              <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">
                Confirmed
              </span>
            </div>
            <div className="mt-5 flex flex-col justify-between gap-4 rounded-xl bg-slate-50 p-4 sm:flex-row sm:items-center">
              <div className="flex items-start gap-2 text-sm text-slate-500">
                <CustomerIcon name="pin" size={17} className="mt-0.5 shrink-0 text-brand" />
                <span>24 Flower Road, Colombo 07</span>
              </div>
              <Link
                href="/customer/bookings"
                className="inline-flex items-center gap-1 text-sm font-bold text-brand hover:text-brand-hover"
              >
                Booking details <CustomerIcon name="chevron" size={16} />
              </Link>
            </div>
          </div>
        </article>

        <article className="relative isolate overflow-hidden rounded-2xl bg-[#0F172A] p-6 text-white shadow-card sm:p-7">
          <div className="absolute -right-10 -top-14 -z-10 h-48 w-48 rounded-full bg-brand/25 blur-2xl" />
          <div className="absolute bottom-[-68px] right-20 -z-10 h-36 w-36 rounded-full bg-orange-400/20 blur-2xl" />
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-orange-200">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-soft" /> Your home, in good hands
          </span>
          <h2 className="mt-5 max-w-xs text-2xl font-extrabold leading-tight">
            Great service starts with the right professional.
          </h2>
          <p className="mt-3 max-w-xs text-sm leading-6 text-slate-300">
            Find trusted local experts, compare reviews, and book with confidence.
          </p>
          <Link
            href="/services"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-bold text-white transition hover:bg-brand-hover"
          >
            Explore services <CustomerIcon name="arrow" size={16} />
          </Link>
          <div aria-hidden="true" className="absolute -bottom-3 right-2 text-[96px] opacity-10">
            ✦
          </div>
        </article>
      </section>

      <section className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-extrabold text-ink">Popular services</h2>
            <p className="mt-1 text-sm text-slate-500">A few ways we can help around the home</p>
          </div>
          <Link href="/services" className="shrink-0 text-sm font-bold text-brand hover:text-brand-hover">
            Browse all
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.title}
              href="/services"
              className="group flex items-center gap-4 rounded-xl border border-slate-100 p-4 transition hover:border-orange-200 hover:bg-orange-50/40"
            >
              <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl text-2xl font-semibold ${service.color}`}>
                {service.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-medium text-slate-400">{service.category}</span>
                <span className="mt-0.5 block font-bold text-ink">{service.title}</span>
                <span className="mt-1 block text-xs text-slate-500">{service.price}</span>
              </span>
              <CustomerIcon name="chevron" size={17} className="shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-brand" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
