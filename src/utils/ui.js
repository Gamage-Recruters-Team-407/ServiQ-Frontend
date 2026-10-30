// const btn = "inline-flex items-center justify-center rounded-lg px-[18px] py-2.5 font-semibold transition disabled:cursor-not-allowed";

// export const ui = {
//   wrap: "mx-auto w-full max-w-6xl px-5",
//   head: "border-b border-line bg-surface py-9",
//   h1: "text-3xl font-bold leading-tight",
//   h2: "mb-3.5 text-xl font-semibold",
//   card: "rounded-xl border border-line bg-white p-5 shadow-sm",
//   cardLink: "block rounded-xl border border-line bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary",
//   grid: "grid gap-[18px] grid-cols-[repeat(auto-fill,minmax(260px,1fr))]",
//   btnPrimary: `${btn} bg-primary text-white hover:bg-primary-dark disabled:bg-accent`,
//   btnOutline: `${btn} border border-line bg-white text-ink hover:border-primary hover:text-primary`,
//   btnSm: "!px-3 !py-1.5 text-sm",
//   input: "w-full rounded-lg border border-line bg-white px-3 py-2.5 text-ink focus:border-primary focus:outline-2 focus:outline-accent",
//   label: "mb-1.5 block text-sm font-semibold",
//   hint: "mt-1 text-xs text-muted",
//   fieldError: "mt-1 text-xs text-danger",
//   chip: "inline-block rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-primary-dark",
//   empty: "rounded-xl border border-dashed border-accent bg-surface px-5 py-14 text-center",
//   alertError: "mb-3.5 rounded-lg bg-red-100 px-3.5 py-3 text-sm text-danger",
//   alertInfo: "mb-3.5 rounded-lg bg-info px-3.5 py-3 text-sm",
//   alertSuccess: "mb-3.5 rounded-lg bg-green-100 px-3.5 py-3 text-sm text-success",
//   th: "border-b border-line bg-surface px-3.5 py-3 text-left text-sm font-semibold",
//   td: "border-b border-line px-3.5 py-3 text-sm",
// };

// Reusable Tailwind class presets. Colors come from @theme in src/styles/globals.css.
const btn =
  "inline-flex items-center justify-center gap-1.5 rounded-lg px-[18px] py-2.5 font-semibold transition disabled:cursor-not-allowed";

export const ui = {
  wrap: "mx-auto w-full max-w-6xl px-5",
  head: "border-b border-line bg-linear-to-r from-surface to-white py-9",
  h1: "text-3xl font-bold leading-tight tracking-tight",
  h2: "mb-3.5 text-xl font-semibold",
  card: "rounded-xl border border-line bg-white p-5 shadow-sm",
  cardLink:
    "block rounded-xl border border-line bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary hover:shadow-md",
  grid: "grid gap-[18px] grid-cols-[repeat(auto-fill,minmax(260px,1fr))]",

  btnPrimary: `${btn} bg-primary text-white shadow-sm hover:bg-primary-dark disabled:bg-accent`,
  btnOutline: `${btn} border border-line bg-white text-ink hover:border-primary hover:text-primary`,
  btnDanger: `${btn} border border-red-200 bg-white text-danger hover:bg-red-50`,
  btnSuccess: `${btn} border border-green-200 bg-white text-success hover:bg-green-50`,
  btnSm: "px-3! py-1.5! text-sm",

  input:
    "w-full rounded-lg border border-line bg-white px-3 py-2.5 text-ink placeholder:text-slate-400 focus:border-primary focus:outline-2 focus:outline-accent",
  label: "mb-1.5 block text-sm font-semibold",
  hint: "mt-1 text-xs text-muted",
  fieldError: "mt-1 text-xs text-danger",
  chip: "inline-block rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-primary-dark",
  empty: "rounded-xl border border-dashed border-accent bg-surface px-5 py-14 text-center",

  alertError: "mb-3.5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-danger",
  alertInfo: "mb-3.5 rounded-lg bg-info px-3.5 py-3 text-sm",
  alertSuccess: "mb-3.5 rounded-lg border border-green-200 bg-green-50 px-3.5 py-3 text-sm text-success",

  // tables
  th: "whitespace-nowrap border-b border-line bg-surface px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted",
  td: "border-b border-line px-4 py-3.5 align-middle text-sm",
  tr: "transition hover:bg-surface/60",
  stat: "rounded-xl border border-line bg-white p-4 shadow-sm",
};