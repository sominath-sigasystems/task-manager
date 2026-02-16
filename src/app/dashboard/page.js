"use client";

import React, { useState, useEffect } from "react";
import {
  LogOut,
  Settings,
  Bell,
  LayoutDashboard,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  Loader2,
  Building2,
  FolderKanban,
  Users2,
  Lock,
  UserCircle,
  Search,
  Plus,
  MoreVertical,
  Filter
} from "lucide-react";

/**
 * Advanced Project Management Dashboard
 * Resolved: Runtime error regarding event handler serialization.
 */
export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [activeTab, setActiveTab] = useState("Organizations");
  const [isOrgOpen, setIsOrgOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSession({
        user: {
          name: "Alex Thompson",
          email: "alex.t@example.com",
          avatar: "AT",
          role: "Admin",
          organization: "Nexus Global"
        },
      });
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => setSession(null);

  // Helper component defined inside to ensure it has access to state setters correctly
  const NavItem = ({ icon: Icon, label, subItems = [], id }) => {
    const isActive = activeTab === id;
    const hasSubItems = subItems.length > 0;

    const handleNavClick = () => {
      setActiveTab(id);
      if (hasSubItems) {
        setIsOrgOpen((prev) => !prev);
      }
    };

    return (
      <div className="space-y-1">
        <button
          type="button"
          onClick={handleNavClick}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
            isActive ? "bg-slate-900 text-white shadow-md" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <div className="flex items-center gap-3">
            <Icon className="h-4 w-4" />
            {label}
          </div>
          {hasSubItems && (
            <ChevronDown className={`h-3 w-3 transition-transform ${isOrgOpen ? "" : "-rotate-90"}`} />
          )}
        </button>
        
        {hasSubItems && isOrgOpen && (
          <div className="ml-4 pl-4 border-l border-slate-200 space-y-1 mt-1">
            {subItems.map((sub) => (
              <button
                key={sub}
                type="button"
                className="w-full text-left px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-black hover:bg-slate-50 rounded-lg transition-colors"
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
        <p className="text-slate-500 font-medium">Synchronizing workspace...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-slate-100 text-center">
          <ShieldCheck className="h-12 w-12 text-rose-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Session Expired</h2>
          <p className="text-slate-500 mb-8">Please sign in to access your organization's workspace.</p>
          <button 
            type="button"
            className="w-full py-3 bg-black text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col border-r border-slate-200 bg-white p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-3 px-2 mb-8">
          <div className="h-9 w-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <FolderKanban className="text-white h-5 w-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">NexusPM</span>
        </div>

        <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar">
          <div>
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Main Navigation</p>
            <nav className="space-y-1">
              <NavItem icon={LayoutDashboard} label="Dashboard" id="Overview" />
              <NavItem 
                icon={Building2} 
                label="Organizations" 
                id="Organizations" 
                subItems={["Nexus Global", "TechFlow Inc", "Create New +"]} 
              />
              <NavItem icon={FolderKanban} label="Projects" id="Projects" />
              <NavItem icon={Users2} label="Teams" id="Teams" />
            </nav>
          </div>

          <div>
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Governance</p>
            <nav className="space-y-1">
              <NavItem icon={Lock} label="Roles & Permissions" id="Roles" />
              <NavItem icon={Users2} label="Member List" id="Members" />
            </nav>
          </div>

          <div>
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">User</p>
            <nav className="space-y-1">
              <NavItem icon={UserCircle} label="My Profile" id="Profile" />
              <NavItem icon={Settings} label="Settings" id="Settings" />
            </nav>
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-slate-100">
          <div className="flex items-center gap-3 px-3 py-3 bg-slate-50 rounded-2xl mb-4">
            <div className="h-8 w-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
              {session.user.avatar}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">{session.user.name}</p>
              <p className="text-[10px] text-slate-400 font-medium">{session.user.role}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-rose-500 hover:bg-rose-50 transition-all"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-20">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md w-full hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search projects, members..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500/20 rounded-xl text-sm transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button type="button" className="p-2 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-all relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-blue-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-px w-4 bg-slate-200 rotate-90 mx-1" />
            <button type="button" className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-95">
              <Plus className="h-4 w-4" />
              New Project
            </button>
          </div>
        </header>

        <div className="p-6 lg:p-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-2 uppercase tracking-widest">
                <Building2 className="h-3 w-3" />
                <span>{session.user.organization}</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-blue-600">{activeTab}</span>
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                {activeTab === "Members" ? "Workspace Members" : "Organization Overview"}
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              <button type="button" className="p-2 border border-slate-200 rounded-xl hover:bg-white transition-all text-slate-600">
                <Filter className="h-4 w-4" />
              </button>
              <button type="button" className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold hover:shadow-md transition-all">
                Export Data
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Member</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Role</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Teams</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { name: "Alex Thompson", email: "alex.t@example.com", role: "Admin", teams: ["Product", "Leadership"], status: "Active" },
                    { name: "Sarah Chen", email: "s.chen@example.com", role: "Editor", teams: ["Design"], status: "Active" },
                    { name: "Marcus Wright", email: "m.wright@example.com", role: "Viewer", teams: ["Marketing"], status: "Away" },
                    { name: "Elena Rodriguez", email: "elena@example.com", role: "Admin", teams: ["Engineering"], status: "Active" },
                  ].map((member, i) => (
                    <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-600">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{member.name}</p>
                            <p className="text-xs text-slate-400">{member.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${member.role === 'Admin' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                          {member.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1 flex-wrap">
                          {member.teams.map(t => (
                            <span key={t} className="px-2 py-0.5 bg-slate-50 border border-slate-100 text-slate-500 text-[10px] rounded-full font-medium italic">
                              #{t.toLowerCase()}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <div className={`h-1.5 w-1.5 rounded-full ${member.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
                          <span className="text-xs font-semibold text-slate-600">{member.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button type="button" className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                   <Lock className="h-24 w-24" />
                 </div>
                 <h3 className="text-lg font-bold mb-2">Access Control</h3>
                 <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                   Manage granular permissions for specific project boards and team channels. 
                 </p>
                 <button type="button" className="flex items-center gap-2 text-blue-600 text-sm font-bold hover:gap-4 transition-all">
                   Manage Global Policies <ChevronRight className="h-4 w-4" />
                 </button>
              </div>
              
              <div className="bg-slate-900 p-8 rounded-[32px] text-white shadow-xl shadow-blue-900/10">
                 <h3 className="text-lg font-bold mb-2">System Health</h3>
                 <div className="space-y-4 mt-6">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Database Load</span>
                      <span className="font-mono text-emerald-400">12%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                       <div className="bg-emerald-500 h-full w-[12%]" />
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">API Latency</span>
                      <span className="font-mono text-blue-400">42ms</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}