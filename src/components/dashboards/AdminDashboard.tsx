"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  CalendarCheck,
  BookOpen,
  Building2,
  Award,
  CreditCard,
  UserPlus,
  ScrollText,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  FolderDown,
  Settings,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";

export default function AdminDashboard() {
  const { department, studentList, facultyList, fees, admissions, auditLogs } = useDepartment();

  const totalPaid = fees.reduce((acc, f) => acc + f.paidAmount, 0);
  const totalPending = fees.reduce((acc, f) => acc + f.pendingAmount, 0);

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Institutional Header */}
      <div className="p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Good Morning, Administrator
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-50 text-amber-800 border border-amber-200">
              Institutional Admin
            </span>
          </div>
          <p className="text-xs font-bold text-slate-700 mt-1">
            College Operations & System Administration • Academic Session 2026–27
          </p>
          <p className="text-xs text-slate-500 font-medium">
            Dean Office / Administrative Registrar • National Institute of Technology (NIT)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/salary"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition shadow-xs"
          >
            <CreditCard className="w-3.5 h-3.5 text-[#005f73]" />
            <span>Staff Payroll</span>
          </Link>
          <Link
            href="/admissions"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition shadow-xs"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Admissions ({admissions.length})</span>
          </Link>
          <Link
            href="/fees"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#005f73] hover:bg-[#004e5f] text-white text-xs font-bold transition shadow-sm"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Manage Fee Ledger</span>
          </Link>
        </div>
      </div>

      {/* 8 Operational KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3.5">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">ENROLLED STUDENTS</span>
          <p className="text-xl font-black text-slate-950 mt-1">{department.totalStudents}</p>
          <span className="text-[10px] text-emerald-600 font-bold">B.Tech Sem 1–8</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">COLLEGE FACULTY</span>
          <p className="text-xl font-black text-slate-950 mt-1">{department.totalFaculty}</p>
          <span className="text-[10px] text-indigo-600 font-bold">100% Ph.D / M.Tech</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">STAFF PAYROLL</span>
          <p className="text-xl font-black text-slate-950 mt-1">₹1.24 Cr</p>
          <span className="text-[10px] text-emerald-600 font-bold">95.2% Disbursed</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">CAMPUS ATTENDANCE</span>
          <p className="text-xl font-black text-slate-950 mt-1">85.2%</p>
          <span className="text-[10px] text-emerald-600 font-bold">Central Gate Sync</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">FEE COLLECTION</span>
          <p className="text-xl font-black text-emerald-700 mt-1">₹{(totalPaid / 100000).toFixed(1)}L</p>
          <span className="text-[10px] text-emerald-600 font-bold">74.8% Received</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">PENDING DUES</span>
          <p className="text-xl font-black text-rose-600 mt-1">₹{(totalPending / 100000).toFixed(1)}L</p>
          <span className="text-[10px] text-rose-600 font-bold">Overdue Notices Sent</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">ADMISSION APPS</span>
          <p className="text-xl font-black text-slate-950 mt-1">{admissions.length}</p>
          <span className="text-[10px] text-indigo-600 font-bold">2026–27 Intake</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">AUDIT LOGS</span>
          <p className="text-xl font-black text-slate-950 mt-1">{auditLogs.length}</p>
          <span className="text-[10px] text-slate-500 font-bold">System Actions</span>
        </div>
      </div>

      {/* Main Grid: Fee Overview & Admissions Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Fee Collection Overview */}
        <div className="lg:col-span-7 p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950 tracking-tight">Fee Collection Ledger</h2>
              <p className="text-xs text-slate-400 font-medium">Semester tuition fee receipts & pending clearance</p>
            </div>
            <Link href="/fees" className="text-xs font-bold text-[#005f73] hover:underline flex items-center gap-1">
              <span>All Fee Records</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px] font-extrabold">
                  <th className="pb-3 font-extrabold">Student Name</th>
                  <th className="pb-3 font-extrabold">USN</th>
                  <th className="pb-3 font-extrabold">Total Fee</th>
                  <th className="pb-3 font-extrabold">Paid</th>
                  <th className="pb-3 font-extrabold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {fees.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 font-bold text-slate-900">{f.studentName}</td>
                    <td className="py-3 font-mono text-slate-600">{f.usn}</td>
                    <td className="py-3 text-slate-800 font-bold">₹{f.totalFee.toLocaleString()}</td>
                    <td className="py-3 text-emerald-600 font-bold">₹{f.paidAmount.toLocaleString()}</td>
                    <td className="py-3 text-right">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                          f.status === "Paid"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : f.status === "Partial"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {f.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Admissions Pipeline */}
        <div className="lg:col-span-5 p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950 tracking-tight">Admissions Intake 2026</h2>
              <p className="text-xs text-slate-400 font-medium">B.Tech admission candidate screening</p>
            </div>
            <Link href="/admissions" className="text-xs font-bold text-[#005f73] hover:underline">
              Admissions Desk
            </Link>
          </div>

          <div className="space-y-3">
            {admissions.map((adm) => (
              <div
                key={adm.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <h4 className="font-extrabold text-slate-900">{adm.fullName}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Rank: #{adm.rank} ({adm.entranceExam}) • {adm.category}
                  </p>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold shrink-0 ${
                    adm.status === "Admitted"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : adm.status === "Approved"
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  {adm.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Third Row: Recent System Audit Logs */}
      <div className="p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <ScrollText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-950 tracking-tight">Institutional Audit Logs</h2>
              <p className="text-xs text-slate-400 font-medium">Security & operational audit trail of system modifications</p>
            </div>
          </div>
          <Link href="/audit-logs" className="text-xs font-bold text-[#005f73] hover:underline">
            View All Logs
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px] font-extrabold">
                <th className="pb-3 font-extrabold">Timestamp</th>
                <th className="pb-3 font-extrabold">User</th>
                <th className="pb-3 font-extrabold">Role</th>
                <th className="pb-3 font-extrabold">Action Taken</th>
                <th className="pb-3 font-extrabold">Module</th>
                <th className="pb-3 font-extrabold text-right">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {auditLogs.slice(0, 5).map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 text-slate-400 font-mono text-[11px]">{log.timestamp}</td>
                  <td className="py-3 font-bold text-slate-900">{log.user}</td>
                  <td className="py-3 text-slate-600">{log.role}</td>
                  <td className="py-3 text-slate-800">{log.action}</td>
                  <td className="py-3 font-semibold text-[#005f73]">{log.module}</td>
                  <td className="py-3 text-right font-mono text-slate-400 text-[11px]">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
