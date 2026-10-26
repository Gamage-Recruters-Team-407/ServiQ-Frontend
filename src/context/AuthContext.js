"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { USER_ROLES } from "@/utils/constants";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Default mock user for testing all portals seamlessly
  const [user, setUser] = useState({
    id: "usr_mock_customer_01",
    first_name: "Kamal",
    last_name: "Perera",
    email: "kamal.perera@example.com",
    role: USER_ROLES.CUSTOMER,
    profile_image: null,
    account_status: "Active"
  });

  const [token, setToken] = useState(null);

  useEffect(() => {
    // Sync with localStorage if available
    const storedUser = localStorage.getItem("serviq_user");
    const storedToken = localStorage.getItem("serviq_token");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse stored user", err);
      }
    }
    if (storedToken) setToken(storedToken);
  }, []);

  const switchRole = (role) => {
    let mockUser = { ...user, role };
    if (role === USER_ROLES.PROVIDER) {
      mockUser = {
        id: "usr_mock_provider_01",
        first_name: "Nimal",
        last_name: "Silva",
        email: "nimal.silva@services.lk",
        role: USER_ROLES.PROVIDER,
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
        account_status: "Active"
      };
    } else {
      mockUser = {
        id: "usr_mock_customer_01",
        first_name: "Kamal",
        last_name: "Perera",
        email: "kamal.perera@example.com",
        role: USER_ROLES.CUSTOMER,
        account_status: "Active"
      };
    }
    setUser(mockUser);
    localStorage.setItem("serviq_user", JSON.stringify(mockUser));
  };

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("serviq_user", JSON.stringify(userData));
    localStorage.setItem("serviq_token", jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("serviq_user");
    localStorage.removeItem("serviq_token");
  };

  return (
    <AuthContext.Provider value={{ user, token, role: user?.role, switchRole, login, logout }}>
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
