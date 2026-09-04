"use client";

import React, { useState } from "react";
import {
  FileText,
  Plus,
  Calendar,
  CheckCircle,
  Clock,
  Search,
  BookOpen,
  X,
  Sparkles,
  Users,
  Upload,
} from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";
import { AssignmentItem } from "@/lib/data/cse-demo-data";

export default function AssignmentsPage() {
  const { assignments, subjects, facultyList, studentList, showToast } = useDepartment();

  const [assignmentList, setAssignmentList] = useState(assignments);
  const [selectedAssignment, setSelectedAssignment] = useState<AssignmentItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New assignment form
  const [formData, setFormData] = useState({
    title: "",
    subjectCode: "CS501",
    subjectName: "Database Management Systems",
    facultyName: "Dr. Priya Sharma",
    dueDate: "2026-09-25",
    maxMarks: 20,
    description: "",
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const newAssignment: AssignmentItem = {
      ...formData,
      id: `asg-${Date.now()}`,
      submittedCount: 0,
      totalStudents: 62,
      status: "Active",
    };

    setAssignmentList([newAssignment, ...assignmentList]);
    setIsAddModalOpen(false);
    showToast("Assignment Published", `"${formData.title}" assigned to 5th Semester.`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Course Assignments</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Practical problem sets, programming tasks, deadline tracking, and grading queue.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Assignment</span>
        </button>
      </div>

      {/* Grid of assignments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assignmentList.map((asg) => {
          const submissionRate = Math.round((asg.submittedCount / asg.totalStudents) * 100);
          return (
            <div
              key={asg.id}
              onClick={() => setSelectedAssignment(asg)}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle hover:shadow-card hover:border-indigo-200 transition cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 font-mono">
                    {asg.subjectCode}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                    {asg.status}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-900 mt-3 line-clamp-2">{asg.title}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{asg.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Due: {asg.dueDate}
                  </span>
                  <span className="font-semibold text-slate-800">{asg.maxMarks} Marks</span>
                </div>

                <div>
                  <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 mb-1">
                    <span>Submissions</span>
                    <span className="text-indigo-600 font-bold">
                      {asg.submittedCount} / {asg.totalStudents} ({submissionRate}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{ width: `${submissionRate}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submissions & Grading Drawer */}
      {selectedAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="fixed inset-0" onClick={() => setSelectedAssignment(null)} />
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col">
            <div className="p-6 bg-slate-900 text-white relative">
              <button
                onClick={() => setSelectedAssignment(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-200">
                {selectedAssignment.subjectCode} • Max: {selectedAssignment.maxMarks} Marks
              </span>
              <h2 className="text-xl font-bold mt-1">{selectedAssignment.title}</h2>
              <p className="text-xs text-slate-300 mt-1">Due: {selectedAssignment.dueDate} • Instructor: {selectedAssignment.facultyName}</p>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-1">
                  Assignment Instructions
                </h4>
                <p className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 leading-relaxed">
                  {selectedAssignment.description}
                </p>
              </div>

              {/* Student Submissions List */}
              <div>
                <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-2">
                  Student Submissions & Marks ({selectedAssignment.submittedCount} Submitted)
                </h4>
                <div className="space-y-2">
                  {studentList.slice(0, 5).map((s, idx) => (
                    <div
                      key={s.id}
                      className="p-3 rounded-xl border border-slate-100 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-lg object-cover" />
                        <div>
                          <p className="font-bold text-slate-800">{s.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">
                            {s.usn} • Submitted Sept 12, 11:42 PM
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-[11px]">Score:</span>
                        <input
                          type="number"
                          defaultValue={18 - idx}
                          max={selectedAssignment.maxMarks}
                          className="w-14 px-2 py-1 text-xs font-bold text-center border rounded-lg bg-slate-50"
                        />
                        <span className="text-slate-400">/{selectedAssignment.maxMarks}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
              <button
                onClick={() => {
                  setSelectedAssignment(null);
                  showToast("Grades Saved", "Submissions and scores recorded to gradebook.");
                }}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-white"
              >
                Save Grading
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Assignment Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="fixed inset-0" onClick={() => setIsAddModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900">Create New Assignment</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Assignment Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Lab Exercise 4: Buffer Pool Management"
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Course / Subject</label>
                  <select
                    value={formData.subjectCode}
                    onChange={(e) => {
                      const code = e.target.value;
                      const sub = subjects.find((s) => s.code === code);
                      setFormData({
                        ...formData,
                        subjectCode: code,
                        subjectName: sub?.name || "",
                        facultyName: sub?.facultyName || formData.facultyName,
                      });
                    }}
                    className="w-full px-3 py-2 border rounded-xl outline-none bg-white"
                  >
                    {subjects.map((s) => (
                      <option key={s.id} value={s.code}>{s.code}: {s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Max Marks</label>
                  <input
                    type="number"
                    value={formData.maxMarks}
                    onChange={(e) => setFormData({ ...formData, maxMarks: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-xl outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Submission Deadline</label>
                <input
                  type="date"
                  required
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Instructions & Problem Statement</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe requirements, deliverables, and format..."
                  className="w-full px-3 py-2 border rounded-xl outline-none"
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
                  Publish Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
