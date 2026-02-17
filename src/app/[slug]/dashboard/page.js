"use client";
import React, { useState } from "react";
import {
  LayoutDashboard,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreVertical,
  Plus,
  Search,
  Users,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Kanban as KanbanIcon,
  MessageSquare,
  Paperclip,
  GripVertical,
} from "lucide-react";

// --- Mock Data ---
const stats = [
  {
    label: "Total Projects",
    value: "12",
    change: "+2",
    trend: "up",
    icon: LayoutDashboard,
  },
  {
    label: "Completed Tasks",
    value: "128",
    change: "+14%",
    trend: "up",
    icon: CheckCircle2,
  },
  {
    label: "In Progress",
    value: "43",
    change: "-3",
    trend: "down",
    icon: Clock,
  },
  {
    label: "Urgent Issues",
    value: "5",
    change: "+2",
    trend: "up",
    icon: AlertCircle,
  },
];

const initialProjects = [
  {
    id: 1,
    name: "Website Redesign",
    progress: 75,
    status: "In Progress",
    team: 4,
    dueDate: "Dec 24",
  },
  {
    id: 2,
    name: "Mobile App API",
    progress: 40,
    status: "Review",
    team: 3,
    dueDate: "Jan 05",
  },
  {
    id: 3,
    name: "Brand Identity",
    progress: 100,
    status: "Completed",
    team: 2,
    dueDate: "Dec 12",
  },
  {
    id: 4,
    name: "SEO Optimization",
    progress: 15,
    status: "Planned",
    team: 5,
    dueDate: "Feb 10",
  },
];

const initialTickets = {
  todo: [
    {
      id: "PROJ-101",
      title: "Design system audit",
      priority: "Medium",
      comments: 3,
      files: 1,
      user: "AR",
    },
    {
      id: "PROJ-104",
      title: "Update onboarding flow",
      priority: "High",
      comments: 0,
      files: 2,
      user: "SC",
    },
  ],
  "in-progress": [
    {
      id: "PROJ-102",
      title: "Auth middleware refactor",
      priority: "High",
      comments: 12,
      files: 4,
      user: "MJ",
    },
  ],
  review: [
    {
      id: "PROJ-105",
      title: "Landing page copy",
      priority: "Low",
      comments: 5,
      files: 0,
      user: "AR",
    },
  ],
  done: [
    {
      id: "PROJ-103",
      title: "Fix footer alignment",
      priority: "Low",
      comments: 2,
      files: 1,
      user: "SC",
    },
  ],
};

const activities = [
  {
    id: 1,
    user: "Alex Rivera",
    action: "completed task",
    target: "Homepage Hero Section",
    time: "2h ago",
  },
  {
    id: 2,
    user: "Sarah Chen",
    action: "added a comment to",
    target: "API Documentation",
    time: "4h ago",
  },
  {
    id: 3,
    user: "Mike Johnson",
    action: "uploaded files to",
    target: "Brand Assets",
    time: "5h ago",
  },
];

// --- Sub-components ---

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm ${className}`}
  >
    {children}
  </div>
);

const Badge = ({ variant = "default", children }) => {
  const variants = {
    default:
      "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100",
    success:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
    warning:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    blue: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    high: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${variants[variant]}`}
    >
      {children}
    </span>
  );
};

const Progress = ({ value }) => (
  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
    <div
      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
      style={{ width: `${value}%` }}
    />
  </div>
);

// --- Kanban Components ---

const KanbanTicket = ({ ticket, onDragStart }) => (
  <div
    draggable
    onDragStart={(e) => onDragStart(e, ticket)}
    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-lg shadow-sm hover:border-blue-400 dark:hover:border-blue-500 transition-all cursor-grab active:cursor-grabbing group"
  >
    <div className="flex justify-between items-start mb-2">
      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">
        {ticket.id}
      </span>
      <Badge
        variant={
          ticket.priority.toLowerCase() === "high"
            ? "high"
            : ticket.priority.toLowerCase() === "medium"
              ? "warning"
              : "default"
        }
      >
        {ticket.priority}
      </Badge>
    </div>
    <h4 className="text-sm font-medium mb-4 line-clamp-2">{ticket.title}</h4>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 text-slate-400">
        <div className="flex items-center gap-1 text-[11px]">
          <MessageSquare className="h-3 w-3" /> {ticket.comments}
        </div>
        <div className="flex items-center gap-1 text-[11px]">
          <Paperclip className="h-3 w-3" /> {ticket.files}
        </div>
      </div>
      <div className="h-6 w-6 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[10px] font-bold">
        {ticket.user}
      </div>
    </div>
  </div>
);

export default function DashboardOverview() {
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'kanban'
  const [columns, setColumns] = useState(initialTickets);
  const [draggedTicket, setDraggedTicket] = useState(null);

  const onDragStart = (e, ticket) => {
    setDraggedTicket(ticket);
    e.dataTransfer.setData("ticketId", ticket.id);
  };

  const onDrop = (e, targetCol) => {
    e.preventDefault();
    const ticketId = e.dataTransfer.getData("ticketId");

    // Find where the ticket currently is
    let sourceCol = "";
    Object.keys(columns).forEach((col) => {
      if (columns[col].find((t) => t.id === ticketId)) sourceCol = col;
    });

    if (sourceCol === targetCol) return;

    const newColumns = { ...columns };
    const ticketToMove = newColumns[sourceCol].find((t) => t.id === ticketId);

    newColumns[sourceCol] = newColumns[sourceCol].filter(
      (t) => t.id !== ticketId,
    );
    newColumns[targetCol] = [...newColumns[targetCol], ticketToMove];

    setColumns(newColumns);
    setDraggedTicket(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-8 space-y-8 font-sans text-slate-900 dark:text-slate-100">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Project Delta</h1>
          <div className="flex items-center gap-4 mt-2">
            <nav className="flex bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab("overview")}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === "overview" ? "bg-white dark:bg-slate-700 shadow-sm text-blue-600" : "text-slate-500 hover:text-slate-700"}`}
              >
                <LayoutDashboard className="h-4 w-4" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab("kanban")}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === "kanban" ? "bg-white dark:bg-slate-700 shadow-sm text-blue-600" : "text-slate-500 hover:text-slate-700"}`}
              >
                <KanbanIcon className="h-4 w-4" />
                Kanban
              </button>
            </nav>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20">
            <Plus className="h-4 w-4" />
            Create Issue
          </button>
        </div>
      </div>

      {activeTab === "overview" ? (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {stats.map((stat, i) => (
              <Card key={i} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    <stat.icon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                  </div>
                  <div
                    className={`flex items-center text-xs font-medium ${stat.trend === "up" ? "text-emerald-600" : "text-rose-600"}`}
                  >
                    {stat.change}
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3 ml-0.5" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 ml-0.5" />
                    )}
                  </div>
                </div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {stat.label}
                </p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Active Projects Table */}
            <Card className="lg:col-span-2">
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Project Milestones</h2>
                <button className="text-sm text-blue-600 hover:underline">
                  View Roadmap
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-xs uppercase text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">
                      <th className="px-6 py-4 font-medium">Task</th>
                      <th className="px-6 py-4 font-medium">Progress</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Team</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {initialProjects.map((project) => (
                      <tr
                        key={project.id}
                        className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium">{project.name}</div>
                          <div className="text-xs text-slate-500">
                            Due {project.dueDate}
                          </div>
                        </td>
                        <td className="px-6 py-4 w-48">
                          <div className="flex items-center gap-3">
                            <Progress value={project.progress} />
                            <span className="text-xs font-medium">
                              {project.progress}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            variant={
                              project.status === "Completed"
                                ? "success"
                                : project.status === "In Progress"
                                  ? "blue"
                                  : project.status === "Review"
                                    ? "warning"
                                    : "default"
                            }
                          >
                            {project.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex -space-x-2">
                            {[...Array(3)].map((_, i) => (
                              <div
                                key={i}
                                className="h-7 w-7 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-white dark:border-slate-950 flex items-center justify-center text-[10px] font-bold"
                              >
                                {String.fromCharCode(65 + i + project.id)}
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Recent Activity Feed */}
            <Card>
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 font-semibold">
                Activity Stream
              </div>
              <div className="p-6 space-y-6">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 shrink-0">
                      <Users className="h-4 w-4" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm">
                        <span className="font-semibold">{activity.user}</span>{" "}
                        {activity.action}{" "}
                        <span className="text-blue-600 font-medium">
                          {activity.target}
                        </span>
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </>
      ) : (
        /* Kanban View */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 animate-in fade-in zoom-in-95 duration-300 items-start">
          {Object.keys(columns).map((colId) => (
            <div
              key={colId}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => onDrop(e, colId)}
              className="flex flex-col gap-4 min-h-[500px]"
            >
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    {colId.replace("-", " ")}
                  </h3>
                  <span className="bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded text-[10px] font-bold">
                    {columns[colId].length}
                  </span>
                </div>
                <button className="text-slate-400 hover:text-slate-600 transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-col gap-3 p-2 bg-slate-200/30 dark:bg-slate-800/20 rounded-xl min-h-[200px] border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all">
                {columns[colId].map((ticket) => (
                  <KanbanTicket
                    key={ticket.id}
                    ticket={ticket}
                    onDragStart={onDragStart}
                  />
                ))}

                {columns[colId].length === 0 && (
                  <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg p-8">
                    <p className="text-xs text-slate-400 italic font-medium">
                      No issues here
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
