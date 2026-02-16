"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Building2,
  ArrowRight,
  LogIn,
  Loader2,
  UserPlus,
} from "lucide-react";

export default function JoinOrganizationPage() {
  const [organizations, setOrganizations] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [joiningId, setJoiningId] = useState(null);

  useEffect(() => {
    fetchUserOrganizations();
  }, []);

  async function fetchUserOrganizations() {
    setLoading(true);
    try {
      const res = await fetch("/api/user/organizations", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to load organizations");

      const data = await res.json();
      setOrganizations(data.organizations || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function searchOrganization() {
    if (!search.trim()) return;

    setSearching(true);
    try {
      const res = await fetch(`/api/organization/search?query=${search}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Search failed");

      const data = await res.json();
      setResults(data.organizations || []);
    } catch (err) {
      console.error(err);
    } finally {
      setSearching(false);
    }
  }

  async function sendJoinRequest(orgId) {
    setJoiningId(orgId);

    try {
      const res = await fetch("/api/organization/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ organizationId: orgId }),
      });

      if (!res.ok) throw new Error("Join request failed");

      // Update UI to pending
      setResults((prev) =>
        prev.map((org) =>
          org._id === orgId ? { ...org, isPending: true } : org,
        ),
      );
    } catch (err) {
      console.error(err);
    } finally {
      setJoiningId(null);
    }
  }

  function enterOrganization(slug) {
    window.location.href = `http://${slug}.localhost:3000/login`;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
      <main className="w-full max-w-3xl py-16 px-6">
        <h1 className="text-4xl font-bold text-center mb-10">
          Select Organization
        </h1>
        <p>Organizations not loading</p>

        {/* SEARCH */}
        <div className="relative mb-10">
          <input
            type="text"
            placeholder="Search organization..."
            className="w-full border p-4 rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchOrganization()}
          />
          <button
            onClick={searchOrganization}
            className="absolute right-2 top-2 px-4 py-2 bg-black text-white rounded-lg"
          >
            {searching ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              "Search"
            )}
          </button>
        </div>

        {/* SEARCH RESULTS */}
        {results.length > 0 && (
          <div className="space-y-4 mb-12">
            {results.map((org) => (
              <div
                key={org._id}
                className="flex justify-between items-center bg-white p-4 rounded-xl border"
              >
                <div>
                  <p className="font-semibold">{org.name}</p>
                  <p className="text-sm text-gray-400">{org.slug}.localhost</p>
                </div>

                {org.isMember ? (
                  <button
                    onClick={() => enterOrganization(org.slug)}
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg"
                  >
                    <LogIn size={16} />
                    Enter
                  </button>
                ) : org.isPending ? (
                  <button
                    disabled
                    className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg"
                  >
                    Pending Approval
                  </button>
                ) : (
                  <button
                    onClick={() => sendJoinRequest(org._id)}
                    disabled={joiningId === org._id}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    {joiningId === org._id ? (
                      <Loader2 className="animate-spin w-4 h-4" />
                    ) : (
                      <UserPlus size={16} />
                    )}
                    Send Request
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* USER ORGS */}
        <div>
          <h3 className="mb-4 font-semibold">Your Organizations</h3>

          {loading ? (
            <Loader2 className="animate-spin" />
          ) : organizations.length > 0 ? (
            <div className="space-y-4">
              {organizations.map((org) => (
                <button
                  key={org._id}
                  onClick={() => enterOrganization(org.slug)}
                  className="w-full flex justify-between items-center bg-white p-4 rounded-xl border"
                >
                  <div>
                    <p className="font-semibold">{org.name}</p>
                    <p className="text-sm text-gray-400">
                      {org.slug}.localhost
                    </p>
                  </div>
                  <ArrowRight size={18} />
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">
              You haven't joined any organizations yet.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
