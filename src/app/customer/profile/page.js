"use client";

import { useState } from "react";
import CustomerIcon from "@/components/customer/CustomerIcon";

const initialProfile = {
  firstName: "Kamal",
  lastName: "Perera",
  email: "kamal.perera@example.com",
  phone: "+94 77 234 5678",
  address: "24 Flower Road",
  city: "Colombo 07",
};

function Field({ label, name, value, onChange, type = "text", placeholder }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-orange-100"
      />
    </label>
  );
}

export default function CustomerProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [bookingAlerts, setBookingAlerts] = useState(true);
  const [saveMessage, setSaveMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setProfile((current) => ({ ...current, [name]: value }));
    setSaveMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSaveMessage("Your profile changes are saved.");
  }

  return (
    <div className="mx-auto max-w-[1080px] space-y-8">
      <section>
        <p className="text-sm font-semibold text-brand">Account settings</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-[34px]">My profile</h1>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Manage your personal details and how we keep in touch.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3.5 py-2 text-xs font-bold text-green-700">
            <span className="h-2 w-2 rounded-full bg-green-600" /> Account active
          </span>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(260px,0.8fr)]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-7">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-50 text-brand">
                <CustomerIcon name="user" size={19} />
              </span>
              <div>
                <h2 className="font-extrabold text-ink">Personal information</h2>
                <p className="mt-0.5 text-xs text-slate-500">Your details help providers identify you.</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="grid h-[76px] w-[76px] shrink-0 place-items-center rounded-full bg-orange-100 text-xl font-extrabold text-brand">
                {profile.firstName.slice(0, 1)}{profile.lastName.slice(0, 1)}
              </div>
              <div>
                <p className="font-bold text-ink">{profile.firstName} {profile.lastName}</p>
                <p className="mt-1 text-sm text-slate-500">Member since January 2024</p>
                <button
                  type="button"
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:text-brand-hover"
                  onClick={() => setSaveMessage("Profile photo upload will be available soon.")}
                >
                  <CustomerIcon name="edit" size={14} /> Change profile photo
                </button>
              </div>
            </div>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <Field label="First name" name="firstName" value={profile.firstName} onChange={handleChange} />
              <Field label="Last name" name="lastName" value={profile.lastName} onChange={handleChange} />
              <Field label="Email address" name="email" type="email" value={profile.email} onChange={handleChange} />
              <Field label="Phone number" name="phone" type="tel" value={profile.phone} onChange={handleChange} />
            </div>
          </section>

          <section className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-7">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-50 text-brand">
                <CustomerIcon name="home" size={19} />
              </span>
              <div>
                <h2 className="font-extrabold text-ink">Service address</h2>
                <p className="mt-0.5 text-xs text-slate-500">Your preferred location for home services.</p>
              </div>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="Street address" name="address" value={profile.address} onChange={handleChange} />
              <Field label="City / area" name="city" value={profile.city} onChange={handleChange} />
            </div>
            <div className="mt-4 flex items-start gap-2 rounded-xl bg-slate-50 p-3.5 text-xs leading-5 text-slate-500">
              <CustomerIcon name="pin" size={16} className="mt-0.5 shrink-0 text-brand" />
              This address will be available when you book your next service.
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-50 text-brand">
                <CustomerIcon name="bell" size={19} />
              </span>
              <div>
                <h2 className="font-extrabold text-ink">Notifications</h2>
                <p className="mt-0.5 text-xs text-slate-500">Choose what you hear from us.</p>
              </div>
            </div>
            <div className="divide-y divide-slate-100">
              <label className="flex cursor-pointer items-center justify-between gap-4 py-4">
                <span>
                  <span className="block text-sm font-bold text-ink">Booking updates</span>
                  <span className="mt-1 block text-xs leading-5 text-slate-500">Confirmations and appointment reminders</span>
                </span>
                <input
                  type="checkbox"
                  checked={bookingAlerts}
                  onChange={(event) => setBookingAlerts(event.target.checked)}
                  className="h-5 w-5 shrink-0 accent-[#F97316]"
                />
              </label>
              <label className="flex cursor-pointer items-center justify-between gap-4 py-4">
                <span>
                  <span className="block text-sm font-bold text-ink">Offers & updates</span>
                  <span className="mt-1 block text-xs leading-5 text-slate-500">Helpful tips and occasional offers</span>
                </span>
                <input
                  type="checkbox"
                  checked={emailUpdates}
                  onChange={(event) => setEmailUpdates(event.target.checked)}
                  className="h-5 w-5 shrink-0 accent-[#F97316]"
                />
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-orange-100 bg-brand-wash p-5 sm:p-6">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-brand">
              <CustomerIcon name="shield" size={19} />
            </div>
            <h2 className="mt-4 font-extrabold text-ink">Your information is safe</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Your contact details are only shared with professionals when you make a booking.
            </p>
          </section>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-stretch">
            <button
              type="submit"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-hover"
            >
              <CustomerIcon name="check" size={17} /> Save changes
            </button>
            {saveMessage && (
              <p role="status" className="text-sm font-semibold text-green-700">
                {saveMessage}
              </p>
            )}
          </div>
        </aside>
      </form>
    </div>
  );
}
