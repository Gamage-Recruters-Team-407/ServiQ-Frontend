"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { availabilityService } from "@/services/availabilityService";

/**
 * AvailabilityPicker Component
 * Implements Figma "Select Date & Time" design (SRS §10.1, §12.4, §14.1, §14.2)
 *
 * Props:
 * - providerId: string (ID of the provider to fetch slots for)
 * - serviceId: string (optional service ID for service-specific filtering)
 * - onSelectSlot: function(slotData: { date, slotId, startTime, endTime, label })
 * - selectedSlotId: string (optional controlled slot ID)
 * - initialDaysCount: number (how many upcoming days to show, default 7)
 */
export default function AvailabilityPicker({
  providerId = "usr_mock_provider_01",
  serviceId = null,
  onSelectSlot,
  selectedSlotId = null,
  initialDaysCount = 7
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allSlots, setAllSlots] = useState([]);
  const [selectedDateStr, setSelectedDateStr] = useState("");
  const [internalSlotId, setInternalSlotId] = useState(null);

  const activeSlotId = selectedSlotId !== null && selectedSlotId !== undefined ? selectedSlotId : internalSlotId;

  // Generate array of upcoming dates starting from today
  const upcomingDays = useMemo(() => {
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < initialDaysCount; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dateStr = d.toISOString().split("T")[0];
      const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
      const monthDay = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      days.push({
        dateObj: d,
        dateStr,
        dayName,
        monthDay
      });
    }
    return days;
  }, [initialDaysCount]);

  // Load availability from service
  useEffect(() => {
    let isMounted = true;
    async function loadAvailability() {
      try {
        const res = await availabilityService.getProviderAvailability(providerId, {
          service_id: serviceId
        });
        if (isMounted) {
          const slots = res?.data || [];
          setAllSlots(slots);

          // Default selected date to first day that has slots, or today
          const firstDayWithSlots = upcomingDays.find((day) =>
            slots.some((s) => s.available_date === day.dateStr && s.is_available && s.status === "Available")
          );
          setSelectedDateStr(firstDayWithSlots ? firstDayWithSlots.dateStr : upcomingDays[0]?.dateStr || "");
        }
      } catch (err) {
        if (isMounted) setError(err.message || "Failed to load availability slots");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadAvailability();
    return () => {
      isMounted = false;
    };
  }, [providerId, serviceId, upcomingDays]);

  // Format 24h time ("09:00") to 12h AM/PM ("09:00 AM")
  const formatTimeLabel = useCallback((timeStr) => {
    if (!timeStr) return "";
    const [hours, minutes] = timeStr.split(":").map(Number);
    if (isNaN(hours)) return timeStr;
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = String(minutes || 0).padStart(2, "0");
    return `${String(formattedHours).padStart(2, "0")}:${formattedMinutes} ${period}`;
  }, []);

  // Group slots by date string
  const slotsByDate = useMemo(() => {
    const map = {};
    for (const slot of allSlots) {
      const dateKey = slot.available_date ? slot.available_date.split("T")[0] : "";
      if (!map[dateKey]) map[dateKey] = [];
      map[dateKey].push(slot);
    }
    return map;
  }, [allSlots]);

  // Current day's available slots
  const currentDaySlots = useMemo(() => {
    const list = slotsByDate[selectedDateStr] || [];
    return list.filter((s) => s.is_available && s.status === "Available");
  }, [slotsByDate, selectedDateStr]);

  const handleDateSelect = (dateStr) => {
    setSelectedDateStr(dateStr);
  };

  const handleSlotSelect = (slot) => {
    setInternalSlotId(slot._id);
    if (onSelectSlot) {
      onSelectSlot({
        slotId: slot._id,
        date: selectedDateStr,
        startTime: slot.start_time,
        endTime: slot.end_time,
        label: `${formatTimeLabel(slot.start_time)} - ${formatTimeLabel(slot.end_time)}`
      });
    }
  };

  const selectedDateHeader = useMemo(() => {
    if (!selectedDateStr) return "";
    const [y, m, d] = selectedDateStr.split("-").map(Number);
    const dateObj = new Date(y, m - 1, d);
    return dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }, [selectedDateStr]);

  return (
    <div className="availability-picker-card" style={styles.card}>
      {/* Header */}
      <div style={styles.headerRow}>
        <div>
          <h3 style={styles.title}>Select Date & Time</h3>
          <p style={styles.subtitle}>
            Choose provider availability for the scheduled session.
          </p>
        </div>
        <div style={styles.timezoneBadge}>
          <span style={styles.clockIcon}>🕒</span>
          <span style={styles.timezoneText}>Timezone: LK (GMT+5:30)</span>
        </div>
      </div>

      {loading ? (
        <div style={styles.loadingContainer}>
          <div className="loading-spinner" style={styles.spinner} />
          <p style={styles.loadingText}>Loading available slots...</p>
        </div>
      ) : error ? (
        <div style={styles.errorBanner}>
          <p>{error}</p>
        </div>
      ) : (
        <>
          {/* Horizontal Day Carousel Strip */}
          <div style={styles.daysScroll}>
            {upcomingDays.map((day) => {
              const daySlots = (slotsByDate[day.dateStr] || []).filter(
                (s) => s.is_available && s.status === "Available"
              );
              const isSelected = day.dateStr === selectedDateStr;
              const isFull = daySlots.length === 0;

              return (
                <button
                  key={day.dateStr}
                  type="button"
                  onClick={() => handleDateSelect(day.dateStr)}
                  style={{
                    ...styles.dayButton,
                    ...(isSelected ? styles.dayButtonSelected : {}),
                    ...(isFull && !isSelected ? styles.dayButtonFull : {})
                  }}
                >
                  <span style={styles.dayName}>{day.dayName}</span>
                  <span style={styles.monthDay}>{day.monthDay}</span>
                  <span
                    style={{
                      ...styles.slotCount,
                      ...(isSelected ? styles.slotCountSelected : {}),
                      ...(isFull ? styles.slotCountFull : {})
                    }}
                  >
                    {isFull ? "Full" : `${daySlots.length} slots`}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Available Slots for Selected Date */}
          <div style={styles.slotsSection}>
            <div style={styles.slotsHeader}>
              <span style={styles.slotsTitle}>
                Available Slots ({selectedDateHeader})
              </span>
            </div>

            {currentDaySlots.length === 0 ? (
              <div style={styles.emptySlots}>
                <p style={styles.emptyText}>
                  No open slots on this date. Please pick another day above.
                </p>
              </div>
            ) : (
              <div style={styles.slotsGrid}>
                {currentDaySlots.map((slot) => {
                  const isSlotSelected = activeSlotId === slot._id;
                  const timeDisplay = formatTimeLabel(slot.start_time);

                  return (
                    <button
                      key={slot._id}
                      type="button"
                      onClick={() => handleSlotSelect(slot)}
                      style={{
                        ...styles.slotChip,
                        ...(isSlotSelected ? styles.slotChipSelected : {})
                      }}
                    >
                      {isSlotSelected && <span style={styles.checkMark}>✓</span>}
                      <span>{timeDisplay}</span>
                      {slot.end_time && (
                        <span style={styles.slotEndTime}>
                          - {formatTimeLabel(slot.end_time)}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "rgba(17, 24, 39, 0.75)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "16px",
    padding: "1.5rem",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
    backdropFilter: "blur(12px)",
    color: "#f8fafc",
    fontFamily: "var(--font-body, 'Inter', sans-serif)"
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "1rem",
    marginBottom: "1.25rem"
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#ffffff",
    margin: 0,
    fontFamily: "var(--font-heading, 'Plus Jakarta Sans', sans-serif)"
  },
  subtitle: {
    fontSize: "0.875rem",
    color: "#94a3b8",
    marginTop: "0.25rem",
    marginBottom: 0
  },
  timezoneBadge: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    fontSize: "0.75rem",
    color: "#94a3b8",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    padding: "0.35rem 0.75rem",
    borderRadius: "9999px"
  },
  clockIcon: {
    fontSize: "0.85rem"
  },
  timezoneText: {
    fontWeight: "500"
  },
  daysScroll: {
    display: "flex",
    gap: "0.75rem",
    overflowX: "auto",
    paddingBottom: "0.75rem",
    marginBottom: "1.5rem",
    scrollbarWidth: "thin"
  },
  dayButton: {
    minWidth: "105px",
    flex: "0 0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.85rem 0.6rem",
    borderRadius: "14px",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "rgba(255, 255, 255, 0.1)",
    cursor: "pointer",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    color: "#f8fafc",
    outline: "none"
  },
  dayButtonSelected: {
    borderColor: "#ff6b00",
    backgroundColor: "rgba(255, 107, 0, 0.12)",
    boxShadow: "0 0 15px rgba(255, 107, 0, 0.25)",
    transform: "translateY(-2px)"
  },
  dayButtonFull: {
    opacity: 0.6
  },
  dayName: {
    fontSize: "0.8rem",
    fontWeight: "600",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.05em"
  },
  monthDay: {
    fontSize: "1rem",
    fontWeight: "700",
    color: "#ffffff",
    marginTop: "0.2rem",
    marginBottom: "0.35rem"
  },
  slotCount: {
    fontSize: "0.75rem",
    fontWeight: "600",
    color: "#10b981",
    padding: "0.15rem 0.5rem",
    borderRadius: "6px",
    backgroundColor: "rgba(16, 185, 129, 0.1)"
  },
  slotCountSelected: {
    color: "#ff8c38",
    backgroundColor: "rgba(255, 107, 0, 0.2)"
  },
  slotCountFull: {
    color: "#94a3b8",
    backgroundColor: "rgba(255, 255, 255, 0.05)"
  },
  slotsSection: {
    marginTop: "0.5rem"
  },
  slotsHeader: {
    marginBottom: "0.85rem"
  },
  slotsTitle: {
    fontSize: "0.95rem",
    fontWeight: "600",
    color: "#e2e8f0"
  },
  slotsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
    gap: "0.75rem"
  },
  slotChip: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.4rem",
    padding: "0.75rem 1rem",
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "rgba(255, 255, 255, 0.12)",
    color: "#f8fafc",
    fontSize: "0.875rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.18s ease",
    outline: "none"
  },
  slotChipSelected: {
    borderColor: "#ff6b00",
    backgroundColor: "rgba(255, 107, 0, 0.18)",
    color: "#ffffff",
    boxShadow: "0 0 12px rgba(255, 107, 0, 0.3)"
  },
  checkMark: {
    color: "#ff6b00",
    fontWeight: "800",
    fontSize: "0.95rem"
  },
  slotEndTime: {
    fontSize: "0.75rem",
    color: "#94a3b8",
    fontWeight: "400"
  },
  emptySlots: {
    padding: "1.5rem",
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    border: "1px dashed rgba(255, 255, 255, 0.1)",
    textAlign: "center"
  },
  emptyText: {
    fontSize: "0.875rem",
    color: "#94a3b8",
    margin: 0
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 1rem"
  },
  spinner: {
    width: "28px",
    height: "28px",
    border: "3px solid rgba(255, 255, 255, 0.1)",
    borderTopColor: "#ff6b00",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite"
  },
  loadingText: {
    fontSize: "0.85rem",
    color: "#94a3b8",
    marginTop: "0.75rem"
  },
  errorBanner: {
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    backgroundColor: "rgba(244, 63, 94, 0.12)",
    border: "1px solid rgba(244, 63, 94, 0.3)",
    color: "#f43f5e",
    fontSize: "0.85rem"
  }
};
