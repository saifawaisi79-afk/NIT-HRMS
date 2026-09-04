"use client";

import React, { useState, useMemo } from "react";
import {
  Users,
  Search,
  Plus,
  MoreHorizontal,
  Mail,
  Phone,
  BookOpen,
  CalendarCheck,
  Award,
  Filter,
  X,
  Sparkles,
  ExternalLink,
  Edit2,
  Trash2,
  CheckCircle,
  Briefcase,
} from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";
import { FacultyMember } from "@/lib/data/cse-demo-data";

export default function FacultyPage() {
  const { facultyList, addFaculty, updateFaculty, deleteFaculty, timetable } = useDepartment();

  const [activeTab, setActiveTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form state for adding faculty
  const [formData, setFormData] = useState({
    name: "",
    designation: "Assistant Professor" as FacultyMember["designation"],
    qualification: "M.Tech, Ph.D",
    department: "Computer Science & Engineering",
    email: "",
    phone: "",
    subjects: "",
    experienceYears: 5,
    attendanceRate: 95.0,
    status: "Active" as FacultyMember["status"],
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    officeRoom: "CS-310",
    specialization: "",
    joiningDate: "2026-08-01",
    publicationsCount: 2,
  });

  // Filtered list
  const filteredFaculty = useMemo(() => {
    return facultyList.filter((f) => {
      const matchesTab =
        activeTab === "All" ||
        (activeTab === "Professors" && f.designation === "Professor") ||
        (activeTab === "Associate Professors" && f.designation === "Associate Professor") ||
        (activeTab === "Assistant Professors" && f.designation === "Assistant Professor") ||
        (activeTab === "Guest Faculty" && f.designation === "Guest Faculty");

      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        f.name.toLowerCase().includes(q) ||
        f.email.toLowerCase().includes(q) ||
        f.empId.toLowerCase().includes(q) ||
        f.specialization.toLowerCase().includes(q) ||
        f.subjects.some((s) => s.toLowerCase().includes(q));

      return matchesTab && matchesSearch;
    });
  }, [facultyList, activeTab, searchQuery]);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    addFaculty({
      ...formData,
      subjects: formData.subjects.split(",").map((s) => s.trim()).filter(Boolean),
    });

    setIsAddModalOpen(false);
    setFormData({
      name: "",
      designation: "Assistant Professor",
      qualification: "M.Tech, Ph.D",
      department: "Computer Science & Engineering",
      email: "",
      phone: "",
      subjects: "",
      experienceYears: 5,
      attendanceRate: 95.0,
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      officeRoom: "CS-310",
      specialization: "",
      joiningDate: "2026-08-01",
      publicationsCount: 2,
    });
  };

  // Badge styling matching reference image
  const getDesignationBadge = (designation: string) => {
    switch (designation) {
      case "Professor":
        return "bg-amber-100/80 text-amber-800 border-amber-200/80";
      case "Associate Professor":
        return "bg-indigo-100/80 text-indigo-800 border-indigo-200/80";
      case "Assistant Professor":
        return "bg-sky-100/80 text-sky-800 border-sky-200/80";
      case "Guest Faculty":
        return "bg-emerald-100/80 text-emerald-800 border-emerald-200/80";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Title and Top Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Faculty Registry</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage CSE department teaching staff, credentials, workload distribution, and achievements.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Faculty</span>
        </button>
      </div>

      {/* Top 3 Spotlight Hero Cards (Inspired directly by Reference Image: Biology, Ecology, Physiology teacher of the month) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Faculty of the Month (Warm Amber) */}
        <div className="p-5 rounded-2xl card-spotlight-amber shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 rounded-xl bg-amber-200/70 flex items-center justify-center text-amber-800 font-bold text-sm">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800/70">Spotlight</span>
          </div>

          <div className="my-4">
            <p className="text-xs font-medium text-amber-800/90">Faculty of the Month</p>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">Dr. Ramesh Kumar</h3>
            <p className="text-xs text-slate-600 mt-0.5">Specialization: Artificial Intelligence & HPC</p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-amber-200/60">
            <div className="flex items-center gap-2.5">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                alt="Dr. Ramesh Kumar"
                className="w-7 h-7 rounded-full object-cover ring-2 ring-white"
              />
              <span className="text-xs font-semibold text-slate-800">HOD • 21 Yrs Exp</span>
            </div>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
              Professor
            </span>
          </div>
        </div>

        {/* Card 2: Highest Attendance (Soft Blue) */}
        <div className="p-5 rounded-2xl card-spotlight-blue shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 rounded-xl bg-blue-200/70 flex items-center justify-center text-blue-800 font-bold text-sm">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800/70">Punctuality</span>
          </div>

          <div className="my-4">
            <p className="text-xs font-medium text-blue-800/90">Highest Attendance Rate</p>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">Dr. Priya Sharma</h3>
            <p className="text-xs text-slate-600 mt-0.5">99.2% Recorded Lecture Attendance</p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-blue-200/60">
            <div className="flex items-center gap-2.5">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                alt="Dr. Priya Sharma"
                className="w-7 h-7 rounded-full object-cover ring-2 ring-white"
              />
              <span className="text-xs font-semibold text-slate-800">DBMS Lead • 18 Yrs</span>
            </div>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-200 text-blue-900">
              Professor
            </span>
          </div>
        </div>

        {/* Card 3: Research Leader (Soft Green) */}
        <div className="p-5 rounded-2xl card-spotlight-green shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 rounded-xl bg-emerald-200/70 flex items-center justify-center text-emerald-800 font-bold text-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800/70">Citations</span>
          </div>

          <div className="my-4">
            <p className="text-xs font-medium text-emerald-800/90">Top Research Citations</p>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">Dr. Anand K. Rao</h3>
            <p className="text-xs text-slate-600 mt-0.5">42 Scopus & IEEE Indexed Publications</p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-emerald-200/60">
            <div className="flex items-center gap-2.5">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
                alt="Dr. Anand Rao"
                className="w-7 h-7 rounded-full object-cover ring-2 ring-white"
              />
              <span className="text-xs font-semibold text-slate-800">OS Kernel • 16 Yrs</span>
            </div>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
              Professor
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Row (Exact Reference Image Layout) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        {/* Category Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {["All", "Professors", "Associate Professors", "Assistant Professors", "Guest Faculty"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition whitespace-nowrap ${
                activeTab === tab
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {tab === "All" ? "All Faculty" : tab}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search faculty, subject, specialization..."
            className="w-full pl-9 pr-3.5 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Main Faculty Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200/70 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Faculty Name</th>
                <th className="py-3.5 px-4">Employee ID</th>
                <th className="py-3.5 px-4">Designation</th>
                <th className="py-3.5 px-4">Primary Subject</th>
                <th className="py-3.5 px-4">Phone / Email</th>
                <th className="py-3.5 px-4">Experience</th>
                <th className="py-3.5 px-4">Attendance</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredFaculty.map((f) => (
                <tr
                  key={f.id}
                  className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                  onClick={() => setSelectedFaculty(f)}
                >
                  {/* Name + Avatar */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={f.avatar}
                        alt={f.name}
                        className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-200"
                      />
                      <div>
                        <p className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {f.name}
                        </p>
                        <p className="text-[11px] text-slate-400">{f.qualification}</p>
                      </div>
                    </div>
                  </td>

                  {/* Emp ID */}
                  <td className="py-3 px-4 text-slate-600 font-mono text-[11px]">{f.empId}</td>

                  {/* Designation Badge */}
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold border ${getDesignationBadge(
                        f.designation
                      )}`}
                    >
                      {f.designation}
                    </span>
                  </td>

                  {/* Subjects */}
                  <td className="py-3 px-4">
                    <span className="font-medium text-slate-800">{f.subjects[0] || "General Core"}</span>
                    {f.subjects.length > 1 && (
                      <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                        +{f.subjects.length - 1}
                      </span>
                    )}
                  </td>

                  {/* Phone / Email */}
                  <td className="py-3 px-4 text-slate-500">
                    <p className="font-medium text-slate-700">{f.phone}</p>
                    <p className="text-[11px] text-slate-400">{f.email}</p>
                  </td>

                  {/* Experience */}
                  <td className="py-3 px-4 text-slate-600 font-medium">{f.experienceYears} Years</td>

                  {/* Attendance */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="font-bold text-slate-800">{f.attendanceRate}%</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        f.status === "Active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {f.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setSelectedFaculty(f)}
                      className="px-2.5 py-1 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 font-semibold text-xs transition"
                    >
                      Profile →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredFaculty.length === 0 && (
          <div className="p-8 text-center text-slate-400">
            <Users className="w-8 h-8 mx-auto mb-2 text-slate-300" />
            <p className="text-sm font-semibold">No faculty found matching criteria</p>
            <p className="text-xs">Adjust your search query or tab filters.</p>
          </div>
        )}
      </div>

      {/* Faculty Profile Drawer/Modal */}
      {selectedFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="fixed inset-0" onClick={() => setSelectedFaculty(null)} />
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-slate-900 to-indigo-950 text-white relative">
              <button
                onClick={() => setSelectedFaculty(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-4">
                <img
                  src={selectedFaculty.avatar}
                  alt={selectedFaculty.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/30 shadow-lg"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/20 text-white">
                      {selectedFaculty.empId}
                    </span>
                    <span className="text-xs font-medium text-indigo-200">
                      Room {selectedFaculty.officeRoom}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mt-1">{selectedFaculty.name}</h2>
                  <p className="text-xs text-slate-300">
                    {selectedFaculty.designation} • {selectedFaculty.qualification}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Content Tabs/Details */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs">
              {/* Specialization & Bio */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Specialization</h4>
                <p className="text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium">
                  {selectedFaculty.specialization || "Computer Systems, Algorithms and Software Engineering"}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Experience</p>
                  <p className="text-base font-bold text-slate-800 mt-0.5">{selectedFaculty.experienceYears} Years</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Attendance</p>
                  <p className="text-base font-bold text-emerald-600 mt-0.5">{selectedFaculty.attendanceRate}%</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Publications</p>
                  <p className="text-base font-bold text-indigo-600 mt-0.5">{selectedFaculty.publicationsCount} Papers</p>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Communication</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-100">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-[10px] text-slate-400">Institutional Email</p>
                      <p className="font-semibold text-slate-800 truncate">{selectedFaculty.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-100">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-[10px] text-slate-400">Phone</p>
                      <p className="font-semibold text-slate-800">{selectedFaculty.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Assigned Courses */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Courses Taught</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedFaculty.subjects.map((sub, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-800 font-medium"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedFaculty(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Faculty Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="fixed inset-0" onClick={() => setIsAddModalOpen(false)} />
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900">Add New Faculty Member</h3>
                <p className="text-xs text-slate-500">Enter appointment and academic credentials</p>
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
                  <label className="block text-slate-600 font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Kavita Sharma"
                    className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Designation</label>
                  <select
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-white"
                  >
                    <option value="Professor">Professor</option>
                    <option value="Associate Professor">Associate Professor</option>
                    <option value="Assistant Professor">Assistant Professor</option>
                    <option value="Guest Faculty">Guest Faculty</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Qualifications</label>
                  <input
                    type="text"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    placeholder="e.g. Ph.D (IISc), M.Tech"
                    className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Specialization</label>
                  <input
                    type="text"
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    placeholder="e.g. Distributed Systems"
                    className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="kavita@nitcampus.ac.in"
                    className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98450 11223"
                    className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Courses Taught (comma separated)</label>
                <input
                  type="text"
                  value={formData.subjects}
                  onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                  placeholder="e.g. Operating Systems, Distributed Databases"
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Experience (Years)</label>
                  <input
                    type="number"
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Office Room</label>
                  <input
                    type="text"
                    value={formData.officeRoom}
                    onChange={(e) => setFormData({ ...formData, officeRoom: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Publications</label>
                  <input
                    type="number"
                    value={formData.publicationsCount}
                    onChange={(e) => setFormData({ ...formData, publicationsCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
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
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-sm"
                >
                  Save Faculty Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
