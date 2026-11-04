// Tailwind (default palette) class presets for the catalogue module.
// Orange = brand, slate = text/borders. No custom theme tokens needed.

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-lg border-solid px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-orange-300 disabled:cursor-not-allowed disabled:opacity-60";

const card = "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm";

const ui = {
  // layout
  wrap: "mx-auto w-full max-w-6xl px-4 py-8 sm:px-6",
  head: "mb-8 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-8 text-white shadow-lg shadow-orange-500/20",
  grid: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",

  // cards
  card,
  cardLink: `${card} block transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md`,
  stat: "rounded-xl border border-slate-200 bg-white p-4 shadow-sm",

  // buttons
  btnPrimary: `${btnBase} bg-orange-500 text-white shadow-sm hover:bg-orange-600`,
  btnOutline: `${btnBase} border border-slate-200 bg-white text-slate-900 hover:border-orange-300 hover:bg-orange-50`,
  btnDanger: `${btnBase} border border-red-200 bg-white text-red-600 hover:bg-red-50`,
  btnSuccess: `${btnBase} border border-green-200 bg-white text-green-700 hover:bg-green-50`,
  btnSm: "!px-3 !py-1.5 px-3! py-1.5!",

  // form
  input:
    "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200",
  label: "mb-1.5 block text-sm font-semibold text-slate-900",
  hint: "mt-1 text-xs text-slate-500",
  fieldError: "mt-1 text-xs font-medium text-red-600",

  // misc
  chip: "inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-700",
  empty:
    "rounded-2xl border border-dashed border-orange-300 bg-orange-50 px-6 py-12 text-center text-slate-500",

  // alerts
  alertError: "rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700",
  alertInfo: "rounded-lg border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-800",
  alertSuccess: "rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800",

  // table
  th: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500",
  td: "px-4 py-3 align-middle text-sm text-slate-900",
  tr: "border-b border-slate-200 last:border-0 hover:bg-orange-50/50",
};

export { ui };
export default ui;