"use client";

import { useEffect, useState } from "react";
import { useOrganizationStore } from "@/store/organizationStore";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function JoinRequestsPage() {
  const organizationId = useOrganizationStore((state) => state.organizationId);

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    if (!organizationId) return;

    const fetchPendingRequests = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/join-request/pending?organizationId=${organizationId}`,
          {
            credentials: "include",
          },
        );

        if (!res.ok) {
          console.error("Failed to fetch join requests");
          return;
        }

        const data = await res.json();
        setRequests(Array.isArray(data.requests) ? data.requests : []);
      } catch (error) {
        console.error("Error fetching join requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingRequests();
  }, [organizationId]);

  const handleAction = async (requestId, action) => {
    try {
      setProcessingId(requestId);

      const res = await fetch("/api/join-request/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          requestId,
          organizationId,
          status: action,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        toast.error("Failed to update request");
        return;
      }

      setRequests((prev) =>
        prev.filter((request) => request._id !== requestId),
      );
      toast.success(data.message);
    } catch (error) {
      toast.error("Update error:", error);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Review and manage incoming join requests.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stats */}
          <div className="flex items-center justify-between border rounded-lg p-4">
            <div>
              <p className="text-sm text-muted-foreground">Pending Requests</p>
              <p className="text-2xl font-semibold">
                {loading ? "—" : requests.length}
              </p>
            </div>
            <Badge variant="secondary">Active</Badge>
          </div>

          {/* Table */}
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground">
                    User
                  </th>
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground">
                    Requested At
                  </th>
                  <th className="text-right px-6 py-3 font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {loading &&
                  [...Array(3)].map((_, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4">
                        <Skeleton className="h-4 w-40" />
                      </td>
                      <td className="px-6 py-4">
                        <Skeleton className="h-4 w-32" />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Skeleton className="h-8 w-24 ml-auto" />
                      </td>
                    </tr>
                  ))}

                {!loading && requests.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="text-center py-12 text-muted-foreground"
                    >
                      No pending join requests.
                    </td>
                  </tr>
                )}

                {!loading &&
                  requests.map((req) => (
                    <tr key={req._id} className="hover:bg-muted/40 transition">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {req?.userId?.name || "Unknown"}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {req?.userId?.email || "—"}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-muted-foreground">
                        {req?.createdAt
                          ? new Date(req.createdAt).toLocaleString()
                          : "—"}
                      </td>

                      <td className="px-6 py-4 text-right space-x-2">
                        <Button
                          size="sm"
                          disabled={processingId === req._id}
                          onClick={() => handleAction(req._id, "approved")}
                        >
                          {processingId === req._id
                            ? "Processing..."
                            : "Approve"}
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={processingId === req._id}
                          onClick={() => handleAction(req._id, "rejected")}
                        >
                          Reject
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
