"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, LogIn, Loader2, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
export default function JoinOrganizationPage() {
  const router = useRouter();

  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [joiningId, setJoiningId] = useState(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "authenticated") return;

    async function checkOwnedOrganization() {
      try {
        const res = await fetch("/api/organizations/me", {
          credentials: "include",
        });

        if (!res.ok) return;

        const data = await res.json();

        if (data.organization?.slug) {
          router.replace(`/${data.organization.slug}/dashboard`);
        }
      } catch (error) {
        console.error("Organization check failed:", error);
      }
    }

    checkOwnedOrganization();
  }, [status, router]);
  useEffect(() => {
    fetchOrganizations();
  }, []);

  async function fetchOrganizations() {
    setLoading(true);

    try {
      const res = await fetch("/api/organizations", {
        credentials: "include",
      });

      if (!res.ok) {
        toast.error(`Failed (${res.status})`);
        throw new Error(`Failed (${res.status})`);
      }

      const data = await res.json();
      setOrganizations(data.organizations ?? []);
    } catch (err) {
      toast.error(err);
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  async function sendJoinRequest(orgId) {
    setJoiningId(orgId);

    try {
      const res = await fetch("/api/join-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ organizationId: orgId }),
      });

      if (!res.ok) {
        toast.error("Join request failed");
        throw new Error("Join request failed");
      }
      toast.success("Request send..");
      // Refresh organization list
      await fetchOrganizations();
    } catch (err) {
      toast.error(err);
      console.error(err);
    } finally {
      setJoiningId(null);
    }
  }

  function enterOrganization(slug) {
    router.push(`/${slug}/dashboard`);
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
      <main className="w-full max-w-3xl py-16 px-6">
        <h1 className="text-4xl font-bold text-center mb-10">
          Select Organization
        </h1>

        {loading ? (
          <Loader2 className="animate-spin mx-auto" />
        ) : organizations.length > 0 ? (
          <div className="space-y-4">
            {organizations.map((org) => (
              <div
                key={org.id}
                className="flex justify-between items-center bg-white p-4 rounded-xl border"
              >
                <div>
                  <p className="font-semibold">{org.name}</p>
                  <p className="text-sm text-gray-400">{org.slug}.localhost</p>
                </div>

                {org.membershipStatus === "member" && (
                  <button
                    onClick={() => enterOrganization(org.slug)}
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg"
                  >
                    <LogIn size={16} />
                    Enter
                  </button>
                )}

                {org.membershipStatus === "pending" && (
                  <button
                    disabled
                    className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg"
                  >
                    Pending Approval
                  </button>
                )}

                {org.membershipStatus === "none" && (
                  <button
                    onClick={() => sendJoinRequest(org.id)}
                    disabled={joiningId === org.id}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    {joiningId === org.id ? (
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
        ) : (
          <p className="text-gray-400 text-center">
            No organizations available.
          </p>
        )}
      </main>
    </div>
  );
}
