"use client";
import React from "react";
import {
  Rocket,
  ArrowRight,
  ShieldCheck,
  Layout,
  Trello,
  Zap,
  Users,
  CheckCircle2,
  BarChart3,
  Layers,
  Sparkles,
} from "lucide-react";

/**
 * Modern Task Management Landing Page with Enhanced Animations
 * Enhanced with Framer-motion inspired CSS transitions and hover states.
 */
export default function Home() {
  const handleNavigation = (path) => {
    console.log(`Navigating to: ${path}`);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden selection:bg-blue-100 selection:text-blue-900">
      {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 px-6 bg-slate-50 overflow-hidden">
        {/* Animated Background Element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/40 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/40 blur-[120px] rounded-full animate-pulse delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-bold mb-8 shadow-sm animate-in fade-in slide-in-from-top-4 duration-700">
            <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-[10px] animate-pulse">
              NEW
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Introducing AI-Powered Sprint Planning
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
            The platform for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 animate-gradient-x">
              agile high-performers
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-10 duration-1000 fill-mode-both delay-150">
            Streamline your software development lifecycle. From backlog
            grooming to production releases, keep every stakeholder in sync.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-12 duration-1000 fill-mode-both delay-300">
            <button
              onClick={() => handleNavigation("/register")}
              className="group w-full sm:w-auto bg-black text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 active:scale-95 hover:shadow-2xl"
            >
              Get Started for Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => handleNavigation("/demo")}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-lg border border-slate-200 bg-white hover:border-slate-400 transition-all active:scale-95"
            >
              Watch Demo
            </button>
          </div>

          {/* Mock UI Preview with Floating Animation */}
          <div className="mt-16 relative max-w-5xl mx-auto animate-in fade-in zoom-in-95 duration-1000 fill-mode-both delay-500">
            <div className="rounded-2xl border border-slate-200 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] bg-white p-2 md:p-4 overflow-hidden transform hover:-rotate-1 transition-transform duration-500">
              <div className="aspect-video bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center relative overflow-hidden">
                <div className="grid grid-cols-3 gap-4 w-full h-full p-6">
                  {/* Column 1: Backlog */}
                  <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 space-y-3 animate-in fade-in slide-in-from-left-4 duration-700 delay-700">
                    <div className="h-2 w-1/2 bg-slate-100 rounded" />
                    <div className="h-10 w-full bg-slate-50 rounded animate-pulse" />
                    <div className="h-10 w-full bg-slate-50 rounded" />
                  </div>
                  {/* Column 2: In Progress */}
                  <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1000">
                    <div className="h-2 w-1/2 bg-blue-100 rounded" />
                    <div className="h-10 w-full bg-blue-50/50 rounded-md border border-blue-100" />
                    <div className="h-10 w-full bg-slate-50 rounded" />
                  </div>
                  {/* Column 3: Done */}
                  <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 space-y-3 animate-in fade-in slide-in-from-right-4 duration-700 delay-1200">
                    <div className="h-2 w-1/2 bg-emerald-100 rounded" />
                    <div className="h-10 w-full bg-emerald-50/50 rounded-md border border-emerald-100" />
                  </div>
                </div>
                {/* Decorative Cursor Simulation */}
                <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-bounce pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURES GRID with Hover Interaction */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built for every stage of agility
          </h2>
          <p className="text-slate-500">
            Everything you need to ship world-class software.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Kanban Boards",
              desc: "Visualize your workflow and limit work-in-progress for maximum efficiency.",
              icon: Layout,
              color: "text-blue-600",
              bg: "bg-blue-50",
              delay: "delay-0",
            },
            {
              title: "Scrum Sprints",
              desc: "Plan backlogs, track sprints, and run daily standups with native scrum tooling.",
              icon: Layers,
              color: "text-indigo-600",
              bg: "bg-indigo-50",
              delay: "delay-100",
            },
            {
              title: "Roadmaps",
              desc: "Sketch the big picture and communicate progress to stakeholders in real-time.",
              icon: BarChart3,
              color: "text-emerald-600",
              bg: "bg-emerald-50",
              delay: "delay-200",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className={`p-8 rounded-3xl border border-slate-100 bg-white hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 group cursor-default transform hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-8 ${feature.delay}`}
            >
              <div
                className={`${feature.bg} ${feature.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-sm`}
              >
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-700 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-600 transition-colors">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. WORKFLOW HIGHLIGHT with Reveal effect */}
      <section className="py-24 px-6 bg-[#0B0F19] text-white relative overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="flex-1 animate-in fade-in slide-in-from-left-8 duration-1000">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Flexible workflows <br />
              <span className="text-blue-400 italic">for unique teams.</span>
            </h2>
            <div className="space-y-6">
              {[
                { title: "Custom Issue Types", icon: Zap },
                { title: "Automated Transitions", icon: ShieldCheck },
                { title: "Team Permissions", icon: Users },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 group cursor-default"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 group-hover:scale-125 transition-transform" />
                  </div>
                  <span className="text-lg font-medium text-slate-300 group-hover:text-white transition-colors">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
            <button className="mt-10 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20 active:scale-95">
              Explore Enterprise Security
            </button>
          </div>

          <div className="flex-1 relative animate-in fade-in slide-in-from-right-8 duration-1000">
            <div className="aspect-square bg-slate-900/50 backdrop-blur-sm rounded-[40px] border border-slate-800 p-8 flex flex-col justify-center gap-6 shadow-2xl">
              {/* Status Pills with Staggered Hover Effect */}
              <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 transform translate-x-8 hover:translate-x-12 transition-transform duration-500 shadow-xl group">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-[10px] font-bold rounded-lg uppercase tracking-wider">
                  In Progress
                </span>
                <p className="mt-3 text-base font-semibold group-hover:text-blue-300 transition-colors">
                  System Architecture Review
                </p>
                <div className="mt-3 flex -space-x-2">
                  <div className="h-6 w-6 rounded-full bg-indigo-500 border-2 border-slate-800" />
                  <div className="h-6 w-6 rounded-full bg-rose-500 border-2 border-slate-800" />
                </div>
              </div>

              <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 transform -translate-x-6 hover:-translate-x-10 transition-transform duration-500 shadow-xl group">
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-lg uppercase tracking-wider">
                  Done
                </span>
                <p className="mt-3 text-base font-semibold group-hover:text-emerald-300 transition-colors">
                  Production Release v1.2
                </p>
              </div>

              <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 transform translate-x-4 hover:translate-x-8 transition-transform duration-500 shadow-xl group">
                <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-[10px] font-bold rounded-lg uppercase tracking-wider">
                  Blocked
                </span>
                <p className="mt-3 text-base font-semibold group-hover:text-amber-300 transition-colors">
                  Payment Gateway Integration
                </p>
              </div>
            </div>
            {/* Background Glow */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-600/20 blur-[100px] rounded-full" />
          </div>
        </div>
      </section>

      {/* 4. PRICING SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Scales with your team
          </h2>
          <p className="text-slate-500">
            Choose the plan that fits your current needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free */}
          <div className="p-8 rounded-[32px] border border-slate-100 bg-white shadow-sm flex flex-col hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h3 className="text-lg font-bold mb-2 text-slate-400">Free</h3>
            <div className="text-4xl font-extrabold mb-6">$0</div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />{" "}
                Up to 10 users
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />{" "}
                Community Support
              </li>
            </ul>
            <button className="w-full py-4 border border-slate-200 rounded-2xl font-bold hover:border-black hover:bg-slate-50 transition-all active:scale-95">
              Start Free
            </button>
          </div>

          {/* Standard */}
          <div className="p-8 rounded-[32px] border-2 border-black bg-white shadow-2xl flex flex-col relative overflow-hidden transform hover:scale-[1.02] transition-all duration-500 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div className="absolute top-0 right-0 bg-black text-white px-5 py-2 text-[10px] font-bold rounded-bl-2xl tracking-widest">
              MOST POPULAR
            </div>
            <h3 className="text-lg font-bold mb-2">Standard</h3>
            <div className="text-4xl font-extrabold mb-6">
              $8.50{" "}
              <span className="text-sm font-normal text-slate-400">/user</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />{" "}
                Unlimited Users
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />{" "}
                Advanced Roadmap
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />{" "}
                250GB Cloud Storage
              </li>
            </ul>
            <button className="w-full py-4 bg-black text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95">
              Try Standard
            </button>
          </div>

          {/* Premium */}
          <div className="p-8 rounded-[32px] border border-slate-100 bg-white shadow-sm flex flex-col hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 animate-in fade-in slide-in-from-bottom-16 duration-700">
            <h3 className="text-lg font-bold mb-2 text-slate-400">Premium</h3>
            <div className="text-4xl font-extrabold mb-6">
              $15{" "}
              <span className="text-sm font-normal text-slate-400">/user</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />{" "}
                24/7 Priority Support
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />{" "}
                Data Residency
              </li>
            </ul>
            <button className="w-full py-4 border border-slate-200 rounded-2xl font-bold hover:border-black hover:bg-slate-50 transition-all active:scale-95">
              Start Premium Trial
            </button>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="py-16 px-6 border-t border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="bg-black p-2 rounded-xl group-hover:rotate-12 transition-transform">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                TaskManager
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed font-medium">
              Making agile software development accessible and beautiful for
              every high-performing team.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-8">
                Product
              </h4>
              <ul className="space-y-5 text-sm font-semibold text-slate-500">
                <li className="hover:text-blue-600 transition-colors cursor-pointer">
                  Features
                </li>
                <li className="hover:text-blue-600 transition-colors cursor-pointer">
                  Security
                </li>
                <li className="hover:text-blue-600 transition-colors cursor-pointer">
                  Automations
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-8">
                Resources
              </h4>
              <ul className="space-y-5 text-sm font-semibold text-slate-500">
                <li className="hover:text-blue-600 transition-colors cursor-pointer">
                  Documentation
                </li>
                <li className="hover:text-blue-600 transition-colors cursor-pointer">
                  Agile Guide
                </li>
                <li className="hover:text-blue-600 transition-colors cursor-pointer">
                  Community
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-8">
                Legal
              </h4>
              <ul className="space-y-5 text-sm font-semibold text-slate-500">
                <li className="hover:text-blue-600 transition-colors cursor-pointer">
                  Privacy
                </li>
                <li className="hover:text-blue-600 transition-colors cursor-pointer">
                  Status
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-400">
          <p>© 2024 TaskManager Pro. Engineered for Performance.</p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 hover:text-emerald-600 transition-colors cursor-default">
              <ShieldCheck className="w-4 h-4" />
              <span>SOC2 COMPLIANT</span>
            </div>
            <div className="hover:text-black transition-colors cursor-pointer">
              SYSTEM STATUS
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
