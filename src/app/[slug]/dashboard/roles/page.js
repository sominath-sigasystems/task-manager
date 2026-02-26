"use client";

import React, { useEffect, useState } from "react";

export default function RolesPage() {
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    roleName: "",
    code: "",
    description: "",
    scopeType: "ORGANIZATION",
  });

  // Fetch Roles
  const fetchRoles = async () => {
    try {
      const res = await fetch("/api/roles");
      const data = await res.json();
      setRoles(data.roles || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // Create Role
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to create role");

      await fetchRoles();
      setShowModal(false);
      setForm({
        roleName: "",
        code: "",
        description: "",
        scopeType: "ORGANIZATION",
      });
    } catch (err) {
      console.error(err);
      alert("Error creating role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Roles</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-black text-white px-4 py-2 rounded-md"
        >
          + Add Role
        </button>
      </div>

      {/* Roles Table */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Role Name</th>
              <th className="p-3">Code</th>
              <th className="p-3">Scope</th>
              <th className="p-3">Created At</th>
            </tr>
          </thead>
          <tbody>
            {roles.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No roles found
                </td>
              </tr>
            ) : (
              roles.map((role) => (
                <tr key={role._id} className="border-t">
                  <td className="p-3">{role.roleName}</td>
                  <td className="p-3">{role.code}</td>
                  <td className="p-3">{role.scopeType}</td>
                  <td className="p-3">
                    {new Date(role.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <h2 className="text-lg font-semibold mb-4">Create Role</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Role Name"
                value={form.roleName}
                onChange={(e) => setForm({ ...form, roleName: e.target.value })}
                className="w-full border p-2 rounded"
                required
              />

              <input
                type="text"
                placeholder="Code"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                className="w-full border p-2 rounded"
                required
              />

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full border p-2 rounded"
              />

              <select
                value={form.scopeType}
                onChange={(e) =>
                  setForm({ ...form, scopeType: e.target.value })
                }
                className="w-full border p-2 rounded"
              >
                <option value="ORGANIZATION">Organization</option>
                <option value="TEAM">Team</option>
                <option value="PROJECT">Project</option>
              </select>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-black text-white rounded"
                >
                  {loading ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
