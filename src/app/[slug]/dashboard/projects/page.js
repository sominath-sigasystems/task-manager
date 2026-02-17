"use client";

import React, { useEffect, useState } from "react";
import {
  FolderRoot,
  Tag,
  Description,
  LayoutGrid,
  Loader2,
} from "lucide-react";

/**
 * Projects Page Component
 * Updated to handle local data simulation to avoid fetch URL parsing errors
 * in the preview environment, with enhanced professional styling.
 */
export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call with mock data to avoid /api/projects fetch errors
    // In a real environment, you would use fetch("/api/projects")
    const mockProjects = [
      {
        _id: "1",
        name: "E-commerce Redesign",
        description:
          "A complete overhaul of the primary storefront using React and Tailwind CSS.",
        category: "Web Development",
      },
      {
        _id: "2",
        name: "Analytics Dashboard",
        description:
          "Real-time data visualization tool for monitoring server performance metrics.",
        category: "Data Science",
      },
      {
        _id: "3",
        name: "Mobile Banking App",
        description:
          "Cross-platform mobile application built with React Native and specialized security protocols.",
        category: "Mobile",
      },
    ];

    const timer = setTimeout(() => {
      setProjects(mockProjects);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <LayoutGrid className="h-8 w-8 text-black" />
              My Projects
            </h1>
            <p className="mt-2 text-slate-500">
              Manage and oversee your ongoing development tasks.
            </p>
          </div>
          <button className="bg-black text-white px-6 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-95">
            + New Project
          </button>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-slate-300" />
            <p className="mt-4 text-slate-400 font-medium">
              Loading your workspace...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project._id}
                className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/60 transition-all hover:-translate-y-1 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-black group-hover:text-white transition-colors">
                    <FolderRoot className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded-md">
                    {project.category}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-black">
                  {project.name}
                </h2>

                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                  {project.description}
                </p>

                <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-slate-400 group-hover:text-slate-600 transition-colors">
                  <div className="flex items-center gap-1.5 text-xs font-semibold">
                    <Tag className="h-3 w-3" />
                    ID: {project._id.padStart(3, "0")}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-tighter hover:text-black">
                    View Details →
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && projects.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400">
              No projects found. Start by creating a new one.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
