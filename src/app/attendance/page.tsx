"use client";

import React, { useState } from "react";
import {
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Briefcase,
  Search,
  Download,
  Filter,
  CheckCheck,
  AlertTriangle,
  UserCheck,
  Sparkles,
} from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";
import { getAttendanceColor } from "@/lib/utils";

export default function AttendancePage() {
  const { studentList, subjects, attendanceRecords, markAttendance, markAllAttendance, showToast } =
    useDepartment();

  const [selectedSemester, setSelectedSemester] = useState<number>(5);
  const [selectedSection, setSelectedSection] = useState<string>("A");
  const [selectedSubject, setSelectedSubject] = useState<string>("CS501");
  const [selectedDate, setSelectedDate] = useState<string>("2026-09-04");
  const [searchFilter, setSearchFilter] = useState<string>("");

  // Filter students by selected class
  const classStudents = studentList.filter(
    (s) => s.semester === selectedSemester && s.section === selectedSection
  );

  const displayedStudents = classStudents.filter(
    (s) =>
      !searchFilter ||
      s.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      s.usn.toLowerCase().includes(searchFilter.toLowerCase())
  );

  // Compute session stats
  const totalInClass = classStudents.length;
  const presentCount = classStudents.filter((s) => (attendanceRecords[s.id] || "Present") === "Present").length;
  const absentCount = classStudents.filter((s) => attendanceRecords[s.id] === "Absent").length;
  const lateCount = classStudents.filter((s) => attendanceRecords[s.id] === "Late").length;
  const odCount = classStudents.filter((s) => attendanceRecords[s.id] === "On Duty").length;
  const percentage = totalInClass > 0 ? Math.round(((presentCount + odCount) / totalInClass) * 100) : 0;

  // Export to CSV
  const handleExportCSV = () => {
    const rows = [
      ["USN", "Student Name", "Semester", "Section", "Date", "Subject", "Status"],
      ...classStudents.map((s) => [
        s.usn,
        s.name,
        s.semester,
        s.section,
        selectedDate,
        selectedSubject,
        attendanceRecords[s.id] || "Present",
      ]),
    ];
    const csvContent = "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Attendance_${selectedSubject}_Sem${selectedSemester}${selectedSection}_${selectedDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Report Exported", "Attendance CSV report downloaded successfully.");
  };

  const handleSaveAttendance = () => {
    showToast(
      "Attendance Recorded",
      `Saved ${classStudents.length} records for ${selectedSubject} on ${selectedDate} (${percentage}% present).`
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Lecture Attendance Session</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Mark digital presence, trigger shortage warnings, and export compliance logs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition shadow-subtle"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleSaveAttendance}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition shadow-sm"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Save Register</span>
          </button>
        </div>
      </div>

      {/* Class Selection Controls Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Semester */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Semester
            </label>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(Number(e.target.value))}
              className="w-full px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <option key={sem} value={sem}>
                  Semester {sem} (B.Tech CSE)
                </option>
              ))}
            </select>
          </div>

          {/* Section */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Section
            </label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="A">Section A (Room CS-201)</option>
              <option value="B">Section B (Room CS-202)</option>
              <option value="C">Section C (Room CS-203)</option>
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Course / Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.code}>
                  {sub.code}: {sub.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Session Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
            </input>
          </div>
        </div>

        {/* Live Session Counter */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
              Total: {totalInClass} Students
            </div>
            <div className="flex items-center gap-1.5 font-semibold text-emerald-600">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              Present: {presentCount}
            </div>
            <div className="flex items-center gap-1.5 font-semibold text-rose-600">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              Absent: {absentCount}
            </div>
            <div className="flex items-center gap-1.5 font-semibold text-amber-600">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              Late: {lateCount}
            </div>
            <div className="flex items-center gap-1.5 font-semibold text-blue-600">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              On Duty: {odCount}
            </div>
          </div>

          {/* Quick Mark All Present */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => markAllAttendance("Present")}
              className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs border border-emerald-200 transition"
            >
              Mark All Present
            </button>
            <button
              onClick={() => markAllAttendance("Absent")}
              className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs border border-rose-200 transition"
            >
              Clear / All Absent
            </button>
          </div>
        </div>
      </div>

      {/* Roster Search */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Quick search student name or USN..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
        <p className="text-xs text-slate-500 font-medium">
          Showing {displayedStudents.length} of {totalInClass} enrolled in Sem {selectedSemester} ({selectedSection})
        </p>
      </div>

      {/* Attendance Roster Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200/70 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">USN</th>
                <th className="py-3 px-4">Overall %</th>
                <th className="py-3 px-4 text-center">Mark Status (One-Click)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayedStudents.map((s, idx) => {
                const currentStatus = attendanceRecords[s.id] || "Present";
                const attColor = getAttendanceColor(s.attendanceRate);

                return (
                  <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono text-slate-400">{idx + 1}</td>

                    {/* Student Info */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={s.avatar}
                          alt={s.name}
                          className="w-8 h-8 rounded-xl object-cover ring-1 ring-slate-200"
                        />
                        <div>
                          <p className="font-bold text-slate-900">{s.name}</p>
                          <p className="text-[10px] text-slate-400">Section {s.section}</p>
                        </div>
                      </div>
                    </td>

                    {/* USN */}
                    <td className="py-3 px-4 font-mono font-semibold text-slate-700">{s.usn}</td>

                    {/* Cumulative Attendance */}
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${attColor.bg}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${attColor.dot}`} />
                        {s.attendanceRate}%
                      </span>
                    </td>

                    {/* Status Toggles */}
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => markAttendance(s.id, "Present")}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                            currentStatus === "Present"
                              ? "bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-600/30"
                              : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                          }`}
                        >
                          Present
                        </button>
                        <button
                          type="button"
                          onClick={() => markAttendance(s.id, "Absent")}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                            currentStatus === "Absent"
                              ? "bg-rose-600 text-white shadow-sm ring-2 ring-rose-600/30"
                              : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                          }`}
                        >
                          Absent
                        </button>
                        <button
                          type="button"
                          onClick={() => markAttendance(s.id, "Late")}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                            currentStatus === "Late"
                              ? "bg-amber-600 text-white shadow-sm ring-2 ring-amber-600/30"
                              : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                          }`}
                        >
                          Late
                        </button>
                        <button
                          type="button"
                          onClick={() => markAttendance(s.id, "On Duty")}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                            currentStatus === "On Duty"
                              ? "bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-600/30"
                              : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                          }`}
                        >
                          On Duty
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
