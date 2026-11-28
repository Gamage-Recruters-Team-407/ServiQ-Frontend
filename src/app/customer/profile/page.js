// src/app/customer/profile/page.js
// http://localhost:3000/customer/profile / (/customer/profile)
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { customerService } from "@/services/customerService";
import { AuthAlert } from "@/components/auth/AuthShared"; 

export default function CustomerProfilePage() {
  const router = useRouter();
  const { logout, user: authUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  
  const [alert, setAlert] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [profile, setProfile] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    bio: "",
    avatar_url: "",
    address: {
      street: "",
      city: "",
      state: "",
      postal_code: "",
      country: "Sri Lanka",
      location: { type: "Point", coordinates: [0, 0] }
    },
    preferences: {
      language: "en",
      notification_channels: ["In-App"]
    }
  });

  // 1. Load Profile Data on Mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await customerService.getProfile();
      const data = response.data || response; // apiClient return format එක අනුව
      
      setProfile(data);
      
      // Populate Form Data
      const cust = data.customer_profile || {};
      const usr = data.user || {};
      
      setFormData({
        first_name: cust.profile_details?.first_name || usr.first_name || "",
        last_name: cust.profile_details?.last_name || usr.last_name || "",
        phone_number: cust.profile_details?.phone_number || usr.phone_number || "",
        bio: cust.profile_details?.bio || "",
        avatar_url: cust.profile_details?.avatar_url || usr.profile_image || "",
        address: {
          street: cust.profile_details?.address?.street || "",
          city: cust.profile_details?.address?.city || "",
          state: cust.profile_details?.address?.state || "",
          postal_code: cust.profile_details?.address?.postal_code || "",
          country: cust.profile_details?.address?.country || "Sri Lanka",
          location: cust.profile_details?.address?.location || { type: "Point", coordinates: [0, 0] }
        },
        preferences: {
          language: cust.preferences?.language || "en",
          notification_channels: cust.preferences?.notification_channels || ["In-App"]
        }
      });
    } catch (err) {
      setAlert({ type: "error", message: err.message || "Failed to load profile." });
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // 3. Save Profile
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setAlert(null);

    try {
      const response = await customerService.updateProfile(formData);
      setAlert({ type: "success", message: "Profile updated successfully!" });
      setIsEditing(false);
      fetchProfile(); // Refresh data
    } catch (err) {
      setAlert({ type: "error", message: err.message || "Failed to update profile." });
    } finally {
      setSaving(false);
    }
  };

  // 4. Delete Account
  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      await customerService.deleteAccount();
      await logout(); // Clear local auth state
      router.push("/login");
    } catch (err) {
      setAlert({ type: "error", message: err.message || "Failed to delete account." });
      setShowDeleteModal(false);
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink">My Profile</h1>
          <p className="text-muted text-sm mt-1">Manage your personal information and preferences.</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-brand text-white font-semibold rounded-lg hover:bg-brand-hover transition-colors"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={() => {
                setIsEditing(false);
                fetchProfile(); // Reset form
              }}
              className="px-4 py-2 border border-line text-ink font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-brand text-white font-semibold rounded-lg hover:bg-brand-hover transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>

      <AuthAlert type={alert?.type} message={alert?.message} />

      {/* Profile Form */}
      <form onSubmit={handleSave} className="bg-white border border-line rounded-xl shadow-card p-6 space-y-6">
        
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-ink mb-1">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-line rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition disabled:bg-gray-50 disabled:text-muted"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-line rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition disabled:bg-gray-50 disabled:text-muted"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Email (Read-Only)</label>
            <input
              type="email"
              value={profile?.user?.email || ""}
              disabled
              className="w-full px-4 py-2 border border-line rounded-lg bg-gray-50 text-muted cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Phone Number</label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-line rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition disabled:bg-gray-50 disabled:text-muted"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1">Avatar URL</label>
          <input
            type="text"
            name="avatar_url"
            value={formData.avatar_url}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="https://example.com/avatar.jpg"
            className="w-full px-4 py-2 border border-line rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition disabled:bg-gray-50 disabled:text-muted"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            disabled={!isEditing}
            rows={3}
            className="w-full px-4 py-2 border border-line rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition disabled:bg-gray-50 disabled:text-muted"
          />
        </div>

        {/* Address Section */}
        <div className="border-t border-line pt-6">
          <h3 className="text-lg font-semibold text-ink mb-4">Address Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Street</label>
              <input
                type="text"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-line rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition disabled:bg-gray-50 disabled:text-muted"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">City</label>
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-line rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition disabled:bg-gray-50 disabled:text-muted"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">State / Province</label>
              <input
                type="text"
                name="address.state"
                value={formData.address.state}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-line rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition disabled:bg-gray-50 disabled:text-muted"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Postal Code</label>
              <input
                type="text"
                name="address.postal_code"
                value={formData.address.postal_code}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-line rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition disabled:bg-gray-50 disabled:text-muted"
              />
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="border-t border-line pt-6">
          <h3 className="text-lg font-semibold text-ink mb-4">Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Language</label>
              <select
                name="preferences.language"
                value={formData.preferences.language}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-line rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition disabled:bg-gray-50 disabled:text-muted"
              >
                <option value="en">English</option>
                <option value="si">Sinhala</option>
                <option value="ta">Tamil</option>
              </select>
            </div>
          </div>
        </div>
      </form>

      {/* Danger Zone: Delete Account */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-red-700 mb-2">Danger Zone</h3>
        <p className="text-sm text-red-600 mb-4">
          Once you delete your account, there is no going back. All your data, bookings, and history will be permanently removed.
        </p>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
        >
          Delete My Account
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-card max-w-md w-full p-6 space-y-4">
            <h3 className="text-xl font-bold text-ink">Are you absolutely sure?</h3>
            <p className="text-muted text-sm">
              This action cannot be undone. This will permanently delete your account and remove your data from our servers.
            </p>
            <div className="flex gap-3 justify-end pt-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
                className="px-4 py-2 border border-line text-ink font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleting}
                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {deleting && <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>}
                {deleting ? "Deleting..." : "Yes, Delete My Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}