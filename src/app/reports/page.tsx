"use client";

import React, { useState } from "react";
import {
  BarChart3,
  Download,
  Printer,
  FileSpreadsheet,
  Filter,
  Calendar,
  CheckCircle,
  FileText,
  Sparkles,
} from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";

export default function ReportsPage() {
  const { studentList, facultyList, department, showToast } = useDepartment();

  const [selectedReport, setSelectedReport] = useState("attendance");
  const [selectedSem, setSelectedSem] = useState("5");

  const reports = [
    { id: "attendance", name: "Student Attendance Register", desc: "Detailed percentage, shortage warning list & daily records" },
    { id: "workload", name: "Faculty Workload & Punctuality", desc: "Teaching hours per week, subjects assigned, and attendance rate" },
    { id: "results", name: "Continuous Evaluation Marks (CIE)", desc: "Internal marks distribution, SGPA projection & backlogs audit" },
    { id: "placements", name: "Campus Placement Milestone", desc: "Company offers, package distribution & unplaced students" },
  ];

  const handleExport = (type: string) => {
    showToast("Report Generated", `Exported ${selectedReport.toUpperCase()} report as ${type}.`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Academic & HRMS Reports</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit-ready reports for AICTE, NBA Accreditation, Department Advisory Board, and Dean Office.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExport("CSV")}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 transition shadow-subtle"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Select Report Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reports.map((rep) => (
          <div
            key={rep.id}
            onClick={() => setSelectedReport(rep.id)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              selectedReport === rep.id
                ? "bg-indigo-50/70 border-indigo-300 ring-2 ring-indigo-500/20 shadow-sm"
                : "bg-white border-slate-200/80 hover:bg-slate-50 shadow-subtle"
            }`}
          >
            <div className="flex items-center justify-between">
              <FileSpreadsheet className={`w-5 h-5 ${selectedReport === rep.id ? "text-indigo-600" : "text-slate-400"}`} />
              {selectedReport === rep.id && (
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
              )}
            </div>
            <h3 className="font-bold text-xs text-slate-900 mt-3">{rep.name}</h3>
            <p className="text-[11px] text-slate-500 mt-1">{rep.desc}</p>
          </div>
        ))}
      </div>

      {/* Filter Row */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-subtle flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-600">Report Scope:</span>
          <select
            value={selectedSem}
            onChange={(e) => setSelectedSem(e.target.value)}
            className="px-3 py-1.5 font-bold bg-slate-100 rounded-xl outline-none"
          >
            <option value="All">All Semesters</option>
            <option value="3">3rd Semester B.Tech</option>
            <option value="5">5th Semester B.Tech</option>
            <option value="7">7th Semester B.Tech</option>
          </select>
        </div>

        <div className="text-slate-400 text-[11px]">
          Academic Year: <strong>2026-27</strong> • Department of CSE • Generated on {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Report Preview Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-subtle overflow-hidden p-6 print:p-0 print:border-none">
        {/* Printable Header */}
        <div className="text-center pb-6 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide">
            National Institute of Technology (NIT)
          </h2>
          <p className="text-xs font-semibold text-slate-600">Department of Computer Science & Engineering</p>
          <p className="text-xs text-indigo-600 font-bold mt-1 uppercase">
            {reports.find((r) => r.id === selectedReport)?.name}
          </p>
        </div>

        {/* Dynamic Table Body depending on report type */}
        <div className="mt-6 overflow-x-auto">
          {selectedReport === "attendance" && (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3">USN</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Semester</th>
                  <th className="p-3">Section</th>
                  <th className="p-3">Classes Held</th>
                  <th className="p-3">Attended</th>
                  <th className="p-3">Percentage</th>
                  <th className="p-3">Compliance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {studentList.map((s) => (
                  <tr key={s.id}>
                    <td className="p-3 font-mono font-bold text-slate-700">{s.usn}</td>
                    <td className="p-3 font-semibold text-slate-900">{s.name}</td>
                    <td className="p-3">Sem {s.semester}</td>
                    <td className="p-3">Sec {s.section}</td>
                    <td className="p-3">120</td>
                    <td className="p-3">{Math.round((120 * s.attendanceRate) / 100)}</td>
                    <td className="p-3 font-bold">{s.attendanceRate}%</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${s.attendanceRate >= 75 ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                        {s.attendanceRate >= 75 ? "Eligible" : "Shortage Warning"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {selectedReport === "workload" && (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Emp ID</th>
                  <th className="p-3">Faculty Name</th>
                  <th className="p-3">Designation</th>
                  <th className="p-3">Courses Assigned</th>
                  <th className="p-3">Weekly Hours</th>
                  <th className="p-3">Punctuality Rate</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {facultyList.map((f) => (
                  <tr key={f.id}>
                    <td className="p-3 font-mono text-slate-700">{f.empId}</td>
                    <td className="p-3 font-semibold text-slate-900">{f.name}</td>
                    <td className="p-3">{f.designation}</td>
                    <td className="p-3">{f.subjects.join(", ") || "Department Core"}</td>
                    <td className="p-3 font-bold">16 Hours / Week</td>
                    <td className="p-3 text-emerald-600 font-bold">{f.attendanceRate}%</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                        {f.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {(selectedReport === "results" || selectedReport === "placements") && (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3">USN</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">CGPA</th>
                  <th className="p-3">Placement Company</th>
                  <th className="p-3">Package (CTC)</th>
                  <th className="p-3">Result Standing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {studentList.map((s) => (
                  <tr key={s.id}>
                    <td className="p-3 font-mono font-bold text-slate-700">{s.usn}</td>
                    <td className="p-3 font-semibold text-slate-900">{s.name}</td>
                    <td className="p-3 font-bold">{s.cgpa.toFixed(2)}</td>
                    <td className="p-3 font-medium text-indigo-600">{s.placedCompany || "Eligible"}</td>
                    <td className="p-3 font-bold text-slate-800">{s.placedPackage ? `₹${s.placedPackage} LPA` : "-"}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                        First Class Distinction
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
