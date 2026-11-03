
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getMyProviderProfile
} from "@/services/providerService";

const statusStyles = {
  Active: "bg-green-500/10 text-green-400 border-green-500/20",
  Pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Suspended: "bg-red-500/10 text-red-400 border-red-500/20",
  Restricted: "bg-red-500/10 text-red-400 border-red-500/20",
  Verified: "bg-green-500/10 text-green-400 border-green-500/20",
  Rejected: "bg-red-500/10 text-red-400 border-red-500/20"
};

function StatusBadge({ value }) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
        statusStyles[value] ||
        "border-slate-600 bg-slate-700 text-slate-300"
      }`}
    >
      {value || "Unknown"}
    </span>
  );
}

function InfoField({ label, value }) {
  const displayValue = Array.isArray(value)
    ? value.join(", ")
    : value;

  return (
    <div className="space-y-1">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="break-words text-sm font-medium text-slate-100">
        {displayValue || "Not provided"}
      </p>
    </div>
  );
}

function ProfileSection({ title, children }) {
  return (
    <section className="rounded-2xl border border-slate-700/60 bg-slate-800/50 p-6">
      <h2 className="mb-5 text-lg font-semibold text-white">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function ProviderProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      try {
        const response = await getMyProviderProfile();

        if (!cancelled) {
          setProfile(response.data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unable to load provider profile.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="space-y-5 animate-pulse">
        <div className="h-9 w-64 rounded-lg bg-slate-800" />
        <div className="h-48 rounded-2xl bg-slate-800" />
        <div className="h-64 rounded-2xl bg-slate-800" />
      </div>
    );
  }

  if (error) {
    const missingProfile =
      error.toLowerCase().includes("provider profile not found");

    return (
      <div className="space-y-6">
        <div>
          <h1 className="portal-title">My Provider Profile</h1>
          <p className="portal-subtitle">
            Manage your professional information on serviQ.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-800/60 p-8 text-center">
          <h2 className="text-xl font-semibold text-white">
            {missingProfile
              ? "Complete your Provider Profile"
              : "Unable to load your profile"}
          </h2>

          <p className="mt-3 text-sm text-slate-400">
            {missingProfile
              ? "Create your individual or business profile to get started."
              : error}
          </p>

          {missingProfile && (
            <Link
              href="/provider/profile/setup"
              className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 font-semibold text-white hover:bg-primary-dark"
            >
              Set Up Profile
            </Link>
          )}

          {!missingProfile && (
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 rounded-xl bg-primary px-5 py-3 font-semibold text-white hover:bg-primary-dark"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <p className="text-slate-300">
        No Provider Profile data was returned.
      </p>
    );
  }

  const user = profile.user_id || {};
  const business = profile.business_information || {};
  const experience = profile.experience || {};

  const fullName = [
    user.first_name,
    user.last_name
  ].filter(Boolean).join(" ");

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="portal-title">My Provider Profile</h1>
          <p className="portal-subtitle">
            Manage your professional identity and business information.
          </p>
        </div>

        <Link
          href="/provider/profile/edit"
          className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          Edit Profile
        </Link>
      </div>

      <section className="rounded-2xl border border-slate-700/60 bg-slate-800/50 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-orange-500/15 text-2xl font-bold text-orange-400">
              {(fullName || business.business_name || "P")
                .charAt(0)
                .toUpperCase()}
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">
                {business.business_name || fullName || "Service Provider"}
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                {profile.provider_type} Provider
              </p>

              {business.business_name && fullName && (
                <p className="mt-1 text-sm text-slate-300">
                  Managed by {fullName}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <StatusBadge value={profile.account_status} />
            <StatusBadge value={profile.verification_status} />
          </div>
        </div>
      </section>

      <ProfileSection title="Account Information">
        <div className="grid gap-5 sm:grid-cols-2">
          <InfoField label="Full Name" value={fullName} />
          <InfoField label="Email Address" value={user.email} />
          <InfoField label="Phone Number" value={user.phone_number} />
          <InfoField label="Provider Type" value={profile.provider_type} />
        </div>
      </ProfileSection>

      <ProfileSection title="Business Information">
        <div className="grid gap-5 sm:grid-cols-2">
          <InfoField label="Business Name" value={business.business_name} />
          <InfoField label="Registration Number" value={business.registration_number} />
          <InfoField label="Business Email" value={business.contact_email} />
          <InfoField label="Business Phone" value={business.contact_phone} />
          <InfoField label="Business Address" value={business.business_address} />
          <InfoField label="Website" value={business.website} />
        </div>

        <div className="mt-5">
          <InfoField label="Description" value={business.description} />
        </div>
      </ProfileSection>

      <ProfileSection title="Professional Experience">
        <div className="grid gap-5 sm:grid-cols-2">
          <InfoField
            label="Years of Experience"
            value={String(experience.years_of_experience ?? 0)}
          />
          <InfoField label="Qualifications" value={experience.qualifications} />
          <InfoField label="Skills" value={experience.skills} />
          <InfoField label="Average Rating" value={profile.rating_average != null
            ? `${profile.rating_average} / 5`
            : null}
          />
        </div>

        <div className="mt-5">
          <InfoField label="Professional Bio" value={experience.bio} />
        </div>
      </ProfileSection>
    </div>
  );
}
