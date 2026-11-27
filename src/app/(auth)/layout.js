"use client";

import { AuthProvider } from "@/context/AuthContext";

export default function AuthGroupLayout({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
