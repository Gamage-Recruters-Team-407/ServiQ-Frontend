"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { USER_ROLES } from "@/utils/constants";
import { authService } from "@/services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state on mount
  useEffect(() => {
    async function initAuth() {
      try {
        const storedToken = localStorage.getItem("serviq_token");
        const storedUser = localStorage.getItem("serviq_user");

        if (storedToken) {
          setToken(storedToken);

          if (storedUser) {
            try {
              setUser(JSON.parse(storedUser));
            } catch (e) {
              console.error("Failed to parse stored user", e);
            }
          }

          // Verify token against backend
          try {
            const res = await authService.getCurrentUser();
            if (res && res.user) {
              setUser(res.user);
              localStorage.setItem("serviq_user", JSON.stringify(res.user));
            }
          } catch (err) {
            // If token expired, clear invalid session
            if (err?.code === "TOKEN_EXPIRED" || err?.status === 401) {
              logout();
            }
          }
        }
      } catch (err) {
        console.error("Auth init error:", err);
      } finally {
        setLoading(false);
      }
    }

    initAuth();
  }, []);

  // Login handler
  const login = async (credentials) => {
    const data = await authService.login(credentials);
    if (data && data.token && data.user) {
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("serviq_user", JSON.stringify(data.user));
      localStorage.setItem("serviq_token", data.token);
    }
    return data;
  };

  // Register handler
  const register = async (userData) => {
    const data = await authService.register(userData);
    if (data && data.token && data.user) {
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("serviq_user", JSON.stringify(data.user));
      localStorage.setItem("serviq_token", data.token);
    }
    return data;
  };

  // Logout handler
  const logout = async () => {
    try {
      await authService.logout().catch(() => {});
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem("serviq_user");
      localStorage.removeItem("serviq_token");
    }
  };

  const role = user?.user_role || user?.role;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role,
        loading,
        isAuthenticated: !!token && !!user,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
