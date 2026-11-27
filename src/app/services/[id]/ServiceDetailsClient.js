
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { demoServiceLinks } from "./_data/demoServices";

function Icon({ name, className = "h-5 w-5" }) {
  const icons = {
    check: <path d="M5 12l4 4L19 6" />,
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    chevron: <path d="m6 9 6 6 6-6" />,
    location: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    star: (
      <path d="m12 2 3.1 6.3 7 .9-5 4.9 1.2 7-6.3-3.3-6.3 3.3 1.2-7-5-4.9 7-.9L12 2Z" />
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20v-2a6 6 0 0 1 12 0v2M17 5a3 3 0 0 1 0 6m1 4a5 5 0 0 1 3 5" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v6m0-10h.01" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v4m10-4v4M3 10h18" />
      </>
    ),
    receipt: (
      <>
        <path d="M5 3h14v18l-3-2-4 2-4-2-3 2V3Z" />
        <path d="M9 8h6M9 12h6" />
      </>
    ),
    sparkles: (
      <>
        <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
        <path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {icons[name] || icons.info}
    </svg>
  );
}

function formatPrice(amount) {
  return `LKR ${Number(amount).toLocaleString("en-LK")}`;
}

function SectionLabel({ children }) {
  return (
    <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#EA580C]">
      {children}
    </p>
  );
}

function SiteHeader() {
  return (
    <header className="border-b border-[#E2E8F0] bg-white">
      <div className="mx-auto! flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5! py-4! lg:px-8!">
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-tight text-[#0F172A]!"
        >
          servi<span className="text-[#F97316]">Q</span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="flex flex-wrap items-center gap-5 text-sm font-semibold sm:gap-8"
        >
          <Link
            href="/"
            className="text-[#64748B]! hover:text-[#EA580C]!"
          >
            Home
          </Link>

          <Link
            href="/services"
            className="text-[#EA580C]!"
          >
            Services
          </Link>

          <Link
            href="/services/compare"
            className="text-[#64748B]! hover:text-[#EA580C]!"
          >
            Compare
          </Link>
        </nav>

        <Link
          href="/login"
          className="rounded-xl border border-[#E2E8F0] bg-white px-4! py-2! text-sm font-bold text-[#0F172A]! hover:border-[#FDBA74] hover:bg-[#FFF7ED]"
        >
          Log in
        </Link>
      </div>
    </header>
  );
}

function ProviderCard({
  provider,
  selected,
  expanded,
  onSelect,
  onExpand,
}) {
  return (
    <article
      className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition ${
        selected
          ? "border-[#F97316] shadow-lg shadow-orange-100"
          : "border-[#E2E8F0] hover:border-[#FDBA74] hover:shadow-md"
      }`}
    >
      <div className="p-5! sm:p-6!">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#FFEDD5] text-lg font-extrabold text-[#EA580C]">
            {provider.initials}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-extrabold text-[#0F172A]">
                {provider.name}
              </h3>

              {provider.verified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5! py-1! text-[11px] font-semibold text-[#15803D]">
                  <Icon
                    name="shield"
                    className="h-3.5 w-3.5"
                  />
                  Demo verified
                </span>
              )}
            </div>

            <p className="mt-1! text-xs text-[#64748B]">
              {provider.profession}
            </p>

            <div className="mt-4! flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#475569]">
              <span className="inline-flex items-center gap-1">
                <Icon
                  name="location"
                  className="h-4 w-4 text-[#F97316]"
                />
                {provider.location}
              </span>

              <span className="inline-flex items-center gap-1">
                <Icon
                  name="star"
                  className="h-4 w-4 fill-amber-400 text-amber-400"
                />
                <strong>
                  {provider.rating.toFixed(1)}
                </strong>
                ({provider.reviewCount} demo reviews)
              </span>

              <span className="inline-flex items-center gap-1">
                <Icon
                  name="clock"
                  className="h-4 w-4 text-[#64748B]"
                />
                {provider.experience} years experience
              </span>
            </div>

            <p className="mt-4! text-sm leading-7 text-[#64748B]">
              {provider.bio}
            </p>

            <div className="mt-4! flex flex-wrap gap-2">
              {provider.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg border border-[#E2E8F0] bg-slate-50 px-3! py-1.5! text-xs font-medium text-[#475569]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onExpand}
          aria-expanded={expanded}
          className="mt-5! flex items-center gap-2 text-xs font-bold text-[#EA580C]! hover:underline!"
        >
          {expanded
            ? "Hide provider details"
            : "View more provider details"}

          <Icon
            name="chevron"
            className={`h-4 w-4 transition ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>

        {expanded && (
          <div className="mt-4! grid gap-4 rounded-xl bg-[#FFF7ED] p-4! text-sm sm:grid-cols-2">
            <div>
              <p className="text-xs font-bold text-[#0F172A]">
                Response time
              </p>

              <p className="mt-1! text-xs text-[#64748B]">
                {provider.responseTime}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold text-[#0F172A]">
                Service experience
              </p>

              <p className="mt-1! text-xs text-[#64748B]">
                {provider.experience} years of
                professional experience (demo)
              </p>
            </div>

            <div>
              <p className="text-xs font-bold text-[#0F172A]">
                Starting price
              </p>

              <p className="mt-1! text-xs text-[#64748B]">
                {formatPrice(provider.price)}
                {" "}per {provider.priceUnit}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold text-[#0F172A]">
                Availability
              </p>

              <p className="mt-1! text-xs text-[#64748B]">
                {provider.available
                  ? "Accepting demo selections"
                  : "Currently unavailable"}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between gap-4 border-t border-[#E2E8F0] bg-[#FFFCF9] px-5! py-4! sm:flex-row sm:items-end sm:px-6!">
        <div>
          <p className="text-xs text-[#64748B]">
            Starting from
          </p>

          <p className="mt-1! text-2xl font-extrabold text-[#EA580C]">
            {formatPrice(provider.price)}
          </p>

          <p className="text-xs text-[#64748B]">
            per {provider.priceUnit} · sample rate
          </p>
        </div>

        <div className="flex flex-col items-start gap-2 sm:items-end">
          <span
            className={`inline-flex items-center gap-2 text-xs font-semibold ${
              provider.available
                ? "text-[#15803D]"
                : "text-[#B45309]"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                provider.available
                  ? "bg-[#15803D]"
                  : "bg-[#B45309]"
              }`}
            />

            {provider.available
              ? "Available (demo)"
              : "Unavailable (demo)"}
          </span>

          <button
            type="button"
            disabled={!provider.available}
            aria-pressed={selected}
            onClick={onSelect}
            className={`rounded-xl px-5! py-3! text-sm font-bold transition ${
              !provider.available
                ? "cursor-not-allowed! bg-slate-200! text-slate-500"
                : selected
                ? "bg-[#15803D]! text-white hover:bg-[#166534]!"
                : "bg-[#F97316]! text-white hover:bg-[#EA580C]!"
            }`}
          >
            {!provider.available
              ? "Unavailable"
              : selected
              ? "✓ Selected provider"
              : "Select provider →"}
          </button>
        </div>
      </div>
    </article>
  );
}

function PricingSummary({
  service,
  selectedProvider,
  lowestPrice,
  onClear,
}) {
  return (
    <aside
      aria-label="Service pricing summary"
      className="space-y-5 xl:sticky xl:top-6"
    >
      <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6! shadow-sm">
        <SectionLabel>
          Service summary
        </SectionLabel>

        <h2 className="mt-2! text-xl font-extrabold text-[#0F172A]">
          Pricing overview
        </h2>

        <div className="mt-5! border-b border-[#E2E8F0] pb-5!">
          <p className="text-xs text-[#64748B]">
            Starting prices from
          </p>

          <p className="mt-1! text-3xl font-extrabold text-[#EA580C]">
            {formatPrice(lowestPrice)}
          </p>

          <p className="mt-1! text-xs text-[#64748B]">
            Demo starting rate · not a final quote
          </p>
        </div>

        <dl className="mt-5! space-y-4 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="text-[#64748B]">
              Service category
            </dt>
            <dd className="text-right font-bold text-[#0F172A]">
              {service.category}
            </dd>
          </div>

          <div className="flex justify-between gap-3">
            <dt className="text-[#64748B]">
              Providers listed
            </dt>
            <dd className="font-bold text-[#0F172A]">
              {service.providers.length}
            </dd>
          </div>

          <div className="flex justify-between gap-3">
            <dt className="text-[#64748B]">
              Estimated duration
            </dt>
            <dd className="max-w-40 text-right font-medium text-[#0F172A]">
              {service.duration}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-2xl border border-[#FDBA74] bg-[#FFF7ED] p-6!">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFEDD5] text-[#EA580C]">
            <Icon name="check" className="h-5 w-5" />
          </div>

          <h3 className="text-base font-extrabold text-[#0F172A]">
            Your selected provider
          </h3>
        </div>

        {selectedProvider ? (
          <div aria-live="polite" className="mt-5!">
            <p className="text-xs text-[#64748B]">
              Selected business
            </p>

            <p className="mt-1! text-lg font-extrabold text-[#0F172A]">
              {selectedProvider.name}
            </p>

            <div className="mt-4! flex justify-between gap-3 border-t border-[#FDBA74] pt-4! text-sm">
              <span className="text-[#64748B]">
                Starting price
              </span>

              <strong className="text-[#EA580C]">
                {formatPrice(selectedProvider.price)}
              </strong>
            </div>

            <p className="mt-2! text-xs leading-6 text-[#64748B]">
              Per {selectedProvider.priceUnit}.
              Final charges may differ from this
              sample amount.
            </p>

            <button
              type="button"
              onClick={onClear}
              className="mt-4! text-xs font-bold text-[#EA580C]! hover:underline!"
            >
              Clear selection
            </button>
          </div>
        ) : (
          <p
            aria-live="polite"
            className="mt-4! text-sm leading-7 text-[#64748B]"
          >
            No provider selected yet. Choose an
            available provider to view their price here.
          </p>
        )}

        <button
          type="button"
          disabled
          className="mt-5! w-full cursor-not-allowed! rounded-xl bg-slate-200! px-4! py-3! text-sm font-bold text-slate-500"
        >
          Booking unavailable in demo
        </button>

        <p className="mt-3! text-center text-xs leading-5 text-[#64748B]">
          This demo does not create bookings
          or process payments.
        </p>
      </section>

      <section className="flex gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-5!">
        <Icon
          name="shield"
          className="h-6 w-6 shrink-0 text-[#15803D]"
        />

        <div>
          <h3 className="text-sm font-extrabold text-[#0F172A]">
            Transparent service pricing
          </h3>

          <p className="mt-2! text-xs leading-6 text-[#64748B]">
            Sample starting rates exclude additional
            work and materials unless stated.
            Real quotations require provider confirmation.
          </p>
        </div>
      </section>
    </aside>
  );
}

export default function ServiceDetailsClient({ service }) {
  const [sortBy, setSortBy] = useState("recommended");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const providers = useMemo(() => {
    const items = service.providers.filter(
      (provider) => !availableOnly || provider.available
    );

    return [...items].sort((a, b) => {
      if (sortBy === "price") {
        return a.price - b.price;
      }

      if (sortBy === "rating") {
        return b.rating - a.rating;
      }

      if (sortBy === "experience") {
        return b.experience - a.experience;
      }

      return (
        Number(b.available) - Number(a.available) ||
        b.rating - a.rating
      );
    });
  }, [service, availableOnly, sortBy]);

  const selectedProvider =
    service.providers.find(
      (provider) =>
        provider.id === selectedId && provider.available
    ) || null;

  const lowestPrice = Math.min(
    ...service.providers.map((provider) => provider.price)
  );

  return (
    <div className="min-h-screen bg-white text-[#0F172A]">
      <SiteHeader />

      <div className="mx-auto! max-w-7xl px-4! pb-20! sm:px-6! lg:px-8!">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 py-6! text-xs text-[#64748B]"
        >
          <Link
            href="/"
            className="text-[#64748B]! hover:text-[#EA580C]!"
          >
            Home
          </Link>

          <span>/</span>

          <Link
            href="/services"
            className="text-[#64748B]! hover:text-[#EA580C]!"
          >
            Services
          </Link>

          <span>/</span>

          <span className="font-semibold text-[#0F172A]">
            {service.title}
          </span>
        </nav>

        {/* Demo Warning */}
        <div
          role="note"
          className="flex items-start gap-3 rounded-xl border border-[#FDBA74] bg-[#FFF7ED] p-4! text-xs leading-6 text-[#9A3412]"
        >
          <Icon
            name="info"
            className="mt-0.5! h-5 w-5 shrink-0"
          />

          <p>
            <strong>Frontend demo:</strong> Provider names,
            ratings, prices, verification information and
            availability shown on this page are fictional.
            No booking or payment is processed.
          </p>
        </div>

        {/* Hero Section */}
        <section className="mt-6! overflow-hidden rounded-3xl border border-[#FFEDD5] bg-[#FFF7ED]">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
            <div className="p-7! sm:p-10! lg:p-12!">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#FDBA74] bg-white px-4! py-2! text-xs font-bold text-[#EA580C]">
                <span className="text-lg">
                  {service.emoji}
                </span>

                {service.category}
              </span>

              <h1 className="mt-6! max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
                {service.title}
              </h1>

              <p className="mt-4! max-w-xl text-sm leading-7 text-[#64748B] sm:text-base">
                {service.tagline}
              </p>

              <div className="mt-6! flex flex-wrap gap-x-5 gap-y-3 text-xs font-semibold text-[#475569]">
                <span className="flex items-center gap-2">
                  <Icon
                    name="check"
                    className="h-4 w-4 text-[#15803D]"
                  />
                  Compare local providers
                </span>

                <span className="flex items-center gap-2">
                  <Icon
                    name="check"
                    className="h-4 w-4 text-[#15803D]"
                  />
                  See starting prices
                </span>

                <span className="flex items-center gap-2">
                  <Icon
                    name="check"
                    className="h-4 w-4 text-[#15803D]"
                  />
                  Review experience
                </span>
              </div>

              <a
                href="#providers"
                className="mt-8! inline-flex items-center gap-3 rounded-xl bg-[#F97316] px-6! py-3! text-sm font-bold text-white! transition hover:bg-[#EA580C]"
              >
                Explore providers
                <Icon name="arrow" className="h-4 w-4" />
              </a>
            </div>

            {/* Decorative hero graphic */}
            <div className="flex min-h-60 items-center justify-center bg-[#FFEDD5] p-8!">
              <div className="flex h-56 w-56 items-center justify-center rounded-full border border-[#FDBA74] bg-[#FFF7ED] sm:h-64 sm:w-64">
                <div className="flex h-36 w-36 items-center justify-center rounded-3xl bg-white text-7xl shadow-xl shadow-orange-200">
                  {service.emoji}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Quick Facts */}
        <section
          aria-label="Service quick facts"
          className="mt-6! grid gap-4 sm:grid-cols-3"
        >
          <div className="flex items-center gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-5!">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF7ED] text-[#EA580C]">
              <Icon name="users" className="h-6 w-6" />
            </span>

            <div>
              <p className="text-sm font-extrabold">
                {service.providers.length} providers
              </p>

              <p className="text-xs text-[#64748B]">
                Demo provider profiles
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-5!">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF7ED] text-[#EA580C]">
              <Icon name="receipt" className="h-6 w-6" />
            </span>

            <div>
              <p className="text-sm font-extrabold">
                From {formatPrice(lowestPrice)}
              </p>

              <p className="text-xs text-[#64748B]">
                Example starting price
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-5!">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF7ED] text-[#EA580C]">
              <Icon name="calendar" className="h-6 w-6" />
            </span>

            <div>
              <p className="text-sm font-extrabold">
                Flexible scheduling
              </p>

              <p className="text-xs text-[#64748B]">
                Subject to provider availability
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="mt-10! grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="min-w-0 space-y-9">
            {/* About Service */}
            <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6! sm:p-8!">
              <SectionLabel>
                Service overview
              </SectionLabel>

              <h2 className="mt-2! text-2xl font-extrabold">
                About this service
              </h2>

              <p className="mt-4! text-sm leading-8 text-[#64748B]">
                {service.description}
              </p>

              <div className="mt-5! inline-flex items-center gap-2 rounded-xl bg-[#FFF7ED] px-4! py-3! text-xs font-semibold text-[#9A3412]">
                <Icon name="clock" className="h-4 w-4" />
                Estimated duration: {service.duration}
              </div>

              <div className="mt-8! grid gap-8 border-t border-[#E2E8F0] pt-7! md:grid-cols-2">
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-extrabold">
                    <Icon
                      name="check"
                      className="h-5 w-5 text-[#15803D]"
                    />
                    What's included
                  </h3>

                  <ul className="mt-4! space-y-3">
                    {service.included.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-6 text-[#475569]"
                      >
                        <Icon
                          name="check"
                          className="mt-1! h-4 w-4 shrink-0 text-[#15803D]"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 text-sm font-extrabold">
                    <Icon
                      name="info"
                      className="h-5 w-5 text-[#B45309]"
                    />
                    Additional charges
                  </h3>

                  <ul className="mt-4! space-y-3">
                    {service.excluded.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-6 text-[#475569]"
                      >
                        <span className="mt-2! h-2 w-2 shrink-0 rounded-full bg-[#B45309]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Provider Listings */}
            <section id="providers" className="scroll-mt-6">
              <div className="flex flex-wrap items-end justify-between gap-5">
                <div>
                  <SectionLabel>
                    Choose your professional
                  </SectionLabel>

                  <h2 className="mt-2! text-2xl font-extrabold">
                    Service providers
                    <span className="ml-2! inline-block rounded-lg bg-[#FFF7ED] px-3! py-1! text-base text-[#EA580C]">
                      {providers.length}
                    </span>
                  </h2>

                  <p className="mt-2! text-sm text-[#64748B]">
                    Compare available demo provider profiles.
                  </p>
                </div>

                {/* Sorting */}
                <label className="flex items-center gap-3 text-xs font-semibold text-[#64748B]">
                  Sort by

                  <select
                    value={sortBy}
                    onChange={(event) =>
                      setSortBy(event.target.value)
                    }
                    className="rounded-xl border border-[#E2E8F0] bg-white px-4! py-3! text-xs font-semibold text-[#0F172A]! outline-none focus:border-[#F97316]"
                  >
                    <option value="recommended">
                      Recommended
                    </option>

                    <option value="price">
                      Lowest price
                    </option>

                    <option value="rating">
                      Highest rating
                    </option>

                    <option value="experience">
                      Most experienced
                    </option>
                  </select>
                </label>
              </div>

              {/* Availability Filter */}
              <label className="mt-5! inline-flex cursor-pointer items-center gap-3 text-sm text-[#475569]">
                <input
                  type="checkbox"
                  checked={availableOnly}
                  onChange={(event) =>
                    setAvailableOnly(event.target.checked)
                  }
                  className="h-4 w-4 accent-[#F97316]"
                />

                Show available providers only
              </label>

              {/* Provider Cards */}
              <div className="mt-5! space-y-5">
                {providers.length > 0 ? (
                  providers.map((provider) => (
                    <ProviderCard
                      key={provider.id}
                      provider={provider}
                      selected={
                        selectedProvider?.id === provider.id
                      }
                      expanded={expandedId === provider.id}
                      onSelect={() =>
                        setSelectedId(provider.id)
                      }
                      onExpand={() =>
                        setExpandedId((previous) =>
                          previous === provider.id
                            ? null
                            : provider.id
                        )
                      }
                    />
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-[#FDBA74] bg-[#FFF7ED] p-7!">
                    <h3 className="text-base font-bold text-[#9A3412]">
                      No providers found
                    </h3>

                    <p className="mt-2! text-sm text-[#64748B]">
                      No providers match the selected filter.
                    </p>

                    <button
                      type="button"
                      onClick={() => setAvailableOnly(false)}
                      className="mt-4! rounded-lg bg-[#F97316]! px-4! py-2! text-sm font-bold text-white hover:bg-[#EA580C]!"
                    >
                      Show all providers
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* Pricing Comparison */}
            <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6! sm:p-8!">
              <SectionLabel>
                Compare your options
              </SectionLabel>

              <h2 className="mt-2! text-2xl font-extrabold">
                Provider pricing comparison
              </h2>

              <p className="mt-3! text-sm leading-7 text-[#64748B]">
                Compare the example starting rates of the
                providers offering this service.
              </p>

              <div className="mt-6! overflow-x-auto rounded-xl border border-[#E2E8F0]">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <caption className="sr-only">
                    Demo service provider price comparison
                  </caption>

                  <thead className="bg-[#FFF7ED] text-xs text-[#9A3412]">
                    <tr>
                      <th scope="col" className="px-4! py-4! font-extrabold">
                        Provider
                      </th>
                      <th scope="col" className="px-4! py-4! font-extrabold">
                        Starting price
                      </th>
                      <th scope="col" className="px-4! py-4! font-extrabold">
                        Rating
                      </th>
                      <th scope="col" className="px-4! py-4! font-extrabold">
                        Availability
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {service.providers.map((provider) => (
                      <tr
                        key={provider.id}
                        className="border-t border-[#E2E8F0]"
                      >
                        <td className="px-4! py-4! font-bold text-[#0F172A]">
                          {provider.name}
                        </td>

                        <td className="px-4! py-4!">
                          <strong className="text-[#EA580C]">
                            {formatPrice(provider.price)}
                          </strong>

                          <span className="block text-[11px] text-[#64748B]">
                            per {provider.priceUnit}
                          </span>
                        </td>

                        <td className="px-4! py-4! text-[#475569]">
                          ★ {provider.rating.toFixed(1)}
                        </td>

                        <td className="px-4! py-4!">
                          <span
                            className={`text-xs font-semibold ${
                              provider.available
                                ? "text-[#15803D]"
                                : "text-[#B45309]"
                            }`}
                          >
                            {provider.available
                              ? "Available (demo)"
                              : "Unavailable"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-5! flex items-start gap-3 rounded-xl bg-[#FFF7ED] p-4!">
                <Icon
                  name="info"
                  className="h-5 w-5 shrink-0 text-[#B45309]"
                />

                <p className="text-xs leading-6 text-[#9A3412]">
                  Prices are fictional starting estimates
                  for this demonstration. Travel charges,
                  materials, taxes and additional work may
                  change a real quotation.
                </p>
              </div>
            </section>

            {/* FAQ */}
            <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6! sm:p-8!">
              <SectionLabel>
                Helpful information
              </SectionLabel>

              <h2 className="mt-2! text-2xl font-extrabold">
                Frequently asked questions
              </h2>

              <div className="mt-5! divide-y divide-[#E2E8F0]">
                {service.faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="group py-5!"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold text-[#0F172A] [&::-webkit-details-marker]:hidden">
                      {faq.question}

                      <Icon
                        name="chevron"
                        className="h-4 w-4 shrink-0 text-[#EA580C] transition group-open:rotate-180"
                      />
                    </summary>

                    <p className="mt-3! text-sm leading-7 text-[#64748B]">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <PricingSummary
            service={service}
            lowestPrice={lowestPrice}
            selectedProvider={selectedProvider}
            onClear={() => setSelectedId(null)}
          />
        </div>

        {/* Other Demo Services */}
        <section className="mt-12! rounded-2xl border border-[#FDBA74] bg-[#FFF7ED] p-6! sm:p-8!">
          <SectionLabel>
            Explore more
          </SectionLabel>

          <h2 className="mt-2! text-xl font-extrabold">
            Other demo services
          </h2>

          <p className="mt-2! text-sm text-[#64748B]">
            Open another service to see its providers
            and pricing information.
          </p>

          <div className="mt-5! flex flex-wrap gap-3">
            {demoServiceLinks.map((item) => (
              <Link
                key={item.id}
                href={`/services/${item.id}`}
                aria-current={
                  item.id === service.id ? "page" : undefined
                }
                className={`rounded-xl border px-4! py-3! text-xs font-bold transition ${
                  item.id === service.id
                    ? "border-[#F97316] bg-[#F97316] text-white!"
                    : "border-[#FDBA74] bg-white text-[#EA580C]! hover:bg-[#FFEDD5]"
                }`}
              >
                {item.emoji} {item.title}
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#E2E8F0] bg-white">
        <div className="mx-auto! flex max-w-7xl flex-col justify-between gap-2 px-5! py-7! text-xs text-[#64748B] sm:flex-row lg:px-8!">
          <p>
            © 2026 ServiQ · Local Services Marketplace
          </p>

          <p>
            Service Details Page · Demo data only
          </p>
        </div>
      </footer>
    </div>
  );
}
