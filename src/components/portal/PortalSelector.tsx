"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  UserCheck,
  Shield,
  CreditCard,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Activity,
} from "lucide-react";
import { useDepartment, PortalType } from "@/context/DepartmentContext";

export default function PortalSelector() {
  const router = useRouter();
  const { selectPortal, showToast } = useDepartment();

  const handleSelect = (portalId: PortalType, portalName: string) => {
    selectPortal(portalId);
    showToast(`${portalName} Activated`, "Starting portal instantly without authentication...", "success");
    router.push("/");
  };

  const portalList = [
    {
      id: "Student" as PortalType,
      name: "Student Portal",
      badge: "SELF-SERVICE",
      badgeClass: "bg-blue-50 text-blue-700 border-blue-200/80 shadow-2xs",
      badgeDot: "bg-blue-500",
      description: "Personal Workspace, Attendance & Academic Records",
      icon: GraduationCap,
      iconBg: "bg-gradient-to-br from-blue-50 to-indigo-50/90 text-blue-600 border-blue-200/70 group-hover:border-blue-400 group-hover:glow-blue",
      arrowHover: "group-hover:bg-blue-600 group-hover:text-white",
    },
    {
      id: "Faculty" as PortalType,
      name: "Faculty Portal",
      badge: "ACADEMIC & TEACHING",
      badgeClass: "bg-purple-50 text-purple-700 border-purple-200/80 shadow-2xs",
      badgeDot: "bg-purple-500",
      description: "Teaching Workload, Attendance Marking & Evaluation",
      icon: UserCheck,
      iconBg: "bg-gradient-to-br from-purple-50 to-fuchsia-50/90 text-purple-600 border-purple-200/70 group-hover:border-purple-400 group-hover:glow-purple",
      arrowHover: "group-hover:bg-purple-600 group-hover:text-white",
    },
    {
      id: "HOD" as PortalType,
      name: "HOD Portal",
      badge: "DEPT. MANAGEMENT",
      badgeClass: "bg-rose-50 text-rose-700 border-rose-200/80 shadow-2xs",
      badgeDot: "bg-rose-500",
      description: "Department Oversight, Timetable & Executive Approvals",
      icon: Shield,
      iconBg: "bg-gradient-to-br from-rose-50 to-pink-50/90 text-rose-600 border-rose-200/70 group-hover:border-rose-400 group-hover:glow-rose",
      arrowHover: "group-hover:bg-rose-600 group-hover:text-white",
    },
    {
      id: "Administration" as PortalType,
      name: "Administration Portal",
      badge: "COLLEGE ADMIN",
      badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200/80 shadow-2xs",
      badgeDot: "bg-emerald-500",
      description: "Admissions, Fee Ledgers, Payroll & College Operations",
      icon: CreditCard,
      iconBg: "bg-gradient-to-br from-emerald-50 to-teal-50/90 text-emerald-600 border-emerald-200/70 group-hover:border-emerald-400 group-hover:glow-emerald",
      arrowHover: "group-hover:bg-emerald-600 group-hover:text-white",
    },
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-12 relative overflow-hidden bg-[#f8fafc] font-sans antialiased">
      {/* Subtle modern dot-grid background overlay */}
      <div className="bg-dot-grid absolute inset-0 pointer-events-none opacity-50" />

      {/* Multi-layered ambient lighting blobs */}
      <div className="w-[620px] h-[620px] bg-gradient-to-tr from-cyan-400/20 via-indigo-400/15 to-purple-400/10 rounded-full blur-[130px] animate-pulse-subtle absolute -top-40 left-1/3 pointer-events-none" />
      <div className="w-[500px] h-[500px] bg-gradient-to-br from-amber-300/25 via-orange-300/15 to-transparent rounded-full blur-[120px] absolute -bottom-20 left-6 pointer-events-none" />
      <div className="w-[450px] h-[450px] bg-gradient-to-tl from-emerald-200/15 via-teal-100/10 to-transparent rounded-full blur-[100px] absolute -bottom-10 right-10 pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative z-10 py-6">
        {/* Left Column: Hero Typography & High-Tech Stat Cards */}
        <div className="lg:col-span-6 lg:pr-4">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-amber-500/25 shadow-xs mb-5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <span className="text-[11px] font-black text-amber-700 tracking-widest uppercase">
              NIT PORTAL HRMS
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-black text-slate-950 tracking-[-0.035em] leading-[1.08]">
            The Modern<br />
            <span className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-800 bg-clip-text text-transparent">
              Workforce Platform
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base font-normal mt-5 max-w-md leading-relaxed">
            Role-based portals, real-time analytics, and complete academic & department management in one system.
          </p>

          {/* 4 Stat Cards in 2x2 Grid with ultra-modern glassmorphic styling */}
          <div className="grid grid-cols-2 gap-4 mt-9 max-w-md">
            <div className="glass-surface rounded-2xl p-5 border border-white/80 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_28px_-6px_rgba(15,23,42,0.1)] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex items-center justify-between">
                <span className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight block">4</span>
                <span className="w-2 h-2 rounded-full bg-blue-500" />
              </div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1.5 block">
                Active Portals
              </span>
            </div>

            <div className="glass-surface rounded-2xl p-5 border border-white/80 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_28px_-6px_rgba(15,23,42,0.1)] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex items-center justify-between">
                <span className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight block">16</span>
                <span className="w-2 h-2 rounded-full bg-purple-500" />
              </div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1.5 block">
                Academic Modules
              </span>
            </div>

            <div className="glass-surface rounded-2xl p-5 border border-white/80 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_28px_-6px_rgba(15,23,42,0.1)] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex items-center justify-between">
                <span className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight block">100%</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1.5 block">
                Data Integrity
              </span>
            </div>

            <div className="glass-surface rounded-2xl p-5 border border-white/80 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_28px_-6px_rgba(15,23,42,0.1)] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex items-center justify-between">
                <span className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight block">24/7</span>
                <Activity className="w-4 h-4 text-amber-500" />
              </div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1.5 block">
                Availability
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Floating Select Portal Card with Ultra-Modern Glass finish */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div className="bg-white/95 backdrop-blur-2xl rounded-[32px] p-6 sm:p-8 lg:p-9 shadow-[0_24px_64px_-12px_rgba(15,23,42,0.12)] border border-slate-200/80 ring-1 ring-slate-900/[0.04] max-w-[500px] w-full transition-all relative">
            {/* Top subtle light reflection */}
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-slate-400/25 to-transparent" />

            {/* Brand Logo matching screenshot with high-end aesthetic */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 flex items-center justify-center font-black text-amber-400 text-xl shadow-md ring-1 ring-white/10 group-hover:scale-105 transition-transform">
                  C
                </div>
                <div>
                  <div className="text-xl font-black tracking-tight text-slate-950 flex items-center">
                    <span>NIT</span>
                    <span className="text-amber-500">Portal</span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 -mt-0.5">Navodaya Institute of Technology</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100/90 text-slate-600 border border-slate-200 shadow-2xs">
                Direct Access
              </span>
            </div>

            {/* Title & Subtitle */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-5 tracking-tight">
              Select Portal
            </h2>
            <p className="text-xs sm:text-[13px] text-slate-500 mt-1 mb-5 font-medium flex items-center gap-1.5">
              <span>Click a portal below to enter instantly without authentication</span>
            </p>

            {/* 4 Portals Vertical Stack: Student, Faculty, HOD, Administration */}
            <div className="space-y-3">
              {portalList.map((portal) => {
                const Icon = portal.icon;
                return (
                  <button
                    key={portal.name}
                    onClick={() => handleSelect(portal.id, portal.name)}
                    className="w-full flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 hover:border-indigo-400/50 hover:shadow-lg transition-all duration-300 cursor-pointer bg-white/80 hover:bg-white text-left group hover:-translate-y-0.5 relative overflow-hidden"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-300 ${portal.iconBg}`}
                      >
                        <Icon className="w-5 h-5 stroke-[2] transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-slate-900 text-sm tracking-tight group-hover:text-indigo-950 transition-colors">
                            {portal.name}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${portal.badgeClass}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${portal.badgeDot}`} />
                            {portal.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 font-medium truncate">
                          {portal.description}
                        </p>
                      </div>
                    </div>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center bg-slate-50 text-slate-400 group-hover:text-white transition-all duration-300 shrink-0 ml-2 shadow-2xs ${portal.arrowHover}`}>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Micro footer hint */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Instant single-click launch</span>
              </span>
              <span>v2.4 Enterprise</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
