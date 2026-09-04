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
  Printer,
  FileDown,
  CheckCircle,
  GraduationCap,
  Sparkles,
  Layers,
} from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";
import { TimetableEntry } from "@/lib/data/cse-demo-data";

export default function TimetablePage() {
  const { timetable, addTimetableSlot, deleteTimetableSlot, subjects, facultyList, showToast } =
    useDepartment();

  const [activeViewMode, setActiveViewMode] = useState<"official" | "interactive">("official");
  const [selectedSemester, setSelectedSemester] = useState<number>(6);
  const [selectedSection, setSelectedSection] = useState<string>("A");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [conflictError, setConflictError] = useState<string | null>(null);

  // Form for adding slot
  const [formData, setFormData] = useState({
    day: "Monday" as TimetableEntry["day"],
    period: 1,
    timeSlot: "09:00 AM - 09:50 AM",
    subjectCode: "18CS63",
    subjectName: "WT (Web Technology)",
    facultyName: "Prof. Shazia",
    room: "CS-201",
    semester: 6,
    section: "A" as "A" | "B" | "C",
    type: "Lecture" as "Lecture" | "Lab" | "Tutorial",
  });

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;
  const periods = [
    { num: 1, time: "09:00 AM - 09:50 AM", label: "09.00AM-09.50AM" },
    { num: 2, time: "09:50 AM - 10:40 AM", label: "09.50AM-10.40AM" },
    { num: 3, time: "11:00 AM - 11:50 AM", label: "11.00AM-11.50AM" },
    { num: 4, time: "11:50 AM - 12:40 PM", label: "11.50AM-12.40PM" },
    { num: 5, time: "01:40 PM - 02:30 PM", label: "01.40PM-02.30PM" },
    { num: 6, time: "02:30 PM - 03:20 PM", label: "02.30PM-03.20PM" },
    { num: 7, time: "03:40 PM - 04:30 PM", label: "03.40PM-04.30PM" },
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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Header with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Department Timetable Matrix
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#005f73]/10 text-[#005f73] border border-[#005f73]/20">
              Even Semester 2021-2022
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Navodaya Institute of Technology Raichur • Department of Computer Science & Engineering (W.E.F: 04/04/2022)
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition shadow-xs"
            title="Print Official Timetable"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Matrix</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#005f73] hover:bg-[#004e5f] text-white text-xs font-bold rounded-xl shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Class Slot</span>
          </button>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
        <button
          onClick={() => setActiveViewMode("official")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition ${
            activeViewMode === "official"
              ? "bg-white text-slate-950 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Building className="w-3.5 h-3.5 text-[#005f73]" />
          <span>NIT Official Master Document (Sem 6 & 8)</span>
        </button>

        <button
          onClick={() => setActiveViewMode("interactive")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition ${
            activeViewMode === "interactive"
              ? "bg-white text-slate-950 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-[#005f73]" />
          <span>Interactive Class Scheduler</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: NIT RAICHUR OFFICIAL MASTER DOCUMENT (EXACT IMAGE 2 REPLICA)      */}
      {/* ========================================================================= */}
      {activeViewMode === "official" && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 lg:p-8 space-y-6 text-slate-900 print:border-none print:shadow-none print:p-0">
          {/* Official Institution Header matching image 2 */}
          <div className="text-center border-b-2 border-slate-900 pb-4 relative">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white font-black flex items-center justify-center text-xl shadow-sm">
                N
              </div>
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-950 font-serif">
                  Navodaya Institute of Technology
                </h2>
                <p className="text-[10px] text-slate-600 font-medium">
                  Approved by AICTE Delhi | Affiliated to VTU Belagavi | Accredited with NAAC &apos;A&apos; Grade
                </p>
                <p className="text-[9px] text-slate-500">
                  Recognized by UGC U/s 2(f) | An ISO 9001:2015 Certified Institution
                </p>
                <p className="text-[9px] text-slate-500">
                  Mantralayam Road, Navodaya Nagar, Raichur, Karnataka - 584 103
                </p>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs font-bold uppercase">
              <span className="text-slate-800 tracking-wider">
                DEPARTMENT OF COMPUTER SCIENCE &amp; ENGINEERING
              </span>
              <span className="text-[#005f73]">
                TIME TABLE FOR EVEN SEMESTER 2021-2022 • W.E.F: 04/04/2022
              </span>
            </div>
          </div>

          {/* Master Timetable Grid matching image 2 exactly */}
          <div className="overflow-x-auto">
            <table className="w-full text-center text-xs border-2 border-slate-900 border-collapse">
              <thead>
                <tr className="bg-slate-100 font-bold border-b-2 border-slate-900 text-[11px]">
                  <th className="py-2.5 px-3 border border-slate-900 w-24">DAY</th>
                  <th className="py-2.5 px-2 border border-slate-900 w-12">SEM</th>
                  <th className="py-2.5 px-2 border border-slate-900 min-w-[85px]">09.00AM-09.50AM</th>
                  <th className="py-2.5 px-2 border border-slate-900 min-w-[85px]">09.50AM-10.40AM</th>
                  <th className="py-2.5 px-1 border border-slate-900 bg-amber-50/70 text-[9px] w-12 font-extrabold rotate-0">
                    SHORT BREAK<br /><span className="font-normal text-[8px]">(10.40-11.00)</span>
                  </th>
                  <th className="py-2.5 px-2 border border-slate-900 min-w-[85px]">11.00AM-11.50AM</th>
                  <th className="py-2.5 px-2 border border-slate-900 min-w-[85px]">11.50AM-12.40PM</th>
                  <th className="py-2.5 px-1 border border-slate-900 bg-emerald-50/70 text-[9px] w-12 font-extrabold rotate-0">
                    LUNCH BREAK<br /><span className="font-normal text-[8px]">(12.40-01.40)</span>
                  </th>
                  <th className="py-2.5 px-2 border border-slate-900 min-w-[85px]">01.40PM-02.30PM</th>
                  <th className="py-2.5 px-2 border border-slate-900 min-w-[85px]">02.30PM-03.20PM</th>
                  <th className="py-2.5 px-1 border border-slate-900 bg-amber-50/70 text-[9px] w-12 font-extrabold rotate-0">
                    SHORT BREAK<br /><span className="font-normal text-[8px]">(03.20-03.40)</span>
                  </th>
                  <th className="py-2.5 px-2 border border-slate-900 min-w-[85px]">03.40PM-04.30PM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900 font-semibold text-[11px]">
                {/* MONDAY */}
                <tr>
                  <td rowSpan={2} className="py-4 px-3 font-black uppercase tracking-wider bg-slate-50 border border-slate-900">
                    MONDAY
                  </td>
                  <td className="py-2.5 border border-slate-900 font-bold bg-indigo-50/40">6</td>
                  <td className="p-2 border border-slate-900 font-bold">WT</td>
                  <td className="p-2 border border-slate-900 font-bold">SSWCD</td>
                  <td rowSpan={12} className="border border-slate-900 bg-amber-50/50 text-[9px] font-bold text-slate-500 writing-vertical p-1">
                    SHORT BREAK (10.40AM - 11.00AM)
                  </td>
                  <td className="p-2 border border-slate-900 font-bold">APTITUDE</td>
                  <td className="p-2 border border-slate-900 font-bold">CG</td>
                  <td rowSpan={12} className="border border-slate-900 bg-emerald-50/50 text-[9px] font-bold text-slate-500 writing-vertical p-1">
                    LUNCH BREAK (12.40PM - 01.40PM)
                  </td>
                  <td className="p-2 border border-slate-900 font-bold">JAVA &amp; J2EE</td>
                  <td className="p-2 border border-slate-900 font-bold">CG</td>
                  <td rowSpan={12} className="border border-slate-900 bg-amber-50/50 text-[9px] font-bold text-slate-500 writing-vertical p-1">
                    SHORT BREAK (03.20PM - 03.40PM)
                  </td>
                  <td className="p-2 border border-slate-900 font-bold bg-rose-50/30">SPORTS</td>
                </tr>
                <tr className="border-b-2 border-slate-900">
                  <td className="py-2.5 border border-slate-900 font-bold bg-teal-50/40">8</td>
                  <td className="p-2 border border-slate-900 font-bold">IOT</td>
                  <td className="p-2 border border-slate-900 font-bold">NSD</td>
                  <td colSpan={2} className="p-2 border border-slate-900 bg-indigo-50/60 font-bold text-indigo-900">
                    &lt;------ SEMINAR ------&gt;
                  </td>
                  <td colSpan={2} className="p-2 border border-slate-900 bg-purple-50/60 font-bold text-purple-900">
                    &lt;--- PROJECT WORK ---&gt;
                  </td>
                  <td className="p-2 border border-slate-900 bg-purple-50/60 font-bold text-purple-900">
                    ------&gt;
                  </td>
                </tr>

                {/* TUESDAY */}
                <tr>
                  <td rowSpan={2} className="py-4 px-3 font-black uppercase tracking-wider bg-slate-50 border border-slate-900">
                    TUESDAY
                  </td>
                  <td className="py-2.5 border border-slate-900 font-bold bg-indigo-50/40">6</td>
                  <td className="p-2 border border-slate-900 font-bold">18CVXXX</td>
                  <td className="p-2 border border-slate-900 font-bold">WT</td>
                  <td className="p-2 border border-slate-900 font-bold">JAVA &amp; J2EE</td>
                  <td className="p-2 border border-slate-900 font-bold">CG(T)</td>
                  <td className="p-2 border border-slate-900 font-bold">SSWCD(T)</td>
                  <td className="p-2 border border-slate-900 font-bold">18CVXXX</td>
                  <td className="p-2 border border-slate-900 font-bold bg-amber-50/30">LIBRARY</td>
                </tr>
                <tr className="border-b-2 border-slate-900">
                  <td className="py-2.5 border border-slate-900 font-bold bg-teal-50/40">8</td>
                  <td className="p-2 border border-slate-900 font-bold">NSD</td>
                  <td className="p-2 border border-slate-900 font-bold">IOT</td>
                  <td colSpan={2} className="p-2 border border-slate-900 bg-emerald-50/60 font-bold text-emerald-900">
                    &lt;------ APTITUDE ------&gt;
                  </td>
                  <td colSpan={2} className="p-2 border border-slate-900 bg-purple-50/60 font-bold text-purple-900">
                    &lt;--- PROJECT WORK ---&gt;
                  </td>
                  <td className="p-2 border border-slate-900 bg-purple-50/60 font-bold text-purple-900">
                    ------&gt;
                  </td>
                </tr>

                {/* WEDNESDAY */}
                <tr>
                  <td rowSpan={2} className="py-4 px-3 font-black uppercase tracking-wider bg-slate-50 border border-slate-900">
                    WEDNESDAY
                  </td>
                  <td className="py-2.5 border border-slate-900 font-bold bg-indigo-50/40">6</td>
                  <td className="p-2 border border-slate-900 font-bold">JAVA &amp; J2EE</td>
                  <td className="p-2 border border-slate-900 font-bold">SSWCD</td>
                  <td className="p-2 border border-slate-900 font-bold">CG</td>
                  <td className="p-2 border border-slate-900 font-bold">PC</td>
                  <td colSpan={2} className="p-2 border border-slate-900 bg-cyan-50/70 font-bold text-cyan-950">
                    &lt;--- MAD(B1) / CG(B2) LAB ---&gt;
                  </td>
                  <td className="p-2 border border-slate-900 bg-cyan-50/70 font-bold text-cyan-950">
                    ------&gt;
                  </td>
                </tr>
                <tr className="border-b-2 border-slate-900">
                  <td className="py-2.5 border border-slate-900 font-bold bg-teal-50/40">8</td>
                  <td className="p-2 border border-slate-900 font-bold">IOT</td>
                  <td className="p-2 border border-slate-900 font-bold">NSD</td>
                  <td colSpan={2} className="p-2 border border-slate-900 bg-indigo-50/60 font-bold text-indigo-900">
                    &lt;------ SEMINAR ------&gt;
                  </td>
                  <td colSpan={2} className="p-2 border border-slate-900 bg-purple-50/60 font-bold text-purple-900">
                    &lt;--- PROJECT WORK ---&gt;
                  </td>
                  <td className="p-2 border border-slate-900 bg-purple-50/60 font-bold text-purple-900">
                    ------&gt;
                  </td>
                </tr>

                {/* THURSDAY */}
                <tr>
                  <td rowSpan={2} className="py-4 px-3 font-black uppercase tracking-wider bg-slate-50 border border-slate-900">
                    THURSDAY
                  </td>
                  <td className="py-2.5 border border-slate-900 font-bold bg-indigo-50/40">6</td>
                  <td className="p-2 border border-slate-900 font-bold">WT</td>
                  <td className="p-2 border border-slate-900 font-bold">18CVXXX</td>
                  <td className="p-2 border border-slate-900 font-bold">JAVA &amp; J2EE</td>
                  <td className="p-2 border border-slate-900 font-bold">SSWCD</td>
                  <td colSpan={2} className="p-2 border border-slate-900 bg-cyan-50/70 font-bold text-cyan-950">
                    &lt;--- CG(B1) / SS&amp;OS(B2) LAB ---&gt;
                  </td>
                  <td className="p-2 border border-slate-900 bg-cyan-50/70 font-bold text-cyan-950">
                    ------&gt;
                  </td>
                </tr>
                <tr className="border-b-2 border-slate-900">
                  <td className="py-2.5 border border-slate-900 font-bold bg-teal-50/40">8</td>
                  <td className="p-2 border border-slate-900 font-bold">NSD</td>
                  <td className="p-2 border border-slate-900 font-bold">APTITUDE</td>
                  <td className="p-2 border border-slate-900 font-bold">NSD</td>
                  <td className="p-2 border border-slate-900 font-bold">LIBRARY</td>
                  <td colSpan={2} className="p-2 border border-slate-900 bg-purple-50/60 font-bold text-purple-900">
                    &lt;--- PROJECT WORK ---&gt;
                  </td>
                  <td className="p-2 border border-slate-900 bg-purple-50/60 font-bold text-purple-900">
                    ------&gt;
                  </td>
                </tr>

                {/* FRIDAY */}
                <tr>
                  <td rowSpan={2} className="py-4 px-3 font-black uppercase tracking-wider bg-slate-50 border border-slate-900">
                    FRIDAY
                  </td>
                  <td className="py-2.5 border border-slate-900 font-bold bg-indigo-50/40">6</td>
                  <td className="p-2 border border-slate-900 font-bold">CG</td>
                  <td className="p-2 border border-slate-900 font-bold">18CVXXX</td>
                  <td className="p-2 border border-slate-900 font-bold">SSWCD</td>
                  <td className="p-2 border border-slate-900 font-bold">WT(T)</td>
                  <td colSpan={2} className="p-2 border border-slate-900 bg-cyan-50/70 font-bold text-cyan-950">
                    &lt;--- SS&amp;OS(B1) / MAD(B2) LAB ---&gt;
                  </td>
                  <td className="p-2 border border-slate-900 bg-cyan-50/70 font-bold text-cyan-950">
                    ------&gt;
                  </td>
                </tr>
                <tr className="border-b-2 border-slate-900">
                  <td className="py-2.5 border border-slate-900 font-bold bg-teal-50/40">8</td>
                  <td colSpan={2} className="p-2 border border-slate-900 bg-indigo-50/60 font-bold text-indigo-900">
                    &lt;------ SEMINAR ------&gt;
                  </td>
                  <td className="p-2 border border-slate-900 font-bold">IOT</td>
                  <td className="p-2 border border-slate-900 font-bold">NSD</td>
                  <td colSpan={2} className="p-2 border border-slate-900 bg-purple-50/60 font-bold text-purple-900">
                    &lt;--- PROJECT WORK ---&gt;
                  </td>
                  <td className="p-2 border border-slate-900 bg-purple-50/60 font-bold text-purple-900">
                    ------&gt;
                  </td>
                </tr>

                {/* SATURDAY */}
                <tr>
                  <td rowSpan={2} className="py-4 px-3 font-black uppercase tracking-wider bg-slate-50 border border-slate-900">
                    SATURDAY
                  </td>
                  <td className="py-2.5 border border-slate-900 font-bold bg-indigo-50/40">6</td>
                  <td className="p-2 border border-slate-900 font-bold">SSWCD</td>
                  <td className="p-2 border border-slate-900 font-bold">JAVA &amp; J2EE</td>
                  <td className="p-2 border border-slate-900 font-bold">WT</td>
                  <td className="p-2 border border-slate-900 font-bold">18CVXXX</td>
                  <td colSpan={3} className="p-2 border border-slate-900 bg-slate-100/70 text-slate-400 font-mono text-[10px]">
                    -- Afternoon Departmental Review / Half Day --
                  </td>
                </tr>
                <tr className="border-b-2 border-slate-900">
                  <td className="py-2.5 border border-slate-900 font-bold bg-teal-50/40">8</td>
                  <td className="p-2 border border-slate-900 font-bold">IOT</td>
                  <td colSpan={3} className="p-2 border border-slate-900 bg-indigo-50/60 font-bold text-indigo-900">
                    &lt;---------------- SEMINAR ----------------&gt;
                  </td>
                  <td colSpan={3} className="p-2 border border-slate-900 bg-slate-100/70 text-slate-400 font-mono text-[10px]">
                    -- Major Project Evaluation --
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Subject & Faculty Assignment Grid (Exact bottom part of image 2) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-4 border-t-2 border-slate-900 text-xs">
            {/* 6th Semester Column */}
            <div className="border border-slate-300 rounded-xl overflow-hidden">
              <div className="p-2.5 bg-slate-900 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-between">
                <span>6TH SEMESTER (EVEN SEM 2021-2022)</span>
                <span className="text-amber-300 text-[10px]">CSE SECTION A</span>
              </div>
              <table className="w-full text-left text-xs divide-y divide-slate-200">
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="p-2 font-bold text-slate-900 w-1/2">18CS61 - SSW &amp; CD</td>
                    <td className="p-2 text-slate-700 font-medium">Prof. Shanthi</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2 font-bold text-slate-900">18CS62 - CG</td>
                    <td className="p-2 text-slate-700 font-medium">Prof. Siva Kumar Reddy</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2 font-bold text-slate-900">18CS63 - WT</td>
                    <td className="p-2 text-slate-700 font-medium">Prof. Shazia</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2 font-bold text-slate-900">18CS644 - JAVA &amp; J2EE</td>
                    <td className="p-2 text-slate-700 font-medium">Prof. Vijay Kumar Yadav</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2 font-bold text-slate-900">18CVXXX</td>
                    <td className="p-2 text-slate-700 font-medium">New Faculty</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2 font-bold text-slate-900">18CSL66 - SSW LAB</td>
                    <td className="p-2 text-slate-700 font-medium">Prof. Shanthi / Prof. Supriya Purohit</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2 font-bold text-slate-900">18CSL67 - CG LAB with Mini Project</td>
                    <td className="p-2 text-slate-700 font-medium">Prof. Siva Kumar Reddy / Prof. Vijay Kumar Yadav</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2 font-bold text-slate-900">18CSMP68 - MAD</td>
                    <td className="p-2 text-slate-700 font-medium">Prof. Megha / Prof. Shazia</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2 font-bold text-slate-900">Programming Class</td>
                    <td className="p-2 text-slate-700 font-medium">Prof. Shazia</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2 font-bold text-slate-900">CPC</td>
                    <td className="p-2 text-slate-700 font-medium">Prof. Shanthi</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2 font-bold text-slate-900">Aptitude</td>
                    <td className="p-2 text-slate-700 font-medium">Prof. Minhaz Fatima</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2 font-bold text-slate-900">Library Incharge</td>
                    <td className="p-2 text-slate-700 font-medium">Prof. Mehajabeen</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2 font-bold text-slate-900">Sports Incharge</td>
                    <td className="p-2 text-slate-700 font-medium">Prof. Shanthi</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 8th Semester Column */}
            <div className="border border-slate-300 rounded-xl overflow-hidden flex flex-col justify-between">
              <div>
                <div className="p-2.5 bg-slate-900 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-between">
                  <span>8TH SEMESTER (EVEN SEM 2021-2022)</span>
                  <span className="text-emerald-300 text-[10px]">FINAL YEAR BATCH</span>
                </div>
                <table className="w-full text-left text-xs divide-y divide-slate-200">
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="p-2 font-bold text-slate-900 w-1/2">18CS81 - IOT</td>
                      <td className="p-2 text-slate-700 font-medium">Prof. Siva Kumar Reddy</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-2 font-bold text-slate-900">18CS824 - NSD</td>
                      <td className="p-2 text-slate-700 font-medium">Prof. Minhaz Fatima</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-2 font-bold text-slate-900">17CS84 - INTERNSHIP</td>
                      <td className="p-2 text-slate-700 font-medium">Prof. Shazia</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-2 font-bold text-slate-900">17CSP85 - PROJECT PHASE-II</td>
                      <td className="p-2 text-slate-700 font-medium">Prof. Minhaz Fatima</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-2 font-bold text-slate-900">17CSS86 - SEMINAR</td>
                      <td className="p-2 text-slate-700 font-medium">Prof. Minhaz Fatima</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-2 font-bold text-slate-900">Project Work Incharge</td>
                      <td className="p-2 text-slate-700 font-medium">Prof. Shazia</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-2 font-bold text-slate-900">Seminar Coordinator</td>
                      <td className="p-2 text-slate-700 font-medium">Prof. Shanthi</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-2 font-bold text-slate-900">Aptitude (Placement)</td>
                      <td className="p-2 text-slate-700 font-medium">Prof. Shanthi</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-2 font-bold text-slate-900">Library Reference</td>
                      <td className="p-2 text-slate-700 font-medium">Prof. Shanthi</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-2 font-bold text-slate-900">Sports Coordinator</td>
                      <td className="p-2 text-slate-700 font-medium">Prof. Shanthi</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Official Signatures Block matching Image 2 */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between mt-6">
                <div className="text-center">
                  <div className="h-10 flex items-end justify-center">
                    <span className="font-serif italic font-bold text-base text-[#005f73]">Shanthi</span>
                  </div>
                  <div className="w-36 border-t-2 border-slate-900 pt-1 text-[11px] font-black uppercase text-slate-900">
                    TIME TABLE INCHARGE
                  </div>
                  <p className="text-[9px] text-slate-500">Prof. Shanthi</p>
                </div>

                <div className="text-center">
                  <div className="h-10 flex items-end justify-center">
                    <span className="font-serif italic font-bold text-base text-slate-900">HOD CSE</span>
                  </div>
                  <div className="w-36 border-t-2 border-slate-900 pt-1 text-[11px] font-black uppercase text-slate-900">
                    HOD CSE
                  </div>
                  <p className="text-[9px] text-slate-500">Navodaya Institute of Technology</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: INTERACTIVE SEMESTER SCHEDULER                                    */}
      {/* ========================================================================= */}
      {activeViewMode === "interactive" && (
        <div className="space-y-6">
          {/* Filter Row: Semester & Section Selection */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-500">Semester:</span>
                <select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(Number(e.target.value))}
                  className="px-3 py-1.5 text-xs font-bold bg-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-[#005f73]/20"
                >
                  <option value={6}>Sem 6 (Even Semester - 18CS Batch)</option>
                  <option value={8}>Sem 8 (Final Year - 18CS Batch)</option>
                  <option value={4}>Sem 4 (Even Semester)</option>
                  <option value={2}>Sem 2 (First Year)</option>
                </select>
              </div>

              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                {["A", "B"].map((sec) => (
                  <button
                    key={sec}
                    onClick={() => setSelectedSection(sec)}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                      selectedSection === sec
                        ? "bg-white text-[#005f73] shadow-xs"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Section {sec}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Theory Lecture
              </span>
              <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Practical Lab
              </span>
              <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Tutorial / Seminar
              </span>
            </div>
          </div>

          {/* Interactive Weekly Matrix Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                    <th className="py-3 px-4 w-28 border-r border-slate-200">Day</th>
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
                              <span className="text-[11px] font-mono text-slate-300">- Free -</span>
                            </td>
                          );
                        }

                        const typeStyles = {
                          Lecture: "bg-indigo-50/80 border-indigo-200 text-indigo-950",
                          Lab: "bg-emerald-50/80 border-emerald-200 text-emerald-950",
                          Tutorial: "bg-amber-50/80 border-amber-200 text-amber-950",
                        }[slot.type];

                        return (
                          <td
                            key={p.num}
                            className="p-2 border-r border-slate-100 last:border-r-0 align-top"
                          >
                            <div
                              className={`p-2.5 rounded-xl border shadow-2xs group relative transition ${typeStyles}`}
                            >
                              <div className="flex items-start justify-between gap-1">
                                <span className="font-extrabold text-xs">{slot.subjectCode}</span>
                                <span className="text-[9px] px-1.5 py-0.5 rounded font-semibold bg-white/80">
                                  {slot.room}
                                </span>
                              </div>
                              <p className="text-[11px] font-bold truncate mt-0.5">{slot.subjectName}</p>
                              <p className="text-[10px] opacity-80 mt-1 truncate">{slot.facultyName}</p>

                              <button
                                onClick={() => deleteTimetableSlot(slot.id)}
                                className="absolute top-1.5 right-1.5 p-1 rounded-md bg-white/90 text-rose-600 hover:bg-rose-50 opacity-0 group-hover:opacity-100 transition shadow-xs"
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
        </div>
      )}

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
                  <label className="block text-slate-600 font-semibold mb-1">Period &amp; Time Slot</label>
                  <select
                    value={formData.period}
                    onChange={(e) => {
                      const pNum = Number(e.target.value);
                      const pObj = periods.find((p) => p.num === pNum);
                      setFormData({
                        ...formData,
                        period: pNum,
                        timeSlot: pObj?.time || "",
                      });
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Subject Code</label>
                  <input
                    type="text"
                    required
                    value={formData.subjectCode}
                    onChange={(e) => setFormData({ ...formData, subjectCode: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl outline-none"
                    placeholder="e.g. 18CS61"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Class Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-xl outline-none bg-white"
                  >
                    <option value="Lecture">Theory Lecture</option>
                    <option value="Lab">Practical Lab</option>
                    <option value="Tutorial">Tutorial / Seminar</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Subject Name</label>
                <input
                  type="text"
                  required
                  value={formData.subjectName}
                  onChange={(e) => setFormData({ ...formData, subjectName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl outline-none"
                  placeholder="e.g. SSW &amp; CD"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Faculty In-charge</label>
                  <select
                    value={formData.facultyName}
                    onChange={(e) => setFormData({ ...formData, facultyName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl outline-none bg-white"
                  >
                    <option value="Prof. Shanthi">Prof. Shanthi (SSW &amp; CD)</option>
                    <option value="Prof. Siva Kumar Reddy">Prof. Siva Kumar Reddy (CG / IOT)</option>
                    <option value="Prof. Shazia">Prof. Shazia (WT / MAD Lab)</option>
                    <option value="Prof. Vijay Kumar Yadav">Prof. Vijay Kumar Yadav (JAVA &amp; J2EE)</option>
                    <option value="Prof. Minhaz Fatima">Prof. Minhaz Fatima (NSD / Seminar)</option>
                    <option value="Prof. Mehajabeen">Prof. Mehajabeen (Library)</option>
                    <option value="Prof. Supriya Purohit">Prof. Supriya Purohit (SSW Lab)</option>
                    <option value="Prof. Megha">Prof. Megha (MAD Lab)</option>
                    <option value="New Faculty">New Faculty (18CVXXX)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Room / Lab Number</label>
                  <input
                    type="text"
                    required
                    value={formData.room}
                    onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl outline-none"
                    placeholder="e.g. CS-201 or Lab-1"
                  />
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>The scheduler will automatically verify faculty and room conflicts across Semesters 6 and 8.</span>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-slate-600 font-bold hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#005f73] hover:bg-[#004e5f] text-white font-bold rounded-xl shadow-sm transition"
                >
                  Confirm &amp; Schedule Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
