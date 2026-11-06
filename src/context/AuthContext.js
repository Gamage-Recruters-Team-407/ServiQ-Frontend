"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const storedToken = window.localStorage.getItem("serviq_token");
    if (!storedToken) {
      setLoading(false);
      return () => { active = false; };
    }
    setToken(storedToken);
    fetch(`${API_URL}/auth/me`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Session expired");
        if (active) {
          setUser(data.user);
          window.localStorage.setItem("serviq_user", JSON.stringify(data.user));
        }
      })
      .catch(() => {
        window.localStorage.removeItem("serviq_token");
        window.localStorage.removeItem("serviq_user");
        if (active) { setToken(null); setUser(null); }
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    window.localStorage.setItem("serviq_user", JSON.stringify(userData));
    window.localStorage.setItem("serviq_token", jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    window.localStorage.removeItem("serviq_user");
    window.localStorage.removeItem("serviq_token");
  };

  return <AuthContext.Provider value={{ user, token, role: user?.role || user?.user_role, loading, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
