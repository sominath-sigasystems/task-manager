"use client";

import { useState } from "react";
import { Search, MoreVertical, Mail, Calendar } from "lucide-react";

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const members = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@company.com",
      role: "Admin",
      status: "Active",
      joinedDate: "2024-01-15",
      avatar: "JD",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@company.com",
      role: "Editor",
      status: "Active",
      joinedDate: "2024-02-20",
      avatar: "JS",
    },
    {
      id: 3,
      name: "Mark Wilson",
      email: "mark.wilson@company.com",
      role: "Viewer",
      status: "Inactive",
      joinedDate: "2024-03-10",
      avatar: "MW",
    },
  ];

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole =
      roleFilter === "all" || member.role.toLowerCase() === roleFilter;
    return matchesSearch && matchesRole;
  });

  const stats = [
    { label: "Total Members", value: members.length, color: "text-slate-900" },
    {
      label: "Active",
      value: members.filter((m) => m.status === "Active").length,
      color: "text-emerald-600",
    },
    { label: "Pending Invites", value: 0, color: "text-amber-500" },
  ];

  const getRoleColor = (role) => {
    const colors = {
      Admin: "bg-purple-100 text-purple-700",
      Editor: "bg-blue-100 text-blue-700",
      Viewer: "bg-slate-100 text-slate-700",
    };
    return colors[role] || "bg-slate-100 text-slate-700";
  };

  const getStatusColor = (status) => {
    return status === "Active"
      ? "bg-emerald-100 text-emerald-700"
      : "bg-slate-100 text-slate-700";
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Members</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage team members and their permissions
          </p>
        </div>

        <button className="px-4 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition">
          + Invite Member
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border rounded-xl p-6 shadow-sm"
          >
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className={`text-2xl font-bold mt-2 ${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
          <option value="viewer">Viewer</option>
        </select>
      </div>

      {/* Members Table */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-400">
                Member
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-400">
                Email
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-400">
                Role
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-400">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-400">
                Joined
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold uppercase text-slate-400">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-sm font-semibold text-slate-700">
                        {member.avatar}
                      </div>
                      <span className="font-medium text-slate-900">
                        {member.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-sm">
                    {member.email}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-semibold ${getRoleColor(
                        member.role,
                      )}`}
                    >
                      {member.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-semibold ${getStatusColor(
                        member.status,
                      )}`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-sm">
                    {new Date(member.joinedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition">
                      <MoreVertical className="h-4 w-4 text-slate-400" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center">
                  <p className="text-slate-500">No members found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
