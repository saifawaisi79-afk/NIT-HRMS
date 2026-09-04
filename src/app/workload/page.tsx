"use client";

import React, { useState } from "react";
import {
  Clock,
  Users,
  CheckCircle2,
  AlertTriangle,
  Download,
  Plus,
  Minus,
  Filter,
} from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";

export default function WorkloadPage() {
  const { workload, updateWorkload, showToast } = useDepartment();
  const [filterStatus, setFilterStatus] = useState<string>("All");

  const filteredWorkload = workload.filter((w) => {
    if (filterStatus === "All") return true;
    return w.status === filterStatus;
  });

  const totalTeachingHours = workload.reduce((acc, w) => acc + w.weeklyHours, 0);
  const avgHours = (totalTeachingHours / workload.length).toFixed(1);

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Header */}
      <div className="p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Faculty Teaching Workload &amp; Hours
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Academic Dean &amp; HOD
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Weekly teaching hours, course distribution, UGC / AICTE norms (16 hrs/week for Associate &amp; Assistant Profs)
          </p>
        </div>

        <button
          onClick={() => showToast("Workload Exported", "Faculty workload audit matrix downloaded.")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#005f73] hover:bg-[#004e5f] text-white text-xs font-extrabold transition shadow-sm self-start md:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export Workload Audit</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">TOTAL TEACHING HOURS</span>
          <p className="text-3xl font-black text-slate-950 mt-1">{totalTeachingHours} hrs</p>
          <span className="text-[11px] text-slate-500 font-bold">Across 5 Faculty Members</span>
        </div>

        <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">AVG FACULTY LOAD</span>
          <p className="text-3xl font-black text-emerald-700 mt-1">{avgHours} hrs</p>
          <span className="text-[11px] text-emerald-600 font-bold">Within AICTE 16h Guideline</span>
        </div>

        <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">OVERLOADED FACULTY</span>
          <p className="text-3xl font-black text-rose-600 mt-1">1</p>
          <span className="text-[11px] text-rose-600 font-bold">Prof. Amit Deshmukh (20h)</span>
        </div>

        <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">BALANCED RATIO</span>
          <p className="text-3xl font-black text-indigo-600 mt-1">80%</p>
          <span className="text-[11px] text-indigo-600 font-bold">Optimal Distribution</span>
        </div>
      </div>

      {/* Workload Table */}
      <div className="p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-black text-slate-950 tracking-tight">Faculty Allocation Ledger</h2>
            <p className="text-xs text-slate-400 font-medium">Adjust weekly teaching hours per course assignment</p>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold">
            {["All", "Balanced", "Overloaded", "Underloaded"].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-full transition ${
                  filterStatus === st
                    ? "bg-slate-950 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px] font-extrabold">
                <th className="pb-3 font-extrabold">Faculty Member</th>
                <th className="pb-3 font-extrabold">Emp ID</th>
                <th className="pb-3 font-extrabold">Designation</th>
                <th className="pb-3 font-extrabold">Assigned Subjects</th>
                <th className="pb-3 font-extrabold">Sections</th>
                <th className="pb-3 font-extrabold text-center">Weekly Hours</th>
                <th className="pb-3 font-extrabold text-center">Status</th>
                <th className="pb-3 font-extrabold text-right">Adjust Hours</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredWorkload.map((w) => (
                <tr key={w.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 font-bold text-slate-900">{w.facultyName}</td>
                  <td className="py-3 font-mono font-bold text-slate-700">{w.empId}</td>
                  <td className="py-3 text-slate-600">{w.designation}</td>
                  <td className="py-3 text-slate-700">{w.subjects.join(", ")}</td>
                  <td className="py-3 text-slate-600">{w.sections.join(", ")}</td>
                  <td className="py-3 text-center font-black text-slate-950 text-sm">
                    {w.weeklyHours} hrs
                  </td>
                  <td className="py-3 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        w.status === "Overloaded"
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : w.status === "Underloaded"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      }`}
                    >
                      {w.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => updateWorkload(w.id, -1)}
                        className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-700"
                        title="Decrease hours"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => updateWorkload(w.id, 1)}
                        className="w-7 h-7 rounded-full bg-[#005f73] hover:bg-[#004e5f] text-white flex items-center justify-center font-bold"
                        title="Increase hours"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
