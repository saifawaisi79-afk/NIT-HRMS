"use client";

import React, { useState, useMemo } from "react";
import {
  GraduationCap,
  Search,
  Plus,
  Filter,
  Phone,
  Mail,
  AlertTriangle,
  Award,
  CheckCircle,
  X,
  Building,
  UserCheck,
  TrendingUp,
} from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";
import { StudentRecord } from "@/lib/data/cse-demo-data";
import { getAttendanceColor } from "@/lib/utils";

export default function StudentsPage() {
  const { studentList, addStudent, updateStudent, deleteStudent } = useDepartment();

  const [activeYear, setActiveYear] = useState<number | "All">("All");
  const [activeSection, setActiveSection] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New student form
  const [formData, setFormData] = useState({
    name: "",
    usn: "",
    email: "",
    phone: "",
    gender: "Male" as "Male" | "Female",
    year: 3 as 1 | 2 | 3 | 4,
    semester: 5,
    section: "A" as "A" | "B" | "C",
    cgpa: 8.5,
    backlogs: 0,
    attendanceRate: 90.0,
    status: "Active" as "Active" | "At Risk",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    dob: "2004-05-15",
    parentName: "",
    parentPhone: "",
    address: "Bangalore",
  });

  const [viewMode, setViewMode] = useState<"directory" | "training_sheet">("directory");

  // Dynamic statistics
  const totalCount = studentList.length;
  const boysCount = studentList.filter((s) => s.gender === "Male").length;
  const girlsCount = studentList.filter((s) => s.gender === "Female").length;
  const activeCount = studentList.filter((s) => s.status === "Active").length;
  const avgAttendance = totalCount > 0 
    ? (studentList.reduce((acc, s) => acc + s.attendanceRate, 0) / totalCount).toFixed(1)
    : "0.0";
  const atRiskCount = studentList.filter((s) => s.attendanceRate < 75 || s.backlogs > 0).length;

  // Filter students
  const filteredStudents = useMemo(() => {
    return studentList.filter((s) => {
      const matchesYear = activeYear === "All" || s.year === activeYear;
      const matchesSec = activeSection === "All" || s.section === activeSection;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.usn.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q);

      return matchesYear && matchesSec && matchesSearch;
    });
  }, [studentList, activeYear, activeSection, searchQuery]);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.usn) return;
    addStudent(formData);
    setIsAddModalOpen(false);
    setFormData({
      name: "",
      usn: "",
      email: "",
      phone: "",
      gender: "Male",
      year: 4,
      semester: 8,
      section: "A",
      cgpa: 8.5,
      backlogs: 0,
      attendanceRate: 90.0,
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
      dob: "2001-05-15",
      parentName: "",
      parentPhone: "",
      address: "Raichur, Karnataka",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Title & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Student Directory & Academic Roll</h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              NIT Raichur CSE
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Navodaya Institute of Technology Raichur • Batch-1 Soft Skill Training & Even Semester Registry.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Dual Mode Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode("directory")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                viewMode === "directory"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Interactive Directory
            </button>
            <button
              onClick={() => setViewMode("training_sheet")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 ${
                viewMode === "training_sheet"
                  ? "bg-white text-indigo-700 shadow-sm font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>📄 Official T&P Batch-1 Sheet</span>
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            </button>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>Enrol Student</span>
          </button>
        </div>
      </div>

      {/* Official T&P Batch-1 Callout Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-4 sm:p-5 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/20 text-white inline-block mb-1.5">
              NET'S NAVODAYA INSTITUTE OF TECHNOLOGY RAICHUR • T&P CELL
            </span>
            <h3 className="text-base sm:text-lg font-bold">Academic Year 2021-22 | Batch - 1 Soft Skill Training</h3>
            <p className="text-xs text-indigo-200 mt-0.5">
              Training Schedule: <span className="font-semibold text-white">18.04.22 to 30.04.22</span> • 38 Registered CSE Students (USN: 3NA18CS001 to 3NA19CS401)
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("training_sheet")}
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-white text-indigo-900 hover:bg-indigo-50 shadow-sm transition whitespace-nowrap"
            >
              {viewMode === "training_sheet" ? "Viewing Official Document" : "View Official Document (Image 1) →"}
            </button>
          </div>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle">
          <span className="text-[11px] font-medium text-slate-400">Total Enrolled</span>
          <p className="text-xl font-bold text-slate-900 mt-1">{totalCount}</p>
          <span className="text-[10px] text-slate-400">Batch-1 (2021-22)</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle">
          <span className="text-[11px] font-medium text-slate-400">Boys</span>
          <p className="text-xl font-bold text-indigo-600 mt-1">{boysCount}</p>
          <span className="text-[10px] text-slate-400">{totalCount ? Math.round((boysCount / totalCount) * 100) : 0}%</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle">
          <span className="text-[11px] font-medium text-slate-400">Girls</span>
          <p className="text-xl font-bold text-pink-600 mt-1">{girlsCount}</p>
          <span className="text-[10px] text-slate-400">{totalCount ? Math.round((girlsCount / totalCount) * 100) : 0}%</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle">
          <span className="text-[11px] font-medium text-slate-400">Active Students</span>
          <p className="text-xl font-bold text-emerald-600 mt-1">{activeCount}</p>
          <span className="text-[10px] text-emerald-600 font-semibold">{totalCount ? ((activeCount / totalCount) * 100).toFixed(1) : 0}% Regular</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle">
          <span className="text-[11px] font-medium text-slate-400">Avg Attendance</span>
          <p className="text-xl font-bold text-sky-600 mt-1">{avgAttendance}%</p>
          <span className="text-[10px] text-slate-400">Soft Skill Sessions</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200/80 shadow-subtle">
          <span className="text-[11px] font-medium text-rose-700">Students At Risk</span>
          <p className="text-xl font-bold text-rose-700 mt-1">{atRiskCount}</p>
          <span className="text-[10px] text-rose-600 font-semibold">&lt;75% Attendance / Backlogs</span>
        </div>
      </div>

      {/* If Official Training Sheet Mode */}
      {viewMode === "training_sheet" ? (
        <div className="bg-white rounded-2xl border-2 border-slate-800 shadow-xl overflow-hidden p-6 md:p-8 max-w-4xl mx-auto print:m-0 print:p-2 print:border-none">
          {/* Action bar for print */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-200 mb-6 print:hidden">
            <div>
              <p className="font-bold text-slate-900 text-sm">Official Document Mode</p>
              <p className="text-xs text-slate-500">Rendered exactly in format of Training & Placement Cell Record</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 shadow transition flex items-center gap-1.5"
              >
                <span>🖨️ Print Batch Record</span>
              </button>
              <button
                onClick={() => setViewMode("directory")}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-100 transition"
              >
                Return to Directory
              </button>
            </div>
          </div>

          {/* Official Document Header as in Image 1 */}
          <div className="text-center font-serif text-slate-900 space-y-1 mb-6 pb-2 border-b-2 border-slate-900">
            <h2 className="text-base sm:text-lg font-extrabold tracking-wider uppercase">
              NET&apos;S
            </h2>
            <h1 className="text-lg sm:text-xl font-black tracking-wide uppercase">
              NAVODAYA INSTITUTE OF TECHNOLOGY RAICHUR
            </h1>
            <h3 className="text-sm sm:text-base font-bold">
              Training &amp; Placement Cell
            </h3>
            <h4 className="text-xs sm:text-sm font-bold tracking-wide uppercase">
              ACADEMIC YEAR 2021-22
            </h4>
            <h4 className="text-xs sm:text-sm font-extrabold tracking-wide">
              Batch - 1
            </h4>
            <h4 className="text-sm font-black uppercase tracking-wider underline underline-offset-4">
              Soft skill Training
            </h4>
            <h5 className="text-xs sm:text-sm font-extrabold">
              18.04.22 to 30.04.22
            </h5>
          </div>

          {/* Search bar inside sheet for quick verification */}
          <div className="mb-4 print:hidden flex items-center justify-between gap-4">
            <div className="relative w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search USN or Name in Batch 1..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/20"
              />
            </div>
            <span className="text-xs font-semibold text-slate-600">
              Showing {filteredStudents.length} of {studentList.length} Students
            </span>
          </div>

          {/* Authentic Document Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border-2 border-slate-900 text-left font-serif text-xs">
              <thead>
                <tr className="border-b-2 border-slate-900 bg-slate-100 text-slate-900 font-extrabold text-center">
                  <th className="border-r-2 border-slate-900 py-2 px-3 w-16">S.NO</th>
                  <th className="border-r-2 border-slate-900 py-2 px-4 w-36">USN</th>
                  <th className="border-r-2 border-slate-900 py-2 px-6 text-left">NAME OF THE STUDENT</th>
                  <th className="py-2 px-6 w-24">Dept.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-400">
                {filteredStudents.map((s, idx) => (
                  <tr
                    key={s.id}
                    onClick={() => setSelectedStudent(s)}
                    className="hover:bg-amber-50/60 transition cursor-pointer"
                  >
                    <td className="border-r-2 border-slate-900 py-1.5 px-3 text-center font-bold text-slate-800">
                      {idx + 1}
                    </td>
                    <td className="border-r-2 border-slate-900 py-1.5 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {s.usn}
                    </td>
                    <td className="border-r-2 border-slate-900 py-1.5 px-6 font-bold uppercase tracking-wide text-slate-900">
                      {s.name}
                    </td>
                    <td className="py-1.5 px-6 text-center font-bold text-slate-900">
                      CSE
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Document Footer Signatures */}
          <div className="mt-12 pt-8 flex items-end justify-between text-xs font-serif font-bold text-slate-900">
            <div className="text-center">
              <p className="border-t border-slate-900 pt-1 w-44">T&amp;P Officer</p>
            </div>
            <div className="text-center">
              <p className="border-t border-slate-900 pt-1 w-44">Principal / Director</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Year Tabs + Section Filters + Search */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-2">
            {/* Year Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0">
              {[
                { label: "All Batches", val: "All" },
                { label: "Final Year (Sem 7-8)", val: 4 },
                { label: "3rd Year (Sem 5-6)", val: 3 },
                { label: "2nd Year (Sem 3-4)", val: 2 },
                { label: "1st Year (Sem 1-2)", val: 1 },
              ].map((y) => (
                <button
                  key={String(y.val)}
                  onClick={() => setActiveYear(y.val as any)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition whitespace-nowrap ${
                    activeYear === y.val
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {y.label}
                </button>
              ))}
            </div>

            {/* Section Filters + Search Input */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                {["All", "A", "B", "C"].map((sec) => (
                  <button
                    key={sec}
                    onClick={() => setActiveSection(sec)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition ${
                      activeSection === sec ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Sec {sec}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or USN..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>
          </div>

      {/* Student Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200/70 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Student</th>
                <th className="py-3.5 px-4">USN</th>
                <th className="py-3.5 px-4">Class</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Attendance</th>
                <th className="py-3.5 px-4">CGPA</th>
                <th className="py-3.5 px-4">Backlogs</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((s) => {
                const att = getAttendanceColor(s.attendanceRate);
                return (
                  <tr
                    key={s.id}
                    className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                    onClick={() => setSelectedStudent(s)}
                  >
                    {/* Student Avatar + Name */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={s.avatar}
                          alt={s.name}
                          className="w-8 h-8 rounded-xl object-cover ring-1 ring-slate-200"
                        />
                        <div>
                          <p className="font-bold text-slate-900 group-hover:text-indigo-600 transition">
                            {s.name}
                          </p>
                          <p className="text-[10px] text-slate-400">{s.gender} • DOB: {s.dob}</p>
                        </div>
                      </div>
                    </td>

                    {/* USN */}
                    <td className="py-3 px-4 font-mono font-semibold text-slate-700">{s.usn}</td>

                    {/* Semester & Section */}
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-800">Sem {s.semester}</span>
                      <span className="ml-1 text-slate-500 font-medium">Sec {s.section}</span>
                    </td>

                    {/* Phone / Email */}
                    <td className="py-3 px-4 text-slate-500">
                      <p className="font-medium text-slate-700">{s.phone}</p>
                      <p className="text-[10px] text-slate-400">{s.email}</p>
                    </td>

                    {/* Attendance */}
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${att.bg}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${att.dot}`} />
                        {s.attendanceRate}%
                      </span>
                    </td>

                    {/* CGPA */}
                    <td className="py-3 px-4">
                      <span className="font-bold text-slate-900">{s.cgpa.toFixed(2)}</span>
                      <span className="text-[10px] text-slate-400 ml-0.5">/10</span>
                    </td>

                    {/* Backlogs */}
                    <td className="py-3 px-4">
                      {s.backlogs > 0 ? (
                        <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold text-[10px] border border-rose-200">
                          {s.backlogs} Backlog{s.backlogs > 1 ? "s" : ""}
                        </span>
                      ) : (
                        <span className="text-slate-400 font-medium text-[11px]">Clean (0)</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          s.status === "Active"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-rose-50 text-rose-700 font-bold"
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setSelectedStudent(s)}
                        className="px-2.5 py-1 text-xs font-semibold rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition"
                      >
                        View Dossier →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      </>
      )}

      {/* Student Profile Drawer / Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="fixed inset-0" onClick={() => setSelectedStudent(null)} />
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-slate-900 to-indigo-950 text-white relative">
              <button
                onClick={() => setSelectedStudent(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-4">
                <img
                  src={selectedStudent.avatar}
                  alt={selectedStudent.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/30 shadow-lg"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
                      {selectedStudent.usn}
                    </span>
                    <span className="text-xs font-medium text-indigo-200">
                      Batch-1 • Semester {selectedStudent.semester} (Sec {selectedStudent.section})
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mt-1">{selectedStudent.name}</h2>
                  <p className="text-xs text-slate-300">
                    Navodaya Institute of Technology Raichur • Dept. of Computer Science & Engineering
                  </p>
                  <p className="text-[11px] text-amber-300 font-medium mt-0.5">
                    ★ Soft skill Training (18.04.22 to 30.04.22)
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs">
              {/* Key Metrics */}
              <div className="grid grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Cumulative GPA</p>
                  <p className="text-lg font-bold text-slate-900 mt-0.5">{selectedStudent.cgpa.toFixed(2)}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Attendance</p>
                  <p className="text-lg font-bold text-emerald-600 mt-0.5">{selectedStudent.attendanceRate}%</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Backlogs</p>
                  <p className={`text-lg font-bold mt-0.5 ${selectedStudent.backlogs > 0 ? "text-rose-600" : "text-slate-800"}`}>
                    {selectedStudent.backlogs}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Placement</p>
                  <p className="text-xs font-bold text-indigo-600 mt-1">
                    {selectedStudent.placedCompany ? `${selectedStudent.placedCompany} (₹${selectedStudent.placedPackage}L)` : "Eligible"}
                  </p>
                </div>
              </div>

              {/* Attendance Breakdown by Subject */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Subject Attendance Breakdown</h4>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-800">CS501: Database Management Systems</p>
                      <p className="text-[11px] text-slate-400">Dr. Priya Sharma • 38/40 classes attended</p>
                    </div>
                    <span className="font-bold text-emerald-600">95.0%</span>
                  </div>
                  <div className="p-2.5 rounded-xl border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-800">CS502: Operating Systems</p>
                      <p className="text-[11px] text-slate-400">Dr. Anand K. Rao • 36/40 classes attended</p>
                    </div>
                    <span className="font-bold text-emerald-600">90.0%</span>
                  </div>
                  <div className="p-2.5 rounded-xl border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-800">CS503: Computer Networks</p>
                      <p className="text-[11px] text-slate-400">Dr. Meenakshi S. • 35/38 classes attended</p>
                    </div>
                    <span className="font-bold text-sky-600">92.1%</span>
                  </div>
                </div>
              </div>

              {/* Guardian & Residential Details */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Guardian & Contact Details</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl border border-slate-100">
                    <p className="text-[10px] text-slate-400">Parent / Guardian Name</p>
                    <p className="font-semibold text-slate-800">{selectedStudent.parentName || "Sunil Sharma"}</p>
                    <p className="text-[11px] text-slate-500 mt-1">{selectedStudent.parentPhone || "+91 94480 12000"}</p>
                  </div>
                  <div className="p-3 rounded-xl border border-slate-100">
                    <p className="text-[10px] text-slate-400">Residential Address</p>
                    <p className="font-semibold text-slate-800">{selectedStudent.address}</p>
                    <p className="text-[11px] text-slate-500 mt-1">Student Phone: {selectedStudent.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enrol Student Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="fixed inset-0" onClick={() => setIsAddModalOpen(false)} />
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900">Enrol New Student</h3>
                <p className="text-xs text-slate-500">Add student to CSE academic rolls</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Student Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Diya Patel"
                    className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">USN (University Seat No)</label>
                  <input
                    type="text"
                    required
                    value={formData.usn}
                    onChange={(e) => setFormData({ ...formData, usn: e.target.value.toUpperCase() })}
                    placeholder="1NT23CS045"
                    className="w-full px-3 py-2 border rounded-xl outline-none font-mono uppercase focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Semester</label>
                  <select
                    value={formData.semester}
                    onChange={(e) => {
                      const sem = Number(e.target.value);
                      const yr = Math.ceil(sem / 2) as 1 | 2 | 3 | 4;
                      setFormData({ ...formData, semester: sem, year: yr });
                    }}
                    className="w-full px-3 py-2 border rounded-xl outline-none bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                      <option key={s} value={s}>Semester {s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Section</label>
                  <select
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-xl outline-none bg-white"
                  >
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                    <option value="C">Section C</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-xl outline-none bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Student Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@nitcampus.ac.in"
                    className="w-full px-3 py-2 border rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Student Mobile</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 border rounded-xl outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Parent Name</label>
                  <input
                    type="text"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    placeholder="Guardian Full Name"
                    className="w-full px-3 py-2 border rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Parent Phone</label>
                  <input
                    type="text"
                    value={formData.parentPhone}
                    onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                    placeholder="+91 94480 00000"
                    className="w-full px-3 py-2 border rounded-xl outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold"
                >
                  Save Enrolment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
