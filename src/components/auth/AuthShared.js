"use client";

import Link from "next/link";
import styles from "./auth.module.css";

export function ServiQLogo() {
  return (
    <Link href="/" className={styles.brandLink} aria-label="ServiQ Home">
      <span className={styles.brandIcon}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3L3.5 7.75L12 12.5L20.5 7.75L12 3Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.5 12.25L12 17L20.5 12.25"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.5 16.5L12 21.25L20.5 16.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className={styles.brandWordmark}>
        servi<span className={styles.brandWordmarkAccent}>Q</span>
      </span>
    </Link>
  );
}

export function AuthSplitShell({ badge, title, subtitle, heroExtra, children }) {
  return (
    <div className={styles.authPageSplit}>
      <aside className={styles.heroPanel}>
        <div className={styles.heroGlowTop} />
        <div className={styles.heroGlowBottom} />
        <div className={styles.heroInner}>
          <ServiQLogo />
          <span className={styles.heroBadge}>{badge}</span>
          <h1 className={styles.heroTitle}>{title}</h1>
          <p className={styles.heroSubtitle}>{subtitle}</p>
          {heroExtra}
        </div>
      </aside>

      <section className={styles.formPanel}>
        <div className={styles.formContainer}>
          <div className={styles.mobileBrandWrap}>
            <ServiQLogo />
          </div>
          {children}
        </div>
      </section>
    </div>
  );
}

export function AuthAlert({ type = "info", message }) {
  if (!message) return null;

  const variantClass =
    type === "error"
      ? styles.alertError
      : type === "warning"
      ? styles.alertWarning
      : type === "success"
      ? styles.alertSuccess
      : styles.alertInfo;

  return (
    <div className={`${styles.alertBanner} ${variantClass}`} role="alert">
      <span aria-hidden="true" style={{ flexShrink: 0, marginTop: "1px" }}>
        {type === "error" ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            <path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : type === "success" ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            <path d="M8.5 12.5l2.3 2.3 4.7-5.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            <path d="M12 11v5M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </span>
      <span>{message}</span>
    </div>
  );
}

export function SocialAuthButtons({ onProviderClick, disabled }) {
  return (
    <>
      <div className={styles.dividerRow}>
        <span className={styles.dividerLine} />
        <span>Or continue with</span>
        <span className={styles.dividerLine} />
      </div>

      <div className={styles.socialGrid}>
        <button
          type="button"
          className={styles.socialBtn}
          onClick={() => onProviderClick("Google")}
          disabled={disabled}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#EA4335"
              d="M12 10.2v3.9h5.4c-.2 1.3-1.5 3.8-5.4 3.8-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.3 14.6 2.4 12 2.4 6.7 2.4 2.4 6.7 2.4 12S6.7 21.6 12 21.6c6.9 0 9.1-4.8 9.1-7.3 0-.5-.1-.9-.1-1.3H12z"
            />
            <path
              fill="#34A853"
              d="M3.5 7.4l3.2 2.3C7.5 7.7 9.6 6.2 12 6.2c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.3 14.6 2.4 12 2.4 8.3 2.4 5.1 4.5 3.5 7.4z"
            />
            <path
              fill="#FBBC05"
              d="M12 21.6c2.6 0 4.8-.9 6.4-2.3l-3-2.5c-.8.6-1.9 1-3.4 1-2.6 0-4.8-1.7-5.6-4.1l-3.2 2.4c1.6 3.2 4.9 5.5 8.8 5.5z"
            />
            <path
              fill="#4285F4"
              d="M21.1 14.3c.1-.4.1-.8.1-1.3H12v3.9h5.4c-.3 1.2-1 2.2-2 2.9l3 2.5c1.8-1.6 2.7-4.1 2.7-8z"
            />
          </svg>
          Google
        </button>

        <button
          type="button"
          className={styles.socialBtn}
          onClick={() => onProviderClick("Apple")}
          disabled={disabled}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M16.36 12.76c-.02-2.09 1.71-3.1 1.79-3.15-.98-1.43-2.5-1.62-3.03-1.64-1.28-.13-2.52.76-3.17.76-.66 0-1.66-.75-2.74-.73-1.4.02-2.7.82-3.42 2.08-1.47 2.55-.38 6.32 1.04 8.38.7 1.01 1.52 2.14 2.61 2.1 1.05-.04 1.45-.68 2.72-.68 1.27 0 1.63.68 2.73.65 1.13-.02 1.84-1.02 2.52-2.03.81-1.18 1.14-2.33 1.16-2.39-.03-.01-2.19-.84-2.21-3.35zM14.28 6.62c.57-.7.96-1.66.85-2.62-.83.03-1.84.55-2.43 1.24-.52.6-.98 1.59-.86 2.53.93.07 1.87-.46 2.44-1.15z" />
          </svg>
          Apple
        </button>
      </div>
    </>
  );
}

export function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 21a8 8 0 10-16 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 11V7a4 4 0 118 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function EyeToggleIcon({ visible }) {
  return visible ? (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 5.1A10.4 10.4 0 0112 4.9c5.5 0 9.6 4.7 10 7.1a11 11 0 01-3.2 4.4M6.6 6.6A11.4 11.4 0 002 12c.4 2.4 4.5 7.1 10 7.1 1.7 0 3.3-.4 4.7-1.1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M2 12s3.8-7 10-7 10 7 10 7-3.8 7-10 7-10-7-10-7z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function WrenchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14.7 6.3a4 4 0 00-5.4 5.4l-5.6 5.6a1.5 1.5 0 102.1 2.1l5.6-5.6a4 4 0 005.4-5.4l-2.3 2.3-2.1-2.1 2.3-2.3z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
