"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ App Router
import { signIn } from "next-auth/react"; // ✅ NextAuth
import {
  User,
  Mail,
  Lock,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
export default function LoginPage() {
  const router = useRouter();

  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: null, message: "" });

    try {
      // Call NextAuth Credentials Provider
      const res = await signIn("credentials", {
        redirect: false, // prevent automatic redirect
        email,
        password,
      });

      if (res?.ok) {
        setStatus({
          type: "success",
          message: "Login successful! Redirecting to dashboard...",
        });
        toast.success("Login successful");

        // Redirect after success
        setTimeout(() => {
          router.push("/join-organization");
        }, 1000);
      } else {
        toast.error("Invalid credentials");

        setStatus({
          type: "error",
          message: res?.error || "Invalid email or password.",
        });
      }
    } catch (err) {
      toast.error("Network error, please try again.");

      setStatus({
        type: "error",
        message: "Network error, please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="mx-auto h-12 w-12 bg-black rounded-2xl flex items-center justify-center shadow-lg mb-6">
          <Lock className="text-white h-6 w-6" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Welcome Back
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Please enter your details to sign in
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-8 shadow-2xl shadow-slate-200/60 border border-slate-100 rounded-3xl sm:px-12">
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Status Feedback */}
            {status.type && (
              <div
                className={`p-4 rounded-xl flex items-center gap-3 text-sm animate-in fade-in zoom-in duration-300 ${
                  status.type === "success"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                    : "bg-rose-50 text-rose-700 border border-rose-100"
                }`}
              >
                {status.type === "success" ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 shrink-0" />
                )}
                <span className="font-medium">{status.message}</span>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-slate-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-black transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all placeholder:text-slate-400 text-slate-900 bg-slate-50/50 focus:bg-white sm:text-sm"
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-bold text-slate-700"
                >
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs font-bold text-slate-400 hover:text-black transition-colors"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-black transition-colors">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all placeholder:text-slate-400 text-slate-900 bg-slate-50/50 focus:bg-white sm:text-sm"
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-xl text-sm font-bold text-white bg-black hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                <span className="flex items-center gap-2">
                  Sign In{" "}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              Don`t have an account yet?{" "}
              <button
                onClick={() => router.push("/register")}
                className="font-bold text-black hover:underline underline-offset-4"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>

      <p className="mt-12 text-center text-xs text-slate-400">
        &copy; 2024 Your Platform. All rights reserved.
      </p>
    </div>
  );
}
