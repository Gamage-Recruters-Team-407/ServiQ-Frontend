"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { USER_ROLES } from "@/utils/constants";
import { authService } from "@/services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem("serviq_logged_out") === "1") {
        setUser(null);
        setToken(null);
        return;
      }

      const storedUser = localStorage.getItem("serviq_user");
      const storedToken = localStorage.getItem("serviq_token");
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } else {
        setUser(null);
        setToken(null);
      }
    } catch (err) {
      console.error("Failed to parse stored user", err);
      setUser(null);
      setToken(null);
    } finally {
      setAuthReady(true);
    }
  }, []);

  const switchRole = (role) => {
    localStorage.removeItem("serviq_logged_out");
    let mockUser = { ...(user || {}), role, user_role: role };
    if (role === USER_ROLES.PROVIDER) {
      mockUser = {
        id: "usr_mock_provider_01",
        first_name: "Nimal",
        last_name: "Silva",
        email: "nimal.silva@services.lk",
        role: USER_ROLES.PROVIDER,
        user_role: USER_ROLES.PROVIDER,
        provider_type: "Individual",
        account_status: "Active",
        verification_status: "Verified"
      };
    } else if (role === USER_ROLES.ADMIN) {
      mockUser = {
        id: "usr_mock_admin_01",
        first_name: "Admin",
        last_name: "Operator",
        email: "admin@serviq.lk",
        role: USER_ROLES.ADMIN,
        user_role: USER_ROLES.ADMIN,
        account_status: "Active"
      };
    } else {
      mockUser = {
        id: "usr_mock_customer_01",
        first_name: "Kamal",
        last_name: "Perera",
        email: "kamal.perera@example.com",
        role: USER_ROLES.CUSTOMER,
        user_role: USER_ROLES.CUSTOMER,
        account_status: "Active"
      };
    }
    setUser(mockUser);
    setToken("mock_role_switch_token");
    localStorage.setItem("serviq_user", JSON.stringify(mockUser));
    localStorage.setItem("serviq_token", "mock_role_switch_token");
    setAuthReady(true);
  };

  const login = (userData, jwtToken) => {
    localStorage.removeItem("serviq_logged_out");
    setUser(userData);
    setToken(jwtToken || null);
    localStorage.setItem("serviq_user", JSON.stringify(userData));
    if (jwtToken) {
      localStorage.setItem("serviq_token", jwtToken);
    } else {
      localStorage.removeItem("serviq_token");
    }
    setAuthReady(true);
  };

  const logout = async () => {
    setIsLoggingOut(true);
    let serverRevoked = false;
    const activeToken =
      token || (typeof window !== "undefined" ? localStorage.getItem("serviq_token") : null);

    try {
      if (activeToken && activeToken !== "mock_role_switch_token") {
        await authService.logout();
        serverRevoked = true;
      }
    } catch (err) {
      // Clear local session even if server is offline or token already expired
      console.warn("Server logout request failed; clearing local session.", err);
    } finally {
      setUser(null);
      setToken(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("serviq_user");
        localStorage.removeItem("serviq_token");
        localStorage.setItem("serviq_logged_out", "1");
      }
      setIsLoggingOut(false);
    }

    return { success: true, serverRevoked };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role: user?.user_role || user?.role || null,
        authReady,
        isAuthenticated: Boolean(user && token),
        isLoggingOut,
        switchRole,
        login,
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
