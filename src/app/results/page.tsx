"use client";

import React, { useState } from "react";
import {
  Award,
  Download,
  CheckCircle2,
  TrendingUp,
  FileText,
  Calendar,
  Layers,
  Search,
} from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";

export default function ResultsPage() {
  const { results, currentRole, showToast } = useDepartment();
  const [selectedSemester, setSelectedSemester] = useState<number>(4);

  const totalCredits = results.reduce((acc, r) => acc + r.credits, 0);
  const totalGradePoints = results.reduce((acc, r) => acc + r.gradePoints * r.credits, 0);
  const sgpa = (totalGradePoints / totalCredits).toFixed(2);

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Header */}
      <div className="p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Academic Results &amp; Marks Ledger
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Controller of Examinations
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Official semester grade sheets, Continuous Internal Evaluation (CIE) &amp; Semester End Exam (SEE) breakdown
          </p>
        </div>

        <button
          onClick={() => showToast("Marksheet Downloaded", "Official grade sheet PDF generated.")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#005f73] hover:bg-[#004e5f] text-white text-xs font-extrabold transition shadow-sm self-start md:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Download Official Marksheet</span>
        </button>
      </div>

      {/* SGPA / CGPA Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">SEMESTER SGPA</span>
          <p className="text-3xl font-black text-slate-950 mt-1">{sgpa}</p>
          <span className="text-[11px] text-emerald-600 font-bold">First Class with Distinction</span>
        </div>

        <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">CUMULATIVE CGPA</span>
          <p className="text-3xl font-black text-slate-950 mt-1">8.92</p>
          <span className="text-[11px] text-indigo-600 font-bold">Semesters 1 through 4</span>
        </div>

        <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">CREDITS EARNED</span>
          <p className="text-3xl font-black text-slate-950 mt-1">{totalCredits}</p>
          <span className="text-[11px] text-slate-500 font-bold">100% Cleared</span>
        </div>

        <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">ACTIVE BACKLOGS</span>
          <p className="text-3xl font-black text-emerald-600 mt-1">0</p>
          <span className="text-[11px] text-emerald-600 font-bold">All Courses Cleared</span>
        </div>
      </div>

      {/* Results Table */}
      <div className="p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-black text-slate-950 tracking-tight">
              Semester {selectedSemester} Course Grade Ledger
            </h2>
            <p className="text-xs text-slate-400 font-medium">Internal CIE, External SEE, Total Score &amp; Grade Points</p>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold">
            {[1, 2, 3, 4].map((sem) => (
              <button
                key={sem}
                onClick={() => setSelectedSemester(sem)}
                className={`px-3 py-1.5 rounded-full transition ${
                  selectedSemester === sem
                    ? "bg-slate-950 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Sem {sem}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px] font-extrabold">
                <th className="pb-3 font-extrabold">Course Code</th>
                <th className="pb-3 font-extrabold">Course Title</th>
                <th className="pb-3 font-extrabold text-center">Credits</th>
                <th className="pb-3 font-extrabold text-center">CIE (50)</th>
                <th className="pb-3 font-extrabold text-center">SEE (50)</th>
                <th className="pb-3 font-extrabold text-center">Total (100)</th>
                <th className="pb-3 font-extrabold text-center">Grade</th>
                <th className="pb-3 font-extrabold text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {results.map((res) => (
                <tr key={res.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 font-mono font-bold text-slate-700">{res.subjectCode}</td>
                  <td className="py-3 font-bold text-slate-900">{res.subjectName}</td>
                  <td className="py-3 text-center text-slate-600 font-bold">{res.credits}</td>
                  <td className="py-3 text-center text-slate-700 font-bold">{res.cieMarks}</td>
                  <td className="py-3 text-center text-slate-700 font-bold">{res.seeMarks}</td>
                  <td className="py-3 text-center font-black text-slate-950">{res.totalMarks}</td>
                  <td className="py-3 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        res.grade === "S"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}
                    >
                      Grade {res.grade}
                    </span>
                  </td>
                  <td className="py-3 text-right font-black text-slate-950">{res.gradePoints} / 10</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
