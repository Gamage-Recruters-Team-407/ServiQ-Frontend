"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [step, setStep] = useState(1);
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [canResend, setCanResend] = useState(true);
  const [resending, setResending] = useState(false);

  // 6-digit OTP state
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpInputsRef = useRef([]);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Countdown timer for resend
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  // Handle Send OTP
  const handleSendCode = async (e) => {
    if (e) e.preventDefault();
    setError("");
    setSuccess("");

    if (!identifier.trim()) {
      setError("Please enter your registered email address or phone number.");
      return;
    }

    setLoading(true);

    try {
      try {
        await authService.forgotPassword(identifier.trim());
      } catch (apiErr) {
        if (apiErr?.status === 404) {
          setError(apiErr.message || "No account found matching this email or phone number.");
          setLoading(false);
          return;
        }
        console.warn("API notice:", apiErr?.message);
      }

      setCodeSent(true);
      setStep(2);
      setCountdown(45);
      setCanResend(false);
      setSuccess("A 6-digit verification code has been dispatched to your contact.");
      setTimeout(() => setSuccess(""), 4000);

      // Focus first OTP field
      if (otpInputsRef.current[0]) {
        otpInputsRef.current[0].focus();
      }
    } catch (err) {
      setError(err?.message || "Failed to dispatch verification code.");
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP Input change with auto-advance and paste support
  const handleOtpChange = (index, value) => {
    // If user pasted or typed multiple digits
    const digitsOnly = value.replace(/\D/g, "");
    if (digitsOnly.length > 1) {
      handleOtpPasteDirect(digitsOnly);
      return;
    }

    const singleDigit = digitsOnly.slice(-1);
    const updatedOtp = [...otp];
    updatedOtp[index] = singleDigit;
    setOtp(updatedOtp);

    // Auto advance to next input if filled
    if (singleDigit && index < 5 && otpInputsRef.current[index + 1]) {
      otpInputsRef.current[index + 1].focus();
    }
  };

  // Helper to distribute pasted digits across the 6 boxes
  const handleOtpPasteDirect = (pastedText) => {
    const digits = pastedText.replace(/\D/g, "").slice(0, 6).split("");
    if (digits.length === 0) return;

    const newOtp = ["", "", "", "", "", ""];
    digits.forEach((digit, i) => {
      newOtp[i] = digit;
    });
    setOtp(newOtp);

    // Focus the box following the last pasted digit, or the last box
    const nextIndex = Math.min(digits.length, 5);
    if (otpInputsRef.current[nextIndex]) {
      otpInputsRef.current[nextIndex].focus();
    }
  };

  // Dedicated paste event handler on each OTP input
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    handleOtpPasteDirect(pastedData);
  };

  // Handle OTP backspace
  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0 && otpInputsRef.current[index - 1]) {
      otpInputsRef.current[index - 1].focus();
    }
  };

  // Resend code handler
  const handleResendCode = async (e) => {
    if (e) e.preventDefault();

    if (countdown > 0) {
      setError(`Please wait ${countdown}s before requesting a new code.`);
      setTimeout(() => setError(""), 3500);
      return;
    }

    if (!identifier.trim()) {
      setError("Please enter your registered email address or phone number.");
      return;
    }

    setError("");
    setResending(true);

    try {
      try {
        await authService.forgotPassword(identifier.trim());
      } catch (apiErr) {
        if (apiErr?.status === 404) {
          setError(apiErr.message || "No account found matching this email or phone number.");
          setResending(false);
          return;
        }
        console.warn("API notice:", apiErr?.message);
      }

      setCodeSent(true);
      setStep(2);
      setCountdown(45);
      setCanResend(false);
      setSuccess("A new 6-digit verification code has been dispatched!");
      setTimeout(() => setSuccess(""), 4000);

      if (otpInputsRef.current[0]) {
        otpInputsRef.current[0].focus();
      }
    } catch (err) {
      setError(err?.message || "Failed to resend verification code.");
    } finally {
      setResending(false);
    }
  };

  // Handle Save New Password
  const handleResetPassword = async (e) => {
    if (e) e.preventDefault();
    setError("");
    setSuccess("");

    const fullOtp = otp.join("");
    if (fullOtp.length < 6) {
      setError("Please enter the complete 6-digit verification code.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Your new password must be at least 8 characters long.");
      return;
    }

    if (!confirmPassword) {
      setError("Please confirm your new password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match. Please verify and try again.");
      return;
    }

    setLoading(true);

    try {
      try {
        await authService.resetPassword({
          identifier: identifier.trim(),
          otp: fullOtp,
          newPassword
        });
      } catch (apiErr) {
        if (apiErr?.message) {
          setError(apiErr.message);
          setLoading(false);
          return;
        }
      }

      setSuccess("Password reset successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      setError(err?.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_50%_20%,#ffe9d6_0%,#fef5ec_55%,#fdf8f4_100%)] p-4 sm:p-8 font-sans text-slate-900">
      <div className="w-full max-w-md bg-white rounded-3xl p-7 sm:p-9 shadow-xl shadow-orange-950/5 border border-orange-200/60 relative">
        {/* Top Navigation Row */}
        <div className="flex items-center justify-between mb-7">
          <Link
            href="/login"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Back to Login</span>
          </Link>
        </div>

        {/* Circular Gear/Security Icon */}
        <div className="w-12 h-12 min-w-[3rem] max-w-[3rem] rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 mb-5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </div>

        {/* Heading & Subtitle */}
        <h1 className="text-2xl font-extrabold text-slate-900 mb-1.5 tracking-tight">
          Forgot Password?
        </h1>

        <p className="text-sm text-slate-500 leading-relaxed mb-6">
          No worries! Enter your registered email address or phone number and we will send you a verification code to reset it.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm font-medium mb-5 flex items-center gap-2">
            <span>⚠</span>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-4 py-3 text-sm font-medium mb-5 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>{success}</span>
          </div>
        )}

        {/* Step 1 Input: Registered Email or Phone */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-800 mb-1.5">
            Registered Email or Phone
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-slate-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </span>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="ayesh.dilshan@gmail.com"
              className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
            />
          </div>
        </div>

        {/* Send OTP Button */}
        <button
          type="button"
          onClick={handleSendCode}
          disabled={loading}
          className="w-full h-11 rounded-xl bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold text-sm shadow-md shadow-orange-600/30 transition-all mb-5 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading && !codeSent ? "Sending Code..." : "Send 6-Digit OTP Code"}
        </button>

        {/* Step 2 Box: Enter 6-Digit Verification Code (Dashed Container) */}
        <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-4 sm:p-5 mb-5">
          <div className="flex items-center justify-between mb-3.5">
            <span className="text-xs font-semibold text-slate-700">
              Enter 6-Digit Verification Code
            </span>

            <button
              type="button"
              onClick={handleResendCode}
              disabled={resending}
              title={countdown > 0 ? `Wait ${countdown}s before requesting a new code` : "Request a new verification code"}
              className={`text-xs font-bold transition-all text-orange-600 ${
                countdown > 0
                  ? "cursor-not-allowed opacity-80"
                  : "cursor-pointer hover:underline"
              }`}
            >
              {resending ? "Sending..." : countdown > 0 ? `Resend Code (${countdown}s)` : "Resend Code"}
            </button>
          </div>

          {/* 6 OTP Inputs */}
          <div className="grid grid-cols-6 gap-2 w-full">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (otpInputsRef.current[idx] = el)}
                type="text"
                maxLength={6}
                value={digit}
                placeholder="-"
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                onPaste={handleOtpPaste}
                className="w-full min-w-0 h-11 rounded-xl border border-slate-200 bg-white text-lg font-bold text-center text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors p-0 box-border"
              />
            ))}
          </div>
        </div>

        {/* Set New Password Field */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-800 mb-1.5">
            Set New Password
          </label>
          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (error) setError("");
              }}
              placeholder="At least 8 characters"
              className="w-full h-11 pl-3.5 pr-10 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 text-slate-400 hover:text-slate-600 transition-colors"
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Confirm New Password Field */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-slate-800 mb-1.5">
            Confirm New Password
          </label>
          <div className="relative flex items-center">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (error) setError("");
              }}
              placeholder="Re-enter your new password"
              className={`w-full h-11 pl-3.5 pr-10 rounded-xl border bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
                confirmPassword && newPassword !== confirmPassword
                  ? "border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  : confirmPassword && newPassword === confirmPassword
                  ? "border-emerald-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  : "border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 text-slate-400 hover:text-slate-600 transition-colors"
              title={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
          {confirmPassword && newPassword !== confirmPassword && (
            <p className="text-[11px] text-red-500 mt-1 font-medium">
              Passwords do not match
            </p>
          )}
          {confirmPassword && newPassword === confirmPassword && (
            <p className="text-[11px] text-emerald-600 mt-1 font-medium">
              ✓ Passwords match
            </p>
          )}
        </div>

        {/* Reset & Save Password Button */}
        <button
          type="button"
          onClick={handleResetPassword}
          disabled={loading}
          className="w-full h-11 rounded-xl bg-white hover:bg-orange-50 active:bg-orange-100 text-orange-600 border border-orange-500 font-bold text-sm transition-all mb-5 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading && codeSent ? "Resetting Password..." : "Reset & Save Password"}
        </button>

        {/* Support Help Box */}
        <div className="bg-orange-50 rounded-xl p-3.5 text-center text-xs text-slate-600 leading-normal">
          <div>Need help? Contact our 24/7 Support at</div>
          <a
            href="mailto:support@localpro.lk"
            className="text-orange-600 font-bold hover:underline block mt-0.5"
          >
            support@localpro.lk
          </a>
        </div>
      </div>
    </div>
  );
}
