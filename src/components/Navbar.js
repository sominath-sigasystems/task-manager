"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  Rocket,
  Menu,
  X,
  LayoutDashboard,
  Briefcase,
  UserPlus,
  LogIn,
  Settings,
  LogOut,
  User,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const slug = pathname?.split("/")[1];
  const dashboardLink = slug ? `/${slug}/dashboard` : "/join-organization";
  const profileLink = slug ? `/${slug}/profile` : "/profile";
  const settingsLink = slug ? `/${slug}/settings` : "/settings";

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="w-full px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-black p-1.5 rounded-lg">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold">TaskManager</span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {session ? (
              <>
                <Link
                  href={dashboardLink}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>


                {/* Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="focus:outline-none">
                      <Avatar className="h-9 w-9 cursor-pointer">
                        <AvatarImage
                          src={session?.user?.image || ""}
                          alt="Profile"
                        />
                        <AvatarFallback>
                          {getInitials(session?.user?.name)}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link
                        href={profileLink}
                        className="flex items-center gap-2"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link
                        href={settingsLink}
                        className="flex items-center gap-2"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="text-rose-600 focus:text-rose-600"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>

                <Link
                  href="/register"
                  className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black/80"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-6 py-4 space-y-4">
            {session ? (
              <>
                <Link
                  href={dashboardLink}
                  className="flex items-center gap-3 text-sm font-medium"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Dashboard
                </Link>

                <Link
                  href={profileLink}
                  className="flex items-center gap-3 text-sm font-medium"
                >
                  <User className="w-5 h-5" />
                  Profile
                </Link>

                <Link
                  href={settingsLink}
                  className="flex items-center gap-3 text-sm font-medium"
                >
                  <Settings className="w-5 h-5" />
                  Settings
                </Link>

                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-3 text-sm font-semibold text-rose-600"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center gap-3 text-sm font-medium"
                >
                  <LogIn className="w-5 h-5" />
                  Login
                </Link>

                <Link
                  href="/register"
                  className="flex items-center justify-center gap-3 bg-black text-white py-2 rounded-lg text-sm font-semibold"
                >
                  <UserPlus className="w-5 h-5" />
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
