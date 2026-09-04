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

  const atRiskCount = studentList.filter((s) => s.attendanceRate < 75 || s.backlogs > 0).length;

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
      year: 3,
      semester: 5,
      section: "A",
      cgpa: 8.5,
      backlogs: 0,
      attendanceRate: 90.0,
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
      dob: "2004-05-15",
      parentName: "",
      parentPhone: "",
      address: "Bangalore",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Student Directory</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor student profiles, academic performance (CGPA), attendance thresholds, and placement milestones.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Enrol New Student</span>
        </button>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle">
          <span className="text-[11px] font-medium text-slate-400">Total Enrolled</span>
          <p className="text-xl font-bold text-slate-900 mt-1">748</p>
          <span className="text-[10px] text-slate-400">All 4 Batches</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle">
          <span className="text-[11px] font-medium text-slate-400">Boys</span>
          <p className="text-xl font-bold text-indigo-600 mt-1">412</p>
          <span className="text-[10px] text-slate-400">55.1%</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle">
          <span className="text-[11px] font-medium text-slate-400">Girls</span>
          <p className="text-xl font-bold text-pink-600 mt-1">336</p>
          <span className="text-[10px] text-slate-400">44.9%</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle">
          <span className="text-[11px] font-medium text-slate-400">Active Students</span>
          <p className="text-xl font-bold text-emerald-600 mt-1">736</p>
          <span className="text-[10px] text-emerald-600 font-semibold">98.4% Regular</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle">
          <span className="text-[11px] font-medium text-slate-400">Avg Attendance</span>
          <p className="text-xl font-bold text-sky-600 mt-1">88.4%</p>
          <span className="text-[10px] text-slate-400">Above target</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200/80 shadow-subtle">
          <span className="text-[11px] font-medium text-rose-700">Students At Risk</span>
          <p className="text-xl font-bold text-rose-700 mt-1">{atRiskCount}</p>
          <span className="text-[10px] text-rose-600 font-semibold">&lt;75% Attendance / Backlogs</span>
        </div>
      </div>

      {/* Year Tabs + Section Filters + Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-2">
        {/* Year Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0">
          {[
            { label: "All Years", val: "All" },
            { label: "1st Year (Sem 1-2)", val: 1 },
            { label: "2nd Year (Sem 3-4)", val: 2 },
            { label: "3rd Year (Sem 5-6)", val: 3 },
            { label: "4th Year (Sem 7-8)", val: 4 },
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
                      Year {selectedStudent.year} • Semester {selectedStudent.semester} (Sec {selectedStudent.section})
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mt-1">{selectedStudent.name}</h2>
                  <p className="text-xs text-slate-300">Computer Science & Engineering • Admitted 2023</p>
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
