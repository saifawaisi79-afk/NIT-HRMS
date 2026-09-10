"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  CalendarCheck,
  BookOpen,
  CalendarOff,
  Award,
  Briefcase,
  Rocket,
  TrendingUp,
  Plus,
  Clock,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronRight,
  Filter,
  BarChart3,
  CalendarDays,
  CreditCard,
  Receipt,
  ArrowRight,
} from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";

export default function HODDashboard() {
  const {
    department,
    facultyList,
    studentList,
    leaves,
    updateLeaveStatus,
    workload,
    updateWorkload,
    fees,
    salaries,
    showToast,
  } = useDepartment();

  const [facultyFilter, setFacultyFilter] = useState<string>("All");

  const filteredFaculty = facultyList.filter((f) => {
    if (facultyFilter === "All") return true;
    return f.designation === facultyFilter;
  });

  const pendingLeaves = leaves.filter((l) => l.status === "Pending");
  const studentsAtRisk = studentList.filter((s) => s.status === "At Risk" || s.attendanceRate < 75);

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Executive Header */}
      <div className="p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Good Morning, HOD
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Department Executive
            </span>
          </div>
          <p className="text-xs font-bold text-slate-700 mt-1">
            CSE Department Overview • Academic Year: <span className="text-[#005f73] font-extrabold">{department.academicYear} (Odd Sem)</span>
          </p>
          <p className="text-xs text-slate-500 font-medium">
            Dr. Ramesh Kumar • Professor & Head of Department of Computer Science & Engineering
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/timetable"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition shadow-xs"
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Timetable Matrix</span>
          </Link>
          <Link
            href="/reports"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#005f73] hover:bg-[#004e5f] text-white text-xs font-bold transition shadow-sm"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Generate NBA / NAAC Report</span>
          </Link>
        </div>
      </div>

      {/* 8 Top KPI Cards specified by prompt */}
      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3.5">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">TOTAL STUDENTS</span>
          <p className="text-xl font-black text-slate-950 mt-1">{department.totalStudents}</p>
          <span className="text-[10px] text-emerald-600 font-bold">100% Enrolled</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">TOTAL FACULTY</span>
          <p className="text-xl font-black text-slate-950 mt-1">{department.totalFaculty}</p>
          <span className="text-[10px] text-indigo-600 font-bold">1:22 Ratio</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">STUDENT ATTENDANCE</span>
          <p className="text-xl font-black text-slate-950 mt-1">{department.avgAttendance}%</p>
          <span className="text-[10px] text-emerald-600 font-bold">Target: &gt;80%</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">FACULTY PRESENCE</span>
          <p className="text-xl font-black text-slate-950 mt-1">96.2%</p>
          <span className="text-[10px] text-emerald-600 font-bold">32/34 Present</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">ACTIVE SUBJECTS</span>
          <p className="text-xl font-black text-slate-950 mt-1">18</p>
          <span className="text-[10px] text-slate-500 font-bold">14 Core + 4 Electives</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">PENDING APPROVALS</span>
          <p className="text-xl font-black text-rose-600 mt-1">{pendingLeaves.length}</p>
          <span className="text-[10px] text-rose-600 font-bold">Requires Action</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">AVERAGE CGPA</span>
          <p className="text-xl font-black text-slate-950 mt-1">8.24</p>
          <span className="text-[10px] text-indigo-600 font-bold">Passing: 94.8%</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">PLACEMENT RATE</span>
          <p className="text-xl font-black text-slate-950 mt-1">{department.placementRate}%</p>
          <span className="text-[10px] text-emerald-600 font-bold">Max: ₹44 LPA</span>
        </div>
      </div>

      {/* Department Financial Overview: Faculty Payroll & Student Fee Clearance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Faculty Payroll Budget */}
        <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-950">Faculty Payroll &amp; Compensation</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  ₹58.4L / mo
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                34 Department Faculty • 7th CPC Scales • 32 Disbursed (2 Processing)
              </p>
            </div>
          </div>
          <Link
            href="/salary"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition shadow-xs shrink-0"
          >
            <span>View Payroll</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Student Fee Clearance */}
        <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <Receipt className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-950">Student Fee &amp; Exam Clearance</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  84.4% Cleared
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                631 / 748 Students Cleared • CIE-1 Hall Tickets Active • 117 Pending
              </p>
            </div>
          </div>
          <Link
            href="/fees"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#005f73] hover:bg-[#004e5f] text-white text-xs font-bold transition shadow-sm shrink-0"
          >
            <span>Manage Dues</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Second Row: Faculty Workload Matrix & Leave Approval Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Faculty Workload Matrix */}
        <div className="lg:col-span-8 p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-slate-950 tracking-tight">Faculty Workload Matrix</h2>
              <p className="text-xs text-slate-400 font-medium">Weekly teaching hours, allocated courses & workload status</p>
            </div>
            <Link href="/workload" className="text-xs font-bold text-[#005f73] hover:underline flex items-center gap-1">
              <span>Full Workload Analytics</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px] font-extrabold">
                  <th className="pb-3 font-extrabold">Faculty Member</th>
                  <th className="pb-3 font-extrabold">Designation</th>
                  <th className="pb-3 font-extrabold">Courses Allocated</th>
                  <th className="pb-3 font-extrabold text-center">Weekly Hours</th>
                  <th className="pb-3 font-extrabold text-right">Workload Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {workload.slice(0, 5).map((w) => (
                  <tr key={w.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 font-bold text-slate-900">{w.facultyName}</td>
                    <td className="py-3 text-slate-600">{w.designation}</td>
                    <td className="py-3 text-slate-600">{w.subjects.join(", ")}</td>
                    <td className="py-3 text-center font-extrabold text-slate-900">{w.weeklyHours}h / wk</td>
                    <td className="py-3 text-right">
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Urgent Leave Sanctions Approval */}
        <div className="lg:col-span-4 p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950 tracking-tight">Leave Approvals</h2>
              <p className="text-xs text-slate-400 font-medium">{pendingLeaves.length} pending review</p>
            </div>
            <Link href="/leaves" className="text-xs font-bold text-[#005f73] hover:underline">
              All Leaves
            </Link>
          </div>

          <div className="space-y-3">
            {pendingLeaves.slice(0, 3).map((l) => (
              <div
                key={l.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900">{l.applicantName}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                    {l.applicantType} • {l.leaveType}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 line-clamp-2">
                  &ldquo;{l.reason}&rdquo; ({l.days} days: {l.startDate} to {l.endDate})
                </p>
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    onClick={() => updateLeaveStatus(l.id, "Rejected", "Declined due to lecture coverage")}
                    className="px-3 py-1 rounded-full border border-rose-200 text-rose-600 hover:bg-rose-50 text-[11px] font-bold transition"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => updateLeaveStatus(l.id, "Approved", "Sanctioned by HOD")}
                    className="px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold transition"
                  >
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Third Row: Faculty Registry Table with Designation Filters */}
      <div className="p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-black text-slate-950 tracking-tight">Faculty Directory & Designation Overview</h2>
            <p className="text-xs text-slate-400 font-medium">Manage departmental teaching staff & course assignments</p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap text-xs font-bold">
            {["All", "Professor", "Associate Professor", "Assistant Professor", "Guest Faculty"].map((desig) => (
              <button
                key={desig}
                onClick={() => setFacultyFilter(desig)}
                className={`px-3 py-1.5 rounded-full transition ${
                  facultyFilter === desig
                    ? "bg-slate-950 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {desig}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px] font-extrabold">
                <th className="pb-3 font-extrabold">Faculty</th>
                <th className="pb-3 font-extrabold">Emp ID</th>
                <th className="pb-3 font-extrabold">Designation</th>
                <th className="pb-3 font-extrabold">Experience</th>
                <th className="pb-3 font-extrabold">Assigned Subjects</th>
                <th className="pb-3 font-extrabold text-right">Attendance Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredFaculty.slice(0, 6).map((f) => (
                <tr key={f.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 flex items-center gap-2.5">
                    <img src={f.avatar} alt={f.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-slate-900">{f.name}</p>
                      <p className="text-[10px] text-slate-400">{f.email}</p>
                    </div>
                  </td>
                  <td className="py-3 font-mono text-slate-700 font-bold">{f.empId}</td>
                  <td className="py-3 text-slate-700">{f.designation}</td>
                  <td className="py-3 text-slate-600">{f.experienceYears} Years</td>
                  <td className="py-3 text-slate-600">{f.subjects.join(", ")}</td>
                  <td className="py-3 text-right font-extrabold text-emerald-600">{f.attendanceRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fourth Row: Students At Risk Alert Table */}
      <div className="p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-950 tracking-tight">Students At Risk Monitor</h2>
              <p className="text-xs text-slate-400 font-medium">Students flagged for low attendance (&lt;75%) or multiple backlogs</p>
            </div>
          </div>
          <Link href="/mentoring" className="text-xs font-bold text-[#005f73] hover:underline">
            Open Mentoring Action
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px] font-extrabold">
                <th className="pb-3 font-extrabold">Student Name</th>
                <th className="pb-3 font-extrabold">USN</th>
                <th className="pb-3 font-extrabold">Semester / Sec</th>
                <th className="pb-3 font-extrabold">Attendance</th>
                <th className="pb-3 font-extrabold">CGPA</th>
                <th className="pb-3 font-extrabold">Backlogs</th>
                <th className="pb-3 font-extrabold text-right">Academic Flag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {studentsAtRisk.slice(0, 4).map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 font-bold text-slate-900">{s.name}</td>
                  <td className="py-3 font-mono text-slate-600">{s.usn}</td>
                  <td className="py-3 text-slate-600">Sem {s.semester} - {s.section}</td>
                  <td className="py-3 font-bold text-rose-600">{s.attendanceRate}%</td>
                  <td className="py-3 font-bold text-slate-800">{s.cgpa}</td>
                  <td className="py-3 text-slate-800">{s.backlogs} Backlogs</td>
                  <td className="py-3 text-right">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-50 text-rose-700 border border-rose-200">
                      Attendance Shortage
                    </span>
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
