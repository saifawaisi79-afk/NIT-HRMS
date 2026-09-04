"use client";

import React, { useState } from "react";
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  TrendingUp,
  Search,
  Download,
  Percent,
  Sparkles,
  BarChart2,
  FileCheck,
} from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";
import { getGradeBadge } from "@/lib/utils";

interface ExamEntry {
  studentId: string;
  name: string;
  usn: string;
  internalMarks: number; // max 50
  externalMarks: number; // max 50
}

export default function ExamsPage() {
  const { studentList, subjects, showToast } = useDepartment();

  const [activeExamTab, setActiveExamTab] = useState("CIE-1");
  const [selectedSubject, setSelectedSubject] = useState("CS501");

  // Initial marks state
  const [marksData, setMarksData] = useState<Record<string, { internal: number; external: number }>>(() => {
    const initial: Record<string, { internal: number; external: number }> = {};
    studentList.forEach((s, idx) => {
      // realistic scores based on CGPA
      const base = Math.min(48, Math.max(22, Math.round(s.cgpa * 4.9)));
      initial[s.id] = {
        internal: base,
        external: Math.min(50, base + (idx % 3 === 0 ? 2 : -2)),
      };
    });
    return initial;
  });

  const handleMarkChange = (studentId: string, type: "internal" | "external", value: number) => {
    const clamped = Math.min(50, Math.max(0, value));
    setMarksData((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [type]: clamped,
      },
    }));
  };

  const calculateGrade = (total: number) => {
    if (total >= 90) return { grade: "O", points: 10, desc: "Outstanding" };
    if (total >= 80) return { grade: "A+", points: 9, desc: "Excellent" };
    if (total >= 70) return { grade: "A", points: 8, desc: "Very Good" };
    if (total >= 60) return { grade: "B+", points: 7, desc: "Good" };
    if (total >= 50) return { grade: "B", points: 6, desc: "Above Avg" };
    if (total >= 40) return { grade: "C", points: 5, desc: "Pass" };
    return { grade: "F", points: 0, desc: "Fail" };
  };

  const classStudents = studentList.filter((s) => s.semester === 5 && s.section === "A");

  const results = classStudents.map((s) => {
    const m = marksData[s.id] || { internal: 40, external: 40 };
    const total = m.internal + m.external;
    const gradeInfo = calculateGrade(total);
    return {
      student: s,
      internal: m.internal,
      external: m.external,
      total,
      percentage: total,
      ...gradeInfo,
    };
  });

  const passCount = results.filter((r) => r.grade !== "F").length;
  const passPercent = results.length > 0 ? Math.round((passCount / results.length) * 100) : 100;
  const avgScore = results.length > 0 ? (results.reduce((acc, r) => acc + r.total, 0) / results.length).toFixed(1) : "0";

  const handleSaveMarks = () => {
    showToast("Marks Published", `Updated marks evaluation for ${selectedSubject} (${activeExamTab}).`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Examinations & Grade Ledger</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Internal evaluations (CIE), lab practicals, semester end grading, and SGPA calculation.
          </p>
        </div>

        <button
          onClick={handleSaveMarks}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-sm transition"
        >
          <FileCheck className="w-4 h-4" />
          <span>Publish Evaluated Marks</span>
        </button>
      </div>

      {/* Analytics Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-subtle">
          <span className="text-[11px] font-medium text-slate-400">Class Pass Rate</span>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{passPercent}%</p>
          <span className="text-[10px] text-slate-400">0 Fails in selected subject</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-subtle">
          <span className="text-[11px] font-medium text-slate-400">Class Average Score</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">{avgScore} / 100</p>
          <span className="text-[10px] text-indigo-600 font-semibold">Grade A Average</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-subtle">
          <span className="text-[11px] font-medium text-slate-400">Highest Score</span>
          <p className="text-2xl font-bold text-indigo-600 mt-1">98 / 100</p>
          <span className="text-[10px] text-slate-400">Ananya Patel (1NT23CS002)</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-subtle">
          <span className="text-[11px] font-medium text-slate-400">Evaluation Status</span>
          <p className="text-2xl font-bold text-emerald-600 mt-1">Verified</p>
          <span className="text-[10px] text-slate-400">Faculty moderation complete</span>
        </div>
      </div>

      {/* Exam Tabs & Course Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-subtle">
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "CIE-1", label: "CIE-1 (Internal 1)" },
            { id: "CIE-2", label: "CIE-2 (Internal 2)" },
            { id: "LAB", label: "Lab Practical Exam" },
            { id: "SEE", label: "Semester End Exam (SEE)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveExamTab(tab.id)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition ${
                activeExamTab === tab.id
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Course:</span>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-3 py-1.5 text-xs font-bold bg-slate-100 border border-slate-200 rounded-xl outline-none"
          >
            {subjects.map((s) => (
              <option key={s.id} value={s.code}>
                {s.code}: {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Marks Entry & Grade Ledger Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200/70 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">USN</th>
                <th className="py-3 px-4">Internal Marks (Max 50)</th>
                <th className="py-3 px-4">External Marks (Max 50)</th>
                <th className="py-3 px-4">Aggregate Total</th>
                <th className="py-3 px-4">Grade</th>
                <th className="py-3 px-4">Result Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {results.map((r) => (
                <tr key={r.student.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <img src={r.student.avatar} alt={r.student.name} className="w-8 h-8 rounded-xl object-cover" />
                      <div>
                        <p className="font-bold text-slate-900">{r.student.name}</p>
                        <p className="text-[10px] text-slate-400">Sem {r.student.semester} • Sec {r.student.section}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4 font-mono font-semibold text-slate-700">{r.student.usn}</td>

                  {/* Editable Internal Marks */}
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      min={0}
                      max={50}
                      value={r.internal}
                      onChange={(e) => handleMarkChange(r.student.id, "internal", Number(e.target.value))}
                      className="w-20 px-2.5 py-1 text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </td>

                  {/* Editable External Marks */}
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      min={0}
                      max={50}
                      value={r.external}
                      onChange={(e) => handleMarkChange(r.student.id, "external", Number(e.target.value))}
                      className="w-20 px-2.5 py-1 text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </td>

                  {/* Aggregate Total */}
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900 text-sm">{r.total}</span>
                    <span className="text-[10px] text-slate-400 ml-1">/ 100</span>
                  </td>

                  {/* Grade Pill */}
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getGradeBadge(r.grade)}`}>
                      {r.grade}
                    </span>
                    <span className="text-[10px] text-slate-400 ml-1.5 font-medium">{r.desc}</span>
                  </td>

                  {/* Pass/Fail */}
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        r.grade !== "F"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}
                    >
                      {r.grade !== "F" ? "Pass" : "Fail"}
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
