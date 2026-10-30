"use client";
import { useEffect, useState } from "react";

// const { data, meta, loading, error } = useApi(() => someService.call(), [deps], enabled)
export default function useApi(fetcher, deps = [], enabled = true) {
  const [state, setState] = useState({ data: null, meta: null, loading: true, error: "" });

  useEffect(() => {
    if (!enabled) return;
    let active = true;
    Promise.resolve()
      .then(() => {
        if (active) setState((s) => ({ ...s, loading: true, error: "" }));
        return fetcher();
      })
      .then((res) => active && setState({ data: res.data, meta: res.meta || null, loading: false, error: "" }))
      .catch((e) => active && setState({ data: null, meta: null, loading: false, error: e.message }));
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, enabled]);

  return state;
}