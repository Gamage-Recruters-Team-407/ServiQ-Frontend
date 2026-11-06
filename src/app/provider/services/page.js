
"use client";

import { useEffect, useMemo, useState } from "react";
import { providerOfferingsService } from "@/services/providerOfferingsService";

// ======================================
// DEV 05 - TAILWIND CSS FRONTEND
// ======================================

const STATUSES = [
  "Active",
  "Inactive",
  "Temporarily Unavailable",
];

const PRICING_TYPES = ["Fixed", "Hourly", "Quote"];

const EMPTY_FORM = {
  category_id: "",
  name: "",
  description: "",
  pricing_type: "Fixed",
  amount: "",
  coverage_area: "",
  supported_locations: "",
  radius_km: "15",
  duration_minutes: "60",
};

// Important (!) utilities protect against
// the existing global CSS margin, padding,
// heading, paragraph and button rules.

const inputClass =
  "!block !w-full !min-w-0 !rounded-xl !border !border-slate-200 !bg-white !px-3 !py-3 !text-sm !text-slate-800 outline-none focus:!border-orange-500 focus:!ring-2 focus:!ring-orange-100 disabled:!opacity-60";

const primaryButton =
  "!inline-flex !items-center !justify-center !gap-2 !rounded-xl !border !border-orange-500 !bg-orange-500 !px-5 !py-3 !text-sm !font-bold !text-white !shadow-sm transition hover:!bg-orange-600 disabled:!cursor-not-allowed disabled:!opacity-50";

const secondaryButton =
  "!inline-flex !items-center !justify-center !rounded-xl !border !border-slate-200 !bg-white !px-4 !py-2.5 !text-sm !font-semibold !text-slate-700 transition hover:!bg-slate-50 disabled:!opacity-50";

const dangerButton =
  "!rounded-xl !border !border-red-200 !bg-red-50 !px-4 !py-2.5 !text-xs !font-bold !text-red-600 hover:!bg-red-100 disabled:!opacity-50";

// ======================================
// HELPERS
// ======================================

function getArray(response) {
  if (Array.isArray(response?.data)) {
    return response.data;
  }

  if (Array.isArray(response?.data?.services)) {
    return response.data.services;
  }

  if (Array.isArray(response?.data?.categories)) {
    return response.data.categories;
  }

  return [];
}

function getId(value) {
  if (typeof value === "string") return value;
  return value?._id || "";
}

function formatPrice(price) {
  if (price?.pricing_type === "Quote") {
    return "Request Quote";
  }

  const amount = Number(
    price?.amount ?? 0
  ).toLocaleString("en-LK", {
    maximumFractionDigits: 2,
  });

  return `LKR ${amount}${
    price?.pricing_type === "Hourly"
      ? " / hour"
      : ""
  }`;
}

function errorMessage(error) {
  const firstError = error?.data?.errors?.[0];

  if (firstError) {
    return `${firstError.field}: ${firstError.message}`;
  }

  return error?.message || "Something went wrong.";
}

function getStatusStyle(status) {
  if (status === "Active") {
    return "!bg-emerald-50 !text-emerald-700 !border-emerald-200";
  }

  if (status === "Inactive") {
    return "!bg-slate-100 !text-slate-600 !border-slate-200";
  }

  return "!bg-amber-50 !text-amber-700 !border-amber-200";
}

function getEditForm(service) {
  return {
    category_id: getId(service.category_id),
    name: service.name || "",
    description: service.description || "",
    pricing_type:
      service.price?.pricing_type || "Fixed",
    amount: String(service.price?.amount ?? ""),
    coverage_area:
      service.coverage?.coverage_area || "",
    supported_locations: (
      service.coverage?.supported_locations || []
    ).join(", "),
    radius_km: String(
      service.coverage?.radius_km ?? 15
    ),
    duration_minutes: String(
      service.duration_minutes ?? 60
    ),
  };
}

// ======================================
// REUSABLE COMPONENTS
// ======================================

function FormField({
  label,
  required = false,
  wide = false,
  children,
}) {
  return (
    <label
      className={`block min-w-0 ${
        wide ? "sm:col-span-2" : ""
      }`}
    >
      <span className="!mb-2 block !text-xs !font-bold !text-slate-700">
        {label}
        {required && (
          <span className="!text-orange-600"> *</span>
        )}
      </span>

      {children}
    </label>
  );
}

function StatCard({ title, count, symbol, tone }) {
  return (
    <div className="!rounded-2xl !border !border-slate-200 !bg-white !p-5 !shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <span className="!text-xs !font-semibold !text-slate-500">
          {title}
        </span>

        <span
          className={`!inline-flex !h-10 !w-10 !items-center !justify-center !rounded-xl !text-xl ${tone}`}
        >
          {symbol}
        </span>
      </div>

      <div className="!mt-3 !text-3xl !font-extrabold !text-slate-900">
        {count}
      </div>
    </div>
  );
}

// ======================================
// MAIN PAGE
// ======================================

export default function ProviderServicesPage() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ======================================
  // LOAD REAL BACKEND DATA
  // ======================================

  async function refreshServices() {
    const response =
      await providerOfferingsService.getAll();

    setServices(getArray(response));
  }

  async function refreshCategories() {
    const response =
      await providerOfferingsService.getCategories();

    setCategories(
      getArray(response).filter(
        (category) => category.status === "Active"
      )
    );
  }

  useEffect(() => {
    let mounted = true;

    async function load() {
      const [serviceResult, categoryResult] =
        await Promise.allSettled([
          providerOfferingsService.getAll(),
          providerOfferingsService.getCategories(),
        ]);

      if (!mounted) return;

      const failures = [];

      if (serviceResult.status === "fulfilled") {
        setServices(getArray(serviceResult.value));
      } else {
        failures.push(
          "Services: " + errorMessage(serviceResult.reason)
        );
      }

      if (categoryResult.status === "fulfilled") {
        setCategories(
          getArray(categoryResult.value).filter(
            (category) => category.status === "Active"
          )
        );
      } else {
        failures.push(
          "Categories: " + errorMessage(categoryResult.reason)
        );
      }

      if (failures.length > 0) {
        setError(failures.join(" | "));
      }

      setLoading(false);
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  // ======================================
  // STATISTICS
  // ======================================

  const stats = useMemo(() => ({
    total: services.length,

    active: services.filter(
      (item) => item.status === "Active"
    ).length,

    inactive: services.filter(
      (item) => item.status === "Inactive"
    ).length,

    unavailable: services.filter(
      (item) =>
        item.status === "Temporarily Unavailable"
    ).length,
  }), [services]);

  // ======================================
  // CATEGORY NAMES
  // ======================================

  const categoryNames = useMemo(
    () => Object.fromEntries(
      categories.map((category) => [
        category._id,
        category.name,
      ])
    ),
    [categories]
  );

  // ======================================
  // SEARCH AND FILTER
  // ======================================

  const filteredServices = useMemo(() => {
    const query = search.trim().toLowerCase();

    return services.filter((service) => {
      const text = [
        service.name,
        service.description,
        service.coverage?.coverage_area,
        ...(service.coverage?.supported_locations || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return (
        text.includes(query) &&
        (
          categoryFilter === "all" ||
          getId(service.category_id) === categoryFilter
        ) &&
        (
          statusFilter === "all" ||
          service.status === statusFilter
        )
      );
    });
  }, [
    services,
    search,
    categoryFilter,
    statusFilter,
  ]);

  // ======================================
  // FORM ACTIONS
  // ======================================

  function updateField(name, value) {
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function openAdd() {
    setEditingId(null);

    setForm({
      ...EMPTY_FORM,
      category_id: categories[0]?._id || "",
    });

    setError("");
    setMessage("");
    setShowModal(true);
  }

  function openEdit(service) {
    setEditingId(service._id);
    setForm(getEditForm(service));

    setError("");
    setMessage("");
    setShowModal(true);
  }

  function closeModal() {
    if (busy) return;

    setShowModal(false);
    setEditingId(null);
    setError("");
  }

  function handlePricingType(type) {
    setForm((previous) => ({
      ...previous,
      pricing_type: type,
      amount:
        type === "Quote"
          ? "0"
          : previous.pricing_type === "Quote"
            ? ""
            : previous.amount,
    }));
  }

  // ======================================
  // CREATE / UPDATE SERVICE
  // ======================================

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    const name = form.name.trim();
    const description = form.description.trim();
    const coverageArea = form.coverage_area.trim();

    const amount =
      form.pricing_type === "Quote"
        ? 0
        : Number(form.amount);

    const radius = Number(form.radius_km);
    const duration = Number(form.duration_minutes);

    const locations = [
      ...new Set(
        form.supported_locations
          .split(",")
          .map((location) => location.trim())
          .filter(Boolean)
      ),
    ];

    if (
      !form.category_id ||
      !name ||
      !description ||
      !coverageArea
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (
      form.pricing_type !== "Quote" &&
      form.amount.trim() === ""
    ) {
      setError("Please enter a valid price.");
      return;
    }

    if (
      !Number.isFinite(amount) ||
      amount < 0
    ) {
      setError("Price must be zero or greater.");
      return;
    }

    if (
      form.radius_km.trim() === "" ||
      !Number.isFinite(radius) ||
      radius < 0 ||
      radius > 10000
    ) {
      setError("Enter a valid coverage radius.");
      return;
    }

    if (
      form.duration_minutes.trim() === "" ||
      !Number.isInteger(duration) ||
      duration < 1 ||
      duration > 10080
    ) {
      setError("Enter a valid service duration.");
      return;
    }

    if (
      locations.length > 50 ||
      locations.some((location) => location.length > 100)
    ) {
      setError("Maximum 50 locations, each up to 100 characters.");
      return;
    }

    const payload = {
      name,
      description,

      price: {
        amount,
        currency: "LKR",
        pricing_type: form.pricing_type,
      },

      coverage: {
        coverage_area: coverageArea,
        supported_locations: locations,
        radius_km: radius,
      },

      duration_minutes: duration,
    };

    if (!editingId) {
      payload.category_id = form.category_id;
    } else {
      const original = services.find(
        (service) => service._id === editingId
      );

      if (
        getId(original?.category_id) !==
        form.category_id
      ) {
        payload.category_id = form.category_id;
      }
    }

    setBusy(true);

    try {
      if (editingId) {
        await providerOfferingsService.update(
          editingId,
          payload
        );
      } else {
        await providerOfferingsService.create(payload);
      }

      await refreshServices();

      setShowModal(false);
      setEditingId(null);

      setMessage(
        editingId
          ? "Service updated successfully."
          : "Service created successfully."
      );
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  // ======================================
  // CHANGE SERVICE STATUS
  // ======================================

  async function handleStatusChange(service, status) {
    if (service.status === status) return;

    setBusy(true);
    setError("");
    setMessage("");

    try {
      await providerOfferingsService.changeStatus(
        service._id,
        status
      );

      await refreshServices();

      setMessage(
        `${service.name} is now ${status}.`
      );
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  // ======================================
  // DELETE SERVICE
  // ======================================

  async function handleDelete(service) {
    const confirmDelete = window.confirm(
      `Permanently delete "${service.name}"?\n\nThis cannot be undone.`
    );

    if (!confirmDelete) return;

    setBusy(true);
    setError("");
    setMessage("");

    try {
      await providerOfferingsService.remove(
        service._id
      );

      await refreshServices();

      setMessage("Service permanently deleted.");
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  // ======================================
  // REFRESH DATA
  // ======================================

  async function handleRefresh() {
    setBusy(true);
    setError("");
    setMessage("");

    try {
      await Promise.all([
        refreshServices(),
        refreshCategories(),
      ]);

      setMessage("Services refreshed successfully.");
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  // ======================================
  // UI
  // ======================================

  return (
    <div className="mx-auto w-full max-w-7xl !pb-10">

      {/* PAGE HEADER */}
      <header className="!mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="!mb-2 !text-xs !font-extrabold uppercase tracking-widest !text-orange-600">
            PROVIDER PORTAL / SERVICES
          </div>

          <h1 className="!m-0 !text-3xl !font-extrabold !text-slate-900">
            My Service Offerings
          </h1>

          <p className="!mt-2 !text-sm !text-slate-500">
            Manage your services, pricing and coverage areas.
          </p>
        </div>

        <button
          type="button"
          className={primaryButton}
          onClick={openAdd}
          disabled={
            loading ||
            busy ||
            categories.length === 0
          }
        >
          <span className="!text-xl">+</span>
          Add New Service
        </button>
      </header>

      {/* LIVE API INFO */}
      <div className="!mb-5 flex flex-col justify-between gap-3 !rounded-2xl !border !border-blue-200 !bg-blue-50 !p-4 sm:flex-row sm:items-center">
        <div>
          <div className="!text-sm !font-bold !text-blue-900">
            Live Backend Integration
          </div>

          <p className="!mt-1 !text-xs !text-blue-700">
            Your service changes are saved to MongoDB
            through the Provider Services API.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={busy || loading}
          className="!rounded-xl !border !border-blue-200 !bg-white !px-4 !py-2.5 !text-xs !font-bold !text-blue-700 hover:!bg-blue-100 disabled:!opacity-50"
        >
          {busy ? "Please wait..." : "↻ Refresh"}
        </button>
      </div>

      {/* MESSAGES */}
      {message && (
        <div
          role="status"
          className="!mb-4 !rounded-xl !border !border-emerald-200 !bg-emerald-50 !p-4 !text-sm !text-emerald-800"
        >
          ✓ {message}
        </div>
      )}

      {error && !showModal && (
        <div
          role="alert"
          className="!mb-4 !rounded-xl !border !border-red-200 !bg-red-50 !p-4 !text-sm !text-red-700"
        >
          {error}
        </div>
      )}

      {!loading && categories.length === 0 && (
        <div className="!mb-4 !rounded-xl !border !border-amber-200 !bg-amber-50 !p-4 !text-sm !text-amber-800">
          No active categories are available.
          Check the Categories API before adding a service.
        </div>
      )}

      {/* STATISTICS */}
      <section
        aria-label="Service statistics"
        className="!mb-6 grid grid-cols-2 gap-3 xl:grid-cols-4"
      >
        <StatCard
          title="Total Services"
          count={stats.total}
          symbol="▦"
          tone="!bg-orange-50 !text-orange-600"
        />

        <StatCard
          title="Active Services"
          count={stats.active}
          symbol="✓"
          tone="!bg-emerald-50 !text-emerald-600"
        />

        <StatCard
          title="Inactive Services"
          count={stats.inactive}
          symbol="Ⅱ"
          tone="!bg-slate-100 !text-slate-600"
        />

        <StatCard
          title="Unavailable"
          count={stats.unavailable}
          symbol="◷"
          tone="!bg-amber-50 !text-amber-700"
        />
      </section>

      {/* MAIN PANEL */}
      <section className="!overflow-hidden !rounded-2xl !border !border-slate-200 !bg-white !shadow-sm">

        {/* FILTER SECTION */}
        <div className="!border-b !border-slate-100 !p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="!m-0 !text-lg !font-bold !text-slate-900">
                Manage Services
              </h2>

              <p className="!mt-1 !text-xs !text-slate-500">
                Search, edit and manage your service listings.
              </p>
            </div>

            <span className="!rounded-full !bg-orange-50 !px-3 !py-1.5 !text-xs !font-bold !text-orange-700">
              {filteredServices.length} Services
            </span>
          </div>

          <div className="!mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
            <input
              type="search"
              aria-label="Search services"
              placeholder="Search name or location..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              className={inputClass}
            />

            <select
              aria-label="Filter by category"
              className={inputClass}
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(event.target.value)
              }
            >
              <option value="all">
                All Categories
              </option>

              {categories.map((category) => (
                <option
                  key={category._id}
                  value={category._id}
                >
                  {category.name}
                </option>
              ))}
            </select>

            <select
              aria-label="Filter by status"
              className={inputClass}
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <option value="all">
                All Statuses
              </option>

              {STATUSES.map((status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* SERVICE CARDS */}
        <div className="!p-5">
          {loading ? (
            <div className="!py-16 text-center !text-sm !text-slate-500">
              Loading your services...
            </div>

          ) : filteredServices.length === 0 ? (

            <div className="!py-16 text-center">
              <div className="!mb-3 !text-4xl">
                ▦
              </div>

              <h3 className="!m-0 !text-lg !font-bold !text-slate-800">
                No Services Found
              </h3>

              <p className="!mt-2 !text-sm !text-slate-500">
                Add your first service or change your filters.
              </p>
            </div>

          ) : (

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {filteredServices.map((service) => (
                <article
                  key={service._id}
                  className="flex min-w-0 flex-col !rounded-2xl !border !border-slate-200 !bg-white !p-5 transition hover:!border-orange-200 hover:!shadow-md"
                >
                  {/* CATEGORY AND STATUS */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="!rounded-lg !bg-orange-50 !px-3 !py-1.5 !text-xs !font-bold !text-orange-700">
                      {categoryNames[
                        getId(service.category_id)
                      ] || (
                        typeof service.category_id === "object"
                          ? service.category_id?.name
                          : null
                      ) || "Category"}
                    </span>

                    <span
                      className={`!rounded-full !border !px-3 !py-1 !text-xs !font-bold ${getStatusStyle(service.status)}`}
                    >
                      {service.status}
                    </span>
                  </div>

                  {/* SERVICE NAME */}
                  <h3 className="!mt-4 !text-lg !font-extrabold !text-slate-900">
                    {service.name}
                  </h3>

                  <p className="!mt-2 !min-h-10 !text-sm !leading-6 !text-slate-500">
                    {service.description}
                  </p>

                  {/* PRICE */}
                  <div className="!mt-4 !rounded-xl !bg-orange-50 !p-4">
                    <div className="!text-xs !font-semibold !text-orange-700">
                      Service Price
                    </div>

                    <div className="!mt-1 !text-xl !font-extrabold !text-slate-900">
                      {formatPrice(service.price)}
                    </div>
                  </div>

                  {/* COVERAGE */}
                  <div className="!mt-4 !space-y-3">
                    <div className="flex justify-between gap-3 !border-b !border-slate-100 !pb-3">
                      <span className="!text-xs !text-slate-500">
                        Coverage Area
                      </span>

                      <strong className="!text-right !text-xs !text-slate-800">
                        {service.coverage?.coverage_area ||
                          "Not specified"}
                      </strong>
                    </div>

                    <div className="flex justify-between gap-3 !border-b !border-slate-100 !pb-3">
                      <span className="!text-xs !text-slate-500">
                        Radius
                      </span>

                      <strong className="!text-xs !text-slate-800">
                        {service.coverage?.radius_km ?? 0} km
                      </strong>
                    </div>

                    <div className="flex justify-between gap-3 !border-b !border-slate-100 !pb-3">
                      <span className="!text-xs !text-slate-500">
                        Duration
                      </span>

                      <strong className="!text-xs !text-slate-800">
                        {service.duration_minutes ?? 60} min
                      </strong>
                    </div>

                    <div>
                      <div className="!mb-2 !text-xs !text-slate-500">
                        Supported Locations
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {(service.coverage?.supported_locations || [])
                          .map((location) => (
                            <span
                              key={location}
                              className="!rounded-lg !bg-slate-100 !px-2.5 !py-1 !text-xs !text-slate-600"
                            >
                              {location}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="!mt-auto !flex !flex-wrap !items-center !gap-2 !border-t !border-slate-100 !pt-4">
                    <button
                      type="button"
                      className={secondaryButton}
                      onClick={() => openEdit(service)}
                      disabled={busy}
                    >
                      Edit
                    </button>

                    <select
                      aria-label={`Status of ${service.name}`}
                      value={service.status}
                      onChange={(event) =>
                        handleStatusChange(
                          service,
                          event.target.value
                        )
                      }
                      disabled={busy}
                      className="!min-w-0 !flex-1 !rounded-xl !border !border-slate-200 !bg-white !px-2 !py-2.5 !text-xs !font-semibold !text-slate-700 disabled:!opacity-50"
                    >
                      {STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      className={dangerButton}
                      onClick={() => handleDelete(service)}
                      disabled={busy}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================================== */}
      {/* ADD / EDIT SERVICE MODAL */}
      {/* ================================== */}

      {showModal && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center !bg-slate-950/60 !p-3 sm:!p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="dev05-modal-title"
            className="flex max-h-[92vh] w-full max-w-2xl flex-col !overflow-hidden !rounded-2xl !bg-white !shadow-2xl"
          >
            {/* MODAL HEADER */}
            <div className="flex items-start justify-between gap-4 !border-b !border-slate-100 !p-5 sm:!px-7">
              <div>
                <h2
                  id="dev05-modal-title"
                  className="!m-0 !text-xl !font-extrabold !text-slate-900"
                >
                  {editingId
                    ? "Edit Service"
                    : "Add New Service"}
                </h2>

                <p className="!mt-1 !text-xs !text-slate-500">
                  Set service details, pricing and coverage.
                </p>
              </div>

              <button
                type="button"
                aria-label="Close form"
                onClick={closeModal}
                disabled={busy}
                className="!rounded-lg !bg-transparent !px-2 !text-2xl !text-slate-500 hover:!bg-slate-100"
              >
                ×
              </button>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="!overflow-y-auto !p-5 sm:!p-7"
            >
              {error && (
                <div
                  role="alert"
                  className="!mb-5 !rounded-xl !border !border-red-200 !bg-red-50 !p-3 !text-sm !text-red-700"
                >
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                {/* SERVICE NAME */}
                <FormField label="Service Name" required>
                  <input
                    className={inputClass}
                    type="text"
                    required
                    maxLength={120}
                    value={form.name}
                    placeholder="e.g. Home Plumbing Repair"
                    onChange={(event) =>
                      updateField("name", event.target.value)
                    }
                  />
                </FormField>

                {/* CATEGORY */}
                <FormField label="Category" required>
                  <select
                    className={inputClass}
                    required
                    value={form.category_id}
                    onChange={(event) =>
                      updateField(
                        "category_id",
                        event.target.value
                      )
                    }
                  >
                    <option value="">
                      Select Category
                    </option>

                    {editingId &&
                      form.category_id &&
                      !categories.some(
                        (c) => c._id === form.category_id
                      ) && (
                        <option value={form.category_id}>
                          Existing Category
                        </option>
                      )}

                    {categories.map((category) => (
                      <option
                        key={category._id}
                        value={category._id}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </FormField>

                {/* DESCRIPTION */}
                <div className="sm:col-span-2">
                  <FormField label="Description" required>
                    <textarea
                      className={inputClass}
                      rows={4}
                      required
                      maxLength={2000}
                      placeholder="Describe your service..."
                      value={form.description}
                      onChange={(event) =>
                        updateField(
                          "description",
                          event.target.value
                        )
                      }
                    />
                  </FormField>
                </div>

                {/* PRICING TYPE */}
                <FormField label="Pricing Type" required>
                  <select
                    className={inputClass}
                    value={form.pricing_type}
                    onChange={(event) =>
                      handlePricingType(event.target.value)
                    }
                  >
                    {PRICING_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </FormField>

                {/* PRICE */}
                <FormField label="Price (LKR)" required>
                  <input
                    className={inputClass}
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    disabled={
                      form.pricing_type === "Quote"
                    }
                    value={
                      form.pricing_type === "Quote"
                        ? "0"
                        : form.amount
                    }
                    onChange={(event) =>
                      updateField(
                        "amount",
                        event.target.value
                      )
                    }
                  />
                </FormField>

                {/* COVERAGE AREA */}
                <FormField label="Coverage Area" required>
                  <input
                    className={inputClass}
                    type="text"
                    required
                    maxLength={150}
                    placeholder="e.g. Colombo"
                    value={form.coverage_area}
                    onChange={(event) =>
                      updateField(
                        "coverage_area",
                        event.target.value
                      )
                    }
                  />
                </FormField>

                {/* COVERAGE RADIUS */}
                <FormField label="Coverage Radius (km)">
                  <input
                    className={inputClass}
                    type="number"
                    min="0"
                    max="10000"
                    value={form.radius_km}
                    onChange={(event) =>
                      updateField(
                        "radius_km",
                        event.target.value
                      )
                    }
                  />
                </FormField>

                {/* SUPPORTED LOCATIONS */}
                <div className="sm:col-span-2">
                  <FormField label="Supported Locations">
                    <input
                      className={inputClass}
                      type="text"
                      placeholder="Colombo, Dehiwala, Nugegoda"
                      value={form.supported_locations}
                      onChange={(event) =>
                        updateField(
                          "supported_locations",
                          event.target.value
                        )
                      }
                    />
                  </FormField>

                  <p className="!mt-2 !text-xs !text-slate-400">
                    Separate locations with commas.
                  </p>
                </div>

                {/* DURATION */}
                <FormField label="Duration (minutes)">
                  <input
                    className={inputClass}
                    type="number"
                    min="1"
                    max="10080"
                    value={form.duration_minutes}
                    onChange={(event) =>
                      updateField(
                        "duration_minutes",
                        event.target.value
                      )
                    }
                  />
                </FormField>

              </div>

              {/* FORM BUTTONS */}
              <div className="!mt-7 flex justify-end gap-3 !border-t !border-slate-100 !pt-5">
                <button
                  type="button"
                  className={secondaryButton}
                  disabled={busy}
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className={primaryButton}
                  disabled={busy}
                >
                  {busy
                    ? "Saving..."
                    : editingId
                      ? "Save Changes"
                      : "Add Service"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
