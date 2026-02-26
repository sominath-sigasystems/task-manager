"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Building2,
} from "lucide-react";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const router = useRouter();

  const [mode, setMode] = useState("user");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    slug: "",
    logo: "",
    address: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: "" });

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const endpoint =
        mode === "organization"
          ? "/api/register/organization"
          : "/api/register";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Registration failed");
        throw new Error(data.message || "Registration failed");
      }
      toast.success("Account created successfully!");
      setStatus({
        type: "success",
        message: "Account created successfully!",
      });

      // Auto login using credentials provider
      const loginRes = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (!loginRes?.ok) {
        throw new Error("Login failed after registration");
      }

      toast.success("Login successful");
      setTimeout(() => {
        router.push("/join-organization");
      }, 1200);
    } catch (err) {
      toast.error(err.message || "Something went wrong");
      setStatus({
        type: "error",
        message: err.message || "Something went wrong",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="mx-auto h-12 w-12 bg-black rounded-xl flex items-center justify-center mb-4">
          {mode === "user" ? (
            <User className="text-white h-6 w-6" />
          ) : (
            <Building2 className="text-white h-6 w-6" />
          )}
        </div>

        <h2 className="text-3xl font-extrabold text-slate-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl border border-slate-100 rounded-2xl">
          {/* Mode Selector */}
          <div className="flex gap-3 mb-6">
            <button
              type="button"
              onClick={() => setMode("user")}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold ${
                mode === "user"
                  ? "bg-black text-white"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              Register as User
            </button>

            <button
              type="button"
              onClick={() => setMode("organization")}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold ${
                mode === "organization"
                  ? "bg-black text-white"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              Register as Organization
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleRegister}>
            {status.type && (
              <div
                className={`p-3 rounded-lg text-sm ${
                  status.type === "success"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-rose-50 text-rose-700"
                }`}
              >
                {status.message}
              </div>
            )}

            {/* Name */}
            <input
              type="text"
              required
              placeholder={
                mode === "organization" ? "Organization Name" : "Full Name"
              }
              className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              disabled={isLoading}
            />

            {/* Email */}
            <input
              type="email"
              required
              placeholder="Email Address"
              className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              disabled={isLoading}
            />

            {/* Password */}
            <input
              type="password"
              required
              placeholder="Password"
              className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              disabled={isLoading}
            />

            {/* Organization Fields */}
            {mode === "organization" && (
              <>
                <input
                  type="text"
                  required
                  placeholder="Subdomain Slug (e.g. acme)"
                  className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl"
                  onChange={(e) =>
                    setForm({ ...form, slug: e.target.value.toLowerCase() })
                  }
                  disabled={isLoading}
                />

                <input
                  type="text"
                  placeholder="Logo URL"
                  className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl"
                  onChange={(e) => setForm({ ...form, logo: e.target.value })}
                  disabled={isLoading}
                />

                <input
                  type="text"
                  placeholder="Address"
                  className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl"
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  disabled={isLoading}
                />
              </>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl text-white bg-black hover:bg-slate-800 transition"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin h-4 w-4" />
                  Creating...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
