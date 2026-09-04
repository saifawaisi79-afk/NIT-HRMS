"use client";

import React from "react";
import {
  GraduationCap,
  Users,
  ShieldCheck,
  Building2,
  ArrowRight,
  Sparkles,
  BookOpen,
  CalendarCheck,
  Award,
  Layers,
  CheckCircle2,
  School,
} from "lucide-react";
import { useDepartment, PortalType } from "@/context/DepartmentContext";

export default function PortalSelector() {
  const { selectPortal } = useDepartment();

  const portals: {
    id: PortalType;
    title: string;
    subtitle: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
    badgeBg: string;
    badgeText: string;
    buttonText: string;
    buttonClass: string;
    persona: string;
    highlights: string[];
  }[] = [
    {
      id: "Student",
      title: "STUDENT PORTAL",
      subtitle: "Access student academics & campus services",
      description: "Academic dashboard, attendance, assignments, exams and results.",
      icon: GraduationCap,
      accentColor: "from-blue-600 to-indigo-600",
      badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
      badgeText: "Learner & Campus Access",
      buttonText: "Enter Student Portal",
      buttonClass: "bg-[#1d4ed8] hover:bg-[#1e40af] text-white",
      persona: "Aarav Sharma • 5th Sem B.Tech CSE (USN: 1NT23CS001)",
      highlights: [
        "Real-time attendance & low attendance warnings",
        "Assignments submission & grades ledger",
        "Today's lecture & practical lab schedule",
        "Placement drives & interview applications",
      ],
    },
    {
      id: "Faculty",
      title: "FACULTY PORTAL",
      subtitle: "Teaching, attendance & academic workspace",
      description: "Classes, attendance, marks, assignments and teaching workload.",
      icon: Users,
      accentColor: "from-emerald-600 to-teal-600",
      badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      badgeText: "Teaching & Evaluation Workspace",
      buttonText: "Enter Faculty Portal",
      buttonClass: "bg-[#005f73] hover:bg-[#004e5f] text-white",
      persona: "Dr. Priya Sharma • Professor (DBMS & Data Systems)",
      highlights: [
        "1-click daily lecture & lab attendance marking",
        "Continuous Internal Evaluation (CIE) gradebook",
        "Course assignments creation & grading drawer",
        "Mentoring portfolio & academic risk counseling",
      ],
    },
    {
      id: "HOD",
      title: "HOD PORTAL",
      subtitle: "Department performance & academic administration",
      description: "Department analytics, faculty, students, workload and academic operations.",
      icon: ShieldCheck,
      accentColor: "from-slate-900 to-indigo-950",
      badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
      badgeText: "Executive Academic Leadership",
      buttonText: "Enter HOD Portal",
      buttonClass: "bg-slate-950 hover:bg-slate-800 text-white",
      persona: "Dr. Ramesh Kumar • Professor & Head of Department",
      highlights: [
        "Department velocity, attendance & CGPA analytics",
        "Faculty teaching workload matrix & allocation",
        "Conflict-free timetable scheduling matrix",
        "Leave sanction approvals (Faculty & Students)",
      ],
    },
    {
      id: "Administration",
      title: "ADMINISTRATION",
      subtitle: "College operations & system administration",
      description: "College operations, users, academic setup and reports.",
      icon: Building2,
      accentColor: "from-amber-600 to-orange-600",
      badgeBg: "bg-amber-50 text-amber-800 border-amber-200",
      badgeText: "Institutional Operations & Setup",
      buttonText: "Enter Administration",
      buttonClass: "bg-[#005f73] hover:bg-[#004e5f] text-white",
      persona: "Dean Office / NIT Administrative Registrar",
      highlights: [
        "Student & faculty institutional directories",
        "Academic years, semesters & syllabus configuration",
        "Fee collections, pending dues & digital receipts",
        "B.Tech admissions pipeline & system audit logs",
      ],
    },
  ];

  return (
    <div className="min-h-[85vh] flex flex-col justify-between py-6 sm:py-10 animate-fade-in font-sans">
      {/* Hero Header matching screenshot typography and aesthetics */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs text-xs font-extrabold text-slate-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>CSE Department • Digital Management Platform</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
          CSE <span className="text-[#00b4d8]">Nexus</span>
        </h1>
        <p className="text-sm sm:text-base font-semibold text-slate-600">
          Computer Science & Engineering Department Management System
        </p>

        <p className="text-xs sm:text-sm text-slate-400 font-medium">
          Select your portal to continue
        </p>
      </div>

      {/* 4 Major Portal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8 max-w-[1380px] mx-auto w-full">
        {portals.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.id}
              className="p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Header with Icon and Badge */}
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className="w-13 h-13 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 text-slate-800" />
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${p.badgeBg}`}>
                    {p.badgeText}
                  </span>
                </div>

                {/* Portal Title & Subtitle */}
                <h2 className="text-lg font-black tracking-tight text-slate-950">
                  {p.title}
                </h2>
                <p className="text-xs font-bold text-slate-700 mt-1">
                  &ldquo;{p.subtitle}&rdquo;
                </p>
                <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">
                  {p.description}
                </p>

                {/* Feature Highlights */}
                <div className="mt-5 pt-4 border-t border-dashed border-slate-200 space-y-2">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    KEY CAPABILITIES
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-600 font-medium">
                    {p.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Demo persona preview */}
                <div className="mt-4 p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-[11px]">
                  <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                    DEMO PERSONA
                  </p>
                  <p className="font-bold text-slate-800 truncate mt-0.5">{p.persona}</p>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-2">
                <button
                  onClick={() => selectPortal(p.id)}
                  className={`w-full py-3 px-4 rounded-full font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-xs group-hover:shadow-md ${p.buttonClass}`}
                >
                  <span>{p.buttonText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Note specified by prompt */}
      <div className="mt-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 text-xs font-bold text-slate-600">
          <Sparkles className="w-3.5 h-3.5 text-[#005f73]" />
          <span>Demo Environment • Authentication will be enabled later</span>
        </div>
      </div>
    </div>
  );
}
