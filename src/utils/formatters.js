export function formatCurrency(amount, currency = "LKR") {
  if (amount === undefined || amount === null || isNaN(amount)) return "LKR 0.00";
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2
  }).format(amount);
}

export function formatDate(dateString) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

export function formatDateTime(dateString) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}

export function truncateText(text, maxLength = 80) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

export function formatRelativeTime(dateString, now = Date.now()) {
  if (!dateString) return "—";
  const time = new Date(dateString).getTime();
  if (isNaN(time)) return dateString;
  const seconds = Math.round((now - time) / 1000);
  if (seconds < 45) return "Just now";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(seconds / 3600);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.round(seconds / 86400);
  if (days < 7) return days === 1 ? "Yesterday" : `${days} days ago`;
  return formatDate(dateString);
}