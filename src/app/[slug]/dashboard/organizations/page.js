"use client";

import { useState } from "react";
import {
  Settings,
  Users,
  FileText,
  HardDrive,
  Globe,
  Clock,
  Shield,
  MoreVertical,
} from "lucide-react";

export default function OrganizationsPage() {
  const [organization, setOrganization] = useState({
    id: 1,
    name: "Acme Corporation",
    slug: "acme-corp",
    description: "Leading innovators in digital transformation",
    v: "AC",
    website: "https://acmecorp.com",
    type: "Enterprise",
    industry: "Technology",
    size: "250-500 employees",
    createdDate: "2022-06-15",
    status: "Active",
    plan: "Enterprise",
    members: 45,
    projects: 12,
    storageUsed: 245, // GB
    storageLimit: 500, // GB
    owner: "John Doe",
    timezone: "UTC-5 (EST)",
  });

  const organizationStats = [
    {
      label: "Total Members",
      value: organization.members,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Active Projects",
      value: organization.projects,
      icon: FileText,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      label: "Storage Used",
      value: `${organization.storageUsed}/${organization.storageLimit} GB`,
      icon: HardDrive,
      color: "bg-amber-100 text-amber-600",
    },
  ];

  const organizationDetails = [
    { label: "Organization Name", value: organization.name },
    { label: "Type", value: organization.type },
    { label: "Industry", value: organization.industry },
    { label: "Company Size", value: organization.size },
    { label: "Website", value: organization.website },
    { label: "Owner", value: organization.owner },
    { label: "Timezone", value: organization.timezone },
  ];

  return (
    <div className="space-y-8">
      {/* Organization Header */}
      <div className="bg-white border rounded-xl p-8 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-6">
            <div className="h-20 w-20 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-2xl font-bold text-white">
              {organization.logo}
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                {organization.name}
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                {organization.description}
              </p>

              <div className="flex items-center gap-4 mt-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-600">
                    Plan:{" "}
                    <span className="font-semibold">{organization.plan}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-600">
                    Created:{" "}
                    <span className="font-semibold">
                      {new Date(organization.createdDate).toLocaleDateString()}
                    </span>
                  </span>
                </div>
                <div>
                  <span className="px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700 font-semibold">
                    {organization.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button className="p-2 bg-slate-100 rounded-lg transition">
            <MoreVertical className="h-5 w-5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {organizationStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white border rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="text-2xl font-bold mt-2 text-slate-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Organization Details */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Details Card */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">
              Organization Details
            </h3>
            <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition">
              Edit
            </button>
          </div>

          <div className="space-y-4">
            {organizationDetails.map((detail) => (
              <div
                key={detail.label}
                className="flex justify-between items-start"
              >
                <span className="text-sm text-slate-500">{detail.label}</span>
                <span className="text-sm font-medium text-slate-900">
                  {detail.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription & Billing Card */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">
              Subscription & Billing
            </h3>
            <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition">
              Manage
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-500">Current Plan</p>
              <p className="text-lg font-semibold text-slate-900 mt-1">
                {organization.plan}
              </p>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-slate-500">Storage Usage</p>
              <div className="mt-2 flex items-center gap-3">
                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{
                      width: `${(organization.storageUsed / organization.storageLimit) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-sm font-medium text-slate-900">
                  {Math.round(
                    (organization.storageUsed / organization.storageLimit) *
                      100,
                  )}
                  %
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {organization.storageUsed} of {organization.storageLimit} GB
                used
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
        <div className="grid grid grid-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <button className="px-4 py-3 border rounded-lg text-sm font-medium text-slate-900 hover:bg-slate-50 transition flex items-center gap-2">
            <Users className="h-4 w-4" />
            Manage Members
          </button>
          <button className="px-4 py-3 border rounded-lg text-sm font-medium text-slate-900 hover:bg-slate-50 transition flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </button>
          <button className="px-4 py-3 border rounded-lg text-sm font-medium text-slate-900 hover:bg-slate-50 transition flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Website
          </button>
          <button className="px-4 py-3 border rounded-lg text-sm font-medium text-slate-900 hover:bg-slate-50 transition flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Billing History
          </button>
        </div>
      </div>
    </div>
  );
}
