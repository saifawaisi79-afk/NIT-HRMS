"use client";

import React, { useState } from "react";
import {
  UserPlus,
  Search,
  CheckCircle2,
  XCircle,
  FileText,
  Building2,
  Download,
  Award,
} from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";

export default function AdmissionsPage() {
  const { admissions, updateAdmissionStatus, showToast } = useDepartment();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const filteredAdmissions = admissions.filter((a) => {
    const matchesSearch =
      a.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.appNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Header */}
      <div className="p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              B.Tech Admissions Pipeline 2026–27
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200">
              Admissions Office
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Candidate verification, entrance exam rank scrutiny &amp; seat allocation
          </p>
        </div>

        <button
          onClick={() => showToast("Admissions Exported", "Candidate rank list CSV downloaded.")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#005f73] hover:bg-[#004e5f] text-white text-xs font-extrabold transition shadow-sm self-start md:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export Intake Merit List</span>
        </button>
      </div>

      {/* Main Table */}
      <div className="p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by candidate name or application number..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-full outline-none focus:ring-2 focus:ring-[#005f73]/20"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold">
            {["All", "Applied", "Under Review", "Approved", "Admitted"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-full transition ${
                  statusFilter === st
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
                <th className="pb-3 font-extrabold">App Number</th>
                <th className="pb-3 font-extrabold">Applicant Name</th>
                <th className="pb-3 font-extrabold">Program Applied</th>
                <th className="pb-3 font-extrabold">Entrance Exam</th>
                <th className="pb-3 font-extrabold text-center">Rank</th>
                <th className="pb-3 font-extrabold">Category</th>
                <th className="pb-3 font-extrabold">Status</th>
                <th className="pb-3 font-extrabold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredAdmissions.map((adm) => (
                <tr key={adm.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 font-mono font-bold text-slate-700">{adm.appNumber}</td>
                  <td className="py-3">
                    <p className="font-bold text-slate-900">{adm.fullName}</p>
                    <p className="text-[10px] text-slate-400">{adm.email} • {adm.phone}</p>
                  </td>
                  <td className="py-3 text-slate-700">{adm.program}</td>
                  <td className="py-3 text-slate-600 font-medium">{adm.entranceExam}</td>
                  <td className="py-3 text-center font-black text-slate-950">#{adm.rank}</td>
                  <td className="py-3 text-slate-600">{adm.category}</td>
                  <td className="py-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        adm.status === "Admitted"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : adm.status === "Approved"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {adm.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {adm.status !== "Admitted" && (
                        <button
                          onClick={() => updateAdmissionStatus(adm.id, "Admitted")}
                          className="px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold transition"
                        >
                          Confirm Seat
                        </button>
                      )}
                      {adm.status === "Applied" && (
                        <button
                          onClick={() => updateAdmissionStatus(adm.id, "Under Review")}
                          className="px-3 py-1 rounded-full border border-slate-200 hover:bg-slate-100 text-slate-700 text-[11px] font-bold transition"
                        >
                          Review
                        </button>
                      )}
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
