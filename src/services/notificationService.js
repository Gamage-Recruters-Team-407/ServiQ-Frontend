import { apiClient } from "./api";

// Notification API (Developer: Yehara - customer notifications).
//   GET   /notifications?status=unread|read&event_type=&page=&limit=
//         -> { data: [...], meta: { page, limit, total, pages, unread_count } }
//   PATCH /notifications/:id/read
//   PATCH /notifications/:id/unread
//   PATCH /notifications/read-all
//
// Set NEXT_PUBLIC_NOTIFICATIONS_MOCK=true to run the whole UI on in-memory sample data
// (no backend / login needed). Handy for demos, screenshots and UI work.

const MOCK = process.env.NEXT_PUBLIC_NOTIFICATIONS_MOCK === "true";

export const isMockMode = () => MOCK;

// True when there is something to authenticate the request with.
export function hasSession() {
  if (MOCK) return true;
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("serviq_token");
}

// Accepts both the API shape (id, read) and the raw Mongo document (_id, notification_status, read_at).
export function normalizeNotification(raw) {
  const read =
    typeof raw.read === "boolean" ? raw.read : raw.notification_status === "Read" || !!raw.read_at;
  return {
    id: String(raw.id ?? raw._id),
    title: raw.title || raw.event_type || "Notification",
    message: raw.message || "",
    event_type: raw.event_type || "Other",
    channel: raw.channel || "In-App",
    related_record_id: raw.related_record_id ?? null,
    read,
    read_at: raw.read_at ?? null,
    created_at: raw.created_at ?? raw.createdAt ?? null
  };
}

function normalizeList(res, { page = 1, limit = 10 } = {}) {
  const rows = res?.data ?? res?.notifications ?? [];
  const meta = res?.meta ?? {};
  const total = meta.total ?? rows.length;
  const perPage = meta.limit ?? limit;
  return {
    items: rows.map(normalizeNotification),
    meta: {
      page: meta.page ?? page,
      limit: perPage,
      total,
      pages: meta.pages ?? Math.max(1, Math.ceil(total / perPage)),
      unread_count: meta.unread_count ?? rows.filter((r) => !normalizeNotification(r).read).length
    }
  };
}

/* ---------------------------------- mock ---------------------------------- */

const MIN = 60 * 1000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

function seedMock() {
  const now = Date.now();
  const rows = [
    ["Booking Acceptance or Rejection", "Booking confirmed", "Nimal Silva accepted your electrician booking for tomorrow at 10:00 AM.", "bk_1001", 12 * MIN, false],
    ["Payment Status Change", "Payment received", "Your payment of LKR 4,500.00 has been verified.", "bk_1001", 55 * MIN, false],
    ["Schedule or Service Update", "Provider is on the way", "Your plumber is on the way and should arrive within 20 minutes.", "bk_1002", 3 * HOUR, false],
    ["Service Completion", "Service completed", "Your AC servicing has been marked as completed.", "bk_1003", 5 * HOUR, false],
    ["Review Request", "How was your service?", "Please rate your plumbing service experience with Nimal Silva.", "bk_1002", 1 * DAY + 2 * HOUR, true],
    ["Dispute Update", "Dispute under review", "Your dispute about the cleaning service is now under review.", null, 1 * DAY + 5 * HOUR, false],
    ["Booking Request", "Booking request sent", "Your request to Kasun Fernando was sent. We will notify you when he responds.", "bk_1004", 2 * DAY, true],
    ["Payment Status Change", "Payment failed", "Your card payment of LKR 2,200.00 could not be processed. Please try again.", "bk_1004", 2 * DAY + 3 * HOUR, true],
    ["Schedule or Service Update", "Appointment rescheduled", "Your appointment was moved to Friday at 2:30 PM.", "bk_1005", 3 * DAY, true],
    ["Booking Acceptance or Rejection", "Booking declined", "Sorry, your provider is unavailable on that date. Choose another time or provider.", "bk_1006", 4 * DAY, true],
    ["Review Request", "Rate your electrician", "Tell others about your experience with Ruwan Jayasinghe.", "bk_1007", 6 * DAY, true],
    ["Account Registration", "Welcome to ServiQ", "Your account is ready. Browse services and book trusted local providers.", null, 9 * DAY, true],
    ["Dispute Update", "Dispute resolved", "Your dispute was resolved. A partial refund has been issued.", null, 12 * DAY, true],
    ["Other", "Platform update", "We added provider comparison to help you pick the right provider.", null, 20 * DAY, true]
  ];
  return rows.map(([event_type, title, message, related, age, read], i) => ({
    id: `notif_${i + 1}`,
    event_type,
    title,
    message,
    related_record_id: related,
    channel: "In-App",
    read,
    read_at: read ? new Date(now - age + 5 * MIN).toISOString() : null,
    created_at: new Date(now - age).toISOString()
  }));
}

let mockStore = null;
const store = () => (mockStore ||= seedMock());
const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

async function mockList({ status, event_type, page = 1, limit = 10 } = {}) {
  await delay();
  const all = [...store()].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const filtered = all.filter(
    (n) => (!status || (status === "unread" ? !n.read : n.read)) && (!event_type || n.event_type === event_type)
  );
  const p = Number(page);
  const l = Number(limit);
  return {
    data: filtered.slice((p - 1) * l, p * l),
    meta: {
      page: p,
      limit: l,
      total: filtered.length,
      pages: Math.max(1, Math.ceil(filtered.length / l)),
      unread_count: all.filter((n) => !n.read).length
    }
  };
}

async function mockSetRead(id, read) {
  await delay(150);
  const item = store().find((n) => n.id === id);
  if (!item) throw new Error("Notification not found");
  item.read = read;
  item.read_at = read ? new Date().toISOString() : null;
  return { data: { ...item } };
}

async function mockReadAll() {
  await delay(200);
  let modified = 0;
  store().forEach((n) => {
    if (!n.read) {
      n.read = true;
      n.read_at = new Date().toISOString();
      modified += 1;
    }
  });
  return { data: { modified } };
}

/* --------------------------------- public --------------------------------- */

export const notificationService = {
  async list(params = {}) {
    const clean = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== ""));
    const res = MOCK
      ? await mockList(clean)
      : await apiClient(`/notifications${Object.keys(clean).length ? `?${new URLSearchParams(clean)}` : ""}`);
    return normalizeList(res, clean);
  },

  async markAsRead(id) {
    const res = MOCK ? await mockSetRead(id, true) : await apiClient(`/notifications/${id}/read`, { method: "PATCH" });
    return res?.data ? normalizeNotification(res.data) : null;
  },

  async markAsUnread(id) {
    const res = MOCK ? await mockSetRead(id, false) : await apiClient(`/notifications/${id}/unread`, { method: "PATCH" });
    return res?.data ? normalizeNotification(res.data) : null;
  },

  async markAllAsRead() {
    const res = MOCK ? await mockReadAll() : await apiClient("/notifications/read-all", { method: "PATCH" });
    return res?.data?.modified ?? 0;
  }
};
