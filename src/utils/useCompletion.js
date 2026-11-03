"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { completionService } from "@/services/completionService";

const TERMINAL = ["Completed", "Cancelled", "Disputed"];

// Loads the progress record for a booking. `notFound` is true when tracking has not started yet.
// pollMs > 0 refreshes quietly while the job is still active (used for the customer's live view).
export default function useCompletion(bookingId, { pollMs = 0 } = {}) {
  const [state, setState] = useState({ completion: null, loading: true, error: "", notFound: false });
  const mounted = useRef(true);

  const load = useCallback(
    async (silent = false) => {
      try {
        if (!silent) setState((s) => ({ ...s, loading: true, error: "" }));
        const res = await completionService.getByBooking(bookingId);
        if (mounted.current) setState({ completion: res.data, loading: false, error: "", notFound: false });
      } catch (e) {
        if (!mounted.current) return;
        if (e.code === "COMPLETION_NOT_FOUND") setState({ completion: null, loading: false, error: "", notFound: true });
        else setState((s) => ({ ...s, loading: false, error: silent && s.completion ? "" : e.message }));
      }
    },
    [bookingId]
  );

  useEffect(() => {
    mounted.current = true;
    load();
    return () => {
      mounted.current = false;
    };
  }, [load]);

  const status = state.completion?.status;
  useEffect(() => {
    if (!pollMs || !status || TERMINAL.includes(status)) return;
    const timer = setInterval(() => {
      if (document.visibilityState === "visible") load(true);
    }, pollMs);
    return () => clearInterval(timer);
  }, [pollMs, status, load]);

  const setCompletion = useCallback((completion) => setState((s) => ({ ...s, completion, notFound: false })), []);

  return { ...state, reload: () => load(true), setCompletion };
}
