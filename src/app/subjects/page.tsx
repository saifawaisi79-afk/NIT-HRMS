"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Plus,
  Search,
  User,
  CheckCircle,
  Clock,
  Layers,
  Award,
  Sparkles,
  X,
  FileText,
  Users,
} from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";
import { SubjectCourse } from "@/lib/data/cse-demo-data";

export default function SubjectsPage() {
  const { subjects, addSubject, facultyList } = useDepartment();

  const [selectedSem, setSelectedSem] = useState<number | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<SubjectCourse | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    credits: 4,
    semester: 5,
    type: "Theory" as SubjectCourse["type"],
    facultyName: "Dr. Priya Sharma",
    facultyId: "fac-2",
    syllabusCompletion: 0,
    enrolledStudentsCount: 186,
    description: "",
  });

  const filteredSubjects = subjects.filter((s) => {
    const matchSem = selectedSem === "All" || s.semester === selectedSem;
    const matchQuery =
      !searchQuery ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.facultyName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSem && matchQuery;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code || !formData.name) return;
    addSubject(formData);
    setIsAddModalOpen(false);
    setFormData({
      code: "",
      name: "",
      credits: 4,
      semester: 5,
      type: "Theory",
      facultyName: "Dr. Priya Sharma",
      facultyId: "fac-2",
      syllabusCompletion: 0,
      enrolledStudentsCount: 186,
      description: "",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Curriculum & Courses</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            B.Tech Computer Science & Engineering course catalogue, syllabus completion, and faculty assignments.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Course</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        {/* Semester Filter */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {[
            { label: "All Semesters", val: "All" },
            { label: "Sem 3", val: 3 },
            { label: "Sem 5", val: 5 },
            { label: "Sem 7", val: 7 },
          ].map((item) => (
            <button
              key={String(item.val)}
              onClick={() => setSelectedSem(item.val as any)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition ${
                selectedSem === item.val
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search code or course title..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSubjects.map((sub) => (
          <div
            key={sub.id}
            onClick={() => setSelectedSubject(sub)}
            className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle hover:shadow-card hover:border-indigo-200 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                  {sub.code}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {sub.type} • {sub.credits} Credits
                </span>
              </div>

              <h3 className="font-bold text-sm text-slate-900 mt-2.5 group-hover:text-indigo-600 transition">
                {sub.name}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2 mt-1">{sub.description}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-medium truncate max-w-[140px]">{sub.facultyName}</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-400">Sem {sub.semester}</span>
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 mb-1">
                  <span>Syllabus Covered</span>
                  <span className="text-indigo-600 font-bold">{sub.syllabusCompletion}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                    style={{ width: `${sub.syllabusCompletion}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Course Detail Modal */}
      {selectedSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="fixed inset-0" onClick={() => setSelectedSubject(null)} />
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col">
            <div className="p-6 bg-slate-900 text-white relative">
              <button
                onClick={() => setSelectedSubject(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-4 h-4" />
              </button>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-200 font-bold">
                {selectedSubject.code} • Semester {selectedSubject.semester}
              </span>
              <h2 className="text-xl font-bold mt-1.5">{selectedSubject.name}</h2>
              <p className="text-xs text-slate-300 mt-1">Instructor: {selectedSubject.facultyName}</p>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-1">
                  Course Synopsis
                </h4>
                <p className="text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                  {selectedSubject.description}
                </p>
              </div>

              {/* Syllabus Modules */}
              <div>
                <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-2">
                  Curriculum Module Status
                </h4>
                <div className="space-y-2">
                  {[
                    { mod: 1, title: "Foundations & Mathematical Principles", status: "Completed (100%)", done: true },
                    { mod: 2, title: "Architecture & Algorithmic Analysis", status: "Completed (100%)", done: true },
                    { mod: 3, title: "Transaction Concurrency & Protocols", status: "In Progress (60%)", done: false },
                    { mod: 4, title: "Failure Recovery & Distributed Consensus", status: "Upcoming", done: false },
                    { mod: 5, title: "Case Studies & Advanced Research Trends", status: "Upcoming", done: false },
                  ].map((m) => (
                    <div
                      key={m.mod}
                      className="p-2.5 rounded-xl border border-slate-100 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[10px] text-slate-600">
                          {m.mod}
                        </span>
                        <span className="font-medium text-slate-800">{m.title}</span>
                      </div>
                      <span className={`text-[10px] font-semibold ${m.done ? "text-emerald-600" : "text-slate-400"}`}>
                        {m.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
              <button
                onClick={() => setSelectedSubject(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Course Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="fixed inset-0" onClick={() => setIsAddModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900">Add Academic Course</h3>
                <p className="text-xs text-slate-500">Create new course subject under department syllabus</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Subject Code</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    placeholder="e.g. CS602"
                    className="w-full px-3 py-2 border rounded-xl outline-none font-mono uppercase focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Credits</label>
                  <input
                    type="number"
                    value={formData.credits}
                    onChange={(e) => setFormData({ ...formData, credits: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Deep Learning and Neural Architectures"
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Semester</label>
                  <select
                    value={formData.semester}
                    onChange={(e) => setFormData({ ...formData, semester: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-xl outline-none bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                      <option key={s} value={s}>Semester {s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-xl outline-none bg-white"
                  >
                    <option value="Theory">Theory</option>
                    <option value="Lab">Lab / Practical</option>
                    <option value="Elective">Elective</option>
                    <option value="Project">Project / Capstone</option>
                    <option value="Seminar">Technical Seminar</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Assigned Instructor</label>
                <select
                  value={formData.facultyName}
                  onChange={(e) => {
                    const name = e.target.value;
                    const fac = facultyList.find((f) => f.name === name);
                    setFormData({ ...formData, facultyName: name, facultyId: fac?.id || "" });
                  }}
                  className="w-full px-3 py-2 border rounded-xl outline-none bg-white"
                >
                  {facultyList.map((f) => (
                    <option key={f.id} value={f.name}>{f.name} ({f.designation})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summary of learning outcomes and syllabus scope..."
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
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
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
