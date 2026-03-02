"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Bell,
  LogOut,
  Eye,
  EyeOff,
  Save,
  X,
  Lock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    avatar: "JD",
    bio: "Project Manager | Tech Enthusiast | Coffee Lover",
    location: "San Francisco, CA",
    timezone: "UTC-8 (PST)",
    joinedDate: "2022-06-15",
    lastLogin: "2024-01-10 14:30:00",
  });

  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    projectUpdates: true,
    weeklyDigest: true,
    mentionNotifications: true,
    twoFactorAuth: false,
  });
  const [saveStatus, setSaveStatus] = useState(null);
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "General", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  const handleProfileChange = (field, value) => {
    setEditedProfile({
      ...editedProfile,
      [field]: value,
    });
  };

  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setEditMode(false);
    setSaveStatus("success");
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setEditMode(false);
  };

  const handlePasswordChange = (field, value) => {
    setPasswordForm({
      ...passwordForm,
      [field]: value,
    });
  };

  const handleUpdatePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus(null), 3000);
      return;
    }
    setSaveStatus("success");
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleNotificationChange = (setting) => {
    setNotifications({
      ...notifications,
      [setting]: !notifications[setting],
    });
  };

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-white border rounded-xl p-8 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-6">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-4xl font-bold text-white">
              {profile.avatar}
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                {profile.firstName} {profile.lastName}
              </h1>
              <p className="text-slate-600 mt-1">{profile.bio}</p>

              <div className="flex items-center gap-2 mt-4 text-sm text-slate-500">
                <Mail className="h-4 w-4" />
                {profile.email}
              </div>
              <div className="flex items-center gap-2 mt-2 text-sm text-slate-500">
                <Calendar className="h-4 w-4" />
                Joined {new Date(profile.joinedDate).toLocaleDateString()}
              </div>
            </div>
          </div>

          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Status Messages */}
      {saveStatus && (
        <div
          className={`p-4 rounded-lg flex items-center gap-3 ${
            saveStatus === "success"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {saveStatus === "success" ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )}
          <span className="text-sm font-medium">
            {saveStatus === "success"
              ? "Changes saved successfully!"
              : "Error updating information"}
          </span>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="flex border-b">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium flex items-center gap-2 border-b-2 transition ${
                  activeTab === tab.id
                    ? "border-black text-slate-900"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {/* General Tab */}
          {activeTab === "general" && (
            <div className="space-y-6">
              {editMode ? (
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-900 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={editedProfile.firstName}
                        onChange={(e) =>
                          handleProfileChange("firstName", e.target.value)
                        }
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-900 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={editedProfile.lastName}
                        onChange={(e) =>
                          handleProfileChange("lastName", e.target.value)
                        }
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) =>
                        handleProfileChange("email", e.target.value)
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={editedProfile.phone}
                      onChange={(e) =>
                        handleProfileChange("phone", e.target.value)
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">
                      Bio
                    </label>
                    <textarea
                      value={editedProfile.bio}
                      onChange={(e) =>
                        handleProfileChange("bio", e.target.value)
                      }
                      rows="3"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-900 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={editedProfile.location}
                        onChange={(e) =>
                          handleProfileChange("location", e.target.value)
                        }
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-900 mb-2">
                        Timezone
                      </label>
                      <select
                        value={editedProfile.timezone}
                        onChange={(e) =>
                          handleProfileChange("timezone", e.target.value)
                        }
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                      >
                        <option>UTC-8 (PST)</option>
                        <option>UTC-5 (EST)</option>
                        <option>UTC+0 (GMT)</option>
                        <option>UTC+1 (CET)</option>
                        <option>UTC+5:30 (IST)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-6">
                    <button
                      onClick={handleSaveProfile}
                      className="px-4 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition flex items-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 border text-slate-900 text-sm font-semibold rounded-lg hover:bg-slate-50 transition flex items-center gap-2"
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-start py-4 border-b">
                    <div>
                      <p className="text-sm text-slate-500">Full Name</p>
                      <p className="text-sm font-medium text-slate-900 mt-1">
                        {profile.firstName} {profile.lastName}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-start py-4 border-b">
                    <div>
                      <p className="text-sm text-slate-500">Email Address</p>
                      <p className="text-sm font-medium text-slate-900 mt-1">
                        {profile.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-start py-4 border-b">
                    <div>
                      <p className="text-sm text-slate-500">Phone Number</p>
                      <p className="text-sm font-medium text-slate-900 mt-1">
                        {profile.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-start py-4 border-b">
                    <div>
                      <p className="text-sm text-slate-500">Bio</p>
                      <p className="text-sm font-medium text-slate-900 mt-1">
                        {profile.bio}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-start py-4 border-b">
                    <div>
                      <p className="text-sm text-slate-500">Location</p>
                      <p className="text-sm font-medium text-slate-900 mt-1">
                        {profile.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-start py-4">
                    <div>
                      <p className="text-sm text-slate-500">Timezone</p>
                      <p className="text-sm font-medium text-slate-900 mt-1">
                        {profile.timezone}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900">
                  Change Password
                </h3>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword.current ? "text" : "password"}
                      value={passwordForm.currentPassword}
                      onChange={(e) =>
                        handlePasswordChange("currentPassword", e.target.value)
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black pr-10"
                    />
                    <button
                      onClick={() =>
                        setShowPassword({
                          ...showPassword,
                          current: !showPassword.current,
                        })
                      }
                      className="absolute right-3 top-2.5 text-slate-400"
                    >
                      {showPassword.current ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword.new ? "text" : "password"}
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        handlePasswordChange("newPassword", e.target.value)
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black pr-10"
                    />
                    <button
                      onClick={() =>
                        setShowPassword({
                          ...showPassword,
                          new: !showPassword.new,
                        })
                      }
                      className="absolute right-3 top-2.5 text-slate-400"
                    >
                      {showPassword.new ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword.confirm ? "text" : "password"}
                      value={passwordForm.confirmPassword}
                      onChange={(e) =>
                        handlePasswordChange("confirmPassword", e.target.value)
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black pr-10"
                    />
                    <button
                      onClick={() =>
                        setShowPassword({
                          ...showPassword,
                          confirm: !showPassword.confirm,
                        })
                      }
                      className="absolute right-3 top-2.5 text-slate-400"
                    >
                      {showPassword.confirm ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleUpdatePassword}
                  className="px-4 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition flex items-center gap-2"
                >
                  <Lock className="h-4 w-4" />
                  Update Password
                </button>
              </div>

              <div className="pt-6 border-t">
                <h3 className="font-semibold text-slate-900 mb-4">
                  Two-Factor Authentication
                </h3>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-600 mb-4">
                    Add an extra layer of security to your account by enabling
                    two-factor authentication.
                  </p>
                  <button className="px-4 py-2 border border-slate-300 text-slate-900 text-sm font-semibold rounded-lg hover:bg-slate-100 transition">
                    Enable 2FA
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t">
                <h3 className="font-semibold text-slate-900 mb-4">
                  Active Sessions
                </h3>
                <div className="space-y-3">
                  <div className="p-4 bg-slate-50 rounded-lg flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        Current Session
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Last active: {profile.lastLogin}
                      </p>
                    </div>
                    <span className="px-2 py-1 text-xs bg-emerald-100 text-emerald-700 rounded-full font-semibold">
                      Active
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t">
                <button className="px-4 py-2 bg-red-50 text-red-600 text-sm font-semibold rounded-lg hover:bg-red-100 transition flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout All Sessions
                </button>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div className="space-y-4">
                {[
                  {
                    key: "emailNotifications",
                    title: "Email Notifications",
                    description:
                      "Receive email updates about your account activity",
                  },
                  {
                    key: "projectUpdates",
                    title: "Project Updates",
                    description:
                      "Get notified when projects you follow are updated",
                  },
                  {
                    key: "weeklyDigest",
                    title: "Weekly Digest",
                    description: "Receive a weekly summary of your activities",
                  },
                  {
                    key: "mentionNotifications",
                    title: "Mention Notifications",
                    description:
                      "Get notified when someone mentions you in comments",
                  },
                  {
                    key: "twoFactorAuth",
                    title: "Two-Factor Authentication Codes",
                    description: "Receive 2FA codes via email when enabled",
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-start justify-between p-4 border rounded-lg hover:bg-slate-50 transition"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {item.title}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {item.description}
                      </p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange(item.key)}
                      className={`relative inline-flex h-6 w-11 rounded-full transition ${
                        notifications[item.key] ? "bg-black" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform bg-white rounded-full transition ${
                          notifications[item.key]
                            ? "translate-x-5"
                            : "translate-x-0.5"
                        } mt-0.5`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
