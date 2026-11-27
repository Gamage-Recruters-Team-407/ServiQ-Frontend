"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/services/authService";
import { USER_ROLES } from "@/utils/constants";
import {
  AuthAlert,
  AuthSplitShell,
  CheckIcon,
  EyeToggleIcon,
  LockIcon,
  MailIcon,
  PhoneIcon,
  SocialAuthButtons,
  UserIcon,
  WrenchIcon
} from "@/components/auth/AuthShared";
import styles from "@/components/auth/auth.module.css";

const HERO_FEATURES = [
  "AI-Assisted smart provider matching",
  "100% verified IDs & background checks",
  "Transparent fixed pricing & secure escrows"
];

function RegisterFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [role, setRole] = useState(USER_ROLES.CUSTOMER);
  const [providerType, setProviderType] = useState("Individual");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [alert, setAlert] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const requestedRole = searchParams.get("role");
    if (requestedRole && requestedRole.toLowerCase() === "provider") {
      setRole(USER_ROLES.PROVIDER);
    }
  }, [searchParams]);

  const clearFieldError = (key) => {
    if (fieldErrors[key]) {
      setFieldErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const validate = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s\-()]{7,18}$/;

    if (!firstName.trim()) errors.firstName = "First name is required.";
    if (!lastName.trim()) errors.lastName = "Last name is required.";

    if (!email.trim()) {
      errors.email = "Email address is required.";
    } else if (!emailRegex.test(email.trim())) {
      errors.email = "Enter a valid email address.";
    }

    if (!phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required.";
    } else if (!phoneRegex.test(phoneNumber.trim())) {
      errors.phoneNumber = "Enter a valid phone number.";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 8) {
      errors.password = "Use at least 8 characters.";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Confirm your password.";
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match.";
    }

    if (!agreedToTerms) {
      errors.agreedToTerms = "You must agree to the Terms of Service & Privacy Policy.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);

    if (!validate()) return;

    setSubmitting(true);
    try {
      const payload = {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim().toLowerCase(),
        phone_number: phoneNumber.trim(),
        password,
        user_role: role,
        ...(role === USER_ROLES.PROVIDER ? { provider_type: providerType } : {})
      };

      const response = await authService.register(payload);
      const userData = response?.user || response?.data?.user;
      const jwtToken = response?.token || response?.data?.token;

      if (userData && jwtToken) {
        const userRole = userData.user_role || userData.role || role;
        login({ ...userData, role: userRole }, jwtToken);
        setAlert({
          type: "success",
          message: "Account created! Redirecting to your portal..."
        });
        router.push(
          userRole === USER_ROLES.PROVIDER ? "/provider/dashboard" : "/customer/dashboard"
        );
      } else {
        setAlert({
          type: "success",
          message:
            response?.message ||
            "Your ServiQ account has been created successfully. Redirecting to Sign In..."
        });
        setTimeout(() => router.push("/login"), 1200);
      }
    } catch (err) {
      const msg = err?.message || "Unable to create account. Please try again.";
      setAlert({
        type: "error",
        message: msg.includes("Failed to fetch")
          ? "Unable to reach the registration server. Please verify the backend service is running and try again."
          : msg
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSocialAuth = (provider) => {
    setAlert({
      type: "info",
      message: `${provider} registration is not configured in this environment yet. Please complete the form below to register.`
    });
  };

  return (
    <AuthSplitShell
      badge="AI-POWERED MARKETPLACE"
      title="Connect with Top Verified Local Experts"
      subtitle="Book trusted professionals for home repairs, cleaning, plumbing, electrical works, and more at transparent prices."
      heroExtra={
        <ul className={styles.featureList}>
          {HERO_FEATURES.map((item) => (
            <li key={item} className={styles.featureItem}>
              <span className={styles.featureCheck}>
                <CheckIcon />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      }
    >
      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>Create an Account</h2>
        <p className={styles.formSubtitle}>
          Join us today. Book services or offer your expert skills.
        </p>
      </div>

      {/* Role Segmented Toggle */}
      <div className={styles.roleSwitch} role="tablist" aria-label="Select account role">
        <button
          type="button"
          role="tab"
          aria-selected={role === USER_ROLES.CUSTOMER}
          className={`${styles.roleTab} ${
            role === USER_ROLES.CUSTOMER ? styles.roleTabActive : ""
          }`}
          onClick={() => setRole(USER_ROLES.CUSTOMER)}
        >
          <UserIcon />
          <span>Customer</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={role === USER_ROLES.PROVIDER}
          className={`${styles.roleTab} ${
            role === USER_ROLES.PROVIDER ? styles.roleTabActive : ""
          }`}
          onClick={() => setRole(USER_ROLES.PROVIDER)}
        >
          <WrenchIcon />
          <span>Service Provider</span>
        </button>
      </div>

      {role === USER_ROLES.PROVIDER && (
        <div className={styles.providerTypeRow}>
          <span style={{ fontWeight: 600 }}>Provider Type:</span>
          <div className={styles.providerTypePills}>
            {["Individual", "Business"].map((type) => (
              <button
                key={type}
                type="button"
                className={`${styles.providerTypePill} ${
                  providerType === type ? styles.providerTypePillActive : ""
                }`}
                onClick={() => setProviderType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      )}

      <AuthAlert type={alert?.type} message={alert?.message} />

      <form onSubmit={handleSubmit} className={styles.formStack} noValidate>
        <div className={styles.twoColRow}>
          <div className={styles.fieldGroup}>
            <label htmlFor="reg-first-name" className={styles.fieldLabel}>
              First Name
            </label>
            <input
              id="reg-first-name"
              type="text"
              autoComplete="given-name"
              placeholder="Ayesh"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                clearFieldError("firstName");
              }}
              className={`${styles.inputField} ${
                fieldErrors.firstName ? styles.inputFieldError : ""
              }`}
              aria-invalid={Boolean(fieldErrors.firstName)}
            />
            {fieldErrors.firstName && (
              <span className={styles.fieldErrorText}>{fieldErrors.firstName}</span>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="reg-last-name" className={styles.fieldLabel}>
              Last Name
            </label>
            <input
              id="reg-last-name"
              type="text"
              autoComplete="family-name"
              placeholder="Dilshan"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                clearFieldError("lastName");
              }}
              className={`${styles.inputField} ${
                fieldErrors.lastName ? styles.inputFieldError : ""
              }`}
              aria-invalid={Boolean(fieldErrors.lastName)}
            />
            {fieldErrors.lastName && (
              <span className={styles.fieldErrorText}>{fieldErrors.lastName}</span>
            )}
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="reg-email" className={styles.fieldLabel}>
            Email Address
          </label>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIconLeft}>
              <MailIcon />
            </span>
            <input
              id="reg-email"
              type="email"
              autoComplete="email"
              placeholder="ayesh.dilshan@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearFieldError("email");
              }}
              className={`${styles.inputField} ${styles.inputFieldWithLeftIcon} ${
                fieldErrors.email ? styles.inputFieldError : ""
              }`}
              aria-invalid={Boolean(fieldErrors.email)}
            />
          </div>
          {fieldErrors.email && (
            <span className={styles.fieldErrorText}>{fieldErrors.email}</span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="reg-phone" className={styles.fieldLabel}>
            Phone Number
          </label>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIconLeft}>
              <PhoneIcon />
            </span>
            <input
              id="reg-phone"
              type="tel"
              autoComplete="tel"
              placeholder="+94 77 123 4567"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                clearFieldError("phoneNumber");
              }}
              className={`${styles.inputField} ${styles.inputFieldWithLeftIcon} ${
                fieldErrors.phoneNumber ? styles.inputFieldError : ""
              }`}
              aria-invalid={Boolean(fieldErrors.phoneNumber)}
            />
          </div>
          {fieldErrors.phoneNumber && (
            <span className={styles.fieldErrorText}>{fieldErrors.phoneNumber}</span>
          )}
        </div>

        <div className={styles.twoColRow}>
          <div className={styles.fieldGroup}>
            <label htmlFor="reg-password" className={styles.fieldLabel}>
              Password
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIconLeft}>
                <LockIcon />
              </span>
              <input
                id="reg-password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearFieldError("password");
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

          <div className={styles.fieldGroup}>
            <label htmlFor="reg-confirm-password" className={styles.fieldLabel}>
              Confirm Password
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIconLeft}>
                <LockIcon />
              </span>
              <input
                id="reg-confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  clearFieldError("confirmPassword");
                }}
                className={`${styles.inputField} ${styles.inputFieldWithLeftIcon} ${
                  styles.inputFieldWithRightBtn
                } ${fieldErrors.confirmPassword ? styles.inputFieldError : ""}`}
                aria-invalid={Boolean(fieldErrors.confirmPassword)}
              />
              <button
                type="button"
                className={styles.eyeToggleBtn}
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              >
                <EyeToggleIcon visible={showConfirmPassword} />
              </button>
            </div>
            {fieldErrors.confirmPassword && (
              <span className={styles.fieldErrorText}>{fieldErrors.confirmPassword}</span>
            )}
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.checkboxRow}>
            <input
              type="checkbox"
              className={styles.checkboxInput}
              checked={agreedToTerms}
              onChange={(e) => {
                setAgreedToTerms(e.target.checked);
                clearFieldError("agreedToTerms");
              }}
            />
            <span>
              I agree to the{" "}
              <button
                type="button"
                className={styles.inlineLink}
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                onClick={() =>
                  setAlert({
                    type: "info",
                    message:
                      "ServiQ Terms of Service ensure transparent pricing, escrow protection, and verified marketplace conduct."
                  })
                }
              >
                Terms of Service
              </button>{" "}
              &amp;{" "}
              <button
                type="button"
                className={styles.inlineLink}
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                onClick={() =>
                  setAlert({
                    type: "info",
                    message:
                      "ServiQ Privacy Policy protects your personal and contact data in compliance with SRS §26.1 security controls."
                  })
                }
              >
                Privacy Policy
              </button>
            </span>
          </label>
          {fieldErrors.agreedToTerms && (
            <span className={styles.fieldErrorText}>{fieldErrors.agreedToTerms}</span>
          )}
        </div>

        <button type="submit" className={styles.primaryBtn} disabled={submitting}>
          {submitting ? (
            <>
              <span className={styles.spinner} aria-hidden="true" />
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <SocialAuthButtons onProviderClick={handleSocialAuth} disabled={submitting} />

      <p className={styles.formFooterText}>
        Already have an account?{" "}
        <Link href="/login" className={styles.inlineLink}>
          Log In
        </Link>
      </p>
    </AuthSplitShell>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterFormContent />
    </Suspense>
  );
}
