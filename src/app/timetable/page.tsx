"use client";

import React, { useState } from "react";
import {
  CalendarDays,
  Clock,
  Plus,
  Trash2,
  AlertTriangle,
  Building,
  User,
  BookOpen,
  Filter,
  X,
  CheckCircle,
} from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";
import { TimetableEntry } from "@/lib/data/cse-demo-data";

export default function TimetablePage() {
  const { timetable, addTimetableSlot, deleteTimetableSlot, subjects, facultyList, showToast } =
    useDepartment();

  const [selectedSemester, setSelectedSemester] = useState<number>(5);
  const [selectedSection, setSelectedSection] = useState<string>("A");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [conflictError, setConflictError] = useState<string | null>(null);

  // Form for adding slot
  const [formData, setFormData] = useState({
    day: "Monday" as TimetableEntry["day"],
    period: 1,
    timeSlot: "09:00 AM - 10:00 AM",
    subjectCode: "CS501",
    subjectName: "Database Management Systems",
    facultyName: "Dr. Priya Sharma",
    room: "CS-201",
    semester: 5,
    section: "A" as "A" | "B" | "C",
    type: "Lecture" as "Lecture" | "Lab" | "Tutorial",
  });

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;
  const periods = [
    { num: 1, time: "09:00 AM - 10:00 AM" },
    { num: 2, time: "10:00 AM - 11:00 AM" },
    { num: 3, time: "11:15 AM - 12:15 PM" },
    { num: 4, time: "01:15 PM - 02:15 PM" },
    { num: 5, time: "02:15 PM - 04:15 PM" },
  ];

  // Filter slots for current semester & section
  const currentSlots = timetable.filter(
    (t) => t.semester === selectedSemester && t.section === selectedSection
  );

  const getSlot = (day: string, periodNum: number) => {
    return currentSlots.find((s) => s.day === day && s.period === periodNum);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConflictError(null);

    const res = addTimetableSlot({
      ...formData,
      semester: selectedSemester,
      section: selectedSection as "A" | "B" | "C",
    });

    if (!res.success) {
      setConflictError(res.conflict || "Conflict detected in schedule.");
      showToast("Scheduling Conflict", res.conflict || "Conflict occurred", "error");
    } else {
      setIsAddModalOpen(false);
      setConflictError(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Academic Timetable Matrix</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Classroom schedules, lab allocations, and real-time room conflict detection.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Timetable Slot</span>
        </button>
      </div>

      {/* Filter Row: Semester & Section Selection */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-subtle">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-500">Semester:</span>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(Number(e.target.value))}
              className="px-3 py-1.5 text-xs font-bold bg-slate-100 rounded-xl outline-none"
            >
              {[1, 3, 5, 7].map((s) => (
                <option key={s} value={s}>
                  Sem {s} (B.Tech)
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {["A", "B", "C"].map((sec) => (
              <button
                key={sec}
                onClick={() => setSelectedSection(sec)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                  selectedSection === sec
                    ? "bg-white text-indigo-600 shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Section {sec}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Lecture
          </span>
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Practical / Lab
          </span>
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Tutorial
          </span>
        </div>
      </div>

      {/* Weekly Matrix Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                <th className="py-3 px-4 w-28 border-r border-slate-200">Day / Period</th>
                {periods.map((p) => (
                  <th key={p.num} className="py-3 px-4 min-w-[170px] border-r border-slate-200 last:border-r-0">
                    <div>Period {p.num}</div>
                    <div className="text-[10px] text-slate-400 font-normal mt-0.5">{p.time}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {days.map((day) => (
                <tr key={day} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-800 border-r border-slate-200 bg-slate-50/40">
                    {day}
                  </td>
                  {periods.map((p) => {
                    const slot = getSlot(day, p.num);
                    if (!slot) {
                      return (
                        <td
                          key={p.num}
                          className="py-3 px-3 border-r border-slate-100 last:border-r-0 text-slate-300 text-center"
                        >
                          <span className="text-[11px] font-mono">- Free -</span>
                        </td>
                      );
                    }

                    const typeStyles = {
                      Lecture: "bg-indigo-50/80 border-indigo-200 text-indigo-900",
                      Lab: "bg-emerald-50/80 border-emerald-200 text-emerald-900",
                      Tutorial: "bg-amber-50/80 border-amber-200 text-amber-900",
                    }[slot.type];

                    return (
                      <td
                        key={p.num}
                        className="p-2 border-r border-slate-100 last:border-r-0 align-top"
                      >
                        <div
                          className={`p-2.5 rounded-xl border shadow-subtle group relative transition ${typeStyles}`}
                        >
                          <div className="flex items-start justify-between gap-1">
                            <span className="font-bold text-xs">{slot.subjectCode}</span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded font-semibold bg-white/70">
                              {slot.room}
                            </span>
                          </div>
                          <p className="text-[11px] font-medium truncate mt-0.5">{slot.subjectName}</p>
                          <p className="text-[10px] opacity-75 mt-1 truncate">{slot.facultyName}</p>

                          <button
                            onClick={() => deleteTimetableSlot(slot.id)}
                            className="absolute top-1.5 right-1.5 p-1 rounded-md bg-white/80 text-rose-600 hover:bg-rose-50 opacity-0 group-hover:opacity-100 transition"
                            title="Delete Slot"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Slot Modal with Real-time Conflict Checking */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="fixed inset-0" onClick={() => setIsAddModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900">Schedule Class Slot</h3>
                <p className="text-xs text-slate-500">
                  Assign subject, faculty and room for Sem {selectedSemester} ({selectedSection})
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {conflictError && (
              <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-start gap-2 text-xs">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="font-medium">{conflictError}</p>
              </div>
            )}

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Day of Week</label>
                  <select
                    value={formData.day}
                    onChange={(e) => setFormData({ ...formData, day: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-xl outline-none bg-white"
                  >
                    {days.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Period & Time</label>
                  <select
                    value={formData.period}
                    onChange={(e) => {
                      const pNum = Number(e.target.value);
                      const pTime = periods.find((p) => p.num === pNum)?.time || "09:00 AM - 10:00 AM";
                      setFormData({ ...formData, period: pNum, timeSlot: pTime });
                    }}
                    className="w-full px-3 py-2 border rounded-xl outline-none bg-white"
                  >
                    {periods.map((p) => (
                      <option key={p.num} value={p.num}>
                        Period {p.num} ({p.time})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Subject</label>
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
                    <option key={s.id} value={s.code}>
                      {s.code}: {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Faculty In-Charge</label>
                  <select
                    value={formData.facultyName}
                    onChange={(e) => setFormData({ ...formData, facultyName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl outline-none bg-white"
                  >
                    {facultyList.map((f) => (
                      <option key={f.id} value={f.name}>{f.name} ({f.designation})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Room / Lab</label>
                  <select
                    value={formData.room}
                    onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl outline-none bg-white"
                  >
                    <option value="CS-201">Classroom CS-201</option>
                    <option value="CS-202">Classroom CS-202</option>
                    <option value="CS-203">Classroom CS-203</option>
                    <option value="Lab-1">Computing Lab 1</option>
                    <option value="Lab-2">Systems Lab 2</option>
                    <option value="Lab-3">Networks Lab 3</option>
                    <option value="Seminar Hall">Visvesvaraya Hall</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Slot Category</label>
                <div className="flex items-center gap-3">
                  {(["Lecture", "Lab", "Tutorial"] as const).map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="slotType"
                        checked={formData.type === type}
                        onChange={() => setFormData({ ...formData, type })}
                        className="text-indigo-600"
                      />
                      <span className="text-slate-700 font-medium">{type}</span>
                    </label>
                  ))}
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
                  Schedule Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
