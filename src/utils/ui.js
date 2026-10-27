const btn = "inline-flex items-center justify-center rounded-lg px-[18px] py-2.5 font-semibold transition disabled:cursor-not-allowed";

export const ui = {
  wrap: "mx-auto w-full max-w-6xl px-5",
  head: "border-b border-line bg-surface py-9",
  h1: "text-3xl font-bold leading-tight",
  h2: "mb-3.5 text-xl font-semibold",
  card: "rounded-xl border border-line bg-white p-5 shadow-sm",
  cardLink: "block rounded-xl border border-line bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary",
  grid: "grid gap-[18px] grid-cols-[repeat(auto-fill,minmax(260px,1fr))]",
  btnPrimary: `${btn} bg-primary text-white hover:bg-primary-dark disabled:bg-accent`,
  btnOutline: `${btn} border border-line bg-white text-ink hover:border-primary hover:text-primary`,
  btnSm: "!px-3 !py-1.5 text-sm",
  input: "w-full rounded-lg border border-line bg-white px-3 py-2.5 text-ink focus:border-primary focus:outline-2 focus:outline-accent",
  label: "mb-1.5 block text-sm font-semibold",
  hint: "mt-1 text-xs text-muted",
  fieldError: "mt-1 text-xs text-danger",
  chip: "inline-block rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-primary-dark",
  empty: "rounded-xl border border-dashed border-accent bg-surface px-5 py-14 text-center",
  alertError: "mb-3.5 rounded-lg bg-red-100 px-3.5 py-3 text-sm text-danger",
  alertInfo: "mb-3.5 rounded-lg bg-info px-3.5 py-3 text-sm",
};