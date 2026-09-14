"use client";

import React, { useEffect, useState } from "react";
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
  Bell,
  BookOpen,
  CalendarDays,
  TrendingUp,
  Database,
  Lock,
  Wifi,
  ChevronRight,
  Star,
} from "lucide-react";
import { useDepartment, PortalType } from "@/context/DepartmentContext";

const announcements = [
  "📢 Exam schedule for Semester VI is now live — check Academic Calendar",
  "🎓 Convocation Ceremony 2025 registrations open till 30th September",
  "📋 Faculty appraisal forms due by 20th October — submit via Faculty Portal",
  "🏦 Scholarship disbursement for Batch 2022-26 processed on 12th September",
  "🔧 System maintenance scheduled Sunday 2:00 AM – 4:00 AM IST",
  "📌 HODs: Please verify departmental timetables before 15th October",
];

const features = [
  {
    icon: BookOpen,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    title: "Unified Academic Records",
    desc: "Attendance, grades, course history and documents — all in one place across every portal.",
    tag: "Core Feature",
  },
  {
    icon: CalendarDays,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-100",
    title: "Smart Timetable Engine",
    desc: "Auto-conflict detection, room allocation and faculty workload balancing built in.",
    tag: "Scheduling",
  },
  {
    icon: TrendingUp,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    title: "Real-Time Analytics",
    desc: "Live dashboards with attendance heat-maps, fee collection trends, and department KPIs.",
    tag: "Insights",
  },
];

const systemStatus = [
  { label: "API Server", icon: Wifi },
  { label: "Database", icon: Database },
  { label: "Auth Service", icon: Lock },
  { label: "File Storage", icon: Database },
];

export default function PortalSelector() {
  const router = useRouter();
  const { selectPortal, showToast } = useDepartment();

  const [tickerIdx, setTickerIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setTickerIdx((i) => (i + 1) % announcements.length);
        setFade(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSelect = (portalId: PortalType, portalName: string) => {
    selectPortal(portalId);
    showToast(
      `${portalName} Activated`,
      "Starting portal instantly without authentication...",
      "success"
    );
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
      iconBg:
        "bg-gradient-to-br from-blue-50 to-indigo-50/90 text-blue-600 border-blue-200/70 group-hover:border-blue-400",
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
      iconBg:
        "bg-gradient-to-br from-purple-50 to-fuchsia-50/90 text-purple-600 border-purple-200/70 group-hover:border-purple-400",
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
      iconBg:
        "bg-gradient-to-br from-rose-50 to-pink-50/90 text-rose-600 border-rose-200/70 group-hover:border-rose-400",
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
      iconBg:
        "bg-gradient-to-br from-emerald-50 to-teal-50/90 text-emerald-600 border-emerald-200/70 group-hover:border-emerald-400",
      arrowHover: "group-hover:bg-emerald-600 group-hover:text-white",
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start p-4 sm:p-6 lg:p-12 relative overflow-hidden bg-[#f8fafc] font-sans antialiased">
      <div className="bg-dot-grid absolute inset-0 pointer-events-none opacity-50" />
      <div className="w-[620px] h-[620px] bg-gradient-to-tr from-cyan-400/20 via-indigo-400/15 to-purple-400/10 rounded-full blur-[130px] animate-pulse-subtle absolute -top-40 left-1/3 pointer-events-none" />
      <div className="w-[500px] h-[500px] bg-gradient-to-br from-amber-300/25 via-orange-300/15 to-transparent rounded-full blur-[120px] absolute -bottom-20 left-6 pointer-events-none" />
      <div className="w-[450px] h-[450px] bg-gradient-to-tl from-emerald-200/15 via-teal-100/10 to-transparent rounded-full blur-[100px] absolute -bottom-10 right-10 pointer-events-none" />

      {/* Announcement Ticker */}
      <div className="w-full max-w-6xl mx-auto mb-6 relative z-10">
        <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md border border-amber-200/60 rounded-2xl px-4 py-3 shadow-sm">
          <div className="flex items-center gap-1.5 shrink-0">
            <Bell className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Notice</span>
          </div>
          <div className="w-px h-4 bg-slate-200 shrink-0" />
          <p
            style={{ transition: "opacity 0.4s ease", opacity: fade ? 1 : 0 }}
            className="text-xs sm:text-[13px] font-medium text-slate-600 truncate flex-1"
          >
            {announcements[tickerIdx]}
          </p>
          <span className="shrink-0 text-[10px] font-bold text-slate-400">
            {tickerIdx + 1}/{announcements.length}
          </span>
        </div>
      </div>

      {/* Main Portal Grid */}
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative z-10 py-6">
        <div className="lg:col-span-6 lg:pr-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-amber-500/25 shadow-xs mb-5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <span className="text-[11px] font-black text-amber-700 tracking-widest uppercase">NIT PORTAL HRMS</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-black text-slate-950 tracking-[-0.035em] leading-[1.08]">
            The Modern<br />
            <span className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-800 bg-clip-text text-transparent">
              Workforce Platform
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base font-normal mt-5 max-w-md leading-relaxed">
            Role-based portals, real-time analytics, and complete academic &amp; department management in one system.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-9 max-w-md">
            {[
              { value: "4", label: "Active Portals", accent: "via-blue-500", dot: "bg-blue-500" },
              { value: "16", label: "Academic Modules", accent: "via-purple-500", dot: "bg-purple-500" },
              { value: "100%", label: "Data Integrity", accent: "via-emerald-500", dot: null, check: true },
              { value: "24/7", label: "Availability", accent: "via-amber-500", dot: null, activity: true },
            ].map((stat) => (
              <div key={stat.label} className="glass-surface rounded-2xl p-5 border border-white/80 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_28px_-6px_rgba(15,23,42,0.1)] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group">
                <div className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent ${stat.accent} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="flex items-center justify-between">
                  <span className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight block">{stat.value}</span>
                  {stat.dot && <span className={`w-2 h-2 rounded-full ${stat.dot}`} />}
                  {stat.check && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                  {stat.activity && <Activity className="w-4 h-4 text-amber-500" />}
                </div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1.5 block">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div className="bg-white/95 backdrop-blur-2xl rounded-[32px] p-6 sm:p-8 lg:p-9 shadow-[0_24px_64px_-12px_rgba(15,23,42,0.12)] border border-slate-200/80 ring-1 ring-slate-900/[0.04] max-w-[500px] w-full transition-all relative">
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-slate-400/25 to-transparent" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 flex items-center justify-center font-black text-amber-400 text-xl shadow-md ring-1 ring-white/10">
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

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-5 tracking-tight">Select Portal</h2>
            <p className="text-xs sm:text-[13px] text-slate-500 mt-1 mb-5 font-medium">
              Click a portal below to enter instantly without authentication
            </p>

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
                      <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-300 ${portal.iconBg}`}>
                        <Icon className="w-5 h-5 stroke-[2] transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-slate-900 text-sm tracking-tight group-hover:text-indigo-950 transition-colors">
                            {portal.name}
                          </span>
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${portal.badgeClass}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${portal.badgeDot}`} />
                            {portal.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 font-medium truncate">{portal.description}</p>
                      </div>
                    </div>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center bg-slate-50 text-slate-400 group-hover:text-white transition-all duration-300 shrink-0 ml-2 shadow-2xs ${portal.arrowHover}`}>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </button>
                );
              })}
            </div>

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

      {/* Feature Highlights */}
      <div className="max-w-6xl w-full mx-auto mt-4 mb-6 relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Platform Highlights</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {features.map((f) => {
            const FIcon = f.icon;
            return (
              <div key={f.title} className={`bg-white/90 backdrop-blur-md rounded-2xl border ${f.border} p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group cursor-default`}>
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${f.bg} ${f.color} flex items-center justify-center`}>
                    <FIcon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${f.bg} ${f.color} border ${f.border}`}>{f.tag}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">{f.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                <div className={`mt-3 flex items-center gap-1 text-[11px] font-bold ${f.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  <span>Learn more</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* System Status Strip */}
      <div className="max-w-6xl w-full mx-auto relative z-10 pb-4">
        <div className="bg-white/80 backdrop-blur-md border border-slate-200/70 rounded-2xl px-5 py-3 flex flex-wrap items-center gap-x-6 gap-y-2 shadow-sm">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest shrink-0">System Status</span>
          <div className="flex-1 flex flex-wrap gap-x-5 gap-y-1.5">
            {systemStatus.map((s) => (
              <span key={s.label} className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                {s.label}
              </span>
            ))}
          </div>
          <span className="text-[10px] text-slate-400 font-medium shrink-0">All systems operational</span>
        </div>
      </div>
    </div>
  );
}
