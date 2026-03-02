"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  Edit,
  Trash2,
  Shield,
} from "lucide-react";

const ITEMS_PER_PAGE = 20;

export default function RolesPage() {
  const params = useParams();
  const slug = params?.slug;

  const [roles, setRoles] = useState([]);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    roleName: "",
    code: "",
    description: "",
    scopeType: "ORGANIZATION",
  });

  // Fetch Roles
  const fetchRoles = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get organization ID from slug or localStorage
      const orgId = localStorage.getItem("organizationId") || slug;

      if (!orgId) {
        setError("Organization ID not found");
        setLoading(false);
        return;
      }

      const response = await fetch(`/api/roles?organizationId=${orgId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch roles");
      }

      const data = await response.json();
      setRoles(data.roles || []);
      setFilteredRoles(data.roles || []);
      setCurrentPage(1);
    } catch (err) {
      console.error("Error fetching roles:", err);
      setError(err.message || "Failed to load roles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, [slug]);

  // Filter roles based on search
  useEffect(() => {
    const filtered = roles.filter((role) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        role.roleName.toLowerCase().includes(searchLower) ||
        role.code.toLowerCase().includes(searchLower) ||
        (role.description &&
          role.description.toLowerCase().includes(searchLower))
      );
    });
    setFilteredRoles(filtered);
    setCurrentPage(1); // Reset to first page when searching
  }, [searchQuery, roles]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredRoles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedRoles = filteredRoles.slice(startIndex, endIndex);

  // Create Role
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const orgId = localStorage.getItem("organizationId") || slug;

      const response = await fetch("/api/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          organizationId: orgId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create role");
      }

      await fetchRoles();
      setShowModal(false);
      setForm({
        roleName: "",
        code: "",
        description: "",
        scopeType: "ORGANIZATION",
      });
    } catch (err) {
      console.error("Error creating role:", err);
      setError(err.message || "Error creating role");
    } finally {
      setSubmitting(false);
    }
  };

  const scopeTypeColors = {
    ORGANIZATION: "bg-blue-100 text-blue-700",
    TEAM: "bg-purple-100 text-purple-700",
    PROJECT: "bg-green-100 text-green-700",
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <Shield className="h-8 w-8 text-blue-600" />
                Roles
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Manage and assign roles to team members
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition flex items-center gap-2 shadow-lg shadow-blue-500/30"
            >
              <Plus className="h-5 w-5" />
              Create Role
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <div>
              <p className="font-medium text-red-900">Error</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-6 flex gap-3 flex-col sm:flex-row">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search roles by name or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
        </div>

        {/* Roles Table */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-10 w-10 animate-spin text-slate-300" />
              <p className="text-slate-500">Loading roles...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                      Role Name
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                      Code
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                      Description
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                      Scope
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                      Permissions
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                      Created At
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold uppercase text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedRoles.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center">
                        <p className="text-slate-500 font-medium">
                          {searchQuery
                            ? "No roles found matching your search"
                            : "No roles found"}
                        </p>
                      </td>
                    </tr>
                  ) : (
                    paginatedRoles.map((role) => (
                      <tr
                        key={role._id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-900">
                            {role.roleName}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <code className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium">
                            {role.code}
                          </code>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-slate-600 text-sm line-clamp-2">
                            {role.description || "-"}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              scopeTypeColors[role.scopeType] ||
                              scopeTypeColors.ORGANIZATION
                            }`}
                          >
                            {role.scopeType}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-slate-900">
                            {role.permissions?.length || 0}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {new Date(role.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 hover:bg-slate-100 rounded-lg transition text-blue-600 hover:text-blue-700">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="p-2 hover:bg-slate-100 rounded-lg transition text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredRoles.length > ITEMS_PER_PAGE && (
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-slate-600">
                  Showing{" "}
                  <span className="font-semibold">{startIndex + 1}</span>
                  {" to "}
                  <span className="font-semibold">
                    {Math.min(endIndex, filteredRoles.length)}
                  </span>
                  {" of "}
                  <span className="font-semibold">{filteredRoles.length}</span>
                  {" roles"}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <ChevronLeft className="h-5 w-5 text-slate-600" />
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`min-w-10 h-10 rounded-lg font-medium transition ${
                            currentPage === page
                              ? "bg-blue-600 text-white"
                              : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {page}
                        </button>
                      ),
                    )}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <ChevronRight className="h-5 w-5 text-slate-600" />
                  </button>
                </div>
              </div>
            )}

            {/* Summary Stats */}
            {roles.length > 0 && (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <p className="text-xs text-slate-500 uppercase font-semibold mb-2">
                    Total Roles
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {roles.length}
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <p className="text-xs text-slate-500 uppercase font-semibold mb-2">
                    Organization Scope
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {roles.filter((r) => r.scopeType === "ORGANIZATION").length}
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <p className="text-xs text-slate-500 uppercase font-semibold mb-2">
                    Other Scopes
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    {roles.filter((r) => r.scopeType !== "ORGANIZATION").length}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Create Role Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">Create Role</h2>
              <p className="text-sm text-slate-500 mt-1">
                Add a new role to your organization
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Role Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Project Manager"
                  value={form.roleName}
                  onChange={(e) =>
                    setForm({ ...form, roleName: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Code *
                </label>
                <input
                  type="text"
                  placeholder="e.g., PROJECT_MANAGER"
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Describe this role..."
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Scope Type
                </label>
                <select
                  value={form.scopeType}
                  onChange={(e) =>
                    setForm({ ...form, scopeType: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="ORGANIZATION">Organization</option>
                  <option value="TEAM">Team</option>
                  <option value="PROJECT">Project</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-900 rounded-lg font-medium hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Creating..." : "Create Role"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
