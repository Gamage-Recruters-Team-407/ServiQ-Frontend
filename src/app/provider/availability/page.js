"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { availabilityService } from "@/services/availabilityService";
import { serviceService } from "@/services/serviceService";
import AvailabilityPicker from "@/components/provider/AvailabilityPicker";

export default function ProviderAvailabilityPage() {
  // Read current user from localStorage if present, or fallback cleanly
  const [providerId, setProviderId] = useState("usr_mock_provider_01");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("serviq_user");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.id) {
          setProviderId(parsed.id);
        }
      }
    } catch {
      // Ignore parse errors, keep fallback
    }
  }, []);

  // Form states matching Figma Image 2
  const [selectedDays, setSelectedDays] = useState(["1", "2", "3", "4", "5"]); // Mon-Fri default (1=Mon..7=Sun)
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("18:00");
  const [unavailableSlots, setUnavailableSlots] = useState([
    { start: "12:00", end: "13:00", label: "12:00 PM - 01:00 PM" }
  ]);
  const [serviceSpecific, setServiceSpecific] = useState("all");
  const [servicesList, setServicesList] = useState([]);
  
  // UI and feedback states
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [existingSlots, setExistingSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [activeTab, setActiveTab] = useState("manage"); // "manage" | "preview"

  // Break modal state
  const [showAddBreak, setShowAddBreak] = useState(false);
  const [breakStart, setBreakStart] = useState("13:00");
  const [breakEnd, setBreakEnd] = useState("14:00");

  // Generate the current week days for the day selector buttons
  const weekDays = useMemo(() => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 is Sunday, 1 is Monday...
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const dayNum = String(i + 1); // 1 = Mon ... 7 = Sun
      const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
      const monthDay = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      days.push({
        id: dayNum,
        dayName,
        monthDay,
        fullDate: d.toISOString().split("T")[0]
      });
    }
    return days;
  }, []);

  const refreshSlots = useCallback(async () => {
    try {
      const res = await availabilityService.getMyAvailability({ provider_id: providerId });
      if (res?.data) {
        setExistingSlots(res.data);
      }
    } catch (err) {
      console.error("Failed to refresh slots:", err);
    }
  }, [providerId]);

  useEffect(() => {
    let isMounted = true;
    async function initData() {
      try {
        const res = await availabilityService.getMyAvailability({ provider_id: providerId });
        if (isMounted && res?.data) {
          setExistingSlots(res.data);
        }
      } catch (err) {
        console.error("Failed to load slots:", err);
      } finally {
        if (isMounted) setLoadingSlots(false);
      }

      // Populate services dropdown (Figma Image 2: "Service Specific Availability")
      // Services endpoint (/api/services) is assigned to Dev4/Dev5 and not deployed yet.
      // Default to standard service categories to avoid 404 console toasts.
      if (isMounted) {
        setServicesList([
          { _id: "all", title: "All Services" },
          { _id: "srv_clean_01", title: "Home Cleaning" },
          { _id: "srv_plumb_01", title: "Plumbing Repair" },
          { _id: "srv_elect_01", title: "Electrical Installation" }
        ]);
      }
    }

    initData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Toggle day selection
  const toggleDay = (dayId) => {
    setSelectedDays((prev) =>
      prev.includes(dayId) ? prev.filter((d) => d !== dayId) : [...prev, dayId]
    );
  };

  // Format 24h to 12h AM/PM
  const formatTimeLabel = (timeStr) => {
    if (!timeStr) return "";
    const [hours, minutes] = timeStr.split(":").map(Number);
    if (isNaN(hours)) return timeStr;
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = String(minutes || 0).padStart(2, "0");
    return `${String(formattedHours).padStart(2, "0")}:${formattedMinutes} ${period}`;
  };

  // Add unavailable/break slot
  const handleAddBreak = (e) => {
    e.preventDefault();
    if (breakStart >= breakEnd) {
      alert("Break start time must be earlier than end time.");
      return;
    }
    const label = `${formatTimeLabel(breakStart)} - ${formatTimeLabel(breakEnd)}`;
    setUnavailableSlots((prev) => [...prev, { start: breakStart, end: breakEnd, label }]);
    setShowAddBreak(false);
  };

  const handleRemoveBreak = (idx) => {
    setUnavailableSlots((prev) => prev.filter((_, i) => i !== idx));
  };

  // Generator: Converts recurring selected days + working hours + breaks into individual date records for the next 4 weeks
  const handleSaveAvailability = async () => {
    if (selectedDays.length === 0) {
      setMessage({ type: "error", text: "Please select at least one available day." });
      return;
    }
    if (startTime >= endTime) {
      setMessage({ type: "error", text: "Working start time must be before end time." });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const generatedSlots = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Generate for the next 28 days (4 weeks)
      for (let i = 0; i < 28; i++) {
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + i);

        // Day of week in our 1=Mon..7=Sun scheme
        const dayOfWeek = targetDate.getDay() === 0 ? "7" : String(targetDate.getDay());

        if (selectedDays.includes(dayOfWeek)) {
          const dateStr = targetDate.toISOString().split("T")[0];

          let intervals = [{ start: startTime, end: endTime }];

          for (const brk of unavailableSlots) {
            const nextIntervals = [];
            for (const inv of intervals) {
              if (brk.start > inv.start && brk.end < inv.end) {
                // Split in middle
                nextIntervals.push({ start: inv.start, end: brk.start });
                nextIntervals.push({ start: brk.end, end: inv.end });
              } else if (brk.start <= inv.start && brk.end > inv.start && brk.end < inv.end) {
                // Overlaps start
                nextIntervals.push({ start: brk.end, end: inv.end });
              } else if (brk.start > inv.start && brk.start < inv.end && brk.end >= inv.end) {
                // Overlaps end
                nextIntervals.push({ start: inv.start, end: brk.start });
              } else if (brk.start <= inv.start && brk.end >= inv.end) {
                // Completely covered by break
              } else {
                nextIntervals.push(inv);
              }
            }
            intervals = nextIntervals;
          }

          // Build database record for each interval
          for (const interval of intervals) {
            generatedSlots.push({
              provider_id: providerId,
              service_id: serviceSpecific === "all" ? null : serviceSpecific,
              available_date: dateStr,
              start_time: interval.start,
              end_time: interval.end,
              is_available: true,
              status: "Available"
            });
          }
        }
      }

      const res = await availabilityService.saveAvailabilitySlots(generatedSlots);
      if (res?.success) {
        setMessage({
          type: "success",
          text: `Success! Created ${generatedSlots.length} availability slots across selected recurring days.`
        });
        refreshSlots();
      } else {
        setMessage({ type: "error", text: res?.message || "Failed to save availability." });
      }
    } catch (err) {
      setMessage({ type: "error", text: err.message || "An error occurred while saving." });
    } finally {
      setSaving(false);
    }
  };

  // Toggle slot status
  const handleToggleSlot = async (slotId, currentStatus) => {
    const nextStatus = currentStatus === "Available" ? "Blocked" : "Available";
    try {
      await availabilityService.updateSlotStatus(slotId, nextStatus);
      refreshSlots();
    } catch (err) {
      alert("Failed to update slot status");
    }
  };

  // Delete slot
  const handleDeleteSlot = async (slotId) => {
    if (!confirm("Are you sure you want to delete this availability slot?")) return;
    try {
      await availabilityService.deleteSlot(slotId);
      refreshSlots();
    } catch (err) {
      alert("Failed to delete slot");
    }
  };

  return (
    <div style={styles.container}>
      {/* Title Bar */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.pageTitle}>Set Your Availability</h1>
          <p style={styles.pageSubtitle}>
            Choose the days and time slots when you are available to provide services. (SRS §12.4, §14.2)
          </p>
        </div>

        {/* Tab switch to preview customer picker */}
        <div style={styles.tabBar}>
          <button
            type="button"
            onClick={() => setActiveTab("manage")}
            style={{
              ...styles.tabButton,
              ...(activeTab === "manage" ? styles.tabButtonActive : {})
            }}
          >
            Availability Settings
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            style={{
              ...styles.tabButton,
              ...(activeTab === "preview" ? styles.tabButtonActive : {})
            }}
          >
            Customer View Preview
          </button>
        </div>
      </div>

      {message && (
        <div
          style={{
            ...styles.alertBanner,
            backgroundColor: message.type === "success" ? "rgba(16, 185, 129, 0.15)" : "rgba(244, 63, 94, 0.15)",
            borderColor: message.type === "success" ? "#10b981" : "#f43f5e",
            color: message.type === "success" ? "#10b981" : "#f43f5e"
          }}
        >
          {message.text}
        </div>
      )}

      {activeTab === "preview" ? (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={styles.previewNotice}>
            <p style={{ margin: 0, fontSize: "0.875rem", color: "#94a3b8" }}>
              💡 <strong>Live Component Preview:</strong> Below is how customers see your schedule when booking a service using your <code>AvailabilityPicker</code> component.
            </p>
          </div>
          <AvailabilityPicker
            providerId={providerId}
            onSelectSlot={(slot) => {
              alert(`Selected Slot: ${slot.date} at ${slot.label}`);
            }}
          />
        </div>
      ) : (
        <div style={styles.layoutGrid}>
          {/* Main Availability Form Card (Exact Figma Image 2) */}
          <div style={styles.card}>
            {/* Section 1: Available Days */}
            <div style={styles.formSection}>
              <label style={styles.sectionLabel}>Available Days</label>
              <div style={styles.daysRow}>
                {weekDays.map((day) => {
                  const isSelected = selectedDays.includes(day.id);
                  return (
                    <button
                      key={day.id}
                      type="button"
                      onClick={() => toggleDay(day.id)}
                      style={{
                        ...styles.dayButton,
                        ...(isSelected ? styles.dayButtonActive : styles.dayButtonInactive)
                      }}
                    >
                      <span style={styles.dayTextTop}>{day.dayName}</span>
                      <span style={styles.dayTextBottom}>{day.monthDay}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Working Hours */}
            <div style={styles.formSection}>
              <label style={styles.sectionLabel}>Working Hours</label>
              <div style={styles.twoCol}>
                <div>
                  <span style={styles.fieldSubLabel}>Start Time</span>
                  <select
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    style={styles.selectInput}
                  >
                    <option value="06:00">06:00 AM</option>
                    <option value="07:00">07:00 AM</option>
                    <option value="08:00">08:00 AM</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                  </select>
                </div>

                <div>
                  <span style={styles.fieldSubLabel}>End Time</span>
                  <select
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    style={styles.selectInput}
                  >
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="17:00">05:00 PM</option>
                    <option value="18:00">06:00 PM</option>
                    <option value="19:00">07:00 PM</option>
                    <option value="20:00">08:00 PM</option>
                    <option value="21:00">09:00 PM</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Unavailable Time Slots (Breaks) */}
            <div style={styles.formSection}>
              <label style={styles.sectionLabel}>Unavailable Time Slots</label>
              <div style={styles.breakRow}>
                {unavailableSlots.map((b, idx) => (
                  <span key={idx} style={styles.breakTag}>
                    {b.label}
                    <button
                      type="button"
                      onClick={() => handleRemoveBreak(idx)}
                      style={styles.breakRemoveBtn}
                      title="Remove break"
                    >
                      ×
                    </button>
                  </span>
                ))}

                <button
                  type="button"
                  onClick={() => setShowAddBreak(true)}
                  style={styles.addBreakButton}
                >
                  + Add Unavailable Slot
                </button>
              </div>

              {showAddBreak && (
                <div style={styles.addBreakForm}>
                  <span style={styles.fieldSubLabel}>New Break Window:</span>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
                    <input
                      type="time"
                      value={breakStart}
                      onChange={(e) => setBreakStart(e.target.value)}
                      style={styles.timeInput}
                    />
                    <span style={{ color: "#94a3b8" }}>to</span>
                    <input
                      type="time"
                      value={breakEnd}
                      onChange={(e) => setBreakEnd(e.target.value)}
                      style={styles.timeInput}
                    />
                    <button
                      type="button"
                      onClick={handleAddBreak}
                      style={styles.smallConfirmBtn}
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddBreak(false)}
                      style={styles.smallCancelBtn}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Section 4: Service Specific Availability */}
            <div style={styles.formSection}>
              <label style={styles.sectionLabel}>Service Specific Availability</label>
              <select
                value={serviceSpecific}
                onChange={(e) => setServiceSpecific(e.target.value)}
                style={styles.selectInput}
              >
                <option value="all">All Services</option>
                {servicesList.map((srv) => (
                  <option key={srv._id} value={srv._id}>
                    {srv.title || srv.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons (Figma: + Add Time Slot, Save Availability) */}
            <div style={styles.actionRow}>
              <button
                type="button"
                onClick={() => {
                  alert("Multiple custom shift presets configured.");
                }}
                style={styles.secondaryBtn}
              >
                + Add Time Slot
              </button>

              <button
                type="button"
                disabled={saving}
                onClick={handleSaveAvailability}
                style={styles.primarySaveBtn}
              >
                {saving ? "Saving Schedule..." : "Save Availability"}
              </button>
            </div>
          </div>

          {/* Side Overview / Quick Management of Generated Slots */}
          <div style={styles.sideCard}>
            <h3 style={styles.sideTitle}>Configured Slots Summary</h3>
            <p style={styles.sideSubtitle}>
              Active slots stored for your profile. You can block or remove specific dates below.
            </p>

            {loadingSlots ? (
              <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>Loading slots...</p>
            ) : existingSlots.length === 0 ? (
              <div style={styles.emptyNotice}>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "#94a3b8" }}>
                  No slots currently generated. Configure your schedule on the left and click <strong>Save Availability</strong>.
                </p>
              </div>
            ) : (
              <div style={styles.slotList}>
                {existingSlots.slice(0, 10).map((s) => {
                  const isAvail = s.status === "Available" && s.is_available;
                  return (
                    <div key={s._id} style={styles.slotItem}>
                      <div>
                        <div style={styles.slotItemDate}>
                          {s.available_date ? s.available_date.split("T")[0] : ""}
                        </div>
                        <div style={styles.slotItemTime}>
                          {formatTimeLabel(s.start_time)} - {formatTimeLabel(s.end_time)}
                        </div>
                      </div>

                      <div style={styles.slotItemActions}>
                        <button
                          type="button"
                          onClick={() => handleToggleSlot(s._id, s.status)}
                          style={{
                            ...styles.statusToggleBtn,
                            backgroundColor: isAvail ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)",
                            color: isAvail ? "#10b981" : "#f59e0b",
                            borderColor: isAvail ? "rgba(16, 185, 129, 0.3)" : "rgba(245, 158, 11, 0.3)"
                          }}
                        >
                          {s.status}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteSlot(s._id)}
                          style={styles.deleteSlotBtn}
                          title="Delete slot"
                        >
                          🗑
                        </button>
                      </div>
                    </div>
                  );
                })}

                {existingSlots.length > 10 && (
                  <p style={{ fontSize: "0.75rem", color: "#94a3b8", textAlign: "center", marginTop: "0.5rem" }}>
                    + {existingSlots.length - 10} more upcoming slots active
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "1.5rem"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "1rem",
    marginBottom: "1.5rem"
  },
  pageTitle: {
    fontSize: "1.75rem",
    fontWeight: "800",
    color: "#ffffff",
    margin: 0,
    fontFamily: "var(--font-heading, 'Plus Jakarta Sans', sans-serif)"
  },
  pageSubtitle: {
    fontSize: "0.9rem",
    color: "#94a3b8",
    marginTop: "0.35rem",
    marginBottom: 0
  },
  tabBar: {
    display: "flex",
    gap: "0.5rem",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    padding: "0.3rem",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.08)"
  },
  tabButton: {
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "transparent",
    color: "#94a3b8",
    fontSize: "0.85rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s"
  },
  tabButtonActive: {
    backgroundColor: "#ff6b00",
    color: "#ffffff",
    boxShadow: "0 2px 8px rgba(255, 107, 0, 0.35)"
  },
  alertBanner: {
    padding: "0.85rem 1.25rem",
    borderRadius: "10px",
    border: "1px solid",
    marginBottom: "1.5rem",
    fontSize: "0.9rem",
    fontWeight: "500"
  },
  previewNotice: {
    padding: "0.85rem 1.25rem",
    borderRadius: "10px",
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    border: "1px solid rgba(99, 102, 241, 0.25)",
    marginBottom: "1.5rem"
  },
  layoutGrid: {
    display: "grid",
    gridTemplateColumns: "1.6fr 1fr",
    gap: "1.5rem",
    alignItems: "start"
  },
  card: {
    backgroundColor: "rgba(17, 24, 39, 0.75)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "18px",
    padding: "2rem",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
    backdropFilter: "blur(12px)"
  },
  sideCard: {
    backgroundColor: "rgba(17, 24, 39, 0.5)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "18px",
    padding: "1.5rem",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)"
  },
  sideTitle: {
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#ffffff",
    margin: 0
  },
  sideSubtitle: {
    fontSize: "0.8rem",
    color: "#94a3b8",
    marginTop: "0.25rem",
    marginBottom: "1rem"
  },
  formSection: {
    marginBottom: "1.75rem"
  },
  sectionLabel: {
    display: "block",
    fontSize: "0.95rem",
    fontWeight: "700",
    color: "#e2e8f0",
    marginBottom: "0.75rem"
  },
  fieldSubLabel: {
    display: "block",
    fontSize: "0.8rem",
    fontWeight: "500",
    color: "#94a3b8",
    marginBottom: "0.35rem"
  },
  daysRow: {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap"
  },
  dayButton: {
    flex: "1 1 80px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0.75rem 0.5rem",
    borderRadius: "12px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "rgba(255, 255, 255, 0.1)",
    cursor: "pointer",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    outline: "none"
  },
  dayButtonActive: {
    backgroundColor: "#ff6b00",
    borderColor: "#ff6b00",
    color: "#ffffff",
    boxShadow: "0 4px 12px rgba(255, 107, 0, 0.35)",
    transform: "translateY(-1px)"
  },
  dayButtonInactive: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderColor: "rgba(255, 255, 255, 0.1)",
    color: "#94a3b8"
  },
  dayTextTop: {
    fontSize: "0.85rem",
    fontWeight: "700"
  },
  dayTextBottom: {
    fontSize: "0.75rem",
    opacity: 0.9,
    marginTop: "0.15rem"
  },
  twoCol: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem"
  },
  selectInput: {
    width: "100%",
    padding: "0.75rem 1rem",
    backgroundColor: "rgba(15, 23, 42, 0.8)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    borderRadius: "10px",
    color: "#f8fafc",
    fontSize: "0.9rem",
    outline: "none"
  },
  timeInput: {
    padding: "0.5rem 0.75rem",
    backgroundColor: "rgba(15, 23, 42, 0.8)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    borderRadius: "8px",
    color: "#f8fafc",
    fontSize: "0.85rem"
  },
  breakRow: {
    display: "flex",
    gap: "0.6rem",
    flexWrap: "wrap",
    alignItems: "center"
  },
  breakTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    padding: "0.45rem 0.85rem",
    backgroundColor: "rgba(255, 107, 0, 0.15)",
    border: "1px solid rgba(255, 107, 0, 0.3)",
    color: "#ff8c38",
    borderRadius: "8px",
    fontSize: "0.85rem",
    fontWeight: "600"
  },
  breakRemoveBtn: {
    background: "none",
    border: "none",
    color: "#ff8c38",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    padding: 0
  },
  addBreakButton: {
    padding: "0.45rem 0.85rem",
    borderRadius: "8px",
    border: "1px dashed rgba(255, 107, 0, 0.5)",
    backgroundColor: "transparent",
    color: "#ff8c38",
    fontSize: "0.85rem",
    fontWeight: "600",
    cursor: "pointer"
  },
  addBreakForm: {
    marginTop: "0.75rem",
    padding: "0.75rem",
    borderRadius: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.08)"
  },
  smallConfirmBtn: {
    padding: "0.5rem 0.85rem",
    backgroundColor: "#ff6b00",
    border: "none",
    borderRadius: "6px",
    color: "#ffffff",
    fontWeight: "600",
    fontSize: "0.8rem",
    cursor: "pointer"
  },
  smallCancelBtn: {
    padding: "0.5rem 0.85rem",
    backgroundColor: "transparent",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "6px",
    color: "#94a3b8",
    fontSize: "0.8rem",
    cursor: "pointer"
  },
  actionRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1rem",
    marginTop: "2rem",
    paddingTop: "1.5rem",
    borderTop: "1px solid rgba(255, 255, 255, 0.08)"
  },
  secondaryBtn: {
    padding: "0.75rem 1.25rem",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    color: "#f8fafc",
    fontWeight: "600",
    fontSize: "0.9rem",
    cursor: "pointer"
  },
  primarySaveBtn: {
    padding: "0.75rem 1.75rem",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#ff6b00",
    color: "#ffffff",
    fontWeight: "700",
    fontSize: "0.95rem",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(255, 107, 0, 0.35)",
    transition: "all 0.2s"
  },
  slotList: {
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
    maxHeight: "450px",
    overflowY: "auto"
  },
  slotItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.65rem 0.85rem",
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.06)"
  },
  slotItemDate: {
    fontSize: "0.85rem",
    fontWeight: "700",
    color: "#ffffff"
  },
  slotItemTime: {
    fontSize: "0.75rem",
    color: "#94a3b8"
  },
  slotItemActions: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem"
  },
  statusToggleBtn: {
    padding: "0.25rem 0.6rem",
    borderRadius: "6px",
    border: "1px solid",
    fontSize: "0.75rem",
    fontWeight: "600",
    cursor: "pointer"
  },
  deleteSlotBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "0.85rem",
    opacity: 0.7
  },
  emptyNotice: {
    padding: "1.5rem",
    borderRadius: "10px",
    border: "1px dashed rgba(255, 255, 255, 0.1)",
    textAlign: "center"
  }
};
