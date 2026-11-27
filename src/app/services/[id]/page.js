
"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Fictional data: for this frontend demo only.
const services = [
  {
    id: "electrical-repairs",
    name: "Electrical Repairs",
    category: "Home Maintenance",
    icon: "⚡",
    tagline: "Safe, dependable help for home electrical problems.",
    duration: "1–3 hours",
    description:
      "Compare professionals for faulty switches, sockets, lighting and basic safety assessments. The actual job and final quotation must be confirmed by the provider.",
    included: [
      "Initial fault inspection",
      "Switch and socket checks",
      "Lighting inspection",
      "Basic safety advice",
    ],
    excluded: [
      "Replacement parts",
      "Major rewiring",
      "Additional labour and travel",
    ],
    providers: [
      {
        id: "e1",
        name: "BrightSpark Electricals",
        city: "Kandy",
        years: 8,
        rating: 4.9,
        reviews: 128,
        price: 2500,
        unit: "inspection visit",
        verified: true,
        available: true,
        skills: "Fault finding, lighting, sockets",
      },
      {
        id: "e2",
        name: "VoltCare Solutions",
        city: "Peradeniya",
        years: 6,
        rating: 4.8,
        reviews: 96,
        price: 3000,
        unit: "inspection visit",
        verified: true,
        available: true,
        skills: "Diagnostics and safety checks",
      },
      {
        id: "e3",
        name: "HomeFix Electrical",
        city: "Katugastota",
        years: 4,
        rating: 4.7,
        reviews: 62,
        price: 2000,
        unit: "inspection visit",
        verified: false,
        available: false,
        skills: "Minor repairs and inspections",
      },
    ],
  },
  {
    id: "plumbing",
    name: "Plumbing Services",
    category: "Home Maintenance",
    icon: "🚰",
    tagline: "Repairs for leaking pipes, taps and blocked drains.",
    duration: "1–3 hours",
    description:
      "Compare plumbing professionals for everyday water supply and drainage problems. Materials and extensive repair work are priced separately.",
    included: [
      "Basic pipe assessment",
      "Tap inspection",
      "Drainage checks",
      "Repair recommendations",
    ],
    excluded: [
      "New pipes and fittings",
      "Major renovations",
      "Extra labour",
    ],
    providers: [
      {
        id: "p1",
        name: "AquaFix Plumbing",
        city: "Kandy",
        years: 9,
        rating: 4.9,
        reviews: 104,
        price: 2300,
        unit: "inspection visit",
        verified: true,
        available: true,
        skills: "Leak repairs, taps, bathrooms",
      },
      {
        id: "p2",
        name: "PipeCare Lanka",
        city: "Gampola",
        years: 5,
        rating: 4.7,
        reviews: 74,
        price: 2000,
        unit: "inspection visit",
        verified: true,
        available: true,
        skills: "Drainage and general plumbing",
      },
    ],
  },
  {
    id: "air-conditioning",
    name: "AC Servicing",
    category: "Appliance Services",
    icon: "❄️",
    tagline: "Inspection and maintenance for home air conditioners.",
    duration: "1–3 hours per unit",
    description:
      "Browse technicians for AC inspections, airflow and drainage checks. Servicing, chemical washing and repairs can be priced differently.",
    included: [
      "Initial AC inspection",
      "Filter check",
      "Airflow and drainage check",
      "Maintenance advice",
    ],
    excluded: [
      "Refrigerant",
      "Replacement components",
      "Specialist chemical cleaning",
    ],
    providers: [
      {
        id: "a1",
        name: "CoolAir Technicians",
        city: "Kandy",
        years: 7,
        rating: 4.8,
        reviews: 115,
        price: 3500,
        unit: "AC inspection",
        verified: true,
        available: true,
        skills: "Split AC diagnostics and maintenance",
      },
      {
        id: "a2",
        name: "ClimateCare Services",
        city: "Colombo",
        years: 10,
        rating: 4.9,
        reviews: 139,
        price: 4200,
        unit: "AC inspection",
        verified: true,
        available: false,
        skills: "Residential HVAC maintenance",
      },
    ],
  },
  {
    id: "home-cleaning",
    name: "Home Cleaning",
    category: "Cleaning",
    icon: "🧹",
    tagline: "General and deep cleaning for homes and apartments.",
    duration: "3–6 hours",
    description:
      "Explore cleaning teams and compare example starter packages. Real rates vary with property size and the agreed scope.",
    included: [
      "Room surface cleaning",
      "Kitchen cleaning",
      "Bathroom cleaning",
      "Floor cleaning",
    ],
    excluded: [
      "Pest control",
      "Specialist upholstery",
      "Extra rooms",
    ],
    providers: [
      {
        id: "c1",
        name: "FreshNest Cleaning",
        city: "Kandy",
        years: 6,
        rating: 4.8,
        reviews: 87,
        price: 4500,
        unit: "basic package",
        verified: true,
        available: true,
        skills: "Kitchen, bathrooms, general cleaning",
      },
      {
        id: "c2",
        name: "SparkleHome Lanka",
        city: "Colombo",
        years: 4,
        rating: 4.6,
        reviews: 59,
        price: 4000,
        unit: "basic package",
        verified: false,
        available: true,
        skills: "Apartments and residential cleaning",
      },
    ],
  },
  {
    id: "appliance-repair",
    name: "Appliance Repair",
    category: "Appliance Services",
    icon: "🔧",
    tagline: "Help with washing machines, fridges and other appliances.",
    duration: "1–2 hours for diagnosis",
    description:
      "Choose from sample repair specialists for fault diagnosis and advice. Replacement components and complex repairs require a separate quotation.",
    included: [
      "Initial diagnosis",
      "Connection checks",
      "Fault assessment",
      "Repair advice",
    ],
    excluded: [
      "Replacement parts",
      "Complex component repairs",
      "Transport costs",
    ],
    providers: [
      {
        id: "r1",
        name: "FixPoint Appliances",
        city: "Kandy",
        years: 7,
        rating: 4.9,
        reviews: 91,
        price: 2800,
        unit: "diagnostic visit",
        verified: true,
        available: true,
        skills: "Fridges and washing machines",
      },
      {
        id: "r2",
        name: "SmartRepair Hub",
        city: "Matale",
        years: 5,
        rating: 4.6,
        reviews: 43,
        price: 2200,
        unit: "diagnostic visit",
        verified: false,
        available: true,
        skills: "Home appliance troubleshooting",
      },
    ],
  },
  {
    id: "carpentry",
    name: "Carpentry & Woodwork",
    category: "Carpentry",
    icon: "🔨",
    tagline: "Furniture, cabinets, doors and home woodwork.",
    duration: "Varies by repair",
    description:
      "Compare carpenters for household woodwork and furniture adjustments. Timber, fittings and new construction are quoted separately.",
    included: [
      "Initial assessment",
      "Basic measurements",
      "Woodwork inspection",
      "Repair recommendations",
    ],
    excluded: [
      "Timber and fittings",
      "Custom furniture",
      "Major installations",
    ],
    providers: [
      {
        id: "w1",
        name: "TimberCraft Works",
        city: "Kandy",
        years: 12,
        rating: 4.9,
        reviews: 92,
        price: 3000,
        unit: "assessment visit",
        verified: true,
        available: true,
        skills: "Cabinets, doors, furniture",
      },
      {
        id: "w2",
        name: "WoodCare Professionals",
        city: "Matale",
        years: 7,
        rating: 4.7,
        reviews: 68,
        price: 2600,
        unit: "assessment visit",
        verified: true,
        available: true,
        skills: "Furniture restoration and fittings",
      },
    ],
  },
];

const categories = [
  "All",
  "Home Maintenance",
  "Appliance Services",
  "Cleaning",
  "Carpentry",
];

const money = (value) =>
  `LKR ${value.toLocaleString("en-LK")}`;

const availableMin = (service) => {
  const values = service.providers
    .filter((p) => p.available)
    .map((p) => p.price);

  return values.length ? Math.min(...values) : null;
};

function SearchIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m16 16 5 5" />
    </svg>
  );
}

export default function ServiceDetailsPage() {
  const params = useParams();

  const routeId =
    typeof params?.id === "string" ? params.id : "demo";

  const startingId = services.some((s) => s.id === routeId)
    ? routeId
    : services[0].id;

  const [activeId, setActiveId] = useState(startingId);
  const [serviceSearch, setServiceSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [providerSearch, setProviderSearch] = useState("");
  const [sort, setSort] = useState("recommended");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const detailRef = useRef(null);

  const active =
    services.find((s) => s.id === activeId) || services[0];

  const chosen =
    active.providers.find(
      (p) => p.id === selectedId && p.available
    ) || null;

  const minPrice = availableMin(active);

  const filteredServices = useMemo(
    () =>
      services.filter(
        (s) =>
          (category === "All" || s.category === category) &&
          `${s.name} ${s.category} ${s.tagline} ${s.description}`
            .toLowerCase()
            .includes(serviceSearch.trim().toLowerCase())
      ),
    [serviceSearch, category]
  );

  const filteredProviders = useMemo(
    () =>
      [...active.providers]
        .filter(
          (p) =>
            (!availableOnly || p.available) &&
            `${p.name} ${p.city} ${p.skills}`
              .toLowerCase()
              .includes(providerSearch.trim().toLowerCase())
        )
        .sort((a, b) =>
          sort === "price"
            ? a.price - b.price
            : sort === "rating"
            ? b.rating - a.rating
            : sort === "experience"
            ? b.years - a.years
            : Number(b.available) - Number(a.available) ||
              b.rating - a.rating
        ),
    [active, availableOnly, providerSearch, sort]
  );

  function selectService(id) {
    setActiveId(id);
    setSelectedId(null);
    setProviderSearch("");
    setAvailableOnly(false);
    setSort("recommended");

    // On mobile, scroll to the selected service details.
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 1023px)").matches
    ) {
      requestAnimationFrame(() =>
        detailRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      );
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      {/* HEADER */}
      <header className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto! flex max-w-7xl items-center justify-between gap-4 px-5! py-4! sm:px-8!">
          <Link
            href="/"
            className="text-2xl font-black tracking-tight text-[#0F172A]!"
          >
            servi<span className="text-[#F97316]">Q</span>
          </Link>

          <div className="flex items-center gap-3 text-xs font-semibold sm:gap-5 sm:text-sm">
            <Link
              href="/"
              className="text-[#64748B]! hover:text-[#EA580C]!"
            >
              Home
            </Link>

            <span className="text-[#EA580C]">
              Service details
            </span>

            <span className="rounded-full border border-[#FDBA74] bg-[#FFF7ED] px-3! py-1! text-[11px] font-bold text-[#9A3412]">
              DEMO
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto! max-w-7xl px-5! pb-12! pt-7! sm:px-8!">
        {/* PAGE TITLE */}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#EA580C]">
              SERVIQ / SERVICE EXPLORER
            </p>

            <h1 className="mt-1! text-3xl font-extrabold tracking-tight sm:text-4xl">
              Find a service. Compare providers.
            </h1>

            <p className="mt-2! max-w-2xl text-sm leading-6 text-[#64748B]">
              Choose a service on the left to instantly see
              its details and provider prices on the right.
            </p>
          </div>

          <span className="rounded-lg bg-[#FFF7ED] px-3! py-2! text-xs font-semibold text-[#9A3412]">
            Fictional providers and prices · No real bookings
          </span>
        </div>

        <div className="mt-6! grid items-start gap-6 lg:grid-cols-[310px_minmax(0,1fr)]">
          {/* LEFT SIDEBAR: SERVICE BROWSER */}
          <aside
            className="min-w-0 rounded-2xl border border-[#E2E8F0] bg-white p-4! lg:sticky lg:top-5"
            aria-label="Find services"
          >
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-base font-extrabold">
                Browse services
              </h2>

              <span className="rounded-full bg-[#FFF7ED] px-2.5! py-1! text-xs font-bold text-[#EA580C]">
                {filteredServices.length}
              </span>
            </div>

            {/* SERVICE SEARCH */}
            <label className="mt-4! flex items-center gap-2 rounded-xl border border-[#E2E8F0] px-3! py-2.5! focus-within:border-[#F97316]">
              <SearchIcon className="h-4 w-4 shrink-0 text-[#F97316]" />

              <span className="sr-only">
                Search services
              </span>

              <input
                type="search"
                value={serviceSearch}
                onChange={(e) =>
                  setServiceSearch(e.target.value)
                }
                placeholder="Search services..."
                className="w-full min-w-0 bg-transparent text-sm text-[#0F172A]! outline-none placeholder:text-[#94A3B8]"
              />
            </label>

            {/* CATEGORY FILTERS */}
            <div
              className="mt-3! flex flex-wrap gap-1.5"
              role="group"
              aria-label="Service category"
            >
              {categories.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setCategory(c)}
                  aria-pressed={category === c}
                  className={`rounded-full border! px-3! py-1.5! text-[11px] font-semibold transition ${
                    category === c
                      ? "border-[#F97316]! bg-[#F97316]! text-white"
                      : "border-[#E2E8F0]! bg-white! text-[#475569] hover:border-[#FDBA74]!"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* SERVICE LIST */}
            <div
              className="mt-4! flex flex-col gap-2"
              aria-label="Service results"
            >
              {filteredServices.length ? (
                filteredServices.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() =>
                      selectService(service.id)
                    }
                    aria-pressed={active.id === service.id}
                    className={`flex w-full items-center gap-3 rounded-xl border! p-3! text-left transition ${
                      active.id === service.id
                        ? "border-[#FDBA74]! bg-[#FFF7ED]!"
                        : "border-[#E2E8F0]! bg-white! hover:border-[#FDBA74]! hover:bg-[#FFFCF9]!"
                    }`}
                  >
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFEDD5] text-xl"
                      aria-hidden="true"
                    >
                      {service.icon}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold text-[#0F172A]">
                        {service.name}
                      </span>

                      <span className="block text-[11px] text-[#64748B]">
                        {availableMin(service) === null
                          ? "Unavailable"
                          : `From ${money(
                              availableMin(service)
                            )}`}
                      </span>
                    </span>

                    <span
                      className={`text-xl ${
                        active.id === service.id
                          ? "text-[#EA580C]"
                          : "text-[#94A3B8]"
                      }`}
                      aria-hidden="true"
                    >
                      ›
                    </span>
                  </button>
                ))
              ) : (
                <div className="rounded-xl bg-[#FFF7ED] p-4! text-center text-xs text-[#9A3412]">
                  No services found.

                  <button
                    type="button"
                    onClick={() => {
                      setServiceSearch("");
                      setCategory("All");
                    }}
                    className="mt-2! block w-full text-xs font-bold text-[#EA580C] underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </aside>

          {/* RIGHT CONTENT: SELECTED SERVICE */}
          <section
            ref={detailRef}
            id="service-details"
            className="min-w-0 scroll-mt-4"
            aria-label="Selected service details"
          >
            {/* SERVICE OVERVIEW */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5! sm:p-6!">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-3">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#FFEDD5] text-3xl"
                    aria-hidden="true"
                  >
                    {active.icon}
                  </div>

                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wide text-[#EA580C]">
                      {active.category}
                    </span>

                    <h2 className="mt-1! text-2xl font-extrabold sm:text-3xl">
                      {active.name}
                    </h2>

                    <p className="mt-1! text-sm text-[#64748B]">
                      {active.tagline}
                    </p>
                  </div>
                </div>

                {/* LOWEST AVAILABLE PRICE */}
                <div className="rounded-xl bg-[#FFF7ED] px-4! py-3!">
                  <p className="text-[11px] text-[#64748B]">
                    Available from (demo)
                  </p>

                  <p className="text-xl font-extrabold text-[#EA580C]">
                    {minPrice === null
                      ? "Unavailable"
                      : money(minPrice)}
                  </p>
                </div>
              </div>

              <p className="mt-5! text-sm leading-7 text-[#475569]">
                {active.description}
              </p>

              <div className="mt-4! flex flex-wrap gap-2 text-xs text-[#64748B]">
                <span className="rounded-lg bg-[#F8FAFC] px-3! py-1.5!">
                  ◷ {active.duration}
                </span>

                <span className="rounded-lg bg-[#F8FAFC] px-3! py-1.5!">
                  👥 {active.providers.length} demo providers
                </span>
              </div>

              {/* INCLUDED AND EXCLUDED */}
              <div className="mt-5! grid gap-4 border-t border-[#E2E8F0] pt-5! sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-extrabold text-[#15803D]">
                    ✓ Usually included
                  </h3>

                  <ul className="mt-2! flex flex-col gap-1.5">
                    {active.included.map((i) => (
                      <li
                        key={i}
                        className="text-xs leading-5 text-[#475569]"
                      >
                        • {i}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-extrabold text-[#B45309]">
                    ⓘ Quoted separately
                  </h3>

                  <ul className="mt-2! flex flex-col gap-1.5">
                    {active.excluded.map((i) => (
                      <li
                        key={i}
                        className="text-xs leading-5 text-[#475569]"
                      >
                        • {i}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* PROVIDERS */}
            <div className="mt-5! rounded-2xl border border-[#E2E8F0] bg-white p-5! sm:p-6!">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-extrabold">
                    Providers & pricing
                  </h3>

                  <p className="mt-1! text-xs text-[#64748B]">
                    Select a provider to compare their example
                    price.
                  </p>
                </div>

                {/* SORTING */}
                <label className="text-xs font-semibold text-[#64748B]">
                  Sort by{" "}
                  <select
                    value={sort}
                    onChange={(e) =>
                      setSort(e.target.value)
                    }
                    className="rounded-lg border border-[#E2E8F0] bg-white px-2! py-2! text-xs text-[#0F172A]!"
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
                      Experience
                    </option>
                  </select>
                </label>
              </div>

              {/* PROVIDER SEARCH AND FILTER */}
              <div className="mt-4! flex flex-wrap items-center gap-3">
                <label className="flex min-w-48 flex-1 items-center gap-2 rounded-lg border border-[#E2E8F0] px-3! py-2! focus-within:border-[#F97316]">
                  <SearchIcon className="h-4 w-4 shrink-0 text-[#F97316]" />

                  <span className="sr-only">
                    Search providers
                  </span>

                  <input
                    value={providerSearch}
                    onChange={(e) =>
                      setProviderSearch(e.target.value)
                    }
                    placeholder="Search provider or city..."
                    className="w-full min-w-0 bg-transparent text-xs text-[#0F172A]! outline-none"
                  />
                </label>

                <label className="flex items-center gap-2 text-xs text-[#475569]">
                  <input
                    type="checkbox"
                    checked={availableOnly}
                    onChange={(e) =>
                      setAvailableOnly(e.target.checked)
                    }
                    className="h-4 w-4 accent-[#F97316]"
                  />

                  Available only
                </label>
              </div>

              {/* PROVIDER CARDS */}
              <div className="mt-4! grid gap-3 md:grid-cols-2">
                {filteredProviders.length ? (
                  filteredProviders.map((p) => (
                    <article
                      key={p.id}
                      className={`flex flex-col gap-3 rounded-xl border p-4! ${
                        chosen?.id === p.id
                          ? "border-[#F97316] bg-[#FFF7ED]"
                          : "border-[#E2E8F0] bg-white"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-extrabold">
                            {p.name}
                          </h4>

                          <p className="mt-1! text-[11px] text-[#64748B]">
                            📍 {p.city} · {p.years} years
                          </p>
                        </div>

                        {p.verified && (
                          <span
                            title="Fictional demo verification"
                            className="rounded-full bg-green-50 px-2! py-1! text-[10px] font-bold text-[#15803D]"
                          >
                            ✓ Demo verified
                          </span>
                        )}
                      </div>

                      <p className="text-xs leading-5 text-[#475569]">
                        {p.skills}
                      </p>

                      <p className="text-xs text-[#64748B]">
                        <span className="font-bold text-amber-500">
                          ★ {p.rating}
                        </span>
                        {" "}· {p.reviews} demo reviews
                      </p>

                      {/* PRICE AND SELECT BUTTON */}
                      <div className="mt-auto! flex flex-wrap items-end justify-between gap-2 border-t border-[#E2E8F0] pt-3!">
                        <div>
                          <p className="text-lg font-extrabold text-[#EA580C]">
                            {money(p.price)}
                          </p>

                          <p className="text-[11px] text-[#64748B]">
                            per {p.unit}
                          </p>
                        </div>

                        <button
                          type="button"
                          disabled={!p.available}
                          aria-pressed={chosen?.id === p.id}
                          onClick={() =>
                            setSelectedId(p.id)
                          }
                          className={`rounded-lg px-3! py-2! text-xs font-bold ${
                            !p.available
                              ? "cursor-not-allowed bg-slate-200! text-slate-500"
                              : chosen?.id === p.id
                              ? "bg-[#15803D]! text-white"
                              : "bg-[#F97316]! text-white hover:bg-[#EA580C]!"
                          }`}
                        >
                          {!p.available
                            ? "Unavailable"
                            : chosen?.id === p.id
                            ? "✓ Selected"
                            : "Select"}
                        </button>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="col-span-full rounded-xl bg-[#FFF7ED] p-4! text-sm text-[#9A3412]">
                    No providers match your search. Change
                    the filters to see more.
                  </div>
                )}
              </div>

              {/* SELECTED PROVIDER SUMMARY */}
              <div
                aria-live="polite"
                className="mt-4! flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#FDBA74] bg-[#FFF7ED] p-4!"
              >
                {chosen ? (
                  <div>
                    <p className="text-xs text-[#64748B]">
                      Selected provider · starting price (demo)
                    </p>

                    <p className="mt-1! text-sm font-bold">
                      {chosen.name} —{" "}
                      <span className="text-[#EA580C]">
                        {money(chosen.price)}
                      </span>
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-[#64748B]">
                    Choose an available provider above
                    to see your selection.
                  </p>
                )}

                {chosen && (
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedId(null)
                    }
                    className="text-xs font-bold text-[#EA580C] underline"
                  >
                    Clear selection
                  </button>
                )}
              </div>

              <p className="mt-3! text-xs leading-5 text-[#64748B]">
                All provider information and prices are
                fictional. Booking and payments are
                intentionally disabled in this demo.
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#E2E8F0] bg-white">
        <div className="mx-auto! flex max-w-7xl flex-wrap justify-between gap-2 px-5! py-5! text-xs text-[#64748B] sm:px-8!">
          <span>
            © 2026 ServiQ · Service details demo
          </span>

          <span>
            Orange & White · Tailwind only
          </span>
        </div>
      </footer>
    </div>
  );
}
