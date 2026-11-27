"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/services/authService";
import { USER_ROLES } from "@/utils/constants";
import {
  AuthAlert,
  AuthSplitShell,
  EyeToggleIcon,
  LockIcon,
  SocialAuthButtons,
  UserIcon
} from "@/components/auth/AuthShared";
import styles from "@/components/auth/auth.module.css";

function isValidIdentifier(value) {
  const trimmed = value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[\d\s\-()]{7,18}$/;
  return emailRegex.test(trimmed) || phoneRegex.test(trimmed);
}

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({});
  const [alert, setAlert] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errors = {};
    if (!identifier.trim()) {
      errors.identifier = "Please enter your email address or phone number.";
    } else if (!isValidIdentifier(identifier)) {
      errors.identifier = "Enter a valid email address or phone number.";
    }

    if (!password) {
      errors.password = "Please enter your password.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const resolveDashboardRoute = (role) => {
    if (role === USER_ROLES.ADMIN) return "/admin/dashboard";
    if (role === USER_ROLES.PROVIDER) return "/provider/dashboard";
    return "/customer/dashboard";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);

    if (!validate()) return;

    setSubmitting(true);
    try {
      const trimmed = identifier.trim();
      const isEmail = trimmed.includes("@");
      const payload = {
        ...(isEmail ? { email: trimmed.toLowerCase() } : { phone_number: trimmed }),
        identifier: trimmed,
        password,
        remember_me: rememberMe
      };

      const response = await authService.login(payload);
      const userData = response?.user || response?.data?.user;
      const jwtToken = response?.token || response?.data?.token;

      if (!userData) {
        setAlert({
          type: "error",
          message: "Authentication succeeded but no user profile was returned. Please try again."
        });
        return;
      }

      if (["Suspended", "Restricted", "Inactive"].includes(userData.account_status)) {
        setAlert({
          type: "error",
          message: `Access denied: Your account is currently ${userData.account_status}. Please contact support@serviq.lk.`
        });
        return;
      }

      if (userData.account_status === "Pending Verification") {
        setAlert({
          type: "warning",
          message: "Your account is pending verification. Please complete verification to continue."
        });
        return;
      }

      const userRole = userData.user_role || userData.role || USER_ROLES.CUSTOMER;
      login({ ...userData, role: userRole }, jwtToken || "");
      setAlert({
        type: "success",
        message: "Signed in successfully. Redirecting to your dashboard..."
      });

      router.push(resolveDashboardRoute(userRole));
    } catch (err) {
      const msg = err?.message || "Unable to sign in right now. Please check your credentials and try again.";
      setAlert({
        type: "error",
        message: msg.includes("Failed to fetch")
          ? "Unable to reach the authentication server. Please verify the backend service is running and try again."
          : msg
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSocialAuth = (provider) => {
    setAlert({
      type: "info",
      message: `${provider} single sign-on is not configured in this environment yet. Please sign in using your email or phone number.`
    });
  };

  return (
    <AuthSplitShell
      badge="WELCOME BACK"
      title="Manage Your Home Services with Confidence"
      subtitle="Access your active bookings, message providers directly, track progress, and view verified reviews."
      heroExtra={
        <div className={styles.testimonialCard}>
          <p className={styles.testimonialQuote}>
            &ldquo;ServiQ saved me hours. Found a licensed plumber within 10 minutes who fixed our
            leak on the same day!&rdquo;
          </p>
          <div className={styles.testimonialAuthor}>
            <span className={styles.authorAvatar}>SP</span>
            <div>
              <div className={styles.authorName}>Samantha Perera</div>
              <div className={styles.authorMeta}>Colombo 07 • Homeowner</div>
            </div>
          </div>
        </div>
      }
    >
      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>Welcome Back</h2>
        <p className={styles.formSubtitle}>
          Enter your email and password to access your dashboard.
        </p>
      </div>

      <AuthAlert type={alert?.type} message={alert?.message} />

      <form onSubmit={handleSubmit} className={styles.formStack} noValidate>
        <div className={styles.fieldGroup}>
          <label htmlFor="login-identifier" className={styles.fieldLabel}>
            Email or Phone Number
          </label>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIconLeft}>
              <UserIcon />
            </span>
            <input
              id="login-identifier"
              type="text"
              autoComplete="username"
              placeholder="ayesh.dilshan@example.com"
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
                if (fieldErrors.identifier) {
                  setFieldErrors((prev) => ({ ...prev, identifier: "" }));
                }
              }}
              className={`${styles.inputField} ${styles.inputFieldWithLeftIcon} ${
                fieldErrors.identifier ? styles.inputFieldError : ""
              }`}
              aria-invalid={Boolean(fieldErrors.identifier)}
            />
          </div>
          {fieldErrors.identifier && (
            <span className={styles.fieldErrorText}>{fieldErrors.identifier}</span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <div className={styles.fieldLabelRow}>
            <label htmlFor="login-password" className={styles.fieldLabel}>
              Password
            </label>
            <Link href="/forgot-password" className={styles.inlineLink}>
              Forgot Password?
            </Link>
          </div>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIconLeft}>
              <LockIcon />
            </span>
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (fieldErrors.password) {
                  setFieldErrors((prev) => ({ ...prev, password: "" }));
                }
              }}
              className={`${styles.inputField} ${styles.inputFieldWithLeftIcon} ${
                styles.inputFieldWithRightBtn
              } ${fieldErrors.password ? styles.inputFieldError : ""}`}
              aria-invalid={Boolean(fieldErrors.password)}
            />
            <button
              type="button"
              className={styles.eyeToggleBtn}
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <EyeToggleIcon visible={showPassword} />
            </button>
          </div>
          {fieldErrors.password && (
            <span className={styles.fieldErrorText}>{fieldErrors.password}</span>
          )}
        </div>

        <label className={styles.checkboxRow}>
          <input
            type="checkbox"
            className={styles.checkboxInput}
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <span>Keep me logged in for 30 days</span>
        </label>

        <button type="submit" className={styles.primaryBtn} disabled={submitting}>
          {submitting ? (
            <>
              <span className={styles.spinner} aria-hidden="true" />
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      <SocialAuthButtons onProviderClick={handleSocialAuth} disabled={submitting} />

      <p className={styles.formFooterText}>
        Don&apos;t have an account?{" "}
        <Link href="/register" className={styles.inlineLink}>
          Register Now
        </Link>
      </p>
    </AuthSplitShell>
  );
}
