"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { AuthAlert, EyeToggleIcon, MailIcon } from "@/components/auth/AuthShared";
import styles from "@/components/auth/auth.module.css";

function isValidIdentifier(value) {
  const trimmed = value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[\d\s\-()]{7,18}$/;
  return emailRegex.test(trimmed) || phoneRegex.test(trimmed);
}

export default function ForgotPasswordPage() {
  const router = useRouter();
  const otpRefs = useRef([]);

  const [identifier, setIdentifier] = useState("");
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [resendSeconds, setResendSeconds] = useState(0);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({});
  const [alert, setAlert] = useState(null);

  const isCooldownActive = otpSent && resendSeconds > 0;

  useEffect(() => {
    if (!isCooldownActive) return;
    const timer = setInterval(() => {
      setResendSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [isCooldownActive]);

  const otpCode = otpDigits.join("");
  const isStepTwoReady = otpSent || otpCode.length === 6;

  const handleSendOtp = async () => {
    setAlert(null);
    if (!identifier.trim()) {
      setFieldErrors((prev) => ({
        ...prev,
        identifier: "Enter your registered email address."
      }));
      return;
    }
    if (!isValidIdentifier(identifier)) {
      setFieldErrors((prev) => ({
        ...prev,
        identifier: "Enter a valid email address."
      }));
      return;
    }

    setSendingOtp(true);
    try {
      const trimmed = identifier.trim();
      await authService.requestPasswordReset({
        ...(trimmed.includes("@") ? { email: trimmed.toLowerCase() } : { phone_number: trimmed }),
        identifier: trimmed
      });
      setOtpSent(true);
      setResendSeconds(45);
      setOtpDigits(["", "", "", "", "", ""]);
      setFieldErrors((prev) => ({ ...prev, otp: "" }));
      setAlert({
        type: "success",
        message: "A 6-digit verification code has been sent to your registered contact."
      });
      otpRefs.current[0]?.focus();
    } catch (err) {
      const msg = err?.message || "Could not send verification code. Please try again.";
      setAlert({
        type: "error",
        message: msg.includes("Failed to fetch")
          ? "Unable to reach the recovery service. Please verify the backend server is running and try again."
          : msg
      });
    } finally {
      setSendingOtp(false);
    }
  };

  const handleOtpChange = (index, rawValue) => {
    const cleaned = rawValue.replace(/\D/g, "");
    if (!cleaned) {
      const next = [...otpDigits];
      next[index] = "";
      setOtpDigits(next);
      return;
    }

    if (cleaned.length > 1) {
      const next = [...otpDigits];
      cleaned
        .slice(0, 6 - index)
        .split("")
        .forEach((digit, offset) => {
          next[index + offset] = digit;
        });
      setOtpDigits(next);
      const focusIdx = Math.min(index + cleaned.length, 5);
      otpRefs.current[focusIdx]?.focus();
    } else {
      const next = [...otpDigits];
      next[index] = cleaned;
      setOtpDigits(next);
      if (index < 5) {
        otpRefs.current[index + 1]?.focus();
      }
    }

    if (fieldErrors.otp) {
      setFieldErrors((prev) => ({ ...prev, otp: "" }));
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    e.preventDefault();
    const next = ["", "", "", "", "", ""];
    pasted.split("").forEach((digit, idx) => {
      next[idx] = digit;
    });
    setOtpDigits(next);
    const focusIdx = Math.min(pasted.length, 5);
    otpRefs.current[focusIdx]?.focus();
    if (fieldErrors.otp) {
      setFieldErrors((prev) => ({ ...prev, otp: "" }));
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setAlert(null);

    const errors = {};
    if (!identifier.trim() || !isValidIdentifier(identifier)) {
      errors.identifier = "Enter a valid registered email address or phone number.";
    }
    if (otpCode.length !== 6) {
      errors.otp = "Enter all 6 digits of your verification code.";
    }
    if (!newPassword || newPassword.length < 8) {
      errors.newPassword = "New password must be at least 8 characters.";
    }

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setResetting(true);
    try {
      const trimmed = identifier.trim();
      await authService.resetPassword({
        ...(trimmed.includes("@") ? { email: trimmed.toLowerCase() } : { phone_number: trimmed }),
        identifier: trimmed,
        otp: otpCode,
        new_password: newPassword
      });
      setResetDone(true);
      setAlert({
        type: "success",
        message: "Password reset successfully! You can now sign in with your new password."
      });
    } catch (err) {
      const msg = err?.message || "Failed to reset password. Please verify your code and try again.";
      setAlert({
        type: "error",
        message: msg.includes("Failed to fetch")
          ? "Unable to reach the recovery service. Please verify the backend server is running and try again."
          : msg
      });
    } finally {
      setResetting(false);
    }
  };

  const readyToSave = otpCode.length === 6 && newPassword.length >= 8;

  return (
    <div className={styles.recoveryPage}>
      <div className={styles.recoveryCard}>
        <div className={styles.recoveryTopBar}>
          <Link href="/login" className={styles.backLink}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M19 12H5M11 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Login
          </Link>
          <span className={styles.stepPill}>{isStepTwoReady ? "Step 2 of 2" : "Step 1 of 2"}</span>
        </div>

        <div className={styles.recoveryIconCircle} aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.9" />
            <path
              d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className={styles.recoveryTitle}>Forgot Password?</h1>
        <p className={styles.recoverySubtitle}>
          No worries! Enter your registered email address and we will send you a
          verification code to reset it.
        </p>

        <AuthAlert type={alert?.type} message={alert?.message} />

        {resetDone ? (
          <div className={styles.formStack}>
            <button
              type="button"
              className={styles.primaryBtn}
              onClick={() => router.push("/login")}
            >
              Return to Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleResetPassword} className={styles.formStack} noValidate>
            <div className={styles.fieldGroup}>
              <label htmlFor="recovery-identifier" className={styles.fieldLabel}>
                Registered Email
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIconLeft}>
                  <MailIcon />
                </span>
                <input
                  id="recovery-identifier"
                  type="text"
                  autoComplete="email"
                  placeholder="ayesh.dilshan@example.com"
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    if (fieldErrors.identifier) {
                      setFieldErrors((prev) => ({ ...prev, identifier: "" }));
                    }
                  }}
                  className={`${styles.inputField} ${styles.inputFieldWithLeftIcon} ${fieldErrors.identifier ? styles.inputFieldError : ""
                    }`}
                  aria-invalid={Boolean(fieldErrors.identifier)}
                />
              </div>
              {fieldErrors.identifier && (
                <span className={styles.fieldErrorText}>{fieldErrors.identifier}</span>
              )}
            </div>

            <button
              type="button"
              className={styles.primaryBtn}
              onClick={handleSendOtp}
              disabled={sendingOtp || isCooldownActive}
            >
              {sendingOtp ? (
                <>
                  <span className={styles.spinner} aria-hidden="true" />
                  Sending 6-Digit OTP...
                </>
              ) : isCooldownActive ? (
                `OTP Sent (Resend in ${resendSeconds}s)`
              ) : otpSent ? (
                "Resend 6-Digit OTP Code"
              ) : (
                "Send 6-Digit OTP Code"
              )}
            </button>

            <div className={styles.otpPanel}>
              <div className={styles.otpHeader}>
                <span className={styles.otpTitle}>Enter 6-Digit Verification Code</span>
                <button
                  type="button"
                  className={styles.resendBtn}
                  onClick={handleSendOtp}
                  disabled={sendingOtp || isCooldownActive}
                >
                  {sendingOtp
                    ? "Sending..."
                    : isCooldownActive
                      ? `Resend Code (${resendSeconds}s)`
                      : "Resend Code"}
                </button>
              </div>

              <div className={styles.otpGrid} onPaste={handleOtpPaste}>
                {otpDigits.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      otpRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    placeholder="-"
                    aria-label={`Verification code digit ${index + 1}`}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className={`${styles.otpInput} ${fieldErrors.otp ? styles.inputFieldError : ""
                      }`}
                  />
                ))}
              </div>
              {fieldErrors.otp && (
                <span className={styles.fieldErrorText} style={{ display: "block", marginTop: "0.5rem" }}>
                  {fieldErrors.otp}
                </span>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="recovery-new-password" className={styles.fieldLabel}>
                Set New Password
              </label>
              <div className={styles.inputWrapper}>
                <input
                  id="recovery-new-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (fieldErrors.newPassword) {
                      setFieldErrors((prev) => ({ ...prev, newPassword: "" }));
                    }
                  }}
                  className={`${styles.inputField} ${styles.inputFieldWithRightBtn} ${fieldErrors.newPassword ? styles.inputFieldError : ""
                    }`}
                  aria-invalid={Boolean(fieldErrors.newPassword)}
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
              {fieldErrors.newPassword && (
                <span className={styles.fieldErrorText}>{fieldErrors.newPassword}</span>
              )}
            </div>

            <button
              type="submit"
              className={readyToSave ? styles.primaryBtn : styles.outlineOrangeBtn}
              disabled={resetting}
            >
              {resetting ? (
                <>
                  <span className={styles.spinner} aria-hidden="true" />
                  Resetting Password...
                </>
              ) : (
                "Reset & Save Password"
              )}
            </button>
          </form>
        )}

        <div className={styles.supportBox}>
          <div>Need help? Contact our 24/7 Support at</div>
          <a href="mailto:support@serviq.lk" className={styles.supportEmail}>
            support@serviq.lk
          </a>
        </div>
      </div>
    </div>
  );
}
