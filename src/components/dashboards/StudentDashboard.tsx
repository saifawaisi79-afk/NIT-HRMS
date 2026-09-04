"use client";

import React from "react";
import Link from "next/link";
import {
  CalendarCheck,
  Award,
  BookOpen,
  FileText,
  Clock,
  Briefcase,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  BellRing,
  Sparkles,
  Calendar,
  ChevronRight,
  Download,
} from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";

export default function StudentDashboard() {
  const { notices, assignments, placements, showToast } = useDepartment();

  const studentInfo = {
    name: "Saif Awaisi",
    usn: "1NT23CS042",
    semester: "5th Semester",
    section: "Section A",
    academicYear: "2026–27",
    program: "B.Tech Computer Science & Engineering",
    cgpa: 8.92,
    overallAttendance: 86.4,
  };

  const subjectAttendance = [
    { code: "CS501", name: "Database Management Systems", faculty: "Dr. Priya Sharma", percentage: 84, classesHeld: 32, attended: 27, status: "Good" },
    { code: "CS502", name: "Operating Systems Principles", faculty: "Prof. Rajesh K.", percentage: 76, classesHeld: 32, attended: 24, status: "At Risk" },
    { code: "CS503", name: "Computer Networks", faculty: "Prof. Amit Deshmukh", percentage: 93, classesHeld: 32, attended: 30, status: "Excellent" },
    { code: "CS301", name: "Data Structures & Algorithms", faculty: "Prof. Ananya Roy", percentage: 91, classesHeld: 32, attended: 29, status: "Excellent" },
  ];

  const todayClasses = [
    { time: "09:00 AM - 10:00 AM", subject: "Data Structures & Algorithms (CS301)", faculty: "Prof. Ananya Roy", room: "Room CS-201", type: "Lecture" },
    { time: "10:00 AM - 11:00 AM", subject: "Database Management Systems (CS501)", faculty: "Dr. Priya Sharma", room: "Room CS-202", type: "Lecture" },
    { time: "11:15 AM - 12:15 PM", subject: "Computer Networks (CS503)", faculty: "Prof. Amit Deshmukh", room: "Room CS-201", type: "Lecture" },
    { time: "02:00 PM - 04:00 PM", subject: "Operating Systems & Networks Lab (CS505L)", faculty: "Prof. Rajesh K. & Lab Team", room: "Computing Lab 3", type: "Practical" },
  ];

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Header Profile Section */}
      <div className="p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full ring-2 ring-[#005f73]/40 bg-slate-100 overflow-hidden shrink-0 shadow-xs">
            <img
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80"
              alt="Student"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Good Morning, Student
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200">
                Active Student
              </span>
            </div>
            <p className="text-xs font-bold text-slate-700 mt-1">
              {studentInfo.name} • USN: <span className="text-[#005f73] font-extrabold">{studentInfo.usn}</span>
            </p>
            <p className="text-xs text-slate-500 font-medium">
              {studentInfo.program} • {studentInfo.semester} ({studentInfo.section}) • Academic Year: {studentInfo.academicYear}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/documents"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download ID Card</span>
          </Link>
          <Link
            href="/attendance"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#005f73] hover:bg-[#004e5f] text-white text-xs font-bold transition shadow-sm"
          >
            <span>View Attendance Register</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Low Attendance Alert if any subject is near or below 75% */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start sm:items-center gap-3 text-xs text-amber-900 shadow-xs">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
        <div className="flex-1">
          <span className="font-extrabold text-amber-950 mr-1">LOW ATTENDANCE WARNING:</span>
          <span>
            Your attendance in <strong>CS502: Operating Systems Principles</strong> is currently at <strong>76%</strong> (cutoff is 75%). Missing 1 more session may trigger semester exam debarment.
          </span>
        </div>
        <Link
          href="/leaves"
          className="shrink-0 px-3 py-1.5 rounded-full bg-amber-200 hover:bg-amber-300 text-amber-950 font-bold text-[11px] transition"
        >
          Apply Medical / Duty Leave
        </Link>
      </div>

      {/* 6 Key KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">ATTENDANCE</span>
            <CalendarCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-slate-950">86.4%</p>
          <p className="text-[11px] text-emerald-600 font-bold mt-1">Good Standing</p>
        </div>

        <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">CURRENT CGPA</span>
            <Award className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl font-black text-slate-950">8.92</p>
          <p className="text-[11px] text-indigo-600 font-bold mt-1">Rank: 4th in Section</p>
        </div>

        <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">SUBJECTS</span>
            <BookOpen className="w-4 h-4 text-[#005f73]" />
          </div>
          <p className="text-2xl font-black text-slate-950">6</p>
          <p className="text-[11px] text-slate-500 font-bold mt-1">24 Total Credits</p>
        </div>

        <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">ASSIGNMENTS</span>
            <FileText className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-2xl font-black text-slate-950">2</p>
          <p className="text-[11px] text-rose-600 font-bold mt-1">Due This Week</p>
        </div>

        <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">EXAMS</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-black text-slate-950">CIE-1</p>
          <p className="text-[11px] text-amber-600 font-bold mt-1">Starts Sept 15</p>
        </div>

        <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">PLACEMENTS</span>
            <Briefcase className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-black text-slate-950">Tier 1</p>
          <p className="text-[11px] text-purple-600 font-bold mt-1">Eligible (0 Backlogs)</p>
        </div>
      </div>

      {/* Main Grid: Today's Timetable & Subject-Wise Attendance Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Today's Timetable */}
        <div className="lg:col-span-7 p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950 tracking-tight">Today&apos;s Timetable</h2>
              <p className="text-xs text-slate-400 font-medium">Friday schedule for 5th Semester Section A</p>
            </div>
            <Link
              href="/timetable"
              className="text-xs font-bold text-[#005f73] hover:underline flex items-center gap-1"
            >
              <span>Weekly Matrix</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {todayClasses.map((cls, idx) => (
              <div key={idx} className="py-3.5 flex items-start justify-between gap-4 hover:bg-slate-50/80 p-2 rounded-xl transition">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700 shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{cls.subject}</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">{cls.faculty} • {cls.room}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-extrabold text-[#005f73] block">{cls.time}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-100 text-slate-600 mt-0.5 inline-block">
                    {cls.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Subject-wise Attendance Progress */}
        <div className="lg:col-span-5 p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950 tracking-tight">Attendance Summary</h2>
              <p className="text-xs text-slate-400 font-medium">Subject-wise compliance vs 75% cutoff</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
              Odd Sem 2026
            </span>
          </div>

          <div className="space-y-4 pt-1">
            {subjectAttendance.map((sub) => {
              const isAtRisk = sub.percentage < 78;
              return (
                <div key={sub.code} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-extrabold text-slate-900">{sub.name}</span>
                      <span className="text-[10px] text-slate-400 ml-1.5">({sub.code})</span>
                    </div>
                    <span className={`font-black ${isAtRisk ? "text-rose-600" : "text-emerald-700"}`}>
                      {sub.percentage}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isAtRisk
                          ? "bg-rose-500"
                          : sub.percentage >= 90
                          ? "bg-emerald-600"
                          : "bg-[#005f73]"
                      }`}
                      style={{ width: `${sub.percentage}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                    <span>{sub.attended} of {sub.classesHeld} classes attended</span>
                    <span className={isAtRisk ? "text-rose-600 font-bold" : "text-slate-500"}>
                      {isAtRisk ? "⚠️ At Risk (<78%)" : "✓ On Track"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100">
            <Link
              href="/leaves"
              className="w-full py-2.5 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold block text-center transition"
            >
              Submit Attendance On-Duty / Leave Slip
            </Link>
          </div>
        </div>
      </div>

      {/* Third Row: Upcoming Deliverables, Placements & Department Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Upcoming Deliverables: Assignments & Exams */}
        <div className="lg:col-span-6 p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950 tracking-tight">Pending Coursework & Exams</h2>
              <p className="text-xs text-slate-400 font-medium">Assignments to submit & upcoming assessments</p>
            </div>
            <Link href="/assignments" className="text-xs font-bold text-[#005f73] hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {assignments.slice(0, 3).map((a) => (
              <div
                key={a.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-3"
              >
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    {a.subjectCode} • Due {a.dueDate}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 mt-0.5">{a.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{a.facultyName} • Max Marks: {a.maxMarks}</p>
                </div>
                <Link
                  href="/assignments"
                  className="px-3.5 py-1.5 rounded-full bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs font-bold transition shrink-0"
                >
                  Submit
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Department Notices */}
        <div className="lg:col-span-6 p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950 tracking-tight">Recent Notices & Circulars</h2>
              <p className="text-xs text-slate-400 font-medium">Official announcements from HOD and college office</p>
            </div>
            <Link href="/notices" className="text-xs font-bold text-[#005f73] hover:underline">
              All Notices
            </Link>
          </div>

          <div className="space-y-3">
            {notices.slice(0, 3).map((n) => (
              <div
                key={n.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                    {n.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">{n.publishedDate}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
                <p className="text-[11px] text-slate-500 line-clamp-1">{n.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
