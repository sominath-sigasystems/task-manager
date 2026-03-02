"use client";
import React, { useState, useMemo } from "react";
import {
  LayoutDashboard,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  BarChart3,
  Users,
  TrendingUp,
  Filter,
  ChevronDown,
  Calendar,
  Priority,
  Kanban as KanbanIcon,
  List,
  Grid3x3,
  PieChart,
  Activity,
  MessageSquare,
  Paperclip,
  CalendarDays,
  User,
  Tag,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

// --- Mock Data ---
const allProjects = [
  { id: 1, name: "Website Redesign", color: "blue" },
  { id: 2, name: "Mobile App API", color: "purple" },
  { id: 3, name: "Brand Identity", color: "pink" },
  { id: 4, name: "SEO Optimization", color: "green" },
];

const allUsers = [
  { id: 1, name: "Alex Rivera", initials: "AR", color: "bg-blue-500" },
  { id: 2, name: "Sarah Chen", initials: "SC", color: "bg-purple-500" },
  { id: 3, name: "Mike Johnson", initials: "MJ", color: "bg-pink-500" },
  { id: 4, name: "Emma Wilson", initials: "EW", color: "bg-green-500" },
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

const initialTickets = {
  todo: [
    {
      id: "PROJ-101",
      title: "Design system audit",
      description: "Comprehensive review of existing design system",
      priority: "Medium",
      comments: 3,
      files: 1,
      assignee: "AR",
      project: "Website Redesign",
      dueDate: "2024-12-28",
      createdAt: "2024-12-10",
      status: "todo",
    },
    {
      id: "PROJ-104",
      title: "Update onboarding flow",
      description: "Redesign user onboarding experience",
      priority: "High",
      comments: 0,
      files: 2,
      assignee: "SC",
      project: "Mobile App API",
      dueDate: "2024-12-25",
      createdAt: "2024-12-05",
      status: "todo",
    },
  ],
  "in-progress": [
    {
      id: "PROJ-102",
      title: "Auth middleware refactor",
      description: "Refactor authentication middleware for better performance",
      priority: "High",
      comments: 12,
      files: 4,
      assignee: "MJ",
      project: "Mobile App API",
      dueDate: "2024-12-30",
      createdAt: "2024-11-15",
      status: "in-progress",
    },
  ],
  review: [
    {
      id: "PROJ-105",
      title: "Landing page copy",
      description: "Write and optimize landing page copy",
      priority: "Low",
      comments: 5,
      files: 0,
      assignee: "AR",
      project: "Website Redesign",
      dueDate: "2024-12-20",
      createdAt: "2024-12-01",
      status: "review",
    },
  ],
  done: [
    {
      id: "PROJ-103",
      title: "Fix footer alignment",
      description: "Fix alignment issues in footer component",
      priority: "Low",
      comments: 2,
      files: 1,
      assignee: "SC",
      project: "Brand Identity",
      dueDate: "2024-12-12",
      createdAt: "2024-11-20",
      status: "done",
    },
  ],
};

const stats = [
  {
    label: "Total Tickets",
    value: "26",
    change: "+4",
    trend: "up",
    icon: CheckCircle2,
  },
  {
    label: "In Progress",
    value: "8",
    change: "+2",
    trend: "up",
    icon: Clock,
  },
  {
    label: "Completed",
    value: "12",
    change: "+6",
    trend: "up",
    icon: CheckCircle2,
  },
  {
    label: "High Priority",
    value: "5",
    change: "-1",
    trend: "down",
    icon: AlertCircle,
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
    medium:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    low: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100",
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

// Kanban Ticket Component
const KanbanTicket = ({ ticket, onDragStart }) => {
  const user = allUsers.find((u) => u.initials === ticket.assignee);
  const getPriorityVariant = (priority) => {
    return priority.toLowerCase() === "high"
      ? "high"
      : priority.toLowerCase() === "medium"
        ? "medium"
        : "low";
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, ticket)}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-lg shadow-sm hover:border-blue-400 dark:hover:border-blue-500 transition-all cursor-grab active:cursor-grabbing hover:shadow-md"
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">
          {ticket.id}
        </span>
        <Badge variant={getPriorityVariant(ticket.priority)}>
          {ticket.priority}
        </Badge>
      </div>
      <h4 className="text-sm font-medium mb-3 line-clamp-2">{ticket.title}</h4>
      <p className="text-xs text-slate-500 mb-3 line-clamp-1">
        {ticket.description}
      </p>
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 text-slate-400">
          <div className="flex items-center gap-1 text-[11px]">
            <MessageSquare className="h-3 w-3" /> {ticket.comments}
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <Paperclip className="h-3 w-3" /> {ticket.files}
          </div>
        </div>
        {user && (
          <div
            className={`h-6 w-6 rounded-full ${user.color} flex items-center justify-center text-[10px] font-bold text-white`}
          >
            {user.initials}
          </div>
        )}
      </div>
    </div>
  );
};

// List View Row
const TicketRow = ({ ticket }) => {
  const user = allUsers.find((u) => u.initials === ticket.assignee);
  const getPriorityVariant = (priority) => {
    return priority.toLowerCase() === "high"
      ? "high"
      : priority.toLowerCase() === "medium"
        ? "medium"
        : "low";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "done":
        return "success";
      case "review":
        return "warning";
      case "in-progress":
        return "blue";
      default:
        return "default";
    }
  };

  return (
    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-100 dark:border-slate-800">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-400 uppercase">
            {ticket.id}
          </span>
          <div>
            <p className="text-sm font-medium">{ticket.title}</p>
            <p className="text-xs text-slate-500">{ticket.description}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <Badge variant={getStatusColor(ticket.status)}>
          {ticket.status.replace("-", " ")}
        </Badge>
      </td>
      <td className="px-6 py-4">
        <Badge variant={getPriorityVariant(ticket.priority)}>
          {ticket.priority}
        </Badge>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-slate-600">{ticket.project}</span>
      </td>
      <td className="px-6 py-4">
        {user && (
          <div className="flex items-center gap-2">
            <div
              className={`h-6 w-6 rounded-full ${user.color} flex items-center justify-center text-[10px] font-bold text-white`}
            >
              {user.initials}
            </div>
            <span className="text-sm">{user.name}</span>
          </div>
        )}
      </td>
      <td className="px-6 py-4 text-sm text-slate-600">
        {new Date(ticket.dueDate).toLocaleDateString()}
      </td>
    </tr>
  );
};

export default function DashboardOverview() {
  const [activeView, setActiveView] = useState("overview");
  const [selectedProject, setSelectedProject] = useState("all");
  const [selectedUser, setSelectedUser] = useState("all");
  const [columns, setColumns] = useState(initialTickets);
  const [draggedTicket, setDraggedTicket] = useState(null);

  const allTickets = useMemo(() => {
    return Object.values(columns).flat();
  }, [columns]);

  const filteredTickets = useMemo(() => {
    return allTickets.filter((ticket) => {
      const projectMatch =
        selectedProject === "all" || ticket.project === selectedProject;
      const userMatch =
        selectedUser === "all" || ticket.assignee === selectedUser;
      return projectMatch && userMatch;
    });
  }, [allTickets, selectedProject, selectedUser]);

  const reportStats = useMemo(() => {
    const filtered = filteredTickets;
    const total = filtered.length;
    const completed = filtered.filter((t) => t.status === "done").length;
    const inProgress = filtered.filter(
      (t) => t.status === "in-progress",
    ).length;
    const highPriority = filtered.filter((t) => t.priority === "High").length;
    const completionRate =
      total > 0 ? Math.round((completed / total) * 100) : 0;

    const priorityCounts = {
      High: filtered.filter((t) => t.priority === "High").length,
      Medium: filtered.filter((t) => t.priority === "Medium").length,
      Low: filtered.filter((t) => t.priority === "Low").length,
    };

    const statusCounts = {
      todo: filtered.filter((t) => t.status === "todo").length,
      "in-progress": filtered.filter((t) => t.status === "in-progress").length,
      review: filtered.filter((t) => t.status === "review").length,
      done: filtered.filter((t) => t.status === "done").length,
    };

    const userStats = allUsers.map((user) => {
      const userTickets = filtered.filter((t) => t.assignee === user.initials);
      return {
        name: user.name,
        total: userTickets.length,
        completed: userTickets.filter((t) => t.status === "done").length,
        inProgress: userTickets.filter((t) => t.status === "in-progress")
          .length,
      };
    });

    const overdueTickets = filtered.filter(
      (t) => new Date(t.dueDate) < new Date() && t.status !== "done",
    ).length;

    return {
      total,
      completed,
      inProgress,
      highPriority,
      completionRate,
      overdueTickets,
      priorityCounts,
      statusCounts,
      userStats,
    };
  }, [filteredTickets]);

  const onDragStart = (e, ticket) => {
    setDraggedTicket(ticket);
    e.dataTransfer.setData("ticketId", ticket.id);
  };

  const onDrop = (e, targetCol) => {
    e.preventDefault();
    const ticketId = e.dataTransfer.getData("ticketId");

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
      {/* Header & Controls */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Project Management
            </h1>
            <p className="text-slate-500 mt-1">
              Manage and track all your projects
            </p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20">
            <Plus className="h-4 w-4" />
            Create Ticket
          </button>
        </div>

        {/* View Tabs */}
        <div className="flex flex-wrap gap-2 bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-lg w-fit">
          {[
            { id: "overview", label: "Overview", icon: LayoutDashboard },
            { id: "board", label: "Board", icon: Grid3x3 },
            { id: "kanban", label: "Kanban", icon: KanbanIcon },
            { id: "list", label: "List", icon: List },
            { id: "reports", label: "Reports", icon: BarChart3 },
          ].map((view) => {
            const Icon = view.icon;
            return (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeView === view.id
                    ? "bg-white dark:bg-slate-700 shadow-sm text-blue-600"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <Icon className="h-4 w-4" />
                {view.label}
              </button>
            );
          })}
        </div>

        {/* Filters */}
        {activeView !== "overview" && (
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 sm:flex-initial">
              <Filter className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-48"
              >
                <option value="all">All Projects</option>
                {allProjects.map((proj) => (
                  <option key={proj.id} value={proj.name}>
                    {proj.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative flex-1 sm:flex-initial">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-48"
              >
                <option value="all">All Team Members</option>
                {allUsers.map((user) => (
                  <option key={user.id} value={user.initials}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Overview Tab */}
      {activeView === "overview" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <Card key={i} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    <stat.icon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                  </div>
                  <div
                    className={`flex items-center text-xs font-medium ${
                      stat.trend === "up" ? "text-emerald-600" : "text-rose-600"
                    }`}
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
      )}

      {/* Kanban View */}
      {activeView === "kanban" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
          {Object.keys(columns).map((colId) => {
            const colTickets = columns[colId].filter((t) => {
              const projectMatch =
                selectedProject === "all" || t.project === selectedProject;
              const userMatch =
                selectedUser === "all" || t.assignee === selectedUser;
              return projectMatch && userMatch;
            });

            return (
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
                      {colTickets.length}
                    </span>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600 transition-colors">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex flex-col gap-3 p-2 bg-slate-200/30 dark:bg-slate-800/20 rounded-xl min-h-[200px] border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all">
                  {colTickets.map((ticket) => (
                    <KanbanTicket
                      key={ticket.id}
                      ticket={ticket}
                      onDragStart={onDragStart}
                    />
                  ))}

                  {colTickets.length === 0 && (
                    <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg p-8">
                      <p className="text-xs text-slate-400 italic font-medium">
                        No tickets here
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* List View */}
      {activeView === "list" && (
        <Card className="overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-lg font-semibold">
              All Tickets ({filteredTickets.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs uppercase text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                  <th className="px-6 py-4 font-medium">
                    Ticket & Description
                  </th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Priority</th>
                  <th className="px-6 py-4 font-medium">Project</th>
                  <th className="px-6 py-4 font-medium">Assignee</th>
                  <th className="px-6 py-4 font-medium">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.length > 0 ? (
                  filteredTickets.map((ticket) => (
                    <TicketRow key={ticket.id} ticket={ticket} />
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center">
                      <p className="text-slate-500">No tickets found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Reports View */}
      {activeView === "reports" && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Tickets</p>
                  <p className="text-3xl font-bold mt-2">{reportStats.total}</p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Completion Rate</p>
                  <p className="text-3xl font-bold mt-2">
                    {reportStats.completionRate}%
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {reportStats.completed}/{reportStats.total} completed
                  </p>
                </div>
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">In Progress</p>
                  <p className="text-3xl font-bold mt-2">
                    {reportStats.inProgress}
                  </p>
                </div>
                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Overdue</p>
                  <p className="text-3xl font-bold mt-2 text-rose-600">
                    {reportStats.overdueTickets}
                  </p>
                </div>
                <div className="p-3 bg-rose-100 dark:bg-rose-900/30 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-rose-600" />
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Priority Distribution */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6">
                Priority Distribution
              </h3>
              <div className="space-y-4">
                {Object.entries(reportStats.priorityCounts).map(
                  ([priority, count]) => {
                    const total = reportStats.total || 1;
                    const percentage = Math.round((count / total) * 100);
                    const colors = {
                      High: "bg-rose-500",
                      Medium: "bg-amber-500",
                      Low: "bg-slate-500",
                    };
                    return (
                      <div key={priority}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">
                            {priority}
                          </span>
                          <span className="text-sm font-bold text-slate-600">
                            {count} ({percentage}%)
                          </span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${colors[priority]}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </Card>

            {/* Status Distribution */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6">
                Status Distribution
              </h3>
              <div className="space-y-4">
                {Object.entries(reportStats.statusCounts).map(
                  ([status, count]) => {
                    const total = reportStats.total || 1;
                    const percentage = Math.round((count / total) * 100);
                    const colors = {
                      todo: "bg-slate-400",
                      "in-progress": "bg-blue-500",
                      review: "bg-amber-500",
                      done: "bg-emerald-500",
                    };
                    const labels = {
                      todo: "To Do",
                      "in-progress": "In Progress",
                      review: "Review",
                      done: "Done",
                    };
                    return (
                      <div key={status}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">
                            {labels[status]}
                          </span>
                          <span className="text-sm font-bold text-slate-600">
                            {count} ({percentage}%)
                          </span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${colors[status]}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </Card>
          </div>

          {/* Team Performance */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Team Performance</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs uppercase text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">
                    <th className="px-4 py-3 font-medium">Team Member</th>
                    <th className="px-4 py-3 font-medium text-right">
                      Assigned
                    </th>
                    <th className="px-4 py-3 font-medium text-right">
                      Completed
                    </th>
                    <th className="px-4 py-3 font-medium text-right">
                      In Progress
                    </th>
                    <th className="px-4 py-3 font-medium text-right">
                      Completion %
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {reportStats.userStats.map((user) => {
                    const completionPct =
                      user.total > 0
                        ? Math.round((user.completed / user.total) * 100)
                        : 0;
                    return (
                      <tr
                        key={user.name}
                        className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50"
                      >
                        <td className="px-4 py-4 font-medium text-sm">
                          {user.name}
                        </td>
                        <td className="px-4 py-4 text-right text-sm">
                          {user.total}
                        </td>
                        <td className="px-4 py-4 text-right text-sm font-semibold text-emerald-600">
                          {user.completed}
                        </td>
                        <td className="px-4 py-4 text-right text-sm text-amber-600">
                          {user.inProgress}
                        </td>
                        <td className="px-4 py-4 text-right">
                          <div className="flex items-center gap-2 justify-end">
                            <div className="w-20 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-500"
                                style={{ width: `${completionPct}%` }}
                              />
                            </div>
                            <span className="text-sm font-bold">
                              {completionPct}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
