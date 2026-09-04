"use client";

import React, { useState } from "react";
import {
  UserCheck,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Search,
  Plus,
  X,
} from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";

export default function MentoringPage() {
  const { mentoring, addMentoringNote, showToast } = useDepartment();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMentee, setSelectedMentee] = useState<typeof mentoring[0] | null>(null);
  const [noteText, setNoteText] = useState("");

  const filteredMentees = mentoring.filter(
    (m) =>
      m.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.usn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMentee || !noteText.trim()) return;
    addMentoringNote(selectedMentee.id, noteText);
    setSelectedMentee(null);
    setNoteText("");
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Header */}
      <div className="p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Student Mentoring &amp; Academic Counseling
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Mentorship Program
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Assigned student mentees, academic risk monitoring (&lt;75% attendance, backlogs) &amp; counseling intervention logs
          </p>
        </div>
      </div>

      {/* Main Mentee Table */}
      <div className="p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by mentee name or USN..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-full outline-none focus:ring-2 focus:ring-[#005f73]/20"
            />
          </div>
          <span className="text-xs font-bold text-slate-500">
            {filteredMentees.length} Mentees Assigned
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px] font-extrabold">
                <th className="pb-3 font-extrabold">Student Mentee</th>
                <th className="pb-3 font-extrabold">USN</th>
                <th className="pb-3 font-extrabold">Sem / Sec</th>
                <th className="pb-3 font-extrabold text-center">Attendance</th>
                <th className="pb-3 font-extrabold text-center">CGPA</th>
                <th className="pb-3 font-extrabold text-center">Backlogs</th>
                <th className="pb-3 font-extrabold">Risk Level</th>
                <th className="pb-3 font-extrabold">Counseling Notes</th>
                <th className="pb-3 font-extrabold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredMentees.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 font-bold text-slate-900">{m.studentName}</td>
                  <td className="py-3 font-mono font-bold text-slate-700">{m.usn}</td>
                  <td className="py-3 text-slate-600">Sem {m.semester} ({m.section})</td>
                  <td className={`py-3 text-center font-black ${m.attendance < 75 ? "text-rose-600" : "text-emerald-700"}`}>
                    {m.attendance}%
                  </td>
                  <td className="py-3 text-center font-bold text-slate-900">{m.cgpa}</td>
                  <td className="py-3 text-center font-bold text-slate-700">{m.backlogs}</td>
                  <td className="py-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        m.riskLevel === "High"
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : m.riskLevel === "Moderate"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      }`}
                    >
                      {m.riskLevel} Risk
                    </span>
                  </td>
                  <td className="py-3 text-slate-600 max-w-xs truncate" title={m.notes}>
                    {m.notes}
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => {
                        setSelectedMentee(m);
                        setNoteText(m.notes);
                      }}
                      className="px-3 py-1 rounded-full bg-[#005f73] hover:bg-[#004e5f] text-white text-[11px] font-bold transition"
                    >
                      Log Session
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Counseling Session Modal */}
      {selectedMentee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fade-in">
          <div className="fixed inset-0" onClick={() => setSelectedMentee(null)} />
          <div className="relative w-full max-w-lg bg-white rounded-[26px] shadow-2xl border border-slate-200 overflow-hidden z-10">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">
                  Log Mentoring Session: {selectedMentee.studentName}
                </h3>
                <p className="text-xs text-slate-400 font-medium">USN: {selectedMentee.usn} • Sem {selectedMentee.semester} ({selectedMentee.section})</p>
              </div>
              <button onClick={() => setSelectedMentee(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNote} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Session Counseling Notes &amp; Action Plan</label>
                <textarea
                  required
                  rows={4}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Record mentoring discussion, academic remedy advice, and follow-up targets..."
                  className="w-full p-3.5 border rounded-2xl outline-none focus:ring-2 focus:ring-[#005f73]/20"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setSelectedMentee(null)}
                  className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#005f73] hover:bg-[#004e5f] text-white font-bold"
                >
                  Save Mentoring Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
