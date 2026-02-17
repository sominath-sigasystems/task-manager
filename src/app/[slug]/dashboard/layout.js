"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users2,
  FolderKanban,
  Building2,
  UserCircle,
  Bell,
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const { slug } = useParams();
  const pathname = usePathname();
  const router = useRouter();

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "" },
    { name: "Members", icon: Users2, path: "members" },
    { name: "Teams", icon: Users2, path: "teams" },
    { name: "Organizations", icon: Building2, path: "organizations" },
    { name: "Projects", icon: FolderKanban, path: "projects" },
    { name: "Profile", icon: UserCircle, path: "profile" },
    { name: "Notifications", icon: Bell, path: "notification" },
  ];

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-white border-r p-6 space-y-2">
        {menu.map((item) => {
          const fullPath = `/${slug}/dashboard/${item.path}`;
          const isActive =
            (pathname === `/${slug}/dashboard` && item.path === "") ||
            pathname === fullPath;

          return (
            <button
              key={item.name}
              onClick={() =>
                router.push(
                  item.path
                    ? `/${slug}/dashboard/${item.path}`
                    : `/${slug}/dashboard`,
                )
              }
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                isActive
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <item.icon size={16} />
              {item.name}
            </button>
          );
        })}
      </aside>

      <main className="flex-1 p-8 bg-slate-50">{children}</main>
    </div>
  );
}
