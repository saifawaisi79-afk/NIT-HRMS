"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  UserCheck,
  Shield,
  CreditCard,
  Terminal,
  ArrowRight,
} from "lucide-react";
import { useDepartment, PortalType } from "@/context/DepartmentContext";

export default function PortalSelector() {
  const router = useRouter();
  const { selectPortal, showToast } = useDepartment();

  const handleSelect = (portalId: PortalType, portalName: string) => {
    selectPortal(portalId);
    showToast(`${portalName} Activated`, "Entering portal instantly without authentication...", "success");
    router.push("/");
  };

  const portalList = [
    {
      id: "Student" as PortalType,
      name: "Employee Portal",
      badge: "SELF-SERVICE",
      badgeClass: "bg-blue-100/70 text-blue-600 border-blue-200/60",
      description: "Personal Workspace & Daily Operations",
      icon: Users,
      iconBg: "bg-blue-50/90 text-blue-600 border-blue-100",
    },
    {
      id: "Faculty" as PortalType,
      name: "HR Admin Panel",
      badge: "HUMAN RESOURCES",
      badgeClass: "bg-purple-100/70 text-purple-700 border-purple-200/60",
      description: "Talent Acquisition & HR Operations",
      icon: UserCheck,
      iconBg: "bg-purple-50/90 text-purple-600 border-purple-100",
    },
    {
      id: "HOD" as PortalType,
      name: "Super Admin Portal",
      badge: "FULL ACCESS",
      badgeClass: "bg-rose-100/70 text-rose-600 border-rose-200/60",
      description: "Master Oversight & Executive Controls",
      icon: Shield,
      iconBg: "bg-rose-50/90 text-rose-600 border-rose-100",
    },
    {
      id: "Administration" as PortalType,
      name: "Finance & Operations",
      badge: "FINANCE HUB",
      badgeClass: "bg-emerald-100/70 text-emerald-700 border-emerald-200/60",
      description: "Treasury, Payroll & Financial Operations",
      icon: CreditCard,
      iconBg: "bg-emerald-50/90 text-emerald-600 border-emerald-100",
    },
    {
      id: "Administration" as PortalType,
      name: "IT & Dev Hub",
      badge: "DEVOPS & INFRA",
      badgeClass: "bg-amber-100/70 text-amber-700 border-amber-200/60",
      description: "Command Center & Engineering Infrastructure",
      icon: Terminal,
      iconBg: "bg-amber-50/90 text-amber-600 border-amber-100",
    },
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-12 relative overflow-hidden bg-[#f8fafc] font-sans antialiased">
      {/* Soft ambient background gradients matching screenshot */}
      <div className="w-[500px] h-[500px] bg-gradient-to-br from-cyan-100/40 via-blue-50/20 to-transparent rounded-full blur-3xl absolute -top-40 left-1/4 pointer-events-none" />
      <div className="w-[420px] h-[420px] bg-gradient-to-tr from-amber-100/30 via-orange-50/20 to-transparent rounded-full blur-3xl absolute -bottom-20 left-10 pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative z-10 py-6">
        {/* Left Column: Hero Typography & Stat Cards */}
        <div className="lg:col-span-6 lg:pr-4">
          <span className="text-xs sm:text-[13px] font-bold text-amber-600 uppercase tracking-widest block mb-4">
            NIT PORTAL HRMS
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-slate-900 tracking-tight leading-[1.12]">
            The Modern<br />
            Workforce Platform
          </h1>

          <p className="text-slate-600 text-sm sm:text-base font-normal mt-5 max-w-md leading-relaxed">
            Role-based portals, real-time analytics, and complete workforce management in one system.
          </p>

          {/* 4 Stat Cards in 2x2 Grid matching reference */}
          <div className="grid grid-cols-2 gap-4 mt-9 max-w-md">
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
              <span className="text-3xl sm:text-4xl font-black text-slate-950 block">5</span>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1.5 block">
                Active Portals
              </span>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
              <span className="text-3xl sm:text-4xl font-black text-slate-950 block">16</span>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1.5 block">
                HR Modules
              </span>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
              <span className="text-3xl sm:text-4xl font-black text-slate-950 block">100%</span>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1.5 block">
                Data Integrity
              </span>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
              <span className="text-3xl sm:text-4xl font-black text-slate-950 block">24/7</span>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1.5 block">
                Availability
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Floating Select Portal Card */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div className="bg-white rounded-[32px] p-6 sm:p-8 lg:p-9 shadow-2xl border border-slate-200/80 max-w-[490px] w-full transition-all">
            {/* Brand Logo matching screenshot */}
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center font-black text-amber-500 text-lg shadow-sm">
                C
              </div>
              <div className="text-xl font-black tracking-tight text-slate-950">
                NIT<span className="text-amber-500">Portal</span>
              </div>
            </div>

            {/* Title & Subtitle */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-5 tracking-tight">
              Select Portal
            </h2>
            <p className="text-xs sm:text-[13px] text-slate-500 mt-1 mb-6 font-medium">
              Click a portal below to enter instantly without authentication
            </p>

            {/* 5 Portals Vertical Stack */}
            <div className="space-y-3">
              {portalList.map((portal) => {
                const Icon = portal.icon;
                return (
                  <button
                    key={portal.name}
                    onClick={() => handleSelect(portal.id, portal.name)}
                    className="w-full flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 hover:border-slate-400 hover:shadow-md transition-all duration-200 cursor-pointer bg-white text-left group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform ${portal.iconBg}`}
                      >
                        <Icon className="w-5 h-5 stroke-[2]" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-slate-900 text-sm">
                            {portal.name}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${portal.badgeClass}`}
                          >
                            {portal.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 font-medium truncate">
                          {portal.description}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
