"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Plus,
  Search,
  CheckCircle,
  Clock,
  TrendingUp,
  MapPin,
  Calendar,
  AlertCircle,
  Building2,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";
import { PlacementItem } from "@/lib/data/cse-demo-data";

export default function PlacementsPage() {
  const { placements, applyPlacement, studentList, currentUser, showToast } = useDepartment();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  const filteredPlacements = placements.filter((p) => {
    const matchStatus = selectedStatus === "All" || p.status === selectedStatus;
    const matchQuery =
      !searchQuery ||
      p.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchQuery;
  });

  const handleApply = (company: PlacementItem) => {
    applyPlacement(company.id);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Campus Placements & Drives</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            2026-27 graduating batch recruitment, tier-1 tech drives, CTC metrics, and student applications.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
            Current Tier-1 Highest: ₹44.0 LPA (Microsoft)
          </span>
        </div>
      </div>

      {/* Analytics KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-subtle">
          <span className="text-[11px] font-medium text-slate-400">Total Placed</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">219 / 236</p>
          <span className="text-[10px] text-emerald-600 font-semibold flex items-center mt-0.5">
            <TrendingUp className="w-3 h-3 mr-0.5" /> 92.6% Placement Rate
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-subtle">
          <span className="text-[11px] font-medium text-slate-400">Highest Package</span>
          <p className="text-2xl font-bold text-indigo-600 mt-1">₹44.0 LPA</p>
          <span className="text-[10px] text-slate-400">Microsoft Azure Core</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-subtle">
          <span className="text-[11px] font-medium text-slate-400">Average CTC</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">₹14.2 LPA</p>
          <span className="text-[10px] text-indigo-600 font-semibold">+18.5% YoY Growth</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-subtle">
          <span className="text-[11px] font-medium text-slate-400">Visiting Companies</span>
          <p className="text-2xl font-bold text-emerald-600 mt-1">38 Tier-1/2</p>
          <span className="text-[10px] text-slate-400">FAANG, Cisco, Oracle</span>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-subtle">
        <div className="flex items-center gap-1">
          {["All", "Open", "In Progress", "Completed"].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition ${
                selectedStatus === st
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {st} Drives
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search company or role..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none"
          />
        </div>
      </div>

      {/* Drives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredPlacements.map((comp) => (
          <div
            key={comp.id}
            className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle hover:shadow-card transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={comp.logo}
                    alt={comp.companyName}
                    className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200"
                  />
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{comp.companyName}</h3>
                    <p className="text-xs text-indigo-600 font-semibold">{comp.role}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-lg font-bold text-slate-900">₹{comp.packageLPA}</span>
                  <span className="text-xs text-slate-500 font-medium"> LPA</span>
                  <p className="text-[10px] font-semibold text-emerald-600">Full Time CTC</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-4 pt-3 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{comp.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Min CGPA: {comp.eligibilityCgpa}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Drive: {comp.driveDate}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="text-slate-500">
                <span className="font-bold text-slate-800">{comp.appliedCount}</span> Applied •
                <span className="font-bold text-emerald-600 ml-1">{comp.selectedCount}</span> Selected
              </div>

              <button
                onClick={() => handleApply(comp)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-semibold transition shadow-sm"
              >
                Apply for Drive
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
