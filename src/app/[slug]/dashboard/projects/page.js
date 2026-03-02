"use client";

import React, { useEffect, useState } from "react";
import {
  FolderOpen,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Star,
  Users,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  Edit,
  Share2,
  Archive,
  Loader2,
} from "lucide-react";

/**
 * Projects Page Component
 * Project management dashboard for viewing and managing all projects
 */
export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  // Mock projects data
  const mockProjects = [
    {
      id: "1",
      name: "E-commerce Redesign",
      description:
        "A complete overhaul of the primary storefront using React and Tailwind CSS.",
      category: "Web Development",
      status: "In Progress",
      progress: 75,
      team: 4,
      startDate: "2024-01-15",
      dueDate: "2024-12-31",
      members: [
        { name: "Alex Rivera", initials: "AR", color: "bg-blue-500" },
        { name: "Sarah Chen", initials: "SC", color: "bg-purple-500" },
        { name: "Mike Johnson", initials: "MJ", color: "bg-pink-500" },
        { name: "Emma Wilson", initials: "EW", color: "bg-green-500" },
      ],
      tasks: 45,
      completedTasks: 34,
      priority: "High",
      owner: "Alex Rivera",
    },
    {
      id: "2",
      name: "Analytics Dashboard",
      description:
        "Real-time data visualization tool for monitoring server performance metrics.",
      category: "Data Science",
      status: "Planning",
      progress: 30,
      team: 3,
      startDate: "2024-02-01",
      dueDate: "2025-01-30",
      members: [
        { name: "Mike Johnson", initials: "MJ", color: "bg-pink-500" },
        { name: "Sarah Chen", initials: "SC", color: "bg-purple-500" },
      ],
      tasks: 28,
      completedTasks: 8,
      priority: "Critical",
      owner: "Mike Johnson",
    },
    {
      id: "3",
      name: "Mobile Banking App",
      description:
        "Cross-platform mobile application built with React Native and specialized security protocols.",
      category: "Mobile",
      status: "In Progress",
      progress: 60,
      team: 5,
      startDate: "2024-01-01",
      dueDate: "2024-11-30",
      members: [
        { name: "Alex Rivera", initials: "AR", color: "bg-blue-500" },
        { name: "Mike Johnson", initials: "MJ", color: "bg-pink-500" },
        { name: "Emma Wilson", initials: "EW", color: "bg-green-500" },
        { name: "Sarah Chen", initials: "SC", color: "bg-purple-500" },
      ],
      tasks: 67,
      completedTasks: 40,
      priority: "Critical",
      owner: "Sarah Chen",
    },
    {
      id: "4",
      name: "Cloud Infrastructure Setup",
      description:
        "Enterprise-grade cloud infrastructure with auto-scaling and disaster recovery capabilities.",
      category: "DevOps",
      status: "Completed",
      progress: 100,
      team: 2,
      startDate: "2023-11-01",
      dueDate: "2024-02-28",
      members: [
        { name: "Mike Johnson", initials: "MJ", color: "bg-pink-500" },
        { name: "Alex Rivera", initials: "AR", color: "bg-blue-500" },
      ],
      tasks: 32,
      completedTasks: 32,
      priority: "High",
      owner: "Mike Johnson",
    },
    {
      id: "5",
      name: "UI/UX Design System",
      description:
        "Comprehensive design system with components, patterns, and brand guidelines.",
      category: "Design",
      status: "In Progress",
      progress: 85,
      team: 3,
      startDate: "2024-03-15",
      dueDate: "2024-10-31",
      members: [
        { name: "Sarah Chen", initials: "SC", color: "bg-purple-500" },
        { name: "Emma Wilson", initials: "EW", color: "bg-green-500" },
      ],
      tasks: 54,
      completedTasks: 46,
      priority: "Medium",
      owner: "Emma Wilson",
    },
    {
      id: "6",
      name: "API Gateway Enhancement",
      description:
        "Upgrade API gateway with rate limiting, caching, and advanced routing.",
      category: "Web Development",
      status: "Active",
      progress: 50,
      team: 2,
      startDate: "2024-04-01",
      dueDate: "2024-12-15",
      members: [
        { name: "Mike Johnson", initials: "MJ", color: "bg-pink-500" },
        { name: "Alex Rivera", initials: "AR", color: "bg-blue-500" },
      ],
      tasks: 38,
      completedTasks: 19,
      priority: "High",
      owner: "Alex Rivera",
    },
  ];

  const statuses = ["all", "Active", "In Progress", "Planning", "Completed"];

  // Initialize projects
  useEffect(() => {
    const timer = setTimeout(() => {
      setProjects(mockProjects);
      setFilteredProjects(mockProjects);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // Filter and sort projects
  useEffect(() => {
    let filtered = projects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || project.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    // Sort
    if (sortBy === "recent") {
      filtered.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    } else if (sortBy === "progress") {
      filtered.sort((a, b) => b.progress - a.progress);
    } else if (sortBy === "dueDate") {
      filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }

    setFilteredProjects(filtered);
  }, [searchQuery, statusFilter, sortBy, projects]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "In Progress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Active":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Planning":
        return "bg-slate-100 text-slate-700 border-slate-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 className="h-4 w-4" />;
      case "In Progress":
        return <TrendingUp className="h-4 w-4" />;
      case "Active":
        return <Clock className="h-4 w-4" />;
      case "Planning":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <FolderOpen className="h-8 w-8 text-blue-600" />
                Projects
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Manage and track all your projects
              </p>
            </div>
            <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition flex items-center gap-2 shadow-lg shadow-blue-500/30">
              <Plus className="h-5 w-5" />
              New Project
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Filters Section */}
        <div className="space-y-4 mb-8">
          {/* Search and Sort */}
          <div className="flex gap-3 flex-col sm:flex-row">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-medium"
            >
              <option value="recent">Recent</option>
              <option value="progress">Most Progress</option>
              <option value="dueDate">Due Soon</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex gap-2 flex-wrap">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition border ${
                  statusFilter === status
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-slate-300" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all group"
                >
                  {/* Header */}
                  <div className="p-6 border-b border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100">
                    <div className="flex items-start justify-between mb-3">
                      <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                        <FolderOpen className="h-6 w-6 text-blue-600" />
                      </div>
                      <button className="p-2 hover:bg-white rounded-lg transition">
                        <MoreVertical className="h-4 w-4 text-slate-400" />
                      </button>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition">
                      {project.name}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Body */}
                  <div className="p-6 space-y-4">
                    {/* Status Badge */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-full font-semibold border ${getStatusColor(
                          project.status,
                        )}`}
                      >
                        {getStatusIcon(project.status)}
                        {project.status}
                      </span>
                      <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 text-slate-700">
                        {project.category}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold text-slate-600">
                          Progress
                        </span>
                        <span className="text-xs font-bold text-slate-900">
                          {project.progress}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Tasks Info */}
                    <div className="grid grid-cols-2 gap-3 py-3 border-t border-b border-slate-100">
                      <div className="p-2.5 bg-slate-50 rounded-lg">
                        <p className="text-[10px] uppercase font-semibold text-slate-500 mb-1">
                          Tasks
                        </p>
                        <p className="text-sm font-bold text-slate-900">
                          {project.completedTasks}/{project.tasks}
                        </p>
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-lg">
                        <p className="text-[10px] uppercase font-semibold text-slate-500 mb-1">
                          Due Date
                        </p>
                        <p className="text-sm font-bold text-slate-900">
                          {new Date(project.dueDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Team Members */}
                    <div>
                      <p className="text-xs uppercase font-semibold text-slate-500 mb-2">
                        Team
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {project.members.slice(0, 3).map((member, idx) => (
                            <div
                              key={idx}
                              className={`h-8 w-8 rounded-full ${member.color} flex items-center justify-center text-[10px] font-bold text-white border-2 border-white`}
                              title={member.name}
                            >
                              {member.initials}
                            </div>
                          ))}
                          {project.team > 3 && (
                            <div className="h-8 w-8 rounded-full bg-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-700 border-2 border-white">
                              +{project.team - 3}
                            </div>
                          )}
                        </div>
                        <span className="text-xs font-medium text-slate-600">
                          {project.team} members
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-4 bg-slate-50 border-t border-slate-200 flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition flex items-center justify-center gap-2">
                      <Eye className="h-4 w-4" />
                      View
                    </button>
                    <button className="flex-1 px-3 py-2 border border-slate-300 hover:bg-slate-100 text-slate-900 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2">
                      <Edit className="h-4 w-4" />
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
                <FolderOpen className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600 font-medium mb-2">
                  No projects found
                </p>
                <p className="text-sm text-slate-400 mb-6">
                  Try adjusting your filters or create a new project
                </p>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition inline-flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create Project
                </button>
              </div>
            )}

            {/* Summary Stats */}
            {filteredProjects.length > 0 && (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <p className="text-xs text-slate-500 uppercase font-semibold mb-2">
                    Total Projects
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {filteredProjects.length}
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <p className="text-xs text-slate-500 uppercase font-semibold mb-2">
                    In Progress
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {
                      filteredProjects.filter((p) => p.status === "In Progress")
                        .length
                    }
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <p className="text-xs text-slate-500 uppercase font-semibold mb-2">
                    Completed
                  </p>
                  <p className="text-2xl font-bold text-emerald-600">
                    {
                      filteredProjects.filter((p) => p.status === "Completed")
                        .length
                    }
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <p className="text-xs text-slate-500 uppercase font-semibold mb-2">
                    Avg Progress
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {Math.round(
                      filteredProjects.reduce((sum, p) => sum + p.progress, 0) /
                        filteredProjects.length,
                    )}
                    %
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
