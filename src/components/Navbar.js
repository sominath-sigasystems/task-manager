"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  Rocket,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  Briefcase,
  UserPlus,
  LogIn,
} from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLink = ({ href, children, icon: Icon }) => (
    <Link
      href={href}
      className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 hover:text-black transition-colors rounded-lg hover:bg-slate-50"
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="bg-black p-1.5 rounded-lg group-hover:scale-110 transition-transform">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              TaskManager
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {session ? (
              <>
                <NavLink href="/dashboard" icon={LayoutDashboard}>
                  Dashboard
                </NavLink>

                <NavLink href="/projects" icon={Briefcase}>
                  Projects
                </NavLink>

                <div className="h-4 w-px bg-slate-200 mx-2" />

                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink href="/join-organization" icon={LogIn}>
                  Login
                </NavLink>

                <Link
                  href="/register"
                  className="ml-2 bg-black text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-95"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-black transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 animate-in slide-in-from-top-4 duration-200">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="w-full flex items-center gap-3 px-4 py-3 text-slate-900 font-semibold bg-slate-50 rounded-xl"
                >
                  <LayoutDashboard className="w-5 h-5" /> Dashboard
                </Link>

                <Link
                  href="/projects"
                  className="w-full flex items-center gap-3 px-4 py-3 text-slate-900 font-semibold bg-slate-50 rounded-xl"
                >
                  <Briefcase className="w-5 h-5" /> Projects
                </Link>

                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full flex items-center gap-3 px-4 py-3 text-rose-600 font-bold bg-rose-50 rounded-xl"
                >
                  <LogOut className="w-5 h-5" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="w-full flex items-center gap-3 px-4 py-3 text-slate-900 font-semibold bg-slate-50 rounded-xl"
                >
                  <LogIn className="w-5 h-5" /> Login
                </Link>

                <Link
                  href="/register"
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-black text-white font-bold rounded-xl"
                >
                  <UserPlus className="w-5 h-5" /> Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
