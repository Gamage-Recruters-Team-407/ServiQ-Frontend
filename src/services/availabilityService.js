import { apiClient } from "./api";

// Fallback mock storage for offline / pre-backend testing
const STORAGE_KEY = "serviq_mock_availability_slots";

const getLocalMockSlots = () => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read mock availability", e);
  }
  
  // Seed with realistic initial slots matching the Figma booking screen (Oct 24 - Oct 28)
  const today = new Date();
  const seedSlots = [];
  
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dateStr = d.toISOString().split("T")[0];
    
    // Some sample slots
    if (i === 0) {
      // "Full" / no slots day
      continue;
    }
    
    const times = [
      { start: "09:00", end: "10:30", status: "Available" },
      { start: "11:30", end: "13:00", status: "Available" },
      { start: "14:00", end: "15:30", status: "Available" },
      { start: "16:30", end: "18:00", status: "Available" },
    ];
    
    // Vary slots per day for visual variety matching Figma
    const sliceCount = (i % 3 === 0) ? 2 : (i % 2 === 0) ? 3 : 4;
    times.slice(0, sliceCount).forEach((t, idx) => {
      seedSlots.push({
        _id: `mock_slot_${dateStr}_${idx}`,
        provider_id: "usr_mock_provider_01",
        service_id: null,
        available_date: dateStr,
        start_time: t.start,
        end_time: t.end,
        is_available: true,
        status: t.status
      });
    });
  }
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedSlots));
  } catch (e) {}
  return seedSlots;
};

const saveLocalMockSlots = (slots) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slots));
  } catch (e) {
    console.error("Failed to save mock availability", e);
  }
};

export const availabilityService = {
  /**
   * Get availability for a specific provider (Customer-facing discovery & booking)
   * Corresponds to SRS §10.1 (FR-DIS-001) & §14.2 (FR-SCH-002)
   */
  getProviderAvailability: async (providerId, params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await apiClient(`/availability/provider/${providerId}${query ? `?${query}` : ""}`);
      if (res && (res.data || Array.isArray(res))) return res;
    } catch (err) {
      console.warn("Backend availability endpoint unavailable, using mock data fallback:", err.message);
    }

    // Fallback: return filtered local mock slots
    const all = getLocalMockSlots();
    let filtered = all.filter((s) => !providerId || s.provider_id === providerId || s.provider_id === "usr_mock_provider_01");
    if (params.date) {
      const targetDate = new Date(params.date).toISOString().split("T")[0];
      filtered = filtered.filter((s) => s.available_date === targetDate);
    }
    return { success: true, data: filtered };
  },

  /**
   * Get all slots for current authenticated provider
   * Corresponds to SRS §12.4 (FR-PRO-004)
   */
  getMyAvailability: async (params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await apiClient(`/availability/my-slots${query ? `?${query}` : ""}`);
      if (res && (res.data || Array.isArray(res))) return res;
    } catch (err) {
      console.warn("Backend my-slots endpoint unavailable, using mock data fallback:", err.message);
    }

    // Fallback: return all local slots
    return { success: true, data: getLocalMockSlots() };
  },

  /**
   * Create or bulk-save availability slots (generated from working hours / recurring days)
   * Corresponds to SRS §12.4 (FR-PRO-004)
   */
  saveAvailabilitySlots: async (slotsData) => {
    try {
      const res = await apiClient("/availability/slots", {
        method: "POST",
        body: slotsData
      });
      if (res && res.success) return res;
    } catch (err) {
      console.warn("Backend save slots endpoint unavailable, saving to local mock fallback:", err.message);
    }

    // Fallback: save to localStorage
    const current = getLocalMockSlots();
    const newItems = Array.isArray(slotsData) ? slotsData : [slotsData];
    const created = newItems.map((item, idx) => ({
      _id: `slot_${Date.now()}_${idx}`,
      provider_id: item.provider_id || "usr_mock_provider_01",
      service_id: item.service_id || null,
      available_date: typeof item.available_date === "string" 
        ? item.available_date.split("T")[0] 
        : new Date(item.available_date).toISOString().split("T")[0],
      start_time: item.start_time,
      end_time: item.end_time,
      is_available: item.is_available !== false,
      status: item.status || "Available",
      created_at: new Date().toISOString()
    }));

    const updated = [...current, ...created];
    saveLocalMockSlots(updated);
    return { success: true, data: created, message: "Availability saved successfully (local mock)" };
  },

  /**
   * Update slot status (e.g. toggle Available <-> Blocked)
   */
  updateSlotStatus: async (slotId, status) => {
    try {
      const res = await apiClient(`/availability/slots/${slotId}/status`, {
        method: "PATCH",
        body: { status }
      });
      if (res && res.success) return res;
    } catch (err) {
      console.warn("Backend update slot status unavailable, applying to local mock fallback:", err.message);
    }

    const current = getLocalMockSlots();
    const updated = current.map((s) => (s._id === slotId ? { ...s, status, is_available: status === "Available" } : s));
    saveLocalMockSlots(updated);
    return { success: true, message: `Slot status updated to ${status}` };
  },

  /**
   * Delete an unbooked availability slot
   */
  deleteSlot: async (slotId) => {
    try {
      const res = await apiClient(`/availability/slots/${slotId}`, {
        method: "DELETE"
      });
      if (res && res.success) return res;
    } catch (err) {
      console.warn("Backend delete slot unavailable, applying to local mock fallback:", err.message);
    }

    const current = getLocalMockSlots();
    const updated = current.filter((s) => s._id !== slotId);
    saveLocalMockSlots(updated);
    return { success: true, message: "Slot deleted successfully" };
  }
};
